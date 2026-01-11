import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(join(__dirname, 'public')));

// Initialize Google GenAI client
let genai;
if (process.env.GOOGLE_API_KEY) {
  genai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Generate website from prompt
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!genai) {
      // Mock response for development without API key
      const mockResponse = generateMockWebsite(prompt);
      return res.json(mockResponse);
    }

    // Generate website using Google GenAI
    const result = await genai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an expert web developer. Generate complete, valid HTML, CSS, and JavaScript code based on the user's description. 
            Return a JSON object with the following structure:
            {
              "html": "complete HTML code with proper structure",
              "css": "complete CSS code with responsive design",
              "js": "JavaScript code for interactivity (if needed)",
              "title": "appropriate page title"
            }
            
            Create a website based on this description: ${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      }
    });

    let websiteData;
    
    try {
      // Debug the response structure more carefully
      console.log('AI Response keys:', Object.keys(result));
      
      // Handle the response based on the new API structure
      let responseText;
      if (result.candidates && result.candidates[0] && result.candidates[0].content) {
        // New structure: result.candidates[0].content.parts[0].text
        responseText = result.candidates[0].content.parts[0].text;
        console.log('Using candidates structure');
      } else if (result.response && typeof result.response.text === 'function') {
        // Old structure: result.response.text()
        responseText = result.response.text();
        console.log('Using response.text() structure');
      } else if (typeof result.text === 'function') {
        // Alternative structure: result.text()
        responseText = result.text();
        console.log('Using result.text() structure');
      } else {
        console.log('Unknown structure, falling back to mock response');
        throw new Error('Unknown response structure from Google GenAI');
      }
      
      if (responseText) {
        // Clean up the response - remove markdown code blocks if present
        let cleanedResponse = responseText.trim();
        if (cleanedResponse.startsWith('```json')) {
          cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanedResponse.startsWith('```')) {
          cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        
        websiteData = JSON.parse(cleanedResponse);
      } else {
        throw new Error('No response text received');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback to mock response if JSON parsing fails
      websiteData = generateMockWebsite(prompt);
    }

    res.json(websiteData);

  } catch (error) {
    console.error('Error generating website:', error);
    res.status(500).json({ error: 'Failed to generate website' });
  }
});

// Generate ZIP file with website code
app.post('/api/download', async (req, res) => {
  try {
    const { html, css, js, title } = req.body;

    if (!html || !css) {
      return res.status(400).json({ error: 'HTML and CSS are required' });
    }

    const zip = new JSZip();
    
    // Add files to zip
    zip.file('index.html', `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'Generated Website'}</title>
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js || ''}</script>
</body>
</html>`);

    zip.file('styles.css', css);
    if (js) {
      zip.file('script.js', js);
    }
    zip.file('README.txt', `Website generated by AI Website Builder\nGenerated on: ${new Date().toISOString()}`);

    // Generate zip file
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="website.zip"');
    res.send(zipBuffer);

  } catch (error) {
    console.error('Error creating zip file:', error);
    res.status(500).json({ error: 'Failed to create download' });
  }
});

// Mock website generator for development
function generateMockWebsite(prompt) {
  const baseTitle = prompt.split(' ').slice(0, 3).join(' ') || 'Generated Website';
  
  return {
    html: `
<div class="container">
  <header>
    <h1>Welcome to ${baseTitle}</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  
  <main>
    <section id="home">
      <h2>Home Section</h2>
      <p>This website was generated based on your prompt: "${prompt}"</p>
      <button onclick="alert('Hello from generated website!')">Click Me</button>
    </section>
    
    <section id="about">
      <h2>About Us</h2>
      <p>This is a sample about section generated by the AI website builder.</p>
    </section>
    
    <section id="contact">
      <h2>Contact</h2>
      <form>
        <input type="text" placeholder="Your Name">
        <input type="email" placeholder="Your Email">
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2024 ${baseTitle}. All rights reserved.</p>
  </footer>
</div>
    `,
    css: `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  text-align: center;
}

header h1 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 15px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  transition: all 0.3s ease;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

main {
  display: grid;
  gap: 30px;
}

section {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

section h2 {
  color: #667eea;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

button {
  background: #667eea;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

button:hover {
  background: #5a67d8;
}

form {
  display: grid;
  gap: 15px;
  max-width: 400px;
}

input, textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

footer {
  text-align: center;
  margin-top: 50px;
  color: white;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  nav {
    flex-direction: column;
    align-items: center;
  }
  
  section {
    padding: 20px;
  }
}
    `,
    js: `
// Simple interactivity for the generated website
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form submission handling
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! (This is a demo form)');
      form.reset();
    });
  }
});
    `,
    title: baseTitle
  };
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  
  if (!process.env.GOOGLE_API_KEY) {
    console.warn('⚠️  GOOGLE_API_KEY not set. Using mock responses for development.');
  }
});

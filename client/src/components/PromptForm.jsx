import React, { useState } from 'react'
import { Send, Sparkles, Lightbulb, Zap, Copy, Check } from 'lucide-react'

const PromptForm = ({ onSubmit, isLoading, darkMode }) => {
  const [prompt, setPrompt] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [examples] = useState([
    "Create a modern portfolio website for a photographer with dark theme, image gallery, and contact form",
    "Build a responsive landing page for a SaaS product with hero section, features, pricing, and testimonials",
    "Design an elegant restaurant website with menu display, online reservation system, and location map",
    "Make a personal blog with responsive design, dark mode toggle, categories, and newsletter signup",
    "Create an e-commerce product page with image gallery, reviews, size/color options, and add to cart",
    "Design a corporate website for a consulting firm with team members, services, case studies, and contact form",
    "Build a fitness app landing page with workout statistics, trainer profiles, and membership plans",
    "Create a real estate website with property listings, filters, virtual tours, and agent contact forms"
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim())
    }
  }

  const selectExample = (example) => {
    setPrompt(example)
  }

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const clearPrompt = () => {
    setPrompt('')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="prompt" className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Describe your website
          </label>
          <div className="relative">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Create a modern portfolio website for a graphic designer with animations, contact form, and dark mode support..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none min-h-[120px] transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              disabled={isLoading}
            />
            {prompt && (
              <button
                type="button"
                onClick={clearPrompt}
                className={`absolute top-3 right-3 p-1 rounded-full transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                }`}
                title="Clear prompt"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary-600 to-accent-purple hover:from-primary-700 hover:to-accent-purple/90 text-white shadow-lg hover:shadow-xl'
          } ${!prompt.trim() && 'opacity-50 cursor-not-allowed'}`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating Magic...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span>Generate Website</span>
            </>
          )}
        </button>
      </form>

      {/* Examples Section */}
      <div className={`border-t pt-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className={`text-sm font-medium flex items-center ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
            Quick Start Examples
          </h4>
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Click to use
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <div 
              key={index}
              className={`relative group rounded-lg p-3 transition-all duration-300 cursor-pointer ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700 hover:border-primary-500' 
                  : 'bg-gray-50 border border-gray-200 hover:border-primary-400'
              }`}
              onClick={() => selectExample(example)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(example, index);
                }}
                className={`absolute top-2 right-2 p-1 rounded transition-colors ${
                  darkMode 
                    ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                }`}
                title="Copy prompt"
              >
                {copiedIndex === index ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
              
              <p className={`text-sm pr-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {example.length > 80 ? example.substring(0, 80) + '...' : example}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className={`rounded-lg p-4 transition-colors duration-300 ${
        darkMode 
          ? 'bg-blue-900/20 border border-blue-800' 
          : 'bg-blue-50 border border-blue-200'
      }`}>
        <div className="flex items-start space-x-3">
          <Lightbulb className={`h-5 w-5 flex-shrink-0 ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <div>
            <h4 className={`text-sm font-medium mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-900'
            }`}>
              💡 Pro Tips for Better Results
            </h4>
            <ul className={`text-xs space-y-1 ${
              darkMode ? 'text-blue-200' : 'text-blue-800'
            }`}>
              <li>• <strong>Be specific:</strong> Mention colors, layout preferences, and specific features</li>
              <li>• <strong>Include technical details:</strong> Responsive design, dark mode, animations</li>
              <li>• <strong>Specify sections:</strong> Header, hero, features, testimonials, footer, etc.</li>
              <li>• <strong>Mention functionality:</strong> Forms, galleries, sliders, interactive elements</li>
              <li>• <strong>Add style preferences:</strong> Modern, minimalist, professional, playful</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Character Counter */}
      <div className={`text-xs text-right ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {prompt.length}/10000 characters
      </div>
    </div>
  )
}

export default PromptForm
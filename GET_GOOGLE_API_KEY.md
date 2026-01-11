# How to Get a Google AI API Key

To use the AI Website Builder with real AI generation (instead of mock responses), you need to obtain a Google AI API key.

## Steps to Get Google AI API Key:

1. **Go to Google AI Studio**: Visit [makersuite.google.com](https://makersuite.google.com/)

2. **Sign in with Google**: Use your Google account to sign in

3. **Create API Key**:
   - Click on "Get API Key" in the sidebar
   - Click "Create API Key" button
   - Give your key a name (e.g., "AI Website Builder")
   - Copy the generated API key

4. **Configure Your Environment**:
   - Open `server/.env` file
   - Replace `your_google_api_key_here` with your actual API key:
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

5. **Restart the Server**: The server will automatically detect the API key and use real AI generation

## Important Notes:

- The Google AI API has free tier usage limits
- Keep your API key secure and never commit it to version control
- The `.env` file is already in `.gitignore` to prevent accidental commits
- Without an API key, the application will use mock responses for development

## Pricing:

- Google AI Studio offers free usage with quotas
- Check [Google AI Studio pricing](https://ai.google.dev/pricing) for current rates
- You can set usage limits in your Google Cloud Console

## Troubleshooting:

If you encounter issues:
1. Ensure your API key is correctly formatted in the `.env` file
2. Check that the server is restarted after adding the API key
3. Verify your Google account has access to the AI Studio
4. Check your internet connection

The application will work without an API key using mock responses, but for real AI-powered website generation, the API key is required.

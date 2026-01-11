import React, { useState, useEffect } from 'react'
import { EyeOff, RefreshCw, AlertCircle, Smartphone, Tablet, Monitor, Maximize2, Minus, X, Expand } from 'lucide-react'

const Preview = ({ generatedCode, isLoading, darkMode }) => {
  const [iframeKey, setIframeKey] = useState(0)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(null)
  const [viewMode, setViewMode] = useState('desktop') // 'mobile', 'tablet', 'desktop'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const refreshPreview = () => {
    setIframeLoaded(false)
    setIframeError(null)
    setIframeKey(prev => prev + 1)
  }

  const getPreviewContent = () => {
    if (!generatedCode) return ''

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${generatedCode.title || 'Generated Website'}</title>
    <style>
      ${generatedCode.css || ''}
      /* Additional styles for better preview */
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-height: 100vh;
      }
    </style>
</head>
<body>
    ${generatedCode.html || ''}
    <script>
      try {
        ${generatedCode.js || ''}
      } catch (error) {
        console.error('Preview script error:', error);
      }
    </script>
</body>
</html>`
  }

  const handleIframeLoad = () => {
    setIframeLoaded(true)
    setIframeError(null)
  }

  const handleIframeError = () => {
    setIframeError('Failed to load preview content')
    setIframeLoaded(false)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    // Reset iframe state when generatedCode changes
    setIframeLoaded(false)
    setIframeError(null)
  }, [generatedCode])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Dimensions for different view modes
  const viewModeDimensions = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '600px' }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-96 rounded-xl border-2 border-dashed ${
        darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-100'
      } transition-colors duration-300`}>
        <div className="text-center">
          <RefreshCw className="h-10 w-10 text-primary-500 animate-spin mx-auto mb-3" />
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Generating preview...</p>
        </div>
      </div>
    )
  }

  if (!generatedCode) {
    return (
      <div className={`flex items-center justify-center h-96 rounded-xl border-2 border-dashed ${
        darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-100'
      } transition-colors duration-300`}>
        <div className="text-center">
          <EyeOff className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No preview available</p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Generate a website to see the preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${isExpanded ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6' : ''}`}>
      {/* Preview Controls */}
      <div className={`flex items-center justify-between ${isExpanded ? 'mb-4' : ''}`}>
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Live Preview {isExpanded && '(Expanded View)'}
        </h3>
        <div className="flex items-center space-x-2">
          {/* View Mode Selector */}
          <div className={`flex items-center space-x-1 p-1 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            {[
              { mode: 'mobile', icon: Smartphone, label: 'Mobile' },
              { mode: 'tablet', icon: Tablet, label: 'Tablet' },
              { mode: 'desktop', icon: Monitor, label: 'Desktop' }
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === mode
                    ? 'bg-primary-500 text-white shadow-md'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-600'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                title={label}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <button
            onClick={refreshPreview}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
            title="Refresh Preview"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          <button
            onClick={toggleExpand}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
            title={isExpanded ? "Collapse View" : "Expand View"}
          >
            <Expand className="h-4 w-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minus className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          {isExpanded && (
            <button
              onClick={toggleExpand}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
              title="Close Expanded View"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preview Frame */}
      <div className={`relative rounded-xl overflow-hidden shadow-xl border ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      } transition-all duration-300 ${isExpanded ? 'h-[calc(100vh-120px)]' : ''}`}>
        {/* Browser Chrome */}
        <div className={`flex items-center px-4 py-3 ${
          darkMode ? 'bg-gray-900 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'
        }`}>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className={`text-sm text-center truncate ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {generatedCode.title || 'Generated Website'}
            </div>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Iframe Container */}
        <div className={`relative flex justify-center p-4 bg-gray-200 dark:bg-gray-900 ${
          isExpanded ? 'h-[calc(100%-180px)]' : ''
        }`}>
          <div 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{
              width: viewModeDimensions[viewMode].width,
              height: isExpanded ? '100%' : (viewMode === 'desktop' ? viewModeDimensions[viewMode].height : 'auto'),
              maxHeight: isExpanded ? '100%' : '70vh',
              minHeight: isExpanded ? 'auto' : (viewMode === 'desktop' ? '600px' : '400px'),
              maxWidth: isExpanded ? '100%' : 'none'
            }}
          >
            <iframe
              key={iframeKey}
              srcDoc={getPreviewContent()}
              title="Website Preview"
              className="w-full h-full border-0"
              style={{
                minHeight: isExpanded ? '100%' : (viewMode === 'desktop' ? '600px' : '400px')
              }}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              loading="eager"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
            
            {/* Loading overlay */}
            {!iframeLoaded && !iframeError && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-3" />
                  <p className="text-gray-600 text-sm font-medium">Loading preview...</p>
                </div>
              </div>
            )}

            {/* Error overlay */}
            {iframeError && (
              <div className="absolute inset-0 bg-red-50 flex items-center justify-center p-6">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                  <p className="text-red-700 text-sm font-medium mb-3">{iframeError}</p>
                  <button
                    onClick={refreshPreview}
                    className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Stats */}
        <div className={`p-4 border-t ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className={`text-center p-3 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white shadow-sm'
            }`}>
              <div className={`font-semibold ${
                darkMode ? 'text-primary-400' : 'text-primary-600'
              }`}>
                {generatedCode.html ? (generatedCode.html.split('</').length - 1) : 0}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                HTML Elements
              </div>
            </div>
            
            <div className={`text-center p-3 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white shadow-sm'
            }`}>
              <div className={`font-semibold ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                {generatedCode.css ? generatedCode.css.split('}').length - 1 : 0}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                CSS Rules
              </div>
            </div>
            
            <div className={`text-center p-3 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white shadow-sm'
            }`}>
              <div className={`font-semibold ${
                darkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
                {generatedCode.js ? generatedCode.js.split('\n').length : 0}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                JS Lines
              </div>
            </div>
            
            <div className={`text-center p-3 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white shadow-sm'
            }`}>
              <div className={`font-semibold ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {generatedCode.title ? generatedCode.title.length > 20 ? generatedCode.title.substring(0, 20) + '...' : generatedCode.title : 'Untitled'}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Title
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {!isExpanded && (
        <div className={`p-4 rounded-xl ${
          darkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <h4 className={`text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Quick Actions</h4>
          <div className="flex space-x-3">
            <button
              onClick={refreshPreview}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-sm`}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                viewMode === 'mobile'
                  ? 'bg-primary-500 text-white shadow-md'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-sm`}
            >
              <Smartphone className="h-4 w-4" />
              <span>Mobile View</span>
            </button>
            
            <button
              onClick={toggleExpand}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-sm`}
            >
              <Expand className="h-4 w-4" />
              <span>Expand View</span>
            </button>
            
            <button
              onClick={toggleFullscreen}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-sm`}
            >
              <Maximize2 className="h-4 w-4" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Preview
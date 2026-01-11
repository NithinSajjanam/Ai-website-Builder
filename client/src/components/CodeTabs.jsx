import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, FileText, FileCode, FileJson, Download, Code, Clock, Hash, Zap } from 'lucide-react'

const CodeTabs = ({ generatedCode, darkMode = false }) => {
  const [activeTab, setActiveTab] = useState('html')
  const [copied, setCopied] = useState({})
  const [wrapLines, setWrapLines] = useState(false)

  const tabs = [
    { id: 'html', label: 'HTML', icon: FileText, language: 'html' },
    { id: 'css', label: 'CSS', icon: FileCode, language: 'css' },
    { id: 'js', label: 'JavaScript', icon: FileJson, language: 'javascript' },
  ]

  const getCodeContent = () => {
    if (!generatedCode) return '// No code generated yet'
    
    switch (activeTab) {
      case 'html':
        return generatedCode.html || '<!-- No HTML generated yet -->'
      case 'css':
        return generatedCode.css || '/* No CSS generated yet */'
      case 'js':
        return generatedCode.js || '// No JavaScript generated yet'
      default:
        return '// No code generated yet'
    }
  }

  const copyToClipboard = async (code, tabId) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(prev => ({ ...prev, [tabId]: true }))
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [tabId]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadCode = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const getLineCount = (code) => {
    return code ? code.split('\n').length : 0
  }

  const getFileSize = (code) => {
    return code ? new Blob([code]).size : 0
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const currentCode = getCodeContent()
  const currentTab = tabs.find(tab => tab.id === activeTab)
  const hasContent = currentCode && currentCode.trim().length > 0

  // Safe dark mode styles
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-gray-50'
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-700'
  const mutedTextColor = darkMode ? 'text-gray-400' : 'text-gray-500'
  const buttonHover = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className={`flex border-b ${borderColor}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          const code = generatedCode ? generatedCode[tab.id] : ''
          const tabHasContent = code && code.trim().length > 0
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? darkMode
                    ? 'border-primary-500 text-primary-400 bg-gray-800'
                    : 'border-primary-600 text-primary-700 bg-primary-50'
                  : `border-transparent ${mutedTextColor} ${buttonHover}`
              } ${!tabHasContent ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!tabHasContent}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
              {tabHasContent && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}>
                  {getLineCount(code)}
                </span>
              )}
            </button>
          )
        })}
        
        <div className="flex-1"></div>
        
        <div className="flex items-center space-x-1 px-2">
          <button
            onClick={() => setWrapLines(!wrapLines)}
            className={`p-2 rounded-md transition-colors ${
              wrapLines
                ? 'bg-primary-500 text-white'
                : `${mutedTextColor} ${buttonHover}`
            }`}
            title={wrapLines ? "Disable line wrapping" : "Enable line wrapping"}
          >
            <Code className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Code Header */}
      <div className={`flex items-center justify-between px-4 py-3 rounded-t-lg border ${borderColor} ${bgColor}`}>
        <div className="flex items-center space-x-3">
          {currentTab && (
            <>
              <currentTab.icon className={`h-4 w-4 ${textColor}`} />
              <span className={`text-sm font-medium ${textColor}`}>
                {currentTab.label} Code
              </span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`text-xs ${mutedTextColor}`}>
            {getLineCount(currentCode)} lines • {formatFileSize(getFileSize(currentCode))}
          </span>
          
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
          
          <button
            onClick={() => downloadCode(currentCode, `${activeTab}.${currentTab.language}`)}
            className={`p-1.5 rounded-md transition-colors ${mutedTextColor} ${buttonHover}`}
            title="Download code"
            disabled={!hasContent}
          >
            <Download className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => copyToClipboard(currentCode, activeTab)}
            className={`p-1.5 rounded-md transition-colors ${mutedTextColor} ${buttonHover}`}
            title="Copy to clipboard"
            disabled={!hasContent}
          >
            {copied[activeTab] ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className={`relative rounded-b-lg overflow-hidden border ${borderColor} border-t-0`}>
        {hasContent ? (
          <SyntaxHighlighter
            language={currentTab?.language || 'text'}
            style={darkMode ? vscDarkPlus : coy}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              backgroundColor: darkMode ? '#1e1e1e' : '#f8f9fa',
              borderRadius: '0 0 0.5rem 0.5rem',
              maxHeight: '400px',
              overflow: 'auto'
            }}
            wrapLongLines={wrapLines}
            showLineNumbers={true}
            lineNumberStyle={{
              color: darkMode ? '#858585' : '#9ca3af',
              paddingRight: '1rem',
              userSelect: 'none',
              minWidth: '3.5em',
            }}
          >
            {currentCode}
          </SyntaxHighlighter>
        ) : (
          <div className={`flex items-center justify-center p-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="text-center">
              <FileText className={`h-12 w-12 mx-auto mb-3 ${mutedTextColor}`} />
              <p className={`text-sm ${mutedTextColor}`}>
                No {activeTab.toUpperCase()} code generated
              </p>
              <p className={`text-xs mt-1 ${mutedTextColor}`}>
                Generate a website to see the code
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Code Stats */}
      {hasContent && (
        <div className={`rounded-lg p-4 ${bgColor}`}>
          <h4 className={`text-sm font-medium mb-3 ${textColor}`}>
            Code Statistics
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className={`text-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow-sm'}`}>
              <div className={`flex items-center justify-center mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <Hash className="h-4 w-4 mr-1" />
                <span className="font-semibold text-lg">{getLineCount(currentCode)}</span>
              </div>
              <div className={`text-xs ${mutedTextColor}`}>
                Lines of Code
              </div>
            </div>
            
            <div className={`text-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow-sm'}`}>
              <div className={`font-semibold text-lg mb-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {formatFileSize(getFileSize(currentCode))}
              </div>
              <div className={`text-xs ${mutedTextColor}`}>
                File Size
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeTabs
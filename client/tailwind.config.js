/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary color palette - Cyan/Sky based
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        
        // Accent colors for highlights and UI elements
        accent: {
          pink: '#ec4899',
          purple: '#a855f7',
          yellow: '#facc15',
          teal: '#0d9488',
          amber: '#f59e0b',
          blue: '#3b82f6',
          indigo: '#6366f1',
        },
        
        // Dark theme color palette
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        
        // Semantic colors for UI states
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
        },
        
        // Glassmorphism colors
        glass: {
          light: {
            primary: 'rgba(255, 255, 255, 0.8)',
            secondary: 'rgba(248, 250, 252, 0.7)',
            tertiary: 'rgba(241, 245, 249, 0.6)',
          },
          dark: {
            primary: 'rgba(15, 23, 42, 0.8)',
            secondary: 'rgba(30, 41, 59, 0.7)',
            tertiary: 'rgba(51, 65, 85, 0.6)',
          }
        }
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        code: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'gradient-x': 'gradientX 5s ease infinite',
        'gradient-y': 'gradientY 5s ease infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'border-glow': 'borderGlow 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInDown: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        gradientX: {
          '0%, 100%': { 
            'background-position': '0% 50%',
            'background-size': '200% 200%'
          },
          '50%': { 
            'background-position': '100% 50%',
            'background-size': '200% 200%'
          },
        },
        gradientY: {
          '0%, 100%': { 
            'background-position': '50% 0%',
            'background-size': '200% 200%'
          },
          '50%': { 
            'background-position': '50% 100%',
            'background-size': '200% 200%'
          },
        },
        bounceGentle: {
          '0%, 100%': { 
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(56, 189, 248, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.8)' },
        },
        borderGlow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(56, 189, 248, 0.3), inset 0 0 5px rgba(56, 189, 248, 0.2)',
            borderColor: 'rgba(56, 189, 248, 0.3)'
          },
          '100%': { 
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.5), inset 0 0 10px rgba(56, 189, 248, 0.3)',
            borderColor: 'rgba(56, 189, 248, 0.5)'
          },
        },
      },
      
      boxShadow: {
        // Light theme shadows
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        
        // Glassmorphism shadows
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        
        // Glow effects
        'glow': '0 0 20px rgba(56, 189, 248, 0.4)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-purple': '0 0 25px rgba(168, 85, 247, 0.5)',
        'glow-yellow': '0 0 20px rgba(250, 204, 21, 0.4)',
        'glow-teal': '0 0 20px rgba(13, 148, 136, 0.4)',
        
        // Dark theme specific shadows
        'dark-sm': '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
        'dark-md': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
        'dark-lg': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
        'dark-glow': '0 0 25px rgba(56, 189, 248, 0.25)',
      },
      
      backgroundImage: {
        'gradient-neon': 'linear-gradient(270deg, #0ea5e9, #a855f7, #ec4899)',
        'gradient-subtle': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #ec4899 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 249, 255, 0.6) 100%)',
        'gradient-glass-dark': 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
        
        // Pattern backgrounds
        'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      
      backdropBrightness: {
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
      },
      
      backdropSaturate: {
        100: '1',
        110: '1.1',
        120: '1.2',
        130: '1.3',
      },
      
      // Extended spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Extended opacity scale
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      },
      
      // Custom screens for responsive design
      screens: {
        'xs': '475px',
        '3xl': '1792px',
      },
      
      // Custom z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Border styles
      borderColor: {
        'glass-light': 'rgba(255, 255, 255, 0.2)',
        'glass-dark': 'rgba(0, 0, 0, 0.2)',
      },
    },
  },
  
  plugins: [
    // You can add plugins here if needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
  
  // Safelist for dynamic classes
  safelist: [
    {
      pattern: /bg-(primary|accent|success|warning|error|dark|glass|gradient)-(50|100|200|300|400|500|600|700|800|900|950|light|dark|neon|subtle|accent|radial)/,
      variants: ['hover', 'focus', 'dark', 'dark:hover'],
    },
    {
      pattern: /text-(primary|accent|success|warning|error|dark)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover', 'focus', 'dark', 'dark:hover'],
    },
    {
      pattern: /border-(primary|accent|success|warning|error|dark|glass)-(50|100|200|300|400|500|600|700|800|900|950|light|dark)/,
      variants: ['hover', 'focus', 'dark', 'dark:hover'],
    },
    {
      pattern: /shadow-(glow|glow-pink|glow-purple|glow-yellow|glow-teal|dark-glow|glass|glass-light|glass-dark)/,
    },
    {
      pattern: /backdrop-blur-(xs|sm|md|lg|xl|2xl|3xl)/,
    },
    {
      pattern: /animate-(fade-in|fade-in-up|fade-in-down|slide-up|slide-down|pulse-slow|pulse-gentle|gradient-x|gradient-y|bounce-gentle|shimmer|float|glow|border-glow)/,
    },
  ],
}
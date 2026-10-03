/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F5BA41',
          500: '#E5A62D',
          600: '#C98616',
          700: '#975E0A',
          800: '#643E06',
          900: '#362102',
          DEFAULT: '#E5A62D',
        },
        dark: {
          950: '#06080B',
          900: '#0B0F15',
          850: '#101620',
          800: '#161E2C',
          750: '#1E283A',
          700: '#2A374D',
          DEFAULT: '#0B0F15',
        },
        border: {
          gold: 'rgba(229, 166, 45, 0.28)',
          'gold-bright': 'rgba(245, 186, 65, 0.65)',
          dark: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'Trajan Pro', 'Cinzel Decorative', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -4px rgba(229, 166, 45, 0.45)',
        'gold-subtle': '0 0 15px -2px rgba(229, 166, 45, 0.22)',
        'card-depth': '0 12px 36px -8px rgba(0, 0, 0, 0.85)',
      },
      animation: {
        'hero-rise': 'heroRise 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        heroRise: {
          '0%': { transform: 'translateY(80px) scale(0.97)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          950: '#052e22',
          900: '#0a3d2e',
          800: '#166534',
          700: '#1d7a4a',
          600: '#24995f',
          500: '#33b374',
          400: '#6fce99',
          300: '#a3dfc0',
          200: '#cdeede',
          100: '#e6f5ee',
          50: '#f0faf5',
        },
        gold: {
          700: '#a37d00',
          600: '#d4a500',
          500: '#e6b800',
          400: '#f0cd4d',
          300: '#f5dc7a',
          200: '#faecb0',
          100: '#fdf6d9',
        },
        ink: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
        },
        canvas: '#eef3f7',
        card: '#ffffff',
        line: '#d9e2ea',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Archivo Black"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 165, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 6px rgba(212, 165, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Pinyon Script"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['Lora', 'serif'],
        sans: ['Raleway', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e3cd8a',
          dark: '#a4842f',
        },
        olive: {
          DEFAULT: '#5a7a4a',
          light: '#8aac7a',
          dark: '#3f5a33',
        },
        cream: {
          DEFAULT: '#faf7f1',
          dark: '#f1ead9',
        },
        bambu: {
          DEFAULT: '#c9a96e',
          light: '#e4d3ac',
          dark: '#8a6d3f',
        },
        inox: {
          DEFAULT: '#c6c9cc',
          light: '#e4e6e8',
          dark: '#8b8f93',
        },
        ink: {
          DEFAULT: '#1a1a1a',
        },
        paper: {
          DEFAULT: '#fafafa',
        },
      },
      boxShadow: {
        envelope: '0 25px 60px -15px rgba(90, 70, 30, 0.45)',
        seal: '0 4px 10px rgba(90, 70, 30, 0.5)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: 0.6 },
          '70%': { transform: 'scale(1.55)', opacity: 0 },
          '100%': { transform: 'scale(1.55)', opacity: 0 },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        floatSlow: 'floatSlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

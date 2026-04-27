/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0a',
          2: '#0f0f0f',
          3: '#111111',
          4: '#161616',
          5: '#1a1a1a',
          6: '#222222',
          7: '#2a2a2a',
          border: '#1f1f1f',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8C97A',
          dark:    '#A07830',
          dim:     '#C9A84C33',
        },
        accent: {
          DEFAULT: '#C9A84C',
          dark:    '#A07830',
        },
        primary: {
          DEFAULT: '#C9A84C',
          dark:    '#A07830',
          light:   '#E8C97A',
        },
        success: { DEFAULT: '#22c55e' },
        danger:  { DEFAULT: '#ef4444' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':       'fadeIn 0.5s ease-out forwards',
        'slide-up':      'slideUp 0.5s ease-out forwards',
        'float':         'float 7s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 3.5s infinite',
        'shimmer':       'shimmer 3s linear infinite',
        'spin-slow':     'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                              to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' },           '50%': { transform: 'translateY(-20px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% center' },        '100%': { backgroundPosition: '200% center' } },
      },
      backgroundSize: { '200': '200% auto' },
    },
  },
  plugins: [],
};

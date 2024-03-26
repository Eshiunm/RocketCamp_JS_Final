/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './backStage.html',
    './src/partials/*.html',
    './src/script/*.js',
    './src/script/api/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '15px',
      },
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
      },
    },
    extend: {
      colors: {
        gray: {
          dark: '#797979',
          light: '#CED4DA',
        },
        red: {
          error: '#C72424',
          danger: '#C44021',
        },
        purple: {
          hover: '#6A33FF',
          bg: '#301E5F',
        },
      },
      fontFamily: {
        NotoSansTC: ['Noto Sans TC', 'sans-serif'],
      },
      /* 自訂斷點 */
      screens: {
        sm: '540px', // => @media (min-width: 576px) { ... }
        md: '720px', // => @media (min-width: 768px) { ... }
        lg: '960px', // => @media (min-width: 960px) { ... }
        xl: '1140px', // => @media (min-width: 1140px) { ... }
      },
      animation: {
        marquee: 'slide 12s linear infinite',
        marquee2: 'slide-reverse 12s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'slide-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

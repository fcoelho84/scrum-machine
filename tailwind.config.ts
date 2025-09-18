import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx'],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      {
        default: {
          primary: '#04c3c3',
          'primary-content': '#FFFFFF',
          secondary: '#14194c',
          'secondary-content': '#E0E0E0',
          accent: '#ba735e',
          'accent-content': '#F5F5DC',
          neutral: '#E0E0E0',
          'base-100': '#030410',
        },
      },
    ],
  },
  theme: {
    extend: {
      animation: {
        'glow-bounce': 'glowBounce 1s ease-in-out infinite',
        'scale-up': 'scaleUp 1s ease-in-out forwards',
        'scale-up-down': 'scaleUpDown 1s ease-in-out infinite',
        flicker: 'flicker 8s ease-in-out infinite alternate-reverse',
        shine: 'shine 400ms ease-out infinite alternate-reverse',
        'shine-text': 'shine-text 400ms ease-out infinite alternate-reverse',
        spin: 'spin 1.5s ease-in-out forwards',
        rotate: 'rotate 16s infinite linear',
        'particle-float': 'particleFloat 8s ease-in-out infinite',
      },
      keyframes: {
        glowBounce: {
          '0%, 100%': {
            transform: 'scaleY(0.9)',
            textShadow: '0 0 80px theme("backgroundColor.primary")',
          },
          '50%': {
            transform: 'scaleY(1)',
            textShadow: '0 0 100px theme("backgroundColor.primary")',
          },
        },
        scaleUp: {
          '0%': {
            transform: 'scale(0)',
          },
          '60%': { transform: 'scale(1.2)' },
          '85%': { transform: 'scale(0.8)' },
          '95%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        scaleUpDown: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        flicker: {
          '0%': { opacity: '1' },
          '4%': { opacity: '0.9' },
          '6%': { opacity: '0.85' },
          '8%': { opacity: '0.95' },
          '10%': { opacity: '0.9' },
          '11%': { opacity: '0.922' },
          '12%': { opacity: '0.9' },
          '14%': { opacity: '0.95 ' },
          '16%': { opacity: '0.98' },
          '17%': { opacity: '0.9' },
          '19%': { opacity: '0.93' },
          '20%': { opacity: '0.99' },
          '24%': { opacity: '1 ' },
          '26%': { opacity: '0.94' },
          '28%': { opacity: '0.98 ' },
          '37%': { opacity: '0.93' },
          '38%': { opacity: '0.5' },
          '39%': { opacity: '0.96' },
          '42%': { opacity: '1' },
          '44%': { opacity: '0.97' },
          '46%': { opacity: '0.94' },
          '56%': { opacity: '0.9' },
          '58%': { opacity: '0.9' },
          '60%': { opacity: '0.99' },
          '68%': { opacity: '1' },
          '70%': { opacity: '0.9' },
          '72%': { opacity: '0.95' },
          '93%': { opacity: '0.93' },
          '95%': { opacity: '0.95' },
          '97%': { opacity: '0.93' },
          '100%': { opacity: '1' },
        },
        shine: {
          '0%': {
            boxShadow:
              '0 0 4px theme("backgroundColor.secondary"), 0 0 8px theme("backgroundColor.secondary")',
          },
          '100%': {
            boxShadow:
              '0 0 12px theme("backgroundColor.secondary"), 0 0 16px theme("backgroundColor.secondary")',
          },
        },
        'shine-text': {
          '0%': {
            textShadow:
              '0 0 4px theme("backgroundColor.primary"), 0 0 8px theme("backgroundColor.primary")',
          },
          '100%': {
            textShadow:
              '0 0 12px theme("backgroundColor.primary"), 0 0 16px theme("backgroundColor.primary")',
          },
        },
        rotate: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        spin: {
          '0%': {
            filter: 'blur(6px)',
            transform: 'translateY(0%)',
          },
          '60%': { filter: 'blur(6px)' },
          '80%': { filter: 'blur(4px)' },
          '100%': {
            transform: 'translateY(calc(-100% + 208px))',
            filter: 'blur(0px)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) translateX(0px)',
          },
          '25%': {
            transform: 'translateY(-20px) translateX(10px)',
          },
          '50%': {
            transform: 'translateY(-10px) translateX(-5px)',
          },
          '75%': {
            transform: 'translateY(-15px) translateX(8px)',
          },
        },
        glowPulse: {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'scale(1.1)',
          },
        },
        particleFloat: {
          '0%': {
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: '0.2',
          },
          '25%': {
            transform: 'translateY(-30px) translateX(15px) scale(1.2)',
            opacity: '0.4',
          },
          '50%': {
            transform: 'translateY(-15px) translateX(-10px) scale(0.8)',
            opacity: '0.6',
          },
          '75%': {
            transform: 'translateY(-25px) translateX(12px) scale(1.1)',
            opacity: '0.3',
          },
          '100%': {
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: '0.2',
          },
        },
      },
    },
  },
  plugins: [require('daisyui')],
} satisfies Config

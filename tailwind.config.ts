import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      pixelify: ['Pixelify Sans', 'Sans'],
    },
    extend: {
      animation: {
        flicker: 'flicker 8s ease-in-out infinite alternate-reverse',
        shine: 'shine 400ms ease-out infinite alternate-reverse',
        spin: 'spin 1.5s ease-in-out forwards',
        rotate: 'rotate 16s infinite linear',
      },
      keyframes: {
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
            borderColor: '#14194cF2',
            color: '#04c3c3BF',
            textShadow: '0px 0px 8px #04c3c3BF',
            boxShadow: '0px 2px 16px #14194cC2',
          },
          '100%': {
            borderColor: '#14194cF2',
            color: '#04c3c3BF',
            textShadow: '0px 0px 12px #04c3c3BF',
            boxShadow: '0px 2px 24px #14194cC2',
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
      },
    },
    colors: {
      primary: '#030410',
      secondary: '#14194c',
      blueGray: '#3c4f61',
      brown: '#ba735e',
      white: '#f3f2f5',
      gray: '#a6a4b2',
      highlight: '#04c3c3',
      transparent: 'transparent',
    },
  },
  plugins: [],
} satisfies Config

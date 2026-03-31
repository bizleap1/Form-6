import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0d1b2a',
          mid: '#1a2e45',
          light: '#243b55',
        },
        teal: {
          DEFAULT: '#1cb8a8',
          light: '#2dd4c4',
          pale: 'rgba(28,184,168,0.10)',
        },
        gold: {
          DEFAULT: '#c9a84c',
          pale: 'rgba(201,168,76,0.12)',
        },
        grey: {
          50: '#f8f9fb',
          100: '#eef0f4',
          200: '#dce0e8',
          400: '#8d96a7',
          600: '#5a6272',
          800: '#2e3545',
        }
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'DM Serif Display', 'serif'],
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '20px',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(13,27,42,0.08)',
        'card-hover': '0 8px 40px rgba(13,27,42,0.14)',
        'teal': '0 4px 16px rgba(28,184,168,0.30)',
        'teal-hover': '0 6px 24px rgba(28,184,168,0.40)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease both',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

export default config

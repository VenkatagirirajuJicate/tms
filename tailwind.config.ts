import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        primary: {
          '50': '#eff6ff',
          '100': '#dbeafe',
          '200': '#bfdbfe',
          '300': '#93c5fd',
          '400': '#60a5fa',
          '500': '#3b82f6',
          '600': '#2563eb',
          '700': '#1d4ed8',
          '800': '#1e40af',
          '900': '#1e3a8a',
        },
        success: {
          '50': '#f0fdf4',
          '100': '#dcfce7',
          '500': '#22c55e',
          '600': '#16a34a',
        },
        warning: {
          '50': '#fffbeb',
          '100': '#fef3c7',
          '500': '#f59e0b',
          '600': '#d97706',
        },
        error: {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '500': '#ef4444',
          '600': '#dc2626',
        },
      },
    },
  },
  plugins: [],
};

export default config;
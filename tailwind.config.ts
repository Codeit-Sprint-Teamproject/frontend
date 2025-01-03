import lineClamp from '@tailwindcss/line-clamp';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        error: '#DC2626',
        customGrey: {
          50: '#F8F8F8',
          100: '#ECECEC',
          200: '#C5C5C5',
          300: '#A9A9A9',
          400: '#828282',
          500: '#6A6A6A',
          600: '#454545',
          700: '#3F3F3F',
          800: '#262626',
          900: '#1D1D1D',
        },
        customGreen: {
          50: '#EAF7F2',
          100: '#BFE7D8',
          200: '#A0DCC5',
          300: '#74CCAA',
          400: '#59C299',
          500: '#30B380',
          600: '#2CA374',
          700: '#227F5B',
          800: '#1A6246',
          900: '#144B36',
        },
        customOrange: {
          50: '#FFF6E7',
          100: '#FFE3B3',
          200: '#FFD68F',
          300: '#FFC35C',
          400: '#FFB73C',
          500: '#FFA50B',
          600: '#E8960A',
          700: '#B57508',
          800: '#8C5B06',
          900: '#6B4505',
        },
        customRed: '#E06161',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        button: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [tailwindcssAnimate, lineClamp],
} satisfies Config;

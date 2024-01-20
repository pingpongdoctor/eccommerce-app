import type { Config } from 'tailwindcss';
const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/lib/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        errorInputBorderColor: 'border-red-400',
      },
      fontFamily: {
        dancingScript: ['var(--font-dancing-script)'],
      },
      keyframes: {
        grow: {
          '0%': { width: '0' },
          '100%': { width: 'full' },
        },
      },
      animation: {
        scaleAnimation: 'grow 2s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
};

export default withMT(config);

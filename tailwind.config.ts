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
        modalBoxGrow: {
          '0%': { width: '0', height: '0' },
          '100%': { width: '100vw', height: '100vh' },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
      animation: {
        scaleAnimation: 'grow 2s ease-in-out',
        modalBoxScaleAnimation: 'modalBoxGrow 0.5s ease-in-out',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
};

export default withMT(config);

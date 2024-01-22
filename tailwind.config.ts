/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        'gray-custom': '#151515',
        'gray-custom-darker': '#0d0d0d',
        'blue-custom': '#4457ce',
        'blue-custom-darker': '#232b61',
      },
      fontFamily: {
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.16rem',
      },
      animation: {
        // Fade up and down
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "wiggle": "wiggle 0.5s ease-in-out infinite",
        "underline": 'underline 1s ease-in-out infinite',
        'text-clear': 'text-clear 5s forwards',
        'text-fade-in': 'text-fade-in 2s forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'matte-black': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
        'matte-black-radial': 'radial-gradient(circle, #0a0a0a 0%, #1a1a1a 100%)',
      },
      keyframes: {
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        underline: {
          'from, to': { width: '0%' },
          '50%': { width: '100%' },
        },
        'text-clear': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'text-fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.underline-animation': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '0%',
            height: '2px',
            backgroundColor: 'currentColor',
            animation: 'underline 1s ease-in-out infinite',
          },
        },
        '.hidden': {
          display: 'none',
        },
        '.fade-out': {
          opacity: 0,
          height: 0,
        },
        '.new-content': {
          opacity: 0,
          // height: 0,
        },
        '.fade-in': {
          opacity: 1,
          height: 'auto',
        }
      });
    }),
  ],
};
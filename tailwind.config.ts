/** @type {import('tailwindcss').Config} */
const defaultConfig = require("shadcn-ui/tailwind.config")

module.exports = {
  ...defaultConfig,
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        "primary-red": "#dd3523",
        "primary-orange": "#fa6900",
      },
      animation: {
        "gradient-shift": "gradient-shift 3s ease-in-out infinite",
        shine: "shine 2s ease-in-out infinite",
        "wave-flow": "wave-flow 4s ease-in-out infinite",
        "wave-move": "wave-move 1.5s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "counter-glow": "counter-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        shine: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        "wave-flow": {
          "0%, 100%": { "background-position": "0% 50%" },
          "25%": { "background-position": "100% 50%" },
          "50%": { "background-position": "200% 50%" },
          "75%": { "background-position": "300% 50%" },
        },
        "wave-move": {
          "0%": { "background-position": "0px 0" },
          "100%": { "background-position": "40px 0" },
        },
        "pulse-dot": {
          "0%, 100%": {
            transform: "translateY(-50%) scale(1)",
            "box-shadow": "0 0 0 0 rgba(250, 105, 0, 0.7)",
          },
          "50%": {
            transform: "translateY(-50%) scale(1.1)",
            "box-shadow": "0 0 0 8px rgba(250, 105, 0, 0)",
          },
        },
        "counter-glow": {
          "0%, 100%": {
            color: "#dd3523",
            "text-shadow": "0 0 5px rgba(221, 53, 35, 0.3)",
          },
          "50%": {
            color: "#fa6900",
            "text-shadow": "0 0 10px rgba(250, 105, 0, 0.5)",
          },
        },
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

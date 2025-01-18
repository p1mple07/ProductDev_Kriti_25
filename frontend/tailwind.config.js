/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      colors: {
        // primary: "#171717",        // Dark gray
        // secondary: "#212121",      // Slightly lighter gray
        // tertiary: "#2F2F2F",       // Neutral gray
        // border: "#4A5568",         // Neutral dark gray
        // background: "#0D0D0D",     // Deep black
        // primary_text: "#FFFFFF",   // Bright white
        // secondary_text: "#B4B4B4", // Light gray
        // accent: "#10A37F",         // Main teal-green accent
        // hover_accent: "#1ABC9C",   // Brighter teal for hover effects

        "primary": "#0C1218",        // Deeper navy black for main elements
        "secondary": "#151E26",      // Richer slate gray for secondary surfaces
        "tertiary": "#1E2A34",       // Warmer dark blue-gray for layering
        "border": "#2F4356",         // Slightly warmer steel gray for better definition
        "background": "#090C11",     // Darker background for more contrast
        "primary_text": "#F0F2F4",   // Brighter off-white for better readability
        "secondary_text": "#B0BAC5", // Lighter grayish-blue for better contrast
        "accent": "#0891B2",         // Deep cyan as the accent color
        "hover_accent": "#00B0C8",   // Lighter cyan for hover states
      },
      animation: {
        vote: "vote 1s ease-in-out",
      },
      keyframes: {
        vote: {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(-30deg)",
          },
          "75%": {
            transform: "rotate(30deg)",
          },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
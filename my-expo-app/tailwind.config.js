/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        card: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.06)",
        "card-hover": "0 4px 10px rgba(16,24,40,0.10)",
      },
      fontSize: {
        caption: ["12px", { lineHeight: "19.2px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "22.4px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "25.6px", fontWeight: "400" }],
        h2: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h1: ["24px", { lineHeight: "33.6px", fontWeight: "700" }],
        display: ["32px", { lineHeight: "44.8px", fontWeight: "700" }],
      },
      colors: {
        brand: "#DB2777",
        "brand-dark": "#EC4899",
        "sky-assist": "#0EA5E9",
      },
    },
  },
};

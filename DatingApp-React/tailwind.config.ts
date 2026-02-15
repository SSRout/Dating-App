/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neon-pink": "#FF006E",
        "neon-cyan": "#00D9FF",
        "neon-lime": "#00FF41",
        "neon-purple": "#B537F2",
        "dark-bg": "#0D0221",
        "dark-card": "#1A0033",
        "dark-border": "#2D0A4E",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #FF006E 0%, #B537F2 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #00D9FF 0%, #00FF41 100%)",
        "gradient-dark": "linear-gradient(135deg, #0D0221 0%, #1A0033 100%)",
        "gradient-neon":
          "linear-gradient(135deg, #FF006E 0%, #00D9FF 50%, #B537F2 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(255, 0, 110, 0.5)",
          },
          "50%": {
            opacity: ".8",
            boxShadow: "0 0 40px rgba(255, 0, 110, 0.8)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "neon-pink": "0 0 10px #FF006E, 0 0 20px rgba(255, 0, 110, 0.5)",
        "neon-cyan": "0 0 10px #00D9FF, 0 0 20px rgba(0, 217, 255, 0.5)",
        "neon-purple": "0 0 10px #B537F2, 0 0 20px rgba(181, 55, 242, 0.5)",
      },
    },
  },
  plugins: [],
};

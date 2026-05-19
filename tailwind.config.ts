import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005a71",
        "primary-light": "#0E7490",
        amber: "#D97706",
        surface: "#F8FAFC",
        "text-main": "#0F172A",
        "text-muted": "#475569"
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glass: "0 24px 70px -28px rgba(14, 116, 144, 0.38)",
        glow: "0 22px 80px -38px rgba(217, 119, 6, 0.6)"
      },
      backgroundImage: {
        "teal-texture":
          "radial-gradient(circle at 20% 10%, rgba(255,255,255,.16), transparent 24rem), linear-gradient(135deg, #003f50, #005a71 45%, #0E7490)"
      }
    }
  },
  plugins: []
};

export default config;

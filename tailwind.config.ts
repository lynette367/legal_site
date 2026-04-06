import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "#F8F6FC",
        "bg-card": "#FEFEFF",
        "primary-lavender": "#C8B6E2",
        "primary-lavender-dark": "#B5A0D5",
        "text-primary": "#2C2C2C",
        "text-lavender": "#6B5A8E",
        "border-lavender": "rgba(200, 182, 226, 0.2)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 40px rgba(107, 90, 142, 0.12)",
        "soft-inner": "inset 0 1px 0 rgba(255,255,255,0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

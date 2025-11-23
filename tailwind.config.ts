import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 薄荷绿色系
        "primary-mint": "#7EC4A4",
        "primary-mint-dark": "#5FAF8F",
        "primary-mint-light": "#A8D8BA",
        // 辅助色
        "accent-blue": "#A8D8EA",
        "accent-pink": "#FFB6C1",
        "accent-gold": "#F4D03F",
        // 背景色系统
        "bg-main": "#F0FAF5",
        "bg-card": "#FDFFFE",
        "bg-alt": "#E6F7EF",
        // 文本色
        "text-primary": "#2C2C2C",
        "text-secondary": "#4A4A4A",
        "text-tertiary": "#6B6B6B",
        "text-mint": "#3D7A5E",
        // 兼容旧名称（逐步迁移）
        background: "#F0FAF5",
        "text-dark": "#2C2C2C",
        "primary-pink": "#FFB6C1",
        "primary-blue": "#A8D8EA",
        "primary-green": "#A8D8BA",
        "light-pink": "#FFB6C1",
        "light-blue": "#A8D8EA",
        "mint-green": "#A8D8BA",
        cream: "#FDFFFE",
        "dark-gray": "#2C2C2C",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(126, 196, 164, 0.12)",
        "soft-lg": "0 12px 32px rgba(126, 196, 164, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

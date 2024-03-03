import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import { ovrriedWithRoot10PX } from "./config/tailwind";

const config = {
  /**
   * 兼容 next-theme 主题方案
   */
  darkMode: "class",

  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...ovrriedWithRoot10PX,

      fontFamily: {
        Poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        "Poppins-Regular": ["Poppins-Regular", ...defaultTheme.fontFamily.sans],
        "Poppins-Bold": ["Poppins-Bold", ...defaultTheme.fontFamily.sans],
        "Poppins-Medium": ["Poppins-Medium", ...defaultTheme.fontFamily.sans],
        "Poppins-SemiBold": [
          "Poppins-SemiBold",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      zIndex: {
        header: "10",
        "reviews-side": "20",
        100: "10",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        secondary2: "var(--secondary2)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-secondary2": "var(--text-secondary2)",
        hover: "var(--hover)",
        hover2: "var(--hover2)",
        hover3: "var(--hover3)",
        "color-f5f5f5": "var(--color-f5f5f5)",
        "color-e9e9e9": "var(--color-e9e9e9)",
        "color-e3392c": "var(--color-e3392c)",
        "color-e8e8e8": "var(--color-e8e8e8)",
        "color-707070": "var(--color-707070)",
        "color-fb8178": "var(--color-fb8178)",
        "color-A8A8A8": "var(--color-A8A8A8)",
        "color-FFAB00": "var(--color-FFAB00)",
      },
    },
  },

  plugins: [
    plugin(({ addBase }) => {
      addBase({
        html: { fontSize: "10px" },
      });
    }),
    require("@tailwindcss/typography"),
  ],
};

export default config;

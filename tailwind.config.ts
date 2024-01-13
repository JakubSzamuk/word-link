import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        header: "48px",
        standard: "20px",
        button: "24px",
      },
      colors: {
        secondary: "#343D47",
        tertiary: "#1D242C",
      },
    },
  },
  plugins: [],
};
export default config;

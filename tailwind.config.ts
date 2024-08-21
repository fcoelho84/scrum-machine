import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      primary: "#030410",
      secondary: "#14194c",
      blueGray: "#3c4f61",
      brown: "#ba735e",
      neutral: {
        light: "#f3f2f5",
        dark: "#a6a4b2"
      },
      highlight: "#04c3c3"
    }
  },
  plugins: [],
} satisfies Config;

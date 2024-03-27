import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        downy: {
          "50": "#f1fcfa",
          "100": "#d1f6f2",
          "200": "#a4ebe5",
          "300": "#5fd6d0",
          "400": "#40c1bf",
          "500": "#27a5a4",
          "600": "#1d8284",
          "700": "#1b686a",
          "800": "#1a5355",
          "900": "#1a4547",
          "950": "#09272a",
        },
      },
    },
  },
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "MagicPing V2.0",
    },
  },
  devtools: {
    enabled: false,
  },
  ui: {
    icons: ["solar", "line-md"],
  },
  css: ["@/assets/main.scss"],
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/color-mode", "@vueuse/nuxt"],
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    classSuffix: "",
  },
});

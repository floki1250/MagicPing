// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "ＭａｇｉｃＰｉｎｇ",
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
});

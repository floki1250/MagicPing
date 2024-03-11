// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  ui: {
    icons: ["solar"],
  },

  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/color-mode", "@vueuse/nuxt"],
});

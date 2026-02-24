// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@clerk/nuxt', '@pinia/nuxt'],
  clerk: {
    isSatellite: true,
    signInUrl: `${process.env.NUXT_PUBLIC_MAIN_SITE_URL ?? 'http://localhost:3000'}/login`,
    skipServerMiddleware: true,
  },
  css: ['~/assets/main.css'],
  $development: {
    devServer: { host: '0.0.0.0', port: 3001 },
  },
  runtimeConfig: {
    public: {
      mainSiteUrl: 'http://localhost:3000',
    },
  },
})

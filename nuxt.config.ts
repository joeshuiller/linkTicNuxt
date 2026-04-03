// Ya no importamos tailwindcss desde Vite, Nuxt UI se encarga de todo.

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // Excelente mantener esto para tu Arquitectura Limpia
  srcDir: 'app/presentation/',

  app: {
    head: {
      title: 'LinkTicNuxt',
      htmlAttrs: {
        lang: 'es',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Descripción de mi e-commerce' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
      // Eliminado el array de scripts vacío (no es necesario)
    }
  },

  css: ['~/assets/css/style.css'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-pdf',
    '@vee-validate/nuxt',
    '@vesp/nuxt-fontawesome',
    'nuxt-csurf',
    'nuxt-http-client-hints',
    'nuxt-icons',
  ],

  devtools: { enabled: true },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod',
      ]
    }
  }
})
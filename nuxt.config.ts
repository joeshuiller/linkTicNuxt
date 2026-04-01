// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'LinkTicNuxt', // Cámbialo al nombre de tu e-commerce
      htmlAttrs: {
        lang: 'es', // Cámbialo a 'es' si tu prueba es en español
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // En Nuxt 3 ya NO necesitas usar 'hid' para evitar duplicados, 
        // el framework lo maneja automáticamente basándose en el 'name'
        { name: 'description', content: 'Descripción de mi e-commerce' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          async: true,
          src: "https://unpkg.com/@material-tailwind/html/scripts/ripple.js",
        },
      ],
    }
  },
  // 2. Archivos CSS globales
  css: [
  ],

  // 3. Plugins
  // Nota de Senior: En Nuxt 3 no necesitas declararlos aquí si están dentro 
  // de tu carpeta `plugins/`, el framework los auto-importa.
  plugins: [],

  // 4. Auto-importación de componentes
  // Nuxt 3 ya hace esto por defecto (true), pero es seguro dejarlo explícito.
  components: true,
  srcDir: 'app/presentation/',
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-pdf',
    '@vee-validate/nuxt',
    '@vesp/nuxt-fontawesome',
    '@vuestic/nuxt',
    'nuxt-csurf',
    'nuxt-delay-hydration',
    'nuxt-http-client-hints',
    'nuxt-icons',
    'nuxt-jsonapi',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  postcss: {
    plugins: {
      tailwindcss: {
        exposeConfig: true,
        config: {
          content: [
            // Le decimos que escanee absolutamente todos los archivos Vue y TS dentro de presentation
            './app/presentation/**/*.vue',
            './app/presentation/**/*.ts',
            // Si llegas a crear componentes de UI en shared, también agrégalos:
            './app/shared/**/*.vue',
            './app/shared/**/*.ts',
          ]
        }
      },
      autoprefixer: {},
    },
  },
})
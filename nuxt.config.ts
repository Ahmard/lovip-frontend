// https://nuxt.com/docs/api/configuration/nuxt-config

// @ts-ignore
const APP_NAME: string = process.env.APP_NAME;
// @ts-ignore
const BACKEND_API_VERSION: string = process.env.BACKEND_API_VERSION;

export default defineNuxtConfig({
// @ts-ignore
  ssr: false,
  devServer: {
    port: process.env.SERVER_PORT,
    host: process.env.APP_HOST,
  },
  modules: [
    '@element-plus/nuxt',
    '@nuxt-alt/auth',
    '@pinia/nuxt',
  ],
  app: {
    head: {
      title: APP_NAME,
      titleTemplate: `%s - ${APP_NAME}`,
      meta: [
        {
          name: 'viewport', content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Datano, fastest data platform on the net',
        },
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        {rel: 'stylesheet', type: 'text/css', href: '/assets/css/bootstrap-utilities.min.css'},
        {rel: 'stylesheet', type: 'text/css', href: '/assets/css/bootstrap-grid.min.css'},
        {rel: 'stylesheet', type: 'text/css', href: '/assets/css/moovie.min.css'},
      ],

      script: [
        {
          src: "/assets/js/moovie.min.js",
        }
      ],
    }
  },

  runtimeConfig: {
    public: {
      APP_NAME: APP_NAME,
      BACKEND_API_VERSION: BACKEND_API_VERSION,
      DEFAULT_SERVER: 'http://192.168.1.20:6503',
      DEFAULT_FOLDERS: [
        '/home/ahmard/Videos/Movies',
        '/home/ahmard/Videos/Documentaries',
      ]
    }
  },

  css: [
    "~/assets/style.css"
  ],

  typescript: {
    strict: true,
    shim: false,
  },

  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },

  vite: {},

  router: {
    options: {
      hashMode: true,
    }
  },

})

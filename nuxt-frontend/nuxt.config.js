export default {
  alias: {
    '@':'/'
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {"http-equiv":"X-UA-Compatible", content:"IE=edge,chrome=1"},
      { charset: 'utf-8' },
      { name:"viewport", content :"initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no" },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '@/plugins/ant-design-vue'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:'http://127.0.0.1:8000/api/v1'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

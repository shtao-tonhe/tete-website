const webpack = require("webpack");
module.exports = {
  /*
   ** Server configuration
   */
  server: {
    port: 3000,
    host: '127.0.0.1',
    timing: false
  },
  /*
   ** Environment variable configuration
   */
  env: {
    baseUrl: "http://teteday.com/api-backend"
  },
  /*
   ** Router configuration
   */
  router: {
    middleware: ["auth", "i18n"],
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/",
        redirect: {
          name: "timeline-title"
        }
      });
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "TETE",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"
      },
      {
        name: "google-signin-client_id",
        content:
          "994358405822-0uper7n5e9l0cisgcesotd6kbhqtcfrv.apps.googleusercontent.com"
      },
      { name: "referrer", content: "never" },
      {
        hid: "keywords",
        name: "keywords",
        content: "tete"
      },
      {
        hid: "description",
        name: "description",
        content: "tete"
      },
      // apple login
      {
        hid: "appleid-signin-client-id",
        name: "appleid-signin-client-id",
        content: "com.teteday.clientid"
      },
      {
        hid: "appleid-signin-scope",
        name: "appleid-signin-scope",
        content: "name"
      },
      {
        hid: "appleid-signin-redirect-uri",
        name: "appleid-signin-redirect-uri",
        content: "https://teteday.com/redirect/apple"
      },
      {
        hid: "appleid-signin-state",
        name: "appleid-signin-state",
        content: "tete"
      },
      // facebook-share
      // {
      //   property: "og:title",
      //   content: "tete"
      // },
      // {
      //   property: "og:type",
      //   content: "website"
      // },
      // {
      //   property: "fb:app_id",
      //   content: "2804752129798185"
      // },
      // {
      //   property: "og:type",
      //   content: "website"
      // },
      // {
      //   property: "og:description",
      //   content: "tete-description"
      // },
      // {
      //   property: "og:image",
      //   content:
      //     "https://teteday.com/share_img.jpg"
      // },
      // {
      //   property: "og:url",
      //   content: "https://teteday.com"
      // },
      // {
      //   property: "og:image:alt",
      //   content: "tete - image:alt"
      // }
      // facebook-share
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "//connect.facebook.net/en_US/sdk.js",
        defer: true,
        async: true
      },
      {
        src:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6C4HP3fbie1YL9-9pxojmuiQ6JCyWD1I&libraries=places&language=en",
        defer: true,
        async: true
      },
      {
        src: "https://platform.linkedin.com/badges/js/profile.js",
        defer: true,
        async: true
      },

      {
        src: "https://apis.google.com/js/platform.js",
        defer: true,
        async: true
      },
      {
        src:
          "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
        defer: true,
        async: true
      },
      {
        src: "/lib/fb.js"
      }

      // {
      //   src: "//cdn.jsdelivr.net/npm/xgplayer@2.9.6/browser/index.js"
      // },
      // {
      //   src: "//cdn.jsdelivr.net/npm/xgplayer-hls.js@2.2.3/browser/index.js"
      // },
      // {
      //   src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      // }
    ]
  },
  watchQuery: true,
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fe2c55"
  },
  /*
   ** Global CSS
   */
  css: [
    "ant-design-vue/dist/antd.css",
    "~/assets/css/reset.css",
    "~/assets/css/page-transition.css",
    "~/assets/scss/global.scss",
    {
      lang: "less",
      src: "~/assets/styles/common.less"
    }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "@/plugins/Carousel3d",
      ssr: false
    },
    { src: "~/plugins/cropper", ssr: false },
    "@/plugins/global.js",
    "@/plugins/antd-ui",
    `@/plugins/filters`,
    "~/plugins/axios.js",
    "~/plugins/request.js",
    "~/plugins/api.js",
    "~/plugins/vue-global.js",
    "~/plugins/googleSigninButton.js",
    // "~/plugins/LNSiginButton.js",
    // "~/plugins/FBSignInButton.js",
    {
      src: "@/plugins/lazy-load",
      ssr: false
    },
    { src: "~/plugins/localStorage", ssr: false },
    "~/plugins/i18n.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  // buildModules: [
  //   // Doc: https://github.com/nuxt-community/eslint-module
  //   '@nuxtjs/eslint-module'
  // ],
  /*
   ** Nuxt.js modules
   */
  wacthQuery: true,
  modules: [
    "nuxt-clipboard2",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/style-resources",
    "cookie-universal-nuxt"
  ],
  styleResources: {
    scss: ["~/assets/scss/variable.scss"]
  },
  serverMiddleware: [],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  // axios: {
  //   // See https://github.com/nuxt-community/axios-module#options
  //   proxy: true, // 表示开启代理
  //   prefix: "/", // 表示给请求url加个前缀 /api
  //   credentials: false // 表示跨域请求时是否需要使用凭证
  // },
  proxy: {
    "/aetherupload/": {
      target: "https://static-res.teteday.com/aetherupload/", // 目标接口域名
      pathRewrite: {
        "^/dspVideo/": "" // 把 /api 替换成‘’
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery"
      })
    ],
    /*
     ** You can extend webpack config here
     */
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk"
          }
        ]
      ]
    },
    extend(config, ctx) {}
  }
};

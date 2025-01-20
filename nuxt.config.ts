export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: true,

  runtimeConfig: {
    public: {
      baseUrl: process.env.API_URL,
    },
  },

  nitro: {
    routeRules: {
      "/**": { headers: { "Cache-Control": "public" } },
    },
  },

  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: "WebSwift",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
      ],
    },
  },

  modules: ["@nuxtjs/i18n", "@pinia/nuxt", "@nuxt/image", "@nuxt/icon"],

  i18n: {
    baseUrl: "https://web-swift.co",
    defaultLocale: "en",
    lazy: true,
    strategy: "prefix_except_default",
    differentDomains: true,
    locales: [
      {
        code: "en",
        name: "EN",
        file: "en.ts",
        language: "en",
        domain: "web-swift.co",
        domainDefault: true,
      },
      {
        code: "ua",
        name: "UA",
        file: "ua.ts",
        language: "uk",
        domain: "ua.web-swift.co",
        domainDefault: true,
      },
    ],

    compilation: {
      escapeHtml: false,
      strictMessage: false,
    },
  },

  icon: {
    provider: "server",
    customCollections: [
      {
        prefix: "my",
        dir: "./assets/icons",
      },
    ],
    serverBundle: {
      collections: [],
    },
    mode: "svg",
  },
});

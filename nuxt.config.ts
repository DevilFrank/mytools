import process from 'node:process'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com'

export default defineNuxtConfig({
  ssr: true,

  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  runtimeConfig: {
    public: {
      siteUrl,
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || 'contact@example.com',
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Free browser-based tools for developers, data analysts, and website operators.',
        },
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-PZHTHBJXYN',
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PZHTHBJXYN');
          `,
        },
        {
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1090956656099890',
          crossorigin: 'anonymous',
        },
      ],
    },
  },

  site: {
    url: siteUrl,
    name: 'Free Online Tools',
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en',
        file: 'en.json',
      },
      {
        code: 'zh-CN',
        name: '简体中文',
        language: 'zh-CN',
        file: 'zh-CN.json',
      },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/tools',
        '/tools/json-formatter',
        '/tools/timestamp-converter',
        '/tools/url-encoder',
        '/tools/base64',
        '/tools/user-agent-parser',
        '/tools/sls-sql-generator',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms',
        '/zh-CN',
        '/zh-CN/tools',
        '/zh-CN/tools/json-formatter',
        '/zh-CN/tools/timestamp-converter',
        '/zh-CN/tools/url-encoder',
        '/zh-CN/tools/base64',
        '/zh-CN/tools/user-agent-parser',
        '/zh-CN/tools/sls-sql-generator',
        '/zh-CN/about',
        '/zh-CN/contact',
        '/zh-CN/privacy-policy',
        '/zh-CN/terms',
      ],
    },
  },

  compatibilityDate: '2025-01-01',
})

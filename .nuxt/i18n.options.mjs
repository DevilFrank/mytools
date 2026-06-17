
// @ts-nocheck


export const localeCodes =  [
  "en",
  "zh-CN"
]

export const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_45fd81b0",
      load: () => import("#nuxt-i18n/45fd81b0" /* webpackChunkName: "locale_en_46json_45fd81b0" */),
      cache: true
    }
  ],
  "zh-CN": [
    {
      key: "locale_zh_45CN_46json_1e4f8a83",
      load: () => import("#nuxt-i18n/1e4f8a83" /* webpackChunkName: "locale_zh_45CN_46json_1e4f8a83" */),
      cache: true
    }
  ]
}

export const vueI18nConfigs = []

export const nuxtI18nOptions = {
  restructureDir: "i18n",
  experimental: {
    localeDetector: "",
    switchLocalePathLinkSSR: false,
    autoImportTranslationFunctions: false,
    typedPages: true,
    typedOptionsAndMessages: false,
    generatedLocaleFilePathFormat: "absolute",
    alternateLinkCanonicalQueries: false,
    hmr: true
  },
  bundle: {
    compositionOnly: true,
    runtimeOnly: false,
    fullInstall: true,
    dropMessageCompiler: false,
    optimizeTranslationDirective: false
  },
  compilation: {
    strictMessage: true,
    escapeHtml: false
  },
  customBlocks: {
    defaultSFCLang: "json",
    globalSFCScope: false
  },
  locales: [
    {
      code: "en",
      name: "English",
      language: "en",
      files: [
        {
          path: "/Users/devilfrank/project/mytools/i18n/locales/en.json",
          cache: undefined
        }
      ]
    },
    {
      code: "zh-CN",
      name: "简体中文",
      language: "zh-CN",
      files: [
        {
          path: "/Users/devilfrank/project/mytools/i18n/locales/zh-CN.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "en",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "prefix_except_default",
  lazy: true,
  langDir: "locales",
  rootRedirect: undefined,
  detectBrowserLanguage: {
    alwaysRedirect: false,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieKey: "i18n_redirected",
    cookieSecure: false,
    fallbackLocale: "en",
    redirectOn: "root",
    useCookie: true
  },
  differentDomains: false,
  baseUrl: "",
  customRoutes: "page",
  pages: {},
  skipSettingLocaleOnNavigate: false,
  types: "composition",
  debug: false,
  parallelPlugin: false,
  multiDomainLocales: false,
  i18nModules: []
}

export const normalizedLocales = [
  {
    code: "en",
    name: "English",
    language: "en",
    files: [
      {
        path: "/Users/devilfrank/project/mytools/i18n/locales/en.json",
        cache: undefined
      }
    ]
  },
  {
    code: "zh-CN",
    name: "简体中文",
    language: "zh-CN",
    files: [
      {
        path: "/Users/devilfrank/project/mytools/i18n/locales/zh-CN.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = true
export const hasPages = true

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/

/** client-end **/
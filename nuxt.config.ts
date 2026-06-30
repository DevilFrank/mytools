import process from 'node:process'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://the0705.com'
const canonicalSiteUrl = process.env.NUXT_PUBLIC_CANONICAL_SITE_URL || siteUrl
const gtagId = process.env.NUXT_PUBLIC_GTAG_ID || 'G-PZHTHBJXYN'
const adsenseClient = process.env.NUXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-1090956656099890'

export default defineNuxtConfig({
	ssr: true,

	experimental: {
		appManifest: false,
	},

	modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap', 'nuxt-gtag'],

	tailwindcss: {
		cssPath: '~/assets/css/main.css',
	},

	runtimeConfig: {
		public: {
			siteUrl,
			canonicalSiteUrl,
			contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || 'NUXT_PUBLIC_CONTACT_EMAIL',
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
					src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`,
					crossorigin: 'anonymous',
				},
			],
		},
	},

	gtag: {
		id: gtagId,
		enabled: true,
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
				'/tools/scroll-distance-ratio',
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
				'/zh-CN/tools/scroll-distance-ratio',
				'/zh-CN/tools/sls-sql-generator',
				'/zh-CN/about',
				'/zh-CN/contact',
				'/zh-CN/privacy-policy',
				'/zh-CN/terms',
				'/api/sql/fields',
				'/api/sql/events',
			],
		},
		preset: 'cloudflare-pages',
	},

	compatibilityDate: '2025-01-01',
})

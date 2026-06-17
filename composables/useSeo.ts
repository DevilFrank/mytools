import { useHead, useI18n, useRuntimeConfig, useSeoMeta } from '#imports'

interface SeoOptions {
  title: string
  description: string
  path: string
}

export function useSeo(options: SeoOptions) {
  const config = useRuntimeConfig()
  const { locale, t } = useI18n()
  const siteUrl = String(config.public.siteUrl || 'https://example.com')
  const normalizedPath = options.path === '/' ? '/' : `/${options.path.replace(/^\/+/, '')}`
  const localizedPath = locale.value === 'zh-CN'
    ? normalizedPath === '/' ? '/zh-CN' : `/zh-CN${normalizedPath}`
    : normalizedPath
  const canonical = new URL(localizedPath, siteUrl).toString()
  const englishUrl = new URL(normalizedPath, siteUrl).toString()
  const zhUrl = new URL(normalizedPath === '/' ? '/zh-CN' : `/zh-CN${normalizedPath}`, siteUrl).toString()
  const title = `${options.title} - ${t('site.name')}`

  useSeoMeta({
    title,
    description: options.description,
    ogTitle: title,
    ogDescription: options.description,
    ogUrl: canonical,
    ogType: 'website',
    twitterCard: 'summary',
  })

  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
    link: [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hreflang: 'en', href: englishUrl },
      { rel: 'alternate', hreflang: 'zh-CN', href: zhUrl },
      { rel: 'alternate', hreflang: 'x-default', href: englishUrl },
    ],
  })
}

import { u as useSeoMeta, a as useHead } from './v3-DCsQRdlH.mjs';
import { u as useI18n, a as useRuntimeConfig } from './server.mjs';

function useSeo(options) {
  const config = useRuntimeConfig();
  const { locale, t } = useI18n();
  const siteUrl = String(config.public.siteUrl || "https://example.com");
  const normalizedPath = options.path === "/" ? "/" : `/${options.path.replace(/^\/+/, "")}`;
  const localizedPath = locale.value === "zh-CN" ? normalizedPath === "/" ? "/zh-CN" : `/zh-CN${normalizedPath}` : normalizedPath;
  const canonical = new URL(localizedPath, siteUrl).toString();
  const englishUrl = new URL(normalizedPath, siteUrl).toString();
  const zhUrl = new URL(normalizedPath === "/" ? "/zh-CN" : `/zh-CN${normalizedPath}`, siteUrl).toString();
  const title = `${options.title} - ${t("site.name")}`;
  useSeoMeta({
    title,
    description: options.description,
    ogTitle: title,
    ogDescription: options.description,
    ogUrl: canonical,
    ogType: "website",
    twitterCard: "summary"
  });
  useHead({
    htmlAttrs: {
      lang: locale.value
    },
    link: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hreflang: "en", href: englishUrl },
      { rel: "alternate", hreflang: "zh-CN", href: zhUrl },
      { rel: "alternate", hreflang: "x-default", href: englishUrl }
    ]
  });
}

export { useSeo as u };
//# sourceMappingURL=useSeo-Bk5vhMPb.mjs.map

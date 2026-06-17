import { defineComponent, mergeProps, unref, useSSRContext } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/server-renderer/index.mjs';
import { u as useSeo } from './useSeo-Bk5vhMPb.mjs';
import { u as useI18n, a as useRuntimeConfig } from './server.mjs';
import './v3-DCsQRdlH.mjs';
import '../_/renderer.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/destr/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/hookable/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/devilfrank/project/mytools/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/ohash/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/klona/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/defu/dist/defu.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/scule/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/unctx/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/devilfrank/project/mytools/node_modules/pathe/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/consola/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file:///Users/devilfrank/project/mytools/node_modules/devalue/index.js';
import 'file:///Users/devilfrank/project/mytools/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/vue-devtools-stub/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { t } = useI18n();
    const sectionKeys = [
      "pages.about.sections[0]",
      "pages.about.sections[1]",
      "pages.about.sections[2]",
      "pages.about.sections[3]"
    ];
    useSeo({
      title: t("pages.about.seoTitle"),
      description: t("pages.about.seoDescription"),
      path: "/about"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))}><div class="content-shell"><h1 class="text-4xl font-bold tracking-normal text-slate-950">${ssrInterpolate(_ctx.$t("pages.about.h1"))}</h1><div class="prose-section"><p>${ssrInterpolate(_ctx.$t("pages.about.intro"))}</p><!--[-->`);
      ssrRenderList(sectionKeys, (sectionKey) => {
        _push(`<!--[--><h2 class="section-title">${ssrInterpolate(_ctx.$t(`${sectionKey}.title`))}</h2><p>${ssrInterpolate(_ctx.$t(`${sectionKey}.body`))}</p><!--]-->`);
      });
      _push(`<!--]--><h2 class="section-title">${ssrInterpolate(_ctx.$t("pages.about.contactTitle"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.about.contactBody"))} <a${ssrRenderAttr("href", `mailto:${unref(config).public.contactEmail}`)}>${ssrInterpolate(unref(config).public.contactEmail)}</a>. </p></div></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-BJqD1nAt.mjs.map

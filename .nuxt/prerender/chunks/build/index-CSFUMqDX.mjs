import { _ as __nuxt_component_0 } from './nuxt-link-mvPhtKwM.mjs';
import { defineComponent, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/server-renderer/index.mjs';
import { _ as _sfc_main$1 } from './ToolCard-C69nNvtI.mjs';
import { u as useSeo } from './useSeo-Bk5vhMPb.mjs';
import { t as tools } from './tools-BIFehSDu.mjs';
import { u as useI18n, b as useLocalePath } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const featuredTools = tools;
    const { t } = useI18n();
    const localePath = useLocalePath();
    const categoryKeys = ["categories.developer", "categories.encoding", "categories.dateTime", "categories.diagnostics", "categories.logAnalysis"];
    useSeo({
      title: t("pages.home.seoTitle"),
      description: t("pages.home.seoDescription"),
      path: "/"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-white"><div class="page-container grid gap-8 py-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-center"><div><p class="text-sm font-semibold uppercase tracking-wide text-blue-700">${ssrInterpolate(_ctx.$t("pages.home.eyebrow"))}</p><h1 class="mt-3 max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">${ssrInterpolate(_ctx.$t("pages.home.h1"))}</h1><p class="mt-5 max-w-3xl text-lg leading-8 text-slate-700">${ssrInterpolate(_ctx.$t("pages.home.intro"))}</p><p class="mt-4 max-w-3xl text-base leading-7 text-slate-600">${ssrInterpolate(_ctx.$t("pages.home.privacy"))}</p><div class="button-row">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/tools"),
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("common.browseTools"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("common.browseTools")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/privacy-policy"),
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("common.privacyPolicy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("common.privacyPolicy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="rounded-lg border border-slate-200 bg-slate-50 p-6"><h2 class="text-xl font-semibold tracking-normal text-slate-950">${ssrInterpolate(_ctx.$t("pages.home.categoriesTitle"))}</h2><ul class="mt-4 space-y-3 text-sm text-slate-700"><!--[-->`);
      ssrRenderList(categoryKeys, (categoryKey) => {
        _push(`<li>${ssrInterpolate(_ctx.$t(categoryKey))}</li>`);
      });
      _push(`<!--]--></ul></div></div></section><section class="page-container"><div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 class="section-title">${ssrInterpolate(_ctx.$t("pages.home.recommendedTitle"))}</h2><p class="mt-2 max-w-2xl text-slate-600">${ssrInterpolate(_ctx.$t("pages.home.recommendedIntro"))}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/tools"),
        class: "text-sm font-semibold text-blue-700 no-underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("common.viewAllTools"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("common.viewAllTools")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(featuredTools), (tool) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: tool.id,
          tool
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section class="page-container pt-0"><div class="content-shell"><h2 class="section-title">${ssrInterpolate(_ctx.$t("pages.home.staticTitle"))}</h2><p class="mt-4 leading-7 text-slate-700">${ssrInterpolate(_ctx.$t("pages.home.staticIntro"))}</p></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CSFUMqDX.mjs.map

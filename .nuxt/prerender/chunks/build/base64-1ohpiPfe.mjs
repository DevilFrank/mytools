import { defineComponent, mergeProps, unref, ref, useSSRContext } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/server-renderer/index.mjs';
import { _ as _sfc_main$2, u as useCopy } from './useCopy-C7HWzAg9.mjs';
import { u as useI18n } from './server.mjs';
import { u as useSeo } from './useSeo-Bk5vhMPb.mjs';
import { g as getToolById } from './tools-BIFehSDu.mjs';
import './nuxt-link-mvPhtKwM.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/h3/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/destr/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/hookable/dist/index.mjs';
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
import 'file:///Users/devilfrank/project/mytools/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/vue-devtools-stub/dist/index.mjs';
import './v3-DCsQRdlH.mjs';
import '../_/renderer.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file:///Users/devilfrank/project/mytools/node_modules/devalue/index.js';
import 'file:///Users/devilfrank/project/mytools/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/devilfrank/project/mytools/node_modules/unhead/dist/utils.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Base64Tool",
  __ssrInlineRender: true,
  setup(__props) {
    const input = ref("");
    const output = ref("");
    const error = ref("");
    const { copied } = useCopy();
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><label class="field-label" for="base64-input">${ssrInterpolate(_ctx.$t("toolUi.base64.input"))}</label><textarea id="base64-input" class="textarea-input"${ssrRenderAttr("placeholder", _ctx.$t("toolUi.base64.placeholder"))}>${ssrInterpolate(input.value)}</textarea><div class="button-row"><button class="btn-primary" type="button">${ssrInterpolate(_ctx.$t("toolUi.base64.encode"))}</button><button class="btn-secondary" type="button">${ssrInterpolate(_ctx.$t("toolUi.base64.decode"))}</button><button class="btn-secondary" type="button">${ssrInterpolate(_ctx.$t("common.loadExample"))}</button><button class="btn-secondary" type="button">${ssrInterpolate(_ctx.$t("common.clear"))}</button></div>`);
      if (error.value) {
        _push(`<p class="status-error">${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-5"><label class="field-label" for="base64-output">${ssrInterpolate(_ctx.$t("common.output"))}</label><textarea id="base64-output" class="textarea-input" readonly>${ssrInterpolate(output.value)}</textarea><div class="button-row"><button class="btn-secondary" type="button"${ssrIncludeBooleanAttr(!output.value) ? " disabled" : ""}>${ssrInterpolate(unref(copied) ? _ctx.$t("common.copied") : _ctx.$t("common.copyOutput"))}</button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/Base64Tool.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "base64",
  __ssrInlineRender: true,
  setup(__props) {
    const tool = getToolById("base64");
    const { t } = useI18n();
    const howToUseKeys = [
      "pages.toolPages.base64.howToUse[0]",
      "pages.toolPages.base64.howToUse[1]"
    ];
    const faqKeys = [
      "pages.toolPages.base64.faq[0]",
      "pages.toolPages.base64.faq[1]",
      "pages.toolPages.base64.faq[2]"
    ];
    useSeo({
      title: t("pages.toolPages.base64.seoTitle"),
      description: t("pages.toolPages.base64.seoDescription"),
      path: tool.path
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))}><div class="content-shell"><header><h1 class="text-4xl font-bold tracking-normal text-slate-950">${ssrInterpolate(_ctx.$t("pages.toolPages.base64.h1"))}</h1><p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">${ssrInterpolate(_ctx.$t("pages.toolPages.base64.intro"))}</p></header><section class="tool-panel" aria-labelledby="base64-tool-heading"><h2 id="base64-tool-heading" class="section-title">${ssrInterpolate(_ctx.$t("pages.toolPages.base64.toolHeading"))}</h2>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.howToUse"))}</h2><!--[-->`);
      ssrRenderList(howToUseKeys, (paragraphKey) => {
        _push(`<p>${ssrInterpolate(_ctx.$t(paragraphKey))}</p>`);
      });
      _push(`<!--]--></section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.example"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.toolPages.base64.example"))}</p></section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.faq"))}</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(faqKeys, (faqKey) => {
        _push(`<div><h3 class="font-semibold text-slate-950">${ssrInterpolate(_ctx.$t(`${faqKey}.q`))}</h3><p>${ssrInterpolate(_ctx.$t(`${faqKey}.a`))}</p></div>`);
      });
      _push(`<!--]--></div></section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.privacyNote"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.toolPages.base64.privacy"))}</p></section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.relatedTools"))}</h2>`);
      _push(ssrRenderComponent(_sfc_main$2, { "current-tool": unref(tool) }, null, _parent));
      _push(`</section></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tools/base64.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=base64-1ohpiPfe.mjs.map

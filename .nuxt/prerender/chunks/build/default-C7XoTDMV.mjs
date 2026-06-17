import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/server-renderer/index.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-mvPhtKwM.mjs';
import { b as useLocalePath, u as useI18n, c as useSwitchLocalePath } from './server.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SiteFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-auto border-t border-slate-200 bg-white" }, _attrs))}><div class="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-600 sm:grid-cols-2 sm:px-6 lg:px-8"><div><p class="font-semibold text-slate-950">${ssrInterpolate(_ctx.$t("site.name"))}</p><p class="mt-2 max-w-xl">${ssrInterpolate(_ctx.$t("footer.description"))}</p></div><nav class="flex flex-wrap items-start gap-4 sm:justify-end"${ssrRenderAttr("aria-label", _ctx.$t("nav.footer"))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/tools"),
        class: "text-slate-700 no-underline hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav.tools"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav.tools")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/about"),
        class: "text-slate-700 no-underline hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav.about"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav.about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/privacy-policy"),
        class: "text-slate-700 no-underline hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav.privacy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav.privacy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/terms"),
        class: "text-slate-700 no-underline hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav.terms"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav.terms")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/contact"),
        class: "text-slate-700 no-underline hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav.contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div></footer>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SiteFooter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LanguageSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    const locales = [
      { code: "en", labelKey: "language.english" },
      { code: "zh-CN", labelKey: "language.chinese" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 p-1 text-xs font-semibold",
        "aria-label": _ctx.$t("language.label")
      }, _attrs))}><!--[-->`);
      ssrRenderList(locales, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.code,
          to: unref(switchLocalePath)(item.code),
          class: ["rounded px-2 py-1 no-underline transition", unref(locale) === item.code ? "bg-white text-blue-800 shadow-sm" : "text-slate-600 hover:text-blue-800"],
          "aria-current": unref(locale) === item.code ? "true" : void 0
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t(item.labelKey))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t(item.labelKey)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LanguageSwitcher.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SiteHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "border-b border-slate-200 bg-white" }, _attrs))}><nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8"${ssrRenderAttr("aria-label", _ctx.$t("nav.primary"))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/"),
        class: "text-lg font-semibold text-slate-950 no-underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("site.name"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("site.name")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-wrap items-center gap-3 text-sm font-medium sm:gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/tools"),
        class: "text-slate-700 no-underline hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav.tools"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav.tools")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/about"),
        class: "text-slate-700 no-underline hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav.about"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav.about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/contact"),
        class: "text-slate-700 no-underline hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("nav.contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("nav.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div></nav></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SiteHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-C7XoTDMV.mjs.map

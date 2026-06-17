import { _ as __nuxt_component_0 } from './nuxt-link-mvPhtKwM.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/server-renderer/index.mjs';
import { b as useLocalePath } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToolCard",
  __ssrInlineRender: true,
  props: {
    tool: {}
  },
  setup(__props) {
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: unref(localePath)(__props.tool.path),
        class: "block rounded-lg border border-slate-200 bg-white p-5 text-slate-800 no-underline shadow-sm transition hover:border-blue-200 hover:shadow-md"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-xs font-semibold uppercase tracking-wide text-blue-700"${_scopeId}>${ssrInterpolate(_ctx.$t(__props.tool.categoryKey))}</p><h3 class="mt-2 text-lg font-semibold tracking-normal text-slate-950"${_scopeId}>${ssrInterpolate(_ctx.$t(__props.tool.titleKey))}</h3><p class="mt-2 text-sm leading-6 text-slate-600"${_scopeId}>${ssrInterpolate(_ctx.$t(__props.tool.descriptionKey))}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-xs font-semibold uppercase tracking-wide text-blue-700" }, toDisplayString(_ctx.$t(__props.tool.categoryKey)), 1),
              createVNode("h3", { class: "mt-2 text-lg font-semibold tracking-normal text-slate-950" }, toDisplayString(_ctx.$t(__props.tool.titleKey)), 1),
              createVNode("p", { class: "mt-2 text-sm leading-6 text-slate-600" }, toDisplayString(_ctx.$t(__props.tool.descriptionKey)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/ToolCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ToolCard-C69nNvtI.mjs.map

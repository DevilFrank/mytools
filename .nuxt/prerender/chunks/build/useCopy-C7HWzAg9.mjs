import { _ as __nuxt_component_0 } from './nuxt-link-mvPhtKwM.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, ref, useSSRContext } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/server-renderer/index.mjs';
import { a as getRelatedTools } from './tools-BIFehSDu.mjs';
import { b as useLocalePath } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RelatedTools",
  __ssrInlineRender: true,
  props: {
    currentTool: {}
  },
  setup(__props) {
    const props = __props;
    const relatedTools = computed(() => getRelatedTools(props.currentTool));
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "mt-4 grid gap-3 sm:grid-cols-3" }, _attrs))}><!--[-->`);
      ssrRenderList(relatedTools.value, (tool) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)(tool.path),
          class: "block rounded-md border border-slate-200 bg-white p-4 text-slate-800 no-underline hover:border-blue-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="font-semibold text-slate-950"${_scopeId}>${ssrInterpolate(_ctx.$t(tool.titleKey))}</span><span class="mt-1 block text-sm leading-6 text-slate-600"${_scopeId}>${ssrInterpolate(_ctx.$t(tool.descriptionKey))}</span>`);
            } else {
              return [
                createVNode("span", { class: "font-semibold text-slate-950" }, toDisplayString(_ctx.$t(tool.titleKey)), 1),
                createVNode("span", { class: "mt-1 block text-sm leading-6 text-slate-600" }, toDisplayString(_ctx.$t(tool.descriptionKey)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/RelatedTools.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function useCopy() {
  const copied = ref(false);
  async function copyText(text) {
    {
      return;
    }
  }
  return {
    copied,
    copyText
  };
}

export { _sfc_main as _, useCopy as u };
//# sourceMappingURL=useCopy-C7HWzAg9.mjs.map

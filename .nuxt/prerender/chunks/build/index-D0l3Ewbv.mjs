import { defineComponent, computed, mergeProps, useSSRContext } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/server-renderer/index.mjs';
import { _ as _sfc_main$1 } from './ToolCard-C69nNvtI.mjs';
import { u as useSeo } from './useSeo-Bk5vhMPb.mjs';
import { t as tools } from './tools-BIFehSDu.mjs';
import { u as useI18n } from './server.mjs';
import './nuxt-link-mvPhtKwM.mjs';
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
    const { t } = useI18n();
    useSeo({
      title: t("pages.toolsIndex.seoTitle"),
      description: t("pages.toolsIndex.seoDescription"),
      path: "/tools"
    });
    const groupedTools = computed(() => {
      return tools.reduce((groups, tool) => {
        var _a;
        groups[_a = tool.categoryKey] || (groups[_a] = []);
        groups[tool.categoryKey].push(tool);
        return groups;
      }, {});
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))}><header class="content-shell"><h1 class="text-4xl font-bold tracking-normal text-slate-950">${ssrInterpolate(_ctx.$t("pages.toolsIndex.h1"))}</h1><p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">${ssrInterpolate(_ctx.$t("pages.toolsIndex.intro"))}</p></header><!--[-->`);
      ssrRenderList(groupedTools.value, (items, category) => {
        _push(`<section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t(category))}</h2><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        ssrRenderList(items, (tool) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            key: tool.id,
            tool
          }, null, _parent));
        });
        _push(`<!--]--></div></section>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tools/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D0l3Ewbv.mjs.map

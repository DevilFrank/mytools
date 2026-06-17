import { defineComponent, mergeProps, unref, reactive, ref, useSSRContext } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'file:///Users/devilfrank/project/mytools/node_modules/vue/server-renderer/index.mjs';
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
  __name: "SlsSqlGenerator",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      sourceUrl: "",
      step: "",
      type: "",
      trackType: "",
      groupBy: "trackId",
      timeBucket: "1m",
      limit: 100
    });
    const template = ref("pv-minute");
    const sql = ref("");
    const { copied } = useCopy();
    const { t } = useI18n();
    function sqlString(value) {
      return String(value || "").replace(/'/g, "''");
    }
    function sqlValue(value) {
      const raw = String(value || "").trim();
      if (!raw) return "";
      return /^-?\d+(\.\d+)?$/.test(raw) ? raw : `'${sqlString(raw)}'`;
    }
    function buildWhere() {
      var _a, _b, _c, _d;
      const clauses = [];
      if ((_a = form.sourceUrl) == null ? void 0 : _a.trim()) clauses.push(`su LIKE '%${sqlString(form.sourceUrl)}%'`);
      if ((_b = form.step) == null ? void 0 : _b.trim()) clauses.push(`step = ${sqlValue(form.step)}`);
      if ((_c = form.type) == null ? void 0 : _c.trim()) clauses.push(`type = ${sqlValue(form.type)}`);
      if ((_d = form.trackType) == null ? void 0 : _d.trim()) clauses.push(`trackType = ${sqlValue(form.trackType)}`);
      return clauses.length ? `WHERE ${clauses.join("\n  AND ")}` : "";
    }
    function bucketSeconds() {
      const mapping = {
        "10s": 10,
        "1m": 60,
        "5m": 300,
        "1h": 3600
      };
      return mapping[form.timeBucket || "1m"];
    }
    function generateSql() {
      var _a, _b;
      const limit = Math.max(1, Number(form.limit || 100));
      const where = buildWhere();
      const groupBy = ((_a = form.groupBy) == null ? void 0 : _a.trim()) || "trackId";
      if (template.value === "pv-minute") {
        sql.value = `*
| SELECT
  date_format(from_unixtime(__time__ - __time__ % 60), '%Y-%m-%d %H:%i:%s') AS time_bucket,
  COUNT(*) AS pv
FROM log
${where}
GROUP BY time_bucket
ORDER BY time_bucket
LIMIT ${limit}`;
        return;
      }
      if (template.value === "time-bucket") {
        const seconds = bucketSeconds();
        sql.value = `*
| SELECT
  date_format(from_unixtime(__time__ - __time__ % ${seconds}), '%Y-%m-%d %H:%i:%s') AS time_bucket,
  COUNT(*) AS pv
FROM log
${where}
GROUP BY time_bucket
ORDER BY time_bucket
LIMIT ${limit}`;
        return;
      }
      if (template.value === "group-by") {
        sql.value = `*
| SELECT
  ${groupBy},
  COUNT(*) AS count
FROM log
${where}
GROUP BY ${groupBy}
ORDER BY count DESC
LIMIT ${limit}`;
        return;
      }
      if (template.value === "filter-list") {
        sql.value = `*
| SELECT *
FROM log
${where}
LIMIT ${limit}`;
        return;
      }
      if (template.value === "track-id") {
        sql.value = `*
| SELECT
  trackId,
  COUNT(*) AS events
FROM log
${where}
GROUP BY trackId
ORDER BY events DESC
LIMIT ${limit}`;
        return;
      }
      sql.value = `*
| SELECT
    trackId,
    arbitrary(
      CASE
        WHEN type = 6 AND trackType = 1 THEN actionValue
        ELSE NULL
      END
    ) AS actionValue
FROM log
${((_b = form.sourceUrl) == null ? void 0 : _b.trim()) ? `WHERE su LIKE '%${sqlString(form.sourceUrl)}%'` : ""}
GROUP BY trackId
HAVING
    SUM(CASE WHEN type = 6 AND trackType = 1 THEN 1 ELSE 0 END) > 0
    AND
    SUM(CASE WHEN type = 7 AND trackType = 1 THEN 1 ELSE 0 END) = 0
LIMIT ${limit}`;
    }
    generateSql();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid gap-4 md:grid-cols-2"><div><label class="field-label" for="sls-template">${ssrInterpolate(_ctx.$t("toolUi.sls.template"))}</label><select id="sls-template" class="text-input"><option value="pv-minute"${ssrIncludeBooleanAttr(Array.isArray(template.value) ? ssrLooseContain(template.value, "pv-minute") : ssrLooseEqual(template.value, "pv-minute")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.templates.pvMinute"))}</option><option value="time-bucket"${ssrIncludeBooleanAttr(Array.isArray(template.value) ? ssrLooseContain(template.value, "time-bucket") : ssrLooseEqual(template.value, "time-bucket")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.templates.timeBucket"))}</option><option value="group-by"${ssrIncludeBooleanAttr(Array.isArray(template.value) ? ssrLooseContain(template.value, "group-by") : ssrLooseEqual(template.value, "group-by")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.templates.groupBy"))}</option><option value="filter-list"${ssrIncludeBooleanAttr(Array.isArray(template.value) ? ssrLooseContain(template.value, "filter-list") : ssrLooseEqual(template.value, "filter-list")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.templates.filterList"))}</option><option value="track-id"${ssrIncludeBooleanAttr(Array.isArray(template.value) ? ssrLooseContain(template.value, "track-id") : ssrLooseEqual(template.value, "track-id")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.templates.trackId"))}</option><option value="missing-b"${ssrIncludeBooleanAttr(Array.isArray(template.value) ? ssrLooseContain(template.value, "missing-b") : ssrLooseEqual(template.value, "missing-b")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.templates.missingB"))}</option></select></div><div><label class="field-label" for="sls-source-url">${ssrInterpolate(_ctx.$t("toolUi.sls.sourceUrl"))}</label><input id="sls-source-url"${ssrRenderAttr("value", form.sourceUrl)} class="text-input" placeholder="/checkout"></div><div><label class="field-label" for="sls-type">${ssrInterpolate(_ctx.$t("toolUi.sls.type"))}</label><input id="sls-type"${ssrRenderAttr("value", form.type)} class="text-input" placeholder="6"></div><div><label class="field-label" for="sls-track-type">${ssrInterpolate(_ctx.$t("toolUi.sls.trackType"))}</label><input id="sls-track-type"${ssrRenderAttr("value", form.trackType)} class="text-input" placeholder="1"></div><div><label class="field-label" for="sls-step">${ssrInterpolate(_ctx.$t("toolUi.sls.step"))}</label><input id="sls-step"${ssrRenderAttr("value", form.step)} class="text-input" placeholder="pay"></div><div><label class="field-label" for="sls-group-by">${ssrInterpolate(_ctx.$t("toolUi.sls.groupBy"))}</label><input id="sls-group-by"${ssrRenderAttr("value", form.groupBy)} class="text-input" placeholder="trackId"></div><div><label class="field-label" for="sls-time-bucket">${ssrInterpolate(_ctx.$t("toolUi.sls.timeBucket"))}</label><select id="sls-time-bucket" class="text-input"><option value="10s"${ssrIncludeBooleanAttr(Array.isArray(form.timeBucket) ? ssrLooseContain(form.timeBucket, "10s") : ssrLooseEqual(form.timeBucket, "10s")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.timeBuckets.10s"))}</option><option value="1m"${ssrIncludeBooleanAttr(Array.isArray(form.timeBucket) ? ssrLooseContain(form.timeBucket, "1m") : ssrLooseEqual(form.timeBucket, "1m")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.timeBuckets.1m"))}</option><option value="5m"${ssrIncludeBooleanAttr(Array.isArray(form.timeBucket) ? ssrLooseContain(form.timeBucket, "5m") : ssrLooseEqual(form.timeBucket, "5m")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.timeBuckets.5m"))}</option><option value="1h"${ssrIncludeBooleanAttr(Array.isArray(form.timeBucket) ? ssrLooseContain(form.timeBucket, "1h") : ssrLooseEqual(form.timeBucket, "1h")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("toolUi.sls.timeBuckets.1h"))}</option></select></div><div><label class="field-label" for="sls-limit">${ssrInterpolate(_ctx.$t("toolUi.sls.limit"))}</label><input id="sls-limit"${ssrRenderAttr("value", form.limit)} class="text-input" type="number" min="1" max="10000"></div></div><p class="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">${ssrInterpolate(_ctx.$t("toolUi.sls.notice"))}</p><div class="button-row"><button class="btn-primary" type="button">${ssrInterpolate(_ctx.$t("toolUi.sls.generate"))}</button><button class="btn-secondary" type="button">${ssrInterpolate(_ctx.$t("common.loadExample"))}</button><button class="btn-secondary" type="button">${ssrInterpolate(_ctx.$t("common.clear"))}</button></div><div class="mt-5"><label class="field-label" for="sls-output">${ssrInterpolate(_ctx.$t("toolUi.sls.output"))}</label><textarea id="sls-output" class="textarea-input min-h-72" readonly spellcheck="false">${ssrInterpolate(sql.value)}</textarea><div class="button-row"><button class="btn-secondary" type="button"${ssrIncludeBooleanAttr(!sql.value) ? " disabled" : ""}>${ssrInterpolate(unref(copied) ? _ctx.$t("common.copied") : _ctx.$t("common.copySql"))}</button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/SlsSqlGenerator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sls-sql-generator",
  __ssrInlineRender: true,
  setup(__props) {
    const tool = getToolById("sls-sql-generator");
    const { t } = useI18n();
    const howToUseKeys = [
      "pages.toolPages.slsSqlGenerator.howToUse[0]",
      "pages.toolPages.slsSqlGenerator.howToUse[1]"
    ];
    const faqKeys = [
      "pages.toolPages.slsSqlGenerator.faq[0]",
      "pages.toolPages.slsSqlGenerator.faq[1]",
      "pages.toolPages.slsSqlGenerator.faq[2]",
      "pages.toolPages.slsSqlGenerator.faq[3]"
    ];
    useSeo({
      title: t("pages.toolPages.slsSqlGenerator.seoTitle"),
      description: t("pages.toolPages.slsSqlGenerator.seoDescription"),
      path: tool.path
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))}><div class="content-shell"><header><h1 class="text-4xl font-bold tracking-normal text-slate-950">${ssrInterpolate(_ctx.$t("pages.toolPages.slsSqlGenerator.h1"))}</h1><p class="mt-4 max-w-3xl text-lg leading-8 text-slate-700">${ssrInterpolate(_ctx.$t("pages.toolPages.slsSqlGenerator.intro"))}</p></header><section class="tool-panel" aria-labelledby="sls-tool-heading"><h2 id="sls-tool-heading" class="section-title">${ssrInterpolate(_ctx.$t("pages.toolPages.slsSqlGenerator.toolHeading"))}</h2>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.howToUse"))}</h2><!--[-->`);
      ssrRenderList(howToUseKeys, (paragraphKey) => {
        _push(`<p>${ssrInterpolate(_ctx.$t(paragraphKey))}</p>`);
      });
      _push(`<!--]--></section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.example"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.toolPages.slsSqlGenerator.example"))}</p></section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.faq"))}</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(faqKeys, (faqKey) => {
        _push(`<div><h3 class="font-semibold text-slate-950">${ssrInterpolate(_ctx.$t(`${faqKey}.q`))}</h3><p>${ssrInterpolate(_ctx.$t(`${faqKey}.a`))}</p></div>`);
      });
      _push(`<!--]--></div></section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.privacyNote"))}</h2><p>${ssrInterpolate(_ctx.$t("pages.toolPages.slsSqlGenerator.privacy"))}</p></section><section class="prose-section"><h2 class="section-title">${ssrInterpolate(_ctx.$t("common.relatedTools"))}</h2>`);
      _push(ssrRenderComponent(_sfc_main$2, { "current-tool": unref(tool) }, null, _parent));
      _push(`</section></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tools/sls-sql-generator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sls-sql-generator-36qpe0VN.mjs.map

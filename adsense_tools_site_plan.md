# AdSense 工具站 MVP 开发计划书

## 1. 项目目标

开发一个面向开发者、站长、运营人员的在线工具集合站，用于后续申请 Google AdSense 并长期通过自然搜索流量变现。

核心目标：

1. 使用 Vue 技术栈开发。
2. 避免纯 SPA 首屏空白问题。
3. 支持无 JavaScript 环境下仍能展示完整页面主体内容。
4. 每个工具页具备可读文本、使用说明、FAQ 和相关工具推荐。
5. 第一版上线 6 个可用工具页面。
6. 站点结构满足基础 SEO 和 AdSense 审核要求。

---

## 2. 技术选型

推荐使用：

```txt
Nuxt 3
Vue 3
TypeScript
SSG 静态生成
Tailwind CSS 或 UnoCSS
Markdown 内容支持
Sitemap
Robots.txt
```

优先使用 Nuxt 3 的原因：

1. 可以通过 `nuxi generate` 生成静态 HTML。
2. 每个页面源码中直接包含正文内容。
3. 对 SEO 和 AdSense 审核更友好。
4. 工具交互仍然可以由 Vue 组件接管。
5. 后续扩展博客、教程、工具页比较方便。

---

## 3. 核心原则

### 3.1 页面不能依赖 JavaScript 才能看到主体内容

错误示例：

```html
<div id="app"></div>
<script src="/assets/index.js"></script>
```

正确目标：

```html
<main>
	<h1>JSON Formatter</h1>
	<p>Format, validate, and minify JSON data directly in your browser.</p>
	<section>
		<h2>How to use this tool</h2>
		<p>Paste your JSON data into the editor and click Format.</p>
	</section>
</main>
```

Vue 组件只负责工具交互，页面主体说明、FAQ、相关工具链接必须直接出现在静态 HTML 中。

### 3.2 每个工具页必须包含完整内容结构

每个工具页至少包含：

```txt
H1 标题
一句明确说明
工具交互区
How to use 使用说明
Example 示例
FAQ 常见问题
Privacy note 隐私说明
Related tools 相关工具
```

这样即使审核爬虫不执行 JS，也能识别页面价值。

### 3.3 工具逻辑优先本地执行

第一版所有工具尽量在浏览器本地执行，不上传用户输入。

每个工具页都要展示类似说明：

```txt
Your input is processed locally in your browser and is not uploaded to our server.
```

这有利于建立信任，也适合工具站定位。

---

## 4. 第一版 MVP 工具范围

第一版实现 6 个工具。

### 4.1 JSON Formatter

路径：

```txt
/tools/json-formatter
```

功能：

1. JSON 格式化。
2. JSON 压缩。
3. JSON 校验。
4. 错误提示。
5. 一键复制结果。
6. 清空输入。
7. 示例数据填充。

页面内容：

1. What is JSON formatting?
2. How to use this JSON formatter?
3. Common JSON errors.
4. Is my JSON uploaded?
5. JSON formatter vs JSON minifier.
6. Related tools.

### 4.2 Timestamp Converter

路径：

```txt
/tools/timestamp-converter
```

功能：

1. 时间戳转日期。
2. 日期转时间戳。
3. 支持秒级和毫秒级时间戳。
4. 显示本地时间。
5. 显示 UTC 时间。
6. 一键复制结果。

页面内容：

1. What is a Unix timestamp?
2. Difference between seconds and milliseconds.
3. How to convert timestamp to date?
4. How to convert date to timestamp?
5. FAQ.

### 4.3 URL Encoder / Decoder

路径：

```txt
/tools/url-encoder
```

功能：

1. URL encode。
2. URL decode。
3. 支持一键复制。
4. 错误输入提示。
5. 示例填充。

页面内容：

1. What is URL encoding?
2. When should you encode a URL?
3. Difference between encodeURI and encodeURIComponent.
4. FAQ.

### 4.4 Base64 Encoder / Decoder

路径：

```txt
/tools/base64
```

功能：

1. Base64 encode。
2. Base64 decode。
3. UTF-8 文本支持。
4. 错误提示。
5. 一键复制。

页面内容：

1. What is Base64?
2. Common use cases.
3. Is Base64 encryption?
4. FAQ.

### 4.5 User-Agent Parser

路径：

```txt
/tools/user-agent-parser
```

功能：

1. 输入 User-Agent 字符串。
2. 解析浏览器。
3. 解析操作系统。
4. 解析设备类型。
5. 解析渲染内核。
6. 示例 UA。
7. 一键复制结果。

页面内容：

1. What is a User-Agent string?
2. What information can a User-Agent reveal?
3. User-Agent and browser detection.
4. FAQ.

说明：第一版可以使用轻量解析逻辑，不一定依赖第三方库。后续可扩展 `ua-parser-js`。

### 4.6 Aliyun SLS SQL Generator

路径：

```txt
/tools/sls-sql-generator
```

功能：

1. 输入字段条件。
2. 选择聚合维度。
3. 选择时间粒度。
4. 生成常用阿里云日志 SLS SQL。
5. 支持复制 SQL。
6. 提供示例模板。

第一版支持模板：

```txt
按分钟统计 PV
按 10 秒分桶统计
按字段 group by
筛选 su like
筛选 type / trackType / step
按 trackId 聚合
查询有 A 无 B 的记录
```

页面内容：

1. What is Aliyun SLS SQL?
2. Common log analysis scenarios.
3. How to group logs by time bucket?
4. How to filter by URL or event type?
5. FAQ.

这是本站的差异化工具，优先保证可用性和页面质量。

---

## 5. 页面结构设计

### 5.1 路由结构

```txt
/
  首页

/tools
  工具列表页

/tools/json-formatter
/tools/timestamp-converter
/tools/url-encoder
/tools/base64
/tools/user-agent-parser
/tools/sls-sql-generator

/blog
  文章列表页

/blog/what-is-json-formatting
/blog/unix-timestamp-explained
/blog/url-encoding-explained
/blog/base64-explained
/blog/user-agent-explained
/blog/aliyun-sls-sql-examples

/about
/contact
/privacy-policy
/terms
```

### 5.2 首页结构

首页需要有完整介绍，不要只是工具卡片。

首页内容结构：

```txt
H1: Free Online Tools for Developers and Website Operators

简介：
A collection of browser-based tools for developers, data analysts, and website operators. These tools help you format data, convert timestamps, encode text, parse User-Agent strings, and generate log analysis SQL.

工具分类：
Developer Tools
Encoding Tools
Date and Time Tools
Web Diagnostics Tools
Log Analysis Tools

推荐工具卡片：
JSON Formatter
Timestamp Converter
URL Encoder
Base64 Encoder
User-Agent Parser
SLS SQL Generator

说明：
Most tools run locally in your browser. Your input is not uploaded unless explicitly stated.
```

### 5.3 工具页标准模板

每个工具页使用统一结构。

```vue
<template>
	<main class="page-container">
		<article>
			<header>
				<h1>{{ title }}</h1>
				<p>{{ description }}</p>
			</header>

			<section class="tool-panel">
				<!-- Vue tool component -->
			</section>

			<section>
				<h2>How to use this tool</h2>
				<p>...</p>
			</section>

			<section>
				<h2>Example</h2>
				<p>...</p>
			</section>

			<section>
				<h2>Frequently asked questions</h2>
				<div>
					<h3>Question</h3>
					<p>Answer</p>
				</div>
			</section>

			<section>
				<h2>Privacy note</h2>
				<p>Your input is processed locally in your browser and is not uploaded to our server.</p>
			</section>

			<section>
				<h2>Related tools</h2>
				<!-- related links -->
			</section>
		</article>
	</main>
</template>
```

---

## 6. 项目目录建议

```txt
nuxt-adsense-tools/
  app.vue
  nuxt.config.ts
  package.json
  tsconfig.json

  pages/
    index.vue
    tools/
      index.vue
      json-formatter.vue
      timestamp-converter.vue
      url-encoder.vue
      base64.vue
      user-agent-parser.vue
      sls-sql-generator.vue
    blog/
      index.vue
      what-is-json-formatting.vue
      unix-timestamp-explained.vue
      url-encoding-explained.vue
      base64-explained.vue
      user-agent-explained.vue
      aliyun-sls-sql-examples.vue
    about.vue
    contact.vue
    privacy-policy.vue
    terms.vue

  components/
    layout/
      SiteHeader.vue
      SiteFooter.vue
      ToolCard.vue
      RelatedTools.vue
    tools/
      JsonFormatter.vue
      TimestampConverter.vue
      UrlEncoder.vue
      Base64Tool.vue
      UserAgentParser.vue
      SlsSqlGenerator.vue

  composables/
    useCopy.ts
    useToolMeta.ts

  data/
    tools.ts
    faqs.ts

  public/
    robots.txt
    favicon.ico

  assets/
    css/
      main.css
```

---

## 7. Nuxt 配置要求

`nuxt.config.ts` 需要支持：

1. SSG 静态生成。
2. 设置站点 meta。
3. 生成 sitemap。
4. 开启良好的 HTML 输出。
5. 配置全局 CSS。

示例目标：

```ts
export default defineNuxtConfig({
	ssr: true,

	app: {
		head: {
			titleTemplate: '%s - Free Online Tools',
			meta: [
				{
					name: 'description',
					content: 'Free browser-based tools for developers and website operators.',
				},
			],
		},
	},

	css: ['~/assets/css/main.css'],

	nitro: {
		prerender: {
			crawlLinks: true,
			routes: [
				'/',
				'/tools',
				'/tools/json-formatter',
				'/tools/timestamp-converter',
				'/tools/url-encoder',
				'/tools/base64',
				'/tools/user-agent-parser',
				'/tools/sls-sql-generator',
				'/about',
				'/contact',
				'/privacy-policy',
				'/terms',
			],
		},
	},
})
```

---

## 8. AdSense 审核友好要求

### 8.1 内容要求

1. 首页有完整介绍。
2. 每个工具页有至少 500 字左右的说明内容。
3. 不能只有输入框和按钮。
4. 不使用采集内容。
5. 不使用大量 AI 生成的低质重复文章。
6. 不做诱导点击广告的设计。

### 8.2 技术要求

1. 使用 SSG 或 SSR。
2. 禁用 JS 后页面仍然能看到标题、正文、FAQ、相关链接。
3. `curl -L 页面地址` 能看到页面主体 HTML。
4. `robots.txt` 不阻止 JS、CSS、图片资源。
5. 页面加载速度要快。
6. 移动端可用。
7. 不需要登录即可访问所有审核页面。
8. 不要阻止 Googlebot 或 Mediapartners-Google。

### 8.3 必备页面

必须有：

```txt
/about
/contact
/privacy-policy
/terms
```

Privacy Policy 中说明：

1. 本站可能使用第三方广告服务。
2. 第三方广告服务可能使用 Cookie。
3. 工具输入内容默认在浏览器本地处理。
4. 用户可以通过浏览器设置管理 Cookie。
5. 联系方式。

---

## 9. robots.txt

`public/robots.txt` 内容：

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

注意：上线后把 `example.com` 替换为真实域名。

不要写：

```txt
Disallow: /_nuxt/
Disallow: /assets/
```

---

## 10. SEO 基础要求

每个页面必须设置：

1. 唯一 title。
2. 唯一 meta description。
3. 一个 H1。
4. 合理 H2/H3。
5. canonical URL。
6. Open Graph 基础信息。
7. 内链到相关工具。
8. 移动端布局适配。

工具页 title 示例：

```txt
JSON Formatter and Validator - Free Online Tools
Timestamp Converter - Free Online Tools
URL Encoder and Decoder - Free Online Tools
Base64 Encoder and Decoder - Free Online Tools
User-Agent Parser - Free Online Tools
Aliyun SLS SQL Generator - Free Online Tools
```

---

## 11. UI 设计要求

整体风格：

```txt
简洁
白色为主
轻量卡片
响应式布局
工具区突出
正文区可读
广告位预留但不上线初期可隐藏
```

布局建议：

```txt
顶部导航：
Logo
Tools
Blog
About

首页：
Hero
工具分类
热门工具
说明区

工具页：
左侧或顶部工具区
下方说明内容
FAQ
相关工具

底部：
About
Privacy Policy
Terms
Contact
```

移动端：

1. 单列布局。
2. 输入框高度合理。
3. 按钮易点击。
4. 不出现横向滚动。
5. 工具结果区不撑破页面。

---

## 12. 工具组件实现要求

### 12.1 公共复制方法

实现 `useCopy.ts`：

```ts
export function useCopy() {
	const copied = ref(false)

	async function copyText(text: string) {
		if (!text) return

		await navigator.clipboard.writeText(text)

		copied.value = true

		window.setTimeout(() => {
			copied.value = false
		}, 1500)
	}

	return {
		copied,
		copyText,
	}
}
```

### 12.2 JSON Formatter 逻辑要求

功能：

```txt
formatJson()
minifyJson()
validateJson()
clearInput()
loadExample()
copyOutput()
```

错误处理：

```txt
try JSON.parse
catch 显示错误信息
```

不要让页面崩溃。

### 12.3 Timestamp Converter 逻辑要求

功能：

```txt
timestampToDate()
dateToTimestamp()
detect seconds/milliseconds
show local time
show UTC time
copy result
```

处理规则：

1. 10 位数字按秒处理。
2. 13 位数字按毫秒处理。
3. 非法输入显示错误。
4. 不抛出未捕获异常。

### 12.4 URL Encoder 逻辑要求

功能：

```txt
encodeURIComponent
decodeURIComponent
copy result
clear
example
```

decode 时需要 catch 异常。

### 12.5 Base64 逻辑要求

支持 UTF-8：

```ts
function encodeBase64(input: string) {
	return btoa(unescape(encodeURIComponent(input)))
}

function decodeBase64(input: string) {
	return decodeURIComponent(escape(atob(input)))
}
```

注意错误处理。

### 12.6 User-Agent Parser 逻辑要求

第一版可实现简单规则。

识别：

```txt
Chrome
Safari
Firefox
Edge
Android
iOS
Windows
macOS
Linux
Mobile
Tablet
Desktop
```

输出结构：

```ts
interface ParsedUA {
	browser: string
	os: string
	deviceType: string
	engine: string
}
```

### 12.7 SLS SQL Generator 逻辑要求

支持字段：

```ts
interface SlsSqlForm {
	sourceUrl?: string
	step?: string
	type?: string
	trackType?: string
	groupBy?: string
	timeBucket?: '10s' | '1m' | '5m' | '1h'
	limit?: number
}
```

生成 SQL 示例。

按 URL 过滤：

```sql
*
| SELECT *
FROM log
WHERE su LIKE '%{{sourceUrl}}%'
LIMIT {{limit}}
```

按 10 秒聚合：

```sql
*
| SELECT
  date_format(from_unixtime(__time__ - __time__ % 10), '%Y-%m-%d %H:%i:%s') AS time_bucket,
  COUNT(*) AS pv
FROM log
WHERE su LIKE '%{{sourceUrl}}%'
GROUP BY time_bucket
ORDER BY time_bucket
LIMIT {{limit}}
```

按 trackId 查询有 type=6 trackType=1 且无 type=7 trackType=1：

```sql
*
| SELECT
    trackId,
    arbitrary(
      CASE
        WHEN type = 6 AND trackType = 1 THEN actionValue
        ELSE NULL
      END
    ) AS actionValue
FROM log
WHERE su LIKE '%{{sourceUrl}}%'
GROUP BY trackId
HAVING
    SUM(CASE WHEN type = 6 AND trackType = 1 THEN 1 ELSE 0 END) > 0
    AND
    SUM(CASE WHEN type = 7 AND trackType = 1 THEN 1 ELSE 0 END) = 0
LIMIT {{limit}}
```

注意：

1. 字符串字段要加引号。
2. 数字字段不要加引号。
3. 页面要提示用户根据自己日志字段类型调整 SQL。
4. 生成结果仅作为模板。

---

## 13. 基础内容页要求

### 13.1 About 页面

内容：

```txt
本站是什么
提供哪些工具
工具是否免费
数据是否上传
适合哪些用户
联系方式
```

### 13.2 Contact 页面

内容：

```txt
联系邮箱
反馈说明
Bug report 指引
Feature request 指引
```

可以先使用静态邮箱，不做表单。

### 13.3 Privacy Policy 页面

内容：

```txt
工具输入数据处理方式
Cookie
第三方广告
统计分析
外部链接
联系我们
```

### 13.4 Terms 页面

内容：

```txt
工具仅供参考
不保证结果绝对准确
用户自行承担使用风险
禁止滥用
免责声明
```

---

## 14. 上线前自测清单

### 14.1 禁用 JavaScript 测试

Chrome DevTools：

```txt
Command Menu
Disable JavaScript
刷新页面
```

要求：

1. 首页不是白屏。
2. 工具页能看到 H1、说明、FAQ、相关链接。
3. 导航基本可见。
4. 页面主体可读。

### 14.2 curl 测试

执行：

```bash
curl -L https://example.com/tools/json-formatter
```

要求返回 HTML 中能看到：

```html
<h1>JSON Formatter</h1>
```

以及正文说明文本。

### 14.3 Lighthouse 测试

至少检查：

```txt
Performance
Accessibility
Best Practices
SEO
```

目标：

```txt
SEO >= 90
Accessibility >= 90
Best Practices >= 90
```

### 14.4 移动端测试

检查：

1. iPhone 宽度。
2. Android 宽度。
3. 输入框是否可用。
4. 按钮是否容易点击。
5. 结果区域是否溢出。
6. 是否有横向滚动。

---

## 15. 后续扩展计划

### 15.1 开发者工具

```txt
Regex Tester
CSS Selector Tester
XPath Tester
HTML Formatter
XML Formatter
JWT Decoder
UUID Generator
Color Converter
```

### 15.2 Web 诊断工具

```txt
User-Agent Analyzer
Viewport Checker
WebView Environment Detector
HTTP Header Parser
URL Redirect Checker
```

### 15.3 PDF / 图片工具

```txt
PDF Coordinate Viewer
Image Coordinate Highlighter
OCR Coordinate Preview
PDF Text Position Debugger
```

### 15.4 内容文章

```txt
JSON formatting explained
Unix timestamp explained
Base64 explained
URL encoding explained
User-Agent explained
Aliyun SLS SQL examples
Common log analysis queries
```

---

## 16. 开发顺序

### Phase 1：项目初始化

1. 初始化 Nuxt 3 项目。
2. 配置 TypeScript。
3. 配置全局样式。
4. 创建基础 Layout。
5. 创建 Header/Footer。
6. 配置首页、工具列表页、About、Contact、Privacy、Terms。

### Phase 2：工具组件开发

按顺序开发：

1. JSON Formatter。
2. Timestamp Converter。
3. URL Encoder。
4. Base64 Tool。
5. User-Agent Parser。
6. SLS SQL Generator。

每个工具都要有：

```txt
输入区
输出区
操作按钮
错误提示
示例按钮
复制按钮
说明内容
FAQ
相关工具
```

### Phase 3：SEO 和静态化

1. 给每个页面设置 title。
2. 给每个页面设置 meta description。
3. 添加 sitemap。
4. 添加 robots.txt。
5. 执行 `nuxi generate`。
6. 检查生成的 HTML 是否包含正文。

### Phase 4：上线前检查

1. 禁用 JS 测试。
2. curl 测试。
3. 移动端测试。
4. Lighthouse 测试。
5. 检查所有链接是否可访问。
6. 检查隐私政策和条款页面。
7. 检查是否存在空页面或未完成页面。

---

## 17. 验收标准

项目第一版完成时必须满足：

1. 可以通过 `npm run generate` 生成静态站点。
2. 首页、工具页、基础页面都可访问。
3. 禁用 JavaScript 后页面不是白屏。
4. 每个工具页源码包含 H1 和正文说明。
5. 6 个工具均可正常使用。
6. 移动端布局正常。
7. robots.txt 正确。
8. Privacy Policy、Terms、About、Contact 页面完整。
9. 没有登录限制。
10. 没有诱导广告点击设计。
11. 没有自动刷新、自动跳转、遮挡内容等高风险行为。

---

## 18. 重要提醒

当前阶段不要急着放广告代码。

建议顺序：

```txt
先完成站点
再上线
再提交 sitemap
再积累一些自然访问和页面索引
再申请 AdSense
通过后再添加广告位
```

广告位后续可以预留，但第一版不要让广告位影响页面阅读和工具使用。

预留广告区域可以用普通占位，但不要写诱导文案。

正确：

```txt
Advertisement
```

或：

```txt
Sponsored links
```

错误：

```txt
Click here to support us
Recommended download
Start now
Continue
```

---

## 19. 给 Codex 的实现要求总结

请基于以上计划创建一个 Nuxt 3 + Vue 3 + TypeScript 的静态工具站项目。

重点要求：

1. 不要创建纯 CSR 白屏项目。
2. 每个页面都要有服务端/静态 HTML 主体内容。
3. 工具交互使用 Vue 组件。
4. 所有工具输入默认本地处理。
5. 页面结构必须适合 SEO 和 AdSense 审核。
6. 代码要清晰、组件化、可维护。
7. 第一版实现 6 个工具：
   - JSON Formatter
   - Timestamp Converter
   - URL Encoder / Decoder
   - Base64 Encoder / Decoder
   - User-Agent Parser
   - Aliyun SLS SQL Generator
8. 同时实现首页、工具列表页、About、Contact、Privacy Policy、Terms 页面。
9. 支持静态生成。
10. 提供 README，说明如何安装、开发、构建和部署。

---

## 20. 建议给 Codex 的执行方式

建议不要一次性让 Codex 生成全部复杂代码。更稳的执行方式：

1. 先让 Codex 创建 Nuxt 3 项目结构、基础 Layout、首页和工具列表页。
2. 再让 Codex 完成一个工具页完整模板，例如 JSON Formatter。
3. 确认页面结构、样式、SSR/SSG 输出没有问题后，再批量生成剩余 5 个工具。
4. 最后补齐 About、Contact、Privacy Policy、Terms、robots.txt、sitemap 和 README。

const tools = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data directly in your browser.",
    path: "/tools/json-formatter",
    category: "Developer Tools",
    titleKey: "tools.items.jsonFormatter.title",
    descriptionKey: "tools.items.jsonFormatter.description",
    categoryKey: "categories.developer",
    related: ["url-encoder", "base64", "timestamp-converter"]
  },
  {
    id: "timestamp-converter",
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to readable dates and convert dates back to timestamps.",
    path: "/tools/timestamp-converter",
    category: "Date and Time Tools",
    titleKey: "tools.items.timestampConverter.title",
    descriptionKey: "tools.items.timestampConverter.description",
    categoryKey: "categories.dateTime",
    related: ["json-formatter", "url-encoder", "user-agent-parser"]
  },
  {
    id: "url-encoder",
    title: "URL Encoder / Decoder",
    description: "Encode and decode URL components for query strings, redirects, and web debugging.",
    path: "/tools/url-encoder",
    category: "Encoding Tools",
    titleKey: "tools.items.urlEncoder.title",
    descriptionKey: "tools.items.urlEncoder.description",
    categoryKey: "categories.encoding",
    related: ["base64", "json-formatter", "user-agent-parser"]
  },
  {
    id: "base64",
    title: "Base64 Encoder / Decoder",
    description: "Encode UTF-8 text to Base64 and decode Base64 strings back to text.",
    path: "/tools/base64",
    category: "Encoding Tools",
    titleKey: "tools.items.base64.title",
    descriptionKey: "tools.items.base64.description",
    categoryKey: "categories.encoding",
    related: ["url-encoder", "json-formatter", "timestamp-converter"]
  },
  {
    id: "user-agent-parser",
    title: "User-Agent Parser",
    description: "Parse browser, operating system, device type, and rendering engine from a User-Agent string.",
    path: "/tools/user-agent-parser",
    category: "Web Diagnostics Tools",
    titleKey: "tools.items.userAgentParser.title",
    descriptionKey: "tools.items.userAgentParser.description",
    categoryKey: "categories.diagnostics",
    related: ["url-encoder", "timestamp-converter", "json-formatter"]
  },
  {
    id: "sls-sql-generator",
    title: "Aliyun SLS SQL Generator",
    description: "Generate common Aliyun Log Service SQL templates for PV, time buckets, filters, and trackId analysis.",
    path: "/tools/sls-sql-generator",
    category: "Log Analysis Tools",
    titleKey: "tools.items.slsSqlGenerator.title",
    descriptionKey: "tools.items.slsSqlGenerator.description",
    categoryKey: "categories.logAnalysis",
    related: ["json-formatter", "timestamp-converter", "url-encoder"]
  }
];
function getToolById(id) {
  return tools.find((tool) => tool.id === id);
}
function getRelatedTools(tool) {
  return tool.related.map((id) => getToolById(id)).filter((relatedTool) => Boolean(relatedTool));
}

export { getRelatedTools as a, getToolById as g, tools as t };
//# sourceMappingURL=tools-BIFehSDu.mjs.map

const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/about",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/about"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/about"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/about"
                    }
                ]
            },
            {
                "loc": "/zh-CN/about",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/about"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/about"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/about"
                    }
                ]
            },
            {
                "loc": "/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/zh-CN",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/terms",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/terms"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/terms"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/terms"
                    }
                ]
            },
            {
                "loc": "/zh-CN/terms",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/terms"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/terms"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/terms"
                    }
                ]
            },
            {
                "loc": "/contact",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/contact"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/contact"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/contact"
                    }
                ]
            },
            {
                "loc": "/zh-CN/contact",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/contact"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/contact"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/contact"
                    }
                ]
            },
            {
                "loc": "/tools",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools"
                    }
                ]
            },
            {
                "loc": "/tools/base64",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/base64"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/base64"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/base64"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/base64",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/base64"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/base64"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/base64"
                    }
                ]
            },
            {
                "loc": "/privacy-policy",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/privacy-policy"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/privacy-policy"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/privacy-policy"
                    }
                ]
            },
            {
                "loc": "/zh-CN/privacy-policy",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/privacy-policy"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/privacy-policy"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/privacy-policy"
                    }
                ]
            },
            {
                "loc": "/tools/url-encoder",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/url-encoder"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/url-encoder"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/url-encoder"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/url-encoder",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/url-encoder"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/url-encoder"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/url-encoder"
                    }
                ]
            },
            {
                "loc": "/tools/json-formatter",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/json-formatter"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/json-formatter"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/json-formatter"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/json-formatter",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/json-formatter"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/json-formatter"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/json-formatter"
                    }
                ]
            },
            {
                "loc": "/tools/sls-sql-generator",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/sls-sql-generator"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/sls-sql-generator"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/sls-sql-generator"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/sls-sql-generator",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/sls-sql-generator"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/sls-sql-generator"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/sls-sql-generator"
                    }
                ]
            },
            {
                "loc": "/tools/user-agent-parser",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/user-agent-parser"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/user-agent-parser"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/user-agent-parser"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/user-agent-parser",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/user-agent-parser"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/user-agent-parser"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/user-agent-parser"
                    }
                ]
            },
            {
                "loc": "/tools/timestamp-converter",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/timestamp-converter"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/timestamp-converter"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/timestamp-converter"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/timestamp-converter",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/timestamp-converter"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/timestamp-converter"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/timestamp-converter"
                    }
                ]
            },
            {
                "loc": "/sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/zh-CN/sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/index-sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/zh-CN/index-sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/en-sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/zh-CN/en-sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/zh-CN-sitemap.xml",
                "_sitemap": "en"
            },
            {
                "loc": "/zh-CN/zh-CN-sitemap.xml",
                "_sitemap": "en"
            }
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:prerender",
            "description": "Generated at build time when prerendering.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:prerender'] }`."
            ]
        },
        "urls": [
            "/",
            "/tools",
            "/tools/json-formatter",
            "/tools/timestamp-converter",
            "/tools/url-encoder",
            "/tools/base64",
            "/tools/user-agent-parser",
            "/tools/sls-sql-generator",
            "/about",
            "/contact",
            "/privacy-policy",
            "/terms",
            "/zh-CN",
            "/zh-CN/tools",
            "/zh-CN/tools/json-formatter",
            "/zh-CN/tools/timestamp-converter",
            "/zh-CN/tools/url-encoder",
            "/zh-CN/tools/base64",
            "/zh-CN/tools/user-agent-parser",
            "/zh-CN/tools/sls-sql-generator",
            "/zh-CN/about",
            "/zh-CN/contact",
            "/zh-CN/privacy-policy",
            "/zh-CN/terms",
            {
                "loc": "/privacy-policy",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/privacy-policy"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/privacy-policy"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/privacy-policy"
                    }
                ]
            },
            {
                "loc": "/tools",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools"
                    }
                ]
            },
            {
                "loc": "/contact",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/contact"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/contact"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/contact"
                    }
                ]
            },
            {
                "loc": "/tools/url-encoder",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/url-encoder"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/url-encoder"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/url-encoder"
                    }
                ]
            },
            {
                "loc": "/tools/json-formatter",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/json-formatter"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/json-formatter"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/json-formatter"
                    }
                ]
            },
            {
                "loc": "/about",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/about"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/about"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/about"
                    }
                ]
            },
            {
                "loc": "/terms",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/terms"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/terms"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/terms"
                    }
                ]
            },
            {
                "loc": "/tools/timestamp-converter",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/timestamp-converter"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/timestamp-converter"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/timestamp-converter"
                    }
                ]
            },
            {
                "loc": "/tools/user-agent-parser",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/user-agent-parser"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/user-agent-parser"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/user-agent-parser"
                    }
                ]
            },
            {
                "loc": "/tools/base64",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/base64"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/base64"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/base64"
                    }
                ]
            },
            {
                "loc": "/tools/sls-sql-generator",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/sls-sql-generator"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/sls-sql-generator"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/sls-sql-generator"
                    }
                ]
            },
            {
                "loc": "/zh-CN",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/json-formatter",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/json-formatter"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/json-formatter"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/json-formatter"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools"
                    }
                ]
            },
            {
                "loc": "/zh-CN/contact",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/contact"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/contact"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/contact"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/timestamp-converter",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/timestamp-converter"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/timestamp-converter"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/timestamp-converter"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/user-agent-parser",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/user-agent-parser"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/user-agent-parser"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/user-agent-parser"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/sls-sql-generator",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/sls-sql-generator"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/sls-sql-generator"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/sls-sql-generator"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/base64",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/base64"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/base64"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/base64"
                    }
                ]
            },
            {
                "loc": "/zh-CN/tools/url-encoder",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/tools/url-encoder"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/tools/url-encoder"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/tools/url-encoder"
                    }
                ]
            },
            {
                "loc": "/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/zh-CN/about",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/about"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/about"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/about"
                    }
                ]
            },
            {
                "loc": "/zh-CN/terms",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/terms"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/terms"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/terms"
                    }
                ]
            },
            {
                "loc": "/zh-CN/privacy-policy",
                "_sitemap": "zh-CN",
                "alternatives": [
                    {
                        "hreflang": "en",
                        "href": "/privacy-policy"
                    },
                    {
                        "hreflang": "zh-CN",
                        "href": "/zh-CN/privacy-policy"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/privacy-policy"
                    }
                ]
            },
            null,
            null,
            null,
            null,
            {
                "loc": "/zh-CN/index-sitemap.xml",
                "_sitemap": "zh-CN"
            },
            {
                "loc": "/zh-CN/sitemap.xml",
                "_sitemap": "zh-CN"
            },
            {
                "loc": "/zh-CN/en-sitemap.xml",
                "_sitemap": "zh-CN"
            },
            {
                "loc": "/zh-CN/zh-CN-sitemap.xml",
                "_sitemap": "zh-CN"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map

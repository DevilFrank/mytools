# Free Online Tools

Nuxt 3 + Vue 3 + TypeScript static tool site for an AdSense-friendly online tools MVP.

## Features

- Nuxt 3 with SSR enabled and static generation support.
- Tailwind CSS responsive layout.
- Static HTML content for the homepage, tool pages, About, Contact, Privacy Policy, and Terms.
- Six browser-based tools:
  - JSON Formatter
  - Timestamp Converter
  - URL Encoder / Decoder
  - Base64 Encoder / Decoder
  - User-Agent Parser
  - Aliyun SLS SQL Generator
- Google Analytics and AdSense scripts are configured in `nuxt.config.ts`.
- `robots.txt`, sitemap module, canonical URLs, meta descriptions, and Open Graph metadata.

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for server rendering:

```bash
npm run build
```

Generate a static site:

```bash
npm run generate
```

Preview the generated output:

```bash
npm run preview
```

## Configuration

The default public site URL is `https://the0705.com` and the default contact email is `contact@example.com`.

Set these environment variables before production builds:

```bash
NUXT_PUBLIC_SITE_URL=https://the0705.com
NUXT_PUBLIC_CANONICAL_SITE_URL=
NUXT_PUBLIC_CONTACT_EMAIL=contact@your-domain.example
NUXT_PUBLIC_GTAG_ID=G-PZHTHBJXYN
NUXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1090956656099890
```

`NUXT_PUBLIC_SITE_URL` is the current deployment domain and is used by the Nuxt site/sitemap config. `NUXT_PUBLIC_CANONICAL_SITE_URL` controls canonical and hreflang URLs; when it is empty, canonical URLs use `NUXT_PUBLIC_SITE_URL`.

## Static HTML and No-JavaScript Check

The page body content is written directly in Nuxt page templates. Tool interactivity uses Vue components, but titles, descriptions, usage instructions, examples, FAQ, privacy notes, and related links are rendered into static HTML.

Before deployment, run:

```bash
npm run generate
```

Then inspect generated HTML under `.output/public`. For example, the JSON Formatter page should contain:

```html
<h1
```

and the text:

```txt
JSON Formatter
```

Manual checks:

- Disable JavaScript and refresh the homepage.
- Disable JavaScript and refresh each tool page.
- Confirm H1, body text, FAQ, privacy note, and related links are visible.
- Check mobile widths for no horizontal scrolling.
- Confirm all pages are accessible without login.

## Deployment

After `npm run generate`, Nuxt generates the static output under:

```txt
.output/public
```

This repository also uses `dist` as the deployment output path for Cloudflare Pages. Keep the hosting provider configured to serve `index.html` files from generated route directories.

## Dual Deployment

### Cloudflare Pages Primary Site

Domain: `https://the0705.com`

- Framework preset: `Nuxt.js` or `None`
- Build command: `npm run generate`
- Output directory: `dist`
- Root directory: repository root. If this project is moved into a subdirectory, use that subdirectory instead.
- Environment variables:
  - `NODE_VERSION=20`
  - `NUXT_PUBLIC_SITE_URL=https://the0705.com`
  - `NUXT_PUBLIC_CANONICAL_SITE_URL=`
  - `NUXT_PUBLIC_CONTACT_EMAIL=your production contact email`
  - `NUXT_PUBLIC_GTAG_ID=G-PZHTHBJXYN`
  - `NUXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1090956656099890`

### Tencent Cloud Backup Site

Domain: `https://1005.wang`

- Build command: `npm run generate`
- Nginx root: `dist` or the deployed static output directory
- Environment variables:
  - `NUXT_PUBLIC_SITE_URL=https://1005.wang`
  - `NUXT_PUBLIC_CANONICAL_SITE_URL=https://the0705.com`
  - `NUXT_PUBLIC_CONTACT_EMAIL=your production contact email`
  - `NUXT_PUBLIC_GTAG_ID=G-PZHTHBJXYN`
  - `NUXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1090956656099890`

### SEO

`https://the0705.com` is the primary site. `https://1005.wang` is a backup/mirror site.

On the backup site, set `NUXT_PUBLIC_CANONICAL_SITE_URL=https://the0705.com` so canonical and hreflang URLs point to the primary domain and avoid duplicate-content signals. The sitemap module can continue using `NUXT_PUBLIC_SITE_URL`; submit the Cloudflare primary sitemap in Google Search Console and do not actively submit the Tencent backup sitemap.

If the backup site should not be indexed later, add a separate robots/noindex environment flag such as `NUXT_PUBLIC_ROBOTS_NOINDEX=true`. This project does not enable noindex by default.

### GA4

Both domains use the same GA4 Measurement ID: `G-PZHTHBJXYN`.

The project uses `nuxt-gtag`; custom events should continue to be sent through `useGtag()` and can be separated in GA4 reports by Hostname.

### AdSense

Both domains use the same AdSense Publisher ID: `ca-pub-1090956656099890`.

If both domains display ads, add and review both domains in AdSense Sites. Both domains must be able to serve `/ads.txt` with:

```txt
google.com, pub-1090956656099890, DIRECT, f08c47fec0942fa0
```

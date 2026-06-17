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
- No advertising code in the first version.
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

The default public site URL is `https://example.com` and the default contact email is `contact@example.com`.

Set these environment variables before production builds:

```bash
NUXT_PUBLIC_SITE_URL=https://your-domain.example
NUXT_PUBLIC_CONTACT_EMAIL=contact@your-domain.example
```

Also update `public/robots.txt` before production so the sitemap URL uses the real domain.

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

After `npm run generate`, deploy the static output from:

```txt
.output/public
```

Any static hosting provider can serve this directory. Configure the provider to serve `index.html` files from generated route directories.

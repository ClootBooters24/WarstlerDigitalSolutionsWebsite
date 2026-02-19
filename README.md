# Warstler Digital Solutions Website

Official website source for [warstlerdigital.com](https://warstlerdigital.com), built as a lightweight static site and deployed on Cloudflare.

## Overview

This repository contains the marketing website for Warstler Digital Solutions, including:

- Core marketing pages (`Home`, `Portfolio`, `About`, `Contact`)
- Legal pages (`Privacy Policy`, `Terms of Service`, etc.)
- SEO assets (`sitemap.xml`, canonical URLs, metadata, JSON-LD)
- Security and routing config for Cloudflare (`_headers`, `_redirects`, `_routes.json`, `wrangler.json`)

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Cloudflare static asset deployment via Wrangler
- Web3Forms (contact form submission)
- Google Analytics (gtag)

## Project Structure

```text
.
├── README.md
└── src/
		├── index.html
		├── portfolio.html
		├── about.html
		├── contact.html
		├── 404.html
		├── sitemap.xml
		├── wrangler.json
		├── _headers
		├── _redirects
		├── _routes.json
		├── css/
		├── js/
		└── legal/
```

## Local Development

Because this is a static site, you can run it with any local web server.

### Option 1: Python HTTP Server

From the repository root:

```bash
cd src
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

### Option 2: VS Code Live Server

Open the `src/` folder content in Live Server and browse locally.

## Deployment (Cloudflare)

This repository is configured for Cloudflare deployment using `src/wrangler.json`.

### Prerequisites

- Node.js 18+
- Cloudflare account access
- Wrangler CLI (`npm i -g wrangler` or `npx wrangler`)

### Deploy

From the `src/` directory:

```bash
cd src
npx wrangler deploy
```

## Routing and Security

- `_redirects` maps legacy `.html` URLs to clean routes.
- `_routes.json` ensures all routes are included and `404.html` is used for not-found paths.
- `_headers` applies security headers and CSP, including allowed domains for:
	- Google Analytics / Tag Manager
	- Cloudflare Insights
	- Google Fonts / Maps
	- Web3Forms API

## Forms and Integrations

- Contact form posts to `https://api.web3forms.com/submit`.
- Access key is currently configured in `src/contact.html`.
- Analytics is configured with gtag in page headers.

If rotating keys or changing vendors, update both the relevant HTML and CSP settings in `_headers`.

## SEO Notes

The site includes:

- Per-page metadata (title/description)
- Open Graph and Twitter metadata on key pages
- JSON-LD schema blocks for website and local business details
- `sitemap.xml` and canonical URLs

## Content Updates

Typical update workflow:

1. Edit page content in `src/*.html`
2. Update styles in `src/css/*` if needed
3. Test locally
4. Deploy with Wrangler

## License

All rights reserved unless otherwise specified by the repository owner.


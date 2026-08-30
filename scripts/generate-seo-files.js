#!/usr/bin/env node
/**
 * Regenerates src/sitemap.xml and src/feed.xml from src/assets/blogs.json.
 * Run after adding or editing a post:  npm run seo
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://mihajlopetrovic.me';
const SITE_TITLE = 'Mihajlo Petrovic — Blog';
const SITE_DESC =
  'Software engineering, product thinking, and lessons learned from building real products.';
const AUTHOR = 'Mihajlo Petrovic';
const AUTHOR_EMAIL = 'mihajlop98@gmail.com';

const root = path.resolve(__dirname, '..');
const posts = JSON.parse(fs.readFileSync(path.join(root, 'src/assets/blogs.json'), 'utf8'))
  .filter(p => p.published)
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

const esc = str =>
  String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const day = iso => new Date(iso).toISOString().split('T')[0];
const newest = posts.length ? day(posts[0].updated_at || posts[0].created_at) : day(new Date());

/* ---------- sitemap.xml ---------- */
const staticUrls = [
  { loc: `${SITE_URL}/`, changefreq: 'monthly', priority: '1.0', lastmod: newest },
  { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: '0.8', lastmod: newest }
];

const postUrls = posts.map(p => ({
  loc: `${SITE_URL}/blog/${p.slug}`,
  changefreq: 'monthly',
  priority: '0.7',
  lastmod: day(p.updated_at || p.created_at)
}));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls]
  .map(
    u => `  <url>
    <loc>${esc(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'src/sitemap.xml'), sitemap);

/* ---------- feed.xml (RSS 2.0) ---------- */
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${esc(SITE_DESC)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(posts[0]?.updated_at || Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    p => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/blog/${esc(p.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${esc(p.slug)}</guid>
      <description>${esc(p.excerpt || p.title)}</description>
      <author>${esc(AUTHOR_EMAIL)} (${esc(AUTHOR)})</author>
${(p.categories || []).map(c => `      <category>${esc(c)}</category>`).join('\n')}
      <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(root, 'src/feed.xml'), feed);

console.log(`Wrote src/sitemap.xml (${staticUrls.length + postUrls.length} URLs) and src/feed.xml (${posts.length} items).`);

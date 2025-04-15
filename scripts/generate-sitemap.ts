import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Polyfill __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load JSON manually
const navDataPath = path.resolve(__dirname, '../src/data/navData.json');
const navData = JSON.parse(fs.readFileSync(navDataPath, 'utf-8'));

const baseUrl = 'https://www.barriershardcore.com'; // Replace with your domain
const sitemapPath = path.resolve(__dirname, '../out/sitemap.xml');

// Filter internal links
const internalLinks = [
  { href: '/' },
  ...navData.navLinks.filter((link: any) => link.href.startsWith('/'))
];

const urls = internalLinks.map(({ href }: { href: string }) => {
  const priority = href === '/' ? '1.0' : '0.7';
  return `
  <url>
    <loc>${baseUrl}${href}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${priority}</priority>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n')}
</urlset>`;

fs.writeFileSync(sitemapPath, sitemap.trim());

console.log('✅ Sitemap generated at public/sitemap.xml');
console.log('Added URLs:', internalLinks.map((l: any) => l.href));
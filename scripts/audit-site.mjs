import {readFile, open, mkdir, writeFile, appendFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {inspectPage, inspectSitemap, inspectRobots, indexableRoutes, attributes} from './seo-checks.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const routes = [...indexableRoutes, '/gizlilik/', '/404/'];
const pages = [];
for (const route of routes) {
  const file = path.join(root, route === '/404/' ? '404.html' : `${route}/index.html`);
  const html = await readFile(file, 'utf8');
  const result = inspectPage(html, route);
  for (const match of html.matchAll(/<(?:a|img|script|link)\b[^>]*>/gi)) {
    const attr = attributes(match[0]);
    const href = attr.src || attr.href;
    if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
    const local = new URL(href, 'https://izmirlokmasi.com');
    let filename = path.resolve(root, '.' + decodeURIComponent(local.pathname));
    if (filename !== path.resolve(root) && !filename.startsWith(root)) { result.errors.push(`Asset outside build: ${href}`); continue; }
    if (!path.extname(filename)) filename = path.join(filename, 'index.html');
    try {
      const handle = await open(filename, 'r');
      try {
      if (local.hash && filename.endsWith('.html')) {
        const target = await handle.readFile('utf8');
        const ids = [...target.matchAll(/\bid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)].map(m=>m[1] ?? m[2]);
        if (!ids.includes(decodeURIComponent(local.hash.slice(1)))) result.errors.push(`Broken local fragment: ${href}`);
      }
      } finally { await handle.close(); }
    } catch { result.errors.push(`Broken local link: ${href}`); }
  }
  pages.push(result);
}
const sitemap = inspectSitemap(await readFile(path.join(root, 'sitemap.xml'), 'utf8'));
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
sitemap.errors.push(...inspectRobots(robots).errors);
for (const key of ['title', 'description']) {
  const seen = new Set();
  for (const page of pages.filter(p => indexableRoutes.includes(p.route))) {
    if (seen.has(page[key])) page.errors.push(`Duplicate ${key}`);
    seen.add(page[key]);
  }
}
const failures = sitemap.errors.length + pages.reduce((n, p) => n + p.errors.length, 0);
const report = {generated_at: new Date().toISOString(), scope:'local-build', status:failures ? 'fail' : 'pass', failures, pages, sitemap,
  unmeasured:['Search Console performance', 'CrUX field metrics', 'Google Business Profile', 'ad account performance', 'actual WhatsApp conversations']};
const markdown = `## SEO build audit: ${report.status}\n\n${pages.length} pages; ${failures} failures.\n\n` + pages.map(p => `- ${p.errors.length ? 'FAIL' : 'PASS'} ${p.route}${p.errors.length ? ': ' + p.errors.join('; ') : ''}`).join('\n') + '\n' + sitemap.errors.map(e => `- FAIL sitemap: ${e}`).join('\n') + '\n\nUnmeasured: ' + report.unmeasured.join(', ') + '\n';
const outputIndex = process.argv.indexOf('--output');
if (outputIndex !== -1) {
  const output = process.argv[outputIndex + 1];
  if (!output || output.startsWith('--')) throw new Error('--output requires a directory');
  await mkdir(output, {recursive:true});
  await writeFile(path.join(output, 'seo-audit.json'), JSON.stringify(report, null, 2) + '\n');
  await writeFile(path.join(output, 'seo-audit.md'), markdown);
}
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown);
console.log(markdown);
if (failures) process.exitCode = 1;

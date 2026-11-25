import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const text = async p => readFile(new URL(p,root),'utf8');
const pkg=JSON.parse(await text('package.json'));

test('Astro 7.4.2 recent security update requires patched Node 22.23.4+', async()=>{
  const flow = await text('.github/workflows/quality.yml');
  const guide = await text('README.md');
  assert.equal(pkg.engines.node, '>=22.23.4');
  assert.match(flow,/node-version:\s*['"]22\.23\.4['"]/);
  assert.match(guide,/22\.23\.4/);
});

test('Astro config always exports CSS as separate file under strict CSP',async()=>{
  const cfg=await text('astro.config.mjs');
  const headers=await text('public/_headers');
  assert.match(cfg,/inlineStylesheets:\s*['"]never['"]/);
  assert.match(headers,/style-src 'self'/);
  assert.doesNotMatch(headers,/unsafe-inline|unsafe-eval/i);
  assert.match(cfg,/assetsInlineLimit:\s*0/);
});

test('workflow is deliberately read-only, with no automatic deploy or unverified update',async()=>{
  const file=await text('.github/workflows/quality.yml');
  assert.match(file,/permissions:\s*\n\s*contents:\s*read/);
  assert.doesNotMatch(file,/permissions:\s*write|secrets\.|deploy-pages|pages:\s*write|pull-requests:\s*write/i);
  assert.match(file,/npm ci/);
  assert.match(file,/audit:full/);
  const dependabot=await text('.github/dependabot.yml');
  assert.match(dependabot,/open-pull-requests-limit:\s*2/);
  assert.doesNotMatch(dependabot,/automerge|auto-merge/i);
});

test('CSP-locked site has no third-party analytics, inline JS handlers or tracking',async()=>{
  const paths=['src/pages/index.astro','src/pages/[service].astro','src/pages/iletisim.astro','src/pages/gizlilik.astro','src/layouts/Layout.astro','public/js/site.js'];
  const contents=(await Promise.all(paths.map(text))).join('\n');
  assert.doesNotMatch(contents,/<(?:iframe|form)\b|\sonclick\s*=|gtag\(|googletagmanager|facebook\.net\/tr/i);
  assert.doesNotMatch(contents,/https?:\/\/(?:unpkg|cdn\.jsdelivr|cdnjs)\./i);
  assert.match(await text('public/_headers'),/script-src-attr 'none'/);
});

test('staging domain cannot be indexed; production sitemap stays discoverable',async()=>{
  const headers=await text('public/_headers');
  assert.match(headers,/https:\/\/:project\.pages\.dev\/\*[\s\S]*?X-Robots-Tag:\s*noindex/);
  assert.match(headers,/https:\/\/:version\.:project\.pages\.dev\/\*[\s\S]*?X-Robots-Tag:\s*noindex/);
  assert.match(await text('src/pages/robots.txt.ts'),/Sitemap:\s*https:\/\/izmirlokmasi\.com\/sitemap\.xml/);
});

test('client JS and product images remain within conservative budgets',async()=>{
  const js=(await stat(new URL('public/js/site.js',root))).size;
  assert.ok(js<4_000,`client JS too large: ${js}`);
  const names=['hanifi-logo-vector-integrated.webp','hero-mixed-lokma.webp','lokma-real-appetizing.webp','saray-lokmasi-photo.webp','og-hanifi-usta.webp'];
  let bytes=0;
  for(const n of names) bytes+=(await stat(new URL('public/images/'+n,root))).size;
  assert.ok(bytes<650_000,`images ${bytes} bytes exceed budget`);
});

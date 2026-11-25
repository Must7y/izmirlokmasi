import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import {inspectPage, inspectSitemap} from '../scripts/seo-checks.mjs';
import {execFileSync} from 'node:child_process';

const html = await readFile(new URL('../dist/hayir-lokmasi/index.html', import.meta.url), 'utf8');
const xml = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
test('Valid service output passes; canonical drift is caught', () => {
  assert.deepEqual(inspectPage(html, '/hayir-lokmasi/').errors, []);
  const broken = html.replace('rel="canonical" href="https://izmirlokmasi.com/hayir-lokmasi/"', 'rel="canonical" href="https://izmirlokmasi.com/hayir-lokmasi"');
  assert.ok(inspectPage(broken, '/hayir-lokmasi/').errors.some(e => e.includes('Canonical')));
});
test('Invalid JSON-LD and accidental production noindex fail', () => {
  const broken = html.replace('"@context":"https://schema.org"', '"@context":invalid');
  assert.ok(inspectPage(broken, '/hayir-lokmasi/').errors.includes('Invalid JSON-LD'));
  assert.ok(inspectPage(html.replace('index,follow,max-image-preview:large', 'noindex,follow'), '/hayir-lokmasi/').errors.includes('Unexpected indexing policy'));
});
test('Wrong graph shape is reported without crashing the audit', () => {
  const broken = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '<script type="application/ld+json">{"@context":"https://schema.org","@graph":{}}</script>');
  assert.ok(inspectPage(broken, '/hayir-lokmasi/').errors.includes('JSON-LD graph missing'));
});
test('Missing provider and page main entity references fail', () => {
  const broken = html.replace('"provider":{"@id":"https://izmirlokmasi.com/#organization"}', '"provider":{"@id":"https://invalid.example/#organization"}');
  assert.ok(inspectPage(broken, '/hayir-lokmasi/').errors.includes('Service provider mismatch'));
});
test('Sitemap rejects redirected, duplicate and excluded routes', () => {
  assert.deepEqual(inspectSitemap(xml).errors, []);
  assert.ok(inspectSitemap(xml.replace('/hayir-lokmasi/', '/hayir-lokmasi')).errors.length);
  assert.ok(inspectSitemap(xml.replace('</urlset>', '<url><loc>https://izmirlokmasi.com/</loc></url></urlset>')).errors.includes('Duplicate sitemap URL'));
  assert.ok(inspectSitemap(xml.replace('/hayir-lokmasi/', '/gizlilik/')).errors.length);
});
test('Mobile hero has a generated 480px WebP under 50 KB', async () => {
  const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const hero = home.match(/<img\b[^>]*fetchpriority="high"[^>]*>/)?.[0];
  const srcset = hero?.match(/srcset="([^"]+)"/)?.[1];
  assert.ok(srcset, 'Responsive hero missing');
  const variants = srcset.split(',').map(s => s.trim().split(/\s+/));
  assert.deepEqual(variants.map(([,width]) => width), ['480w','768w','1024w','1280w']);
  const mobile = variants[0][0];
  assert.match(mobile, /^\/_astro\/[^/]+\.webp$/);
  assert.ok((await stat(new URL('../dist' + mobile, import.meta.url))).size < 50_000);
});
test('Breadcrumb points from homepage to the current page; wrong hierarchy fails',()=>{
  const broken=html.replace('"position":1,"name":"Hanifi Usta","item":"https://izmirlokmasi.com/"','"position":1,"name":"Hanifi Usta","item":"https://invalid.example/"');
  assert.ok(inspectPage(broken,'/hayir-lokmasi/').errors.includes('Breadcrumb hierarchy mismatch'));
});
test('Visible service content explains distinct needs and provides direct contact',async()=>{
  const routes=['izmir-lokmasi','saray-lokmasi','hayir-lokmasi','mevlit-lokmasi'];
  const sections=[];
  for(const route of routes){
    const page=await readFile(new URL(`../dist/${route}/index.html`,import.meta.url),'utf8');
    const section=page.match(/<section class="section service-info">([\s\S]*?)<\/section>/)?.[1];
    assert.ok(section);
    assert.equal((section.match(/<h3>/g)||[]).length,2);
    assert.ok(section.includes('href="/iletisim/"'));
    sections.push(section.replace(/<div class="related">[\s\S]*/,''));
  }
  assert.equal(new Set(sections).size,4);
});
test('Sitemap image discovery uses real emitted files and excludes non-image assets',async()=>{
  const images=[...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(m=>m[1]);
  assert.equal(new Set(images).size,3);
  for(const image of images){
    const url=new URL(image);
    assert.equal(url.origin,'https://izmirlokmasi.com');
    assert.match(url.pathname,/^\/images\/[^/]+\.webp$/);
    await stat(new URL('../dist'+url.pathname,import.meta.url));
  }
});
test('Build revision uses a full SHA and rejects injected revision values',async()=>{
  const stamp=JSON.parse(await readFile(new URL('../dist/build-info.json',import.meta.url),'utf8'));
  assert.ok(stamp.revision==='unknown' || /^[a-f0-9]{40}$/.test(stamp.revision));
  assert.equal(typeof stamp.dirty,'boolean');
  assert.throws(()=>execFileSync(process.execPath,['scripts/stamp-build.mjs'],{cwd:new URL('../',import.meta.url),env:{...process.env,GITHUB_SHA:'not-a-commit'},stdio:'pipe'}));
});

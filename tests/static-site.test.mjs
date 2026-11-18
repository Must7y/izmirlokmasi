import {readFile,access,stat} from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
const routes=['','izmir-lokmasi','saray-lokmasi','hayir-lokmasi','mevlit-lokmasi','iletisim','gizlilik'];
const file=r=>new URL('../dist/'+(r?r+'/':'')+'index.html',import.meta.url);
test('all public routes, canonical and contact links work in static output',async()=>{
for(const route of routes){let html;try{html=await readFile(file(route),'utf8')}catch{html=await readFile(new URL('../dist/'+route+'.html',import.meta.url),'utf8')}
assert.match(html,/<html lang="tr">/);assert.match(html,/rel="canonical"/);assert.match(html,/https:\/\/wa.me\/905306902501/);assert.doesNotMatch(html,/lokma-3d-hero|lokma-3d-cluster/);
assert.doesNotMatch(html,/<style\b/i,'CSP inline style engeli');
assert.match(html,/src="\/js\/site\.js"/,'galeri/menü betiği kaynakta bulunmalı');
for(const [,src] of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)){if(src.startsWith('/_astro/')||src.startsWith('/images/')||src.startsWith('/js/')||src.startsWith('/icons/')||src==='/favicon.svg')await access(new URL('../dist'+src,import.meta.url));else assert.ok(routes.includes(src.replace(/^\/|\/$/g,'')),src)}
}});
test('sitemap and restrictive header configuration are generated',async()=>{const xml=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');assert.match(xml,/<urlset/);assert.doesNotMatch(xml,/gizlilik/);const headers=await readFile(new URL('../dist/_headers',import.meta.url),'utf8');assert.match(headers,/frame-ancestors 'none'/);});

test('Cloudflare Pages için 404.html bulunur, arama motorlarına kapalıdır ve tasarımı korur',async()=>{
 const html=await readFile(new URL('../dist/404.html',import.meta.url),'utf8');
 assert.match(html,/<meta name="robots" content="noindex,follow"/);
 assert.match(html,/Hanifi Usta/);
 assert.match(html, /Ana sayfaya dön/);
 assert.match(html, /href="\/"/);
});

test('site haritasındaki adresler sayfanın canonical adresiyle eşleşir', async () => {
  const xml = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  const publicRoutes = routes.filter(route => route !== 'gizlilik');
  const expected = publicRoutes.map(route => 'https://izmirlokmasi.com/' + (route ? route + '/' : ''));
  const locations = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), match => match[1]);
  assert.deepEqual(locations.sort(), expected.slice().sort());
  for (const [index, route] of publicRoutes.entries()) {
    const html = await readFile(file(route), 'utf8');
    assert.ok(html.includes('rel="canonical" href="' + expected[index] + '"'), expected[index]);
  }
});

test('ana fotoğrafın mobil sürümü üretilir ve 50 KB altındadır', async () => {
  const html = await readFile(file(''), 'utf8');
  const hero = html.match(/<img\b[^>]*fetchpriority="high"[^>]*>/)?.[0];
  assert.ok(hero, 'Ana görsel yüksek öncelikli olmalı');
  const srcset = hero.match(/srcset="([^"]+)"/)?.[1];
  assert.ok(srcset, 'Ana görselin ekran genişliğine uygun seçenekleri olmalı');
  const variants = new Map(srcset.split(',').map(candidate => candidate.trim().split(/\s+/).reverse()));
  for (const width of ['480w', '768w', '1024w', '1280w']) {
    assert.match(variants.get(width) ?? '', /^\/_astro\/[^/]+\.webp$/);
    await access(new URL('../dist' + variants.get(width), import.meta.url));
  }
  const mobile = await stat(new URL('../dist' + variants.get('480w'), import.meta.url));
  assert.ok(mobile.size < 50_000, 'Mobil ana görsel: ' + mobile.size + ' bayt');
});

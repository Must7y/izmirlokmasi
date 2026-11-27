import {readFile,access} from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import {contentRoutes} from '../src/data/routes.mjs';
const routes=contentRoutes.map(route=>route.path.replace(/^\/|\/$/g,''));
const file=r=>new URL('../dist/'+(r?r+'/':'')+'index.html',import.meta.url);
test('all public routes, canonical and contact links work in static output',async()=>{
for(const route of routes){let html;try{html=await readFile(file(route),'utf8')}catch{html=await readFile(new URL('../dist/'+route+'.html',import.meta.url),'utf8')}
assert.match(html,/<html lang="tr">/);assert.match(html,/rel="canonical"/);assert.match(html,/https:\/\/wa.me\/905306902501/);assert.doesNotMatch(html,/lokma-3d-hero|lokma-3d-cluster/);
assert.doesNotMatch(html,/<style\b/i,'CSP inline style engeli');
assert.match(html,/src="\/js\/site\.js"/,'galeri/menü betiği kaynakta bulunmalı');
for(const [,src] of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)){if(src.startsWith('/_astro/')||src.startsWith('/images/')||src.startsWith('/js/')||src.startsWith('/icons/')||['/favicon.svg','/favicon.png','/favicon.ico','/apple-touch-icon.png'].includes(src))await access(new URL('../dist'+src,import.meta.url));else assert.ok(routes.includes(src.replace(/^\/|\/$/g,'')),src)}
}});
test('sitemap and restrictive header configuration are generated',async()=>{const xml=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');assert.match(xml,/<urlset/);assert.doesNotMatch(xml,/gizlilik/);const headers=await readFile(new URL('../dist/_headers',import.meta.url),'utf8');assert.match(headers,/frame-ancestors 'none'/);});

test('Cloudflare Pages için 404.html bulunur, arama motorlarına kapalıdır ve tasarımı korur',async()=>{
 const html=await readFile(new URL('../dist/404.html',import.meta.url),'utf8');
 assert.match(html,/<meta name="robots" content="noindex,follow"/);
 assert.match(html,/Hanifi Usta/);
 assert.match(html, /Ana sayfaya dön/);
 assert.match(html, /href="\/"/);
});

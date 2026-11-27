import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..', 'dist');
const records=[];
async function walk(dir){for(const ent of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,ent.name);if(ent.isDirectory()) await walk(file);else records.push({file:path.relative(root,file),bytes:(await stat(file)).size});}}
await walk(root);
const byExt=(ext)=>records.filter(x=>x.file.endsWith(ext)).reduce((n,x)=>n+x.bytes,0);
const budget={scripts:80000,styles:100000,images:650000};
const sizes={scripts:byExt('.js'),styles:byExt('.css'),images:records.filter(x=>x.file.startsWith('images/')).reduce((n,x)=>n+x.bytes,0)};
for(const [type,limit] of Object.entries(budget))if(sizes[type]>limit)throw new Error(`${type} ${sizes[type]} bayt; limit ${limit}`);
const forbidden=['.env','.map','server/','_worker.js','package-lock.json'];
for(const x of records)if(forbidden.some(p=>x.file.includes(p)))throw new Error(`İstenmeyen yayın çıktısı: ${x.file}`);
const index = await readFile(path.join(root, 'index.html'), 'utf8');
if (/<style\b/i.test(index)) throw new Error('HTML içinde satır içi stil bulunuyor: sıkı CSP ile uyumsuz');
for(const script of index.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
  const attrs=script[1] || '';
  if(!/\bsrc=|type=['"]application\/ld\+json['"]/.test(attrs)) throw new Error('HTML içinde satır içi JS var: sıkı CSP ile uyumsuz');
}
if(!/src="\/js\/site\.js\?v=[a-f0-9]{12}"/.test(index)) throw new Error('Galeri ve menü JS kaynağı eksik');
if (!/İzmir|lokma/i.test(index))throw new Error('Ana sayfa içeriği eksik');
console.log(JSON.stringify({status:'PASS',files:records.length,bytes:records.reduce((a,r)=>a+r.bytes,0),sizes,budget},null,2));

// Missing paths must be 404 on Cloudflare Pages; prevent accidental SPA fallback.
const missing=await readFile(path.join(root,'404.html'),'utf8');
if(!/noindex,follow/.test(missing)||!/Ana sayfaya dön/.test(missing))throw new Error('404 page missing noindex/navigation');

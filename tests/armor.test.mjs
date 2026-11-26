import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
const base = new URL('../', import.meta.url);
const read = async (path) => readFile(new URL(path, base), 'utf8');

const parseHeaders = async () => {
  const blocks = new Map(); let active;
  for (const raw of (await read('public/_headers')).split(/\r?\n/)) {
    if (!raw.trim() || raw.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(raw)) { active=raw.trim(); assert.ok(!blocks.has(active), `Duplicate rule: ${active}`); blocks.set(active,new Map()); continue; }
    assert.ok(active, 'Header without path rule');
    const match=raw.trim().match(/^([^:]+):\s*(.+)$/);
    assert.ok(match, `Malformed header: ${raw}`);
    const name=match[1].toLowerCase();
    assert.ok(!blocks.get(active).has(name), `Duplicate ${name} within ${active}`);
    blocks.get(active).set(name,match[2]);
  }
  return blocks;
};

test('security headers have exact enforceable directives and no unsafe fallbacks', async () => {
  const headers=await parseHeaders();
  const common=headers.get('/*'); assert.ok(common);
  const csp=common.get('content-security-policy'); assert.ok(csp);
  const directives=new Map(csp.split(';').map(x=>x.trim().split(/\s+/,2)).filter(x=>x[0]).map(([key])=>[key,csp.split(';').map(x=>x.trim()).find(x=>x.startsWith(key+' '))]));
  const expected={ 'default-src':"'none'",'script-src':"'self' https://www.googletagmanager.com",'script-src-attr':"'none'",'style-src':"'self'",'style-src-attr':"'none'",'img-src':"'self'",'font-src':"'self'",'connect-src':"'self' https://www.google-analytics.com https://region1.google-analytics.com",'frame-src':"'none'",'frame-ancestors':"'none'",'object-src':"'none'",'base-uri':"'none'",'form-action':"'none'" };
  for(const [key,policy] of Object.entries(expected)) assert.equal(directives.get(key),`${key} ${policy}`,key);
  assert.ok(csp.includes('upgrade-insecure-requests'));
  assert.doesNotMatch(csp,/unsafe-(?:inline|eval)|\*/);
  assert.equal(common.get('x-frame-options'),'DENY');
  assert.equal(common.get('x-content-type-options'),'nosniff');
  assert.ok(common.get('permissions-policy').includes('camera=()'));
  assert.ok(!common.has('strict-transport-security'),'Do not enable HSTS before HTTPS/redirect verification');
});

test('public photos remain shareable while scripts and CSS retain isolation', async () => {
 const headers=await parseHeaders();
 assert.ok(!headers.get('/*').has('cross-origin-resource-policy'),'Global CORP can break social/product image embeds');
 assert.ok(!headers.get('/images/*').has('cross-origin-resource-policy'));
 assert.equal(headers.get('/js/*').get('cross-origin-resource-policy'),'same-origin');
 assert.equal(headers.get('/_astro/*').get('cross-origin-resource-policy'),'same-origin');
 assert.match(headers.get('/_astro/*').get('cache-control'),/immutable/);
 assert.doesNotMatch(headers.get('/images/*').get('cache-control'),/immutable/);
});

test('unknown routes yield a purpose-built noindex 404 while homepage remains indexable',async()=>{
 const missing=await read('src/pages/404.astro');
 assert.match(missing,/noindex=\{true\}/);
 assert.match(missing,/class="section contact-page"/);
 assert.match(missing,/href="\/"/);
 assert.doesNotMatch(await read('src/pages/index.astro'),/noindex=\{true\}/);
});

test('CI is read-only and official actions are pinned to immutable reviewed SHAs',async()=>{
 const ci=await read('.github/workflows/quality.yml');
 for(const name of ['checkout','setup-node']) assert.match(ci,new RegExp(`actions/${name}@[a-f0-9]{40}`));
 assert.doesNotMatch(ci,/actions\/(?:checkout|setup-node)@v\d/);
 assert.match(ci,/contents: read/);
 assert.doesNotMatch(ci,/deploy_website|deploy-pages|pages:\s*write|auto-merge/);
});

test('deployment has no backend, routes do not allow uploads or user-provided code',async()=>{
 const cfg=await read('astro.config.mjs');
 assert.match(cfg,/output: 'static'/);
 assert.doesNotMatch(cfg,/allowedHosts|adapter:|output:\s*'server'/);
 const files=await readdir(new URL('src/pages/',base));
 assert.ok(files.includes('404.astro'));
 assert.equal(files.filter(n=>/\.ts$/.test(n)).sort().join(','),'robots.txt.ts,sitemap.xml.ts');
});

test('public assets and developer files are isolated: no upload endpoint or source maps',async()=>{
 const walk=async(path)=>{
  for(const item of await readdir(new URL(path,base),{withFileTypes:true})){
   const next=path+item.name;
   assert.doesNotMatch(item.name, /^(?:\.env.*|\.git|\.npmrc|package(?:-lock)?\.json|.*\.map|.*\.pem|.*\.key)$/i,`Unexpected public asset: ${next}`);
   if(item.isDirectory())await walk(next+'/');
  }
 };
 await walk('public/');
});

test('npm root lockfile version and Node engine match package metadata',async()=>{
 const pkg=JSON.parse(await read('package.json'));const lock=JSON.parse(await read('package-lock.json'));
 assert.equal(pkg.version,lock.version);
 assert.equal(pkg.version,lock.packages[''].version);
 assert.equal(pkg.engines.node,lock.packages[''].engines.node);
 assert.deepEqual(pkg.dependencies,lock.packages[''].dependencies);
});

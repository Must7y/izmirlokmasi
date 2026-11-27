// Read-only production verification: no probing flood; static content only.
import {securityHeaderGaps, baselineSecurityHeaderGaps} from './security-headers.mjs';
import {inspectPage, inspectSitemap, inspectRobots, origin} from './seo-checks.mjs';
import {fetchSite, responseIndexingGaps, redirectChecks} from './live-policy.mjs';
const base = new URL(process.argv[2] || 'https://izmirlokmasi.com');
const cloudflareHeaders = process.argv.includes('--cloudflare-headers') || process.argv.includes('--require-security-headers');
const baselineHeaders = process.argv.includes('--cloudflare-baseline');
const revisionIndex=process.argv.indexOf('--expected-revision');
const expectedRevision=revisionIndex===-1?null:process.argv[revisionIndex+1];
if (revisionIndex!==-1 && !/^[a-f0-9]{40}$/.test(expectedRevision||'')) throw new Error('Expected revision must be a full commit SHA');
if (base.protocol !== 'https:' || !base.hostname) throw new Error('Verified HTTPS host is required');
if (base.origin !== origin || base.username || base.password || base.pathname !== '/' || base.search || base.hash) throw new Error('Only the configured production origin can be verified');
const routes = ['/', '/izmir-lokmasi/', '/saray-lokmasi/','/hayir-lokmasi/','/mevlit-lokmasi/','/iletisim/','/gizlilik/'];
const assets = ['/robots.txt','/sitemap.xml','/js/site.js','/js/analytics.js','/icons/arrow-up-right.svg','/images/lokma-real-appetizing.webp','/favicon.svg','/favicon.png','/favicon.ico','/apple-touch-icon.png'];
const unknown = ['/__izmir_missing_check_2026__','/.env','/.git/config','/package.json'];
let failures = 0; let warnings = 0;
const fail=(path,message)=>{failures++;console.log(`FAIL ${path}: ${message}`)};
const warn=(path,message)=>{warnings++;console.log(`WARN ${path}: ${message}`)};
async function get(path){
 const {response, url: effective}=await fetchSite(new URL(path,base));
 if(effective.protocol !== 'https:' || effective.hostname!==base.hostname) fail(path,'Unexpected redirect host');
 if (routes.includes(path) && effective.href !== new URL(path,base).href) fail(path,'Canonical page redirects to a different URL');
 return response;
}
for(const p of [...routes,...assets,...unknown]){
 const before=failures;
 try {
   const res=await get(p);
   const notFound=unknown.includes(p);
   if (notFound){
     if(![403,404,410].includes(res.status))fail(p,`Expected 403/404/410; got ${res.status}`);
     else console.log(`PASS ${p} ${res.status} unavailable`);
     continue;
   }
   for (const gap of responseIndexingGaps(res.headers, routes.includes(p) && p !== '/gizlilik/')) fail(p,gap);
   if(res.status!==200){fail(p,`HTTP ${res.status}`);continue;}
   if(cloudflareHeaders && res.headers.get('x-content-type-options')!=='nosniff')fail(p,'nosniff missing');
   const type=res.headers.get('content-type')||'';
   if(p.endsWith('.png') && !type.includes('image/png'))fail(p,`Unexpected PNG content type: ${type}`);
   if(p.endsWith('.ico') && !/image\/(?:x-icon|vnd\.microsoft\.icon)/.test(type))fail(p,`Unexpected icon content type: ${type}`);
   if(routes.includes(p)){
     if (baselineHeaders) for (const gap of baselineSecurityHeaderGaps(res.headers)) fail(p,gap);
     if(!type.includes('text/html'))fail(p,`Unexpected content type: ${type}`);
     const csp=res.headers.get('content-security-policy')||'';
     if (cloudflareHeaders) {
       for(const s of ["default-src 'none'","script-src 'self'","style-src 'self'","frame-ancestors 'none'"]){if(!csp.includes(s))fail(p,`Missing CSP ${s}`)}
       if(/unsafe-inline|unsafe-eval/i.test(csp))fail(p,'Unsafe CSP directive');
       if(res.headers.get('x-frame-options')!=='DENY')fail(p,'Frame protection absent');
     }
     const html=await res.text();
     for (const message of inspectPage(html,p.replace(/\/?$/, '/')).errors) fail(p,message);
     if (!cloudflareHeaders && !/http-equiv=["']Content-Security-Policy["']/i.test(html)) fail(p,'GitHub Pages CSP meta absent');
     if(/<style\b|<script\b(?![^>]*src=)(?![^>]*type=["']application\/ld\+json)/i.test(html)) fail(p,'Inline executable script/style under strict CSP');
     if(p==='/') {
        if(!html.includes('wa.me/'))fail(p,'WhatsApp link missing');
        if(!html.includes('rel="canonical"'))fail(p,'Canonical missing');
        if(/<meta name="robots"[^>]*noindex/i.test(html)|| /\bnoindex\b/i.test(res.headers.get('x-robots-tag')||''))fail(p,'Production home unexpectedly noindex');
        if(cloudflareHeaders && !res.headers.has('strict-transport-security'))warn(p,'HSTS disabled; only enable after validated HTTPS and redirect rollout');
        for (const gap of securityHeaderGaps(res.headers)) { if (cloudflareHeaders) fail(p,gap); else warn(p,gap); }
     }
   }
   if(p.startsWith('/js/')){
     if(!/javascript|ecmascript/.test(type))fail(p,`Unexpected JS MIME ${type}`);
     if(cloudflareHeaders && res.headers.get('cross-origin-resource-policy')!=='same-origin')warn(p,'JS CORP policy missing');
   }
   if(p.startsWith('/images/') && res.headers.get('cross-origin-resource-policy')==='same-origin')fail(p,'Image preview would be blocked cross-origin');
   if(p==='/robots.txt') {
     const robots=await res.text();
     for(const message of inspectRobots(robots).errors)fail(p,message);
   }
   if(p==='/sitemap.xml') for(const message of inspectSitemap(await res.text()).errors)fail(p,message);
   if(failures===before)console.log(`PASS ${p} ${res.status}`);
 }catch(e){fail(p,`unreachable: ${e.message}`)}
}
if (process.argv.includes('--check-redirects')) {
  for (const [source,target] of redirectChecks) {
    try {
      const {response,location} = await fetchSite(source,{follow:false});
      if (![301,308].includes(response.status) || location?.href !== target) fail(new URL(source).pathname,'Expected permanent redirect to canonical target');
      else console.log(`PASS redirect ${source} -> ${target}`);
      await response.body?.cancel();
    } catch (error) { fail(new URL(source).pathname,`Redirect check: ${error.message}`); }
  }
}
if(expectedRevision){
 try {
   const res=await get('/build-info.json');
   if(res.status!==200)fail('/build-info.json',`HTTP ${res.status}; published revision not verified`);
   else {
     const build=await res.json();
     if(build.revision!==expectedRevision || build.dirty!==false)fail('/build-info.json','Published revision differs from the clean requested commit');
     else console.log(`PASS published revision ${expectedRevision}`);
   }
 }catch(e){fail('/build-info.json',`Revision check failed: ${e.message}`)}
}
console.log(`Verification result: ${failures} failures; ${warnings} warnings`);
if(failures)process.exitCode=1;

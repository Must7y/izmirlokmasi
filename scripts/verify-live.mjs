// Read-only production verification: no probing flood; static content only.
const base = new URL(process.argv[2] || 'https://izmirlokmasi.com');
const cloudflareHeaders = process.argv.includes('--cloudflare-headers');
if (base.protocol !== 'https:' || !base.hostname) throw new Error('Verified HTTPS host is required');
const routes = ['/', '/izmir-lokmasi', '/saray-lokmasi','/hayir-lokmasi','/mevlit-lokmasi','/iletisim','/gizlilik'];
const assets = ['/robots.txt','/sitemap.xml','/js/site.js','/images/lokma-real-appetizing.webp','/favicon.svg'];
const unknown = ['/__izmir_missing_check_2026__','/.env','/.git/config','/package.json'];
let failures = 0; let warnings = 0;
const fail=(path,message)=>{failures++;console.log(`FAIL ${path}: ${message}`)};
const warn=(path,message)=>{warnings++;console.log(`WARN ${path}: ${message}`)};
async function get(path){
 const response=await fetch(new URL(path,base),{redirect:'follow',signal:AbortSignal.timeout(12000),headers:{'User-Agent':'IzmirLokmaReadOnlyVerifier/2.4'}});
 const effective=new URL(response.url);
 if(effective.protocol !== 'https:' || effective.hostname!==base.hostname) fail(path,`Unexpected redirect to ${response.url}`);
 return response;
}
for(const p of [...routes,...assets,...unknown]){
 try {
   const res=await get(p);
   const notFound=unknown.includes(p);
   if (notFound){
     if(![403,404,410].includes(res.status))fail(p,`Expected 403/404/410; got ${res.status}`);
     else console.log(`PASS ${p} ${res.status} unavailable`);
     continue;
   }
   if(res.status!==200){fail(p,`HTTP ${res.status}`);continue;}
   if(cloudflareHeaders && res.headers.get('x-content-type-options')!=='nosniff')fail(p,'nosniff missing');
   const type=res.headers.get('content-type')||'';
   if(routes.includes(p)){
     if(!type.includes('text/html'))fail(p,`Unexpected content type: ${type}`);
     const csp=res.headers.get('content-security-policy')||'';
     if (cloudflareHeaders) {
       for(const s of ["default-src 'none'","script-src 'self'","style-src 'self'","frame-ancestors 'none'"]){if(!csp.includes(s))fail(p,`Missing CSP ${s}`)}
       if(/unsafe-inline|unsafe-eval/i.test(csp))fail(p,'Unsafe CSP directive');
       if(res.headers.get('x-frame-options')!=='DENY')fail(p,'Frame protection absent');
     }
     const html=await res.text();
     if (!cloudflareHeaders && !/http-equiv=["']Content-Security-Policy["']/i.test(html)) fail(p,'GitHub Pages CSP meta absent');
     if(/<style\b|<script\b(?![^>]*src=)(?![^>]*type=["']application\/ld\+json)/i.test(html)) fail(p,'Inline executable script/style under strict CSP');
     if(p==='/') {
        if(!html.includes('wa.me/'))fail(p,'WhatsApp link missing');
        if(!html.includes('rel="canonical"'))fail(p,'Canonical missing');
        if(/<meta name="robots"[^>]*noindex/i.test(html)|| /\bnoindex\b/i.test(res.headers.get('x-robots-tag')||''))fail(p,'Production home unexpectedly noindex');
        if(cloudflareHeaders && !res.headers.has('strict-transport-security'))warn(p,'HSTS disabled; only enable after validated HTTPS and redirect rollout');
        if(!cloudflareHeaders && !res.headers.has('content-security-policy')) warn(p,'Pages does not enforce HTTP-level CSP, frame-ancestors, HSTS or frame protection. Use a trusted proxy if required.');
     }
   }
   if(p==='/js/site.js'){
     if(!/javascript|ecmascript/.test(type))warn(p,`Review JS MIME ${type}`);
     if(cloudflareHeaders && res.headers.get('cross-origin-resource-policy')!=='same-origin')warn(p,'JS CORP policy missing');
   }
   if(p.startsWith('/images/') && res.headers.get('cross-origin-resource-policy')==='same-origin')fail(p,'Image preview would be blocked cross-origin');
   console.log(`PASS ${p} ${res.status}`);
 }catch(e){fail(p,`unreachable: ${e.message}`)}
}
console.log(`Verification result: ${failures} failures; ${warnings} warnings`);
if(failures)process.exitCode=1;

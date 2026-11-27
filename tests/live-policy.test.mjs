import test from 'node:test';
import assert from 'node:assert/strict';
import {fetchSite, validatedSiteURL, responseIndexingGaps, redirectChecks} from '../scripts/live-policy.mjs';
import {baselineSecurityHeaderGaps} from '../scripts/security-headers.mjs';
import {inspectRobots} from '../scripts/seo-checks.mjs';
import {buildHeaderRule} from '../scripts/cloudflare-rules.mjs';

test('redirects cannot cause off-site, plaintext, credential-bearing or private-host requests', async()=>{
  for (const destination of ['https://invalid.example/', 'http://izmirlokmasi.com/',
    'https://user:password@izmirlokmasi.com/', 'https://127.0.0.1/', 'https://izmirlokmasi.com:8443/']) {
    let requests = 0;
    const fetcher = async()=>{requests++; return new Response(null,{status:302,headers:{location:destination}});};
    await assert.rejects(fetchSite('https://izmirlokmasi.com/',{fetcher}),/approved site/);
    assert.equal(requests,1,'Unapproved destination must never be fetched');
    assert.throws(()=>validatedSiteURL(destination));
  }
});
test('only bounded redirects are followed; initial status remains inspectable',async()=>{
  let requests=0;
  const fetcher=async()=>{requests++;return new Response(null,{status:301,headers:{location:'/'}});};
  const initial=await fetchSite('https://www.izmirlokmasi.com/',{follow:false,fetcher});
  assert.equal(initial.response.status,301);
  assert.equal(requests,1);
  requests=0;
  await assert.rejects(fetchSite('https://izmirlokmasi.com/',{fetcher}),/hop limit/);
  assert.equal(requests,5);
});
test('relative and www redirects work without disabling TLS validation',async()=>{
  const fetched=[];
  const fetcher=async(url,options)=>{
    fetched.push(url.href);
    assert.equal(options.redirect,'manual');
    assert.ok(options.signal instanceof AbortSignal);
    return fetched.length===1 ? new Response(null,{status:308,headers:{location:'/iletisim/'}}) : new Response('ok');
  };
  const {url,response}=await fetchSite('https://izmirlokmasi.com/iletisim',{fetcher});
  assert.equal(url.href,'https://izmirlokmasi.com/iletisim/');
  assert.equal(response.status,200);
});
test('HTTP robots restrictions and CDN challenges are detected on every public page',()=>{
  for (const value of ['noindex','googlebot: noindex, follow','none','nosnippet']) {
    assert.ok(responseIndexingGaps(new Headers({'x-robots-tag':value})).length);
  }
  assert.deepEqual(responseIndexingGaps(new Headers({'x-robots-tag':'noindex'}),false),[]);
  assert.ok(responseIndexingGaps(new Headers({'cf-mitigated':'challenge'})).length);
});
test('baseline accepts the installed Cloudflare policy but rejects disabled safeguards',()=>{
  const h=new Headers({'x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff',
    'referrer-policy':'same-origin','permissions-policy':'camera=(), microphone=()'});
  assert.deepEqual(baselineSecurityHeaderGaps(h),[]);
  h.set('permissions-policy','camera=*, microphone=()');
  assert.ok(baselineSecurityHeaderGaps(h).includes('Camera/microphone restriction absent'));
});
test('training-only robots blocks do not trigger false SEO alarms',()=>{
  const robots='User-agent: GPTBot\nDisallow: /\nUser-agent: Google-Extended\nDisallow: /\nUser-agent: *\nAllow: /\nSitemap: https://izmirlokmasi.com/sitemap.xml\n';
  assert.deepEqual(inspectRobots(robots).errors,[]);
  assert.deepEqual(inspectRobots('User-agent: GPTBot\nDisallow: /\nSitemap: https://izmirlokmasi.com/sitemap.xml').errors,[]);
  assert.deepEqual(inspectRobots('User-agent: Googlebot\nDisallow:\nUser-agent: GPTBot\nDisallow: /\nSitemap: https://izmirlokmasi.com/sitemap.xml').errors,[]);
});
test('search-specific, rendering-asset and image crawler blocks are caught',()=>{
  for (const rule of ['User-agent: Googlebot\nDisallow: /hayir-lokmasi/',
    'User-agent: *\nDisallow: /_astro/', 'User-agent: Googlebot-Image\nDisallow: /images/']) {
    const result=inspectRobots(rule+'\nSitemap: https://izmirlokmasi.com/sitemap.xml');
    assert.ok(result.errors.includes('Production crawling blocked'),rule);
  }
});
test('specific crawler overrides and equal-length Allow precedence match robots semantics',()=>{
  const sitemap='\nSitemap: https://izmirlokmasi.com/sitemap.xml';
  assert.deepEqual(inspectRobots('User-agent: *\nDisallow: /\nAllow: /\n'+sitemap).errors,[]);
  const result=inspectRobots('User-agent: *\nAllow: /\nUser-agent: Googlebot\nDisallow: /\nUser-agent: Googlebot\nAllow: /'+sitemap);
  assert.deepEqual(result.errors,[]);
});
test('Cloudflare rule is host-scoped, preserves location and uses a reversible HSTS rollout',()=>{
  const rule=buildHeaderRule();
  assert.equal(rule.action,'rewrite');
  assert.match(rule.expression,/http.host in/);
  assert.match(rule.expression,/and ssl/);
  const headers=rule.action_parameters.headers;
  assert.equal(headers['permissions-policy'].value,'camera=(), microphone=()');
  assert.equal(headers['strict-transport-security'].value,'max-age=300');
  assert.match(headers['content-security-policy'].value,/frame-ancestors 'none'/);
  assert.ok(Object.values(headers).every(header=>header.operation==='set'));
  assert.equal(headers['x-robots-tag'],undefined);
  assert.equal(headers['cross-origin-resource-policy'],undefined,'Public product imagery stays shareable');
});
test('redirect inventory includes both legacy hosts and canonical slash targets',()=>{
  assert.ok(redirectChecks.some(([from,to])=>from==='https://www.izmirlokmasi.com/default.aspx' && to==='https://izmirlokmasi.com/'));
  assert.ok(redirectChecks.some(([from,to])=>from==='https://izmirlokmasi.com/hayir-lokmasi' && to==='https://izmirlokmasi.com/hayir-lokmasi/'));
  assert.ok(redirectChecks.every(([from,to])=>validatedSiteURL(from) && validatedSiteURL(to)));
});

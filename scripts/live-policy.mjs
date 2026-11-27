import {origin, indexableRoutes} from './seo-checks.mjs';

// Network scope is fixed to this site's two public HTTPS hosts. Never fetch a
// redirect before validating it; do not follow a remote URL into another origin.
const hosts = new Set([new URL(origin).hostname, 'www.' + new URL(origin).hostname]);
export function validatedSiteURL(value, base = origin) {
  const url = new URL(value, base);
  if (url.protocol !== 'https:' || !hosts.has(url.hostname) || url.username || url.password || url.port) {
    throw new Error('Redirect outside approved site hosts or HTTPS');
  }
  return url;
}

export async function fetchSite(value, {follow = true, fetcher = fetch} = {}) {
  let url = validatedSiteURL(value);
  const signal = AbortSignal.timeout(12000);
  for (let hops = 0; hops <= 4; hops++) {
    const response = await fetcher(url, {redirect: 'manual', signal,
      headers: {'User-Agent': 'IzmirLokmaReadOnlyVerifier/3.0'}});
    if (![301, 302, 303, 307, 308].includes(response.status)) return {response, url};
    const location = response.headers.get('location');
    if (!location) { await response.body?.cancel(); throw new Error('Redirect without Location'); }
    let next;
    try { next = validatedSiteURL(location, url); }
    catch (error) { await response.body?.cancel(); throw error; }
    if (!follow) return {response, url, location: next};
    await response.body?.cancel();
    url = next;
  }
  throw new Error('Redirect hop limit exceeded');
}

export function responseIndexingGaps(headers, indexable = true) {
  const gaps = [];
  if (indexable && /(?:^|[:,\s])(?:noindex|none|nosnippet)(?=$|[,\s])/i.test(headers.get('x-robots-tag') || '')) gaps.push('HTTP indexing/snippet restriction on public page');
  if (headers.get('cf-mitigated')?.toLowerCase() === 'challenge') gaps.push('Cloudflare challenge instead of public content');
  return gaps;
}

export const redirectChecks = [
  ...indexableRoutes.filter(route=>route !== '/').map(route=>[origin + route.slice(0,-1), origin + route]),
  ...[origin, 'https://www.izmirlokmasi.com'].flatMap(host=>[
    ['/default.aspx', '/'], ['/hakkimizda', '/'], ['/hakkimizda/', '/']
  ].map(([from,to])=>[host + from, origin + to])),
  ['https://www.izmirlokmasi.com/', origin + '/'],
];

// Bounded checks for our generated static HTML, not a general-purpose HTML parser.
export const origin = 'https://izmirlokmasi.com';
export const serviceRoutes = ['izmir-lokmasi', 'saray-lokmasi', 'hayir-lokmasi', 'mevlit-lokmasi'];
export const indexableRoutes = ['/', ...serviceRoutes.map(route => `/${route}/`), '/iletisim/'];
export const canonicalFor = route => new URL(route.replace(/\/?$/, '/'), origin).href;
export const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m => [m[1].toLowerCase(), m[2] ?? m[3]]));
const plain = text => text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

export function inspectPage(html, route) {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => attributes(m[0]));
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const descriptions = meta.filter(m => m.name === 'description');
  const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attributes(m[0])).filter(a => a.rel === 'canonical');
  const robots = meta.filter(m => m.name === 'robots');
  const title = plain(titles[0]?.[1] || '');
  const description = descriptions[0]?.content || '';
  check(titles.length === 1 && title.length > 0, 'Exactly one nonempty title required');
  check(descriptions.length === 1 && description.length > 0, 'Exactly one nonempty description required');
  check(canonicals.length === 1 && canonicals[0].href === canonicalFor(route), 'Canonical differs from expected production URL');
  check(robots.length === 1, 'Exactly one robots meta required');
  check(/<html\b[^>]*lang="tr"/i.test(html), 'Turkish document language missing');
  check((html.match(/<h1\b/gi) || []).length === 1, 'Exactly one H1 required');
  check(meta.some(m => m.name === 'viewport' && m.content?.includes('width=device-width')), 'Responsive viewport missing');
  check(html.includes('https://wa.me/905306902501'), 'Verified WhatsApp contact missing');
  const noindex = route === '/gizlilik/' || route === '/404/';
  check(noindex ? /\bnoindex\b/.test(robots[0]?.content || '') : !/\bnoindex\b/.test(robots[0]?.content || ''), 'Unexpected indexing policy');
  for (const [property, expected] of [['og:url', canonicalFor(route)], ['og:title', title]]) {
    const tags = meta.filter(m => m.property === property);
    check(tags.length === 1 && tags[0].content === expected, `${property} mismatch`);
  }
  check(meta.some(m => m.property === 'og:image' && m.content === origin + '/images/og-hanifi-usta.webp'), 'Social image missing');
  const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  check(blocks.length === 1, 'Exactly one JSON-LD block required');
  let graph = [];
  for (const block of blocks) {
    try {
      const schema = JSON.parse(block[1]);
      check(schema['@context'] === 'https://schema.org', 'JSON-LD context mismatch');
      check(Array.isArray(schema['@graph']), 'JSON-LD graph missing');
      graph = Array.isArray(schema['@graph']) ? schema['@graph'].filter(n => n && typeof n === 'object') : [];
    } catch { errors.push('Invalid JSON-LD'); }
  }
  const organization = graph.find(n => n['@type'] === 'Organization');
  check(organization?.telephone === '+905306902501', 'Organization telephone mismatch');
  check(graph.some(n => n['@type'] === 'WebSite'), 'WebSite schema missing');
  if (!noindex) {
    const page = graph.find(n => ['WebPage', 'ContactPage'].includes(n['@type']));
    check(page?.url === canonicalFor(route) && page?.name === title, 'Page schema mismatch');
    check(page?.['@type'] === (route === '/iletisim/' ? 'ContactPage' : 'WebPage'), 'Page schema type mismatch');
    if (serviceRoutes.includes(route.replaceAll('/', ''))) {
      const service = graph.find(n => n['@type'] === 'Service');
      check(service?.url === canonicalFor(route) && Boolean(service?.name), 'Service schema missing');
      check(service?.provider?.['@id'] === organization?.['@id'], 'Service provider mismatch');
      check(page?.mainEntity?.['@id'] === service?.['@id'], 'Service/page reference mismatch');
    }
    if (route !== '/') {
      const breadcrumb=graph.find(n=>n['@type']==='BreadcrumbList');
      const items=breadcrumb?.itemListElement;
      check(Array.isArray(items) && items.length===2 && items[0]?.position===1 && items[0]?.item===origin+'/' && items[1]?.position===2 && items[1]?.item===canonicalFor(route), 'Breadcrumb hierarchy mismatch');
      check(page?.breadcrumb?.['@id']===breadcrumb?.['@id'], 'Page/breadcrumb reference mismatch');
    }
  }
  return {route, title, description, canonical: canonicals[0]?.href, errors};
}

export function inspectSitemap(xml) {
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const expected = indexableRoutes.map(canonicalFor);
  const errors = [];
  if (!xml.includes('<urlset') || !xml.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) errors.push('Sitemap namespace missing');
  if (new Set(locations).size !== locations.length) errors.push('Duplicate sitemap URL');
  if (JSON.stringify([...locations].sort()) !== JSON.stringify(expected.sort())) errors.push('Sitemap URL set differs from indexable canonical URLs');
  return {locations, errors};
}

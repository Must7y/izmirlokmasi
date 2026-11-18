import { services } from '../data/site';

export function GET() {
  const pages = ['/', ...services.map(service => '/' + service.slug + '/'), '/iletisim/'];
  const entries = pages.map(path => '<url><loc>https://izmirlokmasi.com' + path + '</loc></url>');
  const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entries.join('') + '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

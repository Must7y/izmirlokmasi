import { services } from '../data/site';

export function GET() {
  const pages = ['/', ...services.map(service => '/' + service.slug + '/'), '/iletisim/'];
  const entries = pages.map(path => {
    const imageNames = path==='/' ? ['hero-mixed-lokma.webp','lokma-real-appetizing.webp','saray-lokmasi-photo.webp'] : path==='/iletisim/' ? [] : [path==='/saray-lokmasi/'?'saray-lokmasi-photo.webp':'lokma-real-appetizing.webp'];
    const images=imageNames.map(name=>'<image:image><image:loc>https://izmirlokmasi.com/images/'+name+'</image:loc></image:image>').join('');
    return '<url><loc>https://izmirlokmasi.com' + path + '</loc>'+images+'</url>';
  });
  const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' + entries.join('') + '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

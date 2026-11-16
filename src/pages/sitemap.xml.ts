import {services} from '../data/site';
export function GET(){return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['',...services.map(s=>s.slug),'iletisim'].map(p=>'<url><loc>https://izmirlokmasi.com/'+p+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}})}

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const read=async p=>readFile(new URL('../'+p,import.meta.url),'utf8');
test('altbilgi sade, gezinme menüsü, gizlilik ve hizmet sayfaları korundu', async()=>{
 const layout=await read('src/layouts/Layout.astro');
 assert.match(layout,/footer-minimal/);
 assert.doesNotMatch(layout,/footer-links|desktop-nav|mobile-nav/);
 assert.match(layout,/href="\/gizlilik\/"/);
 assert.match(await read('src/components/ScrollDock.astro'),/src="\/icons\/whatsapp.svg"/);
 assert.doesNotMatch(layout,/class="button button-header"/);
 for(const page of ['src/pages/[service].astro','src/pages/iletisim.astro','src/pages/gizlilik.astro'])assert.ok((await read(page)).length>100);
});
test('SEO: meta, canonical, OG, Twitter, Organization ve WebSite yapısı korunur',async()=>{
 const layout=await read('src/layouts/Layout.astro');
 for (const token of ['rel="canonical"','name="description"','og:site_name','og:image:width','og:image:height','twitter:title','twitter:image',"'@type':'Organization'","'@type':'WebSite'"]) assert.ok(layout.includes(token),token);
 assert.match(await read('src/pages/sitemap.xml.ts'),/contentRoutes.filter/);
 assert.match(await read('src/pages/robots.txt.ts'),/Sitemap/);
 assert.doesNotMatch(layout,/aggregateRating|streetAddress|openingHours/);
});
test('karışık lokma fotoğrafı ana sayfada, iki ayrı ürün fotoğrafı kartlarda',async()=>{
 assert.match(await read('src/pages/index.astro'),/hero-mixed-lokma.webp/);
 const cards=await read('src/components/LokmaSlider.astro');
 assert.match(cards,/lokma-real-appetizing.webp/);
 assert.match(cards,/saray-lokmasi-photo.webp/);
 const css=await read('src/styles/site.css');
 assert.match(css,/\.lokma-track\{display:grid/);
 const img=await stat(new URL('../public/images/hero-mixed-lokma.webp',import.meta.url));assert.ok(img.size<220000);
});

// Bölge bazlı pazarlama vaadinin gerçek işletme bilgisi doğrulanmadan eklenmesini engeller.
test('İstanbul arama niyeti destekleniyor; çevre iller ve uygunluk koşulu korunuyor', async () => {
 const sources=await Promise.all(['src/layouts/Layout.astro','src/pages/index.astro','src/pages/iletisim.astro','src/pages/[service].astro','src/data/site.ts'].map(read));
 const all=sources.join('\n');
 assert.doesNotMatch(all,/yalnızca İstanbul|sadece İstanbul|Türkiye genelinde|81 ilde/i);
 assert.match(all,/Hangi bölgelerde hizmet veriyorsunuz\?/);
 assert.match(all,/Organizasyonun tarihini ve konumunu paylaşın/);
 assert.match(all,/uygunluğu birlikte kontrol edelim|hizmet uygunluğunu birlikte teyit edelim/);
 assert.match(all,/HAYIR • MEVLİT • ÖZEL GÜN LOKMASI/);
});

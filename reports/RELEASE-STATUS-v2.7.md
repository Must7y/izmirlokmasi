# İzmir Lokma v2.7 – değişiklik ve yayın durumu (24.10.2026)

## Yapıldı ve doğrulandı
- Gösterilen gereksiz altbilgi bağlantı sütunları kaldırıldı. Küçük marka, telif ve gizlilik bağlantısı korunuyor.
- Üst menü de sade tasarım kararına uygun kaldırıldı. WhatsApp ikonu aynı alan adından geliyor.
- Rastgele yeşil emoji simgeleri kaldırıldı. Mobilde iki ürün yan yana/slider yerine alt alta; masaüstünde iki ürün arasında geçiş kontrolleri mevcut.
- Kaynak görsel bütçesi denetlendi: karışık tepsi, halka lokma ve yuvarlak lokma WebP optimize edildi.
- SEO: title/description, canonical, Open Graph, Twitter, Organization + WebSite şema verisi, sitemap.xml ve robots.txt korunup geliştirildi. Hizmet sayfaları gizlenmedi veya silinmedi.
- `npm run test:source`: 27/27 geçti. Kaynaklar son paketten doğrulandı.

## Yayın engelleri: DOĞRULANMADI / YAPILMADI
- Bu ortamda Node v22.16.0 mevcut, proje ≥22.23.4 ister; `npm ci`, `astro build` ve dist testleri başarıyla çalıştırılamadı.
- Çevrimiçi `npm audit`, gerçek Lighthouse ve Chrome/iOS görsel testleri tamamlanamadı. Chrome yerel dosya erişimi `ERR_BLOCKED_BY_ADMINISTRATOR` verdi.
- GitHub bağlantısında İzmir Lokma deposu yok; yalnız alakasız bir proje var, ona dokunulmadı.
- Cloudflare/hosting için yetkilendirilmiş dağıtım erişimi mevcut değil; `https://izmirlokmasi.com` dış erişim kontrolünde açılamadı. DNS/TLS/WAF/HTTP başlıkları doğrulanmadı.
- Bu nedenle **canlı site değiştirilmedi**; paket **test ve yayın adayıdır**, başarılı canlı yayın iddiası değildir.

## Yayın kapısı
1. Yetkili İzmir Lokma hosting/deploy projesini bağla (veya izinli yayımlama panelinde işle).
2. Node ≥22.23.4: `npm ci && npm run test:source && npm run test:build && npm run audit:deps`.
3. Staging: telefon 360/390, tablet 768, masaüstü 1440; WhatsApp ve bütün hizmet URL'leri, menü yokluğu, altbilgi kontrolü.
4. HTTPS, 200/404, güvenlik başlıkları, `robots.txt`, `sitemap.xml`, canonical ve Search Console canlı kontrolü.
5. Gerekirse geri dön: Önceki v2.6 arşivini koru.

## SEO dürüstlük notu
Doğrulanmamış fiziksel işletme adresi, çalışma saatleri ve değerlendirmeler eklenmedi. Google'da sıralama/ziyaret artışı garantisi verilmez.

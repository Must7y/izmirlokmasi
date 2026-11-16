# v2.4.0 · Hafif zırh / yapıyı koruyan aday — 24 Ekim 2026

- Yalnız `/_astro/*` ve `/js/*` CORP same-origin; herkese açık lokma fotoğraflarına yanlışlıkla uygulanmıyor.
- Standart Astro `404.html` sayfası, `noindex`, ana sayfaya güvenli dönüş eklendi.
- Yayın sonrası kontrol hassas yollar, noindex, medya CORP ve HTTPS için genişletildi.
- GitHub CI: checkout/setup-node doğrulanmış 40 karakterlik SHA sürümlerine sabitlendi; write yetkisi ve otomatik deploy YOK.
- Vite geliştirme sunucusundan gereksiz allowedHosts istisnası çıkarıldı.
- Sıfır ziyaretçi bağımlılığı: ne JS ne CSS ne görsel eklendi; marka, servis metinleri, sayfa hiyerarşisi ve WhatsApp akışı korundu.
- Hassas dosya/404/host başlıkları ve tedarik zinciri için ilave bağımsız kaynak testleri.
- Hosting kural kitabı: HTTPS/HSTS/WAF/DDoS/bot/alan adı/2FA/cache/SEO test kapısı. **Panelde aktifleştirildiği iddia edilmez.**
- Node/npm registry ve site alan adında DNS erişimi kısıtı nedeniyle npm ci, üretim derlemesi, audit ve canlı hosting testleri açık.


## v2.7 — sade altbilgi, SEO ve görsel optimizasyon (24.10.2026)
- Büyük alt bağlantı sütunları kaldırıldı; marka, telif ve gizlilik bağlantısı korundu.
- Masaüstü/mobil üst menü kaldırıldı; mobilde gereksiz header CTA gizlendi, WhatsApp sabit iletişim alanı korundu.
- İki ürün mobilde alt alta; masaüstü kaydırıcı ve klavye denetimleri korundu.
- Dekoratif emoji benzeri yeşil simgeler kaldırıldı, gerçek WhatsApp SVG eklendi.
- SEO: site adı, canonical, robots, sosyal paylaşım başlıkları ve Organization/WebSite JSON-LD geliştirildi.
- 3 ürün fotoğrafı 1280×960 WebP / sıkıştırılmış; karışık tepsi hero alanında korundu.
- 27/27 kaynak güvenlik ve kalite testi geçti. Astro üretim derlemesi ve çevrimiçi audit: erişim/sürüm engeli nedeniyle henüz DOĞRULANMADI. Canlıya alınmadı.


## v2.8 – Hizmet bölgesi ifadesi (24 Ekim 2026)
- Üst şerit ve tanıtım etiketindeki “İstanbul genelinde” ifadeleri kaldırıldı.
- Hizmet, iletişim, ana sayfa FAQ, SEO başlık/açıklama ve Organization JSON-LD kapsamı şehir kısıtı içermeyecek şekilde güncellendi.
- “Türkiye geneli” gibi doğrulanmamış geniş kapsam vaadi eklenmedi; uygunluk konum ve tarihe göre teyit edilecek.
- Görseller, tema, WhatsApp bağlantısı, hizmet sayfaları, güvenlik başlıkları ve altyapı korunmuştur.
- Güncelleme yalnızca yayın adayıdır; canlıya yükleme yapılmadı.

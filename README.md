# İzmir Lokmacısı / Hanifi Usta

Astro 7 tabanlı, yalnızca statik HTML/CSS/JS üreten, WhatsApp yönlendirmeli kurumsal site. Sürüm **2.9.0 — GitHub Pages yayın adayı**. GitHub üzerinden üretim yayını henüz doğrulanmamıştır.

## Başlangıç

Gereken Node: **22.23.4 veya üzeri**. Depo kökünde:

```bash
npm ci
npm run test:source
npm run test:build
npm run audit:deps
npm run dev
```

`npm run test:source` **npm paketleri kurulmadan** kaynak ve etkileşim testlerini çalıştırabilir. `npm run test:build` Astro ile gerçek üretim derlemesini, rota/başlık/görsel testlerini ve byte bütçesini kontrol eder. `npm run audit:deps` internete bağlı npm güvenlik veri tabanı gerektirir. İnternetsiz `npm audit --offline` temiz sonuç olarak kabul EDİLMEZ.

## Yapı

- `src/` - aktif Astro sayfaları, veri, layout ve CSS.
- `public/images/` - lisansı belgelenmiş iki lokma fotoğrafı, bir amblem, bir OG görseli.
- `public/js/site.js` - navigasyon, görünürlük animasyonu ve iki kartlık galerinin tek dış JS dosyası; Swiper kullanılmaz.
- `public/_headers` - Cloudflare Pages için güvenlik başlıklarıdır; **GitHub Pages bu dosyayı uygulamaz.**
- `.github/workflows/quality.yml` - Bağımsız kalite denetimi. `.github/workflows/github-pages.yml` - test ve denetim başarılı olursa GitHub Pages dağıtımı.
- `.github/dependabot.yml` - yalnız öneri/PR oluşturur, otomatik birleştirme yapmaz.
- `scripts/verify-live.mjs` - yayın sonrası HTTPS ve gerçek HTTP response header kontrolleri.
- `reports/HOSTING-ARMOR-PLAYBOOK.md` - güvenlik tedbirleri, dış panel gereksinimleri ve yayın engelleri.

## Yayın kapısı

1. Çalışma ortamında `npm ci && npm test && npm run audit:deps` sıfır hata ile bitmeli.
2. Oluşan `dist/` içeriği mevcut alan adının **deneme ortamında** kontrol edilmeli, desktop/mobil menü, kaydırma galerisi, bütün iletişim bağlantıları ve Türkçe metinler gerçek tarayıcıda denenmeli.
3. HTTPS üzerinden `npm run verify:live -- https://<alan-adı>` ile gerçek HTTP başlıkları doğrulanmalı. `_headers` dosyasının varlığı, barındırmada uygulanması anlamına gelmez.
4. Lighthouse ve erişilebilirlik incelemesi gerçek alan adında yapılmalı. Performans, SEO veya erişilebilirlik için uydurma skor sunulmaz.
5. Sadece kontroller geçerse ve önceki sürüme dönüş planı hazırsa canlı yayına geçilmeli.

Mevcut iletişim numarası, e-posta ve hizmet bölgeleri işletme sahibince doğrulanmalıdır. Harici kaynak fotoğrafları işletmenin kendi çekimi olarak gösterilmez.

## Güncel 2.4 denetimi
`reports/HOSTING-ARMOR-PLAYBOOK.md` ve `reports/security-status-v2.4.json` doğrulanan kaynak kontrollerini ve henüz açılmamış yayın kapılarını listeler. Node >=22.23.4 gereklidir; otomatik yayın yoktur.

## V2.4 güvenlik katmanları
- Sayfa ve kod ayırımı: tam statik Astro, veritabanı/form/oturum yok; bağımlılık tek Astro. Yeni backend, ekran animasyonu veya görsel tasarım değişikliği yapılmadı.
- Tarayıcı izolasyonu: sıkı CSP, frame-ancestors none, nosniff, sınırlı Permissions Policy. `/_astro/*` ve `/js/*` CORP, fakat açık ürün görsellerinde CORP yok (paylaşım önizlemelerini engellememek için).
- 404: gerçek `404.html`; bilinmeyen URL'ler ve hassas dosya yolları yayında 403/404/410 dönmeli.
- CI: resmî actions/checkout ve setup-node belirli GitHub commit SHA'larına sabitlendi; içerik izni read-only, otomatik dağıtım yok.
- Yayın sonrası `npm run verify:live -- https://izmirlokmasi.com` ile HTTP yanıtları doğrulanır. Gereksiz saldırı trafiği üreten sızma/DoS testleri yapılmaz.
- DNS / SSL / WAF / bot / HSTS ayarları panel tarafındadır: `reports/HOSTING-ARMOR-PLAYBOOK.md` talimatlarına bakın. Bunlar kaynak kod yüklemekle aktif olmaz.
- HSTS, özellikle `includeSubDomains` ve preload, HTTPS kanıtı ve alt alan adı envanteri olmadan açılmaz.


## v2.7 tasarım ve SEO düzeltmeleri (aday)
- Mobil/masaüstü başlıktaki gereksiz menü ve alttaki bağlantı sütunları kaldırıldı; küçük marka/telif/gizlilik altbilgisi kaldı. Hizmet sayfaları ve sitemap silinmedi.
- WhatsApp gerçek SVG simgesi aynı alan adından yüklenir; yeşil dekoratif işaretler kaldırıldı. Mobilde iki lokma ayrı kartlarda aşağı doğru görünür.
- Meta title, description, canonical, OG, Twitter, Organization/WebSite JSON-LD ve sitemap geliştirildi. İşletmenin doğrulanmamış fiziksel adresi, çalışma saati veya müşteri yorumu eklenmedi.
- Karışık tepsi ve iki lokma görseli optimizasyonlu WebP olarak paketlendi.
- Canlı yayın ve Search Console işlemleri ayrı yetkilendirme, üretim derlemesi ve gerçek HTTPS doğrulaması gerektirir.


## GitHub Pages geçişi (16.11.2026)

Yayın işlemleri için `GITHUB-PAGES-YAYIN.md` dosyasını okuyun. Ana alan adı `izmirlokmasi.com` olarak tutuldu. `astro.config.mjs` içindeki `site` bu alan adıdır; depo adına göre `base` eklenmez. GitHub Pages'te özel alan adı depo ayarlarında yapılandırılır; Actions yayını için `CNAME` dosyasına güvenilmez.

**Güvenlik farkı:** Geçmiş Cloudflare `_headers` kurallarını (CSP, COOP, CORP, X-Frame-Options, Cache-Control vb.) GitHub Pages otomatik uygulamaz. Üretimde eşdeğer yanıt başlıkları gerekiyorsa Cloudflare üzerinden vekil katman/Transform Rules gibi ayrı çözüm ve HTTP doğrulaması gerekir. Bu fark kapatılmadan eski korumanın aynen taşındığı söylenemez.

## v2.9 (16.11.2026)

Gorunur tasarim degismeden GitHub Pages CSP meta korunmasi ve haftalik canli site kontrolu, CodeQL ve GitHub Pages CNAME eklendi. Bu is akis repo kurulduktan sonra calisir, kendiliginden GitHub deposu acmaz. Gizlilik, yorum ve spam durumu icin `reports/RELEASE-STATUS-v2.9.md` bakiniz.


## GitHub bakım ve kod ajanları

GitHub Pages yayını için `GITHUB-PAGES-YAYIN.md`, otomasyon seçimi için `GITHUB-AUTOMASYON.md`, kod ajanları için `AGENTS.md` ve son denetim durumu için `reports/RELEASE-STATUS-v2.10.md` dosyalarını okuyun. Depoya yükleme veya site yayını yalnızca bu belgelere bakılarak tamamlanmış sayılmaz.

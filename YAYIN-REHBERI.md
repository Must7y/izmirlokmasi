# HANİFİ USTA - Güvenli yayın ve geri dönüş rehberi

**24 Ekim 2026 | v2.7 aday | otomatik yayında değil**

Bu site Astro ile statik HTML üretir; ayrıca Next.js/React çalışma sunucusu, müşteri veri tabanı veya ödeme sistemi kurulmaz. Ana sayfa `src/pages/index.astro`, işletme bilgileri `src/data/site.ts`, marka/SEO `src/layouts/Layout.astro`, CSS `src/styles/site.css`, ürün galerisi `src/components/LokmaSlider.astro`, galeri JS `public/js/site.js`.

## 1. Önceki sürümü koruyun

Drive'daki `izmirlokmasi-2026-10-24.zip` ve 2.1 tasarım adayını silmeyin. Yeni aday üzerinde düzeltmeleri izole edin. DNS/e-posta ayarlarına dokunmayın.

## 2. Uygun ortamda doğrulayın

Node.js 22.23.4 veya üstü; internete erişen bilgisayar ya da GitHub Actions:

```bash
npm ci
npm run test:source
npm run test:build
npm run audit:deps
```

**Dört komuttan herhangi biri başarısızsa YAYIN DURUR.** `npm audit --offline` sıfır uyarı verse bile çevrimiçi güvenlik taraması yerine geçmez. GitHub'a yüklenen `.github/workflows/quality.yml` dosyası bu kapıları kendiliğinden çalıştırabilir; ancak repo içine commit/push yapılmadıkça etkin değildir. Dependabot dosyası yalnız güncelleme PR'ı teklif eder, otomatik birleştirme yapmaz.

## 3. Tasarımı ve içeriği gerçek tarayıcıda karşılaştırın

Telefon: 360, 390; tablet 768; dizüstü 1024; masaüstü 1440 px. Ana sayfa, 4 hizmet sayfası, iletişim, gizlilik, lokma kaydırma okları/klavye, mobil menü, WhatsApp, telefon ve e-posta bağlantıları. Konsolda CSP engellemesi olmamalı; sayfa yatay taşmamalı. Fotoğraflar gerçek işletme çekimi olmadığı için öyle gösterilmemeli.

## 4. Yayınlayın, sonra başlıkları ve hızı doğrulayın

Cloudflare Pages: build `npm run build`, çıktı `dist/`. `_headers` yalnız desteklenen statik yayın ortamlarında HTTP'ye uygulanır; bu dosyayı kopyalamak tek başına güvenlik kanıtı değildir. Alan adı HTTPS doğrulanınca `npm run verify:live -- https://izmirlokmasi.com` komutunu çalıştırın. Gerçek HTTP başlığı, sertifika, yönlendirmeler, robots/sitemap ve Google Search Console ardından denetlenir. Lighthouse mobil/masaüstü ayrı ölçülür.

İşletmenin alan adı sürekliliği, WAF/bot koruması/DDoS, TLS zorlaması, güvenlik olay kayıtları, DNS ve yedekler hosting panelinden doğrulanır; bunlar repoda kodla aktif edilemez. HSTS ancak HTTPS ve alt alan adları doğrulanınca kontrollü devreye alınmalıdır.

## 5. Sorun olursa geri dönüş

Mevcut `dist/` dağıtımı değiştirilmeyecek şekilde önceki sürüme dönebilmelidir. Yeni sürüm yayındayken tasarım, CSP ya da bağlantı sorunu varsa önceki stabil dağıtıma geri alın. Hata raporunu sakla, sonra tek değişiklik halinde düzeltip aynı dört kapıdan tekrar geçir.


## 24.10.2026 v2.7 SEO / tasarım notu
Büyük altbilgi bağlantı listeleri kaldırıldı, fakat hizmet sayfaları SEO için korundu. İndekslenebilir sayfalar `robots.txt` ve `sitemap.xml` yoluyla gösterilir. Organization ve WebSite şema verisi, canonical, Open Graph ve Twitter meta etiketleri mevcut. LocalBusiness verisi için doğrulanmış işletme adresi olmadığı için uydurma adres konmadı.
Geliştirme paketini aktarmak tek başına canlı yayın değildir. Cloudflare Pages/Sites projesine erişim ve production CI kimliği doğrulanmalıdır. Önce `npm ci`, `npm run test:source`, `npm run test:build`, `npm run audit:deps` hepsi başarılı olmadan canlıya ALMAYIN. HTTPS, CSP, Search Console ve Lighthouse üretimden sonra kontrol edilmelidir.

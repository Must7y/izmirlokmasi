# İzmir Lokmacısı Hanifi Usta

Astro ile statik HTML/CSS üreten, telefon ve WhatsApp üzerinden iletişim sağlayan site. Alan adı: https://izmirlokmasi.com. Kaynak: https://github.com/Must7y/izmirlokmasi.

## Teknik bakım

[Bakım kılavuzu](operations/README.md). İşletmeye özel raporlar özel proje arşivinde tutulur. Canlı sürüm Pages çalışması ve `/build-info.json` üzerinden doğrulanır.

## Yerel çalışma

Node **22.23.4 veya üzeri** gerekir. Bağımlılık ve Astro sürümü package-lock.json ile sabittir.

```bash
npm ci
npm test
npm run audit:full
npm run dev
```

`npm test`, kaynak/etkileşim testlerini, gerçek üretim derlemesini, çıktı ve sayfa SEO kontrollerini, dosya bütçesini çalıştırır. Bağımlılık denetimi güncel npm güvenlik veritabanına erişmelidir; çevrimdışı sonuç temiz güvenlik taraması sayılmaz.

## Mimari ve sınırlar

İki lokma çeşidi, dört hizmet sayfası, iletişim ve gizlilik sayfası vardır. Bordo-krem tasarım ve mevcut temsili ürün görselleri korunur. Form, üyelik, ödeme ve veri tabanı yoktur. GA4 ziyaretçinin açık izniyle yüklenir; varsayılan kapalıdır, reklam sinyalleri kapalıdır. Galeri tek küçük yerel betikle çalışır; harici slider paketi kullanılmaz.

- `src/data/site.ts`: hizmet metinleri ve ayrı sayfa açıklamaları.
- `src/layouts/Layout.astro`: metadata, canonical, Organization/WebSite/WebPage/Service/BreadcrumbList.
- `src/styles/site.css`: tasarım.
- `public/images/`: logo ve temsili ürün görselleri; kaynak/lisans bilgileri [bildirim dosyasında](THIRD-PARTY-NOTICES.md).
- `scripts/audit-site.mjs`: sayfa bazlı SEO ve yerel bağlantı denetimi.
- `scripts/verify-live.mjs`: canlı HTTPS, indeksleme işaretleri, sitemap ve isteğe bağlı sürüm doğrulaması.

## Yayın ve güvenlik

[Yayın kılavuzu](GITHUB-PAGES-YAYIN.md) mevcut GitHub Pages düzenini açıklar. Ana dala gönderilen kaynak test/derleme/audit kapısından geçerek yayınlanır; son adım canlıdaki commit'i de denetler. Dependabot önerileri otomatik birleştirilmez. Haftalık kalite/canlı kontrol ve CodeQL görevleri [otomasyon kılavuzunda](GITHUB-AUTOMASYON.md).

`public/_headers` Cloudflare biçimindedir; **GitHub Pages bu dosyayı uygulamaz**. Sayfalarda meta CSP vardır; HTTP seviyesindeki CSP, frame-ancestors, HSTS veya WAF'ın etkinliği bu dosyadan çıkarılamaz. DNS ve barındırma ayarları kaynak güncellemesinin parçası olarak rastgele değiştirilmez.

## Yedek ve geri dönüş

Drive yedeği düzenlenebilir kaynak, tam `dist/` çıktısı, yayın raporu ve dosya bütünlüğü manifestini içerir. Eski arşivler korunur. Kaynak yedeğinden dönmek için `source/` içeriği ayrı bir çalışma dizinine açılır; `npm ci`, test ve audit sonrasında mevcut Pages iş akışıyla yayınlanır. Git geçmişi varsa önceki doğrulanmış sürüme dönüş `git revert` ile yapılır; ana dal zorla geriye yazılmaz. SHA-256 manifestleri her yedek oluşturulurken üretilir; kaynak değiştikçe eskimiş bir manifest depoda güncel kanıt olarak tutulmaz.

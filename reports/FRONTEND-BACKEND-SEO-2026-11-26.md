# Frontend, yayın altyapısı ve SEO — 26 Kasım 2026

## Kapsam ve karar
İncelenen kaynak: b19d55777d99ef8720275c9eec670063424bf427. Ana sayfa → ürün → iletişim akışı canlı Chrome ekran görüntülerinden incelendi. Görsel düzen, bordo-krem renkler, lokma görselleri ve mevcut altı indekslenebilir URL korunur. Site statik Astro/GitHub Pages uygulamasıdır; uygulama sunucusu, oturum, veritabanı, ödeme veya form backend’i yoktur. Kullanıcının istemediği bu servisler eklenmedi.

## Düzeltilenler
- Yazı tipinde kare görünen yön okları yerel Lucide varlığıyla değişti; ek CDN veya npm paketi yok. İkonlar dekoratif, metin etiketleri korunuyor; lisans kaydı THIRD-PARTY-NOTICES içinde.
- Footer’a doğrudan İletişim bağlantısı eklendi. Telefon numarası ve e-posta iletişim ekranında görünür ve kopyalanabilir.
- Sabit WhatsApp düğmesi footer görünürken gizlenir; footer bağlantıları ve istatistik tercihinin üstüne binmez. JavaScript kapalıyken bağlantı ve içerik kalır.
- Mobil dokunma hedefleri, güvenli ekran alt boşluğu, uzun e-posta satırı ve yazdırmada içerik görünürlüğü düzenlendi.
- Referrer-Policy tarayıcı meta politikası eklendi. Bu, HTTP güvenlik başlığının yerine geçmiş sayılmıyor.
- Başka sekmede site depolaması tamamen temizlendiğinde de analitik izni kapanır. Analitik çerezleri için Secure ve SameSite=Lax bayrakları açıkça ayarlanır.
- Canlı denetime analytics.js, yön ikonu ve JavaScript MIME kontrolü eklendi. Gerçek HTTP güvenlik başlıkları ayrı ölçülür; hazırlık dosyasının varlığı başarı sayılmaz.

## SEO içerik kapsamı
operations/keyword-map.json: 46 ifade, altı niyet/sayfa kümesi. Bunlar arama hacmi veya sıralama sayıları değildir; kullanıcı örnekleri, arama sonuçlarında görülen dil ve editoryal niyet eşlemesidir. İkili SERP örtüşme matrisi veya ücretli anahtar kelime aracı verisi ölçülmedi.

| Hedef | Örnek sorgular | Uygulama |
|---|---|---|
| / | lokma siparişi, İstanbul lokma siparişi, lokma döktürme, yerinde lokma dökümü | Başlık/açıklama, giriş, CTA, görünür sipariş SSS |
| /izmir-lokmasi/ | İzmir lokması, İstanbul’da İzmir lokması, halka lokma siparişi, lokma döktürme fiyatı | Özgün sipariş açıklaması, fiyat/teyit soruları |
| /hayir-lokmasi/ | hayır lokması döktürme, İstanbul’da hayır lokması, hayır lokması siparişi, lokma hayrı | Dağıtım planı, hazırlık, uygunluk ve teklif soruları |
| /mevlit-lokmasi/ | mevlit/mevlüt lokması, mevlit için lokma, mevlit lokması siparişi | Program bitişi, misafir sayısı, servis planı |
| /saray-lokmasi/ | saray lokması siparişi, yuvarlak lokma, İstanbul saray lokması | Ürün seçimi, sipariş ve fiyat bilgisi |
| /iletisim/ | lokma siparişi telefon, WhatsApp sipariş, lokma döktürme fiyatı | Görünür telefon/e-posta, ilgili sayfalardan doğrudan bağlantı |

Site haritasına gerçek içerik değişiklik tarihi 2026-11-26 olarak lastmod eklendi; otomatik derleme tarihi kullanılmaz. İfadelerin çekimleri doğal Türkçe içinde kullanıldı; 46 ifadenin tümünü sayfalara yapıştıran liste, meta keywords veya gizli metin yok. İlçe bazlı kopya sayfa, ana sayfaya yönlenen geçiş sayfası ve sahte fiyat/puan/yetkinlik/kapasite eklenmedi. İstanbul ve çevre iller kapsamı korunuyor; yalnız İstanbul’a daraltılmadı. FAQPage eklenerek zengin sonuç garantisi verilmedi.

## Depolardan yararlanma
Kullanıcının paylaştığı dört repo operations/sources.json içindeki sabit commitlerde yeniden incelendi. claude-seo: içerik niyeti/kümeler, farklı title-description, teknik SEO ve indekslenebilirlik; claude-ads: iletişim tıklamasının satış sayılmaması; pya: gerçek altyapı/CI kontrolü ve koddan ayrı canlı kanıt; claude-obsidian: devam kaydı ve kaynak/sonuç ayrımı. Bunların tamamı sunucuya kurulmuş ajanlar değildir. Tüm internet SEO araçlarının tarandığı veya her yöntemin uygulandığı iddia edilmez; mevcut arama/Node/Chromium/CI kontrolleri kullanılır.

## Kullanıcının ekran görüntülerindeki HTTP başlıkları
Canlı HTTP → HTTPS ve www → ana domain yönlendirmeleri başarılı; HTTPS yanıtları 200. Bu istemcinin gözleminde HTTP CSP, HSTS, X-Frame-Options, nosniff ve Referrer-Policy başlıkları yok. HTML meta CSP mevcut olduğundan bir aracın CSP’yi geçti sayıp diğerinin HTTP başlığını eksik sayması mümkün. frame-ancestors, HSTS ve nosniff meta ile çözülemez.

GitHub Pages public/_headers dosyasını uygulamıyor. DNS sorgusunda us.dnsenable.com, tr.dnsenable.com, eu.dnsenable.com görülüyor; Cloudflare üzerinden başlık kuralı yayımlandığı kanıtlanmadı. Alan adı/CDN yönetim bağlantısı yok; DNS veya hosting taşıması yapılmadı.

operations/http-response-headers.json çalışır başlık değerlerini ve HSTS geçiş planını içerir, canlı uygulanmış değildir. Başlık düzenleyebilen CDN/proxy veya hosting gerekir; varsa mevcut edge’de uygulanır. İlk kısa HSTS kontrolünden sonra yalnız doğrulanan hostname için altı aylık max-age; includeSubDomains/preload ayrı doğrulama olmadan kullanılmaz. `npm run verify:live -- https://izmirlokmasi.com --require-security-headers` bu başlıklar gelmedikçe başarısız olur; eksikliği gizlemez. Üretim yayını normal modda uyarı bırakır.

## Kanıt sınırları
Gerçek Googlebot yeniden taraması, sıralama artışı ve GA4 veri teslimi bu kod/arayüz testlerinden türetilmez. Gerçek WhatsApp görüşmesi/telefon araması test için başlatılmaz. Google hesap kontrollerinin önceki tamamlanan/bekleyen sonuçları Drive raporunda bulunur.

## Birincil kaynaklar
- https://developers.google.com/search/docs/essentials/spam-policies (gizli metin, doorway abuse, sneaky redirects)
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
- https://developers.cloudflare.com/rules/transform/response-header-modification/create-dashboard/

## Yerel doğrulama sonucu
- npm ci; 46 kaynak + 15 üretim testi başarılı. npm audit:full sıfır bulgu. SEO denetimi 8 sayfa, sıfır hata.
- Chromium 320, 390, 768, 1440 genişliklerinde ana, İzmir lokması, hayır lokması, iletişim ve gizlilik sayfaları: 20 görünümde yatay taşma yok; tek H1; maskeli ok varlığı mevcut; footer görünürken sabit WhatsApp gizli.
- Masaüstünde ana → ürün → iletişim akışı ayrıca canlı Chrome ekranlarından incelendi. Mobil testler yerel üretim derlemesi üzerinde; gerçek telefon/VoiceOver testi yapılmadı. Tam WCAG uyumluluğu iddia edilmez.

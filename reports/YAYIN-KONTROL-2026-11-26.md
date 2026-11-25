# Birleştirilmiş güncelleme ve yayın kontrolü — 26 Kasım 2026

Bu kayıt önceki konuşmalardaki proje kararları, Drive geliştirme kuyruğu ve 26 Kasım SEO/güvenlik çalışmalarını birleştirir. Site yalnız İzmir Lokmacısı Hanifi Usta ve lokma hizmetlerine ayrılmıştır. QR menü ve diğer projelerin kodları bu depoya taşınmaz.

## Korunan kararlar

Bordo-krem görünüm, sade üst/alt alanlar, Hanifi Usta logosu, iki lokma çeşidi, temsili ürün görselleri ve WhatsApp/telefon/e-posta iletişimi korunur. Yeni tema, panel, form, kullanıcı hesabı, veri tabanı, izleyici veya reklam bütçesi eklenmez. Hizmet metinleri mevcut İstanbul ve çevre iller bilgisini kullanır; konuma ve tarihe göre uygunluk teyidi sürer. Doğrulanmamış ülke geneli hizmet, adres, çalışma saati, fiyat, müşteri yorumu ve puan yazılmaz.

## Tamamlanan kod işleri

- Kaynak testindeki cümle eşleşmesi nedeniyle duran yayın kapısı düzeltildi; testin coğrafi vaat koruması korunuyor.
- Canonical, sitemap, iç bağlantılar ve Astro adres biçimi eşleştirildi.
- Ana sayfanın başlık ve açıklaması, dört ayrı hizmet sayfasının metadata, planlama ve soru-cevapları geliştirildi.
- Organization, WebSite, WebPage/ContactPage, Service ve BreadcrumbList bağlantıları işlendi.
- Ana ve hizmet görsellerinde responsive WebP üretimi, görsel sitemap ve açıklayıcı bağlantı metinleri eklendi.
- Sekiz sayfalık çıktı denetimi, olumsuz örnekler, haftalık bakım, rapor saklama ve dağıtım sonrası temiz commit doğrulaması eklendi.
- Hareketli Pages/CodeQL action referansları resmi depolardan çözülen commitlere sabitlendi; otomatik PR birleştirme açılmadı.
- Eski yayın adayı beyanları taşıyan README ve yayın/bakım kılavuzları güncellendi. Eskimiş kök MANIFEST.sha256 kaldırıldı; yeni yedek kendi manifestini oluşturur. Eski tarihli raporlar tarihçe olarak korunur.
- Git geçmişi olmadan açılan kaynak arşivi yerelde derlenebilir; sürümü `unknown` olarak açıkça işaretler. Bu çıktı, dağıtım sonrası gerçek commit eşleşmesi kontrolünden geçemez.

## Eski kuyruk değerlendirmesi

Astro'nun kendi Image bileşeni kullanıldı; ikinci görsel servisi kurulmadı. Mevcut tasarım korunacağı için AstroWind/AstroPie temaları yeniden aktarılmadı. Galeriye ikinci bir slider paketi, ikon kütüphanesi, Gradio, ikinci SEO eklentisi, ESLint veya schema-dts sırf kuyrukta yazdığı için eklenmedi. Tarayıcı, axe ve Lighthouse yalnız bakım ortamında çalıştırılır; ziyaretçiye giden bağımlılık değildir. Yeni test sonucu kendi çalıştırma kaydıyla raporlanır.

## Yayın durumu ve teslim

Kullanıcının son talebi, önceki ve mevcut güncellemelerin uygulanmasını ve son sitenin Drive'a yedeklenmesini kapsar. Bu kayıt önce yayın kapısının parçası olarak hazırlanır. Kesin yayın commit'i, CI/Pages sonucu, canlı doğrulama ve yedek bütünlüğü teslim arşivindeki son yayın raporuna yazılır. Bu belge veya eski yerel raporlar kendi başına canlı yayın başarısı sayılmaz.

## Hesap verisi gerektiren işler

Search Console'un güncel sorgu/konum ve URL Denetimi verileri ile Google Business Profile erişimi kod deposundan üretilemez. Reklam hesabı verisi, bütçe ve dönüşüm tanımı olmadan reklam açılmaz. Kodun taramaya açık olması, indekslenme veya sıralama garantisi değildir. Başlık/sitemap değişimleri yayımlandıktan sonra gerçek sorgu gösterimleriyle izlenmelidir.

Ayrıntılar: [bakım kılavuzu](../operations/README.md), [Google görünürlüğü raporu](SEO-GORUNURLUK-2026-11-26.md), [ilk uygulama raporu](SEO-SECURITY-2026-11-26.md).

## PR güvenlik değerlendirmesi

PR #7'nin ilk CodeQL değerlendirmesi üç yüksek öncelikli bildirim üretti. Konumlar denetim betiklerindeydi: `seo-checks.mjs` içindeki etiket silme düzenli ifadesi ve WhatsApp adresi alt metin kontrolü; `verify-live.mjs` içindeki sitemap adresi düzenli ifadesi. Bu kontrollerin rapor/karşılaştırma çıktısı ürettiği, ziyaretçi girdisini canlı sayfaya HTML olarak basan bir akış olmadığı statik olarak incelendi. Depoda ayrı SECURITY.md bulunmadı; değerlendirme statik mimari ve gerçek çağrı yollarıyla sınırlandı.

Başlık metni artık HTML temizleyici gibi işlenmiyor; yalnız boşluk normalizasyonu yapılıyor. WhatsApp bağlantıları URL nesnesiyle tam origin/path ve kullanıcı bilgisi yokluğu üzerinden doğrulanıyor. Robots sitemap bildirimi satır satır ayrılıp tam üretim URL'siyle eşleştiriliyor. Doğru adresin bir saldırgan adresinin içine gömüldüğü durumlar için iki olumsuz regresyon testi eklendi. Uyarı bastırma, alarm kapatma veya güvenlik sorgusu kaldırma uygulanmadı. Sonuç için yeni CI/CodeQL değerlendirmesi esas alınır.

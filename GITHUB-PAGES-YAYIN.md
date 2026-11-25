# GitHub Pages yayın ve geri dönüş

Mevcut depo `Must7y/izmirlokmasi`, hedef `https://izmirlokmasi.com`. Bu kaynak mevcut kurulumu kullanır; yeni depo, alan adı veya DNS kurulumu gerekmez.

## Yayın sırası

1. Son `main` değişikliklerini al; ayrı dalda düzenlemeleri ve kapsamını incele.
2. `npm ci`, `npm test`, `npm run audit:full` çalıştır.
3. Mobil/tablet/masaüstünde sayfaları, Türkçe başlıkları, resimleri, FAQ ve galeri etkileşimini, WhatsApp/telefon/e-posta adreslerini kontrol et. Bağlantıyı doğrulamak için gerçek mesaj veya arama gönderme.
4. PR kontrollerini incele; başarısız testi atlama veya korumayı kaldırma.
5. Yetkilendirilmiş PR'ı birleştir. `github-pages` işinin derleme, dağıtım ve `verify-production` adımlarının sonucunu kontrol et.
6. `npm run verify:live -- https://izmirlokmasi.com --expected-revision <yayınlanan-tam-commit>` çalıştır. Sürüm doğrulaması temiz kaynak commit'i ile eşleşmelidir. CDN eski içerik sunarsa yeni kaynak göndermeden önce dağıtımı ve önbellek yayılımını kontrol et.
7. HTTP/www yönlendirmesi, geçerli HTTPS, altı indekslenebilir URL ve gerçek 404 davranışını kontrol et.
8. Son kaynak ve derlenmiş dosyaları, rapor ve bütünlük manifestiyle Drive'daki İzmir Lokmacısı klasörüne yeni arşiv olarak kaydet. Eski yedeğin üzerine yazma.

## Arama motoru kontrolü

Canonical ve sitemap aynı HTTPS adreslerini ve sondaki `/` biçimini kullanır. Gizlilik ve 404 sayfaları noindex'tir. Robots taramaya açıktır. Bu ayarlar Google'ın sayfayı dizine aldığını veya sıralamada yükselttiğini kanıtlamaz; URL Denetimi ve Performans raporları ayrı kontrol edilir. Ayrıntılar güncel SEO raporundadır.

## Güvenlik

Gerektiğinde Pages ayarları depoda `Settings > Pages` üzerinden doğrulanır. CNAME ve kaynak dosyaları tek başına DNS/SSL kurulumu değildir. Mevcut MX/TXT kayıtlarını silme. `public/_headers` GitHub Pages'te uygulanmaz; `--cloudflare-headers` modu yalnız o başlıkların gerçekten etkin olduğu ortamda kullanılmalıdır.

## Geri dönüş

Başarılı önceki yayın commit'i ve arşiv, yayın raporunda kayıtlı tutulur. Hatalı değişiklik için geri alma PR'ı aç ve aynı kontrollerden geçir. `git push --force`, koruma kaldırma veya doğrulanmamış eski yedeği doğrudan yayınlama. Drive arşivindeki `source/` düzenlenebilir kaynaktır; `dist/` ise o commit'in üretilmiş statik çıktısıdır.

# İzmir Lokma · Zırh planı ve canlı yayın kapısı (24 Ekim 2026)

Bu dosya bir saldırı bağışıklığı garantisi DEĞİLDİR. v2.4 kaynak korumalarını ve hosting panelinde yapılması gereken kontrolleri ayrı tutar.

## Risk odaklı gerçek tablo

| Tehdit | Kaynakta karşılık | Dış ortamda eksik kanıt |
|---|---|---|
| XSS / kötü niyetli betik | Sıkı CSP, satır içi JS/CSS yasak, form/backend yok | Canlı CSP başlığının gönderildiği ve konsolun temiz olduğu doğrulanmadı |
| Clickjacking | frame-ancestors 'none', X-Frame-Options DENY | Canlı HTTP yanıtı bilinmiyor |
| Hassas dosya sızıntısı | Public ayıklama, testler; özel 404 sayfası eklendi | Gerçek 404/403 yanıtları ve hosting kaynak erişim kuralları sınanmadı |
| DDoS / L7 bot / tarama | Statik, küçük dosyalar, CDN'ye uygun | Cloudflare zone ve DDoS/WAF ayarları bilinmiyor |
| Tedarik zinciri / paket açığı | Astro kilitli, salt okunur CI, action SHA pin | npm audit çevrimiçi sonucu ve GitHub repo bağlantısı yok |
| Domain/hesap ele geçirme | Kod içinde sır/credential yok | Alan adı, hosting ve GitHub MFA / yetki / kurtarma ayarları doğrulanmadı |
| SSL düşürme / yanlış DNS | CSP upgrade-insecure-requests | HSTS ve DNSSEC **kasıtlı olarak aktif edilmedi**, TLS/redirect doğrulanmalı |
| Görsel paylaşımı bozulması | Kamuya açık /images CORP'den muaf | OG görüntülerinin gerçek sosyal platformlarda açılması kontrol edilmeli |
| Arama motoru yanlış engellenmesi | Üretim noindex değil, staging pages.dev noindex | Gerçek canonical/robots/sitemap ve indeksleme kontrol edilmeli |

## Cloudflare kullanılıyorsa yönetim paneli sırası

1. Mevcut barındırmayı doğrula. Cloudflare Pages kullanılıyorsa `_headers`/`404.html` varlıklarının `dist/` içine kopyalandığını ve **gerçek HTTP cevabında** uygulandığını kontrol et. Farklı sağlayıcıda `_headers` dosyası kendiliğinden çalışmayabilir.
2. Account: phishing-resistant MFA (passkey/security key), en az yetki, gereksiz üyeleri kaldır, güvenli kurtarma e-postası, alan adı yenileme, DNS kayıtları ve sahipliği gözden geçir. API tokenı gerekiyorsa dar yetki ve kapsamla oluştur; sohbete koyma.
3. DNS/TLS: sertifikanın hem apex hem www üzerinde geçerli olduğunu, HTTPS'e yönlendirmeyi, 80->443 davranışını doğrula. MX/SPF/DKIM/DMARC kayıtlarını değiştirme. DNSSEC yalnız registrar + Cloudflare DS zinciri doğru kurulduğunda açılmalı.
4. WAF: zone ve proxy etkinse uygun Cloudflare Managed Ruleset veya Free Managed Ruleset durumunu görüntüle; varsayılan dengeli eylemlerle başla. **Tüm kuralları zorla Block yapma.** Security Events'te yanlış pozitifleri izle.
5. DDoS koruması: zone'da L3/4 ve HTTP DDoS önlemlerinin etkinlik/olay kayıtlarını kontrol et. Kaynak kod veya bu belge bu ayarları otomatik etkinleştirmez.
6. Bot koruması: aşırı bot saldırısı görülmedikçe Bot Fight Mode / Under Attack Mode'u körlemesine açma; Google/Bing botları ve WhatsApp ile gerçek mobil ziyaretçileri engellemediğini kontrol et.
7. Rate limiting: bu site `POST /login`, API ya da sipariş formu sunmuyor. Ana sayfa ve görseller için sert küresel limit koymak hız/SEO zararına olabilir. Kötü amaçlı belli yol veya IP davranışı varsa yalnız hedefli kural + Challenge + gözlem kullan.
8. HSTS: yalnız TLS/HTTPS her alan adında sağlam ve geri dönüş yolu biliniyorsa önce kısa `max-age=300` ile dene; sorun yoksa günler içinde kademeli artır. Tüm subdomainler HTTPS kanıtlı değilse `includeSubDomains` veya `preload` EKLEME.
9. Cache: `_astro` fingerprinted immutable; `/images` 1 gün ve `/js` 1 saat, değiştirilince güncellenebilir. HTML için CDN varsayılan doğrulamasını koru; "Cache Everything" ile eski fiyat/içerik sapması yaratma.
10. Search/UX: mobil menü, iki fotoğraflı galeri, telefon, WhatsApp, robots, sitemap, OG görsel ve 404 kontrol edilir; gerçek iPhone/Android/masaüstünde CSP console ve Lighthouse bakılır.
11. Log ve kurtarma: Security Events inceleme sıklığı, DNS konfig yedeği, orijinal v2.3/v2.2 ZIP ve geri alma prosedürü kaydedilir. GitHub'a alındığında branch protection, zorunlu test, code owner ve otomatik merge kapalı tutulur.

## Güvenli yayın kapısı

- Uygun Node >=22.23.4 ile `npm ci`, `npm test`, `npm run audit:full` geçmeli.
- Gerçek tarayıcı testleri ve test önizlemesinde CSP hatası olmamalı.
- `npm run verify:live -- https://izmirlokmasi.com` başarılı olmalı.
- DNS/TLS/WAF/önizleme/panel seçenekleri ayrıca gözden geçirilmeli.
- Bunlar yerine getirilmediyse aday **yayına çıkmaz** ve güvenli ilan edilemez.

## Uygulama statüsü

v2.4'e kaynak güvenlik kuralları, 404, CI SHA pin ve ek otomatik testler işlendi. Cloudflare, alan adı, GitHub hesabı üzerinde ayar DEĞİŞTİRİLMEDİ; sızma testi ve gerçek performans ölçümü YAPILMADI.

## Resmî bağlantılar

- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/pages/configuration/serving-pages/
- https://developers.cloudflare.com/waf/get-started/
- https://developers.cloudflare.com/bots/get-started/bot-fight-mode/
- https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/
- https://docs.github.com/en/actions/reference/security/secure-use
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Resource-Policy

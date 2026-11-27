# Teknik bakım

Site kaynakları bu depoda tutulur. İşletmeye özel SEO araştırmaları, rakip analizleri, Google hesap gözlemleri, reklam planları ve devam kayıtları özel proje arşivinde tutulur; depoya eklenmez.

## Kontroller

- `npm ci`: kilitli bağımlılık kurulumu.
- `npm test`: kaynak güvenliği, üretim çıktısı, SEO ve bağlantı denetimleri.
- `npm run audit:full`: bağımlılık denetimi.
- `npm run audit:site -- --output outputs/maintenance`: yerel geçici kanıt; git dışında tutulur.
- `npm run verify:live -- https://izmirlokmasi.com --expected-revision <commit>`: yayını ve sürümü doğrular.

Kalite ve canlı kontrol iş akışları pazartesi çalışır. CodeQL ayrı güvenlik incelemesi yapar. Başarısız kontroller yayın engelidir. Denetimler kod değiştirmez, reklam başlatmaz, bütçe harcamaz, mesaj göndermez veya bağımlılık PR'larını otomatik birleştirmez.

Ayrıntılı rapor dosyaları Actions yapıtı olarak yüklenmez. Açık depodaki teknik CI günlükleri ve önceki commitler herkese açık kalabilir; bu düzenleme geçmişi silmez. Gereken yayın yapıtı yalnız dist içeriğini taşır.

`http-response-headers.json` başlıkları düzenlenebilen altyapı için hazırlıktır. Dosyanın varlığı canlı HTTP başlıklarının etkin olduğunu göstermez. GitHub Pages _headers uygulamaz.

## Cloudflare kontrolü ve uygulanacak başlıklar

- `npm run verify:live -- https://izmirlokmasi.com --cloudflare-baseline --check-redirects`: mevcut temel korumaları, arama erişimini ve eski adreslerin kalıcı yönlendirmelerini doğrular. Bu komut CDN ayarı değiştirmez.
- `npm run config:cloudflare`: yalnızca bir Response Header Transform Rule JSON nesnesi üretir; API çağrısı yapmaz. Aynı `ref` ile mevcut kural varsa güncellenir, yoksa mevcut kurallara eklenir. Tüm ruleset'i bu nesneyle değiştirmeyin; mevcut yönlendirmeler ve başka kurallar korunmalıdır.
- Üretilen kuralın fazı `http_response_headers_transform` olmalıdır. Tam CSP ve çerçeveleme koruması yalnızca bu kural Cloudflare'a uygulanınca HTTP düzeyinde etkinleşir. Üretim alan adı ve `www` dışında uygulanmaz. Konum erişimine kısıtlama eklenmez.
- HSTS ilk aşamada `max-age=300`; alt alan adı ve preload içermez. Her iki HTTPS adresi, varlıklar ve yönlendirmeler doğrulanmadan süreyi uzatmayın. `--cloudflare-headers` / `--require-security-headers` hedef sıkı politikayı ve en az altı aylık HSTS'yi ister; beş dakikalık ilk aşama bu kontrolden bilinçli olarak geçmez.
- Cloudflare WAF yalnızca proxied alan adına gelen trafiği korur. Herkese açık GitHub Pages alternatif adresi için kaynak sunucuda Cloudflare dışı erişimi engelleme yetkisi yoktur. robots.txt bir güvenlik sınırı değildir; User-Agent adıyla izin vermek bot kimliğini doğrulamaz.

Kaynaklar: [Cloudflare Response Header Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/create-api/), [Google robots.txt grupları](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec), [Google AI arama ve SEO](https://developers.google.com/search/docs/appearance/ai-features).

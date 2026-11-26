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

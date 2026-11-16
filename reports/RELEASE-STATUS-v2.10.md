# Sürüm 2.10 — otomasyon ve ajan çalışma kuralları

Tarih: 16.11.2026

- Kaynak: Drive'daki v2.9 güncellemesinin mevcut dosyaları, site görünümü ve hizmet metinleri korunmuştur.
- Eklenen: `AGENTS.md`, `GITHUB-AUTOMASYON.md`, bakım politikası ve yeni kaynak testleri.
- CodeQL: JavaScript/TypeScript kaynakları ile GitHub Actions YAML güvenlik analizleri ayrı taranacak biçimde hazırlandı.
- Dependabot uyumu: source testinde Astro'nun sabit 7.4.2 sürümüne zorunlu eşitlik kaldırıldı; lockfile ve proje arasındaki kesin sürüm eşitliği korunuyor.
- Otomatik birleştirme ve kullanıcı verisi toplayan yeni özellik eklenmedi. Site görseli ve iletişim bilgileri korunuyor.
- GitHub Pages üzerinde yayın **yapılmadı**; repo ve DNS üzerinde işlem yok. `npm ci`, Astro build ve canlı tarayıcı/HTTPS testi bu ortamda çalıştırılamadı (Node 22.16.0 < gereken 22.23.4, bağımlılıklar kurulu değil).
- Kod ajanı politikası otomatik kod değiştirme servisi değildir. GitHub Actions kod/bağımlılık kontrolleridir.

## Güncel bağımlılık güvenlik notu

16 Kasım 2026 taramasında Astro'nun 7.4.12 güncel yaması bulundu; 7.4.2'yi etkileyen 2026-11-13 tarihli Astro uyarıları için en az 7.4.7 yükseltmesi önerilir. Kaynak kilit dosyasının güvenilir yenilenmesi bu ortamda mümkün olmadığından sürüm etiketi elle değiştirilmedi. **Yayımdan önce Dependabot PR'ında 7.4.12 güncellemesi, `npm ci`, tüm testler ve `npm run audit:deps` başarıyla tamamlanmalıdır.** `github-pages.yml` audit başarısızsa dağıtımı engeller.

Resmî referanslar: https://github.com/withastro/astro/security/advisories ve https://www.npmjs.com/package/astro

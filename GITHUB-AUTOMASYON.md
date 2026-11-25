# Bakım kontrolleri

Bu görevler yapay zekâ servisleri değil, GitHub Actions kontrolleridir. Kaynak ajan yöntemleri ve veri gerektiren görevler [bakım kayıtlarında](operations/README.md) açıklanır.

| İş akışı | Tetikleme | İşlev |
|---|---|---|
| quality | PR/main, pazartesi 09:41 Türkiye saati, elle | Kaynak testleri, gerçek build, SEO ve tüm bağımlılıkların güvenlik denetimi; SEO raporunu saklar |
| github-pages | main ve elle | Test/audit kapısından sonra Pages dağıtımı ve canlı commit doğrulaması |
| site-health | Pazartesi 09:23 Türkiye saati ve elle | Canlı sayfalar, metadata, sitemap, robots, HTTPS ve hassas dosya/404 kontrolü |
| codeql | PR/main, mevcut çarşamba planı ve elle | JavaScript/TypeScript ve Actions kaynak analizi |
| Dependabot | Haftalık npm, aylık Actions | İncelenecek güncelleme PR'ları; otomatik birleştirme yok |

Planlı işler gecikebilir. Denetimler `contents: read` kullanır. Pages dağıtımı yalnız kendi işinde `pages: write` ve `id-token: write`, CodeQL sonuç yükleme yalnız güvenlik işinde `security-events: write` kullanır. CodeQL sonucu ayrıca incelenir; Pages build işinin bağımlılığı değildir.

SEO Markdown/JSON ve canlı kontrol günlükleri iş çıktısı olarak 30 gün tutulur. Uzun süre korunacak sonuçlar tarihli rapora ve Drive yedeğine alınır. Bu süre kalıcı arşiv garantisi değildir.

İstemciye ek test kütüphanesi gönderilmez. Tarayıcı, erişilebilirlik ve Lighthouse testleri ayrı bakım ortamında yapılabilir; sonuçları gerçek çalıştırma kaydı olmadan başarılı sayılmaz. Yeni ana sürüm, izleyici, form, reklam bütçesi veya otonom kod birleştirme bu düzenin parçası değildir.

Astro 7.4.2 için eski güvenlik görevi tamamlanmıştır; güncel sürümün tek kaynağı package.json ve package-lock.json'dır. Eski duyuru sürümü tekrar kurulacak hedef olarak kullanılmaz. Her yeni güncelleme kendi bağımlılık ve regresyon incelemesinden geçer.

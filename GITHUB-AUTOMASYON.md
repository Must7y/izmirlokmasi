# İzmir Lokmacısı — bakım otomasyonları ve kaynak seçimi

Bu dosya planlanmış GitHub Actions işlerinin ne yapacağını anlatır. **Repo oluşturulmadan iş akışları etkin olmaz.**

| Bileşen / upstream | Projede kullanılan kısmı | Neden |
| --- | --- | --- |
| [Astro](https://github.com/withastro/astro) | Kilitli statik site derlemesi | Ek sunucu/veritabanı gerektirmeden HTML üretir |
| [AstroWind](https://github.com/arthelokyo/astrowind) | Önceki sürümden korunan lisanslı tasarım uyarlaması | Tüm temayı veya Tailwind'i kopyalamak gerekmez |
| [GitHub Actions](https://github.com/actions) | Kaynak testi, derleme, güvenlik denetimi, Pages yayını | Üretim testleri geçmeden dağıtım yok |
| [CodeQL](https://github.com/github/codeql-action) | JS/TS ve Actions YAML güvenlik analizleri | Kod ve yayın hattı sorunlarına karşı tarama |
| [Dependabot](https://docs.github.com/en/code-security/dependabot) | Haftalık npm, aylık Actions güncelleme PR'ları | İnsan onayı olmadan birleştirme yok |
| Site sağlık kontrolü | `scripts/verify-live.mjs`, haftalık read-only kontrol | HTTPS, sayfalar, SEO, kaynak ve 404 kontrolleri |

**Eklenmeyenler (bilinçli karar):** Playwright/axe-core/Lighthouse CI. Gerçek tarayıcı testi için ileride eklenebilirler, ancak bu sürümde npm kilit dosyası güvenilir şekilde yenilenemediğinden kurulu veya çalıştırılmış gibi gösterilmez. Harici yorum/anti-spam servisi de yoktur: sitede spam üretecek kullanıcı girdisi bulunmuyor.

## Ajan kullanım kuralı

`AGENTS.md` güvenli çalışma sınırlarını belirler; otonom bir ajan kurmaz. GitHub Actions bir **otomasyon altyapısıdır**, yapay zekâ ajanı değildir. Codex/Copilot gibi araçlar ayrıca kullanıcı tarafından etkinleştirilmedikçe otomatik kod geliştirme yapmaz.

## Yayın kapısı

1. `Must7y/izmirlokmasi` depoda kaynak dosyaları kökte bulunmalı.
2. `Settings → Pages → Source → GitHub Actions` etkin olmalı.
3. `quality`, `github-pages` ve `CodeQL` iş akışı çıktılarına bakılmalı. *CodeQL sonucu ayrıca incelenir; şu an dağıtımın otomatik engelleyicisi değildir.*
4. Alan adı GitHub Pages'e doğrulanıp DNS güncellenmeli. Önceki DNS mail kayıtları korunmalı.
5. Yayın adresi doğrulanınca haftalık site sağlığı kontrolü çalıştırılmalı.

## Yayın öncesi açık güvenlik işi (16.11.2026)

Mevcut kaynak Astro `7.4.2` ile kilitli. 13 Kasım 2026'da yayımlanan güvenlik duyurularından etkilenen sürümdür. GitHub üzerinde Dependabot ile Astro `7.4.12` için PR açılmalı, lockfile gerçek npm işlemiyle güncellenmeli, CI ve audit geçtikten sonra birleştirilmelidir. Bu adım atlanarak güvenli yayın yapıldığı iddia edilmez.

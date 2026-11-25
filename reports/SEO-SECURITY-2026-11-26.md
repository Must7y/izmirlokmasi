# Hanifi Usta — SEO, güvenlik ve bakım uygulama raporu

Tarih: 26 Kasım 2026, Türkiye saati. Site: https://izmirlokmasi.com. Depo: https://github.com/Must7y/izmirlokmasi. İncelenen başlangıç commit'i: `f855531ea4c175770db17d15fe2dd55f4c319886`.

Çalışma ayrı bakım dalındadır; canlı siteye veya DNS/hesap ayarlarına uygulanmamıştır. Yeni planlı denetimler ana dala birleşince etkinleşir. Bu rapor, hesap erişimi ve saha ölçümü gerektiren işleri tamamlanmış saymaz.

## 1. Dört deponun incelenmesi

README, ajan tanımları, kurulum yaklaşımı, lisans ve ilgili çalışma sözleşmeleri incelendi. Toplam 58 ajan tanımı bulundu. Bunlar bu oturumda 58 bağımsız ajan çalıştırıldığı anlamına gelmez. Sabit commitler ve her ajan dosyasının yolu [kaynak envanterinde](../operations/sources.json), projedeki karşılıkları [görev eşlemesinde](../operations/agents.json).

| Depo | Tanım sayısı | İşlev | Projeye uygulanması |
|---|---:|---|---|
| claude-seo | 20 | Tarama, indeksleme, içerik, yapılandırılmış veri, performans, yerel SEO ve veri bağlantıları | Sayfa SEO denetimi, canonical/sitemap kontrolü, Service/WebPage verisi ve mobil görsel |
| claude-ads | 25 | Platform ve ölçüm denetimi, bütçe, içerik, kaynak doğrulama | Hesap verisi gereksinimleri, hizmet-sayfa eşlemesi ve dönüşüm sözlüğü |
| pya | 10 | Dokuz güvenlik inceleme alanı ve bulgu doğrulayıcı | Kaynak testleri, tüm bağımlılıkların taranması, CI izinleri ve action sabitleme |
| claude-obsidian | 3 | Kaynakları notlara işleme, not sağlığı ve değişiklik doğrulama | Kaynak commitleri, görev durumu ve tarihli raporların bağlantılı tutulması |

Dördü de incelenen sürümde MIT lisanslıdır. Tam depolar, kurulum betikleri veya üçüncü taraf çalışma ortamları siteye eklenmedi. Bu çalışmanın kodu projeye özgüdür; kaynaklardaki görev ayrımları ve kanıta dayalı raporlama yaklaşımı esas alındı. Bu, upstream eklentilerinin kurulup tüm komutlarının çalıştırıldığı iddiası değildir.

### SEO ajanları

| Ajanlar | Görev ve bu site için karar |
|---|---|
| seo-technical, seo-sitemap, seo-drift | Tarama ve adres tutarlılığı: çalıştırılabilir yerel/canlı denetime uyarlandı. Drift kontrolü beklenen kurala karşıdır; tüm HTML geçmişini karşılaştıran bir sistem kurulmadı. |
| seo-schema | JSON-LD, sayfa-hizmet-sağlayıcı bağlantısı: uygulandı. |
| seo-performance, seo-visual | Görsel aktarımı ve gerçek ekran incelemesi: responsive ana görsel ve dosya bütçesi uygulandı; gerçek tarayıcı ve CrUX ölçümü tamamlanamadı. |
| seo-content, seo-cluster, seo-flow, seo-sxo | İçerik, konu ve ziyaretçi yolculuğu: mevcut hizmet sayfaları, ayrı başlık/açıklama ve iletişim yolu incelendi; tasarım veya pazarlama metni yeniden yazılmadı. |
| seo-local, seo-maps | Yerel işletme, harita ve işletme bilgisi tutarlılığı: resmi işletme profili verisi gerekli. Adres/saat/yorum uydurulmadı. |
| seo-google | Search Console ve CrUX: yetkili güncel veri gerekli. Eski konuşmadaki indekslenme bilgisi güncel kanıt sayılmadı. |
| seo-backlinks, seo-dataforseo | Bağlantılar, anahtar kelime ve SERP verisi: uygun veri/erişim gerekli. Ücretli servis kurulmadı. |
| seo-geo, seo-agentic | AI erişimi ve makine okunabilirliği: robots açık, içerik statik, sayfa verisi geliştirildi; AI alıntı/sıralama kazanımı ölçülmedi. |
| seo-image-gen | Görsel denetimi: var olan temsili görseller korundu; yeni görsel üretilmedi. |
| seo-posthog | Ziyaretçi analitiği: mevcut çerezsiz yapı nedeniyle etkinleştirilmedi. |
| seo-ecommerce | Ürün kataloğu/mağaza API'leri: bilgilendirme sitesi için uygulanabilir değil. |

### Reklam ajanları

`audit-google`, `audit-meta`, `audit-microsoft`, `audit-tiktok`, `audit-youtube`, `audit-linkedin`, `audit-amazon`, `audit-apple`, `audit-reddit`, `audit-pinterest`, `audit-snapchat`, `audit-x` kendi platformunun verisini inceler. Sitemizin bu platformlarda aktif reklam hesabı olduğu doğrulanmadı.

`audit-tracking`, `audit-budget`, `audit-creative`, `audit-policy-compliance`, `audit-regulatory-compliance` ölçüm, harcama, kreatif ve kuralların ortak kontrolünü yapar. `copy-writer`, `creative-strategist`, `format-adapter`, `visual-designer` reklam taslağı üretim/değerlendirme görevleridir. `research-worker`, `source-verifier`, `skill-reviewer`, `release-verifier` kaynak ve ürün doğrulamasını üstlenir.

Upstream capability manifestinde hesap değiştirme adaptörleri ve hesap sağlık puanlaması kapalıdır. Dolayısıyla README'deki komut listesi otomatik bütçe yönetimi veya çalışan hesap yazma entegrasyonu olarak yorumlanmadı. [Reklam çalışma dosyası](../operations/ads-plan.md) oluşturuldu. Bütçe, CPA/ROAS, satış ve dönüşüm başarısı hesaplanmadı.

### Güvenlik ajanları

| Ajan | İnceleme karşılığı |
|---|---|
| vuln-scanner | Kaynakta yürütülebilir satır içi kod, DOM ve dış kaynak yüzeyleri; CSP ve statik çıktı testleri |
| authz-reviewer | Üyelik, sunucu API'si, oturum veya kullanıcı verisi bulunmadığı için uygulama yetkilendirmesi kapsam dışı |
| threat-intel | Tehdit göstergelerine yönelik kaynak incelemesi; upstream tehdit feed'iyle tam otomatik tarama yapılmadı |
| dependency-auditor | Kilit dosyasına bağlı kurulum ve güncel npm audit |
| secret-scanner | Yayın çıktısında ortam/kaynak/kilit dosyası ve tehlikeli dosya adları; tam git geçmişi sır taraması yapılmadı |
| iac-scanner | GitHub Actions izinleri ve sabit action commitleri |
| logic-reviewer | Statik iletişim akışı ve yayın engelleri |
| agentic-auditor | Dış depoların kurulum betiklerinin çalıştırılmaması, izinsiz kalıcı servis ve hesap yazma yetkisi eklenmemesi |
| ai-code-auditor | Kullanılmayan framework/SDK, satır içi event handler ve yürütme yüzeyleri için mevcut kaynak testleri |
| finding-verifier | Bulgunun dosya, kullanım yolu ve ortamıyla doğrulanması; CSP başlık kısıtının sömürülebilir uygulama açığı gibi puanlanmaması |

Bu inceleme tam PYA komutunun çıktısı veya penetrasyon testi değildir. Mevcut statik sitenin ilgili kontrolleri çalıştırıldı. “Sıfır açık” ifadesi tüm güvenliğin garantisi olarak kullanılmadı.

### Bilgi kayıt ajanları

`wiki-ingest` kaynakla iddiayı ilişkilendirir; `wiki-lint` bağlantı ve not sağlığını inceler; `verifier` değişikliği ve kanıtı doğrular. Projede bunun karşılığı `operations` dizini, sabit kaynak envanteri, görev durumu ve bu tarihli rapordur. Obsidian uygulaması, vault altyapısı veya upstream otomatik wiki linter'ı kurulmadı. Markdown kayıtları Git sürüm geçmişinde tutulur.

## 2. Tespitler ve yapılan düzeltmeler

| Bulgu | Kanıt | Durum |
|---|---|---|
| Canlı sitemap adresleri `/hayir-lokmasi` biçiminde; sunucu `/hayir-lokmasi/` adresine yönlendiriyor | Doğrudan HTTPS istekleri ve canlı sitemap gövdesi | Adayda canonical, Astro trailingSlash, sitemap ve iç bağlantılar `/` ile biten biçimde eşleştirildi |
| Kaynaktaki adres tercihi ile yayın davranışı ayrışmış | `astro.config.mjs` başlangıçta `trailingSlash: never`; canonical ve kaynak sitemap `/` kullanıyor | `always` yapıldı; sekiz sayfada otomatik kontrol eklendi |
| Canlıda sayfa ve hizmet düzeyinde yeni hedeflenen JSON-LD yok | Geliştirilmiş canlı denetim | Adayda WebPage/ContactPage ve dört Service düğümü; sağlayıcı ve ana varlık bağlantıları eklendi |
| Ana görsel tek genişlikte gönderiliyor | Başlangıç ana sayfa img etiketi | 480, 768, 1024 ve 1280 genişlikleri üretildi; görünür metinler, CSS ve fotoğraf korunuyor |
| Kaynak testlerinden biri eşdeğer cümleyi reddediyor | Başlangıç `npm test` tek cümle eşleşmesinde durdu | Gerçek bölge/uygunluk açıklamasını kontrol edecek biçimde düzeltildi; coğrafi vaat koruması kaldırılmadı |
| Canlı denetim yalnız ana sayfada sınırlı SEO kontrolü yapıyor | Önceki verify-live betiği | Tüm HTML sayfalarında metadata, canonical, indeksleme, H1 ve JSON-LD; sitemap/robots içeriği eklendi |
| Haftalık yerel SEO/derleme/bağımlılık denetimi tanımlı değil | Önceki quality iş akışı | Pazartesi 09:41 Türkiye saati planı eklendi |
| Denetim kanıtları saklanmıyor | Önceki iki iş akışı | SEO Markdown/JSON ve canlı günlükler için 30 günlük artifact, ayrıca iş özeti eklendi |
| Bazı action sürümleri hareketli ana sürüm etiketi kullanıyor | CodeQL ve Pages action referansları | Resmi depolardan çözülen tam commit SHA değerleri kullanıldı |
| Görevler ve veri gerektiren alanlar tek kayıt altında değil | Projede dört kaynak için eşleme yok | Kaynak, görev, reklam hazırlığı ve bakım kılavuzu eklendi |

Canonical ve sitemap sinyallerini tutarlı kullanma yaklaşımı [Google'ın canonical rehberiyle](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) uyumludur. [Service türü](https://schema.org/Service) mevcut hizmeti ve sağlayıcıyı tanımlar. Yapılandırılmış veri eklemek arama sonucu görünümü veya sıralama garantisi vermez; [Google açıklaması](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

## 3. Doğrulama

- `npm ci`: tamamlandı; mevcut kilit dosyası korundu.
- `npm test`: 36 kaynak testi, 9 çıktı/SEO testi; 45 test geçti. Gerçek Astro üretim derlemesi ve dosya bütçesi denetimi dahil.
- `npm run audit:deps` ve `npm run audit:full`: bilinen açık bildirilmedi. Bu, inceleme anındaki npm danışma veritabanının sonucudur.
- `npm run audit:site -- --output outputs/maintenance`: sekiz sayfa, sıfır kural hatası. Başlık ve açıklama tekrarları, sitemap adres kümesi, robots bildirimi ve yerel dosya bağlantıları da kontrol edildi.
- Olumsuz örnekler: yanlış canonical, yanlış noindex, bozuk JSON-LD, yanlış graph yapısı, eksik/yanlış sağlayıcı, tekrarlı/yanlış sitemap adresi test edildi.
- 480 piksel ana görsel: **39.780 bayt**. Dört responsive varyant üretildi. Bu veri bir dosya boyutudur; gerçek LCP ölçümü değildir.
- İstemci JS: **2.014 bayt**; CSS: **20.061 bayt**; `images/` varlıkları: **546.390 bayt**. Üretilen responsive görseller bu son sayıya dahil değildir; tüm derleme yaklaşık 1,02 MB'dır.
- İş akışlarının YAML söz dizimi, Node betik söz dizimleri ve `git diff --check`: geçti.
- Önceki canlı denetim: 16 URL/dosya isteği; sıfır hata, bir HTTP güvenlik başlığı uyarısı. Yedi HTML sayfası ve varlıklar 200; bulunmayan/hassas dosya yolları 404.
- Genişletilmiş canlı denetim adayın yeni kurallarına göre mevcut yayında metadata/şema/adres farkları buldu. Bunlar aday yayımlanmadan kaybolmuş sayılmaz. Erişilebilirlik denetiminin geçmesi SEO hedeflerinin tamamlandığı anlamına gelmez.

Yerel Chromium dosyası eksik olduğu için mobil/masaüstü tarayıcı testi başlatılamadı. Playwright tarayıcı indirmesi ağ tarafından 403 ile engellendi. Görsel tarayıcı incelemesi ve gerçek Lighthouse/CrUX ölçümü yapılmış sayılmaz. CSS ve görünür içerik değiştirilmedi; responsive görselin gerçek ekranda doğrulanması yayın öncesi açık kontrol olarak durur.

## 4. Arka plandaki düzen

| Kontrol | Tetikleyici | Çıktı | Yetki |
|---|---|---|---|
| Kaynak, derleme, sayfa SEO ve bağımlılıklar | PR/main ve pazartesi 09:41 | İş günlüğü, SEO Summary, Markdown/JSON artifact | contents: read |
| Canlı site | Pazartesi 09:23 ve elle | Canlı doğrulama günlüğü artifact | contents: read |
| CodeQL | Mevcut çarşamba planı, PR/main | JavaScript/TypeScript ve Actions güvenlik analizi | contents: read; security-events: write |
| Dependabot | Mevcut haftalık npm / aylık Actions | İncelenecek PR | Otomatik birleştirme yok |

GitHub zamanlanmış işleri gecikebilir. Dalda hazırlanan yeni plan henüz ana dal planının yerine geçmemiştir. Günlükler ve artifactler müşteri/hesap verisi içermez. Denetimler otomatik düzeltme, reklam yayınlama, bütçe harcama veya ana dala yazma yapmaz.

## 5. Açık kalanlar ve somut gerekçeleri

| İş | Durum / gereken |
|---|---|
| Bu adayın canlıya alınması | Çalışma arka planda/ayrı daldadır. Birleşme ve yayın tamamlanınca canlı denetim yeniden çalışmalıdır. |
| Gerçek mobil/masaüstü tarayıcı doğrulaması | Tarayıcı ikilisi/indirme erişimi engeli; yeni ekran testi gerekli. |
| Search Console indeks/sorgu performansı | Yetkili güncel Search Console verisi gerekli. Bu oturumda ölçülmedi. |
| CrUX gerçek kullanıcı performansı | Güncel saha verisi gerekli; veri yoksa yok olarak raporlanmalı. |
| Google Business Profile ve haritalar | Resmi profil bağlantısı/erişim ve doğrulanmış işletme bilgileri gerekli. İşletme adı/telefonu sitede tutarlı; dış kayıtlar doğrulanmadı. |
| Reklam hesabı optimizasyonu | Gerçek hesap dökümü, tarih/para birimi/hedef/dönüşüm tanımı ve bütçe gerekli. Hazırlık dosyası tamamlandı. |
| WhatsApp'tan gelen nitelikli talep ve satış | Tıklamayı görüşme/satış saymayan işletme kaydı gerekli. |
| HTTP seviyesinde CSP ve frame koruması | GitHub Pages `public/_headers` dosyasını uygulamıyor; meta CSP mevcut. Başlıkları zorlamak mevcut barındırma dışında bir yapı gerektirir. DNS/proxy değişimi yapılmadı. |
| Tam geçmiş sır taraması / tam PYA taraması | Bu kapsamda çalıştırılmadı; mevcut taramalarla eş tutulmadı. |

Açık PR #5'in görünür başlık/metin değişiklikleri bu bakım dalına topluca alınmadı. Bu çalışmada oradaki responsive görsel yaklaşımına denk bir iyileştirme mevcut ana dalın metinlerini koruyarak uygulandı. PR #6 Astro 7.4.13; #1/#2 büyük Actions güncellemeleridir. Bilinen açık çıkmayan bağımlılıklar gereksiz yere güncellenmedi; açık PR'lar otomatik birleştirilmedi. Eski PR #5 ile bu dalın aynı görsel alanına dokunması gelecekte birleştirme sırasında incelenmelidir.

Yeni ilçe/şehir giriş sayfaları, sahte yorumlar, doğrulanmamış adres/saat/fiyat/kapasite, gereksiz AI keşif dosyaları ve izleyici SDK eklenmedi. Uygunluk ve performans verisi olmadan SEO puanı, sıralama artışı veya reklam getirisi iddiası üretilmedi.

## 6. Sonraki çalışma için kayıt

[Başlangıç kılavuzu](../operations/README.md), [görev eşlemesi](../operations/agents.json), [kaynak envanteri](../operations/sources.json), [reklam planı](../operations/ads-plan.md). Yapılan teknik düzeltmeler kodda ve testlerde; veriye bağlı eksikler bu raporun açık işler tablosundadır.

## 7. Teslim durumu

Yerel bakım dalında iki uygulama commit'i hazırdır. GitHub'a `git push` işlemi otomatik onay denetimi tarafından reddedildi: uzak deponun sahipliği/hedef yetkisi ve kod yayımlama iznini yeterince açık bulmadı. Ardından bağlı GitHub kullanıcısının `Must7y`, hedef deponun `Must7y/izmirlokmasi`, yetkinin `admin` olduğu doğrudan doğrulandı. Bu kontroller sahipliği doğrular; denetimin istediği açık gönderim iznini kullanıcı adına üretmez. İşlem başka yoldan aşılmadı. Uzak dal ve taslak PR oluşturulmadı.

Canlı site ve ana dal değişmedi. İnceleme paketi, başlangıç commit'ine uygulanabilir patch, bu rapor, görev kayıtları ve doğrulama özetini içerir. İzin sonrasında yalnız bakım dalına gönderim ve taslak PR açılması yeterlidir; canlı yayın için ana dala birleştirme bu adıma dahil değildir.

# Google kurulum ve ölçüm kaydı — 26 Kasım 2026

## Doğrudan hesap gözlemleri

- İzmir Lokma Search Console alan adı mülkü doğrulanmış. Manuel işlemler ve güvenlik sorunları raporlarında sorun algılanmadı.
- robots.txt raporu: tüm dosyalar geçerli. Site haritası başarılı, son okuma 24 Kasım, altı keşfedilmiş sayfa. Dizin kapsamı raporu henüz işleniyor.
- Ana sayfa Google dizininde; son kayıtlı tarama 21 Kasım. Güncellemeden sonra yeniden tarama isteği Google tarafından kabul edildi. Tekrar tekrar gönderilmedi.
- GA4 ilişkilendirmesi mevcut. GA4 akışı eski HTTP/www adresinde ve veri almıyor. Güncel adres HTTPS ana alan adına düzeltildi.
- GTM kapsayıcısı mevcut, etiketsiz. Tek GA4 kurulumunu ikinci kez yükleyecek bir etiket eklenmedi.
- Bu Google hesabındaki İşletme Profili listesinde Hanifi Usta görülmedi. Başka işletmelerin profilleri değiştirilmedi. Yeni profil için doğrulanmış işletme bilgileri ve doğrulama süreci gerekir.
- Google Ads otomatik ajan erişimini açıkça reddetti. Hesaba başka yollarla giriş denenmedi; kampanya/harcama değişikliği yapılmadı. Taslak operations/ads-plan.md içinde.
- Kişisel site mülkünün mevcut doğrulaması eksik. Güncel Google meta etiketi ilgili kişisel site deposunda ayrı PR ile eklendi. Hanifi Usta deposuna kişisel site içeriği taşınmadı.

## Bu değişiklikte

GA4 yalnız ziyaretçi açıkça izin verirse yüklenir. Tercih footer içindeki ayrıntı bölümündedir; varsayılan kapalı, reklam sinyalleri kapalı, çerez ömrü en fazla 90 gün. İzni geri alma ölçümü durdurur, ilgili çerezleri siler ve sayfayı yeniden yükler; önceki verileri Google’dan silmez. İzin başka sekmede kaldırılırsa açık sekme de durur.

Sayfa görüntüleme adresinden URL sorguları/fragmentler çıkarılır; referrer yalnız origin içerir. İletişim olayı yalnız whatsapp/phone/email kanalını taşır; mesaj ve tam iletişim bağlantısı taşınmaz. Bu olay görüşme, satış veya nitelikli talep değildir. Gizlilik metni fiili uygulamayla birlikte güncellendi.

CSP yalnız etiket betiği ve iki Analytics toplama origin’i için açık izin içerir. unsafe-inline, unsafe-eval veya joker origin eklenmedi. Yeni npm bağımlılığı eklenmedi. Yerel/önizleme domainleri ölçüm yapamaz.

## Doğrulama

- Kilitli npm ci; 40 kaynak ve 15 üretim testi geçti. Dört kaynak testi rıza/geri alma/duplikasyon ve veri minimizasyonunu denetler.
- npm audit:full sıfır bulgu. Sayfa SEO denetimi 8 sayfa, sıfır hata.
- Chromium 390 ve 1440 pikselde: izin öncesi sıfır Google isteği; izinle tek etiket yüklemesi; geri almadan sonra etiket yok; taşma ve CSP hatası yok. Yerel QA’da Google etiketi taklit edildi, test telemetrisi gönderilmedi.
- Gerçek GA4 veri teslimi ve raporların dolması ayrı kanıttır; yerel testler bunu kanıtlamaz. Üretim yayını/CodeQL sonucu ilgili PR ve GitHub Pages çalışmasından kontrol edilir.

## Kalan girdiler

Hanifi Usta İşletme Profili için doğru yönetici hesabı veya doğrulanmış işletme unvanı, adres/hizmet bölgesi, kategori, saatler ve profil bağlantısı; Google Ads için onaylı bütçe, hedef bölge ve dönüşüm tanımı. Bunlar tahmin edilerek yayımlanmaz. Merchant Center yalnız gerçek ürün kataloğu ve uygun satış akışı varsa değerlendirilir; şu an bilgilendirme sitesine ürün/fiyat uydurulmaz.

## Birincil uygulama belgeleri

- https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://developers.google.com/tag-platform/security/guides/privacy

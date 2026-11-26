# Devam kaydı

26 Kasım 2026. Önce bu dosyayı, AGENTS.md ve reports/FRONTEND-BACKEND-SEO-2026-11-26.md dosyasını oku.

Başlangıç yayını b19d55777d99ef8720275c9eec670063424bf427. Bu çalışma frontend + teknik yayın kontrolleri + kullanıcı tarafından istenen İstanbul/sipariş/döktürme SEO kapsamını içerir. Kaynak değişiklikleri bu dalda; birleştirme ve canlı doğrulama durumu PR/Actions/build-info.json üzerinden yeniden görülmeden yayımlandı varsayma.

Tamamlanan yerel işler: görünür yön ikonları, iletişim bilgileri ve footer erişimi, footer çakışması, rıza geri alma düzeltmesi, 46 ifadeli anahtar kelime haritası ve dört hizmet sayfasının özgün sipariş içeriği, HTTP başlık kontrolü, hazırlanmış edge başlık değerleri.

Yapılacak doğrulama: npm test + npm run audit:full; Chromium 320/390/768/1440; PR kalite/CodeQL; Pages yayını; canlı commit/rota/JS/ikon denetimi; son kaynak+yayın yapıtı ve raporu mevcut Drive yedek klasörüne ekleme. Başarılı sonuçlar raporun doğrulama bölümüne kaydedilir.

Çözülemeyen dış bağımlılık: gerçek HTTP HSTS/frame-ancestors/nosniff için domain/CDN yönetimi gerekir. DNS/hosting değiştirilmedi. Hazır JSON’u aktif başlık gibi raporlama. Ads erişim engelini aşmaya çalışma; bütçe ve gerçek işletme bilgileri olmadan reklam/profil oluşturma.

Gizli anahtar kelime sayfası/otomatik ana sayfa yönlendirmesi yapılmayacak. Fiyat, kapasite, müşteri yorumu ve ilçe garantisi uydurulmayacak. Mevcut altı indekslenebilir URL, görseller ve tasarım korunacak.

Kota yenilenmesi arka planda kendiliğinden çalışma başlatmaz; oturum yeniden devam ettiğinde kayıt ve uzak dal kontrol edilerek kalan iş alınır.

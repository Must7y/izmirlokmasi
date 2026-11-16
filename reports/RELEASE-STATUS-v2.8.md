# İzmir Lokma v2.8 — Bölge söylemi revizyonu

24 Ekim 2026

- Üst şerit “HAYIR • MEVLİT • ÖZEL GÜN LOKMASI” olarak değiştirildi.
- Ana sayfa metinleri, konum sorusu ve iletişim sayfasından İstanbul sınırı kaldırıldı.
- SEO başlığında ve meta açıklamasında bölgesel kısıt yok; Organization şemasından areaServed/City çıkarıldı.
- Doğrulanmamış Türkiye-geneli hizmet vaadi eklenmedi; hizmet uygunluğu tarih ve konuma göre teyit edilir.
- Görseller, renkler, menü kararı, JavaScript, WhatsApp ve güvenlik başlıkları değişmedi.
- Kaynak testleri: 28/28 PASS (`node --test` seçili beş kaynak/güvenlik test modülünde).
- Dist gerektiren 3 statik site testi bu ortamda çalıştırılmadı; tüm testleri körlemesine çağırmak dist bulunmadığı için bu 3 testin başarısız olmasına neden olur.
- Astro gerçek build / npm audit / canlı site smoke-test doğrulanmadı.
- Canlı yayın yapılmadı.

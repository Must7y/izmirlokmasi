# Reklam ve ölçüm hazırlığı

Durum (26 Kasım 2026): Google Ads, otomatik ajan erişimini açıkça reddetti; hesap/kampanya denetimi yapılamadı. Reklam açılmadı ve bütçe belirlenmedi. Mevcut GA4 veri akışı doğrulandı; siteye ziyaretçi iznine bağlı ölçüm eklendi.

## Mevcut site

İzmir lokması, saray lokması, hayır lokması ve mevlit lokması için ayrı açılış sayfaları var. İletişim WhatsApp, telefon ve e-posta üzerinden. Sitedeki WhatsApp bağlantısının çalışması gerçek bir görüşme, teklif veya satış olduğunu kanıtlamaz. Analitik varsayılan olarak kapalıdır. Ziyaretçi footer içindeki İstatistik tercihi bölümünden izin verirse GA4 yüklenir. Reklam kişiselleştirmesi kapalıdır.

## Hesap denetimi girdileri

Google/Meta gibi gerçekten kullanılan platformdan CSV/JSON dökümü; tarih aralığı, saat dilimi ve para birimi; hedef ve onaylı bütçe; kampanya/reklam grubu/arama terimi/negatif kelime/konum/ağ/harcama/tıklama/gösterim/dönüşüm alanları gerekir. Müşteri isimleri, telefonları, e-posta adresleri ve erişim anahtarları çıkarılmalıdır. Dosya açık GitHub deposuna yüklenmez.

## Hazır kampanya taslağı

| Arama niyeti | Aday açılış sayfası | Mesajın dayanağı |
|---|---|---|
| Hayır lokması dökümü | /hayir-lokmasi/ | Mevcut hizmet metni |
| Mevlit için lokma | /mevlit-lokmasi/ | Mevcut hizmet metni |
| Halka İzmir lokması | /izmir-lokmasi/ | Ürün biçimi ve hizmet metni |
| Saray lokması | /saray-lokmasi/ | Ürün biçimi ve hizmet metni |

Bu gruplar yayınlanacak kampanya veya hesapta var olduğu doğrulanmış yapı değildir. İstanbul ve çevre iller mevcut görünür hizmet ifadesidir; hesap konum hedeflemesi, organizasyon uygunluğu doğrulanınca belirlenir. Doğrulanmamış fiyat, kapasite, kesintisiz hizmet ve müşteri yorumu reklam metnine yazılmaz. Negatif kelimeler gerçek arama terimleri ve satış niyeti üzerinden incelenir; tahminle toplu dışlama yapılmaz.

## Ölçüm sözlüğü

| Olay | Tanım | Mevcut durum |
|---|---|---|
| WhatsApp tıklaması | WhatsApp bağlantısının açılması | İzin verildiğinde contact_click / whatsapp; görüşme sayılmaz |
| Telefon tıklaması | tel bağlantısının açılması | İzin verildiğinde contact_click / phone; arama sayılmaz |
| Nitelikli talep | İşletmenin uygun organizasyon talebini doğrulaması | Hesap/işletme kaydı gerekli |
| Tamamlanan organizasyon | Gerçekleşen hizmet | İşletme kaydı gerekli |

Hesap verisi geldiğinde önce ölçüm ve dönüşüm tanımları, ardından harcama/arama terimleri/konum/mesaj-sayfa uyumu incelenir. CPA, ROAS, satış ve bütçe önerisi kanıt olmadan hesaplanmaz. Ölçüm kodu ve gizlilik açıklaması birlikte güncellendi; onay verilmedikçe etiket yüklenmez. GTM kapsayıcısı mevcut fakat etiketsizdir; aynı GA4 etiketini ikinci kez yüklemek için kullanılmaz. claude-ads manifestindeki hesap yazma adaptörleri kapalıdır; aracı kurmak hesabı otomatik yönetme yeteneği sağlamaz.

## Reklam metni taslağı (hesapta oluşturulmadı)

Başlık adayları: Hanifi Usta Lokma Dökümü; Hayır İçin Lokma İkramı; Mevlit İçin Lokma İkramı; Halka İzmir Lokması; Saray Lokması İkramı; Tarihiniz İçin Bilgi Alın.

Açıklama adayı: Tarih, konum ve kişi sayısını paylaşın. Lokma ikramınızın hazırlık ve servisini görüşelim.

Başlangıç planı: Hizmet niyetlerine göre ayrı arama grupları, ilgili açılış sayfası ve WhatsApp/telefon iletişim hedefi. Hedef bölge, günlük/aylık harcama üst sınırı ve nitelikli talep tanımı kullanıcı tarafından netleştirilmeden yayınlanmaz. Reklam yayını organik sıralama iyileşmesinin kanıtı değildir.

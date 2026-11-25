# Reklam ve ölçüm hazırlığı

Durum: hesap verisi bekleniyor. Reklam açılmadı, bütçe belirlenmedi ve izleme kodu eklenmedi.

## Mevcut site

İzmir lokması, saray lokması, hayır lokması ve mevlit lokması için ayrı açılış sayfaları var. İletişim WhatsApp, telefon ve e-posta üzerinden. Sitedeki WhatsApp bağlantısının çalışması gerçek bir görüşme, teklif veya satış olduğunu kanıtlamaz. Mevcut tasarım çerezsizdir; müşteri takibi yapmaz.

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
| WhatsApp tıklaması | WhatsApp bağlantısının açılması | Ölçülmüyor; görüşme sayılmaz |
| Telefon tıklaması | tel bağlantısının açılması | Ölçülmüyor; arama sayılmaz |
| Nitelikli talep | İşletmenin uygun organizasyon talebini doğrulaması | Hesap/işletme kaydı gerekli |
| Tamamlanan organizasyon | Gerçekleşen hizmet | İşletme kaydı gerekli |

Hesap verisi geldiğinde önce ölçüm ve dönüşüm tanımları, ardından harcama/arama terimleri/konum/mesaj-sayfa uyumu incelenir. CPA, ROAS, satış ve bütçe önerisi kanıt olmadan hesaplanmaz. İzleme istenirse veri akışı ve gizlilik açıklaması ayrıca tasarlanır. claude-ads manifestindeki hesap yazma adaptörleri kapalıdır; aracı kurmak hesabı otomatik yönetme yeteneği sağlamaz.

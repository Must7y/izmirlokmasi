# Google görünürlüğü: teşhis ve ikinci uygulama turu

26 Kasım 2026. Site: https://izmirlokmasi.com. Bu tur, [ilk bakım raporunun](SEO-SECURITY-2026-11-26.md) devamıdır. Tüm değişiklikler yerel bakım dalındadır; canlı site henüz değiştirilmedi.

## Bulunan yayın sorunu

18 Kasım'daki [44341881336 numaralı yayın](https://github.com/Must7y/izmirlokmasi/actions/runs/44341881336) başarısız. `build-and-check` işinde, kaynak testleri adımı durmuş; `deploy` işi atlanmış. `134933782264` numaralı işin günlüğünde beklenen ifade açıkça görünüyor: `hizmet uygunluğunu birlikte teyit edelim`. Sayfadaki eşdeğer ifade bu tam metin kontrolüne uymadığı için test başarısız olmuş. Sadece bu kontrolü kaldırmak yerine uygunluk bilgisini ve doğrulanmamış bölge vaadi korumasını sürdüren düzeltme önceki bakım turunda yapılmıştı.

Görünen son başarılı Pages çalışması [16 Kasım yayını](https://github.com/Must7y/izmirlokmasi/actions/runs/43941751863). Canlı ana sayfanın başlığı `İzmir Lokması ve Saray Lokması | Hanifi Usta`; H1 metni `Bir lokma, bin güzel hatıra.`. Canlı İzmir lokması sayfasının canonical adresi sondaki `/` olmadan yazılmış; sunucu `/` ile biten adresi sunuyor. Dolayısıyla depodaki iyileştirmelerin tamamı yayına geçmiş değil.

Bu bulgu Google'da neden görünmediğimizin tamamını açıklamaz. Kesin olarak gösterdiği şey, son SEO değişikliklerinin dağıtım adımına ulaşmadığıdır. Yayın engeli çözülmeden yeni yerel düzenlemeler arama sonuçlarına etki edemez.

## Canlı indekslenebilirlik kontrolü

| Kontrol | Gözlem | Yorum |
|---|---|---|
| HTTPS ana sayfa | 200, kendi adresinde | Site temel erişime açık |
| İzmir lokması sayfası | 200 | İncelenen hizmet sayfasına erişiliyor |
| Robots meta | index,follow,max-image-preview:large | İncelenen HTML'de noindex bulunmadı |
| X-Robots-Tag | İncelenen yanıtlarda yok | Bu başlıktan bir indeks yasağı görülmedi |
| robots.txt | User-agent: *, Allow: /, sitemap bildirimi | Genel tarama yasağı görülmedi |
| sitemap.xml | 200, altı sayfa, eski URL biçimi | Adres tutarlılığı adayda düzeltildi |
| HTTP ve www adresleri | HTTPS ana domaine ulaşıyor | İncelenen alternatif adresler ana adrese yönleniyor |
| Search Console | Bu oturumda hesap verisi alınmadı | Google indeks durumu ve seçilen canonical bilinmiyor |

Bu istekler normal istemci istekleridir; gerçek Googlebot erişimini, Google'ın dizine almasını veya tüm ağlardan erişimi kanıtlamaz. Dış arama araçlarında `site:izmirlokmasi.com` ve marka/alan adı sorguları denendi; kendi sitemizden bir sonuç bulunamadı. Bu araçların indeksi ve kapsamı Google ile aynı değildir; arama sonucu yokluğundan kesin indeks kaybı veya ceza sonucu çıkarılmadı. Üçüncü taraf domain listelerinden alan adı yaşı veya ceza geçmişi türetilmedi.

## Bu turda uygulananlar

| No | Düzenleme | Amaç |
|---|---|---|
| 1 | Ana H1: yerinde İzmir lokması dökümü | Sayfanın sunduğu hizmeti ilk başlıkta açıklamak |
| 2 | Ana açıklamada mevcut İstanbul ve çevre iller kapsamı ile teklif bilgisi | Hizmet ve iletişim niyetini aynı metinde netleştirmek |
| 3 | Ana title'da İzmir lokması ve yerinde döküm | Arama başlığını hizmetle eşleştirmek |
| 4 | Dört hizmet için ayrı title ve kısa meta açıklaması | Uzun gövdeyi meta açıklamasına kopyalamayı bırakmak |
| 5 | Dört hizmet için açık H1 | Ürün adıyla döküm/ikram hizmetini birlikte anlatmak |
| 6 | Hizmete göre farklı planlama bölümleri | Sayfaları aynı genel paragrafın kopyası olmaktan çıkarmak |
| 7 | Her hizmette iki somut soru-cevap | Fiyat talebi, lokma biçimi ve organizasyon saati gibi gerçek kararları açıklamak |
| 8 | Ürün kartlarında açıklayıcı bağlantı metni | Hedef sayfanın konusunu bağlantıdan anlaşılır yapmak |
| 9 | Kalan ürün kartı adreslerini canonical biçime getirmek | Gereksiz yönlendirmeyi azaltmak |
| 10 | Her hizmetten doğrudan iletişim bağlantısı | Ziyaretçinin hizmet sayfasından teklif yoluna ulaşması |
| 11 | WebSite alternateName ve doğrulanmış iletişim bilgileri | Marka ve iletişim tutarlılığını güçlendirmek |
| 12 | Alt sayfalarda BreadcrumbList ve sayfa bağlantısı | Mevcut ana sayfa-hizmet hiyerarşisini makineye açıklamak |
| 13 | Görsel site haritası | Var olan üç ürün görselini sayfalarla ilişkilendirmek |
| 14 | Hizmet fotoğraflarında responsive WebP ve yükleme önceliği | Ana sayfa dışındaki görsel aktarımını da ekran boyutuna uyarlamak |
| 15 | Yayın çıktısında sürüm bilgisi | Hangi kod sürümünün gerçekten yayımlandığını denetleyebilmek |
| 16 | Dağıtım sonrası canlı SEO ve sürüm doğrulaması | Yalnız derleme başarısını yayın başarısı saymamak |
| 17 | Breadcrumb, görsel sitemap, farklı hizmet içeriği ve sürüm kontrolleri | Geriye gidişleri otomatik yakalamak |

Bunlar aynı ağırlıkta veya bağımsız 17 sıralama faktörü değildir. Bazıları ziyaretçinin kararını, bazıları keşfi, bazıları yalnız yayın doğrulamasını iyileştirir. Ek sayfa, bağımlılık, takip SDK'sı, ücretli servis veya istemci JavaScript'i eklenmedi. CSS, renkler, fotoğraf seçimi ve ana sayfanın bölüm sırası korundu. Metinler aynı şablon içinde güncellendi; hizmet sayfasındaki mevcut bilgi bölümü genişletildi. Gerçek ekran kontrolü yapılmadan görünümün birebir aynı kaldığı iddia edilmez.

Görseller hâlâ temsili ürün görselleridir; gerçek organizasyon fotoğrafı olarak sunulmaz. Sahte yorum/puan, doğrulanmamış adres, çalışma saati, fiyat, araç/ekip kapasitesi, gizli anahtar kelime metni ve seri şehir sayfaları eklenmedi. Sık sorulan sorular için Google'da özel görünüm vaadi verilmedi ve FAQPage işaretlemesi eklenmedi.

## Doğrulama

- Kilitli `npm ci` tamamlandı.
- 36 kaynak testi ve 13 çıktı/SEO testi: toplam 49 test geçti.
- Gerçek Astro üretim derlemesi, dosya bütçesi ve sekiz sayfalık SEO denetimi geçti.
- `npm run audit:full`: bilinen açık bildirilmedi.
- Workflow YAML ve değişiklik biçim kontrolleri geçti.
- Sürüm dosyası çalışma ağacındaki değişiklikleri `dirty` alanıyla ayırır. Dağıtım sonrası kontrol yalnız istenen temiz commit'i kabul eder. Yerel kirli derlemeyi yayımlanmış sürüm diye onaylamaz.
- Mobil/masaüstü gerçek tarayıcı kontrolü tamamlanamadı: önceki turda tarayıcı ikilisi eksik, indirme ise 403 ile engellenmişti; bu turda da kullanılabilir ikili bulunamadı.
- Bu rapordaki yerel test başarısı canlı yayının veya Google indeksinin değiştiği anlamına gelmez.

## Search Console'da kesin teşhis

Mülk: `izmirlokmasi.com` alan adını kapsayan doğrulanmış mülk. Önce URL Denetimi'nde ana sayfa ve `/izmir-lokmasi/` incelenmeli. Kaydedilecek alanlar:

1. URL Google'da mevcut mu?
2. Dizine eklenmiyorsa tam gerekçe: keşfedildi/tarandı fakat dizine eklenmedi, yönlendirme, kopya, noindex, soft 404 veya sunucu sorunu vb.
3. Son tarama zamanı ve sayfa getirme sonucu.
4. Kullanıcının belirttiği canonical ve Google'ın seçtiği canonical.
5. Canlı URL testindeki erişilebilirlik ve indekslenebilirlik sonucu.

URL indeksliyse Performans > Arama sonuçları bölümünde son 28 gün ve son üç ay incelenmeli: gösterim, tıklama, sorgu, sayfa, ülke ve konum. Genel sorgularla marka sorguları ayrılmalı. Gösterim yokluğu, düşük konum ve düşük tıklama oranı farklı sorunlardır. Hiçbirini sadece sitede kelime geçme sayısına göre teşhis etmiyoruz.

| Sorgu niyeti | Hedef sayfa |
|---|---|
| Hanifi Usta / İzmir Lokmacısı Hanifi Usta | / |
| İzmir lokması / halka lokma dökümü | /izmir-lokmasi/ |
| Saray lokması / yuvarlak lokma | /saray-lokmasi/ |
| Hayır lokması / hayır lokması döktürme | /hayir-lokmasi/ |
| Mevlit lokması / mevlit için lokma | /mevlit-lokmasi/ |
| Lokma teklifi / iletişim | /iletisim/ |

Bu tablo gerçek aranma hacmi veya mevcut sıralama ölçümü değildir. Sayfa odağını tanımlar. `İzmir lokması` hem tatlı çeşidi hem konum çağrışımı yapabilir; sitemiz İstanbul ve çevre illerdeki mevcut hizmet bağlamını korur. İzmir ilinde hizmet verildiği doğrulanmadan yeni konum vaadi eklenmez.

## Yayın sonrası sıra

1. İzin verilen bakım dalını GitHub'a gönder; değişiklikleri ve CI sonucunu incele.
2. Onaylı sürümü ana dala birleştirip Pages dağıtımının tamamlandığını doğrula.
3. Yeni canlı kontrolüyle kod sürümü, altı indekslenebilir adres, canonical, robots ve site haritasını doğrula.
4. Search Console'da sitemap durumunu ve URL denetimini kontrol et. Gerekliyse ana ve hizmet URL'leri için bir kez dizine ekleme iste. Aynı URL'ye sürekli istek göndermeyi hızlandırma taktiği sayma.
5. Sorgu ve sayfa gösterimlerini başlangıç verisiyle karşılaştır. Sonuca göre içerik veya işletme profili tutarlılığı üzerinde çalış.

GitHub'a gönderim önceki otomatik yetki denetiminde reddedildi. Bu turda bu engeli başka yoldan aşma girişimi yapılmadı. Kod/dokümanlar yerelde hazır; uzak dala gönderim ve canlı yayın için açık izin bekleniyor. Dış işletme hesaplarında, DNS'te ve Search Console'da değişiklik yapılmadı.

## Birincil kaynaklar

- [Google SEO başlangıç rehberi](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Başlık bağlantıları](https://developers.google.com/search/docs/appearance/title-link)
- [Görsel site haritaları](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [URL Denetleme aracı](https://support.google.com/webmasters/answer/9012289?hl=tr)
- [Yeniden tarama isteği](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

Google yeniden taramanın birkaç gün ile birkaç hafta alabileceğini, isteğin indekslemeyi garanti etmediğini açıklar. Bu yüzden tarih veya sıralama garantisi verilmez.

# Hanifi Usta bakım düzeni

Güncel: [Google görünürlüğü ve ikinci uygulama turu](../reports/SEO-GORUNURLUK-2026-11-26.md).

Başlangıç: [26 Kasım raporu](../reports/SEO-SECURITY-2026-11-26.md). Kaynaklar: [sabit commit envanteri](sources.json). Görevler: [ajan eşlemesi](agents.json). Reklam hazırlığı: [çalışma dosyası](ads-plan.md).

## Nasıl çalışır?

GitHub Pages statik dosya sunar. Arka plandaki denetimler GitHub Actions üzerinde çalışır. Bu düzen Claude Code, Obsidian veya sürekli çalışan bir LLM servisi gerektirmez. Dört deponun tüm eklentileri kurulmuş değildir; görev yöntemleri bu projedeki çalıştırılabilir kontrollere ve bakım kayıtlarına uyarlanmıştır.

- `npm ci`: kilitli kurulum.
- `npm test`: kaynak güvenliği, üretim derlemesi, çıktı testleri ve sayfa SEO denetimi.
- `npm run audit:full`: tüm npm bağımlılıklarının güncel güvenlik duyuruları.
- `npm run audit:site -- --output outputs/maintenance`: Markdown ve JSON sayfa raporu.
- `npm run verify:live -- https://izmirlokmasi.com`: o anda yayındaki sürümü denetler. Yayınlanmamış dalın canlıyla aynı olduğunu varsaymaz.

Kod/PR değişikliklerinde quality iş akışı çalışır. Pazartesi 09:23 Türkiye saati canlı kontrolü; 09:41 kaynak, derleme, SEO ve bağımlılık kontrolü planlanmıştır. GitHub zamanlanmış işleri geciktirebilir. Planlı işlerin bu daldaki sürümü ana dala birleşince devreye girer. Önceki ana dal planı bu sırada çalışmaya devam eder. Sonuçlar iş günlüğünde; sayfa denetimi GitHub Summary alanında; rapor dosyaları 30 gün saklanan çalışma çıktısındadır. Bunlar kalıcı tarihçe yerine geçmez. Önemli bulgular bu depodaki tarihli rapora işlenir.

## Kanıt kaydı

Her bulguda tarih, incelenen commit/URL, doğrudan gözlem, önem, değişen dosya, doğrulama sonucu ve kalan sınır yazılır. Kaynak bir iddiayı kanıtlamıyorsa `unknown`; statik sitede ilgisiz bir kontrol için `not_applicable` kullanılır. Eksik veriye sağlık puanı verilmez. Kaynak değişince eski rapor silinmez; yeni rapor eski rapora bağlanır. Kişisel veri ve hesap dökümleri açık depoya yazılmaz.

## Yetki

Denetim işleri `contents: read` kullanır; güvenlik sonuçları için CodeQL ayrı `security-events: write` kullanır. Denetim kodu değiştirmez, reklam açmaz, mesaj göndermez, bütçe harcamaz, otomatik PR birleştirmez. Yayın mevcut `main` dağıtım işinden geçer. Başarısız test/denetim yayın engelidir. Workflow action sürümleri commit SHA ile sabittir; güncellemeleri Dependabot incelemeye açar.

## Sonraki bakımda

Önce bu dizindeki kayıtları, açık PR'ları ve son CI sonucunu oku. `sources.json` içindeki commitleri yeni sürümlerle karıştırma. Yeni sürüm için değişiklik/lisans/bağımlılık incelemesi yap. Sonra `npm test` ve `npm run audit:full` çalıştır. Canlı ve aday sonuçlarını ayrı kaydet. Uygulanamayan hesap kontrollerini tamamlanmış gösterme.

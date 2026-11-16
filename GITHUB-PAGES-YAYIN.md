# İzmir Lokmacısı Hanifi Usta – GitHub Pages yayın talimatı

**Kaynak:** Drive'dan alınan v2.8 ZIP'i ve siteyi değiştirmeyen v2.9 güvenlik güncellemesi (değiştirilmemiş yedeği saklıdır). **Hedef:** `https://izmirlokmasi.com`.

## GitHub tarafı

1. `https://github.com/new` adresinde `Must7y` hesabından `izmirlokmasi` isimli **Public** depo açın; README/.gitignore/license eklemeden boş bırakın. (Ücretsiz GitHub Pages, public depo ile çalışır.)
2. Bu paketteki `izmirlokmasi/` klasörünün **içindeki** kaynakları depo köküne yükleyin. ZIP'i dosya olarak yüklemek siteyi açmaz. Alternatif olarak depo açıldıktan sonra bağlı GitHub aracıyla dosyalar gönderilebilir.
3. `Settings > Pages > Build and deployment > Source` menüsünde `GitHub Actions` seçin.
4. `.github/workflows/github-pages.yml` ana dala gönderimlerde `npm ci`, kaynak testleri, gerçek Astro build, statik site testleri ve `npm audit --omit=dev` çalıştırır. Her biri başarılıysa `dist/` yayınlanır. `Actions` ekranında başarı durumunu kontrol edin.
5. `Settings > Pages > Custom domain` alanına `izmirlokmasi.com` girip kaydedin. Paketteki `public/CNAME` aynı alan adını belirtir; DNS kayıtları tam doğrulanmadan eski yayını silmeyin.

## DNS (alan adı sağlayıcısında)

GitHub Pages özel alan adı kaydedilip doğrulandıktan sonra, mevcut A/AAAA/ALIAS kayıtlarını çatıştırmadan aşağıdaki **dört A** kaydıyla güncelleyin:

| Tür | Ad/Host | Değer |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

`www` için `CNAME` → `must7y.github.io` (www. ön eki DNS sağlayıcısında genelde otomatik eklenir). GitHub Pages, doğru kurulumla `www` → kök alan adı yönlendirmesi yapabilir. Mevcut e-posta MX/TXT kayıtlarını **silme**; DNS değişimini eski hizmet çalışırken başlatma, önce GitHub dağıtımını test et. GitHub Pages'in alan adı doğrulama TXT kaydını hesabın verdiği gerçek değerle ekle; değer uydurma.

## Yayın sonrası kontrol

- `https://izmirlokmasi.com` ve `https://www.izmirlokmasi.com`: SSL / HTTPS, ana sayfa ve yönlendirme.
- `/izmir-lokmasi`, `/saray-lokmasi`, `/hayir-lokmasi`, `/mevlit-lokmasi`, `/iletisim`, `/gizlilik`, `/sitemap.xml`, `/robots.txt`, olmayan sayfalarda 404.
- Lokma fotoğrafları, menü, iki ürün, WhatsApp tıklaması, telefon bağlantısı; iOS/Android ve masaüstü.
- Arama motoru canonical ve sitemap URL'lerini kontrol et, Search Console'da yeni URL'leri doğrula.
- `npm run verify:live -- https://izmirlokmasi.com` testini geçiş sonrasında çalıştır; geçmiş Cloudflare başlık testleri GitHub Pages'te birebir geçmeyebilir.

## Güvenlik ve sınırlar

GitHub Pages statik HTML sunar. `public/_headers` Cloudflare Pages'e özgüdür; GitHub Pages bu kuralları uygulamaz. Bu yüzden CSP, X-Frame-Options, Cache-Control ve diğer yanıt başlıkları ayrı test edilmelidir. GitHub'ın kendi HTTPS özelliği etkinleştirilmeli, DNS'te güvenli alan adı doğrulaması yapılmalıdır. İstenen güvenlik başlıkları için Cloudflare üzerinden proxy ve header kuralı ayrı yönetilebilir.

**Henüz yapılmamış doğrulamalar:** Node sürümü ve çevrimdışı npm registry kısıtı nedeniyle burada `npm ci`, gerçek Astro build, canlı HTTP ve tarayıcı kontrolü çalıştırılamadı. Bunları GitHub Actions yayından önce denetler. Domain DNS'i veya GitHub Pages ayarları bu ZIP oluşturulurken değiştirilmedi.

*Kaynak: GitHub Pages ve Astro resmî belgeleri (Kasım 2026):*
- https://docs.astro.build/en/guides/deploy/github/
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## v2.9 otomatik kontroller ve ajansal olmayan bakim

- `.github/workflows/quality.yml`: her degisiklikte kaynak testleri, yapim, npm audit; sadece okuma yetkisi.
- `.github/workflows/github-pages.yml`: test ve audit basariliysa Pages yayini.
- `.github/dependabot.yml`: npm ve GitHub Actions icin guncelleme PR teklifleri; otomatik birlestirme yok.
- `.github/workflows/codeql.yml`: JavaScript/TypeScript icin CodeQL security-extended taramasi; GitHub public depoda kod tarama alarmlarini olusturur. Botun sadece guvenlik bulgularini yuklemek icin `security-events: write` yetkisi vardir.
- `.github/workflows/site-health.yml`: pazartesi sabah UTC 06:23'te HTTPS, ana sayfa, urun/hizmet sayfalari, sitemap ve hassas dosya yollarini kontrol eder. Basarisizlik `Actions` uzerinden gorulur. Yayindan once alan adi bos olacaksa gecici basarisizlik beklenir.
- `scripts/verify-live.mjs`: GitHub Pages modunda meta CSP ile HTTPS, link ve 404 kontrolu yapar; `--cloudflare-headers` yazilirsa onceki sunucu HTTP guvenlik basliklari da zorunlu olur.
- Cloudflare header dosyasi GitHub Pages'te etkin degildir. Meta CSP tek basina iframe/HTML guvenlik basliklarini veya sunucu WAF'ini saglamaz.
- Yorum, forum, form yoktur. Sonradan eklenirse spam korumasi yalniz istemci JavaScript'i ile kurulamaz.

Diger repo ve guvenlik araci eklerken kaynak, lisans ve bagimlilik riskini goz onunde bulundurun: AstroWind baslik bileseni MIT bildirimi korunur. Mevcut galerinin yerini almak icin ilave carousel paketi ve farkli bot kurmayin.

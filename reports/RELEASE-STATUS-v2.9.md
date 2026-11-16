# 16.11.2026 - v2.9 GitHub Pages hazirlik

- Kaynak: Drive v2.8 (hizmet bolgesini kisitlamayan surum).
- Ana sayfa tasarimi, fotograflar, hizmet sayfalari, telefon ve WhatsApp degismedi.
- GitHub Pages sunucu basliklarini desteklemedigi icin Layout'a tarayici duzeyinde CSP meta eklendi. Bu X-Frame-Options, HSTS ve diger HTTP basliklarinin yerini TAM olarak almaz. `public/_headers` ancak destekleyen hosting/proxy ortaminda etkilidir.
- Gizlilik metni, gercekten kullanilan WhatsApp/e-posta aktarimi ve sifir yorum/form alanina uygun hale getirildi. Hukuki aydinlatma tamligi, veri sorumlusu ve 3. taraf aktarimlari acisindan isletme tarafindan teyit gerektirir.
- Statik sitede yorum/forum/form olmadigindan spam giris noktasi YOK; dis WhatsApp mesaj spam'i site koduyla engellenemez. Oyle bir hizmet eklenirse sunucu dogrulamasi, rate limit, CAPTCHA/Turnstile ve moderasyon gerekir.
- GitHub Actions kalite, yayina alma kapisi, Dependabot onerileri korundu; haftalik sadece okuma yapan yayindaki site sagligi kontrolu ve public GitHub repo icin CodeQL JS/TS taramasi eklendi.
- Custom domain icin `public/CNAME` eklendi.
- Bunlar gercek bir yapay zeka ajani degil, sinirli otomatik test ve bagimlilik bakim is akislari.
- Kaynak testleri yerelde calistirilabilir. Tam `npm ci`, `npm run test:build`, `npm audit` ve canli mobil testler, uygun Node ve ag erisimli GitHub CI uzerinde gecmeden yayina alma tamamlanmis sayilmaz.
- GitHub depo olusturma/Pages ayarlama ve DNS degisikligi bu yazilim paketinde gerceklesmemistir.

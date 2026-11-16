import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const load = async (file) => readFile(new URL(file, root), 'utf8');
const publicImageNames = new Set(['hanifi-logo-vector-integrated.webp', 'hero-mixed-lokma.webp', 'lokma-real-appetizing.webp', 'saray-lokmasi-photo.webp', 'og-hanifi-usta.webp']);
const pages = ['src/pages/index.astro','src/pages/[service].astro','src/pages/gizlilik.astro','src/pages/iletisim.astro'];

test('Astro statik yayın, Node sürümü ve bağımlılıklar tutarlı', async () => {
  const pkg = JSON.parse(await load('package.json'));
  const lock = JSON.parse(await load('package-lock.json'));
  const astro = await load('astro.config.mjs');
  assert.deepEqual(Object.keys(pkg.dependencies), ['astro']);
  assert.match(pkg.dependencies.astro, /^\d+\.\d+\.\d+$/, 'Astro exact semver pin should be maintained');
  assert.equal(lock.packages[''].dependencies.astro, pkg.dependencies.astro);
  assert.equal(lock.packages['node_modules/astro'].version, pkg.dependencies.astro);
  assert.equal(lock.packages['node_modules/swiper'], undefined);
  assert.equal(pkg.engines.node, '>=22.23.4');
  assert.match(astro, /output:\s*['"]static['"]/);
  assert.doesNotMatch(astro, /adapter\s*:/);
  assert.match(astro, /inlineStylesheets:\s*['"]never['"]/);
});

test('Önceki framework, Worker, veritabanı ve kullanılmayan testler temiz', async () => {
  const files = await readdir(root, { withFileTypes: true });
  const names = files.map(f => f.name);
  for (const dead of ['app','components','drizzle','hooks','lib','build','worker','vendor','next.config.ts','vite.config.ts','eslint.config.mjs']) {
    assert.ok(!names.includes(dead), `${dead} kaldırılmalı`);
  }
  const contents = await Promise.all(pages.concat('src/components/LokmaSlider.astro', 'src/layouts/Layout.astro').map(load));
  for (const content of contents) assert.doesNotMatch(content,/\b(swiper|react|next\/|drizzle)\b/i);
});

test('Güvenlik başlıkları sıkı ve Cloudflare Pages biçiminde', async () => {
  const headers = await load('public/_headers');
  const line = headers.split('\n').find(s => s.trim().startsWith('Content-Security-Policy:')) ?? '';
  for (const expected of ["default-src 'none'", "script-src 'self'", "style-src 'self'", "script-src-attr 'none'", "style-src-attr 'none'", "frame-ancestors 'none'", "object-src 'none'", "base-uri 'none'"]) assert.ok(line.includes(expected), expected);
  assert.doesNotMatch(line,/unsafe-inline|unsafe-eval|https?:\/\//i);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /Cross-Origin-Opener-Policy: same-origin/);
  assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers, /\/_astro\/\*\s*\n(?:\s*Cross-Origin-Resource-Policy: same-origin\s*\n)?\s*Cache-Control: public, max-age=31536000, immutable/);
  assert.doesNotMatch(headers, /\/images\/\*[\s\S]*?immutable/);
  for(const line of headers.split('\n')) assert.ok(line.length <= 2000,'_headers satırı 2000 karakter sınırını geçiyor');
});

test('Yayımlanan görseller sınırlı, WebP ve boyutları denetlenmiş', async () => {
  const entries = await readdir(new URL('public/images/', root));
  assert.deepEqual(new Set(entries), publicImageNames);
  let total = 0;
  for (const name of entries) {
    const file = new URL(`public/images/${name}`,root);
    const bytes = await readFile(file);
    assert.equal(bytes.subarray(0,4).toString(),'RIFF');
    assert.equal(bytes.subarray(8,12).toString(),'WEBP');
    const size = (await stat(file)).size;
    assert.ok(size < 220000, `${name}: ${size} byte; hedefin üstünde`);
    total+=size;
  }
  assert.ok(total < 650000, `toplam fotoğraf bütçesi aşıldı: ${total}`);
});

test('Görünür sitenin fotoğraf bağlantıları ve alt metinleri mevcut', async () => {
  const source = (await Promise.all([load('src/pages/index.astro'),load('src/pages/[service].astro'),load('src/components/LokmaSlider.astro'),load('src/layouts/Layout.astro')])).join('\n');
  for (const name of publicImageNames) assert.ok(source.includes(name), `eksik görsel: ${name}`);
  assert.match(source,/alt=/);
  assert.match(source,/loading="lazy"/);
  assert.match(source,/fetchpriority="high"/);
});

test('Satır içi event handler, dış izleyici veya güvensiz kod çalıştırma yok', async () => {
  const source = (await Promise.all(pages.concat('src/layouts/Layout.astro','src/components/LokmaSlider.astro','src/data/site.ts','src/components/Headline.astro','public/js/site.js').map(load))).join('\n');
  assert.doesNotMatch(source,/\s(?:onclick|onerror|onload|onmouseover)\s*=/i);
  assert.doesNotMatch(source,/\beval\s*\(|\bnew Function\s*\(/);
  assert.doesNotMatch(source,/<iframe\b|google-analytics|gtag\(|facebook\.net\/.*pixel/i);
  assert.doesNotMatch(source,/target=["']_blank["']/i);
  assert.doesNotMatch(source,/swiper/i);
});

test('İletişim, resmi rotalar, gizlilik metni ve lisans bildirimleri korunmuş', async () => {
  const [info,privacy,notes,slider] = await Promise.all([load('src/data/site.ts'),load('src/pages/gizlilik.astro'),load('THIRD-PARTY-NOTICES.md'),load('src/components/LokmaSlider.astro')]);
  assert.match(info,/wa\.me\/905306902501/);
  assert.match(privacy,/temsili ürün görselleri/);
  assert.match(notes,/Ürün görselleri/);
  assert.match(notes,/MIT License/);
  assert.match(slider,/aria-controls=/);
  assert.match(await load('public/js/site.js'),/reduced-motion/);
});

test('Yayımlanabilir dizinde sır niteliğinde dosya bulunmuyor', async () => {
  const walk=async(dir)=>{
    for(const ent of await readdir(new URL(dir,root),{withFileTypes:true})){
      const relative = dir + ent.name;
      assert.doesNotMatch(ent.name, /^(\.env|\.git|\.npmrc|id_rsa|.*\.pem|.*\.key)$/i, relative);
      if(ent.isDirectory()) await walk(relative+'/');
    }
  };
  await walk('public/');
});

test('Script küçük bile olsa harici ve CSP uyumlu kalır', async () => {
  const layout=await load('src/layouts/Layout.astro');
  const js=await load('public/js/site.js');
  assert.match(layout, /<script is:inline src="\/js\/site\.js" defer><\/script>/);
  assert.doesNotMatch(layout,/<script>(?![\s\S]*?type="application\/ld\+json")/);
  assert.match(js,/getElementById\('lokma-track'\)/);
  assert.ok((await stat(new URL('public/js/site.js',root))).size < 4000);
});

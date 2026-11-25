import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const read = (p) => readFile(new URL(p, root), 'utf8');

test('GitHub Pages en azindan meta CSP ile tarayiciya kisit uygular', async()=>{
  const layout = await read('src/layouts/Layout.astro');
  assert.match(layout, /http-equiv="Content-Security-Policy"/);
  for(const directive of ["default-src 'none'", "script-src 'self'", "style-src 'self'", "form-action 'none'"]) assert.ok(layout.includes(directive));
  assert.doesNotMatch(layout, /unsafe-inline|unsafe-eval/);
});
test('yorum, form, hesap veya veri tabani giris noktasi bulunmaz', async()=>{
  const files=await readdir(new URL('src/pages/', root));
  assert.equal(files.filter(f=>/\.ts$/.test(f)).sort().join(','), 'robots.txt.ts,sitemap.xml.ts');
  const pages=await Promise.all(['src/pages/index.astro','src/pages/gizlilik.astro','src/pages/iletisim.astro','src/pages/[service].astro'].map(read));
  assert.doesNotMatch(pages.join('\n'), /<form\b|<textarea\b|<input\b|<iframe\b|disqus|utterances|giscus/i);
});
test('takip ajanlari yazma yetkisi almaz ve otomatik kod birlestirme yapmaz', async()=>{
  const health=await read('.github/workflows/site-health.yml');
  const dependabot=await read('.github/dependabot.yml');
  assert.match(health,/contents: read/);
  assert.doesNotMatch(health,/contents: write|issues: write|pull-requests: write|secrets\./i);
  assert.doesNotMatch(dependabot,/automerge|auto-merge/i);
});

test('ozel domain ve otomatik CodeQL guvenlik taramasi tanimli',async()=>{
  assert.equal((await read('public/CNAME')).trim(),'izmirlokmasi.com');
  const codeql=await read('.github/workflows/codeql.yml');
  assert.match(codeql,/javascript-typescript, actions/);
  assert.match(codeql,/languages: \$\{\{ matrix.language \}\}/);
  assert.match(codeql,/security-events: write/);
  assert.match(codeql,/github\/codeql-action\/analyze@[a-f0-9]{40}/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const read=(p)=>readFile(new URL('../'+p,import.meta.url),'utf8');

test('Kod ajanlari sifir yetkiyle baslar; formlar ve otomatik birlestirme yasak', async()=>{
  const s=await read('AGENTS.md');
  const deps=await read('.github/dependabot.yml');
  assert.match(s, /yorum, forum, değerlendirme, üyelik/);
  assert.match(s, /otomatik birleştirilmez/);
  assert.doesNotMatch(deps, /auto-merge|automerge/i);
});

test('CodeQL kodu ve GitHub Actions is akislarini ayri inceler', async()=>{
  const s=await read('.github/workflows/codeql.yml');
  assert.match(s,/javascript-typescript, actions/);
  assert.match(s,/languages: \$\{\{ matrix.language \}\}/);
  assert.match(s,/build-mode: none/);
  assert.match(s,/security-events: write/);
});

test('Yayin ve izleme ajanlari en az yetkiyle calisir',async()=>{
  for(const f of ['.github/workflows/quality.yml','.github/workflows/site-health.yml']){
    const s=await read(f);
    assert.match(s, /contents: read/);
    assert.doesNotMatch(s, /issues: write|contents: write|pull-requests: write|secrets\./i);
  }
  const deploy=await read('.github/workflows/github-pages.yml');
  assert.match(deploy,/pages: write/);
  assert.match(deploy,/id-token: write/);
  assert.match(deploy,/needs: build-and-check/);
  assert.doesNotMatch(deploy,/pull_request:/);
});

test('Astro dependency pin and lockfile same version, not fixed to a stale test string',async()=>{
  const pkg=JSON.parse(await read('package.json'));
  const lock=JSON.parse(await read('package-lock.json'));
  assert.equal(pkg.dependencies.astro,lock.packages['node_modules/astro'].version);
  assert.equal(pkg.dependencies.astro,lock.packages[''].dependencies.astro);
  assert.equal(pkg.version,lock.version);
  assert.equal(pkg.version,lock.packages[''].version);
});

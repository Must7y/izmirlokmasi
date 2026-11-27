import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm,symlink} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {sealRelease,verifyRelease} from '../scripts/release-integrity.mjs';
async function fixture(t){const root=await mkdtemp(path.join(os.tmpdir(),'lokma-release-'));t.after(()=>rm(root,{recursive:true,force:true}));await mkdir(path.join(root,'js'));await writeFile(path.join(root,'js/site.js'),'console.log("original")');await writeFile(path.join(root,'main.css'),'body{color:black}');await writeFile(path.join(root,'index.html'),'<link rel="stylesheet" href="/main.css"><script src="/js/site.js"></script>');return root;}
test('Browser assets receive integrity metadata; changed scripts, styles and HTML fail release verification',async t=>{
 const root=await fixture(t);await sealRelease(root);
 const html=await readFile(path.join(root,'index.html'),'utf8');assert.equal((html.match(/integrity="sha384-/g)||[]).length,2);
 for(const file of ['js/site.js','main.css','index.html']){const original=await readFile(path.join(root,file));await writeFile(path.join(root,file),'changed');await assert.rejects(verifyRelease(root),/mismatch/);await writeFile(path.join(root,file),original);}
 await writeFile(path.join(root,'unexpected.js'),'added');await assert.rejects(verifyRelease(root),/file set/);
});
test('External URLs, traversal, missing assets and symlinks cannot enter sealed releases',async t=>{
 const root=await fixture(t);
 for(const url of ['https://evil.example/a.js','//evil.example/a.js','/../secret.js','/%2e%2e/secret.js','/missing.js']){await writeFile(path.join(root,'index.html'),`<script src="${url}"></script>`);await assert.rejects(sealRelease(root));}
 await symlink(path.join(root,'js/site.js'),path.join(root,'linked.js'));await assert.rejects(sealRelease(root),/Symbolic links/);
});

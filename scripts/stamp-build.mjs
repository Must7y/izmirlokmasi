import {execFileSync} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
let revision=process.env.GITHUB_SHA || '';
if (!revision) {
  try { revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim(); }
  catch { revision='unknown'; }
}
if (revision!=='unknown' && !/^[a-f0-9]{40}$/.test(revision)) throw new Error('Invalid build revision');
let dirty=true;
try { dirty=Boolean(execFileSync('git',['status','--porcelain'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim()); }catch{}
await writeFile(new URL('../dist/build-info.json',import.meta.url),JSON.stringify({revision,dirty})+'\n');

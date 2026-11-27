import {createHash} from 'node:crypto';
import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const digest = bytes => 'sha384-'+createHash('sha384').update(bytes).digest('base64');
async function filesIn(root, directory=root) {
  const files=[];
  for(const entry of await readdir(directory,{withFileTypes:true})) {
    const file=path.join(directory,entry.name);
    if(entry.isSymbolicLink()) throw new Error('Symbolic links are not publishable');
    if(entry.isDirectory()) files.push(...await filesIn(root,file));
    else if(entry.isFile()) files.push(path.relative(root,file).split(path.sep).join('/'));
    else throw new Error('Unsupported release entry');
  }
  return files.sort();
}
function localAsset(value) {
  if (value.includes('?')) {
    const [pathname, query, extra] = value.split('?');
    if (extra !== undefined || !/^v=[a-f0-9]{12}$/.test(query)) throw new Error('Invalid asset version');
    value = pathname;
  }
  if(!/^\/(?!\/)[A-Za-z0-9_./-]+$/.test(value) || value.split('/').some(part=>part==='.'||part==='..')) throw new Error('Invalid local executable asset URL');
  return value.slice(1);
}
export async function sealRelease(root) {
  const files=await filesIn(root);
  for(const file of files.filter(file=>file.endsWith('.html'))) {
    const html=await readFile(path.join(root,file),'utf8');
    const tags=[...html.matchAll(/<(?:script|link)\b[^>]*>/gi)];
    let sealed=html;
    for(const [tag] of tags) {
      const isScript=/^<script\b/i.test(tag);
      if(!isScript&&!/\brel="stylesheet"/.test(tag)) continue;
      const value=tag.match(isScript?/\bsrc="([^"]+)"/:/\bhref="([^"]+)"/)?.[1];
      if(!value) {if(isScript&&/type="application\/ld\+json"/.test(tag))continue;throw new Error('Missing executable asset URL');}
      const asset=localAsset(value);
      if(!files.includes(asset)) throw new Error('Missing executable asset: '+asset);
      const bytes=await readFile(path.join(root,asset));
      const integrity=digest(bytes);
      const version=createHash('sha256').update(bytes).digest('hex').slice(0,12);
      const clean=tag.replace(/\s+(?:integrity|crossorigin)="[^"]*"/g,'').replace(value,`/${asset}?v=${version}`);
      sealed=sealed.replace(tag,clean.replace(/>$/,` integrity="${integrity}" crossorigin="anonymous">`));
    }
    await writeFile(path.join(root,file),sealed);
  }
  const records={};
  for(const file of files.filter(file=>file!=='release-manifest.json')) records[file]=digest(await readFile(path.join(root,file)));
  await writeFile(path.join(root,'release-manifest.json'),JSON.stringify({version:1,algorithm:'sha384',files:records},null,2)+'\n');
  return verifyRelease(root);
}
export async function verifyRelease(root) {
  const manifest=JSON.parse(await readFile(path.join(root,'release-manifest.json'),'utf8'));
  if(manifest.version!==1||manifest.algorithm!=='sha384'||!manifest.files||Array.isArray(manifest.files)) throw new Error('Invalid release manifest');
  const files=(await filesIn(root)).filter(file=>file!=='release-manifest.json');
  if(JSON.stringify(files)!==JSON.stringify(Object.keys(manifest.files).sort()))throw new Error('Release file set changed');
  for(const file of files)if(digest(await readFile(path.join(root,file)))!==manifest.files[file])throw new Error('Release integrity mismatch: '+file);
  return files.length;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  const root=path.resolve(import.meta.dirname,'../dist');
  const count=await (process.argv.includes('--verify')?verifyRelease(root):sealRelease(root));
  console.log(`PASS release integrity: ${count} files`);
}

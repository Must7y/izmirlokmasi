import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../public/js/site.js',import.meta.url),'utf8');
function fixture(mobile=false){
 const handlers=new Map();
 const control=()=>({disabled:false,addEventListener(name,fn){this[name]=fn;}});
 const previous=control(), next=control();
 const track={scrollLeft:0,clientWidth:500,querySelectorAll:()=>[{},{}],scrollTo({left}){this.scrollLeft=left;this.scroll?.();},addEventListener(name,fn){this[name]=fn;}};
 const document={querySelector(selector){return selector==='.lokma-prev'?previous:selector==='.lokma-next'?next:null;},getElementById:()=>track,querySelectorAll:()=>[]};
 const window={matchMedia:(query)=>({matches:query.includes('max-width')?mobile:true}),addEventListener(name,fn){handlers.set(name,fn)}};
 vm.runInNewContext(source,{document,window},{timeout:1000});
 return {track,previous,next,handlers};
}
test('masaüstü iki lokmalı galeri ileri geri ve klavye ile çalışır',()=>{
 const {track,previous,next}=fixture(false);
 assert.equal(previous.disabled,true); assert.equal(next.disabled,false);
 next.click(); assert.equal(track.scrollLeft,500);
 assert.equal(previous.disabled,false); assert.equal(next.disabled,true);
 previous.click(); assert.equal(track.scrollLeft,0);
 const e={target:track,key:'ArrowRight',preventDefault(){this.prevented=true;}};
 track.keydown(e);assert.equal(e.prevented,true);assert.equal(track.scrollLeft,500);
});
test('mobilde kartlar alt alta: gizli galeri butonları devre dışıdır',()=>{
 const {track,previous,next}=fixture(true);
 assert.equal(previous.disabled,true);assert.equal(next.disabled,true);
 next.click();assert.equal(track.scrollLeft,0);
});

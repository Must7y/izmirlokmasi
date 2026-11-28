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

test('floating contact leaves footer controls unobstructed when footer becomes visible', () => {
 const floating={hidden:false}; const footer={}; let notify;
 class Observer{constructor(callback){notify=callback;}observe(target){assert.equal(target,footer);}}
 const document={querySelector:(selector)=>selector==='footer'?footer:selector==='.floating-wa'?floating:null,getElementById:()=>null,querySelectorAll:()=>[]};
 const window={matchMedia:()=>({matches:true}),IntersectionObserver:Observer};
 vm.runInNewContext(source,{document,window,IntersectionObserver:Observer});
 notify([{isIntersecting:true}]);assert.equal(floating.hidden,true);
 notify([{isIntersecting:false}]);assert.equal(floating.hidden,false);
});

test('lokma progress clamps overscroll, coalesces scroll events and survives short pages',()=>{
 const handlers=new Map();const frames=[];let offset;const values={};
 const progress={setAttribute(name,value){values[name]=Number(value);offset=values.height;}};
 const document={documentElement:{scrollHeight:2400},querySelector:s=>s==='[data-scroll-progress]'?progress:null,querySelectorAll:()=>[],getElementById:()=>null};
 const window={innerHeight:800,scrollY:0,matchMedia:()=>({matches:true}),addEventListener:(name,fn)=>handlers.set(name,fn),requestAnimationFrame:fn=>frames.push(fn)};
 vm.runInNewContext(source,{document,window});assert.equal(offset,0);
 window.scrollY=800;handlers.get('scroll')();handlers.get('scroll')();assert.equal(frames.length,1);frames.shift()();assert.equal(offset,36);assert.equal(values.y,0);
 window.scrollY=3000;handlers.get('scroll')();frames.shift()();assert.equal(offset,72);assert.equal(values.y,0);
 window.scrollY=-100;handlers.get('scroll')();frames.shift()();assert.equal(offset,0);
 document.documentElement.scrollHeight=300;handlers.get('resize')();frames.shift()();assert.equal(offset,0);
});

test('syrup glint follows the colour boundary, stops on upward scroll and respects reduced motion',()=>{
 const handlers=new Map(),frames=[],animations=[],transforms=[];
 let reduce=false,cancelled=0;
 const glint={setAttribute:(key,value)=>transforms.push(value),animate:(keys,options)=>{animations.push(options);return {cancel(){cancelled++;}};}};
 const progress={setAttribute(){}};
 const document={documentElement:{scrollHeight:2400},querySelector:s=>s==='[data-scroll-progress]'?progress:s==='[data-scroll-glint]'?glint:null,querySelectorAll:()=>[],getElementById:()=>null};
 const window={innerHeight:800,scrollY:0,matchMedia:()=>({get matches(){return reduce;}}),addEventListener:(name,fn)=>handlers.set(name,fn),requestAnimationFrame:fn=>frames.push(fn)};
 vm.runInNewContext(source,{document,window});
 const scroll=y=>{window.scrollY=y;handlers.get('scroll')();frames.shift()();};
 assert.equal(animations.length,0);
 scroll(100);assert.equal(animations.length,0);
 scroll(400);assert.equal(animations.length,1);assert.equal(transforms.at(-1),'translate(0 18)');
 assert.equal(animations[0].duration,650);assert.equal(animations[0].iterations,undefined);
 scroll(200);assert.equal(animations.length,1);assert.equal(cancelled,1);
 reduce=true;scroll(800);assert.equal(animations.length,1);
 reduce=false;scroll(1600);assert.equal(animations.length,1);
});

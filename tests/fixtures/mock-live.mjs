// Offline CLI integration fixture. Every request is answered from the test build.
import {readFile} from 'node:fs/promises';
import {redirectChecks} from '../../scripts/live-policy.mjs';
const redirects=new Map(redirectChecks);
globalThis.fetch=async input=>{
  const url=new URL(input);
  if (redirects.has(url.href)) return new Response(null,{status:301,headers:{location:redirects.get(url.href)}});
  const headers={'x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff',
    'referrer-policy':'same-origin','permissions-policy':'camera=(), microphone=()'};
  if(url.pathname==='/build-info.json') return Response.json({revision:'a'.repeat(40),dirty:false},{headers});
  if (url.pathname.includes('..') || /^\/(?:\.|__|package\.json)/.test(url.pathname)) return new Response('',{status:404});
  const relative=url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
  try {
    const body=await readFile(new URL('../../dist'+relative,import.meta.url));
    const ext=relative.split('.').at(-1);
    headers['content-type']=({html:'text/html',js:'application/javascript',xml:'application/xml',txt:'text/plain',png:'image/png',ico:'image/x-icon',webp:'image/webp',svg:'image/svg+xml'})[ext] || 'application/octet-stream';
    return new Response(body,{headers});
  } catch {return new Response('',{status:404});}
};

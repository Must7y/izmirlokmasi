// Canonical pages shared by sitemap, navigation, schema and release checks.
// Dates describe substantive content changes, never the build date.
export const siteOrigin = 'https://izmirlokmasi.com';
export const contentRoutes = [
  {path:'/',label:'Ana sayfa',kind:'WebPage',indexable:true,updated:'2026-11-26'},
  {path:'/izmir-lokmasi/',label:'İzmir lokması',kind:'WebPage',service:true,indexable:true,updated:'2026-11-26'},
  {path:'/saray-lokmasi/',label:'Saray lokması',kind:'WebPage',service:true,indexable:true,updated:'2026-11-26'},
  {path:'/hayir-lokmasi/',label:'Hayır lokması',kind:'WebPage',service:true,indexable:true,updated:'2026-11-26'},
  {path:'/mevlit-lokmasi/',label:'Mevlit lokması',kind:'WebPage',service:true,indexable:true,updated:'2026-11-26'},
  {path:'/lokma-siparisi-rehberi/',label:'Sipariş rehberi',kind:'WebPage',article:true,indexable:true,updated:'2026-11-27'},
  {path:'/iletisim/',label:'İletişim',kind:'ContactPage',indexable:true,updated:'2026-11-26'},
  {path:'/gizlilik/',label:'Gizlilik',kind:'WebPage',indexable:false,updated:'2026-11-26'},
];

export const routeFor = path => contentRoutes.find(route=>route.path===path);

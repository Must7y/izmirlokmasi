// Canonical pages shared by sitemap, navigation, schema and release checks.
export const siteOrigin = 'https://izmirlokmasi.com';
export const contentRoutes = [
  {path:'/',label:'Ana sayfa',kind:'WebPage',indexable:true},
  {path:'/izmir-lokmasi/',label:'İzmir lokması',kind:'WebPage',service:true,indexable:true},
  {path:'/saray-lokmasi/',label:'Saray lokması',kind:'WebPage',service:true,indexable:true},
  {path:'/hayir-lokmasi/',label:'Hayır lokması',kind:'WebPage',service:true,indexable:true},
  {path:'/mevlit-lokmasi/',label:'Mevlit lokması',kind:'WebPage',service:true,indexable:true},
  {path:'/lokma-siparisi-rehberi/',label:'Sipariş rehberi',kind:'WebPage',article:true,indexable:true},
  {path:'/iletisim/',label:'İletişim',kind:'ContactPage',indexable:true},
  {path:'/gizlilik/',label:'Gizlilik',kind:'WebPage',indexable:false},
];

export const routeFor = path => contentRoutes.find(route=>route.path===path);

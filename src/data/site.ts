export function whatsappForService(serviceName?: string) {
  const subject = serviceName ? `${serviceName} için` : 'lokma hizmeti için';
  const message = `Merhaba Hanifi Usta, ${subject} bilgi ve teklif almak istiyorum.\nTarih:\nKonum (il/ilçe):\nYaklaşık kişi sayısı:\nİkrama başlama saati:`;
  return `https://wa.me/905306902501?text=${encodeURIComponent(message)}`;
}
export const whatsapp=whatsappForService();
export const services=[
{slug:'izmir-lokmasi',name:'İzmir lokması',tag:'Bildiğiniz halka lokma',body:'Ortası delik halka lokma, şerbetiyle buluşup ikrama hazır olur. Hayır, mevlit ve özel günlerde tercih edebilirsiniz. Hazırlık ve servis koşullarını organizasyon yerine göre birlikte netleştiriyoruz.'},
{slug:'saray-lokmasi',name:'Saray lokması',tag:'Küçük, yuvarlak lokmalar',body:'Saray lokması küçük ve yuvarlak hazırlanır. Halka lokmaya alternatif arayanlar için. Kişi sayısı, tarih ve adres bilgisiyle organizasyonunuza uygun ikramı planlayabiliriz.'},
{slug:'hayir-lokmasi',name:'Hayır lokması',tag:'Paylaşmak için bir araya',body:'Hayır lokması dağıtmak için tarihi, dağıtım yerini ve yaklaşık kişi sayısını paylaşın. Yerinde döküm için alanın uygunluğunu ve ikrama başlama saatini birlikte netleştirelim.'},
{slug:'mevlit-lokmasi',name:'Mevlit lokması',tag:'Misafirlerinize lokma ikramı',body:'Mevlit sonrası lokma ikramı için programın tahmini bitiş saatini ve misafir sayısını paylaşın. İzmir lokması veya saray lokması tercihinize göre servis saatini ve teklifi birlikte netleştirelim.'}
];

// Sayfa metni ve metadata ayrı tutulur; fiyat/kapasite gibi doğrulanmamış vaatler eklenmez.
export const serviceDetails = {
  'izmir-lokmasi': {
    title: 'İstanbul’da İzmir Lokması Siparişi',
    heading: 'İzmir lokması dökümü',
    description: 'İstanbul’da İzmir lokması siparişi ve yerinde halka lokma dökümü için Hanifi Usta ile görüşün. Tarih, konum ve kişi sayısını paylaşarak teklif alın.',
    orderTitle: 'İstanbul’da İzmir lokması siparişi',
    orderText: 'İzmir lokması, tatlının halka biçimini anlatır. İstanbul’da halka lokma siparişi vermek için organizasyon tarihini, adresini ve yaklaşık kişi sayısını paylaşın. Hayır veya mevlit için lokma döktürmek istediğinizde ikram saatini de belirtin. Konuma göre hazırlık alanını ve hizmet uygunluğunu birlikte değerlendirelim.',
    planningTitle: 'Halka lokma ikramı nasıl planlanır?',
    planning: 'İzmir lokması ortası delik halka biçimindedir. İkram için bu biçimi tercih ediyorsanız mesajınızda halka lokma istediğinizi belirtin. Tarih, konum, yaklaşık kişi sayısı ve ikrama başlamak istediğiniz saat üzerinden hazırlık ve servis koşullarını birlikte konuşalım.',
    questions: [
      ['İzmir lokması ile saray lokması aynı mı?', 'İzmir lokması halka, saray lokması küçük ve yuvarlak biçimindedir. Hangi lokmayı istediğinizi teklif alırken belirtebilirsiniz.'],
      ['Lokma döktürme fiyatını nasıl öğrenebilirim?', 'Tarih, organizasyon adresi, kişi sayısı ve lokma tercihinizi iletin. Güncel teklif, hazırlık ve servis koşulları görüşüldükten sonra netleşir.'],
      ['300 veya 500 kişilik lokma fiyatını nasıl öğrenebilirim?', 'Planladığınız kişi sayısını, tarihi ve İstanbul’daki organizasyon konumunu iletin. İkram miktarını, servis kapsamını ve o gün için uygunluğu birlikte teyit ederek güncel teklif isteyin.'],
      ['Lokma siparişi internetten kesinleşiyor mu?', 'Sitedeki bağlantı WhatsApp görüşmesini açar. Mesaj göndermek siparişin kesinleştiği anlamına gelmez; müsaitlik, teklif ve servis planını Hanifi Usta ile teyit edin.'],
    ],
  },
  'saray-lokmasi': {
    title: 'İstanbul Saray Lokması Siparişi ve İkramı',
    heading: 'Saray lokması siparişi',
    description: 'İstanbul ve çevre illerde saray lokması siparişi için Hanifi Usta ile görüşün. Hayır, mevlit ve özel günlerde yuvarlak lokma ikramı için teklif alın.',
    orderTitle: 'Yuvarlak lokma siparişi verirken',
    orderText: 'Saray lokması siparişi, halka yerine küçük ve yuvarlak lokma ikram etmek isteyenler içindir. İstanbul ve çevre illerdeki organizasyonunuz için lokma türünü, tarihi, adresi ve tahmini misafir sayısını mesajınıza ekleyin. Aynı etkinlikte farklı lokma çeşitleri düşünüyorsanız tercihlerinizi teklif aşamasında konuşalım.',
    planningTitle: 'Saray lokmasını ne zaman tercih edebilirsiniz?',
    planning: 'Halka yerine küçük ve yuvarlak lokma ikram etmek istediğinizde saray lokmasını seçebilirsiniz. Hayır, mevlit veya özel gün programınız için tercih ettiğiniz lokma türünü, tarihi ve misafir sayısını belirtin. Hazırlık alanını ve servis saatini organizasyon yerine göre birlikte değerlendirelim.',
    questions: [
      ['Saray lokmasının şekli nasıldır?', 'Saray lokması küçük ve yuvarlak hazırlanır. Ortası delik halka biçimini istiyorsanız İzmir lokması sayfasını inceleyebilirsiniz.'],
      ['Saray lokması fiyatları nasıl belirlenir?', 'Organizasyon tarihini, adresini, yaklaşık kişi sayısını ve saray lokması istediğinizi yazın. Güncel teklif ile müsaitliği birlikte netleştirelim.'],
      ['Hayır veya mevlit için saray lokması seçebilir miyim?', 'Yuvarlak lokma tercih ediyorsanız teklif isterken saray lokması istediğinizi belirtin. İkram ve servis koşullarını organizasyonunuza göre görüşelim.'],
    ],
  },
  'hayir-lokmasi': {
    title: 'İstanbul Hayır Lokması Döktürme ve Sipariş',
    heading: 'İstanbul’da hayır lokması döktürme',
    description: 'İstanbul’da hayır lokması döktürme ve lokma dağıtımı için tarih, konum ve kişi sayısını paylaşın. Hanifi Usta’dan yerinde lokma dökümü için teklif alın.',
    orderTitle: 'Hayır lokması siparişi ve dağıtım planı',
    orderText: 'Hayır için lokma döktürmek istediğinizde dağıtım yerini ve saatini belirleyerek başlayın. İstanbul’da hayır lokması siparişi verirken konumu, tarihi, kişi sayısını ve halka ya da yuvarlak lokma tercihinizi iletin. Lokma dağıtımının yapılacağı alandaki erişimi ve hazırlık koşullarını önceden görüşelim; yerle ilgili izin gerekip gerekmediğini organizasyon öncesinde netleştirin.',
    planningTitle: 'Hayır lokması dağıtımı için neler gerekir?',
    planning: 'Hayır lokması dağıtımında önce tarihi, dağıtım yerini ve yaklaşık kişi sayısını belirleyin. Halka İzmir lokması veya yuvarlak saray lokması tercihinizi iletin. İkrama başlama saatini ve yerinde hazırlık için alanın uygunluğunu birlikte değerlendirelim.',
    questions: [
      ['Hayır lokması için hangi lokma seçilebilir?', 'Halka İzmir lokması veya küçük, yuvarlak saray lokmasını tercih edebilirsiniz. Seçiminizi teklif isterken belirtin.'],
      ['Hayır lokması döktürme fiyatları neye göre değişir?', 'Kişi sayısı, tarih, konum ve hazırlık koşulları teklifin belirlenmesinde kullanılır. Sitede sabit bir fiyat listesi yerine organizasyonunuza göre güncel teklif verilir.'],
      ['Lokma hayrı için ne zaman iletişime geçmeliyim?', 'Tarih ve dağıtım yeri belli olduğunda müsaitliği sorun. Kesin servis saatini ve siparişin onaylandığını doğrudan görüşmede teyit edin.'],
    ],
  },
  'mevlit-lokmasi': {
    title: 'İstanbul Mevlit Lokması Siparişi ve Dökümü',
    heading: 'Mevlit için lokma ikramı',
    description: 'İstanbul ve çevre illerde mevlit lokması siparişi verin. Mevlüt sonrası lokma ikramı için tarih, konum ve misafir sayısıyla Hanifi Usta’dan teklif alın.',
    orderTitle: 'Mevlüt için lokma siparişi',
    orderText: 'Mevlit programında ikramın ne zaman başlayacağı, sipariş planının bir parçasıdır. Programın tahmini bitiş saatiyle birlikte adresi ve misafir sayısını paylaşın. İstanbul’da mevlit için lokma döktürmek istediğinizde halka İzmir lokması veya saray lokması tercihinizi belirtin; servis ayrıntılarını programınıza göre görüşelim.',
    planningTitle: 'Mevlit sonrası ikram saati nasıl planlanır?',
    planning: 'Mevlit için lokma siparişi verirken programın tahmini bitiş saatini belirtin. Organizasyon adresi ve misafir sayısıyla birlikte bu bilgi, hazırlık ve ikram saatini görüşmemizi sağlar. Halka İzmir lokması veya yuvarlak saray lokması tercihinizi mesajınıza ekleyin.',
    questions: [
      ['Mevlit için ne zaman iletişime geçmeliyim?', 'Tarih ve konum belli olduğunda müsaitliği sorabilirsiniz. Siparişin kesinleşmesini ve servis ayrıntılarını doğrudan Hanifi Usta ile görüşün.'],
      ['Programın saati henüz kesin değilse ne yazmalıyım?', 'Planladığınız tarihi, konumu, kişi sayısını ve tahmini bitiş saatini paylaşın. Kesinleşmeyen saat bilgisini de mesajınızda belirtin.'],
      ['Mevlit lokması döktürme fiyatını nasıl öğrenebilirim?', 'Misafir sayısı, tarih, adres ve lokma türünü ileterek güncel teklif isteyin. Program bitiş saatini de paylaşmanız servis planını görüşmemize yardımcı olur.'],
    ],
  },
};

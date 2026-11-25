export const whatsapp='https://wa.me/905306902501?text=Merhaba%20Hanifi%20Usta%2C%20lokma%20hizmeti%20i%C3%A7in%20bilgi%20almak%20istiyorum.';
export const services=[
{slug:'izmir-lokmasi',name:'İzmir lokması',tag:'Bildiğiniz halka lokma',body:'Ortası delik halka lokma, şerbetiyle buluşup ikrama hazır olur. Hayır, mevlit ve özel günlerde tercih edebilirsiniz. Hazırlık ve servis koşullarını organizasyon yerine göre birlikte netleştiriyoruz.'},
{slug:'saray-lokmasi',name:'Saray lokması',tag:'Küçük, yuvarlak lokmalar',body:'Saray lokması küçük ve yuvarlak hazırlanır. Halka lokmaya alternatif arayanlar için. Kişi sayısı, tarih ve adres bilgisiyle organizasyonunuza uygun ikramı planlayabiliriz.'},
{slug:'hayir-lokmasi',name:'Hayır lokması',tag:'Paylaşmak için bir araya',body:'Hayır lokması dağıtmak için tarihi, dağıtım yerini ve yaklaşık kişi sayısını paylaşın. Yerinde döküm için alanın uygunluğunu ve ikrama başlama saatini birlikte netleştirelim.'},
{slug:'mevlit-lokmasi',name:'Mevlit lokması',tag:'Misafirlerinize lokma ikramı',body:'Mevlit sonrası lokma ikramı için programın tahmini bitiş saatini ve misafir sayısını paylaşın. İzmir lokması veya saray lokması tercihinize göre servis saatini ve teklifi birlikte netleştirelim.'}
];

// Sayfa metni ve metadata ayrı tutulur; fiyat/kapasite gibi doğrulanmamış vaatler eklenmez.
export const serviceDetails = {
  'izmir-lokmasi': {
    title: 'İzmir Lokması | Halka Lokma Dökümü',
    heading: 'İzmir lokması dökümü',
    description: 'Halka İzmir lokması için yerinde döküm planlayın. Hayır, mevlit ve özel günlerde tarih, konum ve kişi sayısını Hanifi Usta ile paylaşarak teklif alın.',
    planningTitle: 'Halka lokma ikramı nasıl planlanır?',
    planning: 'İzmir lokması ortası delik halka biçimindedir. İkram için bu biçimi tercih ediyorsanız mesajınızda halka lokma istediğinizi belirtin. Tarih, konum, yaklaşık kişi sayısı ve ikrama başlamak istediğiniz saat üzerinden hazırlık ve servis koşullarını birlikte konuşalım.',
    questions: [
      ['İzmir lokması ile saray lokması aynı mı?', 'İzmir lokması halka, saray lokması küçük ve yuvarlak biçimindedir. Hangi lokmayı istediğinizi teklif alırken belirtebilirsiniz.'],
      ['İzmir lokması fiyatını nasıl öğrenebilirim?', 'Tarih, organizasyon adresi, kişi sayısı ve lokma tercihinizi iletin. Uygunluk ve güncel teklif bu bilgiler üzerinden netleşir.'],
    ],
  },
  'saray-lokmasi': {
    title: 'Saray Lokması | Yuvarlak Lokma İkramı',
    heading: 'Saray lokması ikramı',
    description: 'Küçük ve yuvarlak saray lokması ikramını Hanifi Usta ile planlayın. Tarih, adres ve kişi sayısını paylaşarak yerinde hazırlık ve güncel teklif için bilgi alın.',
    planningTitle: 'Saray lokmasını ne zaman tercih edebilirsiniz?',
    planning: 'Halka yerine küçük ve yuvarlak lokma ikram etmek istediğinizde saray lokmasını seçebilirsiniz. Hayır, mevlit veya özel gün programınız için tercih ettiğiniz lokma türünü, tarihi ve misafir sayısını belirtin. Hazırlık alanını ve servis saatini organizasyon yerine göre birlikte değerlendirelim.',
    questions: [
      ['Saray lokmasının şekli nasıldır?', 'Saray lokması küçük ve yuvarlak hazırlanır. Ortası delik halka biçimini istiyorsanız İzmir lokması sayfasını inceleyebilirsiniz.'],
      ['Teklif isterken hangi bilgileri vermeliyim?', 'Organizasyon tarihini, adresini, yaklaşık kişi sayısını ve saray lokması istediğinizi yazın. Müsaitlik ve servis koşullarını birlikte netleştirelim.'],
    ],
  },
  'hayir-lokmasi': {
    title: 'Hayır Lokması | Yerinde Lokma Döktürme',
    heading: 'Hayır lokması dökümü',
    description: 'Hayır lokması döktürmek için dağıtım yeri, tarih ve kişi sayısını paylaşın. Hanifi Usta ile İzmir veya saray lokması ikramını ve güncel teklifi görüşün.',
    planningTitle: 'Hayır lokması dağıtımı için neler gerekir?',
    planning: 'Hayır lokması dağıtımında önce tarihi, dağıtım yerini ve yaklaşık kişi sayısını belirleyin. Halka İzmir lokması veya yuvarlak saray lokması tercihinizi iletin. İkrama başlama saatini ve yerinde hazırlık için alanın uygunluğunu birlikte değerlendirelim.',
    questions: [
      ['Hayır lokması için hangi lokma seçilebilir?', 'Halka İzmir lokması veya küçük, yuvarlak saray lokmasını tercih edebilirsiniz. Seçiminizi teklif isterken belirtin.'],
      ['Dağıtım saati nasıl belirlenir?', 'Dağıtıma başlamak istediğiniz saati ve konumu paylaşın. Hazırlık ve servis koşulları ile müsaitliği birlikte görüşelim.'],
    ],
  },
  'mevlit-lokmasi': {
    title: 'Mevlit Lokması | Mevlit Sonrası Lokma İkramı',
    heading: 'Mevlit için lokma ikramı',
    description: 'Mevlit sonrası lokma ikramı için programın bitiş saatini, konumu ve misafir sayısını paylaşın. Hanifi Usta ile lokma türünü ve servis planını netleştirin.',
    planningTitle: 'Mevlit sonrası ikram saati nasıl planlanır?',
    planning: 'Mevlit için lokma siparişi verirken programın tahmini bitiş saatini belirtin. Organizasyon adresi ve misafir sayısıyla birlikte bu bilgi, hazırlık ve ikram saatini görüşmemizi sağlar. Halka İzmir lokması veya yuvarlak saray lokması tercihinizi mesajınıza ekleyin.',
    questions: [
      ['Mevlit için ne zaman iletişime geçmeliyim?', 'Tarih ve konum belli olduğunda müsaitliği sorabilirsiniz. Siparişin kesinleşmesini ve servis ayrıntılarını doğrudan Hanifi Usta ile görüşün.'],
      ['Programın saati henüz kesin değilse ne yazmalıyım?', 'Planladığınız tarihi, konumu, kişi sayısını ve tahmini bitiş saatini paylaşın. Kesinleşmeyen saat bilgisini de mesajınızda belirtin.'],
    ],
  },
};

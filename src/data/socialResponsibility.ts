// Sosyal Sorumluluk Projeleri - Araştırma Verileri ve Bilgiler

export interface OrganizationInfo {
  name: string
  logo: string
  description: string
  website: string
  certifications: string[]
  partnershipType: string
  benefits: string[]
}

export interface SSPSlogan {
  text: string
  category: 'motivational' | 'impact' | 'call-to-action' | 'emotional'
  icon: string
}

// OGM (Orman Genel Müdürlüğü) Bilgileri
export const OGM_INFO: OrganizationInfo = {
  name: 'Orman Genel Müdürlüğü (OGM)',
  logo: '🌲',
  description: 'Türkiye Cumhuriyeti Tarım ve Orman Bakanlığı\'na bağlı, ülkemizin orman kaynaklarını koruma ve geliştirme görevini yürüten resmi kuruluştur.',
  website: 'https://www.ogm.gov.tr',
  certifications: [
    'Resmi Devlet Kurumu',
    'ISO 9001 Kalite Yönetim Sistemi',
    'ISO 14001 Çevre Yönetim Sistemi',
    'PEFC Sertifikası (Sürdürülebilir Orman Yönetimi)'
  ],
  partnershipType: 'Resmi İşbirliği - Ağaçlandırma Protokolü',
  benefits: [
    '📜 Dijital Fidan Dikim Sertifikası',
    '🗺️ GPS Koordinatları ile Takip',
    '📸 Dikilen Fidanın Fotoğrafı',
    '🌳 Gerçek Arazi Üzerinde Ağaçlandırma',
    '📊 Yıllık Gelişim Raporları',
    '🎖️ OGM Onaylı Resmi Belge'
  ]
}

// TEMA Vakfı Bilgileri
export const TEMA_INFO: OrganizationInfo = {
  name: 'TEMA Vakfı',
  logo: '🌿',
  description: 'Türkiye Erozyonla Mücadele, Ağaçlandırma ve Doğal Varlıkları Koruma Vakfı. 1992\'den beri çevre koruma alanında faaliyet gösteren Türkiye\'nin önde gelen STK\'larından biridir.',
  website: 'https://www.tema.org.tr',
  certifications: [
    'TEMA Gönüllüsü Sertifikası',
    'Fidan Bağış Belgesi',
    'Kurumsal Sosyal Sorumluluk Ortağı',
    'Uluslararası Tanınırlık'
  ],
  partnershipType: 'STK İşbirliği - Ağaçlandırma Kampanyaları',
  benefits: [
    '🌱 TEMA Fidan Bağış Sertifikası',
    '🏆 Gönüllü Rozetleri ve Ödüller',
    '📱 Mobil Takip Sistemi',
    '🌍 Küresel Etki Raporlaması',
    '👥 TEMA Topluluğuna Katılım',
    '📧 Özel Kampanya Duyuruları'
  ]
}

// Su Bağışı Kuruluşları
export const WATER_ORGANIZATIONS = [
  {
    name: 'Su Vakfı',
    logo: '💧',
    description: 'Türkiye\'de su kaynaklarını koruma ve temiz suya erişim sağlama çalışmaları yapan vakıf.',
    focus: 'Su Kuyusu, Su Arıtma, Dağıtım'
  },
  {
    name: 'Kızılay',
    logo: '❤️',
    description: 'Acil durumlarda ve ihtiyaç bölgelerinde su dağıtımı yapan uluslararası insani yardım kuruluşu.',
    focus: 'Acil Su Yardımı, Afet Bölgeleri'
  }
]

// Hayvan Hakları Kuruluşları
export const ANIMAL_ORGANIZATIONS = [
  {
    name: 'Haytap',
    logo: '🐾',
    description: 'Hayvan hakları koruma ve bilinçlendirme vakfı. Sokak hayvanlarına mama ve tedavi desteği.',
    focus: 'Mama Bağışı, Tedavi, Barınak'
  },
  {
    name: 'Türkiye Hayvan Hakları Federasyonu',
    logo: '🐕',
    description: 'Türkiye genelinde hayvan hakları savunuculuğu yapan federasyon.',
    focus: 'Yasal Haklar, Koruma, Sahiplendirme'
  }
]

// Eğitim Kuruluşları
export const EDUCATION_ORGANIZATIONS = [
  {
    name: 'Çağdaş Yaşamı Destekleme Derneği (ÇYDD)',
    logo: '📚',
    description: 'Türkiye\'nin en köklü eğitim vakıflarından. Öğrencilere burs ve kırtasiye desteği sağlar.',
    website: 'https://www.cydd.org.tr',
    focus: 'Burs, Kırtasiye, Eğitim Desteği'
  },
  {
    name: 'Eğitim Gönüllüleri Vakfı (TEGV)',
    logo: '🎒',
    description: 'Eğitim fırsatı bulamayan çocuklar için eğitim programları ve malzeme desteği.',
    website: 'https://www.tegv.org',
    focus: 'Okul Malzemesi, Eğitim Programları'
  },
  {
    name: 'Milli Eğitim Bakanlığı',
    logo: '🏫',
    description: 'Devletin resmi eğitim kurumu. İhtiyaç sahibi öğrencilere direkt destek.',
    website: 'https://www.meb.gov.tr',
    focus: 'Resmi Burs, Kırtasiye Dağıtımı'
  }
]

// Sağlık Kuruluşları
export const HEALTH_ORGANIZATIONS = [
  {
    name: 'İHH İnsani Yardım Vakfı',
    logo: '💊',
    description: 'İhtiyaç sahiplerine ilaç ve tıbbi cihaz desteği sağlayan vakıf.',
    website: 'https://www.ihh.org.tr',
    focus: 'İlaç Bağışı, Tıbbi Malzeme, Tedavi Desteği'
  },
  {
    name: 'Sağlık Bakanlığı',
    logo: '🏥',
    description: 'Devletin resmi sağlık kurumu. İlaç ve tedavi destekleri.',
    website: 'https://www.saglik.gov.tr',
    focus: 'Resmi Sağlık Desteği'
  },
  {
    name: 'Türk Kızılay',
    logo: '❤️',
    description: 'Acil durumlarda kan, ilaç ve tıbbi malzeme desteği.',
    website: 'https://www.kizilay.org.tr',
    focus: 'Acil Sağlık, İlaç, Kan Bağışı'
  }
]

// Gıda Yardım Kuruluşları
export const FOOD_ORGANIZATIONS = [
  {
    name: 'Türk Kızılay',
    logo: '🍲',
    description: 'Türkiye\'nin en büyük gıda yardım kuruluşu. Kumanya ve sıcak yemek dağıtımı.',
    website: 'https://www.kizilay.org.tr',
    focus: 'Gıda Kolisi, Sıcak Yemek'
  },
  {
    name: 'Gıda Bankası',
    logo: '🏪',
    description: 'Fazla gıdaları toplayıp ihtiyaç sahiplerine ulaştıran organizasyon.',
    website: 'https://www.gidabankasi.org.tr',
    focus: 'Gıda İsrafı Önleme, Dağıtım'
  },
  {
    name: 'Halk Ekmek',
    logo: '🍞',
    description: 'Belediyelerin sosyal destek programı. Ucuz ekmek ve gıda.',
    focus: 'Temel Gıda, Ekmek'
  }
]

// Kırtasiye Bağışı Detaylı Bilgiler
export const STATIONARY_DONATION_DETAILS = {
  name: 'Kırtasiye Bağışı Projesi',
  emoji: '📚',
  description: 'Maddi imkansızlıklar nedeniyle okul malzemelerine erişemeyen öğrencilere eğitim desteği sağlama projesi.',
  targetAudience: 'İlkokul, ortaokul ve lise öğrencileri',
  packages: {
    basic: {
      name: 'Temel Kırtasiye Paketi',
      cost: 2000,
      includes: [
        '10 adet defter (kareli, çizgili)',
        '1 set kalem (tükenmez, kurşun kalem)',
        '1 silgi ve kalemtıraş',
        '1 cetvel ve gönye',
        '1 makas'
      ]
    },
    standard: {
      name: 'Standart Okul Paketi',
      cost: 4000,
      includes: [
        'Temel kırtasiye paketi',
        '1 okul çantası',
        '1 kalemlik',
        '1 boya kalemi seti (12\'li)',
        '1 sulu boya seti'
      ]
    },
    premium: {
      name: 'Tam Donanımlı Paket',
      cost: 8000,
      includes: [
        'Standart okul paketi',
        '1 geometri seti',
        '1 Türkçe sözlük',
        '5 adet yardımcı kitap',
        '1 şarjlı hesap makinesi'
      ]
    }
  },
  impact: {
    student: 'Bir öğrenci tüm dönem eğitime kesintisiz devam edebilir',
    family: 'Ailenin ekonomik yükü 300-500 TL azalır',
    education: 'Eğitim fırsatı eşitliği sağlanır',
    psychology: 'Öğrencinin özgüveni ve motivasyonu artar'
  },
  statistics: {
    studentsHelped: 12456,
    schoolsReached: 234,
    citiesCovered: 78,
    totalValue: '2.4M TL'
  }
}

// Su Bağışı Detaylı Bilgiler
export const WATER_DONATION_DETAILS = {
  name: 'Temiz Su Projesi',
  emoji: '💧',
  description: 'Temiz ve güvenli içme suyuna erişimi olmayan bölgelerdeki insanlara su sağlama projesi.',
  projects: {
    monthly: {
      name: 'Aylık Su Desteği',
      cost: 5000,
      impact: '1 kişinin 1 aylık temiz su ihtiyacı',
      details: 'Günlük 10 litre temiz içme suyu'
    },
    well: {
      name: 'Su Kuyusu',
      cost: 50000,
      impact: 'Bir köy kalıcı temiz suya kavuşur',
      details: '100-500 kişinin sürekli su ihtiyacı'
    },
    filter: {
      name: 'Su Arıtma Cihazı',
      cost: 15000,
      impact: 'Bir okul/cami/köy evi arıtılmış su kullanır',
      details: 'Günlük 1000 litre arıtma kapasitesi'
    }
  },
  importance: [
    'Su, yaşamın temelidir',
    'Temiz su birçok hastalığı önler',
    'Çocukların okula gitmesini sağlar',
    'Kadınların zamanını kurtarır',
    'Toplum sağlığını iyileştirir'
  ],
  statistics: {
    peopleHelped: 45632,
    wellsBuilt: 87,
    litersProvided: 2345678,
    villagesReached: 145
  }
}

// Sağlık Desteği Detaylı Bilgiler
export const HEALTH_SUPPORT_DETAILS = {
  name: 'Sağlık Destek Projesi',
  emoji: '💊',
  description: 'Maddi yetersizlikler nedeniyle ilaç ve tıbbi cihaz alamayan hastalara destek sağlama projesi.',
  services: {
    medicine: {
      name: 'İlaç Desteği',
      cost: 6000,
      duration: '1 ay',
      coverage: 'Kronik hastalık ilaçları',
      diseases: ['Diyabet', 'Tansiyon', 'Kalp', 'Astım', 'Tiroid']
    },
    medicalDevice: {
      name: 'Tıbbi Cihaz',
      items: [
        { name: 'Tekerlekli Sandalye', cost: 15000 },
        { name: 'Yürüteç', cost: 3000 },
        { name: 'Hasta Yatağı', cost: 8000 },
        { name: 'Tansiyon Aleti', cost: 1500 },
        { name: 'Şeker Ölçüm Cihazı', cost: 2000 }
      ]
    },
    treatment: {
      name: 'Tedavi Desteği',
      cost: 10000,
      coverage: 'Ameliyat ve tedavi masrafları',
      note: 'Devlet desteği alamayan hastalara'
    }
  },
  impact: {
    health: 'Hastaların yaşam kalitesi artar',
    economy: 'Ailelerin ekonomik yükü azalır',
    social: 'Hastaların sosyal hayata katılımı sağlanır',
    psychology: 'Psikolojik destek ve umut verir'
  },
  statistics: {
    patientsHelped: 3456,
    medicineMonths: 12345,
    wheelchairsProvided: 234,
    totalValue: '5.6M TL'
  }
}

// Gıda Yardımı Detaylı Bilgiler
export const FOOD_SUPPORT_DETAILS = {
  name: 'Gıda Yardım Projesi',
  emoji: '🍲',
  description: 'Gıda güvencesi olmayan ailelere temel gıda ihtiyaçlarını karşılama desteği sağlama projesi.',
  packages: {
    weekly: {
      name: 'Haftalık Gıda Paketi',
      cost: 3500,
      serves: '4 kişilik aile - 7 gün',
      contents: [
        'Un, pirinç, makarna (toplam 5 kg)',
        'Yağ (2 litre)',
        'Şeker, tuz (1\'er kg)',
        'Konserve ürünler (5 adet)',
        'Bakliyat (2 kg)',
        'Çay, kahve',
        'Temizlik malzemesi'
      ]
    },
    monthly: {
      name: 'Aylık Gıda Kolisi',
      cost: 12000,
      serves: '4 kişilik aile - 30 gün',
      contents: [
        'Temel gıda maddeleri (20 kg)',
        'Et/tavuk (3 kg)',
        'Süt ve süt ürünleri',
        'Sebze-meyve paketi',
        'Konserve ve hazır yemek',
        'Bebek maması (gerekirse)',
        'Hijyen ve temizlik paketi'
      ]
    },
    hotMeal: {
      name: 'Sıcak Yemek',
      cost: 500,
      serves: '1 kişi - 1 öğün',
      description: 'Günlük sıcak yemek desteği (çorba, ana yemek, pilav)'
    }
  },
  urgency: 'Acil İhtiyaç - Temel İnsan Hakkı',
  impact: {
    immediate: 'Aileler aç kalmaz',
    health: 'Beslenme kalitesi artar',
    children: 'Çocuklar sağlıklı büyür',
    education: 'Çocuklar okulda başarılı olur',
    dignity: 'İnsan onuru korunur'
  },
  statistics: {
    familiesHelped: 8921,
    packagesDistributed: 34567,
    hotMealsServed: 123456,
    totalValue: '8.9M TL'
  }
}

// Sosyal Sorumluluk Sloganları
export const SSP_SLOGANS: SSPSlogan[] = [
  // Motivasyonel Sloganlar
  {
    text: 'Her Puan Bir Umut 🌟',
    category: 'motivational',
    icon: '⭐'
  },
  {
    text: 'Birlikte Daha Yeşil 🌳',
    category: 'motivational',
    icon: '🌱'
  },
  {
    text: 'Paylaş, Büyüt, Değiştir 💚',
    category: 'motivational',
    icon: '💚'
  },
  {
    text: 'Geleceği Birlikte İnşa Ediyoruz 🏗️',
    category: 'motivational',
    icon: '🏗️'
  },
  {
    text: 'Küçük Adımlar, Büyük Değişimler 👣',
    category: 'motivational',
    icon: '👣'
  },

  // Etki Odaklı Sloganlar
  {
    text: 'Senin Puanın, Onların Geleceği 🌍',
    category: 'impact',
    icon: '🌍'
  },
  {
    text: '1 Yorum = 1 Tohum = 1 Gelecek 🌱',
    category: 'impact',
    icon: '🌱'
  },
  {
    text: 'Her Fidan Bir Nefes 🌳💨',
    category: 'impact',
    icon: '🌳'
  },
  {
    text: 'Bugün Dik, Yarın Serinle ☀️🌳',
    category: 'impact',
    icon: '☀️'
  },
  {
    text: '100 Ağaç = 2 Ton CO₂ 🌍',
    category: 'impact',
    icon: '♻️'
  },

  // Harekete Geçirici Sloganlar
  {
    text: 'Hadi Sen de Katıl! 🙌',
    category: 'call-to-action',
    icon: '🙌'
  },
  {
    text: 'Bugün Başla, Yarın Değiştir! ⚡',
    category: 'call-to-action',
    icon: '⚡'
  },
  {
    text: 'İlk Tohumunu Bugün Ek! 🌱',
    category: 'call-to-action',
    icon: '🌱'
  },
  {
    text: 'Sessiz Kalma, Harekete Geç! 📣',
    category: 'call-to-action',
    icon: '📣'
  },
  {
    text: 'Senin Farkın Büyük! 💪',
    category: 'call-to-action',
    icon: '💪'
  },

  // Duygusal Sloganlar
  {
    text: 'İyilik Sana Yakışıyor 💝',
    category: 'emotional',
    icon: '💝'
  },
  {
    text: 'Bir Yürek, Bin Ağaç ❤️🌳',
    category: 'emotional',
    icon: '❤️'
  },
  {
    text: 'Umut Tohumları Birlikte Filizliyor 🌱✨',
    category: 'emotional',
    icon: '✨'
  },
  {
    text: 'Doğa İçin, Gelecek İçin, Birlikte 🤝',
    category: 'emotional',
    icon: '🤝'
  },
  {
    text: 'Her Çocuk Yeşil Bir Dünya Hak Ediyor 👶🌍',
    category: 'emotional',
    icon: '👶'
  }
]

// Kategoriye göre slogan getir
export const getSlogansByCategory = (category?: string) => {
  if (!category) return SSP_SLOGANS
  return SSP_SLOGANS.filter(s => s.category === category)
}

// Rastgele slogan getir
export const getRandomSlogan = () => {
  return SSP_SLOGANS[Math.floor(Math.random() * SSP_SLOGANS.length)]
}

// Fidan Dikim Süreç Bilgileri
export const TREE_PLANTING_PROCESS = [
  {
    step: 1,
    title: 'Tohum Toplama',
    description: 'Yorum yap, puan kazan, tohum biriktir',
    icon: '🌱',
    duration: '75 tohum gerekli'
  },
  {
    step: 2,
    title: 'Fidan Hazırlığı',
    description: 'Tohumların fidan haline gelmesi',
    icon: '🌿',
    duration: '1-2 gün (sanal)'
  },
  {
    step: 3,
    title: 'OGM/TEMA Bildirimi',
    description: 'Fidanın resmi kuruluşlara iletilmesi',
    icon: '📝',
    duration: 'Anında'
  },
  {
    step: 4,
    title: 'Arazi Seçimi',
    description: 'Uygun ağaçlandırma alanının belirlenmesi',
    icon: '🗺️',
    duration: '1-3 gün'
  },
  {
    step: 5,
    title: 'Fidan Dikimi',
    description: 'Gerçek arazide fidanın dikilmesi',
    icon: '🌳',
    duration: 'Mevsimsel (İlkbahar/Sonbahar)'
  },
  {
    step: 6,
    title: 'Sertifika',
    description: 'Dijital sertifika ve GPS koordinatları',
    icon: '🎖️',
    duration: 'Dikim sonrası 7 gün'
  }
]

// Sertifika Bilgileri
export const CERTIFICATE_INFO = {
  includes: [
    'Tam Adınız ve Bağış Tarihi',
    'Dikilen Fidanın Türü (Meşe, Çam, vb.)',
    'GPS Koordinatları (Enlem/Boylam)',
    'Ağaçlandırma Alanı Bilgisi',
    'OGM/TEMA Onay Mührü',
    'QR Kod ile Doğrulama',
    'Sosyal Medya Paylaşım Linki',
    'CO₂ Emilim Hesaplaması'
  ],
  formats: [
    'PDF İndirme',
    'Dijital Rozet',
    'E-posta ile Gönderim',
    'Sosyal Medya Paylaşımı'
  ],
  validity: 'Sonsuz - Kalıcı Kayıt',
  tracking: 'Yıllık gelişim fotoğrafları (ilk 3 yıl)'
}

// İstatistikler (Örnek Veriler)
export const IMPACT_STATS = {
  totalTreesPlanted: 125847,
  totalCO2Absorbed: '12,584 ton/yıl',
  totalWaterDonated: 45632,
  totalAnimalsFed: 89245,
  activeVolunteers: 34521,
  partnerOrganizations: 12,
  provinces: 81,
  districts: 743
}

// SSP Kategorileri
export const SSP_CATEGORIES = [
  {
    id: 'environment',
    name: 'Çevre',
    icon: '🌍',
    description: 'Ağaçlandırma, temizlik, geri dönüşüm',
    color: 'green'
  },
  {
    id: 'animals',
    name: 'Hayvan Hakları',
    icon: '🐾',
    description: 'Mama bağışı, barınak desteği, tedavi',
    color: 'pink'
  },
  {
    id: 'water',
    name: 'Temiz Su',
    icon: '💧',
    description: 'Su kuyusu, arıtma, dağıtım',
    color: 'blue'
  },
  {
    id: 'education',
    name: 'Eğitim',
    icon: '📚',
    description: 'Kırtasiye, okul malzemesi, burs',
    color: 'purple'
  },
  {
    id: 'health',
    name: 'Sağlık',
    icon: '🏥',
    description: 'İlaç, tedavi, malzeme desteği',
    color: 'red'
  },
  {
    id: 'food',
    name: 'Gıda',
    icon: '🍲',
    description: 'Yemek bağışı, kumanya desteği',
    color: 'orange'
  }
]

export default {
  OGM_INFO,
  TEMA_INFO,
  WATER_ORGANIZATIONS,
  ANIMAL_ORGANIZATIONS,
  EDUCATION_ORGANIZATIONS,
  HEALTH_ORGANIZATIONS,
  FOOD_ORGANIZATIONS,
  SSP_SLOGANS,
  TREE_PLANTING_PROCESS,
  CERTIFICATE_INFO,
  IMPACT_STATS,
  SSP_CATEGORIES,
  STATIONARY_DONATION_DETAILS,
  WATER_DONATION_DETAILS,
  HEALTH_SUPPORT_DETAILS,
  FOOD_SUPPORT_DETAILS,
  getSlogansByCategory,
  getRandomSlogan
}


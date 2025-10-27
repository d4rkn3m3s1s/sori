import { Badge } from '../types/badge'

export const ACTIVITY_BADGES: Badge[] = [
  // Genel Aktivite Rozetleri
  {
    id: 'first-voice',
    name: 'Yeni Ses',
    description: 'İlk defa yorum atan - Sisteme ilk adımını atmış',
    icon: '🎤',
    category: 'activity',
    requirement: { type: 'comment_count', value: 1 },
    rarity: 'common',
    points: 10,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'lost-fish',
    name: 'Kayıp Balık',
    description: '1-2 yorum yapıp kaybolan - Kısa süreli kullanıp gitmiş',
    icon: '🐠',
    category: 'activity',
    requirement: { type: 'comment_count', value: 2, condition: 'inactive_after' },
    rarity: 'common',
    points: 5,
    unlocked: false,
    color: '#6B7280',
    gradient: 'from-gray-400 to-gray-500'
  },
  {
    id: 'mcnuggets',
    name: 'McNuggets',
    description: '3 yorum - Küçük ama lezzetli başlangıç',
    icon: '🍗',
    category: 'activity',
    requirement: { type: 'comment_count', value: 3 },
    rarity: 'common',
    points: 15,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'mcchicken',
    name: 'McChicken',
    description: '5 yorum - Artık tadını almaya başladın',
    icon: '🍔',
    category: 'activity',
    requirement: { type: 'comment_count', value: 5 },
    rarity: 'common',
    points: 25,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'bigmac',
    name: 'Big Mac',
    description: '20 yorum - Artık bu işin ustasısın',
    icon: '🍔',
    category: 'activity',
    requirement: { type: 'comment_count', value: 20 },
    rarity: 'rare',
    points: 100,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-red-600'
  },
  {
    id: 'double-cheeseburger',
    name: 'Double Cheeseburger',
    description: '50 yorum - Deneyimli yorumcu seviyesi',
    icon: '🍔',
    category: 'activity',
    requirement: { type: 'comment_count', value: 50 },
    rarity: 'epic',
    points: 250,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-purple-600'
  },
  {
    id: 'master-commentator',
    name: 'Usta Yorumcu',
    description: '20+ yorum ve sürekli aktif - İşletmeler için güvenilir müşteri görüşü',
    icon: '👑',
    svgPath: '/images/badges/USTA YORUMCU.svg',
    category: 'activity',
    requirement: { type: 'comment_count', value: 20, condition: 'active_user' },
    rarity: 'epic',
    points: 300,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'legend',
    name: 'Efsane',
    description: '50+ yorum ve en üst seviye - Hem kullanıcılar için hem işletmeler için değerli üye',
    icon: '🏆',
    svgPath: '/images/badges/EFSANE.svg',
    category: 'activity',
    requirement: { type: 'comment_count', value: 50, condition: 'top_tier' },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'throne-owner',
    name: 'Taht Sahibi',
    description: '100+ yorum - Sistemimizin en üst seviyesi',
    icon: '👑',
    svgPath: '/images/badges/TAHT SAHİBİ.svg',
    category: 'activity',
    requirement: { type: 'comment_count', value: 100 },
    rarity: 'legendary',
    points: 1000,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-600'
  }
]

export const BEHAVIOR_BADGES: Badge[] = [
  // Temel Davranış Rozetleri
  {
    id: 'philosopher',
    name: 'Filozof',
    description: 'Çok detaylı / uzun yorumlar yazan - Yorumları inceleme tadında',
    icon: '🧠',
    svgPath: '/images/badges/FİLOZOF.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'detailed_comments' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#6366F1',
    gradient: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'flash',
    name: 'Flash',
    description: 'Hep kısa ve yüzeysel yorum yapan - 1,2 kelime bırakıp kaçan',
    icon: '⚡',
    svgPath: '/images/badges/slash.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'short_comments' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'joker',
    name: 'Şakamatik',
    description: 'Espirili eğlenceli yorumlar yazan - Yorumları eğlence içerikli olan',
    icon: '🃏',
    svgPath: '/images/badges/şakamatik.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'funny_comments' },
    rarity: 'rare',
    points: 200,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: 'time-bomb',
    name: 'Saatli Bomba',
    description: 'Yorumlarıyla olay çıkartan - Gündemci',
    icon: '💣',
    svgPath: '/images/badges/SAATLİ BOMBA.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'controversial_comments' },
    rarity: 'epic',
    points: 100,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-red-600'
  },
  {
    id: 'supporter',
    name: 'Destekçi',
    description: 'Beğeni / Emoji bırakan - Beğeni perisi',
    icon: '👍',
    svgPath: '/images/badges/BEĞENİ PERİSİ.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'likes_and_emojis' },
    rarity: 'common',
    points: 75,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'silent-cinema',
    name: 'Sessiz Sinema',
    description: 'Hiç yorum yapmayan sadece okuyan',
    icon: '👁️',
    svgPath: '/images/badges/SESSİZ SİNEMA.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'read_only' },
    rarity: 'rare',
    points: 25,
    unlocked: false,
    color: '#6B7280',
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    id: 'sherlock',
    name: 'Sherlock',
    description: 'En küçük detayları bile yakalayan - Firmalarda fark edilmeyenleri inceleyen',
    icon: '🔍',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'detailed_analysis' },
    rarity: 'epic',
    points: 300,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-indigo-500'
  },

  // Aktivite Davranışları
  {
    id: 'guest-player',
    name: 'Konuk Oyuncu',
    description: 'Düzenli ama seyrek yorum yapan - Ayda bir uğrasa da hep var',
    icon: '🎭',
    svgPath: '/images/badges/konuk oyuncu.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'regular_sparse' },
    rarity: 'common',
    points: 80,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'comment-machine',
    name: 'Yorum Makinesi',
    description: 'Sürekli yorum yapan - Neredeyse bütün fişlere yorum yapan',
    icon: '🤖',
    svgPath: '/images/badges/yorum makinesi.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'constant_commenter' },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'nostalgia-wind',
    name: 'Nostalji Rüzgarı',
    description: 'Uzun süre yok olup geri dönen - Eski üyemiz yeniden aramızda',
    icon: '🍃',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'comeback_user' },
    rarity: 'rare',
    points: 120,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },

  // Hız ve Aktivite
  {
    id: 'first-blood',
    name: 'İlk Kan',
    description: 'Hep ilk yorumu yapan kişi - Oyun tadında ilk hamleyi yapan',
    icon: '🎯',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'first_commenter' },
    rarity: 'epic',
    points: 250,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'fast-furious',
    name: 'Hızlı ve Öfkeli',
    description: 'Çok hızlı yanıt verip sürekli aktif kalan - 7/24 aktif',
    icon: '🏎️',
    svgPath: '/images/badges/HİZLİ VE OFKELİ.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'fast_responses' },
    rarity: 'rare',
    points: 200,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'storm',
    name: 'Fırtına',
    description: 'Az zaman diliminde çok katkı sunan - Aniden yorumlarla dolduran',
    icon: '🌪️',
    svgPath: '/images/badges/FIRTINA.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'burst_activity' },
    rarity: 'epic',
    points: 350,
    unlocked: false,
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'jet',
    name: 'Jet',
    description: 'İşletmeden çıkar çıkmaz yorum bırakan',
    icon: '✈️',
    svgPath: '/images/badges/JET.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'instant_feedback' },
    rarity: 'rare',
    points: 180,
    unlocked: false,
    color: '#3B82F6',
    gradient: 'from-blue-400 to-indigo-500'
  },

  // Karakter Tipleri
  {
    id: 'surprise-box',
    name: 'Sürpriz Kutusu',
    description: 'Her hareketi sürprizli olan - Ne zaman ne çıkacağı belli değil',
    icon: '🎁',
    svgPath: '/images/badges/SÜRPRİZ MİSAFİR.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'unpredictable' },
    rarity: 'epic',
    points: 300,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: 'volcano',
    name: 'Volkan',
    description: 'Patlamalı, güçlü katkılar yapan - Sessiz ama patlayınca ortalığı yakar',
    icon: '🌋',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'explosive_impact' },
    rarity: 'epic',
    points: 350,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 'sprout',
    name: 'Filiz',
    description: 'Yeni başlayan ama hızlı büyüyen - Yeni çıkmış ama hızlı kök salan',
    icon: '🌱',
    svgPath: '/images/badges/FİLİZ.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'fast_growth' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'inspiration-source',
    name: 'İlham Kaynağı',
    description: 'Arka arkaya yaratıcı fikir getiren - Her hareketi yeni bir fikir oluşturan',
    icon: '💡',
    svgPath: '/images/badges/ilham kaynağı.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'creative_ideas' },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },

  // Olumsuz Davranışlar
  {
    id: 'grumpy',
    name: 'Huysuz',
    description: 'Sürekli kötü yorum yapan - Tripkolik',
    icon: '😠',
    svgPath: '/images/badges/HUYSUZ.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'negative_comments' },
    rarity: 'common',
    points: 30,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-red-600'
  },
  {
    id: 'drama-queen',
    name: 'Drama Queen',
    description: 'Ufak bir şeyi büyütüp ortalığı karıştıran - Ufak şeylerden bile sinirlenen',
    icon: '👑',
    svgPath: '/images/badges/DRAMA QUEEN.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'drama_maker' },
    rarity: 'rare',
    points: 50,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: 'depressive',
    name: 'Depresif',
    description: 'Hep sıkıntı içerisinde olan - Her fırsatta sıkıntısını anlatan',
    icon: '😔',
    svgPath: '/images/badges/Depresif.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'always_complaining' },
    rarity: 'common',
    points: 25,
    unlocked: false,
    color: '#6B7280',
    gradient: 'from-gray-400 to-gray-600'
  },

  // İletişim Stilleri
  {
    id: 'emoji-master',
    name: 'Emoji Ustası',
    description: 'Hep emojilerle yorum yapan - Emojilerle kendini ifade eden',
    icon: '😎',
    svgPath: '/images/badges/emoi ustası.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'emoji_user' },
    rarity: 'common',
    points: 60,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'copy-paste',
    name: 'Copy-Paste',
    description: 'Hep aynı cümleleri tekrar eden ya da hazır şeyler yazan',
    icon: '📋',
    svgPath: '/images/badges/COPY-CV.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'repetitive_comments' },
    rarity: 'common',
    points: 20,
    unlocked: false,
    color: '#6B7280',
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    id: 'brain-exploder',
    name: 'Beyin Patlatan',
    description: 'Yorumlarında hep öneri veren - Hayal Mühendisi',
    icon: '🧨',
    svgPath: '/images/badges/HAYAL MÜHENDİSİ.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'suggestion_maker' },
    rarity: 'rare',
    points: 180,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'corner-kick',
    name: 'Ters Köşe',
    description: 'Hep ince mizah yapan',
    icon: '⚽',
    svgPath: '/images/badges/TERS KÖŞE.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'subtle_humor' },
    rarity: 'rare',
    points: 160,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'word-wizard',
    name: 'Kelime Büyücüsü',
    description: 'Az ama öz yorumlar bırakan',
    icon: '🪄',
    svgPath: '/images/badges/kelime büyücüsü.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'concise_impactful' },
    rarity: 'epic',
    points: 280,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 'echo',
    name: 'Yankı',
    description: 'Söyledikleri uzun süre konuşulan, ses getiren',
    icon: '📢',
    svgPath: '/images/badges/YANKI.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'viral_comments' },
    rarity: 'legendary',
    points: 600,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },

  // Karakter Rolleri
  {
    id: 'perfectionist',
    name: 'Mükemmelliyetçi',
    description: 'Ne yapılsa memnun olmayan',
    icon: '🎯',
    svgPath: '/images/badges/MÜKEMMELLİYETÇİ.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'never_satisfied' },
    rarity: 'rare',
    points: 90,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-orange-500'
  },
  {
    id: 'sniper',
    name: 'Keskin Nişancı',
    description: 'Nokta atışı yorumlar',
    icon: '🎯',
    svgPath: '/images/badges/KESKİN NİŞANCI.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'precise_comments' },
    rarity: 'epic',
    points: 320,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 'behzat-c',
    name: 'Behzat Ç.',
    description: 'Sert yorum yapan',
    icon: '🕵️',
    svgPath: '/images/badges/behzat ç.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'harsh_comments' },
    rarity: 'rare',
    points: 110,
    unlocked: false,
    color: '#374151',
    gradient: 'from-gray-600 to-gray-800'
  },
  {
    id: 'leyla',
    name: 'Leyla',
    description: 'Absürt ama sevilen yorumlar yapan kullanıcı',
    icon: '🎪',
    svgPath: '/images/badges/leyla.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'absurd_loved' },
    rarity: 'epic',
    points: 250,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: 'bihter',
    name: 'Bihter',
    description: 'Dramatik Kullanıcı',
    icon: '🎭',
    svgPath: '/images/badges/bihter.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'dramatic_user' },
    rarity: 'rare',
    points: 140,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 'happy-days',
    name: 'Neşeli Günler',
    description: 'Her yorumu pozitif enerji saçan',
    icon: '☀️',
    svgPath: '/images/badges/neşeli günler.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'positive_energy' },
    rarity: 'rare',
    points: 200,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'chatterbox',
    name: 'Muhabbet Kuşu',
    description: 'Her konuya yorum yapan',
    icon: '🦜',
    svgPath: '/images/badges/muhabbet kuşu.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'comments_everything' },
    rarity: 'common',
    points: 120,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },

  // Özel İlgi Alanları
  {
    id: 'caffeine-addict',
    name: 'Kafein Bağımlısı',
    description: 'Sürekli kahve yorumları yapan',
    icon: '☕',
    svgPath: '/images/badges/KAFEİN BAĞIMLISI.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'coffee_comments' },
    rarity: 'common',
    points: 80,
    unlocked: false,
    color: '#92400E',
    gradient: 'from-yellow-800 to-orange-800'
  },
  {
    id: 'gourmet',
    name: 'Gurme',
    description: 'Sürekli yemek yorumları yapan',
    icon: '👨‍🍳',
    svgPath: '/images/badges/gurme.svg',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'food_comments' },
    rarity: 'common',
    points: 90,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 to-orange-600'
  }
]

export const BRAND_BADGES: Badge[] = [
  // McDonald's Rozetleri
  {
    id: 'mcdonalds-mcnuggets',
    name: 'McNuggets Lover',
    description: 'McDonald\'s\'ta 3 yorum - Küçük ama lezzetli başlangıç',
    icon: '🍗',
    category: 'brand',
    subcategory: 'mcdonalds',
    brandId: 'mcdonalds',
    requirement: { type: 'brand_loyalty', value: 3 },
    rarity: 'common',
    points: 20,
    unlocked: false,
    color: '#FFC72C',
    gradient: 'from-yellow-400 to-red-500'
  },
  {
    id: 'mcdonalds-quarter-pounder',
    name: 'Quarter Pounder Fan',
    description: 'McDonald\'s\'ta 200 yorum - Gerçek bir McDonald\'s tutkunusun',
    icon: '🍔',
    category: 'brand',
    subcategory: 'mcdonalds',
    brandId: 'mcdonalds',
    requirement: { type: 'brand_loyalty', value: 200 },
    rarity: 'legendary',
    points: 1000,
    unlocked: false,
    color: '#DA020E',
    gradient: 'from-red-500 to-yellow-400'
  },

  // Starbucks Rozetleri
  {
    id: 'starbucks-espresso',
    name: 'Espresso Enthusiast',
    description: 'Starbucks\'ta 3 yorum - Kahve yolculuğunun başlangıcı',
    icon: '☕',
    category: 'brand',
    subcategory: 'starbucks',
    brandId: 'starbucks',
    requirement: { type: 'brand_loyalty', value: 3 },
    rarity: 'common',
    points: 20,
    unlocked: false,
    color: '#00704A',
    gradient: 'from-green-600 to-green-800'
  },
  {
    id: 'starbucks-barista',
    name: 'Barista Level',
    description: 'Starbucks\'ta 100 yorum - Artık bir barista kadar bilgilisin',
    icon: '👨‍🍳',
    category: 'brand',
    subcategory: 'starbucks',
    brandId: 'starbucks',
    requirement: { type: 'brand_loyalty', value: 100 },
    rarity: 'epic',
    points: 500,
    unlocked: false,
    color: '#00704A',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'starbucks-addict',
    name: 'Kahve Müdavimi',
    description: 'Starbucks\'ta 200+ yorum - Kahve bağımlılığın resmi olarak onaylandı',
    icon: '☕',
    category: 'brand',
    subcategory: 'starbucks',
    brandId: 'starbucks',
    requirement: { type: 'brand_loyalty', value: 200 },
    rarity: 'legendary',
    points: 1000,
    unlocked: false,
    color: '#00704A',
    gradient: 'from-green-400 to-teal-600'
  },

  // Nike Rozetleri
  {
    id: 'nike-lebron',
    name: 'LeBron Fan',
    description: 'Nike\'da 3 yorum - Spor dünyasına ilk adım',
    icon: '👟',
    category: 'brand',
    subcategory: 'nike',
    brandId: 'nike',
    requirement: { type: 'brand_loyalty', value: 3 },
    rarity: 'common',
    points: 20,
    unlocked: false,
    color: '#000000',
    gradient: 'from-gray-800 to-black'
  },
  {
    id: 'nike-air-force',
    name: 'Air Force Legend',
    description: 'Nike\'da 100 yorum - Klasik tarzın temsilcisi',
    icon: '👟',
    category: 'brand',
    subcategory: 'nike',
    brandId: 'nike',
    requirement: { type: 'brand_loyalty', value: 100 },
    rarity: 'epic',
    points: 500,
    unlocked: false,
    color: '#000000',
    gradient: 'from-gray-700 to-gray-900'
  },
  {
    id: 'nike-addict',
    name: 'Nike\'kolik',
    description: 'Nike\'da 200+ yorum - Just Do It felsefesini yaşıyorsun',
    icon: '✅',
    category: 'brand',
    subcategory: 'nike',
    brandId: 'nike',
    requirement: { type: 'brand_loyalty', value: 200 },
    rarity: 'legendary',
    points: 1000,
    unlocked: false,
    color: '#000000',
    gradient: 'from-black to-red-600'
  }
]

export const SPECIAL_BADGES: Badge[] = [
  {
    id: 'dracarys',
    name: 'DRACARYS',
    description: 'Ejder ateşi ile yakıcı yorumlar bırakan - Güçlü ve etkili, sözleri ateş gibi yakar',
    icon: '🐉',
    svgPath: '/images/badges/dracarys.svg',
    category: 'special',
    requirement: { type: 'special_action', value: 'dragon_fire_comments' },
    rarity: 'legendary',
    points: 800,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 via-orange-500 to-yellow-400',
    privileges: [
      { type: 'special_emoji', description: 'Yorumların ateş efekti ile öne çıkar', active: true },
      { type: 'custom_avatar', description: 'Ejder gücü - Özel avatar çerçevesi', active: true },
      { type: 'exclusive_features', description: 'Efsanevi durum - Özel renk ve efektler', active: true }
    ]
  },
  {
    id: 'catalyst',
    name: 'Katalizör',
    description: 'Katkılarıyla topluluğu ileri taşıyan - Değişimi hızlandıran',
    icon: '⚗️',
    svgPath: '/images/badges/katalizör.svg',
    category: 'special',
    requirement: { type: 'special_action', value: 'community_impact' },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-indigo-600',
    privileges: [
      { type: 'vip_comments', description: 'Yorumların öne çıkar', active: true },
      { type: 'early_access', description: 'Yeni özelliklere erken erişim', active: true }
    ]
  },
  {
    id: 'tour-guide',
    name: 'Tur Rehberi',
    description: 'Yeni katılanlara yol gösteren - Sitemizin bilgi kaynağı',
    icon: '🗺️',
    svgPath: '/images/badges/tur rehberi.svg',
    category: 'special',
    requirement: { type: 'special_action', value: 'help_newcomers' },
    rarity: 'epic',
    points: 300,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-emerald-400 to-teal-500',
    privileges: [
      { type: 'priority_support', description: 'Öncelikli destek', active: true }
    ]
  },
  {
    id: 'xray',
    name: 'X-Ray',
    description: 'Konunun gizli yönlerini ortaya çıkaran - Farklı detayları fark eden',
    icon: '🔬',
    svgPath: '/images/badges/XRAY.svg',
    category: 'special',
    requirement: { type: 'special_action', value: 'reveal_insights' },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'jewel',
    name: 'Mücevher',
    description: 'Nadiren aktif ama katkısı çok değerli',
    icon: '💎',
    svgPath: '/images/badges/mücevher.svg',
    category: 'special',
    requirement: { type: 'special_action', value: 'rare_valuable' },
    rarity: 'legendary',
    points: 750,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500',
    privileges: [
      { type: 'exclusive_features', description: 'Özel özellikler', active: true },
      { type: 'custom_avatar', description: 'Özel avatar çerçevesi', active: true }
    ]
  },
  {
    id: 'volcano',
    name: 'Volkan',
    description: 'Patlamalı, güçlü katkılar yapan - Geldiğinde etkili ve ortamı eğlendiren',
    icon: '🌋',
    category: 'special',
    requirement: { type: 'special_action', value: 'explosive_impact' },
    rarity: 'epic',
    points: 350,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 'sprout',
    name: 'Filiz',
    description: 'Yeni başlayan ama hızlı büyüyen - Yeni çıkmış ama hızlı kök salan',
    icon: '🌱',
    category: 'special',
    requirement: { type: 'special_action', value: 'fast_growth' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  }
]

// GİZEMLİ ROZETLER - Çok nadir ve özel rozetler (herkeste bulunmaz)
export const MYSTERIOUS_BADGES: Badge[] = [
  {
    id: 'mysterious-phoenix',
    name: 'Anka Kuşu',
    description: '??? Gizli başarım - Küllerinden yeniden doğmak',
    icon: '🔥🦅',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'phoenix_rebirth' },
    rarity: 'mythical',
    points: 2000,
    unlocked: false,
    color: '#FF6B35',
    gradient: 'from-orange-600 via-red-600 to-purple-600',
    isHidden: true,
    unlockedBy: 0.01, // Sadece %0.01 kullanıcıda var
    privileges: [
      { type: 'resurrection', description: 'Puan kaybında 1 kez kurtarma hakkı', active: true },
      { type: 'legendary_frame', description: 'Efsanevi avatar çerçevesi', active: true },
      { type: 'priority_support', description: 'Özel destek hattı', active: true }
    ]
  },
  {
    id: 'mysterious-unicorn',
    name: 'Tek Boynuzlu At',
    description: '??? Efsanevi Varlık - Nadir ve büyülü',
    icon: '🦄',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'magical_encounter' },
    rarity: 'mythical',
    points: 1500,
    unlocked: false,
    color: '#A78BFA',
    gradient: 'from-purple-400 via-pink-400 to-blue-400',
    isHidden: true,
    unlockedBy: 0.05,
    privileges: [
      { type: 'rainbow_effect', description: 'Gökkuşağı efektleri', active: true },
      { type: 'special_emoji', description: 'Özel emoji paketi', active: true }
    ]
  },
  {
    id: 'mysterious-alien',
    name: 'Gezgin',
    description: '??? Bilinmeyenlerden Gelen - Başka dünyalardan ziyaretçi',
    icon: '👽',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'otherworldly_visit' },
    rarity: 'mythical',
    points: 1800,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 via-cyan-400 to-blue-500',
    isHidden: true,
    unlockedBy: 0.02,
    privileges: [
      { type: 'space_badge', description: 'Uzay teması', active: true },
      { type: 'exclusive_sounds', description: 'Özel ses efektleri', active: true }
    ]
  },
  {
    id: 'mysterious-time-traveler',
    name: 'Zaman Yolcusu',
    description: '??? Zamanın Efendisi - Geçmiş, şimdi ve gelecekte aktif',
    icon: '⏰',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'time_paradox' },
    rarity: 'mythical',
    points: 2500,
    unlocked: false,
    color: '#3B82F6',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    isHidden: true,
    unlockedBy: 0.003,
    privileges: [
      { type: 'time_badge', description: 'Zaman kontrolü teması', active: true },
      { type: 'future_insights', description: 'Gelecek etkinlik bildirimleri', active: true },
      { type: 'historical_rewards', description: 'Geçmiş ödül erişimi', active: true }
    ]
  },
  {
    id: 'mysterious-dragon',
    name: 'Ejderha Efendisi',
    description: '??? Efsanevi Güç - Ejderha gücünü ele geçirmek',
    icon: '🐉',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'dragon_master' },
    rarity: 'mythical',
    points: 3000,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 via-orange-600 to-yellow-600',
    isHidden: true,
    unlockedBy: 0.001,
    privileges: [
      { type: 'dragon_power', description: '%100 puan bonusu', active: true },
      { type: 'fire_effect', description: 'Ateş efektleri', active: true },
      { type: 'legendary_status', description: 'Efsanevi durum', active: true }
    ]
  },
  {
    id: 'mysterious-ghost',
    name: 'Hayalet Kullanıcı',
    description: '??? Görünmez Güç - Var ama görünmez',
    icon: '👻',
    svgPath: '/images/badges/hayalet yorumcu.svg',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'ghost_mode' },
    rarity: 'legendary',
    points: 1200,
    unlocked: false,
    color: '#E5E7EB',
    gradient: 'from-gray-200 via-gray-400 to-gray-600',
    isHidden: true,
    unlockedBy: 0.1,
    privileges: [
      { type: 'invisibility', description: 'Gizli mod (istege bağlı)', active: true },
      { type: 'stealth_bonus', description: 'Sessiz puan kazanımı', active: true }
    ]
  },
  {
    id: 'mysterious-wizard',
    name: 'Büyücü',
    description: '??? Sihir Ustası - Büyülü yetenekler',
    icon: '🧙',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'magic_mastery' },
    rarity: 'legendary',
    points: 1600,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    isHidden: true,
    unlockedBy: 0.02,
    privileges: [
      { type: 'magic_spells', description: 'Özel sihirli özellikler', active: true },
      { type: 'transformation', description: 'Avatar dönüşümleri', active: true },
      { type: 'spell_bonus', description: 'Rastgele bonus puanlar', active: true }
    ]
  },
  {
    id: 'mysterious-crystal',
    name: 'Kristal Kalp',
    description: '??? Saf Enerji - Kristal berraklığında katkılar',
    icon: '💎',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'crystal_pure' },
    rarity: 'legendary',
    points: 1400,
    unlocked: false,
    color: '#06B6D4',
    gradient: 'from-cyan-400 via-blue-400 to-purple-400',
    isHidden: true,
    unlockedBy: 0.03,
    privileges: [
      { type: 'crystal_theme', description: 'Kristal temalı UI', active: true },
      { type: 'purity_bonus', description: 'Temiz içerik bonusu', active: true }
    ]
  },
  {
    id: 'mysterious-ninja',
    name: 'Gölge Savaşçısı',
    description: '??? Gizli Usta - Sessiz ama etkili',
    icon: '🥷',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'ninja_skills' },
    rarity: 'legendary',
    points: 1300,
    unlocked: false,
    color: '#1F2937',
    gradient: 'from-gray-800 via-gray-700 to-red-900',
    isHidden: true,
    unlockedBy: 0.04,
    privileges: [
      { type: 'stealth_mode', description: 'Gizlilik özellikleri', active: true },
      { type: 'speed_bonus', description: 'Hızlı işlem bonusu', active: true }
    ]
  },
  {
    id: 'mysterious-angel',
    name: 'Melek',
    description: '??? Kutsal Varlık - İyiliğin simgesi',
    icon: '😇',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'angelic_deeds' },
    rarity: 'legendary',
    points: 2000,
    unlocked: false,
    color: '#FCD34D',
    gradient: 'from-yellow-200 via-amber-300 to-orange-400',
    isHidden: true,
    unlockedBy: 0.01,
    privileges: [
      { type: 'halo_effect', description: 'Hale efekti', active: true },
      { type: 'blessing_bonus', description: 'Diğer kullanıcılara bonus verebilme', active: true },
      { type: 'divine_protection', description: 'Ekstra koruma', active: true }
    ]
  },
  {
    id: 'mysterious-robot',
    name: 'Yapay Zeka',
    description: '??? Gelecekten Gelen - Teknoloji ustası',
    icon: '🤖',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'ai_efficiency' },
    rarity: 'legendary',
    points: 1700,
    unlocked: false,
    color: '#6B7280',
    gradient: 'from-gray-500 via-blue-500 to-cyan-500',
    isHidden: true,
    unlockedBy: 0.015,
    privileges: [
      { type: 'automation', description: 'Otomatik özellikler', active: true },
      { type: 'efficiency_boost', description: '%50 verimlilik artışı', active: true }
    ]
  },
  {
    id: 'mysterious-crown',
    name: 'Görünmez Kral',
    description: '??? Gizli Hükümdar - Tac olmadan egemen',
    icon: '👑',
    category: 'mysterious',
    requirement: { type: 'mysterious_action', value: 'hidden_ruler' },
    rarity: 'mythical',
    points: 5000,
    unlocked: false,
    color: '#FFD700',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    isHidden: true,
    unlockedBy: 0.0001,
    privileges: [
      { type: 'royal_authority', description: 'Kraliyet yetkileri', active: true },
      { type: 'supreme_bonus', description: '%200 puan bonusu', active: true },
      { type: 'vip_access', description: 'Tüm özelliklere sınırsız erişim', active: true },
      { type: 'exclusive_events', description: 'Özel etkinliklere davet', active: true }
    ]
  }
]

export const ALL_BADGES = [
  ...ACTIVITY_BADGES,
  ...BEHAVIOR_BADGES,
  ...BRAND_BADGES,
  ...SPECIAL_BADGES,
  ...MYSTERIOUS_BADGES
]

// Yeni Lig Sistemi
export const BADGE_LEVELS = [
  { 
    level: 1, 
    requiredPoints: 0, 
    name: 'Kör', 
    color: '#78716C',
    gradient: 'from-stone-500 to-stone-600',
    icon: '🔥',
    description: 'Yeni başlayan ama potansiyeli yüksek',
    benefits: ['Temel rozetler', 'Standart puanlar']
  },
  { 
    level: 2, 
    requiredPoints: 150, 
    name: 'Ezgi', 
    color: '#10B981',
    gradient: 'from-emerald-400 to-green-500',
    icon: '🎵',
    description: 'Ritmi yakalamaya başladın',
    benefits: ['%10 bonus puan', 'Özel rozetler', 'Ezgi badge']
  },
  { 
    level: 3, 
    requiredPoints: 400, 
    name: 'Parıltı', 
    color: '#3B82F6',
    gradient: 'from-blue-400 to-cyan-500',
    icon: '✨',
    description: 'Parlayan bir yıldız gibi',
    benefits: ['%20 bonus puan', 'Parıltı efektleri', 'VIP desteği']
  },
  { 
    level: 4, 
    requiredPoints: 800, 
    name: 'Ahenk', 
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-violet-500',
    icon: '🎼',
    description: 'Mükemmel uyum ve denge',
    benefits: ['%30 bonus puan', 'Öncelikli görünürlük', 'Özel avatar']
  },
  { 
    level: 5, 
    requiredPoints: 1500, 
    name: 'Yücelik', 
    color: '#F59E0B',
    gradient: 'from-amber-400 to-orange-500',
    icon: '👑',
    description: 'Saygın ve etkili bir konum',
    benefits: ['%40 bonus puan', 'Premium özellikler', 'Altın avatar çerçevesi']
  },
  { 
    level: 6, 
    requiredPoints: 2500, 
    name: 'Efsanevi', 
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500',
    icon: '🌟',
    description: 'Efsaneler arasında efsane',
    benefits: ['%50 bonus puan', 'Tüm premium özellikler', 'Efsanevi rozetler', 'Topluluk lideri']
  }
]

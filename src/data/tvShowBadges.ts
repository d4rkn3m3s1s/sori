import { Badge } from '../types/badge'

// TV Show Badges - Test Version
export const TV_SHOW_BADGES: Badge[] = [
  // KOMEDİ
  {
    id: 'himym-barney',
    name: 'Barney Stinson',
    description: 'Hazır cevap ve eğlenceli, bazen düşünceleri kararsız. Sosyal enerjisiyle öne çıkan kullanıcılar.',
    icon: '🎩',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'social_energy'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-amber-400 to-orange-500',
    showName: 'How I Met Your Mother',
    genre: 'KOMEDİ'
  },
  {
    id: 'tbbt-sheldon',
    name: 'Sheldon Cooper',
    description: 'Analitik zeka ve her zaman farklı bakış açısı. Bilgiyi çok seven ve her daim kullanan kullanıcılar.',
    icon: '🧪',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'analytical_mind'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    showName: 'The Big Bang Theory',
    genre: 'KOMEDİ'
  },
  {
    id: 'friends-chandler',
    name: 'Chandler Bing',
    description: 'Keskin espri anlayışı olan. Mizahı üstün olan ve yorumlarını buna göre yapan kullanıcılar.',
    icon: '😄',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'sharp_humor'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-500',
    showName: 'Friends',
    genre: 'KOMEDİ'
  },
  {
    id: 'office-michael',
    name: 'Michael Scott',
    description: 'Fazla mizah ve samimiyet. Sürprizlerle dolu olan kullanıcılar için.',
    icon: '📋',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'surprising_humor'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-600',
    showName: 'The Office',
    genre: 'KOMEDİ'
  },

  // FANTASTİK
  {
    id: 'st-eleven',
    name: 'Eleven',
    description: 'Fedakar, gizemli. Arkadaşlarıyla vakit geçirmeyi çok seven ve yorumlarını buna göre yapan kullanıcıları temsil eder.',
    icon: '⚡',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'loyal_friend'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-500 to-pink-500',
    showName: 'Stranger Things',
    genre: 'FANTASTİK'
  },
  {
    id: 'witcher-geralt',
    name: 'Geralt of Rivia',
    description: 'Sessiz ama güçlü. Kısa ama etkili yorumlarıyla dikkat çeken kullanıcıları temsil eder.',
    icon: '⚔️',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'silent_powerful'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#6B7280',
    gradient: 'from-gray-500 to-gray-700',
    showName: 'The Witcher',
    genre: 'FANTASTİK'
  },
  {
    id: 'got-jon',
    name: 'Jon Snow',
    description: 'Onurlu, sadık ve cesur. Topluluğun güvenini kazanan ve dürüstlüğüyle saygı uyandıran kullanıcıları simgeler.',
    icon: '🐺',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'honorable_loyal'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#475569',
    gradient: 'from-slate-600 to-slate-800',
    showName: 'Game of Thrones',
    genre: 'FANTASTİK'
  },
  {
    id: 'got-tyrion',
    name: 'Tyrion Lannister',
    description: 'Zekâsı ve keskin diliyle öne çıkar. Akıllı tespitleriyle sohbetlere yön veren kullanıcıları simgeler.',
    icon: '🍷',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'sharp_tongue'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 to-yellow-500',
    showName: 'Game of Thrones',
    genre: 'FANTASTİK'
  },
  {
    id: 'got-daenerys',
    name: 'Daenerys Targaryen',
    description: 'Vizyoner, idealist ve güçlü. İlham verici fikirleriyle topluluğa yön katan kullanıcıları simgeler.',
    icon: '🐉',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'visionary_leader'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#7C3AED',
    gradient: 'from-purple-600 to-pink-500',
    showName: 'Game of Thrones',
    genre: 'FANTASTİK'
  },
  {
    id: 'vikings-ragnar',
    name: 'Ragnar Lothbrok',
    description: 'Cesur, yenilikçi ve lider ruhlu. Farklı deneyimleri cesurca paylaşarak diğerlerine yol gösteren kullanıcıları simgeler.',
    icon: '⚔️',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'brave_leader'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#0891B2',
    gradient: 'from-cyan-600 to-blue-700',
    showName: 'Vikings',
    genre: 'FANTASTİK'
  },
  {
    id: 'supernatural-dean',
    name: 'Dean Winchester',
    description: 'Cesur, eğlenceli, sadık ve koruyucu. Destekleyici yaklaşımıyla topluluğa güven veren kullanıcıları simgeler.',
    icon: '🔫',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'protective_fun'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#059669',
    gradient: 'from-emerald-600 to-green-700',
    showName: 'Supernatural',
    genre: 'FANTASTİK'
  },
  {
    id: 'supernatural-sam',
    name: 'Sam Winchester',
    description: 'Düşünceli, empatik ve araştırmacı. Bilgiye dayalı yorumlarıyla topluluğu zenginleştiren kullanıcıları simgeler.',
    icon: '📚',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'thoughtful_researcher'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#2563EB',
    gradient: 'from-blue-600 to-indigo-600',
    showName: 'Supernatural',
    genre: 'FANTASTİK'
  },

  // DRAM/SUÇ
  {
    id: 'bb-walter',
    name: 'Walter White',
    description: 'Stratejik, planlı. Kriz anında rahatça çözüm bulan kullanıcılar için.',
    icon: '🧪',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'strategic_planner'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600',
    showName: 'Breaking Bad',
    genre: 'DRAM/SUÇ'
  },
  {
    id: 'bb-jesse',
    name: 'Jesse Pinkman',
    description: 'Duygusal, duygularını olduğu gibi paylaşan. Doğal tavırlarıyla öne çıkan kullanıcılar.',
    icon: '😎',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'emotional_authentic'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
    showName: 'Breaking Bad',
    genre: 'DRAM/SUÇ'
  },
  {
    id: 'pb-tommy',
    name: 'Tommy Shelby',
    description: 'Soğukkanlı ve planlı. Yorumlarına yön veren ve öne çıkan kullanıcıları temsil eder.',
    icon: '🎩',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'cold_strategic'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#1F2937',
    gradient: 'from-gray-800 to-gray-900',
    showName: 'Peaky Blinders',
    genre: 'DRAM/SUÇ'
  },
  {
    id: 'crown-elizabeth',
    name: 'Kraliçe Elizabeth',
    description: 'Ciddi, sorumluluk sahibi. Düzenli, istikrarlı kullanıcılar.',
    icon: '👑',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'responsible_steady'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#7C3AED',
    gradient: 'from-purple-600 to-indigo-700',
    showName: 'The Crown',
    genre: 'DRAM/SUÇ'
  },
  {
    id: 'thisisus-jack',
    name: 'Jack Pearson',
    description: 'Aile odaklı, destekleyici. Samimi ve pozitif yorumlar yapan kullanıcılar.',
    icon: '❤️',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'family_supportive'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-500',
    showName: 'This Is Us',
    genre: 'DRAM/SUÇ'
  },
  {
    id: 'sherlock-holmes',
    name: 'Sherlock Holmes',
    description: 'Analitik, gözlemci. Detaycı yorum yapan kullanıcılar.',
    icon: '🔍',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'analytical_observer'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#0891B2',
    gradient: 'from-cyan-600 to-blue-600',
    showName: 'Sherlock',
    genre: 'DRAM/SUÇ'
  },
  {
    id: 'lcdp-profesor',
    name: 'El Profesor',
    description: 'Planlı, stratejik ve soğukkanlı. Düşünülmüş ve faydalı yorumlarıyla herkesin işini kolaylaştıran kullanıcıları simgeler.',
    icon: '🎭',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'mastermind'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 to-red-800',
    showName: 'La Casa de Papel',
    genre: 'DRAM/SUÇ'
  },
  {
    id: 'lcdp-tokyo',
    name: 'Tokyo',
    description: 'Cesur, asi ve duygusal. Enerjisiyle yorumlara canlılık getiren kullanıcıları simgeler.',
    icon: '💥',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'rebel_energetic'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-500 to-red-500',
    showName: 'La Casa de Papel',
    genre: 'DRAM/SUÇ'
  },
  {
    id: 'pb-michael',
    name: 'Michael Scofield',
    description: 'Stratejik Zeka. Her yorumunu planlı yapan, mantık zinciri kuran kullanıcılar.',
    icon: '🧩',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'strategic_genius'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#0284C7',
    gradient: 'from-sky-600 to-blue-700',
    showName: 'Prison Break',
    genre: 'DRAM/SUÇ'
  },

  // GİZEM/GERİLİM
  {
    id: 'you-joe',
    name: 'Joe Goldberg',
    description: 'Takıntılı ama analitik ve gözlemci. En küçük detayları baya farklı yaklaşımlarla yakalayan ve dikkatli değerlendirmeleriyle fark yaratan kullanıcıları simgeler.',
    icon: '📖',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'obsessive_analytical'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#991B1B',
    gradient: 'from-red-800 to-orange-700',
    showName: 'You',
    genre: 'GİZEM/GERİLİM'
  },
  {
    id: 'ke-villanelle',
    name: 'Villanelle',
    description: 'Karizmatik, kurnaz ve sıra dışı. Kendine has tarzıyla topluluğa farklı bir enerji katan kullanıcıları simgeler.',
    icon: '💅',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'charismatic_unique'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#DB2777',
    gradient: 'from-pink-600 to-rose-600',
    showName: 'Killing Eve',
    genre: 'GİZEM/GERİLİM'
  },
  {
    id: 'narcos-pablo',
    name: 'Pablo Escobar',
    description: 'Karizmatik, güçlü ve korkusuz. İddialı yorumlarıyla dikkatleri üzerine çeken kullanıcıları simgeler.',
    icon: '💰',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'powerful_fearless'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#15803D',
    gradient: 'from-green-700 to-emerald-800',
    showName: 'Narcos',
    genre: 'GİZEM/GERİLİM'
  },
  {
    id: 'dark-jonas',
    name: 'Jonas Kahnwald',
    description: 'Derin düşünceli ve sorgulayıcı. Merak uyandıran yorumlarıyla tartışmalara yeni boyut katan kullanıcıları simgeler.',
    icon: '⏰',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'deep_thinker'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#1E293B',
    gradient: 'from-slate-800 to-slate-900',
    showName: 'Dark',
    genre: 'GİZEM/GERİLİM'
  },
  {
    id: 'dark-martha',
    name: 'Martha Nielsen',
    description: 'Çelişkileriyle güçlü, bağımsız ve kararlı. Net duruşuyla toplulukta kendine özel bir yer edinen kullanıcıları simgeler.',
    icon: '🌓',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'independent_strong'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#7C2D12',
    gradient: 'from-orange-800 to-red-900',
    showName: 'Dark',
    genre: 'GİZEM/GERİLİM'
  },
  {
    id: 'ram-rick',
    name: 'Rick Sanchez',
    description: 'Çılgın, dahi ve kaotik. Sıra dışı çözümleriyle toplulukta farklılık yaratan kullanıcıları simgeler.',
    icon: '🧪',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'genius_chaotic'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-green-500',
    showName: 'Rick and Morty',
    genre: 'GİZEM/GERİLİM'
  },
  {
    id: 'hoc-frank',
    name: 'Frank Underwood',
    description: 'Stratejik ve güçlü. İnce hesaplarıyla tartışmaları yönlendiren kullanıcıları simgeler.',
    icon: '🏛️',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'political_mastermind'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#1E40AF',
    gradient: 'from-blue-800 to-indigo-900',
    showName: 'House of Cards',
    genre: 'GİZEM/GERİLİM'
  },
  {
    id: 'homeland-carrie',
    name: 'Carrie Mathison',
    description: 'Sezgileri güçlü ve cesur. İçgüdüleriyle doğru noktaları yakalayan kullanıcıları simgeler.',
    icon: '🕵️',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'intuitive_brave'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#B91C1C',
    gradient: 'from-red-700 to-orange-600',
    showName: 'Homeland',
    genre: 'GİZEM/GERİLİM'
  },
  {
    id: 'bm-kelly',
    name: 'Kelly & Yorkie',
    description: 'Teknoloji ve yeniliğe meraklı. Dijital ortamda aktif kullanıcılar.',
    icon: '💻',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'tech_savvy'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#6366F1',
    gradient: 'from-indigo-500 to-purple-600',
    showName: 'Black Mirror',
    genre: 'GİZEM/GERİLİM'
  },

  // TARİH
  {
    id: 'spartacus',
    name: 'Spartacus',
    description: 'Mücadeleci, adalet arayışı. Eleştirilerinde net olan kullanıcılar.',
    icon: '⚔️',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'fighter_justice'
    },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#991B1B',
    gradient: 'from-red-800 to-amber-700',
    showName: 'Spartacus',
    genre: 'TARİH'
  },
  {
    id: 'rome-caesar',
    name: 'Julius Caesar',
    description: 'Lider, stratejik. Topluluk içinde öne çıkan kullanıcılar.',
    icon: '🏛️',
    category: 'behavior',
    requirement: {
      type: 'behavior_pattern',
      value: 'strategic_leader'
    },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#7C2D12',
    gradient: 'from-orange-800 to-red-700',
    showName: 'Rome',
    genre: 'TARİH'
  },

  // GİZEMLİ ROZETLER
  {
    id: 'wednesday-addams',
    name: 'Wednesday Addams',
    description: 'Karanlık, bağımsızlık. Alışılmışın dışında yorumlar yapan kullanıcıları temsil eder.',
    icon: '🖤',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'dark_unique'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#000000',
    gradient: 'from-gray-900 to-purple-900',
    showName: 'Wednesday',
    genre: 'GİZEMLİ'
  },
  {
    id: 'dw-doctor',
    name: 'The Doctor',
    description: 'Zaman yolcusu, bilge ve maceraperest. Keşfetmeyi seven kullanıcıları simgeler.',
    icon: '⏳',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'time_traveler'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-blue-700',
    showName: 'Doctor Who',
    genre: 'GİZEMLİ'
  },
  {
    id: 'supernatural-castiel',
    name: 'Castiel',
    description: 'Gizemli, bilge ve koruyucu. Dinginliğiyle ortamı dengeleyen kullanıcıları simgeler.',
    icon: '😇',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'angel_guardian'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-600',
    showName: 'Supernatural',
    genre: 'GİZEMLİ'
  },
  {
    id: 'dexter-morgan',
    name: 'Dexter Morgan',
    description: 'Çift yönlü, soğukkanlı ve planlı. Sakin yaklaşımıyla karmaşık durumları bile netleştiren kullanıcıları simgeler.',
    icon: '🔪',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'dual_nature'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#7F1D1D',
    gradient: 'from-red-900 to-gray-800',
    showName: 'Dexter',
    genre: 'GİZEMLİ'
  },
  {
    id: 'mrrobot-elliot',
    name: 'Elliot Alderson',
    description: 'Gizemli, içe kapanık. Ani ama çarpıcı yorum yapan kullanıcılar.',
    icon: '🎭',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'mysterious_hacker'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#000000',
    gradient: 'from-black to-green-700',
    showName: 'Mr. Robot',
    genre: 'GİZEMLİ'
  },
  {
    id: 'lost-locke',
    name: 'John Locke',
    description: 'İnançlı, keşifçi. Yeni fikirler deneyen kullanıcılar.',
    icon: '🏝️',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'explorer_believer'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#15803D',
    gradient: 'from-green-700 to-yellow-600',
    showName: 'Lost',
    genre: 'GİZEMLİ'
  },
  {
    id: 'hannibal-lecter',
    name: 'Hannibal Lecter',
    description: 'Zarif ama keskin. Yorumlarını çok incelikli yapan kullanıcılar.',
    icon: '🍷',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'elegant_sharp'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#7F1D1D',
    gradient: 'from-red-900 to-black',
    showName: 'Hannibal',
    genre: 'GİZEMLİ'
  },
  {
    id: 'go-crowley',
    name: 'Crowley',
    description: 'Kaotik ama eğlenceli. Beklenmedik, sürpriz dolu yorum yapan kullanıcılar.',
    icon: '😈',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'chaotic_fun'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 to-orange-500',
    showName: 'Good Omens',
    genre: 'GİZEMLİ'
  },
  {
    id: 'house-md',
    name: 'Dr. House',
    description: 'Alaycı, keskin zeka. Gerçekçi ve eleştirel yorum yapan kullanıcılar.',
    icon: '💊',
    category: 'special',
    requirement: {
      type: 'special_action',
      value: 'sarcastic_genius'
    },
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    color: '#1E40AF',
    gradient: 'from-blue-800 to-gray-700',
    showName: 'House M.D.',
    genre: 'GİZEMLİ'
  },

  // GENEL EMOJİ ROZETLERİ
  {
    id: 'yeni-ses',
    name: 'Yeni Ses',
    description: 'Sisteme ilk adımını atmış, yeni sesiyle topluluğa merhaba demiştir.',
    icon: '🎤',
    category: 'activity',
    requirement: { type: 'comment_count', value: 1 },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500',
    genre: 'GENEL'
  },
  {
    id: 'kayip-balik',
    name: 'Kayıp Balık',
    description: 'Kısa süre görünüp kaybolur, izi kalır ama kendisi ortalarda olmaz.',
    icon: '🐟',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'disappearing' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-500',
    genre: 'GENEL'
  },
  {
    id: 'konuk-oyuncu',
    name: 'Konuk Oyuncu',
    description: 'Ayda yılda bir sahneye çıkar ama geldiğinde mutlaka fark edilir.',
    icon: '🎭',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'guest_player' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-indigo-500',
    genre: 'GENEL'
  },
  {
    id: 'yorum-makinesi',
    name: 'Yorum Makinesi',
    description: 'Neredeyse tüm fişlere yorum bırakan, dur durak bilmeyen üyemizdir.',
    icon: '⚙️',
    category: 'activity',
    requirement: { type: 'comment_count', value: 30 },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
    genre: 'GENEL'
  },
  {
    id: 'nostalji-ruzgari',
    name: 'Nostalji Rüzgarı',
    description: 'Bir anda geri döner, eski günleri hatırlatır ve ortamı canlandırır.',
    icon: '🍂',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'comeback' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#D97706',
    gradient: 'from-amber-500 to-orange-600',
    genre: 'GENEL'
  },
  {
    id: 'filozof',
    name: 'Filozof',
    description: 'Yorumları adeta makale tadında; derin, uzun ve düşündürücü.',
    icon: '🧠',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'philosopher' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#7C3AED',
    gradient: 'from-violet-500 to-purple-600',
    genre: 'GENEL'
  },
  {
    id: 'usta-yorumcu',
    name: 'Usta Yorumcu',
    description: 'İşletmeler için güvenilir, topluluk için yol gösterici bir kullanıcı.',
    icon: '⭐',
    category: 'activity',
    requirement: { type: 'comment_count', value: 20 },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#EAB308',
    gradient: 'from-yellow-400 to-amber-500',
    genre: 'GENEL'
  },
  {
    id: 'efsane',
    name: 'Efsane',
    description: 'Hem kullanıcılar hem işletmeler için vazgeçilmez, sistemin yıldızı.',
    icon: '👑',
    category: 'activity',
    requirement: { type: 'comment_count', value: 50 },
    rarity: 'epic',
    points: 400,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-500 to-orange-500',
    genre: 'GENEL'
  },
  {
    id: 'taht-sahibi',
    name: 'Taht Sahibi',
    description: 'Topluluğumuzun zirvesinde, en üst seviyede oturan gerçek lider.',
    icon: '🏆',
    category: 'activity',
    requirement: { type: 'comment_count', value: 100 },
    rarity: 'legendary',
    points: 650,
    unlocked: false,
    color: '#FFD700',
    gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
    genre: 'GENEL'
  },
  {
    id: 'sakamatik',
    name: 'Şakamatik',
    description: 'Yorumlarıyla güldüren, ortamı neşelendiren üyemiz.',
    icon: '😄',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'funny' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500',
    genre: 'GENEL'
  },
  {
    id: 'saatli-bomba',
    name: 'Saatli Bomba',
    description: 'Her yorumu tartışma yaratır, gündemi belirler.',
    icon: '💣',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'controversial' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-500 to-orange-600',
    genre: 'GENEL'
  },
  {
    id: 'destekci',
    name: 'Destekçi',
    description: 'Yorum yazmaz ama beğenileri ve emojileriyle destek olur.',
    icon: '👍',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'supporter' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#3B82F6',
    gradient: 'from-blue-400 to-indigo-500',
    genre: 'GENEL'
  },
  {
    id: 'sessiz-sinema',
    name: 'Sessiz Sinema',
    description: 'Sessizce takip eder, yorum yazmaz ama hep izler.',
    icon: '👀',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'lurker' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#6B7280',
    gradient: 'from-gray-400 to-gray-600',
    genre: 'GENEL'
  },
  {
    id: 'tetikci',
    name: 'Tetikçi',
    description: 'Konu açılır açılmaz ilk hamleyi yapan hızlı oyuncu.',
    icon: '⚡',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'first_responder' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#FBBF24',
    gradient: 'from-yellow-400 to-amber-500',
    genre: 'GENEL'
  },
  {
    id: 'hizli-ofkeli',
    name: '7/24',
    description: 'Anında cevap verir, her zaman aktif ve tetiktedir.',
    icon: '🔥',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'always_active' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-500 to-pink-500',
    genre: 'GENEL'
  },
  {
    id: 'firtina',
    name: 'Fırtına',
    description: 'Birden gelir, yorumlarıyla ortalığı doldurur ve hızla kaybolur.',
    icon: '🌪️',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'storm' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-indigo-600',
    genre: 'GENEL'
  },
  {
    id: 'katalizor',
    name: 'Katalizör',
    description: 'Her hareketiyle değişimi hızlandırır, gelişime yön verir.',
    icon: '⚗️',
    category: 'special',
    requirement: { type: 'special_action', value: 'catalyst' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-emerald-500 to-green-600',
    genre: 'GENEL'
  },
  {
    id: 'tur-rehberi',
    name: 'Tur Rehberi',
    description: 'Yeni başlayanlara ışık tutar, sistemi tanıtır ve destek olur.',
    icon: '🧭',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'guide' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#0EA5E9',
    gradient: 'from-sky-400 to-blue-500',
    genre: 'GENEL'
  },
  {
    id: 'xray',
    name: 'X-Ray',
    description: 'Detayları görür, kimsenin fark etmediğini fark eder.',
    icon: '🔬',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'detail_spotter' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-600',
    genre: 'GENEL'
  },
  {
    id: 'mucevher',
    name: 'Mücevher',
    description: 'Az görünür ama geldiğinde çok büyük değer katar.',
    icon: '💎',
    category: 'special',
    requirement: { type: 'special_action', value: 'rare_valuable' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#A855F7',
    gradient: 'from-purple-500 to-fuchsia-600',
    genre: 'GENEL'
  },
  {
    id: 'surpriz-kutusu',
    name: 'Sürpriz Kutusu',
    description: 'Ne zaman ne yapacağı belli olmaz, sürprizlerle doludur.',
    icon: '🎁',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'unpredictable' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-orange-400 to-red-500',
    genre: 'GENEL'
  },
  {
    id: 'volkan',
    name: 'Volkan',
    description: 'Sessizdir ama patladığında ortamı aydınlatır ve coşturur.',
    icon: '🌋',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'explosive' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 to-orange-600',
    genre: 'GENEL'
  },
  {
    id: 'filiz',
    name: 'Filiz',
    description: 'Kısa sürede kök salar, hızla gelişir ve toplulukta yer edinir.',
    icon: '🌱',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'fast_growing' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#22C55E',
    gradient: 'from-green-400 to-emerald-500',
    genre: 'GENEL'
  },
  {
    id: 'ilham-kaynagi',
    name: 'İlham Kaynağı',
    description: 'Her hareketi yeni bir fikre dönüşür, topluluğa ilham olur.',
    icon: '💡',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'inspiring' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#FBBF24',
    gradient: 'from-yellow-400 to-orange-500',
    genre: 'GENEL'
  },
  {
    id: 'huysuz',
    name: 'Huysuz Şirin',
    description: 'Serttir ama samimidir; eleştirileriyle farklı bir renk katar.',
    icon: '😠',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'grumpy' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-rose-500',
    genre: 'GENEL'
  },
  {
    id: 'copy-paste',
    name: 'Copy-Paste',
    description: 'Hazır kalıpları kullanır ama katkısı hep süreklidir.',
    icon: '📋',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'repetitive' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#6B7280',
    gradient: 'from-gray-400 to-slate-500',
    genre: 'GENEL'
  },
  {
    id: 'emoji-ustasi',
    name: 'Emoji Ustası',
    description: 'Kelimeler yerine simgelerle kendini ifade eder.',
    icon: '😎',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'emoji_user' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
    genre: 'GENEL'
  },
  {
    id: 'drama-queen',
    name: 'Drama Queen',
    description: 'Küçük şeylerden büyük gündemler yaratır, renk katar.',
    icon: '👑',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'dramatic' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    genre: 'GENEL'
  },
  {
    id: 'yanki',
    name: 'Yankı',
    description: 'Her sözü yankılanır, toplulukta uzun süre etkisini gösterir.',
    icon: '📢',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'echo' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-indigo-600',
    genre: 'GENEL'
  },
  {
    id: 'sitemkar',
    name: 'Sitemkar',
    description: 'Her fırsatta içini döker, dertlerini paylaşır.',
    icon: '😔',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'complainer' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#64748B',
    gradient: 'from-slate-500 to-gray-600',
    genre: 'GENEL'
  },
  {
    id: 'ters-kose',
    name: 'Ters Köşe',
    description: 'Yorumları zekice, ince mizahlarla dolu; anlamak için dikkat ister.',
    icon: '🎯',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'subtle_humor' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-emerald-500 to-green-600',
    genre: 'GENEL'
  },
  {
    id: 'kelime-buyucusu',
    name: 'Kelime Büyücüsü',
    description: 'Kısa yazar ama en önemli noktayı söyler.',
    icon: '✨',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'concise' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#A855F7',
    gradient: 'from-purple-400 to-fuchsia-500',
    genre: 'GENEL'
  },
  {
    id: 'jet',
    name: 'Jet',
    description: 'Anında düşüncesini paylaşır, hiç vakit kaybetmez.',
    icon: '✈️',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'instant' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-blue-600',
    genre: 'GENEL'
  },
  {
    id: 'beyin-patlatan',
    name: 'Beyin Patlatan',
    description: 'Her yorumunda yeni bir öneri, yeni bir fikir vardır.',
    icon: '🧩',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'innovative' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-orange-500 to-red-500',
    genre: 'GENEL'
  },
  {
    id: 'keskin-nisanci',
    name: 'Keskin Nişancı',
    description: 'Az konuşur, öz konuşur. Yorumu bir bırakır, herkesin kalbine saplanır.',
    icon: '🎯',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'precise' },
    rarity: 'rare',
    points: 150,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 to-orange-600',
    genre: 'GENEL'
  },
  {
    id: 'muhabbet-kusu',
    name: 'Muhabbet Kuşu',
    description: 'Sessizlik mi? Onun olduğu yerde imkânsız. Her konuya bir çift sözü mutlaka vardır.',
    icon: '🦜',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'talkative' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600',
    genre: 'GENEL'
  },
  {
    id: 'kafein-bagimlisi',
    name: 'Kafein Bağımlısı',
    description: 'Kahve olmadan asla! En çok kahve çeşitlerini konuşur, her yudumda yeni bir yorum yapar.',
    icon: '☕',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'coffee_lover' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#92400E',
    gradient: 'from-amber-700 to-brown-800',
    genre: 'GENEL'
  },
  {
    id: 'gurme',
    name: 'Gurme',
    description: 'Tat duyusu radar gibi çalışır. Nerede yeni bir tat varsa, onu ilk yorumlayan odur.',
    icon: '🍽️',
    category: 'behavior',
    requirement: { type: 'behavior_pattern', value: 'food_critic' },
    rarity: 'common',
    points: 50,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-500 to-orange-600',
    genre: 'GENEL'
  }
]

// Unlock all badges for testing
TV_SHOW_BADGES.forEach(badge => {
  badge.unlocked = true
  badge.unlockedAt = new Date()
})

// Badge statistics by genre
export const GENRE_STATS = {
  'KOMEDİ': TV_SHOW_BADGES.filter(b => b.genre === 'KOMEDİ').length,
  'FANTASTİK': TV_SHOW_BADGES.filter(b => b.genre === 'FANTASTİK').length,
  'DRAM/SUÇ': TV_SHOW_BADGES.filter(b => b.genre === 'DRAM/SUÇ').length,
  'GİZEM/GERİLİM': TV_SHOW_BADGES.filter(b => b.genre === 'GİZEM/GERİLİM').length,
  'TARİH': TV_SHOW_BADGES.filter(b => b.genre === 'TARİH').length,
  'GİZEMLİ': TV_SHOW_BADGES.filter(b => b.genre === 'GİZEMLİ').length,
  'GENEL': TV_SHOW_BADGES.filter(b => b.genre === 'GENEL').length
}

export const TOTAL_TV_BADGES = TV_SHOW_BADGES.length


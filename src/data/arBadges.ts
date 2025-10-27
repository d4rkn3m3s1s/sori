// AR Badge Types
export interface ARBadge {
  id: string
  name: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical'
  category: 'food' | 'coffee' | 'shopping' | 'sports' | 'entertainment' | 'travel' | 'tech' | 'health'
  location: string
  distance: number
  coordinates: { lat: number; lng: number }
  description: string
  points: number
  discovered: boolean
  powerUp?: {
    type: 'double_points' | 'extra_scan' | 'rare_boost' | 'speed_boost' | 'lucky_charm'
    duration: number // dakika
    description: string
  }
  combo?: string[] // Bu rozetle kombine edilebilecek diğer rozet ID'leri
}

// Tüm AR Rozetler (25 adet!)
export const ALL_AR_BADGES: ARBadge[] = [
  // ☕ COFFEE CATEGORY
  {
    id: 'coffee-master-ar',
    name: 'Kahve Ustası',
    icon: '☕',
    rarity: 'rare',
    category: 'coffee',
    location: 'Starbucks Kadıköy',
    distance: 45,
    coordinates: { lat: 40.9903, lng: 29.0253 },
    description: 'Starbucks\'ta AR ile keşfet! Gerçek kahve tutkunlarının rozeti.',
    points: 250,
    discovered: false,
    powerUp: {
      type: 'double_points',
      duration: 30,
      description: '30 dakika boyunca 2x puan!'
    },
    combo: ['espresso-legend-ar', 'latte-artist-ar']
  },
  {
    id: 'espresso-legend-ar',
    name: 'Espresso Efsanesi',
    icon: '🔥',
    rarity: 'epic',
    category: 'coffee',
    location: 'Kahve Dünyası Beşiktaş',
    distance: 890,
    coordinates: { lat: 41.0453, lng: 29.0053 },
    description: 'Espresso severler için özel rozet! Güçlü ve etkileyici.',
    points: 400,
    discovered: false,
    powerUp: {
      type: 'speed_boost',
      duration: 15,
      description: '15 dakika hızlı tarama!'
    },
    combo: ['coffee-master-ar', 'cappuccino-king-ar']
  },
  {
    id: 'latte-artist-ar',
    name: 'Latte Sanatçısı',
    icon: '🎨',
    rarity: 'rare',
    category: 'coffee',
    location: 'Nero Cafe Nişantaşı',
    distance: 1250,
    coordinates: { lat: 41.0503, lng: 28.9953 },
    description: 'Latte art\'ın en iyileri için!',
    points: 300,
    discovered: false
  },
  {
    id: 'cappuccino-king-ar',
    name: 'Cappuccino Kralı',
    icon: '👑',
    rarity: 'legendary',
    category: 'coffee',
    location: 'Gloria Jean\'s Ataşehir',
    distance: 2100,
    coordinates: { lat: 40.9853, lng: 29.1253 },
    description: 'Cappuccino\'nun efsanevi ustası! Çok nadir bir rozet.',
    points: 800,
    discovered: false,
    powerUp: {
      type: 'rare_boost',
      duration: 60,
      description: '1 saat nadir rozet şansı +50%!'
    }
  },

  // 🍔 FOOD CATEGORY
  {
    id: 'fast-food-hunter-ar',
    name: 'Fast Food Avcısı',
    icon: '🍔',
    rarity: 'common',
    category: 'food',
    location: 'McDonald\'s Bağdat Cad.',
    distance: 120,
    coordinates: { lat: 40.9853, lng: 29.0353 },
    description: 'Fast food severlerin favorisi!',
    points: 100,
    discovered: false
  },
  {
    id: 'pizza-master-ar',
    name: 'Pizza Ustası',
    icon: '🍕',
    rarity: 'rare',
    category: 'food',
    location: 'Domino\'s Pizza Nişantaşı',
    distance: 580,
    coordinates: { lat: 41.0503, lng: 28.9953 },
    description: 'Pizza tutkunları için özel!',
    points: 250,
    discovered: false,
    powerUp: {
      type: 'extra_scan',
      duration: 20,
      description: '20 dakika ekstra tarama hakkı!'
    }
  },
  {
    id: 'burger-champion-ar',
    name: 'Burger Şampiyonu',
    icon: '🏆',
    rarity: 'epic',
    category: 'food',
    location: 'Burger King Zorlu Center',
    distance: 1850,
    coordinates: { lat: 41.0553, lng: 29.0153 },
    description: 'Burger kralının rozeti!',
    points: 450,
    discovered: false
  },
  {
    id: 'sushi-sensei-ar',
    name: 'Sushi Sensei',
    icon: '🍣',
    rarity: 'legendary',
    category: 'food',
    location: 'Tokyo Restaurant Bebek',
    distance: 2500,
    coordinates: { lat: 41.0803, lng: 29.0453 },
    description: 'Sushi ustalığının zirvesi! Efsanevi rozet.',
    points: 1000,
    discovered: false,
    powerUp: {
      type: 'lucky_charm',
      duration: 45,
      description: '45 dakika şans +30%!'
    }
  },

  // 🛍️ SHOPPING CATEGORY
  {
    id: 'shopping-legend-ar',
    name: 'Alışveriş Efsanesi',
    icon: '🛍️',
    rarity: 'epic',
    category: 'shopping',
    location: 'Nike Store Zorlu Center',
    distance: 230,
    coordinates: { lat: 41.0553, lng: 29.0153 },
    description: 'Alışveriş tutkunlarının rozeti!',
    points: 500,
    discovered: false
  },
  {
    id: 'fashion-icon-ar',
    name: 'Moda İkonu',
    icon: '👗',
    rarity: 'rare',
    category: 'shopping',
    location: 'Zara İstinye Park',
    distance: 1680,
    coordinates: { lat: 41.1103, lng: 29.0253 },
    description: 'Moda dünyasının yıldızı!',
    points: 350,
    discovered: false
  },
  {
    id: 'tech-guru-ar',
    name: 'Teknoloji Gurusu',
    icon: '💻',
    rarity: 'epic',
    category: 'tech',
    location: 'Apple Store Bağdat Cad.',
    distance: 780,
    coordinates: { lat: 40.9753, lng: 29.0553 },
    description: 'Teknoloji dünyasının ustası!',
    points: 550,
    discovered: false,
    powerUp: {
      type: 'double_points',
      duration: 25,
      description: '25 dakika 2x puan!'
    }
  },

  // 📚 ENTERTAINMENT CATEGORY
  {
    id: 'book-lover-ar',
    name: 'Kitap Kurdu',
    icon: '📚',
    rarity: 'rare',
    category: 'entertainment',
    location: 'D&R Kitap Mağazası',
    distance: 340,
    coordinates: { lat: 41.0103, lng: 29.0053 },
    description: 'Kitap severler için özel rozet!',
    points: 300,
    discovered: false
  },
  {
    id: 'cinema-fan-ar',
    name: 'Sinema Tutkunu',
    icon: '🎬',
    rarity: 'rare',
    category: 'entertainment',
    location: 'Cinemaximum AKM',
    distance: 1450,
    coordinates: { lat: 41.0353, lng: 28.9853 },
    description: 'Film severler burada!',
    points: 320,
    discovered: false
  },
  {
    id: 'music-maestro-ar',
    name: 'Müzik Maestro',
    icon: '🎵',
    rarity: 'epic',
    category: 'entertainment',
    location: 'Zorlu PSM',
    distance: 1920,
    coordinates: { lat: 41.0553, lng: 29.0153 },
    description: 'Müziğin ritmi!',
    points: 480,
    discovered: false
  },

  // 💪 SPORTS CATEGORY
  {
    id: 'fitness-warrior-ar',
    name: 'Fitness Savaşçısı',
    icon: '💪',
    rarity: 'rare',
    category: 'sports',
    location: 'Planet Fitness Etiler',
    distance: 580,
    coordinates: { lat: 41.0703, lng: 29.0353 },
    description: 'Spor tutkunlarının rozeti!',
    points: 280,
    discovered: false,
    powerUp: {
      type: 'speed_boost',
      duration: 20,
      description: '20 dakika hızlı tarama!'
    }
  },
  {
    id: 'yoga-master-ar',
    name: 'Yoga Ustası',
    icon: '🧘',
    rarity: 'epic',
    category: 'sports',
    location: 'Yoga Studio Nişantaşı',
    distance: 1380,
    coordinates: { lat: 41.0503, lng: 28.9953 },
    description: 'Huzur ve denge!',
    points: 420,
    discovered: false
  },
  {
    id: 'running-legend-ar',
    name: 'Koşu Efsanesi',
    icon: '🏃',
    rarity: 'legendary',
    category: 'sports',
    location: 'Nike Run Club Maslak',
    distance: 2800,
    coordinates: { lat: 41.1053, lng: 29.0253 },
    description: 'Koşunun kralı! Efsanevi rozet.',
    points: 900,
    discovered: false,
    powerUp: {
      type: 'speed_boost',
      duration: 40,
      description: '40 dakika süper hız!'
    }
  },

  // 🌍 TRAVEL CATEGORY
  {
    id: 'explorer-ar',
    name: 'Kaşif',
    icon: '🗺️',
    rarity: 'epic',
    category: 'travel',
    location: 'İstanbul Havalimanı',
    distance: 3500,
    coordinates: { lat: 41.2753, lng: 28.7453 },
    description: 'Dünyayı keşfet!',
    points: 600,
    discovered: false
  },
  {
    id: 'city-wanderer-ar',
    name: 'Şehir Gezgini',
    icon: '🏙️',
    rarity: 'rare',
    category: 'travel',
    location: 'Tarihi Yarımada',
    distance: 1650,
    coordinates: { lat: 41.0053, lng: 28.9753 },
    description: 'Şehrin her köşesini bil!',
    points: 340,
    discovered: false
  },

  // 💊 HEALTH CATEGORY
  {
    id: 'health-champion-ar',
    name: 'Sağlık Şampiyonu',
    icon: '💊',
    rarity: 'rare',
    category: 'health',
    location: 'Eczane Plus Kadıköy',
    distance: 420,
    coordinates: { lat: 40.9903, lng: 29.0253 },
    description: 'Sağlığına dikkat et!',
    points: 260,
    discovered: false
  },
  {
    id: 'wellness-guru-ar',
    name: 'Wellness Gurusu',
    icon: '🌿',
    rarity: 'epic',
    category: 'health',
    location: 'Healthy Life Etiler',
    distance: 1550,
    coordinates: { lat: 41.0703, lng: 29.0353 },
    description: 'Sağlıklı yaşamın sırrı!',
    points: 520,
    discovered: false,
    powerUp: {
      type: 'lucky_charm',
      duration: 30,
      description: '30 dakika şans +25%!'
    }
  },

  // 🎮 MYTHICAL ROZETLER (Çok Nadir!)
  {
    id: 'phoenix-ar',
    name: 'Anka Kuşu',
    icon: '🔥',
    rarity: 'mythical',
    category: 'entertainment',
    location: '??? Gizli Lokasyon',
    distance: 999,
    coordinates: { lat: 41.0253, lng: 29.0053 },
    description: 'Efsanevi Anka Kuşu! En nadir rozet. %0.1 şans!',
    points: 2000,
    discovered: false,
    powerUp: {
      type: 'rare_boost',
      duration: 120,
      description: '2 saat tüm nadir rozetler +100% şans!'
    },
    combo: ['dragon-ar', 'unicorn-ar']
  },
  {
    id: 'dragon-ar',
    name: 'Ejderha',
    icon: '🐉',
    rarity: 'mythical',
    category: 'entertainment',
    location: '??? Gizli Lokasyon',
    distance: 888,
    coordinates: { lat: 41.0353, lng: 29.0153 },
    description: 'Güçlü ejderha rozeti! Efsanevi güç.',
    points: 2500,
    discovered: false,
    powerUp: {
      type: 'double_points',
      duration: 60,
      description: '1 saat 3x puan!'
    }
  },
  {
    id: 'unicorn-ar',
    name: 'Tek Boynuzlu At',
    icon: '🦄',
    rarity: 'mythical',
    category: 'entertainment',
    location: '??? Gizli Lokasyon',
    distance: 777,
    coordinates: { lat: 41.0153, lng: 29.0253 },
    description: 'Sihirli tek boynuzlu at! En şanslı rozet.',
    points: 3000,
    discovered: false,
    powerUp: {
      type: 'lucky_charm',
      duration: 90,
      description: '90 dakika şans +50%!'
    }
  }
]

// Rozet kategorileri
export const BADGE_CATEGORIES = {
  food: { name: 'Yemek', icon: '🍔', color: 'from-orange-500 to-red-500' },
  coffee: { name: 'Kahve', icon: '☕', color: 'from-amber-500 to-brown-500' },
  shopping: { name: 'Alışveriş', icon: '🛍️', color: 'from-purple-500 to-pink-500' },
  sports: { name: 'Spor', icon: '💪', color: 'from-green-500 to-emerald-500' },
  entertainment: { name: 'Eğlence', icon: '🎬', color: 'from-blue-500 to-cyan-500' },
  travel: { name: 'Seyahat', icon: '✈️', color: 'from-indigo-500 to-purple-500' },
  tech: { name: 'Teknoloji', icon: '💻', color: 'from-gray-500 to-slate-500' },
  health: { name: 'Sağlık', icon: '💊', color: 'from-teal-500 to-green-500' }
}

// Rozet kombinasyonları
export const BADGE_COMBOS = [
  {
    id: 'coffee-trinity',
    name: 'Kahve Üçlüsü',
    badges: ['coffee-master-ar', 'espresso-legend-ar', 'latte-artist-ar'],
    reward: {
      points: 500,
      specialBadge: '☕✨',
      description: 'Tüm kahve rozetlerini topla!'
    }
  },
  {
    id: 'food-master',
    name: 'Yemek Ustası',
    badges: ['fast-food-hunter-ar', 'pizza-master-ar', 'burger-champion-ar', 'sushi-sensei-ar'],
    reward: {
      points: 1000,
      specialBadge: '🍴👑',
      description: 'Tüm yemek rozetleri senin!'
    }
  },
  {
    id: 'mythical-trinity',
    name: 'Efsanevi Üçlü',
    badges: ['phoenix-ar', 'dragon-ar', 'unicorn-ar'],
    reward: {
      points: 5000,
      specialBadge: '🌟✨',
      description: 'Tüm mitolojik rozetler! İnanılmaz!'
    }
  }
]

// Günlük enerji sistemi
export interface DailyEnergy {
  current: number
  max: number
  regenRate: number // dakika başına
  lastUpdate: Date
}

export const INITIAL_ENERGY: DailyEnergy = {
  current: 100,
  max: 100,
  regenRate: 1, // Dakikada 1 enerji
  lastUpdate: new Date()
}

// Tarama maliyeti
export const SCAN_COST = {
  normal: 10, // Normal tarama
  boost: 20, // Hızlı tarama
  lucky: 30 // Şanslı tarama
}










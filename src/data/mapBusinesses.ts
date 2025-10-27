// Business Types
export interface Business {
  id: string
  name: string
  category: 'cafe' | 'restaurant' | 'fastfood' | 'shop' | 'gym' | 'bookstore' | 'cinema' | 'pharmacy' | 'beauty' | 'tech'
  coordinates: { lat: number; lng: number }
  distance: number
  rating: number
  reviews: number
  isNew: boolean
  hasBonus: boolean
  bonusPoints: number
  address: string
  description: string
  isVisited: boolean
  lastVisit?: Date
  visitCount: number
  badges: string[]
  openHours: string
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  photos?: string[]
  specialOffer?: string
  eventActive?: boolean
}

// Check-in streak sistemi
export interface CheckInStreak {
  current: number
  longest: number
  lastCheckIn: Date
  nextMilestone: number
}

// Özel etkinlikler
export interface SpecialEvent {
  id: string
  name: string
  description: string
  businessIds: string[]
  startDate: Date
  endDate: Date
  bonusMultiplier: number
  icon: string
}

// 50+ İşletme!
export const ALL_BUSINESSES: Business[] = [
  // ☕ CAFES (10)
  {
    id: 'biz-cafe-1',
    name: 'Starbucks Kadıköy',
    category: 'cafe',
    coordinates: { lat: 40.9903, lng: 29.0253 },
    distance: 45,
    rating: 4.8,
    reviews: 1240,
    isNew: false,
    hasBonus: true,
    bonusPoints: 50,
    address: 'Kadıköy, Moda Cad. No:45',
    description: 'Özel kahve çeşitleri ve rahat ortam',
    isVisited: true,
    lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    visitCount: 8,
    badges: ['Kahve Ustası', 'Sadık Müşteri'],
    openHours: '07:00 - 23:00',
    priceRange: '$$',
    specialOffer: '☕ Her 5. kahve bedava!'
  },
  {
    id: 'biz-cafe-2',
    name: 'Kahve Dünyası Beşiktaş',
    category: 'cafe',
    coordinates: { lat: 41.0453, lng: 29.0053 },
    distance: 890,
    rating: 4.7,
    reviews: 856,
    isNew: false,
    hasBonus: true,
    bonusPoints: 45,
    address: 'Beşiktaş Meydanı',
    description: 'Türk kahvesi ve tatlılar',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '08:00 - 22:00',
    priceRange: '$$'
  },
  {
    id: 'biz-cafe-3',
    name: 'Nero Cafe Nişantaşı',
    category: 'cafe',
    coordinates: { lat: 41.0503, lng: 28.9953 },
    distance: 1250,
    rating: 4.6,
    reviews: 643,
    isNew: true,
    hasBonus: true,
    bonusPoints: 60,
    address: 'Nişantaşı, Teşvikiye Cad.',
    description: 'İtalyan kahve kültürü',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '07:30 - 23:30',
    priceRange: '$$$',
    eventActive: true
  },
  {
    id: 'biz-cafe-4',
    name: 'Gloria Jean\'s Ataşehir',
    category: 'cafe',
    coordinates: { lat: 40.9853, lng: 29.1253 },
    distance: 2100,
    rating: 4.5,
    reviews: 521,
    isNew: false,
    hasBonus: false,
    bonusPoints: 40,
    address: 'Ataşehir, Palladium AVM',
    description: 'Aromalı kahveler',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '09:00 - 22:00',
    priceRange: '$$'
  },
  {
    id: 'biz-cafe-5',
    name: 'Caribou Coffee Zorlu',
    category: 'cafe',
    coordinates: { lat: 41.0553, lng: 29.0153 },
    distance: 1850,
    rating: 4.7,
    reviews: 734,
    isNew: true,
    hasBonus: true,
    bonusPoints: 55,
    address: 'Zorlu Center',
    description: 'Premium kahve deneyimi',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '08:00 - 23:00',
    priceRange: '$$$'
  },

  // 🍔 FAST FOOD (8)
  {
    id: 'biz-ff-1',
    name: 'McDonald\'s Bağdat Cad.',
    category: 'fastfood',
    coordinates: { lat: 40.9853, lng: 29.0353 },
    distance: 120,
    rating: 4.5,
    reviews: 890,
    isNew: false,
    hasBonus: false,
    bonusPoints: 25,
    address: 'Bağdat Cad. No:123',
    description: 'Fast food favorileri',
    isVisited: true,
    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    visitCount: 3,
    badges: [],
    openHours: '24 Saat',
    priceRange: '$'
  },
  {
    id: 'biz-ff-2',
    name: 'Burger King Zorlu',
    category: 'fastfood',
    coordinates: { lat: 41.0553, lng: 29.0153 },
    distance: 1850,
    rating: 4.4,
    reviews: 567,
    isNew: false,
    hasBonus: true,
    bonusPoints: 30,
    address: 'Zorlu Center',
    description: 'Whopper\'ın evi',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 23:00',
    priceRange: '$',
    specialOffer: '🍔 2 al 1 öde!'
  },
  {
    id: 'biz-ff-3',
    name: 'KFC Kadıköy',
    category: 'fastfood',
    coordinates: { lat: 40.9903, lng: 29.0253 },
    distance: 75,
    rating: 4.3,
    reviews: 432,
    isNew: false,
    hasBonus: false,
    bonusPoints: 25,
    address: 'Kadıköy Çarşı',
    description: 'Tavuk uzmanları',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 00:00',
    priceRange: '$'
  },
  {
    id: 'biz-ff-4',
    name: 'Domino\'s Pizza Nişantaşı',
    category: 'fastfood',
    coordinates: { lat: 41.0503, lng: 28.9953 },
    distance: 580,
    rating: 4.6,
    reviews: 1089,
    isNew: false,
    hasBonus: true,
    bonusPoints: 35,
    address: 'Nişantaşı',
    description: '30 dakika garantisi',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '11:00 - 02:00',
    priceRange: '$$'
  },
  {
    id: 'biz-ff-5',
    name: 'Subway Levent',
    category: 'fastfood',
    coordinates: { lat: 41.0753, lng: 29.0053 },
    distance: 1680,
    rating: 4.4,
    reviews: 345,
    isNew: true,
    hasBonus: true,
    bonusPoints: 30,
    address: 'Levent, Metrocity',
    description: 'Sağlıklı sandviçler',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '09:00 - 22:00',
    priceRange: '$'
  },

  // 🍽️ RESTAURANTS (10)
  {
    id: 'biz-rest-1',
    name: 'Nusr-Et Steakhouse',
    category: 'restaurant',
    coordinates: { lat: 41.0353, lng: 29.0053 },
    distance: 980,
    rating: 4.9,
    reviews: 2341,
    isNew: false,
    hasBonus: true,
    bonusPoints: 150,
    address: 'Etiler',
    description: 'Premium et deneyimi',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '12:00 - 00:00',
    priceRange: '$$$$',
    specialOffer: '🥩 VIP masa bonusu!'
  },
  {
    id: 'biz-rest-2',
    name: 'Şef\'in Mutfağı',
    category: 'restaurant',
    coordinates: { lat: 40.9953, lng: 29.0153 },
    distance: 450,
    rating: 4.7,
    reviews: 876,
    isNew: false,
    hasBonus: true,
    bonusPoints: 80,
    address: 'Kadıköy Sahil',
    description: 'Deniz manzaralı lezzet',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '11:00 - 23:00',
    priceRange: '$$$'
  },
  {
    id: 'biz-rest-3',
    name: 'Tokyo Restaurant Bebek',
    category: 'restaurant',
    coordinates: { lat: 41.0803, lng: 29.0453 },
    distance: 2500,
    rating: 4.8,
    reviews: 1234,
    isNew: true,
    hasBonus: true,
    bonusPoints: 120,
    address: 'Bebek',
    description: 'Otantik Japon mutfağı',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '12:00 - 23:30',
    priceRange: '$$$$',
    eventActive: true
  },

  // 🛍️ SHOPPING (12)
  {
    id: 'biz-shop-1',
    name: 'Nike Store Zorlu',
    category: 'shop',
    coordinates: { lat: 41.0553, lng: 29.0153 },
    distance: 230,
    rating: 4.9,
    reviews: 2100,
    isNew: true,
    hasBonus: true,
    bonusPoints: 100,
    address: 'Zorlu Center AVM',
    description: 'Spor giyim ve ekipmanları',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 22:00',
    priceRange: '$$$',
    specialOffer: '👟 %20 indirim kuponu!'
  },
  {
    id: 'biz-shop-2',
    name: 'Zara İstinye Park',
    category: 'shop',
    coordinates: { lat: 41.1103, lng: 29.0253 },
    distance: 1680,
    rating: 4.6,
    reviews: 1567,
    isNew: false,
    hasBonus: true,
    bonusPoints: 90,
    address: 'İstinye Park AVM',
    description: 'Moda ve trendler',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 22:00',
    priceRange: '$$'
  },
  {
    id: 'biz-shop-3',
    name: 'H&M Bağdat Cad.',
    category: 'shop',
    coordinates: { lat: 40.9753, lng: 29.0553 },
    distance: 890,
    rating: 4.5,
    reviews: 987,
    isNew: false,
    hasBonus: false,
    bonusPoints: 70,
    address: 'Bağdat Caddesi',
    description: 'Uygun fiyat moda',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 21:00',
    priceRange: '$'
  },

  // 💻 TECH (5)
  {
    id: 'biz-tech-1',
    name: 'Apple Store Bağdat',
    category: 'tech',
    coordinates: { lat: 40.9753, lng: 29.0553 },
    distance: 780,
    rating: 4.8,
    reviews: 1456,
    isNew: false,
    hasBonus: true,
    bonusPoints: 150,
    address: 'Bağdat Cad.',
    description: 'Apple ürünleri',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 21:00',
    priceRange: '$$$$'
  },
  {
    id: 'biz-tech-2',
    name: 'MediaMarkt Zorlu',
    category: 'tech',
    coordinates: { lat: 41.0553, lng: 29.0153 },
    distance: 1850,
    rating: 4.6,
    reviews: 876,
    isNew: false,
    hasBonus: true,
    bonusPoints: 120,
    address: 'Zorlu Center',
    description: 'Elektronik süpermarket',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 22:00',
    priceRange: '$$$'
  },

  // 💪 GYMS (5)
  {
    id: 'biz-gym-1',
    name: 'Planet Fitness Etiler',
    category: 'gym',
    coordinates: { lat: 41.0703, lng: 29.0353 },
    distance: 580,
    rating: 4.6,
    reviews: 432,
    isNew: false,
    hasBonus: false,
    bonusPoints: 40,
    address: 'Etiler, Nispetiye Cad.',
    description: 'Modern spor salonu',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '06:00 - 23:00',
    priceRange: '$$'
  },
  {
    id: 'biz-gym-2',
    name: 'Gold\'s Gym Nişantaşı',
    category: 'gym',
    coordinates: { lat: 41.0503, lng: 28.9953 },
    distance: 1380,
    rating: 4.7,
    reviews: 678,
    isNew: false,
    hasBonus: true,
    bonusPoints: 50,
    address: 'Nişantaşı',
    description: 'Profesyonel fitness',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '06:00 - 00:00',
    priceRange: '$$$'
  },

  // 📚 BOOKSTORES (3)
  {
    id: 'biz-book-1',
    name: 'D&R İstinye Park',
    category: 'bookstore',
    coordinates: { lat: 41.0103, lng: 29.0053 },
    distance: 340,
    rating: 4.7,
    reviews: 567,
    isNew: true,
    hasBonus: true,
    bonusPoints: 75,
    address: 'İstinye Park AVM',
    description: 'Kitap, müzik ve teknoloji',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 22:00',
    priceRange: '$$'
  },

  // 🎬 CINEMA (3)
  {
    id: 'biz-cinema-1',
    name: 'Cinemaximum AKM',
    category: 'cinema',
    coordinates: { lat: 41.0353, lng: 28.9853 },
    distance: 1450,
    rating: 4.8,
    reviews: 2341,
    isNew: false,
    hasBonus: true,
    bonusPoints: 100,
    address: 'Taksim AKM',
    description: 'Premium sinema deneyimi',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 02:00',
    priceRange: '$$$',
    specialOffer: '🎬 2 bilet al, mısır hediye!'
  },

  // 💊 PHARMACY (2)
  {
    id: 'biz-pharm-1',
    name: 'Eczane Plus Kadıköy',
    category: 'pharmacy',
    coordinates: { lat: 40.9903, lng: 29.0253 },
    distance: 420,
    rating: 4.6,
    reviews: 234,
    isNew: false,
    hasBonus: true,
    bonusPoints: 35,
    address: 'Kadıköy Çarşı',
    description: 'Sağlık danışmanlığı',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '08:00 - 22:00',
    priceRange: '$'
  },

  // 💅 BEAUTY (2)
  {
    id: 'biz-beauty-1',
    name: 'Sephora Zorlu',
    category: 'beauty',
    coordinates: { lat: 41.0553, lng: 29.0153 },
    distance: 1850,
    rating: 4.7,
    reviews: 1234,
    isNew: true,
    hasBonus: true,
    bonusPoints: 110,
    address: 'Zorlu Center',
    description: 'Güzellik ve kozmetik',
    isVisited: false,
    visitCount: 0,
    badges: [],
    openHours: '10:00 - 22:00',
    priceRange: '$$$'
  }
]

// Özel Etkinlikler
export const SPECIAL_EVENTS: SpecialEvent[] = [
  {
    id: 'event-weekend',
    name: 'Hafta Sonu Bonusu',
    description: 'Cumartesi ve Pazar 2x puan!',
    businessIds: [], // Tüm işletmeler
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    bonusMultiplier: 2,
    icon: '🎉'
  },
  {
    id: 'event-sushi',
    name: 'Sushi Festivali',
    description: 'Japon restoranlarında 3x puan!',
    businessIds: ['biz-rest-3'],
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    bonusMultiplier: 3,
    icon: '🍣'
  },
  {
    id: 'event-coffee',
    name: 'Kahve Haftası',
    description: 'Tüm kafelerde ekstra bonus!',
    businessIds: ['biz-cafe-1', 'biz-cafe-2', 'biz-cafe-3', 'biz-cafe-4', 'biz-cafe-5'],
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    bonusMultiplier: 1.5,
    icon: '☕'
  }
]

// Keşif Görevleri
export interface ExplorerChallenge {
  id: string
  name: string
  description: string
  requirement: {
    type: 'visit_count' | 'category_diversity' | 'distance' | 'streak' | 'new_places'
    target: number
    categories?: string[]
  }
  reward: {
    points: number
    badge?: string
    specialItem?: string
  }
  progress: number
  completed: boolean
  deadline?: Date
}

export const EXPLORER_CHALLENGES: ExplorerChallenge[] = [
  {
    id: 'challenge-explorer',
    name: '🗺️ Şehir Kaşifi',
    description: '10 farklı yere check-in yap',
    requirement: {
      type: 'visit_count',
      target: 10
    },
    reward: {
      points: 500,
      badge: 'Şehir Kaşifi'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'challenge-diverse',
    name: '🎭 Çeşitlilik Ustası',
    description: '5 farklı kategoriden check-in yap',
    requirement: {
      type: 'category_diversity',
      target: 5
    },
    reward: {
      points: 750,
      badge: 'Çeşitlilik Uzmanı'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'challenge-marathon',
    name: '🏃 Maraton',
    description: 'Toplam 10km mesafe kat et',
    requirement: {
      type: 'distance',
      target: 10000 // metre
    },
    reward: {
      points: 1000,
      badge: 'Maraton Koşucusu',
      specialItem: '2x Puan Kuponu'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'challenge-streak',
    name: '🔥 Ateş Topu',
    description: '7 gün üst üste check-in yap',
    requirement: {
      type: 'streak',
      target: 7
    },
    reward: {
      points: 2000,
      badge: 'Ateş Topu',
      specialItem: '3x Puan Kuponu'
    },
    progress: 0,
    completed: false,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'challenge-newbie',
    name: '✨ Yeni Keşifler',
    description: '5 yeni yer keşfet (ilk ziyaret)',
    requirement: {
      type: 'new_places',
      target: 5
    },
    reward: {
      points: 1500,
      badge: 'İlk Keşif',
      specialItem: 'Sürpriz Hediye Kutusu'
    },
    progress: 0,
    completed: false
  }
]

// Kategori ikonları ve renkleri
export const CATEGORY_CONFIG = {
  cafe: { name: 'Kafe', icon: '☕', color: 'from-amber-500 to-orange-500' },
  restaurant: { name: 'Restoran', icon: '🍽️', color: 'from-red-500 to-pink-500' },
  fastfood: { name: 'Fast Food', icon: '🍔', color: 'from-yellow-500 to-orange-500' },
  shop: { name: 'Mağaza', icon: '🛍️', color: 'from-purple-500 to-pink-500' },
  gym: { name: 'Spor Salonu', icon: '💪', color: 'from-green-500 to-emerald-500' },
  bookstore: { name: 'Kitapçı', icon: '📚', color: 'from-blue-500 to-indigo-500' },
  cinema: { name: 'Sinema', icon: '🎬', color: 'from-indigo-500 to-purple-500' },
  pharmacy: { name: 'Eczane', icon: '💊', color: 'from-teal-500 to-cyan-500' },
  beauty: { name: 'Güzellik', icon: '💅', color: 'from-pink-500 to-rose-500' },
  tech: { name: 'Teknoloji', icon: '💻', color: 'from-gray-500 to-slate-600' }
}










export interface Reward {
  id: string
  name: string
  description: string
  icon: string
  type: 'badge' | 'theme' | 'avatar' | 'coupon' | 'feature' | 'boost'
  price: number
  originalPrice?: number
  discount?: number
  stock?: number
  limited?: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  color: string
  gradient: string
  purchased: boolean
  featured?: boolean
}

export const REWARD_STORE: Reward[] = [
  // BADGES
  {
    id: 'vip-badge',
    name: 'VIP Rozeti',
    description: 'Özel VIP rozeti kazanın ve profilinizde gösterin',
    icon: '👑',
    type: 'badge',
    price: 500,
    rarity: 'epic',
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500',
    purchased: false,
    featured: true
  },
  {
    id: 'diamond-badge',
    name: 'Elmas Rozeti',
    description: 'Parlak elmas rozeti ile farkınızı gösterin',
    icon: '💎',
    type: 'badge',
    price: 1000,
    rarity: 'legendary',
    color: '#3B82F6',
    gradient: 'from-blue-400 to-cyan-500',
    purchased: false,
    featured: true
  },
  {
    id: 'fire-badge',
    name: 'Ateş Rozeti',
    description: 'Tutkulu yorumlarınız için ateş rozeti',
    icon: '🔥',
    type: 'badge',
    price: 300,
    rarity: 'rare',
    color: '#EF4444',
    gradient: 'from-red-400 to-orange-500',
    purchased: false
  },
  {
    id: 'star-badge',
    name: 'Yıldız Rozeti',
    description: 'Parlayan yıldız rozeti',
    icon: '⭐',
    type: 'badge',
    price: 250,
    rarity: 'rare',
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-400',
    purchased: false
  },

  // THEMES
  {
    id: 'galaxy-theme',
    name: 'Galaksi Teması',
    description: 'Uzay temalı özel renk paleti',
    icon: '🌌',
    type: 'theme',
    price: 750,
    rarity: 'epic',
    color: '#8B5CF6',
    gradient: 'from-purple-600 via-pink-500 to-blue-500',
    purchased: false,
    featured: true
  },
  {
    id: 'sunset-theme',
    name: 'Gün Batımı Teması',
    description: 'Sıcak gün batımı renkleri',
    icon: '🌅',
    type: 'theme',
    price: 400,
    rarity: 'rare',
    color: '#F59E0B',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    purchased: false
  },
  {
    id: 'ocean-theme',
    name: 'Okyanus Teması',
    description: 'Sakin okyanus mavi tonları',
    icon: '🌊',
    type: 'theme',
    price: 400,
    rarity: 'rare',
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-500',
    purchased: false
  },

  // AVATAR FRAMES
  {
    id: 'gold-frame',
    name: 'Altın Çerçeve',
    description: 'Avatarınız için lüks altın çerçeve',
    icon: '🖼️',
    type: 'avatar',
    price: 600,
    rarity: 'epic',
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
    purchased: false
  },
  {
    id: 'rainbow-frame',
    name: 'Gökkuşağı Çerçeve',
    description: 'Renkli gökkuşağı çerçevesi',
    icon: '🌈',
    type: 'avatar',
    price: 500,
    rarity: 'rare',
    color: '#EC4899',
    gradient: 'from-pink-500 via-purple-500 to-indigo-500',
    purchased: false
  },
  {
    id: 'fire-frame',
    name: 'Ateş Çerçevesi',
    description: 'Animasyonlu ateş efekti çerçeve',
    icon: '🔥',
    type: 'avatar',
    price: 800,
    rarity: 'epic',
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-600',
    purchased: false
  },

  // COUPONS
  {
    id: 'coffee-coupon-10',
    name: '%10 Kahve İndirimi',
    description: 'Tüm kahve işletmelerinde geçerli',
    icon: '☕',
    type: 'coupon',
    price: 200,
    stock: 50,
    limited: true,
    rarity: 'common',
    color: '#92400E',
    gradient: 'from-amber-700 to-orange-600',
    purchased: false,
    featured: true
  },
  {
    id: 'restaurant-coupon-15',
    name: '%15 Restoran İndirimi',
    description: 'Seçili restoranlarda geçerli',
    icon: '🍽️',
    type: 'coupon',
    price: 300,
    stock: 30,
    limited: true,
    rarity: 'rare',
    color: '#DC2626',
    gradient: 'from-red-600 to-rose-600',
    purchased: false
  },
  {
    id: 'shopping-coupon-20',
    name: '%20 Alışveriş İndirimi',
    description: 'Partner marketlerde kullan',
    icon: '🛍️',
    type: 'coupon',
    price: 400,
    stock: 20,
    limited: true,
    rarity: 'rare',
    color: '#7C3AED',
    gradient: 'from-purple-600 to-pink-600',
    purchased: false
  },

  // FEATURES
  {
    id: 'ad-free-month',
    name: '1 Ay Reklamsız',
    description: '30 gün reklamsız deneyim',
    icon: '🚫',
    type: 'feature',
    price: 500,
    rarity: 'epic',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-500',
    purchased: false
  },
  {
    id: 'priority-support',
    name: 'Öncelikli Destek',
    description: '1 ay öncelikli müşteri desteği',
    icon: '⚡',
    type: 'feature',
    price: 450,
    rarity: 'rare',
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
    purchased: false
  },
  {
    id: 'custom-username',
    name: 'Özel Kullanıcı Adı',
    description: 'Benzersiz kullanıcı adı seç',
    icon: '✍️',
    type: 'feature',
    price: 350,
    rarity: 'rare',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-500',
    purchased: false
  },

  // BOOSTS
  {
    id: 'double-xp-24h',
    name: '2x XP (24 Saat)',
    description: '24 saat boyunca çift XP kazan',
    icon: '⚡',
    type: 'boost',
    price: 250,
    rarity: 'common',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-500',
    purchased: false
  },
  {
    id: 'triple-xp-24h',
    name: '3x XP (24 Saat)',
    description: '24 saat boyunca üçlü XP',
    icon: '⚡',
    type: 'boost',
    price: 450,
    stock: 10,
    limited: true,
    rarity: 'epic',
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
    purchased: false,
    featured: true
  },
  {
    id: 'lucky-wheel-spin',
    name: 'Şans Çarkı +5 Spin',
    description: 'Ekstra 5 çevirme hakkı',
    icon: '🎰',
    type: 'boost',
    price: 200,
    rarity: 'common',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-500',
    purchased: false
  }
]

// Category labels
export const REWARD_CATEGORIES = {
  all: { label: 'Tümü', icon: '🌟' },
  badge: { label: 'Rozetler', icon: '🏆' },
  theme: { label: 'Temalar', icon: '🎨' },
  avatar: { label: 'Avatar', icon: '🖼️' },
  coupon: { label: 'Kuponlar', icon: '🎫' },
  feature: { label: 'Özellikler', icon: '✨' },
  boost: { label: 'Güçlendirme', icon: '⚡' }
}

// Calculate total spent
export const calculateTotalSpent = (rewards: Reward[]) => {
  return rewards.filter(r => r.purchased).reduce((sum, r) => sum + r.price, 0)
}





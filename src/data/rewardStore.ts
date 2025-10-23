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
  {
    id: 'cosmic-frame',
    name: '🌟 Kozmik Çerçeve',
    description: 'Parlayan yıldız efekti',
    icon: '🌟',
    type: 'avatar',
    price: 1200,
    rarity: 'legendary',
    color: '#FFD700',
    gradient: 'from-yellow-300 via-purple-400 to-indigo-600',
    purchased: false,
    featured: true
  },
  {
    id: 'diamond-frame',
    name: '💎 Elmas Çerçeve',
    description: 'Parlayan elmas animasyonu',
    icon: '💎',
    type: 'avatar',
    price: 950,
    rarity: 'epic',
    color: '#00CED1',
    gradient: 'from-cyan-300 to-blue-500',
    purchased: false
  },

  // EXCLUSIVE THEMES
  {
    id: 'dracarys-theme',
    name: '🐉 Dracarys Teması',
    description: 'Game of Thrones özel ejderha teması',
    icon: '🐉',
    type: 'theme',
    price: 1500,
    rarity: 'legendary',
    color: '#FF4500',
    gradient: 'from-red-600 via-orange-500 to-yellow-500',
    purchased: false,
    featured: true
  },
  {
    id: 'neon-cyberpunk-theme',
    name: '⚡ Neon Cyberpunk',
    description: 'Futuristik neon renkler',
    icon: '⚡',
    type: 'theme',
    price: 900,
    rarity: 'epic',
    color: '#00FFFF',
    gradient: 'from-cyan-400 via-purple-500 to-pink-500',
    purchased: false
  },
  {
    id: 'aurora-theme',
    name: '🌌 Aurora Borealis',
    description: 'Kuzey ışıkları teması',
    icon: '🌌',
    type: 'theme',
    price: 850,
    rarity: 'epic',
    color: '#00FF7F',
    gradient: 'from-green-300 via-blue-400 to-purple-500',
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
  {
    id: 'custom-profile-music',
    name: '🎵 Profil Müziği',
    description: 'Profiline özel müzik ekle',
    icon: '🎵',
    type: 'feature',
    price: 600,
    rarity: 'epic',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    purchased: false
  },
  {
    id: 'animated-avatar',
    name: '🎬 Hareketli Avatar',
    description: 'GIF avatar kullanma hakkı',
    icon: '🎬',
    type: 'feature',
    price: 750,
    rarity: 'epic',
    color: '#8B5CF6',
    gradient: 'from-purple-600 to-indigo-600',
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






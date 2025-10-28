export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'comments' | 'badges' | 'points' | 'social' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  requirement: {
    type: 'comment_count' | 'badge_count' | 'points_total' | 'streak_days' | 'special'
    value: number
  }
  reward: {
    points: number
    badge?: string
  }
  progress: number
  unlocked: boolean
  unlockedAt?: Date
  color: string
  gradient: string
}

export const ACHIEVEMENTS: Achievement[] = [
  // COMMENT ACHIEVEMENTS
  {
    id: 'first-comment',
    title: 'İlk Adım',
    description: 'İlk yorumunu yap',
    icon: '🎤',
    category: 'comments',
    rarity: 'common',
    requirement: { type: 'comment_count', value: 1 },
    reward: { points: 50 },
    progress: 0,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'comments-10',
    title: 'Konuşkan',
    description: '10 yorum yap',
    icon: '💬',
    category: 'comments',
    rarity: 'common',
    requirement: { type: 'comment_count', value: 10 },
    reward: { points: 100 },
    progress: 0,
    unlocked: false,
    color: '#3B82F6',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'comments-50',
    title: 'Yorum Ustası',
    description: '50 yorum yap',
    icon: '🗣️',
    category: 'comments',
    rarity: 'rare',
    requirement: { type: 'comment_count', value: 50 },
    reward: { points: 250 },
    progress: 0,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 'comments-100',
    title: 'Efsane Yorumcu',
    description: '100 yorum yap',
    icon: '👑',
    category: 'comments',
    rarity: 'epic',
    requirement: { type: 'comment_count', value: 100 },
    reward: { points: 500 },
    progress: 0,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'comments-500',
    title: 'Yorum Tanrısı',
    description: '500 yorum yap',
    icon: '⚡',
    category: 'comments',
    rarity: 'legendary',
    requirement: { type: 'comment_count', value: 500 },
    reward: { points: 2000, badge: 'god-commenter' },
    progress: 0,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-rose-600'
  },

  // BADGE ACHIEVEMENTS
  {
    id: 'badges-5',
    title: 'Rozet Koleksiyoncusu',
    description: '5 rozet kazan',
    icon: '🏅',
    category: 'badges',
    rarity: 'common',
    requirement: { type: 'badge_count', value: 5 },
    reward: { points: 150 },
    progress: 0,
    unlocked: false,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'badges-10',
    title: 'Rozet Avcısı',
    description: '10 rozet kazan',
    icon: '🎖️',
    category: 'badges',
    rarity: 'rare',
    requirement: { type: 'badge_count', value: 10 },
    reward: { points: 300 },
    progress: 0,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 'badges-25',
    title: 'Rozet Efendisi',
    description: '25 rozet kazan',
    icon: '🏆',
    category: 'badges',
    rarity: 'epic',
    requirement: { type: 'badge_count', value: 25 },
    reward: { points: 750 },
    progress: 0,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'badges-50',
    title: 'Rozet Efsanesi',
    description: '50 rozet kazan',
    icon: '💎',
    category: 'badges',
    rarity: 'legendary',
    requirement: { type: 'badge_count', value: 50 },
    reward: { points: 2500, badge: 'badge-legend' },
    progress: 0,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-rose-600'
  },

  // POINTS ACHIEVEMENTS
  {
    id: 'points-1000',
    title: 'Yükselen Yıldız',
    description: '1000 puan kazan',
    icon: '⭐',
    category: 'points',
    rarity: 'common',
    requirement: { type: 'points_total', value: 1000 },
    reward: { points: 200 },
    progress: 0,
    unlocked: false,
    color: '#3B82F6',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'points-5000',
    title: 'Parlak Yıldız',
    description: '5000 puan kazan',
    icon: '🌟',
    category: 'points',
    rarity: 'rare',
    requirement: { type: 'points_total', value: 5000 },
    reward: { points: 500 },
    progress: 0,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 'points-10000',
    title: 'Süper Yıldız',
    description: '10000 puan kazan',
    icon: '✨',
    category: 'points',
    rarity: 'epic',
    requirement: { type: 'points_total', value: 10000 },
    reward: { points: 1000 },
    progress: 0,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'points-50000',
    title: 'Efsanevi Yıldız',
    description: '50000 puan kazan',
    icon: '🌠',
    category: 'points',
    rarity: 'legendary',
    requirement: { type: 'points_total', value: 50000 },
    reward: { points: 5000, badge: 'legendary-star' },
    progress: 0,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-rose-600'
  },

  // STREAK ACHIEVEMENTS
  {
    id: 'streak-3',
    title: 'Kararlı',
    description: '3 gün üst üste yorum yap',
    icon: '🔥',
    category: 'social',
    rarity: 'common',
    requirement: { type: 'streak_days', value: 3 },
    reward: { points: 150 },
    progress: 0,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'streak-7',
    title: 'Azimli',
    description: '7 gün üst üste yorum yap',
    icon: '🔥',
    category: 'social',
    rarity: 'rare',
    requirement: { type: 'streak_days', value: 7 },
    reward: { points: 350 },
    progress: 0,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-400 to-rose-500'
  },
  {
    id: 'streak-30',
    title: 'Ateş Gibi',
    description: '30 gün üst üste yorum yap',
    icon: '🔥',
    category: 'social',
    rarity: 'epic',
    requirement: { type: 'streak_days', value: 30 },
    reward: { points: 1500 },
    progress: 0,
    unlocked: false,
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 'streak-100',
    title: 'Sönmez Ateş',
    description: '100 gün üst üste yorum yap',
    icon: '🔥',
    category: 'social',
    rarity: 'legendary',
    requirement: { type: 'streak_days', value: 100 },
    reward: { points: 5000, badge: 'eternal-flame' },
    progress: 0,
    unlocked: false,
    color: '#DC2626',
    gradient: 'from-red-600 to-orange-700'
  },

  // SPECIAL ACHIEVEMENTS
  {
    id: 'first-day',
    title: 'Hoş Geldin!',
    description: 'QR-tex ailesine katıl',
    icon: '🎉',
    category: 'special',
    rarity: 'common',
    requirement: { type: 'special', value: 1 },
    reward: { points: 100 },
    progress: 1,
    unlocked: true,
    unlockedAt: new Date(),
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'night-owl',
    title: 'Gece Kuşu',
    description: 'Gece saat 00:00-06:00 arası 10 yorum yap',
    icon: '🦉',
    category: 'special',
    rarity: 'rare',
    requirement: { type: 'special', value: 10 },
    reward: { points: 400 },
    progress: 0,
    unlocked: false,
    color: '#6366F1',
    gradient: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'early-bird',
    title: 'Erken Kuş',
    description: 'Sabah saat 06:00-09:00 arası 10 yorum yap',
    icon: '🐦',
    category: 'special',
    rarity: 'rare',
    requirement: { type: 'special', value: 10 },
    reward: { points: 400 },
    progress: 0,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'weekend-warrior',
    title: 'Hafta Sonu Savaşçısı',
    description: 'Hafta sonu 20 yorum yap',
    icon: '⚔️',
    category: 'special',
    rarity: 'epic',
    requirement: { type: 'special', value: 20 },
    reward: { points: 600 },
    progress: 0,
    unlocked: false,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'globe-trotter',
    title: 'Gezgin',
    description: '20 farklı işletmeye yorum yap',
    icon: '🌍',
    category: 'special',
    rarity: 'epic',
    requirement: { type: 'special', value: 20 },
    reward: { points: 800 },
    progress: 0,
    unlocked: false,
    color: '#14B8A6',
    gradient: 'from-teal-400 to-cyan-500'
  },
  {
    id: 'photo-master',
    title: 'Fotoğraf Ustası',
    description: '50 fotoğraflı yorum yap',
    icon: '📸',
    category: 'special',
    rarity: 'epic',
    requirement: { type: 'special', value: 50 },
    reward: { points: 1000 },
    progress: 0,
    unlocked: false,
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: 'influencer',
    title: 'Etkileyici',
    description: 'Yorumların 1000 beğeni alsın',
    icon: '👑',
    category: 'social',
    rarity: 'legendary',
    requirement: { type: 'special', value: 1000 },
    reward: { points: 3000, badge: 'influencer' },
    progress: 0,
    unlocked: false,
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-600'
  }
]

// Category labels
export const ACHIEVEMENT_CATEGORIES = {
  comments: { label: 'Yorumlar', icon: '💬', color: '#3B82F6' },
  badges: { label: 'Rozetler', icon: '🏆', color: '#8B5CF6' },
  points: { label: 'Puanlar', icon: '⭐', color: '#F59E0B' },
  social: { label: 'Sosyal', icon: '👥', color: '#10B981' },
  special: { label: 'Özel', icon: '✨', color: '#EC4899' }
}

// Rarity labels
export const RARITY_LABELS = {
  common: { label: 'Yaygın', color: '#6B7280' },
  rare: { label: 'Nadir', color: '#3B82F6' },
  epic: { label: 'Epik', color: '#8B5CF6' },
  legendary: { label: 'Efsanevi', color: '#F59E0B' }
}

// Calculate achievement stats
export const calculateAchievementStats = (achievements: Achievement[]) => {
  const total = achievements.length
  const unlocked = achievements.filter(a => a.unlocked).length
  const totalPoints = achievements.reduce((sum, a) => sum + (a.unlocked ? a.reward.points : 0), 0)
  const percentage = Math.round((unlocked / total) * 100)
  
  return { total, unlocked, totalPoints, percentage }
}















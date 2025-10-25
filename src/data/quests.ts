export interface Quest {
  id: string
  title: string
  description: string
  icon: string
  type: 'daily' | 'weekly' | 'special'
  category: 'comment' | 'badge' | 'social' | 'explore' | 'achievement'
  requirement: {
    type: 'comment_count' | 'badge_collect' | 'visit_places' | 'like_count' | 'share_count' | 'special'
    value: number
    current: number
  }
  reward: {
    points: number
    badge?: string
    boost?: string
  }
  difficulty: 'easy' | 'medium' | 'hard'
  completed: boolean
  expiresAt?: Date
  color: string
  gradient: string
}

// Get today's date for daily quests
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

const nextWeek = new Date(today)
nextWeek.setDate(nextWeek.getDate() + 7)

export const DAILY_QUESTS: Quest[] = [
  {
    id: 'daily-comment-5',
    title: 'Günün Yorumcusu',
    description: 'Bugün 5 yorum yap',
    icon: '💬',
    type: 'daily',
    category: 'comment',
    requirement: {
      type: 'comment_count',
      value: 5,
      current: 2
    },
    reward: {
      points: 100
    },
    difficulty: 'easy',
    completed: false,
    expiresAt: tomorrow,
    color: '#3B82F6',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'daily-photo-comment',
    title: 'Fotoğraf Zamanı',
    description: '3 fotoğraflı yorum yap',
    icon: '📸',
    type: 'daily',
    category: 'comment',
    requirement: {
      type: 'special',
      value: 3,
      current: 1
    },
    reward: {
      points: 150
    },
    difficulty: 'medium',
    completed: false,
    expiresAt: tomorrow,
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: 'daily-explore',
    title: 'Keşifçi',
    description: '3 farklı işletme ziyaret et',
    icon: '🗺️',
    type: 'daily',
    category: 'explore',
    requirement: {
      type: 'visit_places',
      value: 3,
      current: 0
    },
    reward: {
      points: 120
    },
    difficulty: 'medium',
    completed: false,
    expiresAt: tomorrow,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'daily-social',
    title: 'Sosyal Kelebek',
    description: 'Diğer yorumlara 10 beğeni ver',
    icon: '👍',
    type: 'daily',
    category: 'social',
    requirement: {
      type: 'like_count',
      value: 10,
      current: 5
    },
    reward: {
      points: 80
    },
    difficulty: 'easy',
    completed: false,
    expiresAt: tomorrow,
    color: '#F59E0B',
    gradient: 'from-yellow-400 to-orange-500'
  }
]

export const WEEKLY_QUESTS: Quest[] = [
  {
    id: 'weekly-comment-30',
    title: 'Haftalık Yorum Kralı',
    description: 'Bu hafta 30 yorum yap',
    icon: '👑',
    type: 'weekly',
    category: 'comment',
    requirement: {
      type: 'comment_count',
      value: 30,
      current: 18
    },
    reward: {
      points: 500,
      boost: '2x-xp-24h'
    },
    difficulty: 'hard',
    completed: false,
    expiresAt: nextWeek,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 'weekly-badges-5',
    title: 'Rozet Avcısı',
    description: 'Bu hafta 5 yeni rozet kazan',
    icon: '🏆',
    type: 'weekly',
    category: 'badge',
    requirement: {
      type: 'badge_collect',
      value: 5,
      current: 3
    },
    reward: {
      points: 600
    },
    difficulty: 'hard',
    completed: false,
    expiresAt: nextWeek,
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'weekly-places-10',
    title: 'Mekan Gezgini',
    description: '10 farklı işletmeye git',
    icon: '🌍',
    type: 'weekly',
    category: 'explore',
    requirement: {
      type: 'visit_places',
      value: 10,
      current: 6
    },
    reward: {
      points: 400
    },
    difficulty: 'medium',
    completed: false,
    expiresAt: nextWeek,
    color: '#14B8A6',
    gradient: 'from-teal-400 to-cyan-500'
  },
  {
    id: 'weekly-streak',
    title: 'Haftalık Seri',
    description: '7 gün üst üste yorum yap',
    icon: '🔥',
    type: 'weekly',
    category: 'achievement',
    requirement: {
      type: 'special',
      value: 7,
      current: 4
    },
    reward: {
      points: 700,
      badge: 'weekly-warrior'
    },
    difficulty: 'hard',
    completed: false,
    expiresAt: nextWeek,
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-600'
  }
]

export const SPECIAL_QUESTS: Quest[] = [
  {
    id: 'special-first-comment',
    title: 'İlk Adım',
    description: 'İlk yorumunu yap',
    icon: '🎤',
    type: 'special',
    category: 'comment',
    requirement: {
      type: 'comment_count',
      value: 1,
      current: 1
    },
    reward: {
      points: 50
    },
    difficulty: 'easy',
    completed: true,
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'special-influencer',
    title: 'Etkileyici',
    description: 'Yorumların 100 beğeni alsın',
    icon: '⭐',
    type: 'special',
    category: 'social',
    requirement: {
      type: 'like_count',
      value: 100,
      current: 67
    },
    reward: {
      points: 1000,
      badge: 'influencer'
    },
    difficulty: 'hard',
    completed: false,
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'special-night-owl',
    title: 'Gece Kuşu',
    description: 'Gece saat 00:00-06:00 arası 10 yorum yap',
    icon: '🦉',
    type: 'special',
    category: 'achievement',
    requirement: {
      type: 'special',
      value: 10,
      current: 3
    },
    reward: {
      points: 400,
      badge: 'night-owl'
    },
    difficulty: 'medium',
    completed: false,
    color: '#6366F1',
    gradient: 'from-indigo-400 to-purple-500'
  }
]

export const ALL_QUESTS = [...DAILY_QUESTS, ...WEEKLY_QUESTS, ...SPECIAL_QUESTS]

// Difficulty labels
export const DIFFICULTY_LABELS = {
  easy: { label: 'Kolay', color: '#10B981' },
  medium: { label: 'Orta', color: '#F59E0B' },
  hard: { label: 'Zor', color: '#EF4444' }
}

// Calculate quest stats
export const calculateQuestStats = (quests: Quest[]) => {
  const total = quests.length
  const completed = quests.filter(q => q.completed).length
  const totalPoints = quests.reduce((sum, q) => sum + (q.completed ? q.reward.points : 0), 0)
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return { total, completed, totalPoints, percentage }
}

// Get quests by type
export const getQuestsByType = (type: Quest['type']) => {
  return ALL_QUESTS.filter(q => q.type === type)
}

// Get active quests (not completed and not expired)
export const getActiveQuests = () => {
  const now = new Date()
  return ALL_QUESTS.filter(q => !q.completed && (!q.expiresAt || q.expiresAt > now))
}












export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: 'activity' | 'behavior' | 'brand' | 'special'
  subcategory?: string
  requirement: {
    type: 'comment_count' | 'behavior_pattern' | 'brand_loyalty' | 'special_action'
    value: number | string
    condition?: string
  }
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points: number
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
  color: string
  gradient: string
  brandId?: string
  isCustom?: boolean
  privileges?: BadgePrivilege[]
  showName?: string  // TV Show name
  genre?: string     // TV Show genre (KOMEDİ, FANTASTİK, etc.)
}

export interface BadgePrivilege {
  type: 'vip_comments' | 'early_access' | 'exclusive_features' | 'priority_support' | 'custom_avatar' | 'special_emoji'
  description: string
  active: boolean
}

export interface UserBadgeStats {
  totalBadges: number
  totalPoints: number
  rank: number
  level: number
  nextLevelPoints: number
  badgesByCategory: {
    activity: number
    behavior: number
    brand: number
    special: number
  }
  recentUnlocks: Badge[]
  favoriteCategory: string
}

export interface BadgeProgress {
  badgeId: string
  currentValue: number
  targetValue: number
  percentage: number
  isCompleted: boolean
  estimatedCompletion?: Date
}

export interface LeaderboardEntry {
  userId: string
  username: string
  avatar: string
  totalBadges: number
  totalPoints: number
  rank: number
  topBadges: Badge[]
  level: number
  isVip: boolean
}

export interface BadgeNotification {
  id: string
  type: 'unlock' | 'progress' | 'level_up' | 'achievement'
  badge?: Badge
  message: string
  timestamp: Date
  seen: boolean
  celebrationLevel: 'normal' | 'epic' | 'legendary'
}

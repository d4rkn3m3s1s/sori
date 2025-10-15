export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: 'activity' | 'behavior' | 'brand' | 'special' | 'mysterious'
  subcategory?: string
  requirement: {
    type: 'comment_count' | 'behavior_pattern' | 'brand_loyalty' | 'special_action' | 'mysterious_action'
    value: number | string
    condition?: string
  }
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical'
  points: number
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
  color: string
  gradient: string
  brandId?: string
  isCustom?: boolean
  isHidden?: boolean  // Gizemli rozetler için - Kilit açılana kadar görünmez
  unlockedBy?: number  // Kullanıcı yüzdesi - Ne kadar nadir (örn: 0.01 = %0.01)
  privileges?: BadgePrivilege[]
  showName?: string  // TV Show name
  genre?: string     // TV Show genre (KOMEDİ, FANTASTİK, etc.)
}

export interface BadgePrivilege {
  type: 'vip_comments' | 'early_access' | 'exclusive_features' | 'priority_support' | 'custom_avatar' | 'special_emoji' | 
        'resurrection' | 'legendary_frame' | 'rainbow_effect' | 'space_badge' | 'exclusive_sounds' | 
        'time_badge' | 'future_insights' | 'historical_rewards' | 'dragon_power' | 'fire_effect' | 
        'legendary_status' | 'invisibility' | 'stealth_bonus' | 'magic_spells' | 'transformation' | 
        'spell_bonus' | 'crystal_theme' | 'purity_bonus' | 'stealth_mode' | 'speed_bonus' | 
        'halo_effect' | 'blessing_bonus' | 'divine_protection' | 'automation' | 'efficiency_boost' | 
        'royal_authority' | 'supreme_bonus' | 'vip_access' | 'exclusive_events'
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
    mysterious: number
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

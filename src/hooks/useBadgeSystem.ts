import { useState, useEffect } from 'react'
import { Badge, UserBadgeStats, BadgeProgress, LeaderboardEntry, BadgeNotification } from '../types/badge'
import { ALL_BADGES, BADGE_LEVELS } from '../data/badges'

export function useBadgeSystem(userId: string) {
  const [userBadges, setUserBadges] = useState<Badge[]>([])
  const [userStats, setUserStats] = useState<UserBadgeStats | null>(null)
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgress[]>([])
  const [notifications, setNotifications] = useState<BadgeNotification[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulated user data - in real app this would come from API
  const mockUserData = {
    commentCount: 47,
    behaviorPatterns: [
      'detailed_comments', 
      'fast_responses', 
      'funny_comments',
      'emoji_user',
      'positive_energy',
      'suggestion_maker'
    ],
    brandLoyalty: {
      mcdonalds: 12,
      starbucks: 8,
      nike: 3
    },
    specialActions: ['community_impact', 'dragon_fire_comments'],
    joinDate: new Date('2024-01-15'),
    lastActive: new Date(),
    commentFrequency: 'regular_sparse', // Konuk Oyuncu için
    commentStyle: 'concise_impactful', // Kelime Büyücüsü için
    specialInterests: ['coffee_comments', 'food_comments'] // Kafein Bağımlısı, Gurme için
  }

  // Auto badge checking system
  const checkAndUnlockBadges = () => {
    const newUnlocks: Badge[] = []
    
    ALL_BADGES.forEach(badge => {
      if (badge.unlocked) return

      let shouldUnlock = false

      switch (badge.requirement.type) {
        case 'comment_count':
          shouldUnlock = mockUserData.commentCount >= (badge.requirement.value as number)
          break
        
        case 'behavior_pattern':
          const patternValue = badge.requirement.value as string
          shouldUnlock = mockUserData.behaviorPatterns.includes(patternValue) ||
                        mockUserData.commentFrequency === patternValue ||
                        mockUserData.commentStyle === patternValue ||
                        mockUserData.specialInterests.includes(patternValue)
          break
        
        case 'brand_loyalty':
          if (badge.brandId) {
            const brandCount = mockUserData.brandLoyalty[badge.brandId as keyof typeof mockUserData.brandLoyalty] || 0
            shouldUnlock = brandCount >= (badge.requirement.value as number)
          }
          break
        
        case 'special_action':
          shouldUnlock = mockUserData.specialActions.includes(badge.requirement.value as string)
          break
      }

      if (shouldUnlock) {
        const unlockedBadge = { ...badge, unlocked: true, unlockedAt: new Date() }
        newUnlocks.push(unlockedBadge)
        
        // Create notification
        const notification: BadgeNotification = {
          id: `notif-${badge.id}-${Date.now()}`,
          type: 'unlock',
          badge: unlockedBadge,
          message: `Tebrikler! "${badge.name}" rozetini kazandınız!`,
          timestamp: new Date(),
          seen: false,
          celebrationLevel: badge.rarity === 'legendary' ? 'legendary' : 
                          badge.rarity === 'epic' ? 'epic' : 'normal'
        }
        
        setNotifications(prev => [notification, ...prev])
      }
    })

    if (newUnlocks.length > 0) {
      setUserBadges(prev => [...prev, ...newUnlocks])
      calculateUserStats([...userBadges, ...newUnlocks])
    }
  }

  // Calculate user statistics
  const calculateUserStats = (badges: Badge[]) => {
    const unlockedBadges = badges.filter(b => b.unlocked)
    const totalPoints = unlockedBadges.reduce((sum, badge) => sum + badge.points, 0)
    
    // Calculate level
    let level = 1
    let nextLevelPoints = 100
    
    for (const levelData of BADGE_LEVELS) {
      if (totalPoints >= levelData.requiredPoints) {
        level = levelData.level
        const nextLevel = BADGE_LEVELS.find(l => l.level === level + 1)
        nextLevelPoints = nextLevel ? nextLevel.requiredPoints - totalPoints : 0
      }
    }

    // Calculate category distribution
    const badgesByCategory = {
      activity: unlockedBadges.filter(b => b.category === 'activity').length,
      behavior: unlockedBadges.filter(b => b.category === 'behavior').length,
      brand: unlockedBadges.filter(b => b.category === 'brand').length,
      special: unlockedBadges.filter(b => b.category === 'special').length
    }

    // Find favorite category
    const favoriteCategory = Object.entries(badgesByCategory)
      .sort(([,a], [,b]) => b - a)[0][0]

    const stats: UserBadgeStats = {
      totalBadges: unlockedBadges.length,
      totalPoints,
      rank: Math.floor(Math.random() * 100) + 1, // Mock rank
      level,
      nextLevelPoints,
      badgesByCategory,
      recentUnlocks: unlockedBadges.slice(-3),
      favoriteCategory
    }

    setUserStats(stats)
  }

  // Calculate badge progress
  const calculateBadgeProgress = () => {
    const progress: BadgeProgress[] = []

    ALL_BADGES.forEach(badge => {
      if (badge.unlocked) return

      let currentValue = 0
      let targetValue = badge.requirement.value as number

      switch (badge.requirement.type) {
        case 'comment_count':
          currentValue = mockUserData.commentCount
          break
        
        case 'brand_loyalty':
          if (badge.brandId) {
            currentValue = mockUserData.brandLoyalty[badge.brandId as keyof typeof mockUserData.brandLoyalty] || 0
          }
          break
      }

      if (typeof targetValue === 'number' && currentValue < targetValue) {
        progress.push({
          badgeId: badge.id,
          currentValue,
          targetValue,
          percentage: Math.min((currentValue / targetValue) * 100, 100),
          isCompleted: currentValue >= targetValue
        })
      }
    })

    setBadgeProgress(progress)
  }

  // Generate mock leaderboard
  const generateLeaderboard = () => {
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        userId: '1',
        username: 'Ahmet Yılmaz',
        avatar: 'https://i.pravatar.cc/150?u=1',
        totalBadges: 15,
        totalPoints: 1250,
        rank: 1,
        topBadges: ALL_BADGES.slice(0, 3),
        level: 5,
        isVip: true
      },
      {
        userId: '2',
        username: 'Elif Kaya',
        avatar: 'https://i.pravatar.cc/150?u=2',
        totalBadges: 12,
        totalPoints: 980,
        rank: 2,
        topBadges: ALL_BADGES.slice(1, 4),
        level: 4,
        isVip: true
      },
      {
        userId: '3',
        username: 'Mehmet Demir',
        avatar: 'https://i.pravatar.cc/150?u=3',
        totalBadges: 10,
        totalPoints: 750,
        rank: 3,
        topBadges: ALL_BADGES.slice(2, 5),
        level: 4,
        isVip: false
      },
      {
        userId: userId,
        username: 'Sen',
        avatar: 'https://i.pravatar.cc/150?u=current',
        totalBadges: userStats?.totalBadges || 0,
        totalPoints: userStats?.totalPoints || 0,
        rank: userStats?.rank || 50,
        topBadges: userBadges.slice(0, 3),
        level: userStats?.level || 1,
        isVip: (userStats?.totalPoints || 0) > 500
      }
    ].sort((a, b) => b.totalPoints - a.totalPoints)

    setLeaderboard(mockLeaderboard)
  }

  // Badge unlock animation trigger
  const triggerBadgeUnlock = (badge: Badge) => {
    // This would trigger celebration animations
    console.log(`🎉 Badge unlocked: ${badge.name}`)
    
    // Play sound effect based on rarity
    if (badge.rarity === 'legendary') {
      console.log('🎵 Playing legendary unlock sound')
    } else if (badge.rarity === 'epic') {
      console.log('🎵 Playing epic unlock sound')
    }
  }

  // Mark notification as seen
  const markNotificationSeen = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, seen: true } : notif
      )
    )
  }

  // Get user privileges
  const getUserPrivileges = () => {
    const privileges: string[] = []
    
    userBadges.forEach(badge => {
      if (badge.unlocked && badge.privileges) {
        badge.privileges.forEach(privilege => {
          if (privilege.active && !privileges.includes(privilege.type)) {
            privileges.push(privilege.type)
          }
        })
      }
    })

    return privileges
  }

  // Initialize system
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      checkAndUnlockBadges()
      calculateBadgeProgress()
      setIsLoading(false)
    }, 1000)
  }, [userId])

  useEffect(() => {
    if (userStats) {
      generateLeaderboard()
    }
  }, [userStats])

  return {
    userBadges,
    userStats,
    badgeProgress,
    notifications,
    leaderboard,
    isLoading,
    checkAndUnlockBadges,
    triggerBadgeUnlock,
    markNotificationSeen,
    getUserPrivileges,
    allBadges: ALL_BADGES
  }
}

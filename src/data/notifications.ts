export interface Notification {
  id: string
  type: 'badge' | 'achievement' | 'level' | 'quest' | 'reward' | 'social' | 'event' | 'system'
  title: string
  message: string
  icon: string
  color: string
  gradient: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    path: string
  }
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'badge',
    title: 'Yeni Rozet Kazandın! 🏆',
    message: 'Kahve Tutkunu rozetini açtın! +100 puan kazandın.',
    icon: '🏆',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-500',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    action: {
      label: 'Rozeti Gör',
      path: '/customer/badges'
    },
    priority: 'high'
  },
  {
    id: '2',
    type: 'level',
    title: 'Seviye Atladın! 🎉',
    message: 'Ahenk ligine yükseldin! Yeni ayrıcalıklar kazandın.',
    icon: '🎊',
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    action: {
      label: 'Ligi Gör',
      path: '/customer/league'
    },
    priority: 'urgent'
  },
  {
    id: '3',
    type: 'quest',
    title: 'Görev Tamamlandı! ✅',
    message: 'Günün Yorumcusu görevini tamamladın. +100 puan kazandın.',
    icon: '✅',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-500',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
    action: {
      label: 'Ödülü Al',
      path: '/customer/quests'
    },
    priority: 'high'
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Başarı Açıldı! 🌟',
    message: 'Hafta Sonu Savaşçısı başarısını tamamladın! +600 puan.',
    icon: '🌟',
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-500',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    action: {
      label: 'Başarıları Gör',
      path: '/customer/achievements'
    },
    priority: 'high'
  },
  {
    id: '5',
    type: 'social',
    title: 'Yorumun Beğenildi! 👍',
    message: 'Starbucks Kadıköy yorumun 10 beğeni aldı.',
    icon: '❤️',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-500',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    read: true,
    priority: 'medium'
  },
  {
    id: '6',
    type: 'reward',
    title: 'Yeni Ödül Mevcut! 🎁',
    message: 'Altın Çerçeve artık ödül dükkanında. 600 puan ile alabilirsin.',
    icon: '🎁',
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    action: {
      label: 'Dükkanı Gör',
      path: '/customer/reward-store'
    },
    priority: 'medium'
  },
  {
    id: '7',
    type: 'event',
    title: 'Özel Etkinlik Başladı! 🎊',
    message: 'Kahve Festivali başladı! Kahve yorumlarına 2x puan kazanıyorsun.',
    icon: '☕',
    color: '#92400E',
    gradient: 'from-amber-700 to-orange-600',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
    action: {
      label: 'Etkinlikleri Gör',
      path: '/customer/events'
    },
    priority: 'urgent'
  },
  {
    id: '8',
    type: 'system',
    title: 'Günlük Görevler Yenilendi! 🔄',
    message: 'Yeni günlük görevlerin hazır. Hemen tamamla!',
    icon: '🔄',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-500',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    read: true,
    action: {
      label: 'Görevleri Gör',
      path: '/customer/quests'
    },
    priority: 'low'
  }
]

// Filter notifications
export const getUnreadNotifications = (notifications: Notification[]) => {
  return notifications.filter(n => !n.read)
}

export const getNotificationsByType = (notifications: Notification[], type: Notification['type']) => {
  return notifications.filter(n => n.type === type)
}

export const getNotificationsByPriority = (notifications: Notification[], priority: Notification['priority']) => {
  return notifications.filter(n => n.priority === priority)
}

// Notification settings
export interface NotificationSettings {
  enabled: boolean
  types: {
    badge: boolean
    achievement: boolean
    level: boolean
    quest: boolean
    reward: boolean
    social: boolean
    event: boolean
    system: boolean
  }
  channels: {
    push: boolean
    email: boolean
    inApp: boolean
  }
  quiet: {
    enabled: boolean
    startTime: string
    endTime: string
  }
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: true,
  types: {
    badge: true,
    achievement: true,
    level: true,
    quest: true,
    reward: true,
    social: true,
    event: true,
    system: true
  },
  channels: {
    push: true,
    email: false,
    inApp: true
  },
  quiet: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00'
  }
}













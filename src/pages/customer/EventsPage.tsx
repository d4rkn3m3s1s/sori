import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Progress, Button } from '@nextui-org/react'
import { Calendar, Gift, Zap, Clock, Trophy, Sparkles, Flame, Coffee } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface Event {
  id: string
  title: string
  description: string
  type: 'birthday' | 'holiday' | 'community' | 'special' | 'double_xp'
  icon: any
  color: string
  gradient: string
  startDate: Date
  endDate: Date
  reward: {
    type: 'points' | 'badge' | 'boost' | 'multiplier'
    value: string
  }
  progress?: {
    current: number
    target: number
  }
  active: boolean
  featured?: boolean
}

function EventsPage() {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Kahve Festivali ☕',
      description: 'Kahve işletmelerine yapılan yorumlara 2x puan kazanın!',
      type: 'special',
      icon: Coffee,
      color: '#92400E',
      gradient: 'from-amber-700 to-orange-600',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      reward: {
        type: 'multiplier',
        value: '2x Puan'
      },
      progress: {
        current: 12,
        target: 30
      },
      active: true,
      featured: true
    },
    {
      id: '2',
      title: 'Doğum Günü Bonusu 🎂',
      description: 'Doğum gününde özel ödüller ve bonuslar seni bekliyor!',
      type: 'birthday',
      icon: Gift,
      color: '#EC4899',
      gradient: 'from-pink-500 to-rose-500',
      startDate: new Date(),
      endDate: new Date(),
      reward: {
        type: 'badge',
        value: 'Özel Rozet'
      },
      active: false
    },
    {
      id: '3',
      title: 'Hafta Sonu Challenge 🎯',
      description: 'Hafta sonu 20 yorum yapana özel ödül!',
      type: 'community',
      icon: Trophy,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-pink-500',
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      reward: {
        type: 'points',
        value: '500 Puan'
      },
      progress: {
        current: 8,
        target: 20
      },
      active: true
    },
    {
      id: '4',
      title: 'Ramazan Özel 🌙',
      description: 'Ramazan ayı boyunca tüm yorumlara ekstra puan!',
      type: 'holiday',
      icon: Sparkles,
      color: '#F59E0B',
      gradient: 'from-yellow-500 to-orange-500',
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      reward: {
        type: 'multiplier',
        value: '1.5x Puan'
      },
      active: false
    },
    {
      id: '5',
      title: 'Çift XP Günü ⚡',
      description: 'Bugün tüm aktivitelerde çift XP kazanıyorsun!',
      type: 'double_xp',
      icon: Zap,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-500',
      startDate: new Date(),
      endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      reward: {
        type: 'boost',
        value: '2x XP'
      },
      active: true,
      featured: true
    },
    {
      id: '6',
      title: 'Yeni Yıl Kutlaması 🎊',
      description: 'Yeni yıla özel mega ödüller ve sürprizler!',
      type: 'holiday',
      icon: Sparkles,
      color: '#EF4444',
      gradient: 'from-red-500 to-orange-500',
      startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 67 * 24 * 60 * 60 * 1000),
      reward: {
        type: 'badge',
        value: 'Yeni Yıl Rozeti'
      },
      active: false
    }
  ])

  const activeEvents = events.filter(e => e.active)
  const upcomingEvents = events.filter(e => !e.active)

  const getTimeRemaining = (endDate: Date) => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days} gün ${hours} saat`
    return `${hours} saat`
  }

  const getTypeLabel = (type: Event['type']) => {
    const labels = {
      birthday: 'Doğum Günü',
      holiday: 'Tatil',
      community: 'Topluluk',
      special: 'Özel',
      double_xp: 'XP Boost'
    }
    return labels[type]
  }

  const getTypeColor = (type: Event['type']) => {
    const colors = {
      birthday: 'secondary',
      holiday: 'warning',
      community: 'primary',
      special: 'success',
      double_xp: 'danger'
    }
    return colors[type] as any
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🎊 Özel Günler & Etkinlikler" 
          subtitle="Özel etkinliklere katıl, ödüller kazan!"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Aktif Etkinlik</p>
                        <p className="text-4xl font-bold">{activeEvents.length}</p>
                        <p className="text-sm">Devam Ediyor</p>
                      </div>
                      <Flame className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Yaklaşan</p>
                        <p className="text-4xl font-bold">{upcomingEvents.length}</p>
                        <p className="text-sm">Etkinlik</p>
                      </div>
                      <Calendar className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Kazanılan</p>
                        <p className="text-4xl font-bold">2,450</p>
                        <p className="text-sm">Bonus Puan</p>
                      </div>
                      <Gift className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Active Events */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🔥 Aktif Etkinlikler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`relative overflow-hidden hover:shadow-2xl transition-all ${
                        event.featured ? 'ring-2 ring-purple-500' : ''
                      }`}
                    >
                      {event.featured && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                          ÖNE ÇIKAN
                        </div>
                      )}

                      <CardBody className="p-6">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${event.gradient}`}>
                            <event.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {event.description}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Chip size="sm" color={getTypeColor(event.type)} variant="flat">
                                {getTypeLabel(event.type)}
                              </Chip>
                              <Chip size="sm" className={`bg-gradient-to-r ${event.gradient} text-white font-bold`}>
                                {event.reward.value}
                              </Chip>
                            </div>
                          </div>
                        </div>

                        {event.progress && (
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                İlerleme
                              </span>
                              <span className="text-sm font-bold text-purple-600">
                                {event.progress.current} / {event.progress.target}
                              </span>
                            </div>
                            <Progress
                              value={(event.progress.current / event.progress.target) * 100}
                              className="h-3"
                              classNames={{
                                indicator: `bg-gradient-to-r ${event.gradient}`
                              }}
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>Bitiş: {getTimeRemaining(event.endDate)}</span>
                          </div>
                          <Button
                            size="sm"
                            className={`bg-gradient-to-r ${event.gradient} text-white font-bold`}
                          >
                            Katıl
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📅 Yaklaşan Etkinlikler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all opacity-75">
                      <CardBody className="p-6">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${event.gradient}`}>
                          <event.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-col items-center space-y-2">
                          <Chip size="sm" color={getTypeColor(event.type)} variant="flat">
                            {getTypeLabel(event.type)}
                          </Chip>
                          <Chip size="sm" className={`bg-gradient-to-r ${event.gradient} text-white font-bold`}>
                            {event.reward.value}
                          </Chip>
                        </div>
                        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Başlangıç</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {event.startDate.toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EventsPage


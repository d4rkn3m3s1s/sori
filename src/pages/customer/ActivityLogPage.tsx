import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Chip, Input, Select, SelectItem, Button } from '@nextui-org/react'
import { 
  MessageSquare, Trophy, Star, TrendingUp, Clock, Search, 
  Filter, Download, Calendar, Award, Zap, Heart, Share2, 
  CheckCircle, Gift, Target, Camera
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface Activity {
  id: string
  type: 'comment' | 'badge' | 'points' | 'achievement' | 'quest' | 'reward' | 'level'
  title: string
  description: string
  icon: any
  color: string
  bgColor: string
  points?: number
  timestamp: Date
  metadata?: any
}

function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterDate, setFilterDate] = useState<string>('all')

  // Mock activity data
  const allActivities: Activity[] = [
    {
      id: '1',
      type: 'comment',
      title: 'Yorum Yaptın',
      description: 'Starbucks Kadıköy işletmesine yorum yaptın',
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      points: 50,
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 dakika önce
      metadata: { business: 'Starbucks Kadıköy', rating: 5 }
    },
    {
      id: '2',
      type: 'badge',
      title: 'Rozet Kazandın',
      description: 'Kahve Tutkunu rozetini açtın',
      icon: Trophy,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      points: 100,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 saat önce
      metadata: { badge: 'Kahve Tutkunu', rarity: 'rare' }
    },
    {
      id: '3',
      type: 'points',
      title: 'Puan Kazandın',
      description: 'Günlük görev tamamlama bonusu',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      points: 150,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 saat önce
      metadata: { source: 'daily_quest' }
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Başarı Açıldı',
      description: 'Hafta Sonu Savaşçısı başarısını tamamladın',
      icon: Award,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      points: 600,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 saat önce
      metadata: { achievement: 'Weekend Warrior', rarity: 'epic' }
    },
    {
      id: '5',
      type: 'quest',
      title: 'Görev Tamamlandı',
      description: 'Günün Yorumcusu görevini tamamladın',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      points: 100,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 gün önce
      metadata: { quest: 'daily-comment-5' }
    },
    {
      id: '6',
      type: 'comment',
      title: 'Fotoğraflı Yorum',
      description: 'Mado Beyoğlu\'na fotoğraf ile yorum yaptın',
      icon: Camera,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      points: 75,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30), // 1.25 gün önce
      metadata: { business: 'Mado Beyoğlu', hasPhoto: true }
    },
    {
      id: '7',
      type: 'level',
      title: 'Seviye Atladın',
      description: 'Ahenk ligine yükseldin!',
      icon: TrendingUp,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      points: 500,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 gün önce
      metadata: { level: 4, league: 'Ahenk' }
    },
    {
      id: '8',
      type: 'reward',
      title: 'Ödül Satın Aldın',
      description: 'Altın Çerçeve avatar çerçevesini aldın',
      icon: Gift,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 gün önce
      metadata: { reward: 'gold-frame', cost: 600 }
    },
    {
      id: '9',
      type: 'badge',
      title: 'Rozet Kazandın',
      description: 'Sherlock Holmes rozetini açtın',
      icon: Trophy,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      points: 400,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 gün önce
      metadata: { badge: 'Sherlock Holmes', rarity: 'epic' }
    },
    {
      id: '10',
      type: 'comment',
      title: 'Yorum Beğenildi',
      description: 'Yorumun 10 beğeni aldı',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      points: 30,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 gün önce
      metadata: { likes: 10 }
    }
  ]

  // Filter activities
  const filteredActivities = allActivities.filter(activity => {
    // Type filter
    if (filterType !== 'all' && activity.type !== filterType) return false

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query)
      )
    }

    // Date filter
    if (filterDate !== 'all') {
      const now = new Date()
      const activityDate = activity.timestamp
      
      if (filterDate === 'today') {
        return activityDate.toDateString() === now.toDateString()
      } else if (filterDate === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return activityDate >= weekAgo
      } else if (filterDate === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return activityDate >= monthAgo
      }
    }

    return true
  })

  const getTypeLabel = (type: Activity['type']) => {
    const labels = {
      comment: 'Yorum',
      badge: 'Rozet',
      points: 'Puan',
      achievement: 'Başarı',
      quest: 'Görev',
      reward: 'Ödül',
      level: 'Seviye'
    }
    return labels[type]
  }

  const getTypeColor = (type: Activity['type']) => {
    const colors = {
      comment: 'primary',
      badge: 'secondary',
      points: 'warning',
      achievement: 'success',
      quest: 'default',
      reward: 'danger',
      level: 'success'
    }
    return colors[type] as any
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return 'Az önce'
    if (minutes < 60) return `${minutes} dakika önce`
    if (hours < 24) return `${hours} saat önce`
    if (days === 1) return 'Dün'
    if (days < 7) return `${days} gün önce`
    return timestamp.toLocaleDateString('tr-TR')
  }

  const totalPoints = filteredActivities.reduce((sum, a) => sum + (a.points || 0), 0)

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📜 Etkinlik Geçmişi" 
          subtitle="Tüm aktivitelerini görüntüle"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Toplam Etkinlik</p>
                        <p className="text-4xl font-bold">{filteredActivities.length}</p>
                        <p className="text-sm">Aktivite</p>
                      </div>
                      <Clock className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Kazanılan Puan</p>
                        <p className="text-4xl font-bold">{totalPoints}</p>
                        <p className="text-sm">Puan</p>
                      </div>
                      <Star className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Bu Hafta</p>
                        <p className="text-4xl font-bold">
                          {allActivities.filter(a => {
                            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                            return a.timestamp >= weekAgo
                          }).length}
                        </p>
                        <p className="text-sm">Aktivite</p>
                      </div>
                      <Calendar className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Filters */}
            <Card>
              <CardBody className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Aktivite ara..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    startContent={<Search className="w-4 h-4 text-gray-400" />}
                  />

                  <Select
                    placeholder="Tür Filtresi"
                    selectedKeys={filterType ? [filterType] : []}
                    onSelectionChange={(keys) => setFilterType(Array.from(keys)[0] as string)}
                    startContent={<Filter className="w-4 h-4 text-gray-400" />}
                  >
                    <SelectItem key="all" value="all">Tümü</SelectItem>
                    <SelectItem key="comment" value="comment">Yorumlar</SelectItem>
                    <SelectItem key="badge" value="badge">Rozetler</SelectItem>
                    <SelectItem key="achievement" value="achievement">Başarılar</SelectItem>
                    <SelectItem key="quest" value="quest">Görevler</SelectItem>
                    <SelectItem key="reward" value="reward">Ödüller</SelectItem>
                    <SelectItem key="level" value="level">Seviye</SelectItem>
                  </Select>

                  <Select
                    placeholder="Zaman Filtresi"
                    selectedKeys={filterDate ? [filterDate] : []}
                    onSelectionChange={(keys) => setFilterDate(Array.from(keys)[0] as string)}
                    startContent={<Clock className="w-4 h-4 text-gray-400" />}
                  >
                    <SelectItem key="all" value="all">Tüm Zamanlar</SelectItem>
                    <SelectItem key="today" value="today">Bugün</SelectItem>
                    <SelectItem key="week" value="week">Bu Hafta</SelectItem>
                    <SelectItem key="month" value="month">Bu Ay</SelectItem>
                  </Select>

                  <Button
                    fullWidth
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    startContent={<Download className="w-4 h-4" />}
                  >
                    Dışa Aktar
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Activity Timeline */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardBody className="p-4">
                        <div className="flex items-center space-x-4">
                          {/* Icon */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.bgColor} flex-shrink-0`}>
                            <activity.icon className={`w-6 h-6 ${activity.color}`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {activity.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {activity.description}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Chip size="sm" color={getTypeColor(activity.type)} variant="flat">
                                  {getTypeLabel(activity.type)}
                                </Chip>
                                {activity.points && (
                                  <Chip size="sm" color="warning" variant="flat">
                                    +{activity.points}
                                  </Chip>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Time */}
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1 flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(activity.timestamp)}</span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* No Results */}
              {filteredActivities.length === 0 && (
                <Card>
                  <CardBody className="p-12 text-center">
                    <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                      Aktivite bulunamadı
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500">
                      Farklı filtreler deneyin
                    </p>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ActivityLogPage











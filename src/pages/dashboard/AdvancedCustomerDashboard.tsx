import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Card, CardBody, Button, Chip, Progress, Avatar, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Tabs, Tab, Switch, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from '@nextui-org/react'
import { 
  MessageSquare, Star, TrendingUp, QrCode, Award, Clock,
  Trophy, Zap, BarChart3, MessageCircle, Settings,
  ArrowUpRight, ArrowDownRight, Users, Gift, Target,
  Flame, Calendar, Eye, Heart, ThumbsUp, Share2,
  Bell, Download, Filter, RefreshCw, Maximize2, Minimize2,
  Plus, ChevronRight, Sparkles, Crown, Rocket, TrendingDown,
  Coffee, ShoppingBag, MapPin, Check, X, Info, AlertCircle
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import DailyRewardsWheel from '../../components/dashboard/DailyRewardsWheel'
import LiveChallenges from '../../components/dashboard/LiveChallenges'
import SocialActivityFeed from '../../components/dashboard/SocialActivityFeed'

interface Widget {
  id: string
  title: string
  type: 'stat' | 'chart' | 'activity' | 'badges' | 'goals' | 'achievements'
  size: 'small' | 'medium' | 'large'
  position: number
  visible: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  progress: number
  target: number
  icon: any
  reward: string
  unlocked: boolean
}

function AdvancedCustomerDashboard() {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
  const [showWidgetSettings, setShowWidgetSettings] = useState(false)
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null)
  
  // Mock real-time stats
  const [liveStats, setLiveStats] = useState({
    activeUsers: 234,
    todayComments: 18,
    pointsEarned: 1250,
    currentStreak: 7
  })

  // Widgets configuration
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'quick-stats', title: 'Hızlı İstatistikler', type: 'stat', size: 'large', position: 0, visible: true },
    { id: 'performance', title: 'Performans Grafiği', type: 'chart', size: 'large', position: 1, visible: true },
    { id: 'recent-activity', title: 'Son Aktiviteler', type: 'activity', size: 'medium', position: 2, visible: true },
    { id: 'badges', title: 'Rozetlerim', type: 'badges', size: 'medium', position: 3, visible: true },
    { id: 'goals', title: 'Hedeflerim', type: 'goals', size: 'medium', position: 4, visible: true },
    { id: 'achievements', title: 'Başarılar', type: 'achievements', size: 'medium', position: 5, visible: true },
  ])

  // Performance data
  const [performanceData, setPerformanceData] = useState([
    { day: 'Pzt', comments: 5, points: 250, badges: 2 },
    { day: 'Sal', comments: 8, points: 400, badges: 3 },
    { day: 'Çar', comments: 4, points: 200, badges: 1 },
    { day: 'Per', comments: 12, points: 600, badges: 4 },
    { day: 'Cum', comments: 6, points: 300, badges: 2 },
    { day: 'Cmt', comments: 15, points: 750, badges: 5 },
    { day: 'Paz', comments: 9, points: 450, badges: 3 },
  ])

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'comment',
      business: 'Starbucks Kadıköy',
      action: 'Yorum yaptın',
      points: 50,
      time: '5 dakika önce',
      icon: MessageCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 2,
      type: 'badge',
      business: 'Yeni Rozet',
      action: 'Kahve Tutkunu rozetini kazandın',
      points: 100,
      time: '2 saat önce',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      id: 3,
      type: 'scan',
      business: "McDonald's Bağdat Cad.",
      action: 'QR kod taradın',
      points: 25,
      time: '5 saat önce',
      icon: QrCode,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 4,
      type: 'like',
      business: 'Nike Store',
      action: '5 yıldız verdin',
      points: 30,
      time: 'Dün',
      icon: Star,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
  ]

  // Achievements
  const achievements: Achievement[] = [
    {
      id: 'first-comment',
      title: 'İlk Yorum',
      description: 'İlk yorumunu yap',
      progress: 1,
      target: 1,
      icon: MessageCircle,
      reward: '50 puan',
      unlocked: true
    },
    {
      id: 'comment-master',
      title: 'Yorum Ustası',
      description: '100 yorum yap',
      progress: 47,
      target: 100,
      icon: MessageSquare,
      reward: '500 puan + Özel Rozet',
      unlocked: false
    },
    {
      id: 'streak-7',
      title: '7 Günlük Seri',
      description: '7 gün üst üste yorum yap',
      progress: 7,
      target: 7,
      icon: Flame,
      reward: '200 puan',
      unlocked: true
    },
    {
      id: 'scanner-pro',
      title: 'Tarayıcı Pro',
      description: '50 QR kod tara',
      progress: 23,
      target: 50,
      icon: QrCode,
      reward: '300 puan',
      unlocked: false
    },
  ]

  // Goals
  const goals = [
    {
      id: 'weekly-comments',
      title: 'Haftalık Yorum Hedefi',
      current: 12,
      target: 20,
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      reward: '+150 puan'
    },
    {
      id: 'monthly-badges',
      title: 'Aylık Rozet Hedefi',
      current: 8,
      target: 15,
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      reward: '+500 puan'
    },
    {
      id: 'daily-streak',
      title: 'Günlük Seri',
      current: 7,
      target: 30,
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      reward: 'Özel Rozet'
    },
  ]

  // Top badges
  const topBadges = [
    { id: 1, name: 'DRACARYS', icon: '🐉', rarity: 'legendary' },
    { id: 2, name: 'Kahve Tutkunu', icon: '☕', rarity: 'epic' },
    { id: 3, name: 'Hızlı Yanıt', icon: '⚡', rarity: 'rare' },
    { id: 4, name: 'Süper Yorum', icon: '💬', rarity: 'rare' },
    { id: 5, name: 'Nike Hayranı', icon: '👟', rarity: 'epic' },
  ]

  // Real-time simulation
  useEffect(() => {
    if (!isRealTimeEnabled) return

    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        todayComments: prev.todayComments + Math.floor(Math.random() * 2),
        pointsEarned: prev.pointsEarned + Math.floor(Math.random() * 50),
        currentStreak: prev.currentStreak
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [isRealTimeEnabled])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-500 to-pink-500'
      case 'rare': return 'from-blue-500 to-cyan-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const maxPerformance = Math.max(...performanceData.map(d => d.comments))

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-0">
        <Header 
          title="Dashboard" 
          subtitle="Hoş geldin! İşte senin performans özetin 🚀"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Top Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
                <CardBody className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Tabs
                          selectedKey={selectedPeriod}
                          onSelectionChange={(key) => setSelectedPeriod(key as string)}
                          size="sm"
                          classNames={{
                            tabList: "bg-white/20 backdrop-blur-sm",
                            tab: "text-white/80",
                            cursor: "bg-white/30",
                            tabContent: "group-data-[selected=true]:text-white"
                          }}
                        >
                          <Tab key="today" title="Bugün" />
                          <Tab key="week" title="Bu Hafta" />
                          <Tab key="month" title="Bu Ay" />
                          <Tab key="year" title="Bu Yıl" />
                        </Tabs>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          size="sm"
                          isSelected={isRealTimeEnabled}
                          onValueChange={setIsRealTimeEnabled}
                          classNames={{
                            wrapper: "bg-white/30"
                          }}
                        />
                        <span className="text-sm">Canlı Veri</span>
                        {isRealTimeEnabled && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1" />
                            <span className="text-xs">Aktif</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-white/20 text-white hover:bg-white/30"
                        startContent={<Filter className="w-4 h-4" />}
                      >
                        Filtre
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-white/20 text-white hover:bg-white/30"
                        startContent={<Download className="w-4 h-4" />}
                      >
                        Export
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-white/20 text-white hover:bg-white/30"
                        isIconOnly
                        onPress={() => setShowWidgetSettings(true)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Live Stats Banner */}
            {isRealTimeEnabled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-blue-300">
                  <CardBody className="p-3">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-xs opacity-90">Aktif Kullanıcı</p>
                        <motion.h3 
                          key={liveStats.activeUsers}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold"
                        >
                          {liveStats.activeUsers}
                        </motion.h3>
                      </div>
                      <Users className="w-8 h-8 opacity-80" />
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-purple-300">
                  <CardBody className="p-3">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-xs opacity-90">Bugünkü Yorum</p>
                        <motion.h3 
                          key={liveStats.todayComments}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold"
                        >
                          {liveStats.todayComments}
                        </motion.h3>
                      </div>
                      <MessageCircle className="w-8 h-8 opacity-80" />
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-green-300">
                  <CardBody className="p-3">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-xs opacity-90">Kazanılan Puan</p>
                        <motion.h3 
                          key={liveStats.pointsEarned}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold"
                        >
                          {liveStats.pointsEarned}
                        </motion.h3>
                      </div>
                      <Sparkles className="w-8 h-8 opacity-80" />
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-red-500 border-2 border-orange-300">
                  <CardBody className="p-3">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-xs opacity-90">Günlük Seri</p>
                        <h3 className="text-2xl font-bold">{liveStats.currentStreak}</h3>
                      </div>
                      <Flame className="w-8 h-8 opacity-80 animate-pulse" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Stats & Charts */}
              <div className="lg:col-span-2 space-y-6">
                {/* Performance Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="border-2 border-gray-200 dark:border-gray-700">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Haftalık Performans
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Son 7 günün özeti
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Chip size="sm" color="primary" variant="flat">
                            +24% artış
                          </Chip>
                          <Button size="sm" isIconOnly variant="flat">
                            <Maximize2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="h-64">
                        <div className="flex items-end justify-between h-full space-x-2">
                          {performanceData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center group">
                              {/* Tooltip */}
                              <div className="absolute -top-20 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                <p className="font-bold">{data.day}</p>
                                <p>💬 {data.comments} yorum</p>
                                <p>⭐ {data.points} puan</p>
                                <p>🏆 {data.badges} rozet</p>
                              </div>

                              {/* Bar */}
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(data.comments / maxPerformance) * 100}%` }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-colors"
                              />

                              {/* Label */}
                              <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {data.day}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Yorumlar</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">
                            Ortalama: {(performanceData.reduce((sum, d) => sum + d.comments, 0) / 7).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Recent Activities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-2 border-gray-200 dark:border-gray-700">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Son Aktiviteler
                        </h3>
                        <Button
                          size="sm"
                          variant="flat"
                          color="primary"
                          endContent={<ChevronRight className="w-4 h-4" />}
                          onPress={() => navigate('/customer/history')}
                        >
                          Tümünü Gör
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {recentActivities.map((activity, index) => {
                          const Icon = activity.icon
                          return (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                              <div className={`w-12 h-12 ${activity.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <Icon className={`w-6 h-6 ${activity.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {activity.business}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {activity.action}
                                </p>
                              </div>
                              <div className="text-right">
                                <Chip size="sm" color="success" variant="flat">
                                  +{activity.points}
                                </Chip>
                                <p className="text-xs text-gray-500 mt-1">
                                  {activity.time}
                                </p>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column - Badges, Goals, Achievements */}
              <div className="space-y-6">
                {/* Top Badges */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="border-2 border-gray-200 dark:border-gray-700">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Rozetlerim
                        </h3>
                        <Button
                          size="sm"
                          variant="flat"
                          color="secondary"
                          onPress={() => navigate('/customer/badges')}
                        >
                          Tümü
                        </Button>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {topBadges.map((badge, index) => (
                          <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                          >
                            <div className={`relative p-3 bg-gradient-to-br ${getRarityColor(badge.rarity)} rounded-lg text-center hover:scale-110 transition-transform`}>
                              <div className="text-3xl mb-1">{badge.icon}</div>
                              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Toplam Rozet
                          </span>
                          <span className="text-2xl font-bold text-orange-600">34</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Goals */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-2 border-gray-200 dark:border-gray-700">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Hedeflerim
                        </h3>
                        <Target className="w-5 h-5 text-purple-500" />
                      </div>

                      <div className="space-y-4">
                        {goals.map((goal, index) => {
                          const Icon = goal.icon
                          const progress = (goal.current / goal.target) * 100
                          return (
                            <motion.div
                              key={goal.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className={`w-8 h-8 bg-gradient-to-br ${goal.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {goal.title}
                                  </span>
                                </div>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                  {goal.current}/{goal.target}
                                </span>
                              </div>
                              <Progress
                                value={progress}
                                classNames={{
                                  indicator: `bg-gradient-to-r ${goal.color}`
                                }}
                                size="sm"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Ödül: {goal.reward}
                              </p>
                            </motion.div>
                          )
                        })}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="border-2 border-gray-200 dark:border-gray-700">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Başarılar
                        </h3>
                        <Chip size="sm" color="primary" variant="flat">
                          {achievements.filter(a => a.unlocked).length}/{achievements.length}
                        </Chip>
                      </div>

                      <div className="space-y-3">
                        {achievements.slice(0, 3).map((achievement, index) => {
                          const Icon = achievement.icon
                          return (
                            <motion.div
                              key={achievement.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className={`p-3 rounded-lg ${
                                achievement.unlocked
                                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
                                  : 'bg-gray-50 dark:bg-gray-800'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 ${
                                  achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'
                                } rounded-lg flex items-center justify-center flex-shrink-0`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                                      {achievement.title}
                                    </h4>
                                    {achievement.unlocked && (
                                      <Check className="w-4 h-4 text-green-500" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                    {achievement.description}
                                  </p>
                                  {!achievement.unlocked && (
                                    <Progress
                                      value={(achievement.progress / achievement.target) * 100}
                                      size="sm"
                                      color="primary"
                                      className="mb-1"
                                    />
                                  )}
                                  <p className="text-xs text-gray-500">
                                    {achievement.unlocked ? '✓ Tamamlandı' : `${achievement.progress}/${achievement.target}`}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>

                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        className="w-full mt-4"
                        endContent={<ChevronRight className="w-4 h-4" />}
                      >
                        Tüm Başarıları Gör
                      </Button>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Hızlı Aksiyonlar
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      size="lg"
                      className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm h-auto py-4"
                      onPress={() => navigate('/customer/scanner')}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <QrCode className="w-8 h-8" />
                        <span>QR Tara</span>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm h-auto py-4"
                      onPress={() => navigate('/customer/badges')}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Trophy className="w-8 h-8" />
                        <span>Rozetler</span>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm h-auto py-4"
                      onPress={() => navigate('/customer/leaderboard')}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Crown className="w-8 h-8" />
                        <span>Liderlik</span>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm h-auto py-4"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Gift className="w-8 h-8" />
                        <span>Ödüller</span>
                      </div>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Super Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Rewards Wheel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <DailyRewardsWheel />
              </motion.div>

              {/* Live Challenges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <LiveChallenges />
              </motion.div>
            </div>

            {/* Social Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <SocialActivityFeed />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdvancedCustomerDashboard


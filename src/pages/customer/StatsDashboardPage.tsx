import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip, Tabs, Tab, Progress, Avatar } from '@nextui-org/react'
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Trophy, Star,
  Target, Zap, Calendar, Award, Gift, ArrowLeft, Activity,
  Eye, Heart, MessageCircle, Share2, Crown, Flame
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useNavigate } from 'react-router-dom'

interface StatCard {
  title: string
  value: string | number
  change: number
  icon: any
  color: string
  gradient: string
}

interface ActivityData {
  day: string
  points: number
  badges: number
  comments: number
}

function StatsDashboardPage() {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const statCards: StatCard[] = [
    {
      title: 'Toplam Puan',
      value: '15,847',
      change: 12.5,
      icon: Star,
      color: 'yellow',
      gradient: 'from-yellow-400 to-yellow-600'
    },
    {
      title: 'Kazanılan Rozetler',
      value: 47,
      change: 8.3,
      icon: Trophy,
      color: 'purple',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Tamamlanan Görevler',
      value: 124,
      change: 15.7,
      icon: Target,
      color: 'green',
      gradient: 'from-green-400 to-green-600'
    },
    {
      title: 'Aktiflik Puanı',
      value: '92%',
      change: 5.2,
      icon: Zap,
      color: 'orange',
      gradient: 'from-orange-400 to-orange-600'
    }
  ]

  const weeklyActivity: ActivityData[] = [
    { day: 'Pzt', points: 420, badges: 2, comments: 5 },
    { day: 'Sal', points: 580, badges: 3, comments: 8 },
    { day: 'Çar', points: 490, badges: 1, comments: 6 },
    { day: 'Per', points: 720, badges: 4, comments: 12 },
    { day: 'Cum', points: 640, badges: 2, comments: 9 },
    { day: 'Cmt', points: 380, badges: 1, comments: 4 },
    { day: 'Paz', points: 510, badges: 2, comments: 7 }
  ]

  const topCategories = [
    { name: 'Alışveriş', value: 450, color: 'bg-blue-500' },
    { name: 'Yorumlar', value: 380, color: 'bg-green-500' },
    { name: 'Görevler', value: 320, color: 'bg-purple-500' },
    { name: 'Rozetler', value: 280, color: 'bg-orange-500' },
    { name: 'Sosyal', value: 240, color: 'bg-pink-500' }
  ]

  const achievements = [
    { title: 'En Aktif Hafta', value: '720 puan', icon: Flame, achieved: true },
    { title: 'Rozet Koleksiyoncusu', value: '47 rozet', icon: Trophy, achieved: true },
    { title: 'Sosyal Kelebek', value: '156 yorum', icon: MessageCircle, achieved: true },
    { title: 'Sadık Müşteri', value: '6 ay', icon: Heart, achieved: false }
  ]

  const maxPoints = Math.max(...weeklyActivity.map(d => d.points))

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📊 İstatistik Dashboard" 
          subtitle="Detaylı performans analizi ve grafikler"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="light"
                startContent={<ArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/customer/dashboard')}
              >
                Dashboard'a Dön
              </Button>
            </motion.div>

            {/* Period Selector */}
            <Card>
              <CardBody className="p-4">
                <Tabs
                  selectedKey={selectedPeriod}
                  onSelectionChange={(key) => setSelectedPeriod(key as string)}
                  variant="bordered"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "bg-gradient-to-r from-purple-500 to-pink-500"
                  }}
                >
                  <Tab key="week" title="Bu Hafta" />
                  <Tab key="month" title="Bu Ay" />
                  <Tab key="year" title="Bu Yıl" />
                  <Tab key="all" title="Tüm Zamanlar" />
                </Tabs>
              </CardBody>
            </Card>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`bg-gradient-to-br ${stat.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    <CardBody className="p-6 relative z-10">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <p className="text-sm opacity-90 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold mb-2">{stat.value}</p>
                          <div className="flex items-center gap-1">
                            {stat.change > 0 ? (
                              <>
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-semibold">+{stat.change}%</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="w-4 h-4" />
                                <span className="text-sm font-semibold">{stat.change}%</span>
                              </>
                            )}
                          </div>
                        </div>
                        <stat.icon className="w-12 h-12 opacity-20" />
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Weekly Activity Chart */}
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      Haftalık Aktivite
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Son 7 günlük performansınız
                    </p>
                  </div>
                  <Chip color="primary" variant="flat">
                    Toplam: {weeklyActivity.reduce((sum, d) => sum + d.points, 0)} puan
                  </Chip>
                </div>

                {/* Custom Bar Chart */}
                <div className="space-y-4">
                  {weeklyActivity.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {day.day}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(day.points / maxPoints) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-end pr-3"
                            >
                              <span className="text-white font-bold text-sm">{day.points}</span>
                            </motion.div>
                          </div>
                          <div className="flex gap-2">
                            <Chip size="sm" variant="flat" startContent={<Trophy className="w-3 h-3" />}>
                              {day.badges}
                            </Chip>
                            <Chip size="sm" variant="flat" startContent={<MessageCircle className="w-3 h-3" />}>
                              {day.comments}
                            </Chip>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Categories */}
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    En Çok Puan Kazanılan Kategoriler
                  </h2>
                  
                  <div className="space-y-4">
                    {topCategories.map((category, index) => {
                      const maxValue = Math.max(...topCategories.map(c => c.value))
                      const percentage = (category.value / maxValue) * 100

                      return (
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                              {category.name}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {category.value} puan
                            </span>
                          </div>
                          <Progress
                            value={percentage}
                            className="h-3"
                            classNames={{
                              indicator: category.color
                            }}
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                </CardBody>
              </Card>

              {/* Achievements */}
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Öne Çıkan Başarılar
                  </h2>
                  
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={achievement.achieved ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : ''}>
                          <CardBody className="p-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full ${
                                achievement.achieved 
                                  ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                                  : 'bg-gray-200 dark:bg-gray-700'
                              } flex items-center justify-center`}>
                                <achievement.icon className={`w-6 h-6 ${
                                  achievement.achieved ? 'text-white' : 'text-gray-400'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white">
                                  {achievement.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {achievement.value}
                                </p>
                              </div>
                              {achievement.achieved && (
                                <Chip size="sm" color="success" variant="flat">
                                  Başarıldı ✓
                                </Chip>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Summary Stats */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardBody className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-purple-500" />
                  Genel Özet
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1,247</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Görüntülenme</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">824</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Beğeni</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">156</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paylaşım</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">342</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Takipçi</p>
                  </div>
                </div>
              </CardBody>
            </Card>

          </div>
        </main>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  )
}

export default StatsDashboardPage


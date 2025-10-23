import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Progress, Chip, Tabs, Tab } from '@nextui-org/react'
import { 
  TrendingUp, Calendar, Target, Award, BarChart3, 
  PieChart, Clock, MessageSquare, Star, Flame,
  Activity, Eye, Heart, ThumbsUp, Share2,
  CheckCircle, XCircle, Users, Globe
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { BADGE_LEVELS } from '../../data/badges'

interface DailyActivity {
  date: string
  comments: number
  points: number
  badges: number
}

interface CategoryStats {
  name: string
  count: number
  percentage: number
  color: string
}

function EnhancedAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Mock data
  const weeklyData: DailyActivity[] = [
    { date: 'Pzt', comments: 5, points: 250, badges: 2 },
    { date: 'Sal', comments: 8, points: 400, badges: 3 },
    { date: 'Çar', comments: 4, points: 200, badges: 1 },
    { date: 'Per', comments: 12, points: 600, badges: 4 },
    { date: 'Cum', comments: 6, points: 300, badges: 2 },
    { date: 'Cmt', comments: 15, points: 750, badges: 5 },
    { date: 'Paz', comments: 9, points: 450, badges: 3 }
  ]

  const categoryStats: CategoryStats[] = [
    { name: 'Restoran', count: 23, percentage: 45, color: '#EF4444' },
    { name: 'Kafe', count: 18, percentage: 35, color: '#F59E0B' },
    { name: 'Market', count: 7, percentage: 14, color: '#10B981' },
    { name: 'Diğer', count: 3, percentage: 6, color: '#6B7280' }
  ]

  const sentimentData = {
    positive: 72,
    neutral: 20,
    negative: 8
  }

  const activityTimes = [
    { hour: '00-06', count: 2, percentage: 4 },
    { hour: '06-12', count: 15, percentage: 30 },
    { hour: '12-18', count: 25, percentage: 50 },
    { hour: '18-24', count: 8, percentage: 16 }
  ]

  const totalComments = weeklyData.reduce((sum, day) => sum + day.comments, 0)
  const totalPoints = weeklyData.reduce((sum, day) => sum + day.points, 0)
  const totalBadges = weeklyData.reduce((sum, day) => sum + day.badges, 0)
  const avgCommentsPerDay = (totalComments / 7).toFixed(1)
  const currentStreak = 7

  const maxComments = Math.max(...weeklyData.map(d => d.comments))

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📊 Gelişmiş Analitik" 
          subtitle="Detaylı aktivite ve performans analizin"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Tabs */}
            <Card>
              <CardBody className="p-4">
                <Tabs
                  selectedKey={activeTab}
                  onSelectionChange={(key) => setActiveTab(key as string)}
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                    tab: "px-4",
                    tabContent: "group-data-[selected=true]:text-purple-600"
                  }}
                >
                  <Tab key="overview" title="Genel Bakış" />
                  <Tab key="activity" title="Aktivite" />
                  <Tab key="categories" title="Kategoriler" />
                  <Tab key="insights" title="İçgörüler" />
                </Tabs>
              </CardBody>
            </Card>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between text-white">
                          <div>
                            <p className="text-sm opacity-90">Bu Hafta</p>
                            <p className="text-3xl font-bold">{totalComments}</p>
                            <p className="text-sm">Yorum</p>
                          </div>
                          <MessageSquare className="w-12 h-12 opacity-20" />
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between text-white">
                          <div>
                            <p className="text-sm opacity-90">Kazanılan</p>
                            <p className="text-3xl font-bold">{totalPoints}</p>
                            <p className="text-sm">Puan</p>
                          </div>
                          <Star className="w-12 h-12 opacity-20" />
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between text-white">
                          <div>
                            <p className="text-sm opacity-90">Seri</p>
                            <p className="text-3xl font-bold">{currentStreak}</p>
                            <p className="text-sm">Gün</p>
                          </div>
                          <Flame className="w-12 h-12 opacity-20" />
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between text-white">
                          <div>
                            <p className="text-sm opacity-90">Yeni Rozet</p>
                            <p className="text-3xl font-bold">{totalBadges}</p>
                            <p className="text-sm">Rozet</p>
                          </div>
                          <Award className="w-12 h-12 opacity-20" />
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                </div>

                {/* Weekly Activity Chart */}
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Haftalık Aktivite
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Ortalama: {avgCommentsPerDay} yorum/gün
                        </p>
                      </div>
                      <BarChart3 className="w-6 h-6 text-purple-500" />
                    </div>

                    <div className="space-y-4">
                      {weeklyData.map((day, index) => (
                        <motion.div
                          key={day.date}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                              {day.date}
                            </span>
                            <div className="flex-1 mx-4">
                              <div className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(day.comments / maxComments) * 100}%` }}
                                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-end pr-2"
                                >
                                  <span className="text-xs font-bold text-white">
                                    {day.comments}
                                  </span>
                                </motion.div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                              <span>{day.points} puan</span>
                              <span>•</span>
                              <span>{day.badges} rozet</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {/* Sentiment Analysis */}
                <Card>
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Yorum Dağılımı
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Pozitif
                            </span>
                          </div>
                          <span className="text-sm font-bold text-green-600">
                            {sentimentData.positive}%
                          </span>
                        </div>
                        <Progress 
                          value={sentimentData.positive}
                          className="h-3"
                          classNames={{
                            indicator: "bg-gradient-to-r from-green-400 to-emerald-500"
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Nötr
                            </span>
                          </div>
                          <span className="text-sm font-bold text-yellow-600">
                            {sentimentData.neutral}%
                          </span>
                        </div>
                        <Progress 
                          value={sentimentData.neutral}
                          className="h-3"
                          classNames={{
                            indicator: "bg-gradient-to-r from-yellow-400 to-orange-400"
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Negatif
                            </span>
                          </div>
                          <span className="text-sm font-bold text-red-600">
                            {sentimentData.negative}%
                          </span>
                        </div>
                        <Progress 
                          value={sentimentData.negative}
                          className="h-3"
                          classNames={{
                            indicator: "bg-gradient-to-r from-red-400 to-rose-500"
                          }}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <>
                <Card>
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Aktif Olduğun Saatler
                    </h3>
                    
                    <div className="space-y-4">
                      {activityTimes.map((time, index) => (
                        <div key={time.hour}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-purple-500" />
                              <span className="text-sm font-medium">{time.hour}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {time.count} yorum ({time.percentage}%)
                            </span>
                          </div>
                          <Progress
                            value={time.percentage}
                            className="h-2"
                            classNames={{
                              indicator: "bg-gradient-to-r from-purple-500 to-pink-500"
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Yorum İstatistikleri
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Ortalama Uzunluk</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">125</p>
                        <p className="text-xs text-gray-500">karakter</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">En Uzun</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">487</p>
                        <p className="text-xs text-gray-500">karakter</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fotoğraflı</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                        <p className="text-xs text-gray-500">yorum</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Beğeniler</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">234</p>
                        <p className="text-xs text-gray-500">toplam</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <Card>
                <CardBody className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Yorum Yaptığın Kategoriler
                  </h3>
                  
                  <div className="space-y-4">
                    {categoryStats.map((cat, index) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {cat.count} yorum ({cat.percentage}%)
                          </div>
                        </div>
                        <Progress
                          value={cat.percentage}
                          className="h-3"
                          classNames={{
                            indicator: `bg-[${cat.color}]`
                          }}
                          style={{
                            ['--tw-gradient-from' as string]: cat.color,
                            ['--tw-gradient-to' as string]: cat.color
                          } as React.CSSProperties}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-purple-900 dark:text-purple-100">
                          En Çok Yorum Yaptığın Kategori
                        </p>
                        <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                          Restoran kategorisinde {categoryStats[0].count} yorum yaparak 
                          toplam yorumlarının %{categoryStats[0].percentage}'ini bu kategoride bırakmışsın!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Insights Tab */}
            {activeTab === 'insights' && (
              <div className="space-y-4">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
                  <CardBody className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">
                          Harika Gidiyorsun! 🎉
                        </h4>
                        <p className="text-green-800 dark:text-green-200">
                          7 günlük serine devam ediyorsun. Bir hafta boyunca her gün yorum yaptın!
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800">
                  <CardBody className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                          Aktivite Artışı 📈
                        </h4>
                        <p className="text-blue-800 dark:text-blue-200">
                          Bu hafta geçen haftaya göre %35 daha aktifsin. Harika bir ilerleme!
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800">
                  <CardBody className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                          Sonraki Hedef 🎯
                        </h4>
                        <p className="text-purple-800 dark:text-purple-200 mb-3">
                          Yücelik ligine ulaşmak için 250 puan daha kazanman gerekiyor!
                        </p>
                        <Progress
                          value={75}
                          className="h-2"
                          classNames={{
                            indicator: "bg-gradient-to-r from-purple-500 to-pink-500"
                          }}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-800">
                  <CardBody className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Flame className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2">
                          En Aktif Günün 🔥
                        </h4>
                        <p className="text-orange-800 dark:text-orange-200">
                          Cumartesi günleri en aktifsin! 15 yorum ile haftanın rekorunuzu kırdın.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default EnhancedAnalyticsPage











import { Card, CardBody, Progress, Chip, Tabs, Tab } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, Target, Clock, Award, Zap, Star, Trophy, 
  BarChart3, PieChart, Calendar, Flame, TrendingDown,
  ArrowUpRight, ArrowDownRight, Activity, Users, Crown,
  Sparkles, Rocket, Brain, Heart, Eye, MessageCircle
} from 'lucide-react'
import { useState } from 'react'

interface BadgeAnalyticsProps {
  userStats: {
    totalBadges: number
    completionRate: number
    averageTimeToUnlock: number
    streakDays: number
    favoriteCategory: string
    monthlyProgress: number[]
  }
}

function BadgeAnalytics({ userStats }: BadgeAnalyticsProps) {
  const [selectedTab, setSelectedTab] = useState('overview')
  
  // Mock data - gerçek uygulamada API'den gelecek
  const categoryBreakdown = [
    { name: 'Aktivite', count: 12, percentage: 35, color: 'from-blue-500 to-cyan-500', icon: Zap },
    { name: 'Davranış', count: 8, percentage: 24, color: 'from-green-500 to-emerald-500', icon: Heart },
    { name: 'Marka', count: 7, percentage: 21, color: 'from-purple-500 to-pink-500', icon: Star },
    { name: 'Özel', count: 7, percentage: 20, color: 'from-orange-500 to-red-500', icon: Sparkles }
  ]

  const rarityBreakdown = [
    { name: 'Yaygın', count: 15, percentage: 44, color: 'bg-gray-400' },
    { name: 'Nadir', count: 10, percentage: 29, color: 'bg-blue-500' },
    { name: 'Epik', count: 6, percentage: 18, color: 'bg-purple-500' },
    { name: 'Efsanevi', count: 3, percentage: 9, color: 'bg-yellow-500' }
  ]

  const weeklyActivity = [
    { day: 'Pzt', badges: 2, comments: 5, hours: 1.5 },
    { day: 'Sal', badges: 3, comments: 8, hours: 2.2 },
    { day: 'Çar', badges: 1, comments: 4, hours: 1.0 },
    { day: 'Per', badges: 4, comments: 12, hours: 3.5 },
    { day: 'Cum', badges: 2, comments: 6, hours: 1.8 },
    { day: 'Cmt', badges: 5, comments: 15, hours: 4.2 },
    { day: 'Paz', badges: 3, comments: 9, hours: 2.5 }
  ]

  const achievements = [
    { 
      title: 'Hızlı Yükseliş', 
      description: 'Bu ay 8 yeni rozet kazandın!', 
      icon: Rocket, 
      color: 'from-blue-500 to-cyan-500',
      achieved: true
    },
    { 
      title: 'Seri Kırıcı', 
      description: '15 günlük aktif seri oluşturdun', 
      icon: Flame, 
      color: 'from-orange-500 to-red-500',
      achieved: true
    },
    { 
      title: 'Kategori Ustası', 
      description: 'Aktivite kategorisinde lidersin', 
      icon: Crown, 
      color: 'from-yellow-400 to-orange-500',
      achieved: true
    },
    { 
      title: 'Sosyal Kelebek', 
      description: 'Bu hafta 50+ yorum yaptın', 
      icon: MessageCircle, 
      color: 'from-purple-500 to-pink-500',
      achieved: false
    }
  ]

  const predictions = [
    { 
      metric: 'Sonraki Rozet', 
      value: '2-3 gün içinde', 
      confidence: 85,
      icon: Target
    },
    { 
      metric: 'Bir Üst Seviye', 
      value: '12 gün', 
      confidence: 92,
      icon: TrendingUp
    },
    { 
      metric: 'Aylık Hedef', 
      value: '%68 tamamlandı', 
      confidence: 78,
      icon: Calendar
    }
  ]

  const comparisonData = {
    yourRank: 15,
    totalUsers: 1250,
    percentile: 98.8,
    aboveAverage: 145,
    topPerformers: [
      { name: 'Aktivite', yourScore: 85, avgScore: 62 },
      { name: 'Davranış', yourScore: 72, avgScore: 58 },
      { name: 'Marka', yourScore: 90, avgScore: 55 },
      { name: 'Özel', yourScore: 78, avgScore: 45 }
    ]
  }

  const maxBadges = Math.max(...weeklyActivity.map(d => d.badges))
  const maxHours = Math.max(...weeklyActivity.map(d => d.hours))

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm opacity-90 mb-1">Toplam Rozet</p>
                  <h3 className="text-4xl font-bold">{userStats.totalBadges}</h3>
                  <div className="flex items-center mt-2 text-sm">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+8 bu ay</span>
                  </div>
                </div>
                <Trophy className="w-12 h-12 opacity-80" />
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Completion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm opacity-90 mb-1">Tamamlanma</p>
                  <h3 className="text-4xl font-bold">{userStats.completionRate}%</h3>
                  <div className="flex items-center mt-2 text-sm">
                    <Target className="w-4 h-4 mr-1" />
                    <span>Hedef: %100</span>
                  </div>
                </div>
                <div className="relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="white"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${(userStats.completionRate / 100) * 176} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm opacity-90 mb-1">Aktif Seri</p>
                  <h3 className="text-4xl font-bold">{userStats.streakDays}</h3>
                  <div className="flex items-center mt-2 text-sm">
                    <Flame className="w-4 h-4 mr-1" />
                    <span>gün üst üste</span>
                  </div>
                </div>
                <div className="text-5xl animate-pulse">🔥</div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Rank */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm opacity-90 mb-1">Sıralaman</p>
                  <h3 className="text-4xl font-bold">#{comparisonData.yourRank}</h3>
                  <div className="flex items-center mt-2 text-sm">
                    <Crown className="w-4 h-4 mr-1" />
                    <span>Top %{(100 - comparisonData.percentile).toFixed(1)}</span>
                  </div>
                </div>
                <Users className="w-12 h-12 opacity-80" />
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardBody className="p-0">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key as string)}
              variant="underlined"
              classNames={{
                tabList: "px-6 pt-4",
                cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                tab: "text-gray-600 dark:text-gray-400",
                tabContent: "group-data-[selected=true]:text-purple-600 dark:group-data-[selected=true]:text-purple-400"
              }}
            >
              <Tab
                key="overview"
                title={
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Genel Bakış</span>
                  </div>
                }
              />
              <Tab
                key="categories"
                title={
                  <div className="flex items-center space-x-2">
                    <PieChart className="w-4 h-4" />
                    <span>Kategoriler</span>
                  </div>
                }
              />
              <Tab
                key="activity"
                title={
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Aktivite</span>
                  </div>
                }
              />
              <Tab
                key="insights"
                title={
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span>İçgörüler</span>
                  </div>
                }
              />
            </Tabs>

            <div className="p-6">
              {/* Overview Tab */}
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  {/* Monthly Progress Chart */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      Aylık İlerleme
                    </h3>
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardBody className="p-6">
                        <div className="flex items-end justify-between h-48 space-x-2">
                          {userStats.monthlyProgress.map((value, index) => {
                            const maxValue = Math.max(...userStats.monthlyProgress)
                            const height = (value / maxValue) * 100
                            const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
                            const currentMonth = new Date().getMonth()
                            const monthIndex = (currentMonth - (userStats.monthlyProgress.length - 1) + index + 12) % 12
                            
                            return (
                              <div key={index} className="flex-1 flex flex-col items-center">
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${height}%` }}
                                  transition={{ delay: index * 0.1, duration: 0.5 }}
                                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg relative group cursor-pointer"
                                >
                                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {value} rozet
                                  </div>
                                </motion.div>
                                <span className="text-xs text-gray-500 mt-2">{months[monthIndex]}</span>
                              </div>
                            )
                          })}
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-purple-500" />
                      Son Başarılar
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => {
                        const Icon = achievement.icon
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className={achievement.achieved ? 'border-2 border-green-500' : 'opacity-60'}>
                              <CardBody className="p-4">
                                <div className="flex items-start space-x-3">
                                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                                      {achievement.achieved && (
                                        <Chip size="sm" color="success" variant="flat">
                                          ✓ Kazanıldı
                                        </Chip>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Categories Tab */}
              {selectedTab === 'categories' && (
                <div className="space-y-6">
                  {/* Category Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart Visualization */}
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardBody className="p-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Kategori Dağılımı</h4>
                        <div className="flex items-center justify-center">
                          <div className="relative w-48 h-48">
                            <svg className="w-full h-full transform -rotate-90">
                              {(() => {
                                let currentAngle = 0
                                return categoryBreakdown.map((category, index) => {
                                  const percentage = category.percentage
                                  const angle = (percentage / 100) * 360
                                  const startAngle = currentAngle
                                  currentAngle += angle
                                  
                                  // Convert to radians
                                  const startRad = (startAngle * Math.PI) / 180
                                  const endRad = (currentAngle * Math.PI) / 180
                                  
                                  // Calculate path
                                  const largeArc = angle > 180 ? 1 : 0
                                  const x1 = 96 + 80 * Math.cos(startRad)
                                  const y1 = 96 + 80 * Math.sin(startRad)
                                  const x2 = 96 + 80 * Math.cos(endRad)
                                  const y2 = 96 + 80 * Math.sin(endRad)
                                  
                                  const colors = [
                                    '#3b82f6', // blue
                                    '#10b981', // green
                                    '#a855f7', // purple
                                    '#f97316'  // orange
                                  ]
                                  
                                  return (
                                    <path
                                      key={index}
                                      d={`M 96 96 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                      fill={colors[index]}
                                      opacity="0.8"
                                      className="hover:opacity-100 transition-opacity cursor-pointer"
                                    />
                                  )
                                })
                              })()}
                              <circle cx="96" cy="96" r="50" fill="white" className="dark:fill-gray-900" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{userStats.totalBadges}</p>
                                <p className="text-sm text-gray-500">Rozet</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Category List */}
                    <div className="space-y-3">
                      {categoryBreakdown.map((category, index) => {
                        const Icon = category.icon
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card>
                              <CardBody className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                      <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white">{category.name}</h4>
                                      <p className="text-sm text-gray-500">{category.count} rozet</p>
                                    </div>
                                  </div>
                                  <Chip size="sm" variant="flat" color="primary">
                                    %{category.percentage}
                                  </Chip>
                                </div>
                                <Progress
                                  value={category.percentage}
                                  classNames={{
                                    indicator: `bg-gradient-to-r ${category.color}`
                                  }}
                                  size="sm"
                                />
                              </CardBody>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Rarity Breakdown */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Nadirlik Dağılımı</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {rarityBreakdown.map((rarity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card>
                            <CardBody className="p-4 text-center">
                              <div className={`w-12 h-12 ${rarity.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                                <Star className="w-6 h-6 text-white" />
                              </div>
                              <h5 className="font-semibold text-gray-900 dark:text-white mb-1">{rarity.name}</h5>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">{rarity.count}</p>
                              <p className="text-xs text-gray-500">%{rarity.percentage}</p>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {selectedTab === 'activity' && (
                <div className="space-y-6">
                  {/* Weekly Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Haftalık Aktivite</h3>
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardBody className="p-6">
                        <div className="grid grid-cols-7 gap-2">
                          {weeklyActivity.map((day, index) => (
                            <div key={index} className="text-center">
                              <div className="mb-2">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">{day.day}</p>
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${(day.badges / maxBadges) * 80}px` }}
                                  transition={{ delay: index * 0.1 }}
                                  className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg mx-auto min-h-[20px]"
                                />
                                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{day.badges}</p>
                              </div>
                              <div className="text-xs text-gray-500 space-y-1">
                                <p>💬 {day.comments}</p>
                                <p>⏱️ {day.hours}h</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Activity Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Toplam Yorum</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {weeklyActivity.reduce((sum, day) => sum + day.comments, 0)}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Toplam Süre</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {weeklyActivity.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bu Hafta</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {weeklyActivity.reduce((sum, day) => sum + day.badges, 0)} rozet
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              )}

              {/* Insights Tab */}
              {selectedTab === 'insights' && (
                <div className="space-y-6">
                  {/* Predictions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-purple-500" />
                      Yapay Zeka Tahminleri
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {predictions.map((prediction, index) => {
                        const Icon = prediction.icon
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                              <CardBody className="p-4">
                                <div className="flex items-start space-x-3 mb-3">
                                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{prediction.metric}</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{prediction.value}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">Güven</span>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={prediction.confidence} size="sm" className="w-20" color="secondary" />
                                    <span className="text-xs font-medium">%{prediction.confidence}</span>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Comparison with Others */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-500" />
                      Diğer Kullanıcılarla Karşılaştırma
                    </h3>
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Senin Sıralaman</p>
                            <p className="text-4xl font-bold text-purple-600">#{comparisonData.yourRank}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Toplam Kullanıcı</p>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">{comparisonData.totalUsers}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Yüzdelik Dilim</p>
                            <p className="text-4xl font-bold text-green-600">Top %{(100 - comparisonData.percentile).toFixed(1)}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {comparisonData.topPerformers.map((category, index) => (
                            <div key={index}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                                <div className="flex items-center space-x-2">
                                  {category.yourScore > category.avgScore ? (
                                    <Chip size="sm" color="success" variant="flat">
                                      <ArrowUpRight className="w-3 h-3 mr-1" />
                                      +{category.yourScore - category.avgScore}
                                    </Chip>
                                  ) : (
                                    <Chip size="sm" color="warning" variant="flat">
                                      <ArrowDownRight className="w-3 h-3 mr-1" />
                                      {category.yourScore - category.avgScore}
                                    </Chip>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500 w-16">Ortalama</span>
                                <Progress value={category.avgScore} size="sm" className="flex-1" color="default" />
                                <span className="text-xs font-medium w-8">{category.avgScore}</span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-purple-600 w-16">Sen</span>
                                <Progress value={category.yourScore} size="sm" className="flex-1" color="secondary" />
                                <span className="text-xs font-bold w-8">{category.yourScore}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Eye className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                Harika gidiyorsun! 🎉
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Ortalamanın <strong>{comparisonData.aboveAverage}%</strong> üstünde performans gösteriyorsun.
                                Marka kategorisinde özellikle başarılısın!
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Smart Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                      Akıllı Öneriler
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-2 border-green-200 dark:border-green-800">
                        <CardBody className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Kolay Hedef</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                "Hızlı Yanıt" rozetine sadece 2 yorum uzaklıktasın! Bugün 2 hızlı yorum yap.
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      <Card className="border-2 border-blue-200 dark:border-blue-800">
                        <CardBody className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Seviye Atlama</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Bir sonraki seviyeye 320 puan kaldı. Haftada 3 rozet kazanarak 10 günde atlayabilirsin.
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      <Card className="border-2 border-purple-200 dark:border-purple-800">
                        <CardBody className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Crown className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Sıralama Yükselt</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Top 10'a girmek için 85 puan daha topla. Özel rozetler fazla puan veriyor!
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      <Card className="border-2 border-orange-200 dark:border-orange-800">
                        <CardBody className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Flame className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Seriyi Koru</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                15 günlük serini kaybetme! Bugün en az 1 yorum yap ve serini devam ettir.
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}

export default BadgeAnalytics

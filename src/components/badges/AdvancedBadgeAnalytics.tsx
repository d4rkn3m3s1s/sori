import { useState, useEffect } from 'react'
import { Card, CardBody, Progress, Chip, Tabs, Tab, Button, Select, SelectItem, Switch, Slider } from '@nextui-org/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, Target, Clock, Award, Zap, Star, Trophy, 
  BarChart3, PieChart, Calendar, Flame, TrendingDown,
  ArrowUpRight, ArrowDownRight, Activity, Users, Crown,
  Sparkles, Rocket, Brain, Heart, Eye, MessageCircle,
  Download, Filter, RefreshCw, Share2, Maximize2,
  LineChart, DollarSign, Gift, ChevronDown, ChevronUp,
  CheckCircle, XCircle, AlertTriangle, Info, Play, Pause
} from 'lucide-react'

interface AdvancedAnalyticsProps {
  userStats: {
    totalBadges: number
    completionRate: number
    averageTimeToUnlock: number
    streakDays: number
    favoriteCategory: string
    monthlyProgress: number[]
  }
}

interface TimeSeriesData {
  date: string
  badges: number
  points: number
  comments: number
}

function AdvancedBadgeAnalytics({ userStats }: AdvancedAnalyticsProps) {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [dateRange, setDateRange] = useState('30')
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
  const [showComparison, setShowComparison] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('badges')
  const [animateCharts, setAnimateCharts] = useState(true)
  const [expandedCards, setExpandedCards] = useState<string[]>([])

  // Mock time series data
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([
    { date: '01 Eki', badges: 2, points: 150, comments: 12 },
    { date: '02 Eki', badges: 1, points: 80, comments: 8 },
    { date: '03 Eki', badges: 3, points: 220, comments: 15 },
    { date: '04 Eki', badges: 2, points: 180, comments: 10 },
    { date: '05 Eki', badges: 4, points: 300, comments: 20 },
    { date: '06 Eki', badges: 1, points: 90, comments: 7 },
    { date: '07 Eki', badges: 3, points: 250, comments: 18 },
    { date: '08 Eki', badges: 2, points: 170, comments: 11 },
    { date: '09 Eki', badges: 5, points: 380, comments: 25 },
    { date: '10 Eki', badges: 3, points: 240, comments: 16 },
    { date: '11 Eki', badges: 2, points: 190, comments: 13 },
    { date: '12 Eki', badges: 4, points: 310, comments: 22 },
    { date: '13 Eki', badges: 3, points: 260, comments: 17 },
    { date: '14 Eki', badges: 6, points: 420, comments: 28 },
  ])

  // Performance metrics
  const performanceMetrics = [
    {
      id: 'engagement',
      label: 'Katılım Skoru',
      value: 87,
      change: 12,
      trend: 'up',
      color: 'from-blue-500 to-cyan-500',
      icon: Activity
    },
    {
      id: 'consistency',
      label: 'Tutarlılık',
      value: 92,
      change: 5,
      trend: 'up',
      color: 'from-purple-500 to-pink-500',
      icon: Target
    },
    {
      id: 'quality',
      label: 'Kalite Skoru',
      value: 78,
      change: -3,
      trend: 'down',
      color: 'from-orange-500 to-red-500',
      icon: Star
    },
    {
      id: 'velocity',
      label: 'Hız',
      value: 95,
      change: 18,
      trend: 'up',
      color: 'from-green-500 to-emerald-500',
      icon: Zap
    }
  ]

  // Category performance over time
  const categoryPerformance = [
    {
      category: 'Aktivite',
      current: 18,
      lastMonth: 15,
      growth: 20,
      color: 'bg-blue-500',
      icon: Zap
    },
    {
      category: 'Davranış',
      current: 12,
      lastMonth: 10,
      growth: 20,
      color: 'bg-green-500',
      icon: Heart
    },
    {
      category: 'Marka',
      current: 9,
      lastMonth: 8,
      growth: 12.5,
      color: 'bg-purple-500',
      icon: Star
    },
    {
      category: 'Özel',
      current: 5,
      lastMonth: 3,
      growth: 66.7,
      color: 'bg-orange-500',
      icon: Sparkles
    }
  ]

  // Hourly activity heatmap data
  const hourlyActivity = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    activity: Math.floor(Math.random() * 100)
  }))

  // Real-time simulation
  useEffect(() => {
    if (!isRealTimeEnabled) return

    const interval = setInterval(() => {
      setTimeSeriesData(prev => {
        const newData = [...prev]
        const lastItem = newData[newData.length - 1]
        const newDate = new Date()
        newData.push({
          date: `${newDate.getHours()}:${newDate.getMinutes()}`,
          badges: lastItem.badges + Math.floor(Math.random() * 3 - 1),
          points: lastItem.points + Math.floor(Math.random() * 100 - 20),
          comments: lastItem.comments + Math.floor(Math.random() * 10 - 2)
        })
        return newData.slice(-14)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isRealTimeEnabled])

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    )
  }

  const exportData = () => {
    // Mock export functionality
    console.log('Exporting analytics data...')
    alert('📊 Analytics raporu CSV olarak indiriliyor...')
  }

  const maxValue = Math.max(...timeSeriesData.map(d => 
    selectedMetric === 'badges' ? d.badges :
    selectedMetric === 'points' ? d.points : d.comments
  ))

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700">
          <CardBody className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Zaman Aralığı:
                  </span>
                  <Select
                    size="sm"
                    selectedKeys={[dateRange]}
                    onSelectionChange={(keys) => setDateRange(Array.from(keys)[0] as string)}
                    className="w-32"
                    variant="bordered"
                  >
                    <SelectItem key="7">Son 7 Gün</SelectItem>
                    <SelectItem key="30">Son 30 Gün</SelectItem>
                    <SelectItem key="90">Son 3 Ay</SelectItem>
                    <SelectItem key="365">Son 1 Yıl</SelectItem>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    size="sm"
                    isSelected={isRealTimeEnabled}
                    onValueChange={setIsRealTimeEnabled}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Canlı Veri
                    </span>
                  </Switch>
                  {isRealTimeEnabled && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                      <span className="text-xs text-green-600 dark:text-green-400">Aktif</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Filtrele
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<Download className="w-4 h-4" />}
                  onPress={exportData}
                >
                  Export
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<Share2 className="w-4 h-4" />}
                >
                  Paylaş
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  isIconOnly
                  startContent={<RefreshCw className="w-4 h-4" />}
                >
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${metric.color} hover:shadow-xl transition-all cursor-pointer`}>
                <CardBody className="p-4">
                  <div className="text-white">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-8 h-8 opacity-80" />
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                        metric.trend === 'up' ? 'bg-white/20' : 'bg-black/20'
                      }`}>
                        {metric.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span className="text-sm font-bold">{metric.change}%</span>
                      </div>
                    </div>
                    <p className="text-sm opacity-90 mb-1">{metric.label}</p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-4xl font-bold">{metric.value}</h3>
                      <span className="text-sm opacity-80">/100</span>
                    </div>
                    <Progress
                      value={metric.value}
                      className="mt-3"
                      classNames={{
                        indicator: "bg-white"
                      }}
                      size="sm"
                    />
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Main Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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
                key="trends"
                title={
                  <div className="flex items-center space-x-2">
                    <LineChart className="w-4 h-4" />
                    <span>Trendler</span>
                  </div>
                }
              />
              <Tab
                key="heatmap"
                title={
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Aktivite Haritası</span>
                  </div>
                }
              />
              <Tab
                key="predictions"
                title={
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span>Tahminler</span>
                  </div>
                }
              />
              <Tab
                key="compare"
                title={
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Karşılaştır</span>
                  </div>
                }
              />
            </Tabs>

            <div className="p-6">
              {/* Overview Tab */}
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  {/* Time Series Chart */}
                  <Card className="border-2 border-gray-200 dark:border-gray-700">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Performans Grafiği
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Son {dateRange} günün özeti
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select
                            size="sm"
                            selectedKeys={[selectedMetric]}
                            onSelectionChange={(keys) => setSelectedMetric(Array.from(keys)[0] as string)}
                            className="w-32"
                            variant="bordered"
                          >
                            <SelectItem key="badges">Rozetler</SelectItem>
                            <SelectItem key="points">Puanlar</SelectItem>
                            <SelectItem key="comments">Yorumlar</SelectItem>
                          </Select>
                          <Button
                            size="sm"
                            isIconOnly
                            variant="flat"
                            onPress={() => setAnimateCharts(!animateCharts)}
                          >
                            {animateCharts ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      {/* Interactive Line Chart */}
                      <div className="relative h-64">
                        <div className="absolute inset-0 flex items-end justify-between space-x-1">
                          {timeSeriesData.map((data, index) => {
                            const value = selectedMetric === 'badges' ? data.badges :
                                        selectedMetric === 'points' ? data.points : data.comments
                            const height = (value / maxValue) * 100
                            
                            return (
                              <div key={index} className="flex-1 flex flex-col items-center group">
                                {/* Tooltip */}
                                <div className="absolute -top-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  <p className="font-bold">{data.date}</p>
                                  <p>Rozetler: {data.badges}</p>
                                  <p>Puanlar: {data.points}</p>
                                  <p>Yorumlar: {data.comments}</p>
                                </div>

                                {/* Bar */}
                                <motion.div
                                  initial={animateCharts ? { height: 0 } : { height: `${height}%` }}
                                  animate={{ height: `${height}%` }}
                                  transition={{ delay: index * 0.05, duration: 0.5 }}
                                  className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg group-hover:from-purple-600 group-hover:to-pink-600 transition-colors cursor-pointer relative"
                                >
                                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-t-lg" />
                                </motion.div>

                                {/* Label */}
                                <span className="text-xs text-gray-500 mt-2 transform rotate-45 origin-top-left">
                                  {data.date}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex items-center justify-center space-x-6 mt-8">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {selectedMetric}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">Ortalama: {
                            Math.round(timeSeriesData.reduce((sum, d) => 
                              sum + (selectedMetric === 'badges' ? d.badges :
                                    selectedMetric === 'points' ? d.points : d.comments), 0
                            ) / timeSeriesData.length)
                          }</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Category Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-gray-200 dark:border-gray-700">
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            Kategori Performansı
                          </h4>
                          <Chip size="sm" variant="flat" color="primary">
                            Son 30 Gün
                          </Chip>
                        </div>

                        <div className="space-y-4">
                          {categoryPerformance.map((cat, index) => {
                            const Icon = cat.icon
                            return (
                              <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 ${cat.color} rounded-lg flex items-center justify-center`}>
                                      <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {cat.category}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                      {cat.current}
                                    </span>
                                    <Chip size="sm" color="success" variant="flat">
                                      +{cat.growth.toFixed(1)}%
                                    </Chip>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Progress
                                    value={(cat.current / 20) * 100}
                                    classNames={{
                                      indicator: cat.color
                                    }}
                                    size="sm"
                                    className="flex-1"
                                  />
                                  <span className="text-xs text-gray-500">
                                    {cat.current}/20
                                  </span>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </CardBody>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="border-2 border-gray-200 dark:border-gray-700">
                      <CardBody className="p-6">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                          Hızlı İstatistikler
                        </h4>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-5 h-5 text-blue-500" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Toplam Rozet
                              </span>
                            </div>
                            <span className="text-xl font-bold text-blue-600">
                              {userStats.totalBadges}
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Target className="w-5 h-5 text-purple-500" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tamamlanma
                              </span>
                            </div>
                            <span className="text-xl font-bold text-purple-600">
                              {userStats.completionRate}%
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Flame className="w-5 h-5 text-orange-500" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Aktif Seri
                              </span>
                            </div>
                            <span className="text-xl font-bold text-orange-600">
                              {userStats.streakDays} gün
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-green-500" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Ortalama Süre
                              </span>
                            </div>
                            <span className="text-xl font-bold text-green-600">
                              {userStats.averageTimeToUnlock} gün
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              )}

              {/* Heatmap Tab */}
              {selectedTab === 'heatmap' && (
                <div className="space-y-6">
                  <Card className="border-2 border-gray-200 dark:border-gray-700">
                    <CardBody className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                        Saatlik Aktivite Haritası
                      </h3>

                      <div className="space-y-2">
                        {/* Hours grid */}
                        <div className="grid grid-cols-24 gap-1">
                          {hourlyActivity.map((item, index) => {
                            const intensity = item.activity
                            return (
                              <div
                                key={index}
                                className="group relative cursor-pointer"
                                style={{
                                  backgroundColor: `rgba(139, 92, 246, ${intensity / 100})`,
                                  height: '40px',
                                  borderRadius: '4px'
                                }}
                              >
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  <p>{item.hour}:00</p>
                                  <p>Aktivite: {intensity}%</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Hour labels */}
                        <div className="grid grid-cols-24 gap-1 text-xs text-gray-500">
                          {Array.from({ length: 24 }, (_, i) => (
                            <div key={i} className="text-center">
                              {i % 4 === 0 ? i : ''}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex items-center justify-center space-x-4 mt-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Düşük</span>
                        <div className="flex space-x-1">
                          {[0.2, 0.4, 0.6, 0.8, 1.0].map((opacity, i) => (
                            <div
                              key={i}
                              className="w-8 h-4 rounded"
                              style={{ backgroundColor: `rgba(139, 92, 246, ${opacity})` }}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Yüksek</span>
                      </div>

                      {/* Insights */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Info className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                              En Aktif Saatler
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              14:00-18:00 arasında en yüksek aktiviteyi gösteriyorsun. Bu saatlerde rozet kazanma şansın %45 daha yüksek!
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* Other tabs content... */}
              {selectedTab === 'trends' && (
                <div className="text-center py-12">
                  <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Trend Analizi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Detaylı trend analizi yakında eklenecek...
                  </p>
                </div>
              )}

              {selectedTab === 'predictions' && (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    AI Tahminleri
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yapay zeka destekli tahminler hazırlanıyor...
                  </p>
                </div>
              )}

              {selectedTab === 'compare' && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Kullanıcı Karşılaştırma
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Diğer kullanıcılarla karşılaştırma özelliği yakında...
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}

export default AdvancedBadgeAnalytics


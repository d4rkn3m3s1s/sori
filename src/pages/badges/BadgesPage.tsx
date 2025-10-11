import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button, Progress, Chip, Tabs, Tab } from '@nextui-org/react'
import { Trophy, Crown, Star, TrendingUp, Award, Zap, ShoppingBag, BarChart3, Tv, Sparkles } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import BadgeCollection from '../../components/badges/BadgeCollection'
import BadgeUnlockAnimation from '../../components/badges/BadgeUnlockAnimation'
import BadgeStore from '../../components/badges/BadgeStore'
import EnhancedBadgeStore from '../../components/badges/EnhancedBadgeStore'
import BadgeAnalytics from '../../components/badges/BadgeAnalytics'
import AdvancedBadgeAnalytics from '../../components/badges/AdvancedBadgeAnalytics'
import { useBadgeSystem } from '../../hooks/useBadgeSystem'
import { Badge } from '../../types/badge'
import { BADGE_LEVELS } from '../../data/badges'

function BadgesPage() {
  const navigate = useNavigate()
  const { 
    userBadges, 
    userStats, 
    allBadges, 
    isLoading 
  } = useBadgeSystem('current-user')
  
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const [activeTab, setActiveTab] = useState('collection')
  const [userPoints, setUserPoints] = useState(1250) // Mock user points

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge)
    if (badge.unlocked) {
      setShowUnlockAnimation(true)
    }
  }

  const handleStorePurchase = (item: any) => {
    if (userPoints >= item.price) {
      setUserPoints(prev => prev - item.price)
      // Store purchase logic would go here
      console.log('Purchased:', item.name)
    }
  }

  // Mock analytics data
  const mockAnalyticsData = {
    totalBadges: userStats?.totalBadges || 0,
    completionRate: userStats ? Math.round((userStats.totalBadges / allBadges.length) * 100) : 0,
    averageTimeToUnlock: 3.5, // days
    streakDays: 15,
    favoriteCategory: userStats?.favoriteCategory || 'activity',
    monthlyProgress: [2, 5, 3, 8, 4, 6, 9, 7, 12, 10, 8, 11] // last 12 months
  }

  const currentLevel = BADGE_LEVELS.find(level => 
    userStats && userStats.totalPoints >= level.requiredPoints
  ) || BADGE_LEVELS[0]

  const nextLevel = BADGE_LEVELS.find(level => 
    userStats && userStats.totalPoints < level.requiredPoints
  )

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar userType="customer" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Rozetler" subtitle="Rozet koleksiyonun yükleniyor..." userType="customer" />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Rozetlerin yükleniyor...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Rozet Sistemi" 
          subtitle="Başarılarını keşfet, mağazadan alışveriş yap ve istatistiklerini incele"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* TV Show Badges Promo Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-2 border-white/20">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Tv className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          YENİ: TV Dizi & Genel Rozetler!
                        </h3>
                        <p className="text-white/90 text-sm">
                          80+ rozet: TV karakterleri + Genel emoji rozetleri koleksiyonu
                        </p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="bg-white text-purple-600 font-bold hover:scale-105 transition-transform"
                      endContent={<Tv className="w-5 h-5" />}
                      onClick={() => navigate('/customer/tv-badges')}
                    >
                      Keşfet
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* User Level & Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between text-white mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Crown className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Seviye {currentLevel.level}</h2>
                        <p className="text-white/90">{currentLevel.name}</p>
                        <Button
                          size="sm"
                          className="bg-white/20 text-white mt-2 hover:bg-white/30"
                          onClick={() => navigate('/customer/league')}
                        >
                          ⚔️ Lig Sistemini Gör
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold">{userStats?.totalPoints || 0}</div>
                      <div className="text-sm text-white/80">Rozet Puanı</div>
                      <div className="text-lg font-medium mt-1 flex items-center justify-end space-x-1">
                        <ShoppingBag className="w-4 h-4" />
                        <span>{userPoints} Mağaza Puanı</span>
                      </div>
                    </div>
                  </div>

                  {/* Level Progress */}
                  {nextLevel && userStats && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/90">Sonraki Seviye: {nextLevel.name}</span>
                        <span className="text-white font-medium">
                          {userStats.totalPoints} / {nextLevel.requiredPoints}
                        </span>
                      </div>
                      <Progress 
                        value={(userStats.totalPoints / nextLevel.requiredPoints) * 100}
                        className="h-3"
                        classNames={{
                          indicator: "bg-gradient-to-r from-yellow-400 to-orange-500"
                        }}
                      />
                      <p className="text-white/80 text-sm mt-2">
                        {nextLevel.requiredPoints - userStats.totalPoints} puan kaldı
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardBody className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userStats?.totalBadges || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Toplam Rozet
                  </div>
                </CardBody>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardBody className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    #{userStats?.rank || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sıralama
                  </div>
                </CardBody>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardBody className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userStats?.favoriteCategory || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Favori Kategori
                  </div>
                </CardBody>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardBody className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userStats?.recentUnlocks.length || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Son Kazanılan
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                className="w-full"
                classNames={{
                  tabList: "bg-white dark:bg-gray-800 shadow-lg",
                  cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                  tab: "text-gray-600 dark:text-gray-400",
                  tabContent: "group-data-[selected=true]:text-white"
                }}
              >
                <Tab 
                  key="collection" 
                  title={
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4" />
                      <span>Koleksiyon</span>
                    </div>
                  } 
                />
                <Tab 
                  key="store" 
                  title={
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Mağaza</span>
                    </div>
                  } 
                />
                <Tab 
                  key="analytics" 
                  title={
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>İstatistikler</span>
                    </div>
                  } 
                />
              </Tabs>
            </motion.div>

            {/* Tab Content */}
            {activeTab === 'collection' && (
              <>
                {/* Recent Unlocks */}
                {userStats && userStats.recentUnlocks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card>
                      <CardBody className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Son Kazanılan Rozetler
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              En son elde ettiğin başarılar
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-4 overflow-x-auto pb-2">
                          {userStats.recentUnlocks.map((badge) => (
                            <div key={badge.id} className="flex-shrink-0">
                              <div 
                                className="w-20 h-24 cursor-pointer"
                                onClick={() => handleBadgeClick(badge)}
                              >
                                <div className={`w-full h-16 bg-gradient-to-br ${badge.gradient} rounded-lg flex items-center justify-center mb-2 shadow-lg hover:shadow-xl transition-shadow`}>
                                  <span className="text-2xl">{badge.icon}</span>
                                </div>
                                <p className="text-xs text-center font-medium text-gray-700 dark:text-gray-300 line-clamp-2">
                                  {badge.name}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                )}

                {/* Badge Collection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <BadgeCollection
                    badges={allBadges}
                    userBadges={userBadges}
                    onBadgeClick={handleBadgeClick}
                    showProgress={true}
                  />
                </motion.div>
              </>
            )}

            {activeTab === 'store' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <EnhancedBadgeStore 
                  userPoints={userPoints}
                  onPurchase={handleStorePurchase}
                />
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AdvancedBadgeAnalytics userStats={mockAnalyticsData} />
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Badge Unlock Animation */}
      <BadgeUnlockAnimation
        badge={selectedBadge}
        isVisible={showUnlockAnimation}
        onClose={() => {
          setShowUnlockAnimation(false)
          setSelectedBadge(null)
        }}
      />
    </div>
  )
}

export default BadgesPage
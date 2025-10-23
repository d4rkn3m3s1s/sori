import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Progress, Chip, Tabs, Tab } from '@nextui-org/react'
import { Trophy, Star, Lock, CheckCircle, Sparkles, TrendingUp } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, RARITY_LABELS, calculateAchievementStats, Achievement } from '../../data/achievements'
import confetti from 'canvas-confetti'

function AchievementsPage() {
  // Mock: Set some achievements as unlocked with progress for demo
  const [achievements, setAchievements] = useState<Achievement[]>(
    ACHIEVEMENTS.map(a => {
      if (a.id === 'first-comment') return { ...a, unlocked: true, progress: 1 }
      if (a.id === 'comments-10') return { ...a, unlocked: true, progress: 10 }
      if (a.id === 'badges-5') return { ...a, unlocked: true, progress: 5 }
      if (a.id === 'points-1000') return { ...a, unlocked: true, progress: 1000 }
      if (a.id === 'streak-3') return { ...a, progress: 2, unlocked: false }
      if (a.id === 'comments-50') return { ...a, progress: 35, unlocked: false }
      if (a.id === 'badges-10') return { ...a, progress: 7, unlocked: false }
      return a
    })
  )

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRarity, setSelectedRarity] = useState<string>('all')

  const stats = calculateAchievementStats(achievements)

  // Filter achievements
  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory
    const rarityMatch = selectedRarity === 'all' || achievement.rarity === selectedRarity
    return categoryMatch && rarityMatch
  })

  // Sort: unlocked first, then by rarity
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1
    const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 }
    return rarityOrder[a.rarity] - rarityOrder[b.rarity]
  })

  const getRarityChip = (rarity: Achievement['rarity']) => {
    const config = RARITY_LABELS[rarity]
    const colorMap = {
      common: 'default',
      rare: 'primary',
      epic: 'secondary',
      legendary: 'warning'
    }
    return (
      <Chip size="sm" color={colorMap[rarity] as any} variant="flat">
        {config.label}
      </Chip>
    )
  }

  const handleAchievementClick = (achievement: Achievement) => {
    if (achievement.unlocked) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      })
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🏆 Başarılar & Aşamalar" 
          subtitle="Tüm başarılarını keşfet ve kilitleri aç!"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Açılan</p>
                        <p className="text-4xl font-bold">{stats.unlocked}</p>
                        <p className="text-sm">/ {stats.total}</p>
                      </div>
                      <Trophy className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Tamamlanma</p>
                        <p className="text-4xl font-bold">{stats.percentage}%</p>
                        <p className="text-sm">Başarı</p>
                      </div>
                      <TrendingUp className="w-16 h-16 opacity-20" />
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
                        <p className="text-sm opacity-90">Kazanılan</p>
                        <p className="text-4xl font-bold">{stats.totalPoints}</p>
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
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Kilitli</p>
                        <p className="text-4xl font-bold">{stats.total - stats.unlocked}</p>
                        <p className="text-sm">Başarı</p>
                      </div>
                      <Lock className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Genel İlerleme
                  </h3>
                  <span className="text-sm font-bold text-purple-600">
                    {stats.unlocked}/{stats.total}
                  </span>
                </div>
                <Progress
                  value={stats.percentage}
                  className="h-4"
                  classNames={{
                    indicator: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                  }}
                />
              </CardBody>
            </Card>

            {/* Filters */}
            <Card>
              <CardBody className="p-4">
                <Tabs
                  selectedKey={selectedCategory}
                  onSelectionChange={(key) => setSelectedCategory(key as string)}
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                    tab: "px-4",
                    tabContent: "group-data-[selected=true]:text-purple-600"
                  }}
                >
                  <Tab key="all" title="Tümü" />
                  {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, cat]) => (
                    <Tab 
                      key={key} 
                      title={
                        <div className="flex items-center space-x-2">
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </div>
                      } 
                    />
                  ))}
                </Tabs>
              </CardBody>
            </Card>

            {/* Rarity Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Nadirlik:</span>
              <div className="flex space-x-2">
                <Chip
                  size="sm"
                  variant={selectedRarity === 'all' ? 'solid' : 'flat'}
                  onClick={() => setSelectedRarity('all')}
                  className="cursor-pointer"
                >
                  Tümü
                </Chip>
                {Object.entries(RARITY_LABELS).map(([key, rarity]) => (
                  <Chip
                    key={key}
                    size="sm"
                    variant={selectedRarity === key ? 'solid' : 'flat'}
                    onClick={() => setSelectedRarity(key)}
                    className="cursor-pointer"
                  >
                    {rarity.label}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleAchievementClick(achievement)}
                    className="cursor-pointer"
                  >
                    <Card 
                      className={`relative overflow-hidden transition-all hover:scale-105 ${
                        achievement.unlocked 
                          ? 'border-2 border-green-500 shadow-lg shadow-green-500/20' 
                          : 'opacity-80 grayscale-[50%]'
                      }`}
                    >
                      <CardBody className="p-6">
                        {/* Icon & Status */}
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br ${achievement.gradient} ${
                              !achievement.unlocked && 'opacity-50'
                            }`}
                          >
                            {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 text-white" />}
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            {getRarityChip(achievement.rarity)}
                            {achievement.unlocked && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <div className="bg-green-500 rounded-full p-1">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {achievement.description}
                        </p>

                        {/* Progress */}
                        {!achievement.unlocked && (
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                İlerleme
                              </span>
                              <span className="text-xs font-bold" style={{ color: achievement.color }}>
                                {achievement.progress} / {achievement.requirement.value}
                              </span>
                            </div>
                            <Progress
                              value={(achievement.progress / achievement.requirement.value) * 100}
                              className="h-2"
                              classNames={{
                                indicator: `bg-gradient-to-r ${achievement.gradient}`
                              }}
                            />
                          </div>
                        )}

                        {/* Reward */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Ödül</span>
                            <Chip
                              size="sm"
                              className={`bg-gradient-to-r ${achievement.gradient} text-white font-bold`}
                              startContent={<Sparkles className="w-3 h-3" />}
                            >
                              +{achievement.reward.points} puan
                            </Chip>
                          </div>
                        </div>

                        {/* Locked Overlay */}
                        {!achievement.unlocked && (
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
                        )}
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {sortedAchievements.length === 0 && (
              <Card>
                <CardBody className="p-12 text-center">
                  <Lock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                    Bu filtrede başarı bulunamadı
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Farklı bir kategori veya nadirlik seçeneği deneyin
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AchievementsPage











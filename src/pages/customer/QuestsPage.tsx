import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Progress, Chip, Tabs, Tab, Button } from '@nextui-org/react'
import { Target, Clock, Trophy, Sparkles, CheckCircle, Zap, Calendar } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { DAILY_QUESTS, WEEKLY_QUESTS, SPECIAL_QUESTS, DIFFICULTY_LABELS, calculateQuestStats, Quest } from '../../data/quests'
import confetti from 'canvas-confetti'

function QuestsPage() {
  const [dailyQuests, setDailyQuests] = useState<Quest[]>(DAILY_QUESTS)
  const [weeklyQuests, setWeeklyQuests] = useState<Quest[]>(WEEKLY_QUESTS)
  const [specialQuests, setSpecialQuests] = useState<Quest[]>(SPECIAL_QUESTS)
  const [selectedTab, setSelectedTab] = useState('daily')

  const dailyStats = calculateQuestStats(dailyQuests)
  const weeklyStats = calculateQuestStats(weeklyQuests)
  const specialStats = calculateQuestStats(specialQuests)

  const allCompleted = dailyStats.completed + weeklyStats.completed + specialStats.completed
  const allTotal = dailyStats.total + weeklyStats.total + specialStats.total

  const handleClaimReward = (questId: string, type: 'daily' | 'weekly' | 'special') => {
    const setQuests = type === 'daily' ? setDailyQuests : type === 'weekly' ? setWeeklyQuests : setSpecialQuests
    const quests = type === 'daily' ? dailyQuests : type === 'weekly' ? weeklyQuests : specialQuests

    const quest = quests.find(q => q.id === questId)
    if (quest && quest.requirement.current >= quest.requirement.value) {
      setQuests(quests.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ))

      // Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const getDifficultyChip = (difficulty: Quest['difficulty']) => {
    const config = DIFFICULTY_LABELS[difficulty]
    const colorMap = {
      easy: 'success',
      medium: 'warning',
      hard: 'danger'
    }
    return (
      <Chip size="sm" color={colorMap[difficulty] as any} variant="flat">
        {config.label}
      </Chip>
    )
  }

  const getTimeRemaining = (expiresAt?: Date) => {
    if (!expiresAt) return null
    
    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours < 1) return `${minutes} dakika`
    if (hours < 24) return `${hours} saat`
    const days = Math.floor(hours / 24)
    return `${days} gün`
  }

  const QuestCard = ({ quest, type }: { quest: Quest, type: 'daily' | 'weekly' | 'special' }) => {
    const isClaimable = quest.requirement.current >= quest.requirement.value && !quest.completed
    const progress = (quest.requirement.current / quest.requirement.value) * 100

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: quest.completed ? 1 : 1.02 }}
        className="cursor-pointer"
      >
        <Card 
          className={`relative overflow-hidden ${
            quest.completed ? 'border-2 border-green-500 opacity-75' : ''
          } ${isClaimable ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/20' : ''}`}
        >
          <CardBody className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br ${quest.gradient} flex-shrink-0`}
                >
                  {quest.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {quest.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {quest.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                {getDifficultyChip(quest.difficulty)}
                {quest.completed && (
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

            {/* Progress */}
            {!quest.completed && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    İlerleme
                  </span>
                  <span className="text-sm font-bold" style={{ color: quest.color }}>
                    {quest.requirement.current} / {quest.requirement.value}
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-3"
                  classNames={{
                    indicator: `bg-gradient-to-r ${quest.gradient}`
                  }}
                />
              </div>
            )}

            {/* Time & Reward */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                {quest.expiresAt && !quest.completed && (
                  <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{getTimeRemaining(quest.expiresAt)}</span>
                  </div>
                )}
                <Chip
                  size="sm"
                  className={`bg-gradient-to-r ${quest.gradient} text-white font-bold`}
                  startContent={<Sparkles className="w-3 h-3" />}
                >
                  +{quest.reward.points} puan
                </Chip>
                {quest.reward.badge && (
                  <Chip size="sm" variant="flat" color="secondary">
                    🏆 Rozet
                  </Chip>
                )}
                {quest.reward.boost && (
                  <Chip size="sm" variant="flat" color="warning">
                    ⚡ Boost
                  </Chip>
                )}
              </div>

              {isClaimable && (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                  onPress={() => handleClaimReward(quest.id, type)}
                  startContent={<Trophy className="w-4 h-4" />}
                >
                  Ödülü Al
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🎮 Günlük Görevler" 
          subtitle="Görevleri tamamla, ödülleri topla!"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Günlük</p>
                        <p className="text-4xl font-bold">{dailyStats.completed}/{dailyStats.total}</p>
                        <p className="text-sm">Görev</p>
                      </div>
                      <Calendar className="w-16 h-16 opacity-20" />
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
                        <p className="text-sm opacity-90">Haftalık</p>
                        <p className="text-4xl font-bold">{weeklyStats.completed}/{weeklyStats.total}</p>
                        <p className="text-sm">Görev</p>
                      </div>
                      <Target className="w-16 h-16 opacity-20" />
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
                        <p className="text-sm opacity-90">Özel</p>
                        <p className="text-4xl font-bold">{specialStats.completed}/{specialStats.total}</p>
                        <p className="text-sm">Görev</p>
                      </div>
                      <Sparkles className="w-16 h-16 opacity-20" />
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
                        <p className="text-sm opacity-90">Toplam Puan</p>
                        <p className="text-4xl font-bold">
                          {dailyStats.totalPoints + weeklyStats.totalPoints + specialStats.totalPoints}
                        </p>
                        <p className="text-sm">Kazanıldı</p>
                      </div>
                      <Trophy className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Overall Progress */}
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Genel İlerleme
                  </h3>
                  <span className="text-sm font-bold text-purple-600">
                    {allCompleted}/{allTotal}
                  </span>
                </div>
                <Progress
                  value={(allCompleted / allTotal) * 100}
                  className="h-4"
                  classNames={{
                    indicator: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  }}
                />
              </CardBody>
            </Card>

            {/* Quest Tabs */}
            <Card>
              <CardBody className="p-4">
                <Tabs
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(key as string)}
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                    tab: "px-4",
                    tabContent: "group-data-[selected=true]:text-purple-600"
                  }}
                >
                  <Tab 
                    key="daily" 
                    title={
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Günlük ({dailyStats.completed}/{dailyStats.total})</span>
                      </div>
                    } 
                  />
                  <Tab 
                    key="weekly" 
                    title={
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Haftalık ({weeklyStats.completed}/{weeklyStats.total})</span>
                      </div>
                    } 
                  />
                  <Tab 
                    key="special" 
                    title={
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Özel ({specialStats.completed}/{specialStats.total})</span>
                      </div>
                    } 
                  />
                </Tabs>
              </CardBody>
            </Card>

            {/* Quest Lists */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {selectedTab === 'daily' && (
                  <motion.div
                    key="daily"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {dailyQuests.map(quest => (
                      <QuestCard key={quest.id} quest={quest} type="daily" />
                    ))}
                  </motion.div>
                )}

                {selectedTab === 'weekly' && (
                  <motion.div
                    key="weekly"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {weeklyQuests.map(quest => (
                      <QuestCard key={quest.id} quest={quest} type="weekly" />
                    ))}
                  </motion.div>
                )}

                {selectedTab === 'special' && (
                  <motion.div
                    key="special"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {specialQuests.map(quest => (
                      <QuestCard key={quest.id} quest={quest} type="special" />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardBody className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                      💡 Görev İpuçları
                    </h4>
                    <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                      <li>• Günlük görevler her gün sıfırlanır</li>
                      <li>• Haftalık görevler Pazartesi günü yenilenir</li>
                      <li>• Özel görevler süresiz olarak devam eder</li>
                      <li>• Görev tamamlandığında ödülü almayı unutma!</li>
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default QuestsPage











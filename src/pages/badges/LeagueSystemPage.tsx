import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button, Progress } from '@nextui-org/react'
import { ArrowLeft, Trophy, TrendingUp, Crown, Star, Zap } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import LeagueLevelCard from '../../components/badges/LeagueLevelCard'
import { BADGE_LEVELS } from '../../data/badges'

function LeagueSystemPage() {
  const navigate = useNavigate()
  
  // Mock user data
  const [currentPoints] = useState(1250)
  
  // Find current level
  const currentLevel = [...BADGE_LEVELS]
    .reverse()
    .find(level => currentPoints >= level.requiredPoints) || BADGE_LEVELS[0]
  
  // Find next level
  const nextLevel = BADGE_LEVELS.find(level => level.level === currentLevel.level + 1)
  
  // Calculate overall progress
  const totalPoints = BADGE_LEVELS[BADGE_LEVELS.length - 1].requiredPoints
  const overallProgress = (currentPoints / totalPoints) * 100

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="⚔️ Lig Sistemi" 
          subtitle="Seviye atla, ayrıcalıkları keşfet"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="light"
                startContent={<ArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/customer/badges')}
              >
                Rozet Sayfasına Dön
              </Button>
            </motion.div>

            {/* Current Level Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
                <CardBody className="p-8">
                  <div className="grid md:grid-cols-3 gap-6 text-white">
                    {/* Current Level */}
                    <div className="text-center">
                      <div className="text-6xl mb-2">{currentLevel.icon}</div>
                      <h3 className="text-2xl font-bold mb-1">
                        {currentLevel.name}
                      </h3>
                      <p className="text-white/80 text-sm">Mevcut Lig</p>
                    </div>

                    {/* Points */}
                    <div className="text-center">
                      <Trophy className="w-16 h-16 mx-auto mb-2" />
                      <div className="text-4xl font-bold mb-1">
                        {currentPoints.toLocaleString()}
                      </div>
                      <p className="text-white/80 text-sm">Toplam Puan</p>
                    </div>

                    {/* Next Level */}
                    <div className="text-center">
                      {nextLevel ? (
                        <>
                          <div className="text-6xl mb-2 opacity-60">{nextLevel.icon}</div>
                          <h3 className="text-2xl font-bold mb-1">
                            {nextLevel.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {nextLevel.requiredPoints - currentPoints} puan kaldı
                          </p>
                        </>
                      ) : (
                        <>
                          <Crown className="w-16 h-16 mx-auto mb-2" />
                          <h3 className="text-2xl font-bold mb-1">
                            Maximum Seviye!
                          </h3>
                          <p className="text-white/80 text-sm">Tebrikler!</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Next Level Progress */}
                  {nextLevel && (
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/90 text-sm">
                          {currentLevel.name} → {nextLevel.name}
                        </span>
                        <span className="text-white font-bold">
                          {Math.round(((currentPoints - currentLevel.requiredPoints) / (nextLevel.requiredPoints - currentLevel.requiredPoints)) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={((currentPoints - currentLevel.requiredPoints) / (nextLevel.requiredPoints - currentLevel.requiredPoints)) * 100}
                        className="h-3"
                        classNames={{
                          indicator: "bg-white"
                        }}
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>

            {/* Overall Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Star className="w-6 h-6 text-yellow-500" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Genel İlerleme
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Tüm ligler arası yolculuğunuz
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(overallProgress)}%
                      </div>
                      <div className="text-xs text-gray-500">Tamamlandı</div>
                    </div>
                  </div>
                  <Progress
                    value={overallProgress}
                    className="h-3"
                    classNames={{
                      indicator: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                    }}
                  />
                </CardBody>
              </Card>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mevcut Seviye</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {currentLevel.level} / {BADGE_LEVELS.length}
                        </p>
                      </div>
                      <TrendingUp className="w-10 h-10 text-purple-500" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Açılan Ayrıcalıklar</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {currentLevel.benefits.length}
                        </p>
                      </div>
                      <Zap className="w-10 h-10 text-yellow-500" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Kalan Seviye</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {BADGE_LEVELS.length - currentLevel.level}
                        </p>
                      </div>
                      <Crown className="w-10 h-10 text-pink-500" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* League Levels */}
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
              >
                <Trophy className="w-6 h-6 text-yellow-500" />
                Tüm Ligler
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BADGE_LEVELS.map((level, index) => (
                  <LeagueLevelCard
                    key={level.level}
                    level={level}
                    currentPoints={currentPoints}
                    isCurrentLevel={level.level === currentLevel.level}
                    isUnlocked={currentPoints >= level.requiredPoints}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default LeagueSystemPage




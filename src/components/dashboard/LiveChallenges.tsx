import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Progress, Avatar, AvatarGroup } from '@nextui-org/react'
import { 
  Zap, Clock, Users, Trophy, Target, Flame, 
  MessageCircle, QrCode, Star, Award, ChevronRight
} from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  type: 'solo' | 'team' | 'community'
  timeLeft: number // in seconds
  progress: number
  target: number
  reward: string
  difficulty: 'easy' | 'medium' | 'hard'
  participants: number
  icon: any
  color: string
}

function LiveChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Hızlı 5li',
      description: '30 dakika içinde 5 yorum yap',
      type: 'solo',
      timeLeft: 1245, // 20:45
      progress: 3,
      target: 5,
      reward: '150 puan + Hız Rozeti',
      difficulty: 'easy',
      participants: 1,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      title: 'Takım Çalışması',
      description: 'Takımınla 50 yorum hedefine ulaş',
      type: 'team',
      timeLeft: 7200, // 2 hours
      progress: 32,
      target: 50,
      reward: '500 puan (her üye)',
      difficulty: 'medium',
      participants: 5,
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '3',
      title: 'Topluluk Hedefi',
      description: 'Tüm topluluk olarak 1000 QR tara',
      type: 'community',
      timeLeft: 21600, // 6 hours
      progress: 674,
      target: 1000,
      reward: 'Özel Rozet + 300 puan',
      difficulty: 'hard',
      participants: 234,
      icon: QrCode,
      color: 'from-orange-500 to-red-500'
    },
  ])

  const [showExpired, setShowExpired] = useState(false)

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setChallenges(prev =>
        prev.map(challenge => ({
          ...challenge,
          timeLeft: Math.max(0, challenge.timeLeft - 1)
        }))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'danger'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'solo': return Target
      case 'team': return Users
      case 'community': return Award
      default: return Trophy
    }
  }

  const joinChallenge = (id: string) => {
    console.log('Joining challenge:', id)
    // Add challenge logic here
  }

  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Flame className="w-6 h-6 mr-2 text-orange-500 animate-pulse" />
            Canlı Meydan Okumalar
          </h3>
          <Chip size="sm" color="danger" variant="flat" className="animate-pulse">
            🔴 LIVE
          </Chip>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon
              const TypeIcon = getTypeIcon(challenge.type)
              const progressPercent = (challenge.progress / challenge.target) * 100
              const isExpired = challenge.timeLeft === 0

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={isExpired ? 'opacity-50' : ''}
                >
                  <Card className={`bg-gradient-to-br ${challenge.color} ${isExpired ? 'grayscale' : ''}`}>
                    <CardBody className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-bold text-white">{challenge.title}</h4>
                              <Chip
                                size="sm"
                                color={getDifficultyColor(challenge.difficulty)}
                                variant="flat"
                                className="capitalize"
                              >
                                {challenge.difficulty}
                              </Chip>
                            </div>
                            <p className="text-sm text-white/90 mb-2">
                              {challenge.description}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-white/80">
                              <div className="flex items-center">
                                <TypeIcon className="w-3 h-3 mr-1" />
                                <span className="capitalize">{challenge.type}</span>
                              </div>
                              {challenge.participants > 1 && (
                                <div className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  <span>{challenge.participants} katılımcı</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Timer */}
                        <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          <Clock className="w-4 h-4 text-white" />
                          <span className="text-sm font-mono font-bold text-white">
                            {formatTime(challenge.timeLeft)}
                          </span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2 text-white">
                          <span className="text-sm font-medium">İlerleme</span>
                          <span className="text-sm font-bold">
                            {challenge.progress}/{challenge.target}
                          </span>
                        </div>
                        <Progress
                          value={progressPercent}
                          className="mb-2"
                          classNames={{
                            indicator: "bg-white"
                          }}
                          size="sm"
                        />
                      </div>

                      {/* Reward & Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-white">
                          <Trophy className="w-4 h-4" />
                          <span className="text-sm font-medium">{challenge.reward}</span>
                        </div>

                        <Button
                          size="sm"
                          className="bg-white text-gray-900 hover:bg-white/90"
                          endContent={<ChevronRight className="w-4 h-4" />}
                          onPress={() => joinChallenge(challenge.id)}
                          isDisabled={isExpired}
                        >
                          {isExpired ? 'Süresi Doldu' : 'Katıl'}
                        </Button>
                      </div>

                      {/* Team Members (for team challenges) */}
                      {challenge.type === 'team' && (
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/80">Takım Üyeleri</span>
                            <AvatarGroup size="sm" max={3}>
                              <Avatar src="https://i.pravatar.cc/150?u=1" />
                              <Avatar src="https://i.pravatar.cc/150?u=2" />
                              <Avatar src="https://i.pravatar.cc/150?u=3" />
                              <Avatar src="https://i.pravatar.cc/150?u=4" />
                              <Avatar src="https://i.pravatar.cc/150?u=5" />
                            </AvatarGroup>
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <Button
          variant="flat"
          color="primary"
          className="w-full mt-4"
          endContent={<ChevronRight className="w-4 h-4" />}
        >
          Tüm Meydan Okumaları Gör ({challenges.length + 5})
        </Button>
      </CardBody>
    </Card>
  )
}

export default LiveChallenges


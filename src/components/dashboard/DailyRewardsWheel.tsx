import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { Gift, Sparkles, Trophy, Zap, Star, Crown, Flame } from 'lucide-react'

interface Reward {
  id: number
  label: string
  points: number
  color: string
  icon: any
  probability: number
}

function DailyRewardsWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [wonReward, setWonReward] = useState<Reward | null>(null)
  const [canSpin, setCanSpin] = useState(true)
  const [spinCount, setSpinCount] = useState(0)

  const rewards: Reward[] = [
    { id: 1, label: '50 Puan', points: 50, color: '#3b82f6', icon: Star, probability: 0.3 },
    { id: 2, label: '100 Puan', points: 100, color: '#8b5cf6', icon: Sparkles, probability: 0.25 },
    { id: 3, label: '25 Puan', points: 25, color: '#10b981', icon: Zap, probability: 0.2 },
    { id: 4, label: '200 Puan', points: 200, color: '#f59e0b', icon: Trophy, probability: 0.15 },
    { id: 5, label: '500 Puan', points: 500, color: '#ef4444', icon: Crown, probability: 0.05 },
    { id: 6, label: '75 Puan', points: 75, color: '#06b6d4', icon: Flame, probability: 0.05 },
  ]

  const spinWheel = () => {
    if (!canSpin || isSpinning) return

    setIsSpinning(true)
    
    // Select random reward based on probability
    const random = Math.random()
    let cumulativeProbability = 0
    let selectedReward = rewards[0]
    
    for (const reward of rewards) {
      cumulativeProbability += reward.probability
      if (random <= cumulativeProbability) {
        selectedReward = reward
        break
      }
    }

    // Calculate rotation (multiple full rotations + final position)
    const segmentAngle = 360 / rewards.length
    const targetIndex = rewards.indexOf(selectedReward)
    // Add random offset for more natural feel
    const randomOffset = Math.random() * 20 - 10
    const targetRotation = 360 * 5 + (targetIndex * segmentAngle) + randomOffset
    
    setRotation(prev => prev + targetRotation)

    // Show reward after animation
    setTimeout(() => {
      setIsSpinning(false)
      setWonReward(selectedReward)
      setShowRewardModal(true)
      setCanSpin(false)
      setSpinCount(prev => prev + 1)
    }, 4000)
  }

  const resetWheel = () => {
    setShowRewardModal(false)
    setWonReward(null)
    // In real app, check if can spin again (daily limit, etc.)
  }

  return (
    <>
      <style>{`
        @keyframes spin-wheel {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .wheel-container {
          will-change: transform;
          transform-style: preserve-3d;
        }
      `}</style>
      
      <Card className="border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardBody className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
              <Gift className="w-6 h-6 mr-2 text-purple-500" />
              Günlük Ödül Çarkı
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {canSpin ? 'Günlük şansını dene!' : 'Yarın tekrar dön!'}
            </p>
          </div>

          {/* Wheel Container */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-red-500 drop-shadow-lg" />
            </div>

            {/* Wheel */}
            <motion.div
              className="w-full h-full rounded-full relative overflow-hidden shadow-2xl wheel-container"
              animate={{
                rotate: rotation,
              }}
              transition={{
                duration: 4,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              {/* Segments */}
              {rewards.map((reward, index) => {
                const Icon = reward.icon
                const segmentAngle = 360 / rewards.length
                const segmentRotation = index * segmentAngle

                return (
                  <div
                    key={reward.id}
                    className="absolute w-full h-full pointer-events-none"
                    style={{
                      transform: `rotate(${segmentRotation}deg)`,
                      transformOrigin: 'center center',
                    }}
                  >
                    <div
                      className="absolute w-full h-1/2 origin-bottom"
                      style={{
                        backgroundColor: reward.color,
                        clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                      }}
                    >
                      {/* Segment border */}
                      <div 
                        className="absolute inset-0 origin-bottom"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                      />
                      
                      {/* Content */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
                        <Icon className="w-6 h-6 text-white mx-auto mb-1 drop-shadow-lg" />
                        <p className="text-xs font-bold text-white whitespace-nowrap drop-shadow-lg">
                          {reward.label}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center z-10 shadow-lg">
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </div>
            </motion.div>
          </div>

          {/* Spin Button */}
          <Button
            size="lg"
            color="primary"
            className="w-full"
            onPress={spinWheel}
            isDisabled={!canSpin || isSpinning}
            isLoading={isSpinning}
          >
            {isSpinning ? 'Dönüyor...' : canSpin ? 'Çarkı Çevir! 🎯' : 'Yarın Tekrar Dön! ⏰'}
          </Button>

          {/* Spin Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Bugün: {spinCount}/1</span>
            <span>Toplam: 12 çevirme</span>
          </div>
        </CardBody>
      </Card>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && wonReward && (
          <Modal
            isOpen={showRewardModal}
            onClose={resetWheel}
            backdrop="blur"
            placement="center"
            size="md"
          >
            <ModalContent>
              <ModalHeader>
                <h3 className="text-2xl font-bold text-center w-full">
                  🎉 Tebrikler! 🎉
                </h3>
              </ModalHeader>
              <ModalBody className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <div
                    className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: wonReward.color }}
                  >
                    {(() => {
                      const Icon = wonReward.icon
                      return <Icon className="w-16 h-16 text-white" />
                    })()}
                  </div>
                </motion.div>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {wonReward.points} Puan Kazandın!
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Puanların hesabına eklendi ✨
                </p>

                {/* Confetti Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(30)].map((_, i) => {
                    const emojis = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🎁', '🏆']
                    const angle = (i / 30) * Math.PI * 2
                    const distance = 150
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute text-3xl"
                        initial={{
                          x: '50%',
                          y: '50%',
                          scale: 0,
                          rotate: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: `calc(50% + ${Math.cos(angle) * distance}px)`,
                          y: `calc(50% + ${Math.sin(angle) * distance}px)`,
                          scale: [0, 1.2, 0],
                          rotate: 360,
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.03,
                          ease: "easeOut"
                        }}
                      >
                        {emojis[Math.floor(Math.random() * emojis.length)]}
                      </motion.div>
                    )
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={resetWheel} className="w-full">
                  Harika! 🚀
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default DailyRewardsWheel


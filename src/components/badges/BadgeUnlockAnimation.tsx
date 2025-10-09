import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button } from '@nextui-org/react'
import { Badge } from '../../types/badge'
import { Sparkles, Crown, Star, Zap, X } from 'lucide-react'
import confetti from 'canvas-confetti'

interface BadgeUnlockAnimationProps {
  badge: Badge | null
  isVisible: boolean
  onClose: () => void
}

function BadgeUnlockAnimation({ badge, isVisible, onClose }: BadgeUnlockAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'celebrate' | 'exit'>('enter')

  useEffect(() => {
    if (isVisible && badge) {
      // Trigger confetti based on rarity
      const triggerConfetti = () => {
        const colors = badge.rarity === 'legendary' 
          ? ['#FFD700', '#FFA500', '#FF6347']
          : badge.rarity === 'epic'
          ? ['#8B5CF6', '#EC4899', '#3B82F6']
          : badge.rarity === 'rare'
          ? ['#3B82F6', '#06B6D4', '#10B981']
          : ['#6B7280', '#9CA3AF', '#D1D5DB']

        confetti({
          particleCount: badge.rarity === 'legendary' ? 150 : badge.rarity === 'epic' ? 100 : 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors
        })

        // Additional effects for legendary badges
        if (badge.rarity === 'legendary') {
          setTimeout(() => {
            confetti({
              particleCount: 100,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: colors
            })
          }, 250)

          setTimeout(() => {
            confetti({
              particleCount: 100,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: colors
            })
          }, 400)
        }
      }

      // Animation sequence
      setTimeout(() => {
        setAnimationPhase('celebrate')
        triggerConfetti()
      }, 500)

      // Play sound effect (in real app)
      const playSound = () => {
        if (badge.rarity === 'legendary') {
          console.log('🎵 Playing legendary unlock sound')
        } else if (badge.rarity === 'epic') {
          console.log('🎵 Playing epic unlock sound')
        } else {
          console.log('🎵 Playing standard unlock sound')
        }
      }

      playSound()
    }
  }, [isVisible, badge])

  if (!badge) return null

  const getRarityIcon = () => {
    switch (badge.rarity) {
      case 'legendary': return <Crown className="w-8 h-8 text-yellow-500" />
      case 'epic': return <Star className="w-8 h-8 text-purple-500" />
      case 'rare': return <Zap className="w-8 h-8 text-blue-500" />
      default: return <Sparkles className="w-8 h-8 text-gray-500" />
    }
  }

  const getRarityGradient = () => {
    switch (badge.rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500'
      case 'epic': return 'from-purple-400 via-pink-500 to-red-500'
      case 'rare': return 'from-blue-400 via-purple-500 to-pink-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getBackgroundEffect = () => {
    switch (badge.rarity) {
      case 'legendary':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: window.innerHeight + 10,
                    opacity: 0 
                  }}
                  animate={{ 
                    y: -10, 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: Math.random() * 2,
                    repeat: Infinity 
                  }}
                />
              ))}
            </div>
          </div>
        )
      case 'epic':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-red-500/20 animate-pulse" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          {getBackgroundEffect()}
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: animationPhase === 'enter' ? [0, 1.2, 1] : 1,
              rotate: animationPhase === 'enter' ? [0, 360] : 0
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              times: [0, 0.6, 1]
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <Card className={`w-96 bg-gradient-to-br ${getRarityGradient()} shadow-2xl`}>
              <CardBody className="p-8 text-center relative overflow-hidden">
                {/* Close button */}
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute top-2 right-2 text-white/80 hover:text-white"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Rarity indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mb-4"
                >
                  {getRarityIcon()}
                </motion.div>

                {/* Badge unlock text */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Rozet Kazandın!
                  </h2>
                  <p className="text-white/90 text-sm mb-6">
                    Tebrikler! Yeni bir başarı elde ettin.
                  </p>
                </motion.div>

                {/* Badge display */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: animationPhase === 'celebrate' ? [1, 1.1, 1] : 1,
                    rotate: animationPhase === 'celebrate' ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ 
                    delay: 0.6,
                    duration: 0.6,
                    repeat: animationPhase === 'celebrate' ? 2 : 0
                  }}
                  className="relative mb-6"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${getRarityGradient()} rounded-full blur-xl opacity-50 scale-150`} />
                  
                  {/* Badge container */}
                  <div className="relative w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <div className="text-6xl">
                      {badge.icon}
                    </div>
                  </div>

                  {/* Sparkle effects */}
                  {animationPhase === 'celebrate' && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          initial={{ 
                            x: 64, 
                            y: 64, 
                            scale: 0 
                          }}
                          animate={{ 
                            x: 64 + Math.cos(i * 45 * Math.PI / 180) * 80,
                            y: 64 + Math.sin(i * 45 * Math.PI / 180) * 80,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 1,
                            delay: 0.2 + i * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>

                {/* Badge info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-white"
                >
                  <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    {badge.description}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="bg-white/20 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium">+{badge.points} Puan</span>
                    </div>
                    <div className="bg-white/20 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium capitalize">{badge.rarity}</span>
                    </div>
                  </div>

                  {/* Privileges */}
                  {badge.privileges && badge.privileges.length > 0 && (
                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                      <p className="text-sm font-semibold mb-2">🎁 Yeni Ayrıcalıklar:</p>
                      {badge.privileges.map((privilege, index) => (
                        <p key={index} className="text-xs text-white/90">
                          • {privilege.description}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Action button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Button
                    className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
                    onClick={onClose}
                  >
                    Harika! 🎉
                  </Button>
                </motion.div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BadgeUnlockAnimation

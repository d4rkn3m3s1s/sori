import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Progress, Chip, Tooltip } from '@nextui-org/react'
import { TreePine, Droplet, Heart, Gift, Sparkles, Award, TrendingUp } from 'lucide-react'
import confetti from 'canvas-confetti'

type GrowthType = 'tree' | 'water' | 'food' | 'education'

interface GrowthStage {
  emoji: string
  name: string
  required: number
}

interface GrowthSystemProps {
  type: GrowthType
  title: string
  subtitle: string
  icon: any
  gradient: string
  unitName: string
  stages: GrowthStage[]
  realImpact: string
  targetValue: number
}

const growthConfigs: Record<GrowthType, {
  title: string
  subtitle: string
  icon: any
  gradient: string
  unitName: string
  bgGradient: string
  stages: GrowthStage[]
  realImpact: string
  targetValue: number
  successMessage: string
}> = {
  tree: {
    title: '🌳 20 Tohum - 1 Fidan',
    subtitle: 'Sabırla büyüyen iyilik fidan olur',
    icon: TreePine,
    gradient: 'from-green-400 via-emerald-500 to-teal-500',
    bgGradient: 'from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20',
    unitName: 'Tohum',
    stages: [
      { emoji: '🌰', name: 'Tohum', required: 0 },
      { emoji: '🌿', name: 'Fidan', required: 5 },
      { emoji: '🌳', name: 'Ağaç', required: 12 },
      { emoji: '🏞️', name: 'Orman', required: 20 },
    ],
    realImpact: 'Senin katkınla 1 fidan dikildi! 🌍',
    targetValue: 20,
    successMessage: 'Bir ağaç büyüdü, ormanlar seninle yeşillendi! 🌳✨'
  },
  water: {
    title: '💧 50 Damla - 1 Su',
    subtitle: 'Bir damla da senden olsun',
    icon: Droplet,
    gradient: 'from-blue-400 via-cyan-400 to-blue-500',
    bgGradient: 'from-blue-50 via-cyan-50 to-blue-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-900/20',
    unitName: 'Damla',
    stages: [
      { emoji: '💧', name: 'Damla', required: 0 },
      { emoji: '💦', name: 'Su', required: 15 },
      { emoji: '🚰', name: 'Musluk', required: 35 },
      { emoji: '⛲', name: 'Kuyu', required: 50 },
    ],
    realImpact: 'Bir damla daha hayat oldu! 💙',
    targetValue: 50,
    successMessage: 'Birike birike bir hayat oldu! 💧✨'
  },
  food: {
    title: '🐾 30 Pati - 1 Mama',
    subtitle: 'Sevgi paylaştıkça çoğalır',
    icon: Heart,
    gradient: 'from-pink-400 via-rose-400 to-red-500',
    bgGradient: 'from-pink-50 via-rose-50 to-red-50 dark:from-pink-900/20 dark:via-rose-900/20 dark:to-red-900/20',
    unitName: 'Pati',
    stages: [
      { emoji: '🐶', name: 'Mama Paketi', required: 0 },
      { emoji: '🍗', name: 'Mama', required: 15 },
      { emoji: '🥣', name: 'Mama Kabı', required: 30 },
    ],
    realImpact: 'Bir dostun karnı seninle doydu! 🐱🐶',
    targetValue: 30,
    successMessage: 'Minik dostların seni bekliyor! 🐾✨'
  },
  education: {
    title: '✏️ 15 Kalem - 1 Eğitim',
    subtitle: 'Bir kalem, bin hayal',
    icon: Gift,
    gradient: 'from-purple-400 via-violet-400 to-indigo-500',
    bgGradient: 'from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-900/20 dark:via-violet-900/20 dark:to-indigo-900/20',
    unitName: 'Kalem',
    stages: [
      { emoji: '✏️', name: 'Kalem', required: 0 },
      { emoji: '📓', name: 'Defter', required: 5 },
      { emoji: '🖊️', name: 'Kalemlik', required: 10 },
      { emoji: '🎓', name: 'Eğitim', required: 15 },
    ],
    realImpact: 'Bir çocuğun kalemi seninle yazdı! 🎓',
    targetValue: 15,
    successMessage: 'Kutundan çıkan iyilik, bir çocuğun geleceğini yazar! ✏️✨'
  }
}

function SingleGrowthCard({ type }: { type: GrowthType }) {
  const config = growthConfigs[type]
  const [units, setUnits] = useState(Math.floor(Math.random() * 25 + 5)) // Random demo value
  const [totalCompleted, setTotalCompleted] = useState(Math.floor(Math.random() * 3))
  const [isHovered, setIsHovered] = useState(false)
  const [previewStageIndex, setPreviewStageIndex] = useState(0)

  // Auto-cycle through stages every 5 seconds for preview
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewStageIndex((prev) => (prev + 1) % config.stages.length)
    }, 5000) // 5 saniye

    return () => clearInterval(interval)
  }, [config.stages.length])

  // Get current stage based on actual units
  const getCurrentStage = () => {
    return [...config.stages].reverse().find(
      stage => units >= stage.required
    ) || config.stages[0]
  }

  const currentStage = getCurrentStage()
  const previewStage = config.stages[previewStageIndex]

  // Get next stage
  const getNextStage = () => {
    const currentIndex = config.stages.findIndex(s => s.name === currentStage.name)
    return currentIndex < config.stages.length - 1 ? config.stages[currentIndex + 1] : null
  }

  const nextStage = getNextStage()

  // Calculate progress
  const calculateProgress = () => {
    if (!nextStage) return 100
    const current = units - currentStage.required
    const required = nextStage.required - currentStage.required
    return (current / required) * 100
  }

  // Complete action
  const handleComplete = () => {
    if (units < config.targetValue) return

    // Enhanced Confetti
    const colors = config.gradient.includes('green') ? ['#4ade80', '#22c55e', '#16a34a'] :
                   config.gradient.includes('blue') ? ['#3b82f6', '#0ea5e9', '#06b6d4'] :
                   config.gradient.includes('pink') ? ['#ec4899', '#f43f5e', '#ef4444'] :
                   ['#8b5cf6', '#6366f1', '#7c3aed']

    // Multiple confetti bursts
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6, x: 0.3 },
      colors: colors
    })

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6, x: 0.7 },
        colors: colors
      })
    }, 150)

    setTimeout(() => {
      setUnits(units - config.targetValue)
      setTotalCompleted(totalCompleted + 1)
    }, 1000)
  }

  const Icon = config.icon
  const canComplete = units >= config.targetValue

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        rotateY: 3,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`relative overflow-hidden bg-gradient-to-br ${config.bgGradient} border-2 shadow-2xl`}
        style={{
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.2)',
          transition: 'border-color 0.3s',
        }}
      >
        {/* Animated Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-5`}
          animate={{
            opacity: isHovered ? 0.1 : 0.05,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />

        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Glow Effect when hovering */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute -inset-1 bg-gradient-to-r ${config.gradient} blur-xl opacity-30`}
            />
          )}
        </AnimatePresence>

        <CardBody className="p-5 sm:p-6 relative z-10">
          {/* Stage-Specific Floating Particles - Optimized */}
          {[...Array(4)].map((_, i) => {
            const particleEmojis = type === 'tree' ? ['🌿', '🍃', '🌱'] :
                                   type === 'water' ? ['💧', '💦', '💙'] :
                                   type === 'food' ? ['🐾', '❤️', '🐶'] :
                                   ['✏️', '📚', '✨']
            
            return (
              <motion.div
                key={`type-particle-${i}`}
                className="absolute text-lg sm:text-xl pointer-events-none opacity-30"
                style={{
                  left: `${15 + i * 25}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 7 + i,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              >
                {particleEmojis[i % particleEmojis.length]}
              </motion.div>
            )
          })}

          {/* Header with Enhanced Design */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              <motion.div 
                className="flex items-center gap-2 mb-2"
                animate={{
                  x: isHovered ? [0, 2, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <motion.div
                  className={`p-2 rounded-xl bg-gradient-to-br ${config.gradient}`}
                  animate={{
                    rotate: isHovered ? [0, 10, 0] : 0,
                    scale: isHovered ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {config.title}
                </h3>
              </motion.div>
              <motion.p 
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic"
                animate={{
                  opacity: isHovered ? [1, 0.7, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                "{config.subtitle}"
              </motion.p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <motion.div
                animate={{
                  scale: totalCompleted > 0 ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Chip 
                  size="lg" 
                  className={`bg-gradient-to-r ${config.gradient} text-white font-bold shadow-lg`}
                  startContent={
                    <motion.span
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ✨
                    </motion.span>
                  }
                >
                  {totalCompleted}
                </Chip>
              </motion.div>
              
              {/* Mini Impact Counter */}
              <motion.div
                className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-700"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <span className="text-xs">🌍</span>
                <motion.span 
                  className="text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {totalCompleted * config.targetValue}
                </motion.span>
                <span className="text-xs text-gray-600 dark:text-gray-400">etki</span>
              </motion.div>
            </div>
          </div>

          {/* Growing Animation - Enhanced */}
          <div className="relative min-h-[160px] flex items-center justify-center mb-5 rounded-2xl p-6 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)`,
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Animated Background Circles - Optimized */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`circle-${i}`}
                className={`absolute rounded-full bg-gradient-to-br ${config.gradient} opacity-10`}
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            <AnimatePresence mode="wait">
              <motion.div
                key={previewStageIndex}
                initial={{ scale: 0, rotate: -20, opacity: 0, y: 20 }}
                animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
                exit={{ scale: 0, rotate: 20, opacity: 0, y: -20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  damping: 15,
                }}
                className="text-center relative z-10"
              >
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [-3, 3, -3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-7xl sm:text-8xl mb-3 relative"
                >
                  {previewStage.emoji}
                  {/* Glow effect behind emoji */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${config.gradient} blur-2xl opacity-30`}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
                
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Chip 
                    size="lg"
                    className={`bg-gradient-to-r ${config.gradient} text-white font-bold shadow-xl`}
                    startContent={<Sparkles className="w-4 h-4" />}
                  >
                    {previewStage.name}
                  </Chip>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Floating particles - Optimized */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute text-xl pointer-events-none opacity-40"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${25 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10 - i * 5, 0],
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                {previewStage.emoji}
              </motion.div>
            ))}
          </div>

          {/* Stats - Enhanced */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <motion.div 
              className="text-center p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl border-2 backdrop-blur-sm cursor-pointer"
              style={{
                borderColor: canComplete ? `rgba(34, 197, 94, 0.3)` : `rgba(156, 163, 175, 0.2)`,
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setUnits(prev => Math.min(prev + 1, config.targetValue))}
            >
              <motion.p 
                className={`text-3xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
                animate={{
                  scale: canComplete ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                {units}
              </motion.p>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-1 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {config.unitName}
              </p>
            </motion.div>
            <motion.div 
              className="text-center p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl border-2 border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setUnits(0)}
            >
              <p className={`text-3xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                {config.targetValue}
              </p>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Award className="w-3 h-3" />
                Hedef
              </p>
            </motion.div>
          </div>

          {/* Progress - Enhanced */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <motion.span 
                className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1"
                animate={{
                  x: [0, 2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <TrendingUp className="w-3 h-3" />
                {currentStage.name}
              </motion.span>
              {nextStage && (
                <motion.span 
                  className={`text-xs font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent flex items-center gap-1`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <span>→</span> {nextStage.name}
                </motion.span>
              )}
            </div>
            
            <div className="relative">
              <Progress 
                value={calculateProgress()}
                className="h-3"
                aria-label={`${config.title} ilerleme durumu: ${Math.round(calculateProgress())}%`}
                classNames={{
                  indicator: canComplete 
                    ? `bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 shadow-lg` 
                    : `bg-gradient-to-r ${config.gradient} shadow-lg`
                }}
              />
              {/* Enhanced Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
              {/* Rainbow Glow Effect when can complete */}
              {canComplete && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full blur-sm opacity-60"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                  {/* Rainbow sparkles - Optimized */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`rainbow-sparkle-${i}`}
                      className="absolute top-1/2 text-xs"
                      style={{
                        left: `${25 + i * 25}%`,
                      }}
                      animate={{
                        y: [-8, -15, -8],
                        opacity: [0, 0.8, 0],
                        scale: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </>
              )}
            </div>
            
            {nextStage && (
              <motion.p 
                className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-2 text-center"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {nextStage.required - units} {config.unitName} daha gerekli ✨
              </motion.p>
            )}
          </div>

          {/* Action Button - Enhanced */}
          <motion.div
            whileHover={{ scale: canComplete ? 1.03 : 1 }}
            whileTap={{ scale: canComplete ? 0.97 : 1 }}
            className="relative"
          >
            {/* Glow effect when ready */}
            {canComplete && (
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${config.gradient} rounded-xl blur-md`}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
            <Tooltip 
              content={canComplete ? config.realImpact : `${config.targetValue} ${config.unitName} gerekli!`}
              color={canComplete ? "success" : "default"}
            >
              <Button
                size="lg"
                className={`w-full bg-gradient-to-r ${config.gradient} text-white font-bold shadow-xl relative`}
                isDisabled={!canComplete}
                onClick={handleComplete}
                startContent={
                  <motion.div
                    animate={{
                      rotate: canComplete ? [0, 360] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {canComplete ? <Sparkles className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </motion.div>
                }
              >
                <motion.span
                  animate={canComplete ? {
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  {canComplete ? '🎉 Tamamla!' : `${config.targetValue} ${config.unitName}`}
                </motion.span>
              </Button>
            </Tooltip>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

function MultiGrowthSystem() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
          <CardBody className="p-4 sm:p-5">
            <div className="text-center text-white">
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold mb-2"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                🌱 Biriktir, Yetiştir, Değiştir! 💝
              </motion.h2>
              <p className="text-sm sm:text-base opacity-90">
                Her aktivite sana birim kazandırır. Biriktir, tamamla, gerçek iyilik yap! ✨
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Growth Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SingleGrowthCard type="tree" />
        <SingleGrowthCard type="water" />
        <SingleGrowthCard type="food" />
        <SingleGrowthCard type="education" />
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
          <CardBody className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-white">
              <motion.div 
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Award className="w-6 h-6" />
              </motion.div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-base sm:text-lg mb-1">
                  Her Tamamlama Gerçek Bağış! 💝
                </h4>
                <p className="text-xs sm:text-sm text-white/90">
                  Yorum yap, puan kazan, biriktir, tamamla. Her birim gerçek bir iyiliğe dönüşür! 🌟
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}

export default MultiGrowthSystem


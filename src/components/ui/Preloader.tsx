import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Logo from './Logo'

interface PreloaderProps {
  isLoading: boolean
  onComplete?: () => void
  duration?: number
}

function Preloader({ 
  isLoading, 
  onComplete, 
  duration = 2500 
}: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('Başlatılıyor...')

  const loadingTexts = [
    '🚀 Başlatılıyor...',
    '🤖 AI Motoru Yükleniyor...',
    '📊 Dashboard Hazırlanıyor...',
    '🎯 Analitikler Kuruluyor...',
    '✨ Neredeyse Hazır...'
  ]

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete?.()
          }, 500)
          return 100
        }
        return newProgress
      })
    }, duration / 50)

    const textInterval = setInterval(() => {
      setCurrentText(prev => {
        const currentIndex = loadingTexts.indexOf(prev)
        const nextIndex = (currentIndex + 1) % loadingTexts.length
        return loadingTexts[nextIndex]
      })
    }, duration / loadingTexts.length)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [isLoading, duration, onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="
            fixed inset-0 z-50
            bg-gradient-to-br from-purple-950 via-pink-900 to-blue-950
            flex items-center justify-center
            overflow-hidden
          "
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Enhanced Background Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  background: [
                    'rgba(139, 92, 246, 0.5)',
                    'rgba(236, 72, 153, 0.5)',
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(16, 185, 129, 0.5)',
                  ][Math.floor(Math.random() * 4)],
                }}
                animate={{
                  y: [0, -150, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Rotating Rings */}
          {[1, 2].map((ring, i) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border-2"
              style={{
                width: `${200 + i * 80}px`,
                height: `${200 + i * 80}px`,
                borderColor: `rgba(139, 92, 246, ${0.2 - i * 0.05})`,
              }}
              animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* 3D Cube Logo Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0]
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                rotate: { duration: 0.8, ease: "easeOut" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative"
            >
              {/* Glow Effect Behind Logo */}
              <motion.div
                className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Logo size="xl" animated={true} showText={true} />
            </motion.div>

            {/* Loading Text with Gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <motion.h2
                key={currentText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-2"
              >
                {currentText}
              </motion.h2>
              
              <p className="text-gray-300 text-sm flex items-center justify-center space-x-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.span>
                <span>Yapay Zeka Destekli Platform</span>
              </p>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-96 max-w-[90vw]"
            >
              {/* Progress Container */}
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full relative overflow-hidden shadow-lg shadow-purple-500/50"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      repeatDelay: 0.5
                    }}
                  />
                  
                  {/* Pulse Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Progress Text */}
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Yükleniyor...</span>
                <span className="font-mono font-bold text-white">{Math.round(progress)}%</span>
              </div>
            </motion.div>

            {/* Animated Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex space-x-3"
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: [
                      'linear-gradient(135deg, #8B5CF6, #EC4899)',
                      'linear-gradient(135deg, #EC4899, #3B82F6)',
                      'linear-gradient(135deg, #3B82F6, #10B981)',
                      'linear-gradient(135deg, #10B981, #F59E0B)',
                    ][i]
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-2 border-white/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute top-8 right-8 w-8 h-8 border-2 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute bottom-8 left-8 w-10 h-10 border-2 border-white/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader



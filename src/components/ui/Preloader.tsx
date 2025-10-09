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
  duration = 3000 
}: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('Initializing...')

  const loadingTexts = [
    'Initializing...',
    'Loading AI Engine...',
    'Preparing Dashboard...',
    'Setting up Analytics...',
    'Almost Ready...'
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="
            fixed inset-0 z-50
            bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
            flex items-center justify-center
            overflow-hidden
          "
        >
          {/* Background Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Logo size="xl" animated={true} showText={true} />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center"
            >
              <motion.h2
                key={currentText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-semibold text-white mb-2"
              >
                {currentText}
              </motion.h2>
              
              <p className="text-gray-300 text-sm">
                Powered by Artificial Intelligence
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center"
            >
              <span className="text-3xl font-bold text-white">
                {Math.round(progress)}%
              </span>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex space-x-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white/30 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
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



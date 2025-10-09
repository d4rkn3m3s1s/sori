import { motion } from 'framer-motion'
import { QrCode, Sparkles, Zap } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  showText?: boolean
  className?: string
}

function Logo({ 
  size = 'md', 
  animated = true, 
  showText = true, 
  className = '' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  }

  return (
    <motion.div
      className={`flex items-center space-x-3 ${className}`}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo Icon */}
      <motion.div
        className={`
          relative overflow-hidden
          bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500
          rounded-2xl
          ${sizeClasses[size]}
          flex items-center justify-center
          shadow-2xl shadow-purple-500/30
          before:absolute before:inset-0
          before:bg-gradient-to-br before:from-white/20 before:to-transparent
          before:opacity-50
        `}
        whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* QR Code Icon */}
        <motion.div
          initial={animated ? { scale: 0, rotate: -180 } : {}}
          animate={animated ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <QrCode className={`${iconSizeClasses[size]} text-white drop-shadow-lg`} />
        </motion.div>

        {/* Sparkle Effects */}
        {animated && (
          <>
            <motion.div
              className="absolute top-1 right-1"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: 0.5 
              }}
            >
              <Sparkles className="w-2 h-2 text-yellow-300" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-1 left-1"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                delay: 1 
              }}
            >
              <Zap className="w-1.5 h-1.5 text-cyan-300" />
            </motion.div>
          </>
        )}

        {/* Liquid Glass Shine Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 2,
              ease: "easeInOut" 
            }}
          />
        )}
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.h1
            className={`
              font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
              bg-clip-text text-transparent
              ${textSizeClasses[size]}
              drop-shadow-sm
            `}
            whileHover={animated ? { scale: 1.05 } : {}}
            transition={{ duration: 0.2 }}
          >
            QRATEX
          </motion.h1>
          
          <motion.p
            className="text-xs text-gray-500 dark:text-gray-400 font-medium"
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            AI Feedback Platform
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Logo



import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AdvancedBadgeEffectsProps {
  badgeId: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  isUnlocked: boolean
  children: React.ReactNode
}

function AdvancedBadgeEffects({ badgeId, rarity, isUnlocked, children }: AdvancedBadgeEffectsProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])

  // Özel rozet efektleri
  const getSpecialEffects = () => {
    switch (badgeId) {
      case 'dracarys':
        return {
          background: 'from-red-600 via-orange-500 to-yellow-400',
          particles: '🔥',
          animation: 'animate-pulse',
          glow: 'shadow-red-500/50'
        }
      case 'catalyst':
        return {
          background: 'from-purple-500 to-indigo-600',
          particles: '⚗️',
          animation: 'animate-bounce',
          glow: 'shadow-purple-500/50'
        }
      default:
        return null
    }
  }

  const specialEffect = getSpecialEffects()

  // Parçacık efekti oluştur
  const createParticles = () => {
    if (!isUnlocked || rarity === 'common') return

    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }))
    setParticles(newParticles)

    setTimeout(() => setParticles([]), 2000)
  }

  useEffect(() => {
    if (isHovered && isUnlocked) {
      createParticles()
    }
  }, [isHovered, isUnlocked])

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      {/* Özel arka plan efekti */}
      {specialEffect && isUnlocked && (
        <div className={`absolute inset-0 bg-gradient-to-br ${specialEffect.background} opacity-20 rounded-xl blur-sm ${specialEffect.animation}`} />
      )}

      {/* Parçacık efektleri */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-xs pointer-events-none"
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`, 
            opacity: 0, 
            scale: 0 
          }}
          animate={{ 
            y: `${particle.y - 50}%`, 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0] 
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {specialEffect?.particles || '✨'}
        </motion.div>
      ))}

      {/* Glow efekti */}
      {isHovered && isUnlocked && rarity !== 'common' && (
        <div className={`absolute inset-0 rounded-xl blur-xl ${specialEffect?.glow || 'shadow-blue-500/50'} shadow-2xl`} />
      )}

      {children}
    </motion.div>
  )
}

export default AdvancedBadgeEffects

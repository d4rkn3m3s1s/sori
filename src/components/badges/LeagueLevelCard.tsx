import { motion } from 'framer-motion'
import { Card, CardBody, Chip } from '@nextui-org/react'
import { Lock, Check, Star } from 'lucide-react'

interface BadgeLevel {
  level: number
  name: string
  icon: string
  requiredPoints: number
  color: string
  benefits: string[]
}

interface LeagueLevelCardProps {
  level: BadgeLevel
  currentPoints: number
  isCurrentLevel: boolean
  isUnlocked: boolean
}

function LeagueLevelCard({ level, currentPoints, isCurrentLevel, isUnlocked }: LeagueLevelCardProps) {
  const progress = isUnlocked 
    ? 100 
    : Math.min(100, (currentPoints / level.requiredPoints) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`
          relative overflow-hidden transition-all duration-300
          ${isCurrentLevel ? 'ring-4 ring-purple-500 shadow-2xl' : ''}
          ${!isUnlocked ? 'opacity-60' : ''}
        `}
      >
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${level.color} 0%, transparent 100%)`
          }}
        />

        <CardBody className="p-6 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{level.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {level.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Seviye {level.level}
                </p>
              </div>
            </div>
            
            {isCurrentLevel && (
              <Chip 
                color="success" 
                variant="flat"
                size="sm"
              >
                Aktif
              </Chip>
            )}
            
            {isUnlocked && !isCurrentLevel && (
              <Check className="w-6 h-6 text-green-500" />
            )}
            
            {!isUnlocked && (
              <Lock className="w-6 h-6 text-gray-400" />
            )}
          </div>

          {/* Required Points */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                Gereken Puan
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {level.requiredPoints.toLocaleString()}
              </span>
            </div>
            
            {/* Progress Bar */}
            {!isUnlocked && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: level.color }}
                />
              </div>
            )}
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                Ayrıcalıklar
              </h4>
            </div>
            <ul className="space-y-1">
              {level.benefits.map((benefit, index) => (
                <li 
                  key={index}
                  className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2"
                >
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Points to Unlock (if locked) */}
          {!isUnlocked && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Açmak için gereken puan
                </p>
                <p className="text-lg font-bold" style={{ color: level.color }}>
                  {(level.requiredPoints - currentPoints).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  )
}

export default LeagueLevelCard

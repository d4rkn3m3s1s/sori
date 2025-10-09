import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Progress, Tooltip } from '@nextui-org/react'
import { Badge } from '../../types/badge'
import { Lock, Crown, Star, Zap } from 'lucide-react'
import AdvancedBadgeEffects from './AdvancedBadgeEffects'

interface BadgeCardProps {
  badge: Badge
  progress?: number
  showProgress?: boolean
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  isNew?: boolean
}

function BadgeCard({ 
  badge, 
  progress, 
  showProgress = false, 
  size = 'md',
  onClick,
  isNew = false
}: BadgeCardProps) {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-40',
    lg: 'w-40 h-48'
  }

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  }

  const getRarityIcon = () => {
    switch (badge.rarity) {
      case 'legendary': return <Crown className="w-4 h-4 text-yellow-500" />
      case 'epic': return <Star className="w-4 h-4 text-purple-500" />
      case 'rare': return <Zap className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  const getRarityColor = () => {
    switch (badge.rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500'
      case 'epic': return 'from-purple-400 via-pink-500 to-red-500'
      case 'rare': return 'from-blue-400 via-purple-500 to-pink-500'
      case 'common': return 'from-gray-400 to-gray-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <AdvancedBadgeEffects 
      badgeId={badge.id}
      rarity={badge.rarity}
      isUnlocked={badge.unlocked}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`relative ${sizeClasses[size]} cursor-pointer`}
        onClick={onClick}
      >
      {/* New badge indicator */}
      {isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 z-20"
        >
          <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </motion.div>
      )}

      {/* Rarity glow effect */}
      {badge.unlocked && (
        <div className={`absolute inset-0 bg-gradient-to-r ${
          badge.id === 'dracarys' 
            ? 'from-red-500 via-orange-500 to-yellow-500' 
            : getRarityColor()
        } rounded-xl opacity-20 blur-sm`} />
      )}

      {/* Special DRACARYS fire effect */}
      {badge.id === 'dracarys' && badge.unlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 rounded-xl opacity-10 blur-lg animate-pulse" />
      )}

      <Card 
        className={`h-full relative overflow-hidden transition-all duration-300 ${
          badge.unlocked 
            ? `bg-gradient-to-br ${badge.gradient} shadow-lg hover:shadow-xl` 
            : 'bg-gray-100 dark:bg-gray-800 opacity-60'
        }`}
      >
        <CardBody className="p-3 flex flex-col items-center justify-center text-center relative">
          {/* Lock overlay for locked badges */}
          {!badge.unlocked && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
              <Lock className="w-6 h-6 text-gray-500" />
            </div>
          )}

          {/* Rarity indicator */}
          <div className="absolute top-1 right-1">
            {getRarityIcon()}
          </div>

          {/* Badge icon */}
          <div className={`${iconSizes[size]} mb-2 ${badge.unlocked ? '' : 'grayscale'} flex items-center justify-center`}>
            {badge.id === 'dracarys' && badge.unlocked ? (
              <div className="relative">
                <div className="text-4xl animate-pulse">🐉</div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-30 rounded-full blur-md"></div>
              </div>
            ) : (
              badge.icon
            )}
          </div>

          {/* Badge name */}
          <h4 className={`font-bold text-xs ${size === 'lg' ? 'text-sm' : ''} ${
            badge.unlocked ? 'text-white' : 'text-gray-500'
          } mb-1 line-clamp-2`}>
            {badge.name}
          </h4>

          {/* Points */}
          {badge.unlocked && (
            <Chip 
              size="sm" 
              className="bg-white/20 text-white text-xs"
            >
              {badge.points}p
            </Chip>
          )}

          {/* Progress bar for locked badges */}
          {!badge.unlocked && showProgress && progress !== undefined && (
            <div className="w-full mt-2">
              <Progress 
                value={progress} 
                size="sm"
                className="h-1"
                classNames={{
                  indicator: `bg-gradient-to-r ${badge.gradient}`
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Unlock date */}
          {badge.unlocked && badge.unlockedAt && size === 'lg' && (
            <p className="text-xs text-white/80 mt-1">
              {badge.unlockedAt.toLocaleDateString('tr-TR')}
            </p>
          )}
        </CardBody>
      </Card>

      {/* Tooltip with description */}
      <Tooltip
        content={
          <div className="p-2 max-w-xs">
            <p className="font-semibold text-sm">{badge.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {badge.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <Chip size="sm" color="primary" variant="flat">
                {badge.category}
              </Chip>
              <span className="text-xs font-medium">
                {badge.points} puan
              </span>
            </div>
            {badge.privileges && badge.privileges.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-semibold">Ayrıcalıklar:</p>
                {badge.privileges.map((privilege, index) => (
                  <p key={index} className="text-xs text-gray-600 dark:text-gray-400">
                    • {privilege.description}
                  </p>
                ))}
              </div>
            )}
          </div>
        }
        placement="top"
      >
        <div className="absolute inset-0" />
      </Tooltip>
      </motion.div>
    </AdvancedBadgeEffects>
  )
}

export default BadgeCard

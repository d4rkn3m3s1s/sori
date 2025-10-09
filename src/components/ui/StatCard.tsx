import { motion } from 'framer-motion'
import { Card, CardBody } from '@nextui-org/react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  gradient?: 'primary' | 'secondary' | 'tertiary' | 'success'
}

function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  gradient = 'primary' 
}: StatCardProps) {
  const gradientClasses = {
    primary: 'bg-gradient-to-br from-purple-500 to-pink-500',
    secondary: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    tertiary: 'bg-gradient-to-br from-orange-500 to-red-500',
    success: 'bg-gradient-to-br from-green-500 to-emerald-500'
  }

  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          relative overflow-hidden
          bg-white/10 dark:bg-black/10
          backdrop-blur-xl
          border border-white/20 dark:border-white/10
          shadow-2xl shadow-black/10 dark:shadow-black/30
          rounded-2xl
          transition-all duration-500 ease-out
          before:absolute before:inset-0
          before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-white/5
          before:opacity-0 hover:before:opacity-100
          before:transition-opacity before:duration-500
          after:absolute after:inset-0
          after:bg-gradient-to-tr after:from-transparent after:via-white/10 after:to-transparent
          after:opacity-0 hover:after:opacity-100
          after:transition-opacity after:duration-700
        "
      >
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
              {change && (
                <p className={`text-sm font-medium ${changeColors[changeType]}`}>
                  {changeType === 'positive' ? '+' : changeType === 'negative' ? '-' : ''}{change}
                </p>
              )}
            </div>
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
              className={`p-3 rounded-xl ${gradientClasses[gradient]} shadow-lg backdrop-blur-sm`}
            >
              <Icon className="w-6 h-6 text-white drop-shadow-sm" />
            </motion.div>
          </div>
        </div>
        
        {/* Liquid Glass Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}

export default StatCard

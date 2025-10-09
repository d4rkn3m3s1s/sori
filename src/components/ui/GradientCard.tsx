import { motion } from 'framer-motion'
import { Card, CardBody } from '@nextui-org/react'
import { ReactNode } from 'react'

interface GradientCardProps {
  children: ReactNode
  className?: string
  gradient?: 'primary' | 'secondary' | 'tertiary'
  hover?: boolean
}

function GradientCard({ 
  children, 
  className = '', 
  gradient = 'primary',
  hover = true 
}: GradientCardProps) {
  const gradientClasses = {
    primary: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200/20',
    secondary: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200/20',
    tertiary: 'bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200/20'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={className}
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
          {children}
        </div>
        
        {/* Liquid Glass Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}

export default GradientCard

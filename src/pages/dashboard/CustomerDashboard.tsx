import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button, Chip } from '@nextui-org/react'
import { useBadgeSystem } from '../../hooks/useBadgeSystem'
import { useToast } from '../../contexts/ToastContext'
import { useConfetti } from '../../hooks/useConfetti'
import { useEasterEggs } from '../../hooks/useEasterEggs'
import BadgeCard from '../../components/badges/BadgeCard'
import BadgeUnlockAnimation from '../../components/badges/BadgeUnlockAnimation'
import { ExportButton } from '../../components/ui/ExportButton'
import { exportDashboardData } from '../../utils/exportUtils'
import { PWAInstallButton, NetworkStatus } from '../../components/ui/PWAInstallButton'
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  QrCode, 
  Award, 
  Clock,
  CheckCircle,
  Plus,
  ExternalLink,
  Trophy,
  Zap,
  BarChart3,
  MessageCircle,
  Settings
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import StatCard from '../../components/ui/StatCard'
import GradientCard from '../../components/ui/GradientCard'

function CustomerDashboard() {
  const navigate = useNavigate()
  const { userBadges, userStats, notifications } = useBadgeSystem('current-user')
  const { showToast } = useToast()
  const { fireConfetti, fireworksConfetti, starConfetti, emojiConfetti } = useConfetti()
  const { handleTripleClick, triggerSecretBadge } = useEasterEggs()
  const [selectedBadge, setSelectedBadge] = useState<any>(null)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  
  const stats = [
    {
      title: 'Total Feedback',
      value: '47',
      change: 'No monthly goal',
      changeType: 'neutral' as const,
      icon: MessageSquare,
      gradient: 'primary' as const
    },
    {
      title: 'Response Rate',
      value: '89%',
      change: 'Excellent performance',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'success' as const
    },
    {
      title: 'Avg. Rating',
      value: '4.6',
      change: '',
      changeType: 'neutral' as const,
      icon: Star,
      gradient: 'tertiary' as const
    },
    {
      title: 'Active QR Codes',
      value: '3',
      change: 'Create New',
      changeType: 'neutral' as const,
      icon: QrCode,
      gradient: 'secondary' as const
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'Product Review Submitted',
      description: 'Customer Service',
      time: '2 hours ago',
      points: '+50 pts',
      status: 'completed',
      icon: MessageSquare,
      rating: 5
    },
    {
      id: 2,
      type: 'Customer Experience Survey',
      description: 'Delivery',
      time: '1 day ago',
      points: '+75 pts',
      status: 'completed',
      icon: BarChart3,
      rating: 4
    },
    {
      id: 3,
      type: 'Service Rating',
      description: 'Product Quality',
      time: '3 days ago',
      points: '+25 pts',
      status: 'completed',
      icon: Star,
      rating: 5
    },
    {
      id: 4,
      type: 'Feature Request',
      description: 'In-progress',
      time: '1 week ago',
      points: '',
      status: 'pending',
      icon: Settings,
      rating: null
    }
  ]

  const feedbackHistory = [
    {
      id: 1,
      title: 'Amazing customer service experience',
      category: 'Customer Service',
      date: 'Dec 15, 2024',
      rating: 5,
      status: 'reviewed',
      impact: 'high'
    },
    {
      id: 2,
      title: 'Product quality could be improved',
      category: 'Product Quality',
      date: 'Dec 14, 2024',
      rating: 3,
      status: 'in-progress',
      impact: 'medium'
    },
    {
      id: 3,
      title: 'Fast delivery and great packaging',
      category: 'Delivery',
      date: 'Dec 5, 2024',
      rating: 5,
      status: 'resolved',
      impact: 'high'
    }
  ]

  // Achievements data removed - using badge system instead

  const quickActions = [
    {
      title: 'Generate QR',
      description: 'Create feedback QR codes',
      icon: QrCode,
      action: 'Generate QR',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'New Feedback',
      description: 'Submit new feedback',
      icon: MessageSquare,
      action: 'New Feedback',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'View Reports',
      description: 'Analytics & insights',
      icon: BarChart3,
      action: 'View Reports',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Settings',
      description: 'Account preferences',
      icon: Settings,
      action: 'Settings',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  // Export data
  const exportData = {
    headers: ['Metric', 'Value', 'Description'],
    rows: [
      ['Total Feedback', '47', 'Total number of feedback submitted'],
      ['Response Rate', '89%', 'Percentage of responses received'],
      ['Average Rating', '4.2', 'Average rating given'],
      ['Active QR Codes', '12', 'Number of active QR codes'],
      ['Badge Count', userBadges.length.toString(), 'Total badges earned'],
      ['Total Points', userStats.totalPoints.toString(), 'Total points accumulated']
    ],
    filename: 'customer-dashboard-stats'
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Generate QR':
        emojiConfetti(['📱', '🔍', '✨'])
        navigate('/customer/scanner')
        showToast({
          type: 'info',
          title: 'QR Tarayıcı',
          message: 'QR kod tarayıcısına yönlendiriliyorsunuz'
        })
        break
      case 'New Feedback':
        starConfetti()
        navigate('/customer/feedback')
        showToast({
          type: 'success',
          title: 'Geri Bildirim',
          message: 'Geri bildirim sayfasına yönlendiriliyorsunuz'
        })
        break
      case 'View Reports':
        fireConfetti({ colors: ['#4ECDC4', '#45B7D1', '#96CEB4'] })
        navigate('/customer/analytics')
        showToast({
          type: 'info',
          title: 'Analitikler',
          message: 'Analitik sayfasına yönlendiriliyorsunuz'
        })
        break
      case 'Settings':
        emojiConfetti(['⚙️', '🔧', '🛠️'])
        navigate('/customer/settings')
        showToast({
          type: 'info',
          title: 'Ayarlar',
          message: 'Ayarlar sayfasına yönlendiriliyorsunuz'
        })
        break
      default:
        showToast({
          type: 'warning',
          title: 'Bilinmeyen İşlem',
          message: 'Bu işlem henüz desteklenmiyor'
        })
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Dashboard" 
          subtitle="Welcome back to QRATEX Customer Portal"
          userType="customer" 
        />
        
        {/* PWA Components */}
        <PWAInstallButton variant="banner" />
        <NetworkStatus />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GradientCard gradient="secondary" className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="relative w-16 h-16 cursor-pointer"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        triggerSecretBadge()
                        fireworksConfetti()
                      }}
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
                        <img 
                          src="https://api.dicebear.com/7.x/adventurer/svg?seed=girl-3d&backgroundColor=65c3f5&eyes=variant06&mouth=variant06&hair=variant23"
                          alt="Ahmet"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div 
                        className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        <span className="text-xs">👋</span>
                      </motion.div>
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Welcome back, Ahmet! 🌟
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your feedback journey continues
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">✨ Gold Member</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">10 day streak 🔥</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      2,840
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        endContent={<Plus className="w-4 h-4" />}
                        onClick={() => handleQuickAction('New Feedback')}
                      >
                        New Feedback
                      </Button>
                    </div>
                  </div>
                </div>
              </GradientCard>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="hover-float cursor-pointer"
                  onClick={() => {
                    fireConfetti({ particleCount: 30, spread: 45 })
                    showToast({
                      type: 'info',
                      title: `${stat.title} Clicked!`,
                      message: `Current value: ${stat.value} 📊`,
                      duration: 3000
                    })
                  }}
                >
                  <div className="hover:shadow-xl transition-shadow duration-300">
                    <StatCard {...stat} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Recent Activity
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your latest feedback interactions
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ExportButton
                          data={exportDashboardData.customerFeedback(recentActivity)}
                          filename="customer_activity_report"
                          size="sm"
                          showLabel={false}
                        />
                        <Button size="sm" variant="light" className="text-blue-600">
                          View All
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className={`p-3 rounded-lg ${
                            activity.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            <activity.icon className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {activity.type}
                              </p>
                              {activity.status === 'completed' && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {activity.rating && (
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${
                                      i < activity.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            )}
                            {activity.points && (
                              <Chip size="sm" className="bg-blue-100 text-blue-800">
                                {activity.points}
                              </Chip>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Quick Actions
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Frequently used features
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {quickActions.map((action, index) => (
                        <motion.div
                          key={action.title}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            scale: 1.05,
                            rotate: index % 2 === 0 ? 2 : -2,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="cursor-pointer hover-wiggle"
                          onClick={() => {
                            handleQuickAction(action.action)
                            handleTripleClick()
                          }}
                        >
                          <Card className="h-full hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-900">
                            <CardBody className="p-4 text-center relative overflow-hidden">
                              <motion.div 
                                className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 hover-pulse relative`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <action.icon className="w-6 h-6 text-white" />
                                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                              </motion.div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                {action.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                {action.description}
                              </p>
                              <Button
                                size="sm"
                                variant="bordered"
                                className="w-full text-xs hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300"
                                endContent={<ExternalLink className="w-3 h-3" />}
                              >
                                {action.action}
                              </Button>
                              
                              {/* Sparkle effect on hover */}
                              <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <span className="text-yellow-400 animate-pulse">✨</span>
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Feedback History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Feedback History
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your recent submissions
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="light" className="text-green-600">
                        View All
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {feedbackHistory.map((feedback, index) => (
                        <motion.div
                          key={feedback.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                              {feedback.title}
                            </h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Chip 
                                size="sm" 
                                className="bg-blue-100 text-blue-800"
                              >
                                {feedback.category}
                              </Chip>
                              <Chip 
                                size="sm" 
                                className={
                                  feedback.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                                  feedback.status === 'resolved' ? 'bg-purple-100 text-purple-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {feedback.status}
                              </Chip>
                              <Chip 
                                size="sm" 
                                className={
                                  feedback.impact === 'high' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }
                              >
                                {feedback.impact} impact
                              </Chip>
                            </div>
                            <span className="text-xs text-gray-500">
                              {feedback.date}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Badge Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Rozet Koleksiyonu
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Son kazandığın rozetler
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ExportButton
                          data={exportDashboardData.badges(userBadges)}
                          filename="badge_collection_report"
                          size="sm"
                          showLabel={false}
                        />
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          onClick={() => navigate('/customer/badges')}
                        >
                          Tümünü Gör
                        </Button>
                      </div>
                    </div>

                    {/* Badge Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{userStats?.totalBadges || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Toplam Rozet</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{userStats?.totalPoints || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Toplam Puan</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">#{userStats?.rank || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Sıralama</div>
                      </div>
                    </div>

                    {/* Recent Badges */}
                    <div className="grid grid-cols-4 gap-3">
                      {userBadges.filter(b => b.unlocked).slice(0, 4).map((badge, index) => (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <BadgeCard
                            badge={badge}
                            size="sm"
                            onClick={() => {
                              setSelectedBadge(badge)
                              setShowUnlockAnimation(true)
                            }}
                          />
                        </motion.div>
                      ))}
                      
                      {/* Show placeholder if not enough badges */}
                      {Array.from({ length: Math.max(0, 4 - userBadges.filter(b => b.unlocked).length) }).map((_, index) => (
                        <div key={`placeholder-${index}`} className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Rozet Kazan</span>
                        </div>
                      ))}
                    </div>

                    {/* Badge notifications */}
                    {notifications.length > 0 && (
                      <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-300">
                            🎉 {notifications[0].message}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Badge Unlock Animation */}
      <BadgeUnlockAnimation
        badge={selectedBadge}
        isVisible={showUnlockAnimation}
        onClose={() => {
          setShowUnlockAnimation(false)
          setSelectedBadge(null)
        }}
      />
    </div>
  )
}

export default CustomerDashboard

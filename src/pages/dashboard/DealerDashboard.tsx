import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button, Progress, Chip } from '@nextui-org/react'
import { 
  MessageSquare, 
  Users, 
  Star, 
  TrendingUp, 
  Brain, 
  BarChart3, 
  QrCode, 
  MessageCircle, 
  UserCheck, 
  Settings,
  Plus,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  Target,
  Zap
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import StatCard from '../../components/ui/StatCard'
import GradientCard from '../../components/ui/GradientCard'
import { ExportButton } from '../../components/ui/ExportButton'
import { exportDashboardData } from '../../utils/exportUtils'

function DealerDashboard() {
  const navigate = useNavigate()
  const stats = [
    {
      title: 'Total Feedback',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      gradient: 'primary' as const
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'secondary' as const
    },
    {
      title: 'Satisfaction Score',
      value: '4.8',
      change: 'Excellent',
      changeType: 'positive' as const,
      icon: Star,
      gradient: 'success' as const
    },
    {
      title: 'Response Rate',
      value: '89%',
      change: '+15%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'tertiary' as const
    }
  ]

  const aiInsights = [
    {
      type: 'trending',
      title: 'Trending Issues',
      description: 'Mobile app performance complaints increased by 23% this week',
      icon: AlertTriangle,
      color: 'warning'
    },
    {
      type: 'positive',
      title: 'Positive Trends',
      description: 'Customer support satisfaction up 15% after recent improvements',
      icon: TrendingUp,
      color: 'success'
    },
    {
      type: 'recommendation',
      title: 'Recommendations',
      description: 'Focus on mobile optimization to address performance concerns',
      icon: Brain,
      color: 'primary'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'Product Review Submitted',
      user: 'Customer',
      time: '2 hours ago',
      points: '+50 pts',
      status: 'completed',
      icon: MessageSquare
    },
    {
      id: 2,
      type: 'Customer Experience Survey',
      user: 'Sarah M.',
      time: '1 day ago',
      points: '+75 pts',
      status: 'completed',
      icon: UserCheck
    },
    {
      id: 3,
      type: 'Service Rating',
      user: 'John D.',
      time: '3 days ago',
      points: '+25 pts',
      status: 'completed',
      icon: Star
    },
    {
      id: 4,
      type: 'Feature Request',
      user: 'Admin',
      time: '1 week ago',
      points: '',
      status: 'pending',
      icon: Settings
    }
  ]

  const quickActions = [
    {
      title: 'QR Generator',
      description: 'Create feedback QR codes',
      icon: QrCode,
      action: 'Generate QR',
      gradient: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/dealer/qr-codes')
    },
    {
      title: 'Comments',
      description: 'Analytics & insights',
      icon: MessageCircle,
      action: 'View Reports',
      gradient: 'from-blue-500 to-cyan-500',
      onClick: () => navigate('/dealer/comments')
    },
    {
      title: 'User Management',
      description: 'Account preferences',
      icon: Users,
      action: 'Settings',
      gradient: 'from-green-500 to-emerald-500',
      onClick: () => navigate('/dealer/users')
    },
    {
      title: 'AI Chat',
      description: 'Submit new feedback',
      icon: Brain,
      action: 'AI Chat',
      gradient: 'from-orange-500 to-red-500',
      onClick: () => navigate('/dealer/ai-insights')
    }
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Dashboard" 
          subtitle="Welcome back to QRATEX Intelligence Platform"
          userType="dealer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GradientCard gradient="primary" className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👋</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Welcome back, Sarah!
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your feedback journey continues
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Gold Member</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">10 day streak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      2,840
                    </p>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mt-2"
                      endContent={<Plus className="w-4 h-4" />}
                    >
                      New Feedback
                    </Button>
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
                >
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* AI Insights */}
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
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            AI Insights
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Real-time intelligence from your feedback data
                          </p>
                        </div>
                      </div>
                      <Chip
                        size="sm"
                        className="bg-green-100 text-green-800"
                        startContent={<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                      >
                        Live
                      </Chip>
                    </div>

                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <motion.div
                          key={insight.type}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border-l-4 ${
                            insight.color === 'warning' ? 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20' :
                            insight.color === 'success' ? 'bg-green-50 border-green-400 dark:bg-green-900/20' :
                            'bg-blue-50 border-blue-400 dark:bg-blue-900/20'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${
                              insight.color === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                              insight.color === 'success' ? 'bg-green-100 text-green-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <insight.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                {insight.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {insight.description}
                              </p>
                            </div>
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
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Quick Actions
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Frequently used admin features
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
                          whileHover={{ scale: 1.05 }}
                          className="cursor-pointer"
                          onClick={action.onClick}
                        >
                          <Card className="h-full hover:shadow-lg transition-shadow">
                            <CardBody className="p-4 text-center">
                              <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                <action.icon className="w-6 h-6 text-white" />
                              </div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                                {action.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                {action.description}
                              </p>
                              <Button
                                size="sm"
                                variant="bordered"
                                className="w-full text-xs"
                                endContent={<ExternalLink className="w-3 h-3" />}
                              >
                                {action.action}
                              </Button>
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
              {/* Sentiment Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Sentiment Analysis
                      </h3>
                      <Button size="sm" variant="light" className="text-purple-600">
                        View All
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Positive</span>
                          <span className="text-sm font-bold text-green-600">68%</span>
                        </div>
                        <Progress 
                          value={68} 
                          className="h-2"
                          classNames={{
                            indicator: "bg-gradient-to-r from-green-400 to-green-600"
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Neutral</span>
                          <span className="text-sm font-bold text-yellow-600">22%</span>
                        </div>
                        <Progress 
                          value={22} 
                          className="h-2"
                          classNames={{
                            indicator: "bg-gradient-to-r from-yellow-400 to-yellow-600"
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Negative</span>
                          <span className="text-sm font-bold text-red-600">10%</span>
                        </div>
                        <Progress 
                          value={10} 
                          className="h-2"
                          classNames={{
                            indicator: "bg-gradient-to-r from-red-400 to-red-600"
                          }}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Activity
                      </h3>
                      <Button size="sm" variant="light" className="text-purple-600">
                        View All
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className={`p-2 rounded-lg ${
                            activity.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            <activity.icon className="w-4 h-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {activity.type}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {activity.points && (
                              <Chip size="sm" className="bg-purple-100 text-purple-800">
                                {activity.points}
                              </Chip>
                            )}
                            <div className={`w-2 h-2 rounded-full ${
                              activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DealerDashboard

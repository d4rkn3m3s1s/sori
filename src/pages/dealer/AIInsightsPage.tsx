import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip, Progress } from '@nextui-org/react'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Lightbulb,
  Target,
  Zap,
  BarChart3,
  MessageSquare,
  Users,
  RefreshCw,
  Download,
  Settings,
  Play,
  Pause
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import StatCard from '../../components/ui/StatCard'
import GradientCard from '../../components/ui/GradientCard'

function AIInsightsPage() {
  const stats = [
    {
      title: 'AI Predictions',
      value: '127',
      change: '+23%',
      changeType: 'positive' as const,
      icon: Brain,
      gradient: 'primary' as const
    },
    {
      title: 'Accuracy Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: Target,
      gradient: 'success' as const
    },
    {
      title: 'Insights Generated',
      value: '45',
      change: '+18%',
      changeType: 'positive' as const,
      icon: Lightbulb,
      gradient: 'secondary' as const
    },
    {
      title: 'Actions Taken',
      value: '32',
      change: '+12%',
      changeType: 'positive' as const,
      icon: CheckCircle,
      gradient: 'tertiary' as const
    }
  ]

  const aiInsights = [
    {
      id: 1,
      type: 'trend',
      priority: 'high',
      title: 'Mobile Performance Issues Trending',
      description: 'AI has detected a 23% increase in mobile app performance complaints over the past week. This trend is accelerating and requires immediate attention.',
      confidence: 94,
      impact: 'High',
      category: 'Performance',
      recommendations: [
        'Optimize mobile app loading times',
        'Review recent app updates for performance regressions',
        'Implement performance monitoring tools'
      ],
      status: 'active',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      type: 'positive',
      priority: 'medium',
      title: 'Customer Support Satisfaction Improving',
      description: 'Customer support satisfaction has increased by 15% following recent team training initiatives. The AI predicts continued improvement.',
      confidence: 87,
      impact: 'Medium',
      category: 'Support',
      recommendations: [
        'Continue current training programs',
        'Expand successful practices to other teams',
        'Monitor satisfaction metrics closely'
      ],
      status: 'monitoring',
      createdAt: '4 hours ago'
    },
    {
      id: 3,
      type: 'prediction',
      priority: 'medium',
      title: 'Seasonal Demand Forecast',
      description: 'AI predicts a 35% increase in feedback volume during the upcoming holiday season based on historical patterns and current trends.',
      confidence: 91,
      impact: 'Medium',
      category: 'Planning',
      recommendations: [
        'Scale customer support team',
        'Prepare additional QR codes',
        'Implement automated response systems'
      ],
      status: 'planning',
      createdAt: '6 hours ago'
    },
    {
      id: 4,
      type: 'anomaly',
      priority: 'low',
      title: 'Unusual Feedback Pattern Detected',
      description: 'An unusual spike in positive reviews for a specific product category has been detected. This may indicate a successful marketing campaign or product improvement.',
      confidence: 78,
      impact: 'Low',
      category: 'Product',
      recommendations: [
        'Investigate the cause of positive feedback',
        'Document successful practices',
        'Consider replicating for other products'
      ],
      status: 'investigating',
      createdAt: '1 day ago'
    }
  ]

  const aiModels = [
    {
      name: 'Sentiment Analysis',
      status: 'active',
      accuracy: 96.2,
      lastTrained: '2 days ago',
      predictions: 1247
    },
    {
      name: 'Trend Detection',
      status: 'active',
      accuracy: 89.7,
      lastTrained: '1 week ago',
      predictions: 89
    },
    {
      name: 'Anomaly Detection',
      status: 'training',
      accuracy: 92.1,
      lastTrained: '3 days ago',
      predictions: 156
    },
    {
      name: 'Predictive Analytics',
      status: 'active',
      accuracy: 87.4,
      lastTrained: '5 days ago',
      predictions: 234
    }
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return TrendingUp
      case 'positive': return CheckCircle
      case 'prediction': return Brain
      case 'anomaly': return AlertTriangle
      default: return Lightbulb
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend': return 'warning'
      case 'positive': return 'success'
      case 'prediction': return 'primary'
      case 'anomaly': return 'danger'
      default: return 'default'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="AI Insights" 
          subtitle="Artificial Intelligence powered feedback analysis"
          userType="dealer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* AI Engine Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GradientCard gradient="primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        AI Engine Status
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Processing 1,047 feedback items in real-time
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">High Performance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="bordered"
                      startContent={<Settings className="w-4 h-4" />}
                      className="border-white/20 text-gray-700 hover:bg-white/10"
                    >
                      Configure
                    </Button>
                    <Button
                      variant="bordered"
                      startContent={<RefreshCw className="w-4 h-4" />}
                      className="border-white/20 text-gray-700 hover:bg-white/10"
                    >
                      Retrain
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

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Lightbulb className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Latest AI Insights
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Real-time intelligence from your feedback data
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Chip
                          size="sm"
                          className="bg-green-100 text-green-800"
                          startContent={<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                        >
                          Live
                        </Chip>
                        <Button
                          size="sm"
                          variant="light"
                          startContent={<Download className="w-4 h-4" />}
                        >
                          Export
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {aiInsights.map((insight, index) => {
                        const IconComponent = getInsightIcon(insight.type)
                        return (
                          <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-lg ${
                                  insight.type === 'trend' ? 'bg-yellow-100 text-yellow-600' :
                                  insight.type === 'positive' ? 'bg-green-100 text-green-600' :
                                  insight.type === 'prediction' ? 'bg-blue-100 text-blue-600' :
                                  'bg-red-100 text-red-600'
                                }`}>
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                      {insight.title}
                                    </h4>
                                    <Chip 
                                      size="sm" 
                                      color={getPriorityColor(insight.priority)}
                                      variant="flat"
                                    >
                                      {insight.priority}
                                    </Chip>
                                    <Chip size="sm" className="bg-gray-100 text-gray-800">
                                      {insight.category}
                                    </Chip>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                                    {insight.description}
                                  </p>
                                  
                                  <div className="flex items-center space-x-6 mb-4">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-500">Confidence:</span>
                                      <div className="flex items-center space-x-2">
                                        <Progress 
                                          value={insight.confidence} 
                                          className="w-20 h-2"
                                          classNames={{
                                            indicator: "bg-gradient-to-r from-green-400 to-green-600"
                                          }}
                                        />
                                        <span className="text-sm font-medium text-green-600">
                                          {insight.confidence}%
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Impact: <span className="font-medium">{insight.impact}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {insight.createdAt}
                                    </div>
                                  </div>

                                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                                      AI Recommendations:
                                    </h5>
                                    <ul className="space-y-1">
                                      {insight.recommendations.map((rec, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                          <span>{rec}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <Chip 
                                size="sm" 
                                color={getInsightColor(insight.type)}
                                variant="dot"
                              >
                                {insight.status}
                              </Chip>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="light">
                                  View Details
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                >
                                  Take Action
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* AI Models Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          AI Models
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Model performance and status
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {aiModels.map((model, index) => (
                        <motion.div
                          key={model.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {model.name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <Chip 
                                size="sm" 
                                color={model.status === 'active' ? 'success' : 'warning'}
                                variant="flat"
                              >
                                {model.status}
                              </Chip>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-gray-500"
                              >
                                {model.status === 'active' ? 
                                  <Pause className="w-4 h-4" /> : 
                                  <Play className="w-4 h-4" />
                                }
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Accuracy
                                </span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {model.accuracy}%
                                </span>
                              </div>
                              <Progress 
                                value={model.accuracy} 
                                className="h-2"
                                classNames={{
                                  indicator: "bg-gradient-to-r from-green-400 to-green-600"
                                }}
                              />
                            </div>

                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Last trained: {model.lastTrained}
                              </span>
                              <span className="text-gray-900 dark:text-white font-medium">
                                {model.predictions} predictions
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        startContent={<Settings className="w-4 h-4" />}
                      >
                        Manage Models
                      </Button>
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

export default AIInsightsPage

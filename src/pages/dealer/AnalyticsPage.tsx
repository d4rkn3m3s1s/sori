import { motion } from 'framer-motion'
import { Card, CardBody, Button, Progress, Select, SelectItem } from '@nextui-org/react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Star,
  Calendar,
  Download,
  RefreshCw,
  Target,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import StatCard from '../../components/ui/StatCard'

function AnalyticsPage() {
  const stats = [
    {
      title: 'Total Feedback',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: BarChart3,
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
      change: '+0.3',
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

  const timeRanges = [
    { key: '7d', label: 'Son 7 Gün' },
    { key: '30d', label: 'Son 30 Gün' },
    { key: '90d', label: 'Son 3 Ay' },
    { key: '1y', label: 'Son 1 Yıl' }
  ]

  const categoryData = [
    { name: 'Customer Service', value: 35, color: 'bg-purple-500' },
    { name: 'Product Quality', value: 28, color: 'bg-blue-500' },
    { name: 'Delivery', value: 20, color: 'bg-green-500' },
    { name: 'Website', value: 12, color: 'bg-yellow-500' },
    { name: 'Support', value: 5, color: 'bg-red-500' }
  ]

  const monthlyData = [
    { month: 'Oca', feedback: 180, satisfaction: 4.2 },
    { month: 'Şub', feedback: 220, satisfaction: 4.3 },
    { month: 'Mar', feedback: 280, satisfaction: 4.5 },
    { month: 'Nis', feedback: 320, satisfaction: 4.4 },
    { month: 'May', feedback: 380, satisfaction: 4.6 },
    { month: 'Haz', feedback: 420, satisfaction: 4.7 },
    { month: 'Tem', feedback: 450, satisfaction: 4.8 },
    { month: 'Ağu', feedback: 480, satisfaction: 4.8 },
    { month: 'Eyl', feedback: 520, satisfaction: 4.9 },
    { month: 'Eki', feedback: 580, satisfaction: 4.8 },
    { month: 'Kas', feedback: 620, satisfaction: 4.9 },
    { month: 'Ara', feedback: 680, satisfaction: 4.8 }
  ]

  const topIssues = [
    { issue: 'Mobile app performance', count: 45, trend: '+23%', type: 'negative' },
    { issue: 'Delivery delays', count: 32, trend: '-15%', type: 'positive' },
    { issue: 'Payment issues', count: 28, trend: '+8%', type: 'negative' },
    { issue: 'Product availability', count: 24, trend: '-5%', type: 'positive' },
    { issue: 'Customer support response', count: 18, trend: '-12%', type: 'positive' }
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Analytics Dashboard" 
          subtitle="Comprehensive feedback analytics and insights"
          userType="dealer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <Select
                  placeholder="Zaman Aralığı"
                  className="max-w-xs"
                  variant="bordered"
                  defaultSelectedKeys={['30d']}
                  startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                >
                  {timeRanges.map((range) => (
                    <SelectItem key={range.key} value={range.key}>
                      {range.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="bordered"
                  startContent={<RefreshCw className="w-4 h-4" />}
                >
                  Yenile
                </Button>
                <Button
                  variant="bordered"
                  startContent={<Download className="w-4 h-4" />}
                >
                  Export
                </Button>
              </div>
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

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Feedback Trends */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <LineChart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Feedback Trends
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Monthly feedback volume and satisfaction
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Simulated Chart */}
                    <div className="space-y-4">
                      {monthlyData.slice(-6).map((data, index) => (
                        <div key={data.month} className="flex items-center space-x-4">
                          <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                            {data.month}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Feedback: {data.feedback}
                              </span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Rating: {data.satisfaction}
                              </span>
                            </div>
                            <Progress 
                              value={(data.feedback / 700) * 100} 
                              className="h-2"
                              classNames={{
                                indicator: "bg-gradient-to-r from-blue-400 to-blue-600"
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Category Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <PieChart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Category Distribution
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Feedback by category
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {categoryData.map((category, index) => (
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4"
                        >
                          <div className={`w-4 h-4 rounded-full ${category.color}`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {category.name}
                              </span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {category.value}%
                              </span>
                            </div>
                            <Progress 
                              value={category.value} 
                              className="h-2"
                              classNames={{
                                indicator: category.color.replace('bg-', 'bg-gradient-to-r from-') + ' to-opacity-80'
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Top Issues */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Top Issues
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Most reported problems
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {topIssues.map((issue, index) => (
                        <motion.div
                          key={issue.issue}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                              {issue.issue}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {issue.count} reports
                            </p>
                          </div>
                          <div className={`text-sm font-medium ${
                            issue.type === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {issue.trend}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Performance
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Key metrics
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Response Time
                          </span>
                          <span className="text-sm font-bold text-green-600">2.3h</span>
                        </div>
                        <Progress 
                          value={85} 
                          className="h-2"
                          classNames={{
                            indicator: "bg-gradient-to-r from-green-400 to-green-600"
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-1">Target: 2h</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Resolution Rate
                          </span>
                          <span className="text-sm font-bold text-blue-600">94%</span>
                        </div>
                        <Progress 
                          value={94} 
                          className="h-2"
                          classNames={{
                            indicator: "bg-gradient-to-r from-blue-400 to-blue-600"
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-1">Target: 90%</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Customer Satisfaction
                          </span>
                          <span className="text-sm font-bold text-purple-600">4.8/5</span>
                        </div>
                        <Progress 
                          value={96} 
                          className="h-2"
                          classNames={{
                            indicator: "bg-gradient-to-r from-purple-400 to-purple-600"
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-1">Target: 4.5/5</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Feedback Volume
                          </span>
                          <span className="text-sm font-bold text-orange-600">112%</span>
                        </div>
                        <Progress 
                          value={112} 
                          className="h-2"
                          classNames={{
                            indicator: "bg-gradient-to-r from-orange-400 to-orange-600"
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-1">vs. last month</p>
                      </div>
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

export default AnalyticsPage

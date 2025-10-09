import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip, Input, Select, SelectItem, Pagination } from '@nextui-org/react'
import { 
  MessageSquare, 
  Star, 
  Calendar, 
  Filter,
  Search,
  Download,
  Eye,
  MoreVertical,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import StatCard from '../../components/ui/StatCard'

function FeedbackPage() {
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
      title: 'Pending Review',
      value: '47',
      change: '+5%',
      changeType: 'positive' as const,
      icon: AlertTriangle,
      gradient: 'tertiary' as const
    },
    {
      title: 'Resolved',
      value: '2,756',
      change: '+8%',
      changeType: 'positive' as const,
      icon: CheckCircle,
      gradient: 'success' as const
    },
    {
      title: 'Avg. Rating',
      value: '4.8',
      change: 'Excellent',
      changeType: 'positive' as const,
      icon: Star,
      gradient: 'secondary' as const
    }
  ]

  const feedbackData = [
    {
      id: 1,
      customer: 'Ahmet Yılmaz',
      email: 'ahmet@email.com',
      rating: 5,
      category: 'Customer Service',
      message: 'Harika bir deneyim yaşadım. Personel çok yardımseverdi.',
      date: '2024-12-15',
      status: 'resolved',
      priority: 'high'
    },
    {
      id: 2,
      customer: 'Elif Kaya',
      email: 'elif@email.com',
      rating: 3,
      category: 'Product Quality',
      message: 'Ürün kalitesi beklediğim gibi değildi. İyileştirme gerekli.',
      date: '2024-12-14',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 3,
      customer: 'Mehmet Demir',
      email: 'mehmet@email.com',
      rating: 5,
      category: 'Delivery',
      message: 'Hızlı teslimat ve mükemmel paketleme. Teşekkürler!',
      date: '2024-12-13',
      status: 'resolved',
      priority: 'low'
    },
    {
      id: 4,
      customer: 'Zeynep Özkan',
      email: 'zeynep@email.com',
      rating: 4,
      category: 'Website',
      message: 'Web sitesi kullanımı kolay ama mobil versiyonu yavaş.',
      date: '2024-12-12',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 5,
      customer: 'Can Arslan',
      email: 'can@email.com',
      rating: 2,
      category: 'Support',
      message: 'Destek ekibine ulaşmakta zorlandım. Yanıt süresi çok uzun.',
      date: '2024-12-11',
      status: 'pending',
      priority: 'high'
    }
  ]

  const categories = [
    { key: 'all', label: 'Tüm Kategoriler' },
    { key: 'customer-service', label: 'Customer Service' },
    { key: 'product-quality', label: 'Product Quality' },
    { key: 'delivery', label: 'Delivery' },
    { key: 'website', label: 'Website' },
    { key: 'support', label: 'Support' }
  ]

  const statuses = [
    { key: 'all', label: 'Tüm Durumlar' },
    { key: 'pending', label: 'Beklemede' },
    { key: 'in-progress', label: 'İşlemde' },
    { key: 'resolved', label: 'Çözüldü' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'success'
      case 'in-progress': return 'warning'
      case 'pending': return 'danger'
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
          title="Feedback Management" 
          subtitle="Manage and analyze customer feedback"
          userType="dealer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
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

            {/* Filters and Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <Input
                        placeholder="Feedback ara..."
                        startContent={<Search className="w-4 h-4 text-gray-400" />}
                        className="max-w-xs"
                        variant="bordered"
                      />
                      
                      <Select
                        placeholder="Kategori"
                        className="max-w-xs"
                        variant="bordered"
                        startContent={<Filter className="w-4 h-4 text-gray-400" />}
                      >
                        {categories.map((category) => (
                          <SelectItem key={category.key} value={category.key}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        placeholder="Durum"
                        className="max-w-xs"
                        variant="bordered"
                      >
                        {statuses.map((status) => (
                          <SelectItem key={status.key} value={status.key}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="bordered"
                        startContent={<Download className="w-4 h-4" />}
                      >
                        Export
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        startContent={<TrendingUp className="w-4 h-4" />}
                      >
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Feedback List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardBody className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Müşteri
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Kategori
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Mesaj
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Durum
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Tarih
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            İşlemler
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {feedbackData.map((feedback, index) => (
                          <motion.tr
                            key={feedback.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {feedback.customer}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {feedback.email}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                                <span className="text-sm text-gray-600 ml-2">
                                  {feedback.rating}/5
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Chip size="sm" className="bg-blue-100 text-blue-800">
                                {feedback.category}
                              </Chip>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                {feedback.message}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Chip 
                                  size="sm" 
                                  color={getStatusColor(feedback.status)}
                                  variant="flat"
                                >
                                  {feedback.status === 'resolved' ? 'Çözüldü' :
                                   feedback.status === 'in-progress' ? 'İşlemde' : 'Beklemede'}
                                </Chip>
                                <Chip 
                                  size="sm" 
                                  color={getPriorityColor(feedback.priority)}
                                  variant="dot"
                                >
                                  {feedback.priority}
                                </Chip>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{feedback.date}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-gray-600 hover:text-gray-800"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Showing 1 to 5 of 2,847 results
                    </div>
                    <Pagination
                      total={570}
                      initialPage={1}
                      size="sm"
                      showControls
                      classNames={{
                        cursor: "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FeedbackPage

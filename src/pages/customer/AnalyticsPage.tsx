import { motion } from 'framer-motion'
import { Card, CardBody } from '@nextui-org/react'
import { BarChart3, TrendingUp, Star, MessageSquare, Calendar, Award } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

function AnalyticsPage() {
  const monthlyData = [
    { month: 'Ocak', feedbacks: 8, avgRating: 4.2 },
    { month: 'Şubat', feedbacks: 12, avgRating: 4.5 },
    { month: 'Mart', feedbacks: 15, avgRating: 4.1 },
    { month: 'Nisan', feedbacks: 10, avgRating: 4.7 },
    { month: 'Mayıs', feedbacks: 18, avgRating: 4.3 },
    { month: 'Haziran', feedbacks: 22, avgRating: 4.6 }
  ]

  const categoryStats = [
    { category: 'Hizmet Kalitesi', count: 25, percentage: 35 },
    { category: 'Ürün Kalitesi', count: 18, percentage: 25 },
    { category: 'Fiyat', count: 15, percentage: 21 },
    { category: 'Ortam', count: 10, percentage: 14 },
    { category: 'Diğer', count: 4, percentage: 5 }
  ]

  const topBusinesses = [
    { name: 'McDonald\'s Kadıköy', feedbacks: 12, avgRating: 4.5 },
    { name: 'Starbucks Bağdat Caddesi', feedbacks: 8, avgRating: 4.7 },
    { name: 'Nike Store Zorlu', feedbacks: 6, avgRating: 4.2 },
    { name: 'Burger King Levent', feedbacks: 5, avgRating: 4.0 },
    { name: 'KFC Ataşehir', feedbacks: 4, avgRating: 3.8 }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Analitik Verilerim
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Geri bildirim aktivitenizi ve etkilerinizi analiz edin
              </p>
            </motion.div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Bu Ay</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">22</p>
                        <p className="text-xs text-green-600 dark:text-green-400">+18% artış</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Ortalama Puan</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">4.6</p>
                        <p className="text-xs text-green-600 dark:text-green-400">+0.3 artış</p>
                      </div>
                      <Star className="w-8 h-8 text-yellow-500" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Etki Puanı</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                        <p className="text-xs text-green-600 dark:text-green-400">+156 artış</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Kazanılan Rozet</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                        <p className="text-xs text-green-600 dark:text-green-400">+3 yeni</p>
                      </div>
                      <Award className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Monthly Trend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Aylık Aktivite Trendi
                    </h2>
                    
                    <div className="space-y-4">
                      {monthlyData.map((data, index) => (
                        <div key={data.month} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {data.month}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {data.feedbacks} geri bildirim
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Ort: {data.avgRating} ⭐
                              </p>
                            </div>
                            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(data.feedbacks / 25) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Category Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Kategori Dağılımı
                    </h2>
                    
                    <div className="space-y-4">
                      {categoryStats.map((category, index) => (
                        <div key={category.category} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {category.category}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {category.count} ({category.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${category.percentage}%` }}
                              transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Top Businesses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    En Çok Geri Bildirim Verdiğim İşletmeler
                  </h2>
                  
                  <div className="space-y-4">
                    {topBusinesses.map((business, index) => (
                      <motion.div
                        key={business.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {business.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {business.feedbacks} geri bildirim
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {business.avgRating}
                          </span>
                        </div>
                      </motion.div>
                    ))}
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

export default AnalyticsPage

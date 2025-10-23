import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button, Chip, Tabs, Tab } from '@nextui-org/react'
import { 
  ArrowLeft, TrendingUp, DollarSign, Receipt, Calendar,
  PieChart, BarChart3, TrendingDown, Store, Tag, CreditCard,
  Award, Target, Clock, ShoppingBag
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

function ReceiptAnalyticsPage() {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('overview')

  // Mock analytics data
  const monthlyData = [
    { month: 'Oca', amount: 1250, receipts: 12, points: 1250 },
    { month: 'Şub', amount: 1580, receipts: 15, points: 1580 },
    { month: 'Mar', amount: 1320, receipts: 13, points: 1320 },
    { month: 'Nis', amount: 1890, receipts: 18, points: 1890 },
    { month: 'May', amount: 2100, receipts: 21, points: 2100 },
    { month: 'Haz', amount: 1950, receipts: 19, points: 1950 }
  ]

  const categoryData = [
    { category: 'Kahve', amount: 2450, percentage: 28, color: '#8b5cf6', receipts: 45 },
    { category: 'Market', amount: 3200, percentage: 37, color: '#3b82f6', receipts: 32 },
    { category: 'Elektronik', amount: 1500, percentage: 17, color: '#10b981', receipts: 8 },
    { category: 'Giyim', amount: 980, percentage: 11, color: '#f59e0b', receipts: 12 },
    { category: 'Fast Food', amount: 620, percentage: 7, color: '#ef4444', receipts: 18 }
  ]

  const topBusinesses = [
    { name: 'Starbucks', visits: 28, amount: 1890, points: 1890 },
    { name: 'Migros', visits: 22, amount: 2340, points: 2340 },
    { name: 'Zara', visits: 8, amount: 1200, points: 1200 },
    { name: 'Teknosa', visits: 5, amount: 980, points: 980 },
    { name: 'Burger King', visits: 15, amount: 720, points: 720 }
  ]

  const paymentMethods = [
    { method: 'Kredi Kartı', count: 85, percentage: 70 },
    { method: 'Nakit', count: 28, percentage: 23 },
    { method: 'Mobil Ödeme', count: 8, percentage: 7 }
  ]

  const stats = {
    totalSpent: 8750.50,
    totalReceipts: 121,
    totalPoints: 8750,
    avgReceiptValue: 72.31,
    thisMonthGrowth: 12.5,
    favoriteCategory: 'Market',
    mostVisited: 'Starbucks'
  }

  const maxMonthlyAmount = Math.max(...monthlyData.map(d => d.amount))

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📊 Fiş Analitiği" 
          subtitle="Harcama alışkanlıklarını analiz et"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="light"
                startContent={<ArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/customer/receipts')}
              >
                Fişlere Dön
              </Button>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-10 h-10 text-green-500" />
                      <Chip color="success" size="sm" variant="flat">
                        +{stats.thisMonthGrowth}%
                      </Chip>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Harcama</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₺{stats.totalSpent.toLocaleString()}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Receipt className="w-10 h-10 text-purple-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Fiş</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalReceipts}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Award className="w-10 h-10 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Puan</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalPoints.toLocaleString()}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="w-10 h-10 text-orange-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ort. Fiş Tutarı</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₺{stats.avgReceiptValue.toFixed(2)}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardBody className="p-6">
                  <Tabs 
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key as string)}
                    variant="underlined"
                    color="primary"
                  >
                    <Tab key="overview" title="Genel Bakış" />
                    <Tab key="categories" title="Kategoriler" />
                    <Tab key="businesses" title="İşletmeler" />
                    <Tab key="trends" title="Trendler" />
                  </Tabs>
                </CardBody>
              </Card>
            </motion.div>

            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <>
                {/* Monthly Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Aylık Harcama Trendi
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Son 6 aylık harcama detayları
                          </p>
                        </div>
                        <BarChart3 className="w-6 h-6 text-purple-500" />
                      </div>
                      
                      <div className="space-y-4">
                        {monthlyData.map((data, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-gray-900 dark:text-white">{data.month}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {data.receipts} fiş
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">
                                  ₺{data.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(data.amount / maxMonthlyAmount) * 100}%` }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Quick Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card>
                      <CardBody className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                          Hızlı İçgörüler
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <Tag className="w-5 h-5 text-purple-500" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">En Çok Harcama</p>
                              <p className="font-semibold text-gray-900 dark:text-white">{stats.favoriteCategory}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Store className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">En Çok Ziyaret</p>
                              <p className="font-semibold text-gray-900 dark:text-white">{stats.mostVisited}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Bu Ay Artış</p>
                              <p className="font-semibold text-green-600">+{stats.thisMonthGrowth}%</p>
                            </div>
                          </div>
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
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                          Ödeme Yöntemleri
                        </h3>
                        <div className="space-y-4">
                          {paymentMethods.map((method, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="w-4 h-4 text-gray-400" />
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {method.method}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-600 dark:text-gray-400">{method.count}</span>
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    %{method.percentage}
                                  </span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${method.percentage}%` }}
                                  transition={{ duration: 0.5, delay: index * 0.1 }}
                                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                </div>
              </>
            )}

            {/* Categories Tab */}
            {selectedTab === 'categories' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Kategori Bazlı Harcamalar
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Hangi kategorilerde ne kadar harcadın
                        </p>
                      </div>
                      <PieChart className="w-6 h-6 text-purple-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pie Chart Visual */}
                      <div className="flex items-center justify-center">
                        <div className="relative w-64 h-64">
                          <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            {categoryData.reduce((acc, cat, index) => {
                              const prevPercentage = categoryData.slice(0, index).reduce((sum, c) => sum + c.percentage, 0)
                              const offset = prevPercentage * 2.51327
                              acc.push(
                                <circle
                                  key={index}
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="none"
                                  stroke={cat.color}
                                  strokeWidth="20"
                                  strokeDasharray={`${cat.percentage * 2.51327} 251.327`}
                                  strokeDashoffset={-offset}
                                />
                              )
                              return acc
                            }, [] as JSX.Element[])}
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-3xl font-bold text-gray-900 dark:text-white">100%</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Category List */}
                      <div className="space-y-3">
                        {categoryData.map((cat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: cat.color }}
                                />
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {cat.category}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                %{cat.percentage}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                {cat.receipts} fiş
                              </span>
                              <span className="font-bold text-green-600">
                                ₺{cat.amount.toLocaleString()}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Businesses Tab */}
            {selectedTab === 'businesses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          En Çok Ziyaret Edilen İşletmeler
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Favori işletmelerin ve harcamalarını gör
                        </p>
                      </div>
                      <Store className="w-6 h-6 text-purple-500" />
                    </div>

                    <div className="space-y-4">
                      {topBusinesses.map((business, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-full font-bold text-lg">
                                #{index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                                  {business.name}
                                </h4>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                    <ShoppingBag className="w-3 h-3" />
                                    {business.visits} ziyaret
                                  </span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                    <Award className="w-3 h-3" />
                                    +{business.points} puan
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">
                                ₺{business.amount.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                toplam harcama
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Trends Tab */}
            {selectedTab === 'trends' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Harcama Trendleri ve Tahminler
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Gelecek ay için öngörüler ve öneriler
                        </p>
                      </div>
                      <TrendingUp className="w-6 h-6 text-purple-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="w-8 h-8 text-green-500" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Artış Eğilimi
                          </h4>
                        </div>
                        <p className="text-3xl font-bold text-green-600 mb-2">+{stats.thisMonthGrowth}%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Bu ay geçen aya göre %{stats.thisMonthGrowth} daha fazla harcama yaptın
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="w-8 h-8 text-blue-500" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Gelecek Ay Tahmini
                          </h4>
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mb-2">₺2,350</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Geçmiş verilerine göre tahmini harcama
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="w-8 h-8 text-purple-500" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Ortalama Alışveriş Aralığı
                          </h4>
                        </div>
                        <p className="text-3xl font-bold text-purple-600 mb-2">3.2 gün</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Her 3 günde bir alışveriş yapıyorsun
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Award className="w-8 h-8 text-orange-500" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Puan Kazanma Hızı
                          </h4>
                        </div>
                        <p className="text-3xl font-bold text-orange-600 mb-2">72.3 puan/gün</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Günlük ortalama puan kazancın
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ReceiptAnalyticsPage









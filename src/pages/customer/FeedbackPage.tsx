import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip } from '@nextui-org/react'
import { MessageSquare, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

function FeedbackPage() {
  const feedbackHistory = [
    {
      id: 1,
      business: 'McDonald\'s Kadıköy',
      date: '2024-01-15',
      rating: 4.5,
      comment: 'Hizmet çok hızlıydı, personel güler yüzlüydü.',
      status: 'responded',
      response: 'Geri bildiriminiz için teşekkürler! Müşteri memnuniyeti bizim için çok önemli.'
    },
    {
      id: 2,
      business: 'Starbucks Bağdat Caddesi',
      date: '2024-01-12',
      rating: 5,
      comment: 'Kahve mükemmeldi, ortam çok rahat.',
      status: 'responded',
      response: 'Harika bir deneyim yaşattığımız için mutluyuz!'
    },
    {
      id: 3,
      business: 'Nike Store Zorlu',
      date: '2024-01-10',
      rating: 3,
      comment: 'Ürün kalitesi iyi ama fiyatlar biraz yüksek.',
      status: 'pending',
      response: null
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded': return 'success'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'responded': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

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
                Geri Bildirimlerim
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Verdiğiniz geri bildirimleri ve işletme yanıtlarını görüntüleyin
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardBody className="p-4 md:p-5">
                    <div className="flex flex-col space-y-2">
                      <MessageSquare className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Toplam Geri Bildirim</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">47</p>
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
                  <CardBody className="p-4 md:p-5">
                    <div className="flex flex-col space-y-2">
                      <Star className="w-7 h-7 md:w-8 md:h-8 text-yellow-500" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Ortalama Puan</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">4.2</p>
                      </div>
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
                  <CardBody className="p-4 md:p-5">
                    <div className="flex flex-col space-y-2">
                      <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-green-500" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Yanıtlanan</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">32</p>
                      </div>
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
                  <CardBody className="p-4 md:p-5">
                    <div className="flex flex-col space-y-2">
                      <Clock className="w-7 h-7 md:w-8 md:h-8 text-orange-500" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Bekleyen</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">15</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Feedback History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Geri Bildirim Geçmişi
                  </h2>
                  
                  <div className="space-y-6">
                    {feedbackHistory.map((feedback, index) => (
                      <motion.div
                        key={feedback.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {feedback.business}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {feedback.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(feedback.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                                {feedback.rating}
                              </span>
                            </div>
                            <Chip
                              color={getStatusColor(feedback.status)}
                              variant="flat"
                              startContent={getStatusIcon(feedback.status)}
                            >
                              {feedback.status === 'responded' ? 'Yanıtlandı' : 'Bekliyor'}
                            </Chip>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {feedback.comment}
                        </p>
                        
                        {feedback.response && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                              İşletme Yanıtı:
                            </p>
                            <p className="text-blue-800 dark:text-blue-200">
                              {feedback.response}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Button variant="bordered">
                      Daha Fazla Yükle
                    </Button>
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

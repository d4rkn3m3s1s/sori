import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip } from '@nextui-org/react'
import { Bell, MessageSquare, Award, Star, CheckCircle, Clock } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'badge',
      title: 'Yeni Rozet Kazandınız!',
      message: '"Şakamatik" rozetini kazandınız. Eğlenceli yorumlarınız takdir edildi!',
      time: '2 saat önce',
      read: false,
      icon: Award,
      color: 'text-purple-500'
    },
    {
      id: 2,
      type: 'response',
      title: 'Geri Bildiriminize Yanıt Geldi',
      message: 'McDonald\'s Kadıköy şubesinden geri bildiriminize yanıt geldi.',
      time: '5 saat önce',
      read: false,
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Hedef Tamamlandı',
      message: 'Bu ay 20 geri bildirim hedefinizi tamamladınız!',
      time: '1 gün önce',
      read: true,
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      id: 4,
      type: 'system',
      title: 'Sistem Güncellemesi',
      message: 'Yeni özellikler eklendi. Rozet sistemi güncellendi.',
      time: '2 gün önce',
      read: true,
      icon: Bell,
      color: 'text-gray-500'
    }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Bildirimler
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Yeni rozetler, yanıtlar ve güncellemeler
              </p>
            </motion.div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <Button variant="flat" color="primary">
                  Tümü
                </Button>
                <Button variant="light">
                  Okunmamış (2)
                </Button>
                <Button variant="light">
                  Rozetler
                </Button>
                <Button variant="light">
                  Yanıtlar
                </Button>
              </div>
              <Button variant="light" size="sm">
                Tümünü Okundu İşaretle
              </Button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${!notification.read ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}>
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${notification.color}`}>
                          <notification.icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Chip size="sm" color="primary" variant="flat">
                                  Yeni
                                </Chip>
                              )}
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button size="sm" variant="flat" color="primary">
                                Okundu İşaretle
                              </Button>
                            )}
                            {notification.type === 'response' && (
                              <Button size="sm" variant="light">
                                Yanıtı Görüntüle
                              </Button>
                            )}
                            {notification.type === 'badge' && (
                              <Button size="sm" variant="light">
                                Rozeti Görüntüle
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="bordered">
                Daha Fazla Yükle
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default NotificationsPage

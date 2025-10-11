import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Chip, Tabs, Tab, Switch, Button, Divider, Input } from '@nextui-org/react'
import { Bell, BellOff, Check, CheckCheck, Trash2, Settings as SettingsIcon, Filter, Clock, Search, ArrowLeft, Trash } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { MOCK_NOTIFICATIONS, DEFAULT_NOTIFICATION_SETTINGS, Notification, NotificationSettings } from '../../data/notifications'
import { useNavigate } from 'react-router-dom'

function EnhancedNotificationsPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS)
  const [selectedTab, setSelectedTab] = useState('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const unreadCount = notifications.filter(n => !n.read).length

  // Mark as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  // Delete all notifications
  const deleteAllNotifications = () => {
    setNotifications([])
  }

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Tab filter
    if (selectedTab !== 'all') {
      if (selectedTab === 'unread' && notification.read) return false
      if (selectedTab !== 'unread' && notification.type !== selectedTab) return false
    }
    
    // Priority filter
    if (filterPriority !== 'all' && notification.priority !== filterPriority) return false
    
    return true
  })

  const getTypeLabel = (type: Notification['type']) => {
    const labels = {
      badge: 'Rozet',
      achievement: 'Başarı',
      level: 'Seviye',
      quest: 'Görev',
      reward: 'Ödül',
      social: 'Sosyal',
      event: 'Etkinlik',
      system: 'Sistem'
    }
    return labels[type]
  }

  const getPriorityColor = (priority: Notification['priority']) => {
    const colors = {
      low: 'default',
      medium: 'primary',
      high: 'warning',
      urgent: 'danger'
    }
    return colors[priority] as any
  }

  const getPriorityLabel = (priority: Notification['priority']) => {
    const labels = {
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek',
      urgent: 'Acil'
    }
    return labels[priority]
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return 'Az önce'
    if (minutes < 60) return `${minutes} dakika önce`
    if (hours < 24) return `${hours} saat önce`
    if (days === 1) return 'Dün'
    return `${days} gün önce`
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🔔 Bildirimler" 
          subtitle="Tüm bildirimlerini yönet"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="light"
                startContent={<ArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/customer/dashboard')}
              >
                Dashboard'a Dön
              </Button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Toplam</p>
                        <p className="text-4xl font-bold">{notifications.length}</p>
                        <p className="text-sm">Bildirim</p>
                      </div>
                      <Bell className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Okunmamış</p>
                        <p className="text-4xl font-bold">{unreadCount}</p>
                        <p className="text-sm">Bildirim</p>
                      </div>
                      <BellOff className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Acil</p>
                        <p className="text-4xl font-bold">
                          {notifications.filter(n => n.priority === 'urgent').length}
                        </p>
                        <p className="text-sm">Bildirim</p>
                      </div>
                      <Bell className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Bildirim</p>
                        <p className="text-4xl font-bold">{settings.enabled ? 'Açık' : 'Kapalı'}</p>
                        <p className="text-sm">Durum</p>
                      </div>
                      <SettingsIcon className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Search and Actions */}
            <Card>
              <CardBody className="p-4 space-y-4">
                {/* Search Bar */}
                <Input
                  placeholder="Bildirimlerde ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  isClearable
                  onClear={() => setSearchQuery('')}
                  size="lg"
                />

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      startContent={<CheckCheck className="w-4 h-4" />}
                      onPress={markAllAsRead}
                      isDisabled={unreadCount === 0}
                    >
                      Tümünü Okundu İşaretle
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      startContent={<Trash className="w-4 h-4" />}
                      onPress={deleteAllNotifications}
                      isDisabled={notifications.length === 0}
                    >
                      Tümünü Sil
                    </Button>
                  </div>
                  <Switch
                    isSelected={settings.enabled}
                    onValueChange={(value) => setSettings({ ...settings, enabled: value })}
                    startContent={<Bell className="w-4 h-4" />}
                    endContent={<BellOff className="w-4 h-4" />}
                  >
                    Bildirimler {settings.enabled ? 'Açık' : 'Kapalı'}
                  </Switch>
                </div>
              </CardBody>
            </Card>

            {/* Tabs */}
            <Card>
              <CardBody className="p-4">
                <Tabs
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(key as string)}
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "bg-gradient-to-r from-purple-500 to-pink-500"
                  }}
                >
                  <Tab key="all" title={`Tümü (${notifications.length})`} />
                  <Tab key="unread" title={`Okunmamış (${unreadCount})`} />
                  <Tab key="badge" title="Rozetler" />
                  <Tab key="achievement" title="Başarılar" />
                  <Tab key="quest" title="Görevler" />
                  <Tab key="social" title="Sosyal" />
                  <Tab key="event" title="Etkinlikler" />
                </Tabs>
              </CardBody>
            </Card>

            {/* Notifications List */}
            <div className="space-y-3">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`hover:shadow-lg transition-all cursor-pointer ${
                        !notification.read ? 'border-l-4 border-purple-500 bg-purple-50/50 dark:bg-purple-900/10' : ''
                      }`}
                      isPressable
                      onPress={() => {
                        if (!notification.read) markAsRead(notification.id)
                        if (notification.action) navigate(notification.action.path)
                      }}
                    >
                      <CardBody className="p-4">
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br ${notification.gradient} flex-shrink-0`}>
                            {notification.icon}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className={`font-semibold ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                {notification.title}
                              </h3>
                              <div className="flex items-center space-x-2 ml-2">
                                <Chip size="sm" color={getPriorityColor(notification.priority)} variant="flat">
                                  {getPriorityLabel(notification.priority)}
                                </Chip>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                                )}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{formatTimeAgo(notification.timestamp)}</span>
                                </span>
                                <Chip size="sm" variant="flat">
                                  {getTypeLabel(notification.type)}
                                </Chip>
                              </div>

                              <div className="flex items-center space-x-2">
                                {notification.action && (
                                  <Button
                                    size="sm"
                                    color="primary"
                                    variant="flat"
                                    onPress={() => navigate(notification.action!.path)}
                                  >
                                    {notification.action.label}
                                  </Button>
                                )}
                                {!notification.read && (
                                  <Button
                                    size="sm"
                                    isIconOnly
                                    variant="light"
                                    onPress={() => markAsRead(notification.id)}
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  isIconOnly
                                  variant="light"
                                  color="danger"
                                  onPress={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty State */}
              {filteredNotifications.length === 0 && (
                <Card>
                  <CardBody className="p-12 text-center">
                    <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                      Bildirim Yok
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500">
                      Bu filtrede gösterilecek bildirim bulunmuyor
                    </p>
                  </CardBody>
                </Card>
              )}
            </div>

            {/* Notification Settings */}
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ⚙️ Bildirim Ayarları
                </h3>
                
                <div className="space-y-4">
                  <Divider />
                  
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Bildirim Türleri
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(settings.types).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm capitalize">{getTypeLabel(key as Notification['type'])}</span>
                          <Switch
                            size="sm"
                            isSelected={value}
                            onValueChange={(val) => setSettings({
                              ...settings,
                              types: { ...settings.types, [key]: val }
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Bildirim Kanalları
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(settings.channels).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm capitalize">{key}</span>
                          <Switch
                            size="sm"
                            isSelected={value}
                            onValueChange={(val) => setSettings({
                              ...settings,
                              channels: { ...settings.channels, [key]: val }
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EnhancedNotificationsPage




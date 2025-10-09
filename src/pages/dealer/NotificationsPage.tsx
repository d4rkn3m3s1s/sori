import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardBody, 
  Button, 
  Input, 
  Chip,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { 
  Bell, 
  Search, 
  Settings, 
  Mail,
  Smartphone,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Mock notifications data
  const notifications = [
    {
      id: '1',
      title: 'New Customer Feedback',
      message: 'You received 5 new feedback comments',
      type: 'feedback',
      priority: 'high',
      timestamp: '2024-01-20 14:30',
      read: false,
      enabled: true
    },
    {
      id: '2',
      title: 'QR Code Performance Alert',
      message: 'QR code scan rate dropped by 20%',
      type: 'analytics',
      priority: 'medium',
      timestamp: '2024-01-20 12:15',
      read: false,
      enabled: true
    },
    {
      id: '3',
      title: 'Weekly Report Ready',
      message: 'Your weekly performance report is ready',
      type: 'report',
      priority: 'low',
      timestamp: '2024-01-19 09:00',
      read: true,
      enabled: true
    },
    {
      id: '4',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday 2AM',
      type: 'system',
      priority: 'medium',
      timestamp: '2024-01-18 16:45',
      read: true,
      enabled: false
    }
  ]

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feedback': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'analytics': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'report': return <Info className="w-5 h-5 text-blue-500" />
      case 'system': return <Settings className="w-5 h-5 text-purple-500" />
      default: return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const handleNotificationToggle = (notificationId: string) => {
    console.log('Toggle notification:', notificationId)
  }

  const markAsRead = (notificationId: string) => {
    console.log('Mark as read:', notificationId)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Notifications" 
          subtitle="Manage your notification preferences"
          userType="dealer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your notification preferences
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="bordered"
                  startContent={<Settings className="w-4 h-4" />}
                  onClick={onOpen}
                >
                  Settings
                </Button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Notifications</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
                    </div>
                    <Bell className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                      <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enabled</p>
                      <p className="text-2xl font-bold text-green-600">
                        {notifications.filter(n => n.enabled).length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                    </div>
                    <Info className="w-8 h-8 text-blue-500" />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                className="max-w-md"
              />
            </motion.div>

            {/* Notifications List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          {getTypeIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                              {notification.title}
                            </h3>
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={getPriorityColor(notification.priority) as any}
                            >
                              {notification.priority}
                            </Chip>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          size="sm"
                          isSelected={notification.enabled}
                          onValueChange={() => handleNotificationToggle(notification.id)}
                        />
                        
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="light"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Notification Settings Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>Notification Settings</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <span>Email Notifications</span>
                    </div>
                    <Switch defaultSelected />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-green-500" />
                      <span>Push Notifications</span>
                    </div>
                    <Switch defaultSelected />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-5 h-5 text-purple-500" />
                      <span>Sound Notifications</span>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Notification Frequency</h3>
                <div className="space-y-2">
                  <Button variant="bordered" className="w-full justify-start">
                    Real-time
                  </Button>
                  <Button variant="light" className="w-full justify-start">
                    Every 15 minutes
                  </Button>
                  <Button variant="light" className="w-full justify-start">
                    Hourly
                  </Button>
                  <Button variant="light" className="w-full justify-start">
                    Daily digest
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              Save Settings
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default NotificationsPage



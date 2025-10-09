import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardBody, 
  Button, 
  Input, 
  Switch,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { 
  Shield, 
  Key, 
  Smartphone, 
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Settings
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Mock security data
  const loginHistory = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Istanbul, Turkey',
      ip: '192.168.1.100',
      timestamp: '2024-01-20 14:30',
      status: 'Success'
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Ankara, Turkey',
      ip: '192.168.1.101',
      timestamp: '2024-01-19 09:15',
      status: 'Success'
    },
    {
      id: '3',
      device: 'Firefox on Mac',
      location: 'Izmir, Turkey',
      ip: '192.168.1.102',
      timestamp: '2024-01-18 16:45',
      status: 'Failed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'success'
      case 'Failed': return 'danger'
      case 'Blocked': return 'warning'
      default: return 'default'
    }
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    console.log('Password changed')
    onClose()
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Security Settings" 
          subtitle="Manage your account security and privacy"
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
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your account security and privacy
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Security Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-l-4 border-l-green-500">
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Account Security Status: Good
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your account is protected with strong security measures
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Password Security */}
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Key className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Password Security
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Last changed: 30 days ago
                      </span>
                      <Chip size="sm" color="success" variant="flat">
                        Strong
                      </Chip>
                    </div>
                    
                    <Button
                      color="primary"
                      variant="bordered"
                      onClick={onOpen}
                      className="w-full"
                    >
                      Change Password
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* Two-Factor Authentication */}
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Smartphone className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Two-Factor Authentication
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        2FA Status
                      </span>
                      <Switch defaultSelected />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        SMS Backup
                      </span>
                      <Switch />
                    </div>
                    
                    <Button
                      color="primary"
                      variant="bordered"
                      className="w-full"
                    >
                      Configure 2FA
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* Session Management */}
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Monitor className="w-6 h-6 text-purple-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Session Management
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Auto-logout after inactivity
                      </span>
                      <Switch defaultSelected />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Remember device for 30 days
                      </span>
                      <Switch />
                    </div>
                    
                    <Button
                      color="danger"
                      variant="bordered"
                      className="w-full"
                    >
                      End All Sessions
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <User className="w-6 h-6 text-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Privacy Settings
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Profile visibility
                      </span>
                      <Switch defaultSelected />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Data analytics
                      </span>
                      <Switch defaultSelected />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Marketing emails
                      </span>
                      <Switch />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Login History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Clock className="w-6 h-6 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Login Activity
                    </h3>
                  </div>
                  
                  <Table aria-label="Login history">
                    <TableHeader>
                      <TableColumn>DEVICE</TableColumn>
                      <TableColumn>LOCATION</TableColumn>
                      <TableColumn>IP ADDRESS</TableColumn>
                      <TableColumn>TIMESTAMP</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {loginHistory.map((login) => (
                        <TableRow key={login.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Monitor className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{login.device}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{login.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-mono">{login.ip}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-500">{login.timestamp}</span>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={getStatusColor(login.status) as any}
                            >
                              {login.status}
                            </Chip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Change Password Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onValueChange={setCurrentPassword}
                variant="bordered"
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onValueChange={setNewPassword}
                variant="bordered"
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                variant="bordered"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handlePasswordChange}>
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SecurityPage



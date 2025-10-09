import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardBody, 
  Button, 
  Input, 
  Switch,
  Textarea,
  Select,
  SelectItem,
  Divider
} from '@nextui-org/react'
import { 
  Settings, 
  User, 
  Building, 
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  Palette,
  Save,
  Upload
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

function SettingsPage() {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+90 555 123 4567',
    
    // Company Info
    companyName: 'Qratex Solutions',
    companyWebsite: 'https://qratex.com',
    companyAddress: 'Istanbul, Turkey',
    industry: 'Technology',
    
    // Preferences
    language: 'tr',
    timezone: 'Europe/Istanbul',
    dateFormat: 'DD/MM/YYYY',
    currency: 'TRY',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    
    // Display
    theme: 'system',
    compactMode: false,
    showTutorials: true
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    console.log('Saving settings:', formData)
    // Here you would typically save to backend
  }

  const languages = [
    { key: 'tr', label: 'Türkçe' },
    { key: 'en', label: 'English' },
    { key: 'de', label: 'Deutsch' },
    { key: 'fr', label: 'Français' }
  ]

  const timezones = [
    { key: 'Europe/Istanbul', label: 'Istanbul (GMT+3)' },
    { key: 'Europe/London', label: 'London (GMT+0)' },
    { key: 'America/New_York', label: 'New York (GMT-5)' },
    { key: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' }
  ]

  const industries = [
    { key: 'Technology', label: 'Technology' },
    { key: 'Retail', label: 'Retail' },
    { key: 'Food & Beverage', label: 'Food & Beverage' },
    { key: 'Healthcare', label: 'Healthcare' },
    { key: 'Education', label: 'Education' },
    { key: 'Other', label: 'Other' }
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Settings" 
          subtitle="Manage your account and application preferences"
          userType="dealer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your account and application preferences
                  </p>
                </div>
              </div>
              
              <Button
                color="primary"
                startContent={<Save className="w-4 h-4" />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </motion.div>

            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <User className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Personal Information
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={formData.firstName}
                      onValueChange={(value) => handleInputChange('firstName', value)}
                      variant="bordered"
                    />
                    <Input
                      label="Last Name"
                      value={formData.lastName}
                      onValueChange={(value) => handleInputChange('lastName', value)}
                      variant="bordered"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onValueChange={(value) => handleInputChange('email', value)}
                      variant="bordered"
                      startContent={<Mail className="w-4 h-4 text-gray-400" />}
                    />
                    <Input
                      label="Phone"
                      value={formData.phone}
                      onValueChange={(value) => handleInputChange('phone', value)}
                      variant="bordered"
                      startContent={<Phone className="w-4 h-4 text-gray-400" />}
                    />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Company Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Building className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Company Information
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Company Name"
                      value={formData.companyName}
                      onValueChange={(value) => handleInputChange('companyName', value)}
                      variant="bordered"
                    />
                    <Input
                      label="Website"
                      value={formData.companyWebsite}
                      onValueChange={(value) => handleInputChange('companyWebsite', value)}
                      variant="bordered"
                      startContent={<Globe className="w-4 h-4 text-gray-400" />}
                    />
                    <Input
                      label="Address"
                      value={formData.companyAddress}
                      onValueChange={(value) => handleInputChange('companyAddress', value)}
                      variant="bordered"
                      startContent={<MapPin className="w-4 h-4 text-gray-400" />}
                    />
                    <Select
                      label="Industry"
                      selectedKeys={[formData.industry]}
                      onSelectionChange={(keys) => handleInputChange('industry', Array.from(keys)[0])}
                      variant="bordered"
                    >
                      {industries.map((industry) => (
                        <SelectItem key={industry.key} value={industry.key}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Palette className="w-6 h-6 text-purple-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Preferences
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Language"
                      selectedKeys={[formData.language]}
                      onSelectionChange={(keys) => handleInputChange('language', Array.from(keys)[0])}
                      variant="bordered"
                    >
                      {languages.map((language) => (
                        <SelectItem key={language.key} value={language.key}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </Select>
                    
                    <Select
                      label="Timezone"
                      selectedKeys={[formData.timezone]}
                      onSelectionChange={(keys) => handleInputChange('timezone', Array.from(keys)[0])}
                      variant="bordered"
                    >
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone.key} value={timezone.key}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </Select>
                    
                    <Input
                      label="Date Format"
                      value={formData.dateFormat}
                      onValueChange={(value) => handleInputChange('dateFormat', value)}
                      variant="bordered"
                    />
                    
                    <Input
                      label="Currency"
                      value={formData.currency}
                      onValueChange={(value) => handleInputChange('currency', value)}
                      variant="bordered"
                    />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Bell className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        isSelected={formData.emailNotifications}
                        onValueChange={(value) => handleInputChange('emailNotifications', value)}
                      />
                    </div>
                    
                    <Divider />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive push notifications in browser
                        </p>
                      </div>
                      <Switch
                        isSelected={formData.pushNotifications}
                        onValueChange={(value) => handleInputChange('pushNotifications', value)}
                      />
                    </div>
                    
                    <Divider />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch
                        isSelected={formData.smsNotifications}
                        onValueChange={(value) => handleInputChange('smsNotifications', value)}
                      />
                    </div>
                    
                    <Divider />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Weekly Reports</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive weekly performance reports
                        </p>
                      </div>
                      <Switch
                        isSelected={formData.weeklyReports}
                        onValueChange={(value) => handleInputChange('weeklyReports', value)}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Display Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Palette className="w-6 h-6 text-pink-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Display Settings
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Compact Mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Use compact layout for better space utilization
                        </p>
                      </div>
                      <Switch
                        isSelected={formData.compactMode}
                        onValueChange={(value) => handleInputChange('compactMode', value)}
                      />
                    </div>
                    
                    <Divider />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Show Tutorials</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Display helpful tutorials and tips
                        </p>
                      </div>
                      <Switch
                        isSelected={formData.showTutorials}
                        onValueChange={(value) => handleInputChange('showTutorials', value)}
                      />
                    </div>
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

export default SettingsPage



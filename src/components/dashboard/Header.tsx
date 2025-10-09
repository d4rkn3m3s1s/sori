import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Input, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Badge,
  Avatar,
  Card,
  CardBody
} from '@nextui-org/react'
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Plus,
  Download,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'
import GlobalSearch from '../ui/GlobalSearch'

interface HeaderProps {
  title?: string
  subtitle?: string
  userType?: 'dealer' | 'customer'
}

function Header({ title = 'Dashboard', subtitle, userType = 'customer' }: HeaderProps) {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const notifications = [
    {
      id: 1,
      title: 'New positive review received',
      message: '2 minutes ago',
      type: 'success',
      unread: true
    },
    {
      id: 2,
      title: 'Support ticket escalated',
      message: '15 minutes ago',
      type: 'warning',
      unread: true
    },
    {
      id: 3,
      title: 'AI analysis completed',
      message: '1 hour ago',
      type: 'info',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (value.trim()) {
      setIsSearchOpen(true)
    }
  }

  const handleSearchFocus = () => {
    setIsSearchOpen(true)
  }

  const handleNewSurvey = () => {
    // Navigate to survey creation page
    console.log('Creating new survey...')
  }

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        relative overflow-hidden
        bg-white/10 dark:bg-black/10
        backdrop-blur-xl
        border-b border-white/20 dark:border-white/10
        shadow-lg shadow-black/5 dark:shadow-black/20
        px-3 sm:px-4 md:px-6 py-3 sm:py-4
        before:absolute before:inset-0
        before:bg-gradient-to-r before:from-white/5 before:to-transparent
        before:opacity-50
      "
    >
      <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section */}
        <div className="flex items-center space-x-2 sm:space-x-6 flex-1 min-w-0">
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center Section - Search (Hidden on mobile) */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 md:mx-8 hidden lg:block">
          <Input
            placeholder="Search... (Ctrl+K)"
            value={searchValue}
            onValueChange={handleSearch}
            onFocus={handleSearchFocus}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            variant="bordered"
            classNames={{
              input: "bg-transparent cursor-pointer",
              inputWrapper: "border-gray-200 hover:border-gray-300 focus-within:border-purple-500"
            }}
            readOnly
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          {/* Action Buttons (Hidden on mobile) */}
          {userType === 'dealer' && (
            <>
              <Button
                variant="bordered"
                startContent={<Plus className="w-4 h-4" />}
                className="border-purple-200 text-purple-600 hover:bg-purple-50 hidden md:flex"
                onClick={handleNewSurvey}
              >
                New Survey
              </Button>
              
              <Button
                variant="light"
                isIconOnly
                className="text-gray-500 hover:text-gray-700 hidden sm:flex"
              >
                <Download className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Liquid Glass Theme Toggle */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              isIconOnly
              variant="bordered"
              onClick={() => {
                const root = document.documentElement
                const hasDark = root.classList.contains('dark')
                if (hasDark) {
                  root.classList.remove('dark')
                  localStorage.setItem('qratex-theme', 'light')
                } else {
                  root.classList.add('dark')
                  localStorage.setItem('qratex-theme', 'dark')
                }
                console.log('Theme toggled:', hasDark ? 'light' : 'dark')
              }}
              className="
                relative overflow-hidden
                bg-white/10 dark:bg-black/10
                backdrop-blur-md
                border border-white/20 dark:border-white/10
                hover:bg-white/20 dark:hover:bg-black/20
                hover:border-white/30 dark:hover:border-white/20
                shadow-lg shadow-black/5 dark:shadow-black/20
                transition-all duration-300 ease-out
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-white/10 before:to-transparent
                before:opacity-0 hover:before:opacity-100
                before:transition-opacity before:duration-300
                after:absolute after:inset-0
                after:bg-gradient-to-br after:from-white/5 after:to-transparent
                after:opacity-0 hover:after:opacity-100
                after:transition-opacity after:duration-500
              "
            >
              <motion.div
                initial={false}
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Sun className="w-4 h-4 text-amber-400 dark:hidden drop-shadow-sm" />
                <Moon className="w-4 h-4 text-blue-300 hidden dark:block drop-shadow-sm" />
              </motion.div>
              
              {/* Liquid Glass Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </Button>
          </motion.div>

          {/* Help (Hidden on mobile) */}
          <Button
            variant="light"
            isIconOnly
            className="text-gray-500 hover:text-gray-700 hidden sm:flex"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <Button variant="light" isIconOnly className="relative hidden sm:flex">
            <Badge 
              content={unreadCount} 
              color="danger" 
              size="sm"
              isInvisible={unreadCount === 0}
            >
              <Bell className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </Badge>
          </Button>

          {/* User Menu */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="Profile">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">
                  {userType === 'dealer' ? 'sarah@company.com' : 'ahmet@email.com'}
                </p>
              </DropdownItem>
              
              <DropdownItem 
                key="settings" 
                startContent={<Settings className="w-4 h-4" />}
                textValue="Settings"
              >
                Settings
              </DropdownItem>
              
              <DropdownItem 
                key="profile-settings" 
                startContent={<User className="w-4 h-4" />}
                textValue="Profile"
              >
                Profile
              </DropdownItem>
              
              <DropdownItem 
                key="logout" 
                color="danger" 
                startContent={<LogOut className="w-4 h-4" />}
                textValue="Log Out"
                onClick={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      
      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </motion.header>
  )
}

export default Header

import { motion, AnimatePresence } from 'framer-motion'
import { Button, Avatar, Divider } from '@nextui-org/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart3, 
  Brain, 
  QrCode, 
  MessageCircle, 
  FileText, 
  Bell, 
  Shield, 
  Settings,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Award,
  Menu,
  X,
  Target,
  Palette,
  TrendingUp,
  Gift,
  Zap,
  Clock,
  Calendar,
  Heart,
  Gamepad2,
  Receipt,
  Crown
} from 'lucide-react'
import Logo from '../ui/Logo'
import { useState, useEffect } from 'react'

interface SidebarProps {
  userType: 'dealer' | 'customer'
}

function Sidebar({ userType }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const dealerMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dealer/dashboard' },
    { icon: MessageSquare, label: 'Feedback', path: '/dealer/feedback', count: 12 },
    { icon: BarChart3, label: 'Analytics', path: '/dealer/analytics' },
    { icon: Brain, label: 'AI Insights', path: '/dealer/ai-insights', badge: 'New' },
    { icon: Users, label: 'Users', path: '/dealer/users' },
    { icon: QrCode, label: 'QR Codes', path: '/dealer/qr-codes', count: 3 },
    { icon: MessageCircle, label: 'Comments', path: '/dealer/comments' },
    { icon: FileText, label: 'Surveys', path: '/dealer/surveys' },
    { icon: FileText, label: 'Reports', path: '/dealer/reports' },
    { icon: Bell, label: 'Notifications', path: '/dealer/notifications', count: 3 },
    { icon: Shield, label: 'Security', path: '/dealer/security' },
    { icon: Settings, label: 'Settings', path: '/dealer/settings' }
  ]

  const customerMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/customer/dashboard' },
    { icon: MessageSquare, label: 'My Feedback', path: '/customer/feedback' },
    { icon: Trophy, label: 'Rozetler', path: '/customer/badges', badge: 'New' },
    { icon: Award, label: 'Liderlik Tablosu', path: '/customer/leaderboard' },
    { icon: TrendingUp, label: 'Canlı Liderlik', path: '/customer/live-leaderboard', badge: 'Hot' },
    { icon: BarChart3, label: 'İstatistik Dashboard', path: '/customer/stats-dashboard', badge: 'New' },
    { icon: Crown, label: 'VIP Kulübü', path: '/customer/vip-club', badge: 'Premium' },
    { icon: Heart, label: 'Sosyal Sorumluluk', path: '/customer/donations', badge: 'Hot' },
    { icon: Gift, label: 'Ödül Havuzu', path: '/customer/reward-pool', badge: 'Hot' },
    { icon: Gift, label: 'Sürpriz Kutular', path: '/customer/surprise-gifts', badge: 'New' },
    { icon: Receipt, label: 'Fişlerim', path: '/customer/receipts', badge: 'New' },
    { icon: BarChart3, label: 'Analytics', path: '/customer/analytics' },
    { icon: TrendingUp, label: 'Gelişmiş Analitik', path: '/customer/enhanced-analytics', badge: 'New' },
    { icon: Target, label: 'Hedeflerim', path: '/customer/goals', badge: 'New' },
    { icon: Palette, label: 'Profil Özelleştir', path: '/customer/profile-customize', badge: 'New' },
    { icon: Trophy, label: 'Başarılar', path: '/customer/achievements', badge: 'New' },
    { icon: Gift, label: 'Ödül Dükkanı', path: '/customer/reward-store', badge: 'New' },
    { icon: Zap, label: 'Günlük Görevler', path: '/customer/quests', badge: 'New' },
    { icon: Clock, label: 'Etkinlik Geçmişi', path: '/customer/activity-log', badge: 'New' },
    { icon: Bell, label: 'Gelişmiş Bildirimler', path: '/customer/enhanced-notifications', badge: 'New' },
    { icon: TrendingUp, label: 'Trend Analizi', path: '/customer/trends', badge: 'New' },
    { icon: Calendar, label: 'Etkinlikler', path: '/customer/events', badge: 'New' },
    { icon: Heart, label: 'İşletme Takibi', path: '/customer/business-tracking', badge: 'New' },
    { icon: Gamepad2, label: 'Mini Oyunlar', path: '/customer/mini-games', badge: 'New' },
    { icon: QrCode, label: 'QR Scanner', path: '/customer/scanner' },
    { icon: Settings, label: 'Settings', path: '/customer/settings' }
  ]

  const menuItems = userType === 'dealer' ? dealerMenuItems : customerMenuItems

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-900 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
          )}
        </motion.button>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: isMobile ? -250 : 0 }}
        animate={{
          x: isMobile && !isMobileMenuOpen ? -250 : 0
        }}
        className={`
          ${isCollapsed && !isMobile ? 'w-20' : 'w-64'} h-screen 
          fixed lg:relative z-40
          ${isMobile ? 'left-0 top-0' : ''}
          relative overflow-hidden
          bg-white/10 dark:bg-black/10
          backdrop-blur-xl
          border-r border-white/20 dark:border-white/10
          shadow-2xl shadow-black/10 dark:shadow-black/30
          flex flex-col transition-all duration-300
          before:absolute before:inset-0
          before:bg-gradient-to-b before:from-white/5 before:to-transparent
          before:opacity-50
        `}
      >
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/20 dark:border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <Logo size="sm" animated={false} showText={true} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userType === 'dealer' ? 'Admin Panel' : 'Customer Portal'}
                </p>
              </div>
            </div>
          )}
          
          {!isMobile && (
            <Button
              isIconOnly
              variant="light"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="w-12 h-12"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {userType === 'dealer' ? 'Sarah Johnson' : 'Ahmet Yılmaz'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {userType === 'dealer' ? 'Admin' : 'Gold Member'}
              </p>
            </div>
          </div>
          
          {userType === 'dealer' && (
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Points</span>
                <span className="text-lg font-bold text-purple-600">2,840</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant={isActive ? "flat" : "light"}
                className={`w-full justify-start h-12 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                } ${isCollapsed ? 'px-3' : 'px-4'}`}
                startContent={
                  <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} ${isActive ? 'text-purple-600' : ''}`} />
                }
                onClick={() => handleNavigation(item.path)}
              >
                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                          item.badge === 'Hot'
                            ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white animate-pulse'
                            : item.badge === 'Premium'
                            ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-white animate-pulse shadow-lg'
                            : item.badge === 'New'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Button>
            </motion.div>
          )
        })}
      </nav>

      {/* AI Engine Status (for dealer) */}
      {userType === 'dealer' && !isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">AI Engine</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Processing 1,047 feedback items
            </p>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="light"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          startContent={<LogOut className="w-4 h-4" />}
          onClick={handleLogout}
        >
          {!isCollapsed && <span className="text-sm font-medium">Çıkış Yap</span>}
        </Button>
      </div>
    </motion.div>
    </>
  )
}

export default Sidebar

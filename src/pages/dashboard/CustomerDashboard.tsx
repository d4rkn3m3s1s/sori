import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button, Chip, Progress } from '@nextui-org/react'
import { useBadgeSystem } from '../../hooks/useBadgeSystem'
import { useToast } from '../../contexts/ToastContext'
import { useConfetti } from '../../hooks/useConfetti'
import { useEasterEggs } from '../../hooks/useEasterEggs'
import BadgeCard from '../../components/badges/BadgeCard'
import BadgeUnlockAnimation from '../../components/badges/BadgeUnlockAnimation'
import { ExportButton } from '../../components/ui/ExportButton'
import { exportDashboardData } from '../../utils/exportUtils'
import { PWAInstallButton, NetworkStatus } from '../../components/ui/PWAInstallButton'
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  QrCode, 
  Award, 
  Clock,
  CheckCircle,
  Plus,
  ExternalLink,
  Trophy,
  Zap,
  BarChart3,
  MessageCircle,
  Settings,
  Flame,
  Target,
  TrendingDown,
  Gift,
  Coins,
  Crown,
  MapPin,
  Heart,
  ArrowUpRight,
  Bell,
  ThumbsUp,
  Users,
  Sparkles,
  Package,
  Percent,
  TreePine,
  Gamepad2,
  ShoppingCart,
  CheckCircle2,
  Hash,
  Calendar as CalendarIcon,
  CloudSun,
  Wind,
  Droplets,
  Gift as GiftIcon,
  Zap as ZapIcon,
  TrendingUp as TrendingUpIcon
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import StatCard from '../../components/ui/StatCard'
import GradientCard from '../../components/ui/GradientCard'
import DailyRewardsWheel from '../../components/dashboard/DailyRewardsWheel'
import LiveChallenges from '../../components/dashboard/LiveChallenges'
import SocialActivityFeed from '../../components/dashboard/SocialActivityFeed'

function CustomerDashboard() {
  const navigate = useNavigate()
  const { userBadges, userStats, notifications } = useBadgeSystem('current-user')
  const { showToast } = useToast()
  const { fireConfetti, fireworksConfetti, starConfetti, emojiConfetti } = useConfetti()
  const { handleTripleClick, triggerSecretBadge } = useEasterEggs()
  const [selectedBadge, setSelectedBadge] = useState<any>(null)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  
  // ⏰ Gerçek Zamanlı Saat State
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // 🎁 Hediye Kutusu State
  const [showGiftBox, setShowGiftBox] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  
  // 🔔 Canlı Bildirim Ticker State
  const [tickerIndex, setTickerIndex] = useState(0)
  
  // Saat güncelleme
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  // Ticker animasyonu
  useEffect(() => {
    const ticker = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveNotifications.length)
    }, 4000)
    return () => clearInterval(ticker)
  }, [])

  // 🎯 Zamana Göre Dinamik Selamlama
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: 'Günaydın', emoji: '☀️', color: 'from-yellow-400 to-orange-500' }
    if (hour < 18) return { text: 'İyi Günler', emoji: '🌤️', color: 'from-blue-400 to-cyan-500' }
    return { text: 'İyi Akşamlar', emoji: '🌙', color: 'from-purple-400 to-pink-500' }
  }

  // 💭 Motivasyon Mesajları
  const motivationalQuotes = [
    "Her geri bildirim, bir değişim fırsatıdır! 🌟",
    "Yorumların dünyayı daha iyi yapıyor! 💪",
    "Bugün harika bir gün, yeni hedeflere ulaşma zamanı! 🎯",
    "Sen harikasın! Devam et! 🚀",
    "Başarı, küçük adımların toplamıdır. 🏆"
  ]
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  const greeting = getGreeting()
  
  // 📊 Genişletilmiş İstatistikler
  const currentStreak = 15 // Ardışık gün sayısı
  const weeklyProgress = 72 // Haftalık hedef tamamlama %
  const totalPoints = 25840
  const leaderboardRank = 12
  const topCategory = "Alışveriş"
  const weekComparison = 18 // % artış
  const giftPoints = 5420
  const socialContribution = 3200
  
  // 📈 Güncellenmiş Stat Kartları
  const stats = [
    {
      title: '🔥 Streak',
      value: `${currentStreak} Gün`,
      change: `+${weekComparison}% bu hafta`,
      changeType: 'positive' as const,
      icon: Flame,
      gradient: 'from-orange-400 to-red-500' as const,
      onClick: () => navigate('/customer/activity-log')
    },
    {
      title: '🎯 Haftalık Hedef',
      value: `${weeklyProgress}%`,
      change: 'Harika gidiyorsun!',
      changeType: 'positive' as const,
      icon: Target,
      gradient: 'from-green-400 to-emerald-500' as const,
      onClick: () => navigate('/customer/goals')
    },
    {
      title: '💰 Toplam Puan',
      value: totalPoints.toLocaleString(),
      change: `+${weekComparison}% bu hafta`,
      changeType: 'positive' as const,
      icon: Coins,
      gradient: 'from-yellow-400 to-orange-500' as const,
      onClick: () => navigate('/customer/stats-dashboard')
    },
    {
      title: '🏆 Sıralaman',
      value: `#${leaderboardRank}`,
      change: '2 sıra yükseldin!',
      changeType: 'positive' as const,
      icon: Trophy,
      gradient: 'from-purple-400 to-pink-500' as const,
      onClick: () => navigate('/customer/live-leaderboard')
    },
    {
      title: '⭐ En İyi Kategori',
      value: topCategory,
      change: `${weekComparison}% aktiflik`,
      changeType: 'positive' as const,
      icon: Star,
      gradient: 'from-blue-400 to-cyan-500' as const,
      onClick: () => navigate('/customer/analytics')
    },
    {
      title: '🎁 Hediye Puanı',
      value: giftPoints.toLocaleString(),
      change: 'Harcamaya hazır',
      changeType: 'neutral' as const,
      icon: Gift,
      gradient: 'from-pink-400 to-rose-500' as const,
      onClick: () => navigate('/customer/reward-store')
    },
    {
      title: '🌱 Sosyal Katkı',
      value: `${socialContribution} TL`,
      change: 'İyilik yapıyorsun!',
      changeType: 'positive' as const,
      icon: Heart,
      gradient: 'from-green-500 to-teal-500' as const,
      onClick: () => navigate('/customer/donations')
    },
    {
      title: '📊 Bu Hafta',
      value: '3,740 puan',
      change: `↑ ${weekComparison}%`,
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'from-indigo-400 to-purple-500' as const,
      onClick: () => navigate('/customer/stats-dashboard')
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'Product Review Submitted',
      description: 'Customer Service',
      time: '2 hours ago',
      points: '+50 pts',
      status: 'completed',
      icon: MessageSquare,
      rating: 5
    },
    {
      id: 2,
      type: 'Customer Experience Survey',
      description: 'Delivery',
      time: '1 day ago',
      points: '+75 pts',
      status: 'completed',
      icon: BarChart3,
      rating: 4
    },
    {
      id: 3,
      type: 'Service Rating',
      description: 'Product Quality',
      time: '3 days ago',
      points: '+25 pts',
      status: 'completed',
      icon: Star,
      rating: 5
    },
    {
      id: 4,
      type: 'Feature Request',
      description: 'In-progress',
      time: '1 week ago',
      points: '',
      status: 'pending',
      icon: Settings,
      rating: null
    }
  ]

  const feedbackHistory = [
    {
      id: 1,
      title: 'Amazing customer service experience',
      category: 'Customer Service',
      date: 'Dec 15, 2024',
      rating: 5,
      status: 'reviewed',
      impact: 'high'
    },
    {
      id: 2,
      title: 'Product quality could be improved',
      category: 'Product Quality',
      date: 'Dec 14, 2024',
      rating: 3,
      status: 'in-progress',
      impact: 'medium'
    },
    {
      id: 3,
      title: 'Fast delivery and great packaging',
      category: 'Delivery',
      date: 'Dec 5, 2024',
      rating: 5,
      status: 'resolved',
      impact: 'high'
    }
  ]

  // 📅 Günlük Görev Özeti
  const dailyQuests = [
    { id: 1, title: 'Bir işletmeye yorum yap', completed: true, reward: 100, icon: '💬' },
    { id: 2, title: '3 QR kod tara', completed: true, reward: 75, icon: '📱' },
    { id: 3, title: '50 puan kazan', completed: false, reward: 75, icon: '💰' }
  ]
  const completedQuests = dailyQuests.filter(q => q.completed).length
  const totalQuests = dailyQuests.length
  const questProgress = (completedQuests / totalQuests) * 100
  const potentialEarnings = dailyQuests.reduce((sum, q) => sum + q.reward, 0)
  const earnedToday = dailyQuests.filter(q => q.completed).reduce((sum, q) => sum + q.reward, 0)

  // 🎁 Günün Fırsatları
  const dailyDeals = [
    { id: 1, title: 'Mini Oyun Bonusu', description: '2x puan kazanma şansı', timeLeft: '8 saat', icon: Gamepad2, color: 'from-purple-500 to-pink-500' },
    { id: 2, title: 'Ödül Dükkanı İndirimi', description: '%30 indirim', timeLeft: 'Bu akşama kadar', icon: Percent, color: 'from-orange-500 to-red-500' },
    { id: 3, title: 'Fidan Bağışı Bonusu', description: 'Extra 50 puan', timeLeft: 'Bugün', icon: TreePine, color: 'from-green-500 to-emerald-500' }
  ]

  // 📰 Son Bildirimler
  const recentNotifications = [
    { id: 1, text: '"Usta Yorumcu" rozeti kazandın!', icon: '🏆', time: '2 dk önce', type: 'achievement' },
    { id: 2, text: 'Ali yorumunu beğendi', icon: '❤️', time: '15 dk önce', type: 'social' },
    { id: 3, text: 'Haftalık hedefe ulaştın', icon: '🎯', time: '1 saat önce', type: 'goal' }
  ]

  // 🗺️ Yakındaki İşletmeler
  const nearbyBusinesses = [
    { id: 1, name: 'Starbucks', distance: '200m', points: 50, icon: '☕' },
    { id: 2, name: "McDonald's", distance: '450m', points: 75, icon: '🍔' },
    { id: 3, name: 'Migros', distance: '800m', points: 100, icon: '🛒' }
  ]

  // 🎨 Profil Tamamlama
  const profileCompletion = {
    percentage: 75,
    completed: [
      { text: 'Avatar yüklendi', icon: CheckCircle2 },
      { text: 'Bio eklendi', icon: CheckCircle2 },
      { text: 'İlgi alanları seçildi', icon: CheckCircle2 }
    ],
    pending: [
      { text: 'Telefon doğrulanmadı', icon: Clock },
      { text: 'Sosyal medya bağlantısı yok', icon: Clock }
    ],
    reward: 500
  }

  // 📊 Haftalık Aktivite Grafiği
  const weeklyActivity = [
    { day: 'Pzt', points: 420 },
    { day: 'Sal', points: 580 },
    { day: 'Çar', points: 490 },
    { day: 'Per', points: 720 },
    { day: 'Cum', points: 640 },
    { day: 'Cmt', points: 380 },
    { day: 'Paz', points: 510 }
  ]
  const weekTotal = weeklyActivity.reduce((sum, d) => sum + d.points, 0)
  const maxActivity = Math.max(...weeklyActivity.map(d => d.points))
  const mostActiveDay = weeklyActivity.find(d => d.points === maxActivity)

  // 🎯 Yakın Başarımlar
  const nearAchievements = [
    { id: 1, title: 'Ateşli Yorumcu', current: 45, target: 50, emoji: '🔥', reward: '200 puan' },
    { id: 2, title: 'Süper Star', current: 8, target: 10, emoji: '🌟', reward: '150 puan' },
    { id: 3, title: 'Zengin Koleksiyoncu', current: 15000, target: 20000, emoji: '💰', reward: 'Özel Rozet' }
  ]

  // 🏅 Son Kazanılan Rozetler
  const recentBadges = [
    { id: 1, name: 'DRACARYS', emoji: '🐉', time: '2 saat önce' },
    { id: 2, name: 'Usta Yorumcu', emoji: '👑', time: 'dün' },
    { id: 3, name: 'Hızlı Atıcı', emoji: '🔥', time: '3 gün önce' }
  ]

  // 👥 Topluluk Aktivitesi
  const communityActivity = {
    popularComments: [
      { text: 'Harika hizmet!', author: 'Ayşe K.', likes: 125 }
    ],
    todaysStar: { name: 'Mehmet Y.', points: 850 },
    trendingTags: ['#kahveseverler', '#teknoloji', '#saglıklıyaşam']
  }

  // 🤖 AI Önerileri
  const aiRecommendations = [
    { 
      id: 1, 
      icon: '🏆', 
      text: 'Yakında "Sosyal Kelebek" rozetini kazanabilirsin! 3 yorum daha yap.',
      action: 'Yorum Yap',
      link: '/customer/scanner'
    },
    { 
      id: 2, 
      icon: '🎯', 
      text: 'Bu hafta 720 puan kazandın, harika! Hedefe %92 yakınsın.',
      action: 'Hedefleri Gör',
      link: '/customer/goals'
    },
    { 
      id: 3, 
      icon: '🌳', 
      text: 'Fidan bağışı yaparak 100 bonus puan kazanabilirsin!',
      action: 'Bağış Yap',
      link: '/customer/donations'
    }
  ]

  // ⏰ Saat & Tarih Fonksiyonları
  const formatTime = () => {
    return currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }
  
  const formatDate = () => {
    return currentTime.toLocaleDateString('tr-TR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // 🔔 Canlı Bildirim Ticker Verileri
  const liveNotifications = [
    { id: 1, text: 'Ali "Kahve Uzmanı" rozetini kazandı!', icon: '🔥', color: 'text-orange-500' },
    { id: 2, text: 'Ayşe 500 puan bağışladı!', icon: '💰', color: 'text-yellow-500' },
    { id: 3, text: 'Mehmet #1 sıraya yükseldi!', icon: '🏆', color: 'text-purple-500' },
    { id: 4, text: 'Zeynep "DRACARYS" rozetini açtı!', icon: '🐉', color: 'text-red-500' },
    { id: 5, text: '100+ kullanıcı şu an aktif!', icon: '👥', color: 'text-blue-500' }
  ]

  // 🗓️ Event Calendar Verileri
  const upcomingEvents = [
    { 
      id: 1, 
      date: '29 Ekim', 
      title: 'Cumhuriyet Bayramı', 
      description: '2x puan bonusu!',
      icon: '🇹🇷',
      color: 'from-red-500 to-white'
    },
    { 
      id: 2, 
      date: '31 Ekim', 
      title: 'Halloween Özel', 
      description: 'Özel rozetler!',
      icon: '🎃',
      color: 'from-orange-500 to-purple-500'
    },
    { 
      id: 3, 
      date: '5 Kasım', 
      title: 'Mega Çekiliş', 
      description: 'iPhone 15 Pro!',
      icon: '🎁',
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  // 🎖️ Seviye Sistemi Verileri
  const levelSystem = {
    currentLevel: 15,
    currentXP: 8450,
    requiredXP: 10000,
    nextLevel: 16,
    benefits: [
      { text: 'Özel "Legend" rozeti', icon: '✨' },
      { text: '500 bonus puan', icon: '💰' },
      { text: 'VIP lounge erişimi', icon: '🎁' }
    ]
  }

  // 📊 Kategori Radar Chart Verileri
  const categoryStats = [
    { category: 'Kahve', score: 85, max: 100, color: '#8B4513' },
    { category: 'Yemek', score: 72, max: 100, color: '#FF6347' },
    { category: 'Alışveriş', score: 64, max: 100, color: '#4169E1' },
    { category: 'Eğlence', score: 58, max: 100, color: '#FFD700' },
    { category: 'Sağlık', score: 45, max: 100, color: '#32CD32' }
  ]

  // 🎵 Spotify-Style Playlist Verileri
  const achievements = [
    { 
      id: 1, 
      title: 'Ateşli Yorumcu', 
      description: '50 yorum yap',
      progress: 45,
      total: 50,
      icon: '🔥',
      color: 'from-orange-500 to-red-500',
      points: 500
    },
    { 
      id: 2, 
      title: 'Kahve Uzmanı', 
      description: '100 kahve puanı',
      progress: 87,
      total: 100,
      icon: '☕',
      color: 'from-amber-700 to-yellow-600',
      points: 300
    },
    { 
      id: 3, 
      title: 'Sosyal Kelebek', 
      description: '30 beğeni al',
      progress: 22,
      total: 30,
      icon: '🦋',
      color: 'from-purple-500 to-pink-500',
      points: 400
    },
    { 
      id: 4, 
      title: 'Eko Savaşçı', 
      description: '10 fidan bağışla',
      progress: 7,
      total: 10,
      icon: '🌳',
      color: 'from-green-500 to-emerald-600',
      points: 600
    }
  ]

  // Achievements data removed - using badge system instead

  const quickActions = [
    {
      title: 'Generate QR',
      description: 'Create feedback QR codes',
      icon: QrCode,
      action: 'Generate QR',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'New Feedback',
      description: 'Submit new feedback',
      icon: MessageSquare,
      action: 'New Feedback',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'View Reports',
      description: 'Analytics & insights',
      icon: BarChart3,
      action: 'View Reports',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Settings',
      description: 'Account preferences',
      icon: Settings,
      action: 'Settings',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  // Export data
  const exportData = {
    headers: ['Metric', 'Value', 'Description'],
    rows: [
      ['Total Feedback', '47', 'Total number of feedback submitted'],
      ['Response Rate', '89%', 'Percentage of responses received'],
      ['Average Rating', '4.2', 'Average rating given'],
      ['Active QR Codes', '12', 'Number of active QR codes'],
      ['Badge Count', userBadges.length.toString(), 'Total badges earned'],
      ['Total Points', (userStats?.totalPoints || totalPoints).toString(), 'Total points accumulated']
    ],
    filename: 'customer-dashboard-stats'
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Generate QR':
        emojiConfetti(['📱', '🔍', '✨'])
        navigate('/customer/scanner')
        showToast({
          type: 'info',
          title: 'QR Tarayıcı',
          message: 'QR kod tarayıcısına yönlendiriliyorsunuz'
        })
        break
      case 'New Feedback':
        starConfetti()
        navigate('/customer/feedback')
        showToast({
          type: 'success',
          title: 'Geri Bildirim',
          message: 'Geri bildirim sayfasına yönlendiriliyorsunuz'
        })
        break
      case 'View Reports':
        fireConfetti({ colors: ['#4ECDC4', '#45B7D1', '#96CEB4'] })
        navigate('/customer/analytics')
        showToast({
          type: 'info',
          title: 'Analitikler',
          message: 'Analitik sayfasına yönlendiriliyorsunuz'
        })
        break
      case 'Settings':
        emojiConfetti(['⚙️', '🔧', '🛠️'])
        navigate('/customer/settings')
        showToast({
          type: 'info',
          title: 'Ayarlar',
          message: 'Ayarlar sayfasına yönlendiriliyorsunuz'
        })
        break
      default:
        showToast({
          type: 'warning',
          title: 'Bilinmeyen İşlem',
          message: 'Bu işlem henüz desteklenmiyor'
        })
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Dashboard" 
          subtitle="Welcome back to QRATEX Customer Portal"
          userType="customer" 
        />
        
        {/* PWA Components */}
        <PWAInstallButton variant="banner" />
        <NetworkStatus />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* 🎯 Kişiselleştirilmiş Karşılama Kartı */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`relative overflow-hidden bg-gradient-to-br ${greeting.color}`}>
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Sol Taraf - Profil ve Selamlama */}
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="relative w-20 h-20 cursor-pointer flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          triggerSecretBadge()
                          fireworksConfetti()
                        }}
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                          <div className="text-4xl">👤</div>
                        </div>
                        {/* Online Status Badge */}
                        <div className="absolute bottom-0 right-0 flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          Çevrimiçi
                        </div>
                      </motion.div>
                      
                      <div className="text-white">
                        <motion.h2 
                          className="text-2xl md:text-3xl font-bold mb-1 drop-shadow-md"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {greeting.text}, Ahmet! {greeting.emoji}
                        </motion.h2>
                        <motion.p 
                          className="text-sm md:text-base opacity-90 font-medium mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {randomQuote}
                        </motion.p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                            <Crown className="w-4 h-4" />
                            <span className="text-sm font-semibold">Gold Member</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                            <Flame className="w-4 h-4" />
                            <span className="text-sm font-semibold">{currentStreak} gün streak! 🔥</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-semibold">#{leaderboardRank} Sırada</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sağ Taraf - Puan ve Aksiyon */}
                    <div className="text-white text-right">
                      <p className="text-sm opacity-90 mb-1">Toplam Puanın</p>
                      <motion.p 
                        className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-3"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {totalPoints.toLocaleString()}
                      </motion.p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="md"
                          className="bg-white text-purple-600 font-semibold hover:scale-105 transition-transform"
                          endContent={<Plus className="w-4 h-4" />}
                          onClick={() => handleQuickAction('New Feedback')}
                        >
                          Yeni Yorum
                        </Button>
                        <Button
                          size="md"
                          variant="bordered"
                          className="border-2 border-white text-white font-semibold hover:bg-white/20"
                          endContent={<ArrowUpRight className="w-4 h-4" />}
                          onClick={() => navigate('/customer/stats-dashboard')}
                        >
                          Detaylar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* 🔔 Canlı Bildirim Ticker */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-3 rounded-lg overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tickerIndex}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center gap-3 text-white"
                >
                  <span className="text-2xl">{liveNotifications[tickerIndex].icon}</span>
                  <span className="font-semibold text-sm md:text-base">
                    {liveNotifications[tickerIndex].text}
                  </span>
                  <Bell className="w-4 h-4 animate-pulse" />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* ⏰ Saat, 🎁 Hediye, 🎖️ Seviye, 🗓️ Event - 4 Mini Widget */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Gerçek Zamanlı Saat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-indigo-300 h-full min-h-[240px]">
                  <CardBody className="p-4 text-white flex flex-col justify-center">
                    <div className="text-center">
                      <Clock className="w-6 h-6 mx-auto mb-2 opacity-80" />
                      <motion.div
                        key={formatTime()}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold mb-2 font-mono"
                      >
                        {formatTime()}
                      </motion.div>
                      <p className="text-xs opacity-90 mb-2">{formatDate()}</p>
                      <div className="flex items-center justify-center gap-2 text-xs opacity-75">
                        <CloudSun className="w-4 h-4" />
                        <span>22°C Güneşli</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Hediye Kutusu */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Card className="bg-gradient-to-br from-pink-500 to-rose-600 border-2 border-pink-300 cursor-pointer hover:scale-105 transition-transform h-full min-h-[240px]"
                  onClick={() => {
                    setShowGiftBox(true)
                    setTimeout(() => {
                      setGiftOpened(true)
                      emojiConfetti(['🎁', '✨', '💝', '🎉'])
                      showToast({
                        type: 'success',
                        title: 'Hediye Kazandın!',
                        message: '+250 bonus puan kazandın! 🎉'
                      })
                      setTimeout(() => {
                        setShowGiftBox(false)
                        setGiftOpened(false)
                      }, 3000)
                    }, 1000)
                  }}
                >
                  <CardBody className="p-4 text-white text-center flex flex-col justify-center">
                    <motion.div
                      animate={showGiftBox ? { 
                        rotateY: giftOpened ? 360 : 0,
                        scale: giftOpened ? 1.2 : 1 
                      } : {}}
                      transition={{ duration: 1 }}
                      className="text-5xl mb-2"
                    >
                      {giftOpened ? '✨' : '🎁'}
                    </motion.div>
                    <p className="font-bold mb-1">
                      {giftOpened ? 'Tebrikler!' : 'Günlük Hediye'}
                    </p>
                    <p className="text-xs opacity-90">
                      {giftOpened ? '+250 puan!' : 'Kutuyu Aç!'}
                    </p>
                    {!giftOpened && (
                      <p className="text-xs mt-2 opacity-75">⏰ Yeni hediye: 6 saat</p>
                    )}
                  </CardBody>
                </Card>
              </motion.div>

              {/* Seviye Sistemi */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-amber-300 h-full min-h-[240px]">
                  <CardBody className="p-4 text-white flex flex-col justify-center">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Trophy className="w-5 h-5" />
                        <span className="font-bold text-lg">
                          Level {levelSystem.currentLevel}
                        </span>
                      </div>
                      
                      <div className="relative w-20 h-20 mx-auto mb-2">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="6"
                            fill="none"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="white"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 36}`}
                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - levelSystem.currentXP / levelSystem.requiredXP)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold">
                            {Math.floor((levelSystem.currentXP / levelSystem.requiredXP) * 100)}%
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-xs opacity-90">
                        {levelSystem.currentXP.toLocaleString()} / {levelSystem.requiredXP.toLocaleString()} XP
                      </p>
                      <p className="text-xs mt-1 opacity-75">
                        ⏫ {(levelSystem.requiredXP - levelSystem.currentXP).toLocaleString()} XP kaldı
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Event Calendar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Card className="bg-gradient-to-br from-teal-500 to-cyan-600 border-2 border-teal-300 h-full min-h-[240px]">
                  <CardBody className="p-4 text-white flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarIcon className="w-5 h-5" />
                      <span className="font-bold text-sm">Yaklaşan</span>
                    </div>
                    
                    <div className="space-y-2">
                      {upcomingEvents.slice(0, 2).map((event) => (
                        <div key={event.id} className="flex items-start gap-2 text-xs">
                          <span className="text-xl flex-shrink-0">{event.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold">{event.date}</p>
                            <p className="opacity-90 truncate">{event.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      size="sm"
                      variant="light"
                      className="w-full mt-3 text-white"
                      onClick={() => navigate('/customer/events')}
                    >
                      Tümü →
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* 📈 Gelişmiş İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="cursor-pointer"
                  onClick={() => {
                    if (stat.onClick) {
                      stat.onClick()
                      fireConfetti({ particleCount: 30, spread: 45 })
                    }
                  }}
                >
                  <Card className={`h-full bg-gradient-to-br ${stat.gradient} hover:shadow-2xl transition-all duration-300`}>
                    <CardBody className="p-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex-1">
                          <p className="text-xs opacity-90 mb-1 font-medium">{stat.title}</p>
                          <p className="text-2xl font-bold mb-1">{stat.value}</p>
                          <div className="flex items-center gap-1">
                            {stat.changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                            {stat.changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
                            <span className="text-xs font-medium opacity-90">{stat.change}</span>
                          </div>
                        </div>
                        <stat.icon className="w-10 h-10 opacity-30" />
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* 📅 Günlük Görev Özeti Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="relative overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
                <CardBody className="p-6 relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          Bugünün Görevleri
                          <Chip size="sm" color="success" variant="flat">
                            {completedQuests}/{totalQuests} Tamamlandı
                          </Chip>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Potansiyel kazanç: <span className="font-bold text-purple-600">{potentialEarnings} puan</span> • 
                          Kazanılan: <span className="font-bold text-green-600">{earnedToday} puan</span>
                        </p>
                      </div>
                    </div>
                    <Button
                      color="secondary"
                      variant="shadow"
                      endContent={<ArrowUpRight className="w-4 h-4" />}
                      onClick={() => navigate('/customer/quests')}
                      className="font-semibold"
                    >
                      Tümünü Gör
                    </Button>
                  </div>

                  {/* İlerleme Barı */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Günlük İlerleme
                      </span>
                      <span className="text-sm font-bold text-purple-600">
                        {questProgress.toFixed(0)}%
                      </span>
                    </div>
                    <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${questProgress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Görev Listesi */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {dailyQuests.map((quest, index) => (
                      <motion.div
                        key={quest.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Card className={`${
                          quest.completed 
                            ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700'
                            : 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                        }`}>
                          <CardBody className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">{quest.icon}</div>
                              <div className="flex-1">
                                <p className={`text-sm font-semibold mb-1 ${
                                  quest.completed 
                                    ? 'text-green-700 dark:text-green-300 line-through' 
                                    : 'text-gray-900 dark:text-white'
                                }`}>
                                  {quest.title}
                                </p>
                                <div className="flex items-center justify-between">
                                  <Chip 
                                    size="sm" 
                                    variant="flat"
                                    color={quest.completed ? 'success' : 'warning'}
                                    startContent={quest.completed ? <CheckCircle className="w-3 h-3" /> : <Coins className="w-3 h-3" />}
                                  >
                                    {quest.completed ? 'Tamamlandı!' : `+${quest.reward} puan`}
                                  </Chip>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* 🎁 Günün Fırsatları, 📰 Bildirimler, 🗺️ Yakındaki İşletmeler, 🎨 Profil Tamamlama */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Günün Fırsatları */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="h-full border-2 border-orange-200 dark:border-orange-800">
                  <CardBody className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      ⏰ Günün Fırsatları
                    </h3>
                    <div className="space-y-3">
                      {dailyDeals.map((deal, idx) => (
                        <div key={deal.id} className={`bg-gradient-to-r ${deal.color} rounded-lg p-3 text-white`}>
                          <div className="flex items-start gap-2">
                            <deal.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm">{deal.title}</p>
                              <p className="text-xs opacity-90">{deal.description}</p>
                              <p className="text-xs mt-1 opacity-75">⏳ {deal.timeLeft}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Son Bildirimler */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Card className="h-full border-2 border-blue-200 dark:border-blue-800">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        🔔 Bildirimler
                        <Chip size="sm" color="danger" variant="flat">3</Chip>
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {recentNotifications.map((notif) => (
                        <div key={notif.id} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                          <span className="text-xl flex-shrink-0">{notif.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.text}</p>
                            <p className="text-xs text-gray-500">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="light"
                      className="w-full mt-3 text-blue-600"
                      endContent={<ArrowUpRight className="w-3 h-3" />}
                      onClick={() => navigate('/customer/enhanced-notifications')}
                    >
                      Tümünü Gör
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Yakındaki İşletmeler */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="h-full border-2 border-green-200 dark:border-green-800">
                  <CardBody className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      📍 Yakındaki İşletmeler
                    </h3>
                    <div className="space-y-2">
                      {nearbyBusinesses.map((business) => (
                        <div key={business.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{business.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{business.name}</p>
                              <p className="text-xs text-gray-500">{business.distance}</p>
                            </div>
                          </div>
                          <Chip size="sm" color="success" variant="flat">
                            +{business.points}
                          </Chip>
                        </div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="light"
                      className="w-full mt-3 text-green-600"
                      endContent={<MapPin className="w-3 h-3" />}
                      onClick={() => navigate('/customer/map-explorer')}
                    >
                      Haritayı Aç
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Profil Tamamlama */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <Card className="h-full border-2 border-purple-200 dark:border-purple-800">
                  <CardBody className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      🎨 Profil Tamamlama
                    </h3>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          İlerleme
                        </span>
                        <span className="text-sm font-bold text-purple-600">
                          {profileCompletion.percentage}%
                        </span>
                      </div>
                      <Progress 
                        value={profileCompletion.percentage} 
                        className="h-2"
                        classNames={{
                          indicator: 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }}
                      />
                    </div>
                    <div className="space-y-2 mb-3">
                      {profileCompletion.completed.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <item.icon className="w-4 h-4" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                      {profileCompletion.pending.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <item.icon className="w-4 h-4" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      color="secondary"
                      variant="shadow"
                      className="w-full font-semibold"
                      endContent={<Gift className="w-3 h-3" />}
                      onClick={() => navigate('/customer/profile-customization')}
                    >
                      Tamamla +{profileCompletion.reward} puan
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Recent Activity
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your latest feedback interactions
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ExportButton
                          data={exportDashboardData.customerFeedback(recentActivity)}
                          filename="customer_activity_report"
                          size="sm"
                          showLabel={false}
                        />
                        <Button size="sm" variant="light" className="text-blue-600">
                          View All
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className={`p-3 rounded-lg ${
                            activity.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            <activity.icon className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {activity.type}
                              </p>
                              {activity.status === 'completed' && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {activity.rating && (
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${
                                      i < activity.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            )}
                            {activity.points && (
                              <Chip size="sm" className="bg-blue-100 text-blue-800">
                                {activity.points}
                              </Chip>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Quick Actions
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Frequently used features
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {quickActions.map((action, index) => (
                        <motion.div
                          key={action.title}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            scale: 1.05,
                            rotate: index % 2 === 0 ? 2 : -2,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="cursor-pointer hover-wiggle"
                          onClick={() => {
                            handleQuickAction(action.action)
                            handleTripleClick()
                          }}
                        >
                          <Card className="h-full hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-900">
                            <CardBody className="p-4 text-center relative overflow-hidden">
                              <motion.div 
                                className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 hover-pulse relative`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <action.icon className="w-6 h-6 text-white" />
                                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                              </motion.div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                {action.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                {action.description}
                              </p>
                              <Button
                                size="sm"
                                variant="bordered"
                                className="w-full text-xs hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300"
                                endContent={<ExternalLink className="w-3 h-3" />}
                              >
                                {action.action}
                              </Button>
                              
                              {/* Sparkle effect on hover */}
                              <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <span className="text-yellow-400 animate-pulse">✨</span>
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Feedback History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Feedback History
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your recent submissions
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="light" className="text-green-600">
                        View All
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {feedbackHistory.map((feedback, index) => (
                        <motion.div
                          key={feedback.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                              {feedback.title}
                            </h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Chip 
                                size="sm" 
                                className="bg-blue-100 text-blue-800"
                              >
                                {feedback.category}
                              </Chip>
                              <Chip 
                                size="sm" 
                                className={
                                  feedback.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                                  feedback.status === 'resolved' ? 'bg-purple-100 text-purple-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {feedback.status}
                              </Chip>
                              <Chip 
                                size="sm" 
                                className={
                                  feedback.impact === 'high' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }
                              >
                                {feedback.impact} impact
                              </Chip>
                            </div>
                            <span className="text-xs text-gray-500">
                              {feedback.date}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Badge Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Rozet Koleksiyonu
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Son kazandığın rozetler
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ExportButton
                          data={exportDashboardData.badges(userBadges)}
                          filename="badge_collection_report"
                          size="sm"
                          showLabel={false}
                        />
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          onClick={() => navigate('/customer/badges')}
                        >
                          Tümünü Gör
                        </Button>
                      </div>
                    </div>

                    {/* Badge Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{userStats?.totalBadges || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Toplam Rozet</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{userStats?.totalPoints || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Toplam Puan</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">#{userStats?.rank || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Sıralama</div>
                      </div>
                    </div>

                    {/* Recent Badges */}
                    <div className="grid grid-cols-4 gap-3">
                      {userBadges.filter(b => b.unlocked).slice(0, 4).map((badge, index) => (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <BadgeCard
                            badge={badge}
                            size="sm"
                            onClick={() => {
                              setSelectedBadge(badge)
                              setShowUnlockAnimation(true)
                            }}
                          />
                        </motion.div>
                      ))}
                      
                      {/* Show placeholder if not enough badges */}
                      {Array.from({ length: Math.max(0, 4 - userBadges.filter(b => b.unlocked).length) }).map((_, index) => (
                        <div key={`placeholder-${index}`} className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Rozet Kazan</span>
                        </div>
                      ))}
                    </div>

                    {/* Badge notifications */}
                    {notifications.length > 0 && (
                      <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-300">
                            🎉 {notifications[0].message}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* 📊 Haftalık Aktivite, 🎯 Yakın Başarımlar, 🏅 Son Rozetler, 👥 Topluluk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Haftalık Aktivite Grafiği */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardBody className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      📊 Son 7 Günlük Aktivite
                    </h3>
                    
                    {/* Bar Chart */}
                    <div className="space-y-2 mb-4">
                      {weeklyActivity.map((day, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-8">
                            {day.day}
                          </span>
                          <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(day.points / maxActivity) * 100}%` }}
                              transition={{ duration: 1, delay: 0.7 + idx * 0.1 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-end pr-2"
                            >
                              <span className="text-white text-xs font-bold">{day.points}</span>
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Bu hafta</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {weekTotal.toLocaleString()} puan
                        </p>
                      </div>
                      <Chip color="success" variant="flat" startContent={<TrendingUp className="w-3 h-3" />}>
                        ↑ {weekComparison}%
                      </Chip>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      🏆 En aktif gün: <span className="font-bold text-purple-600">{mostActiveDay?.day}</span>
                    </p>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Yakın Başarımlar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                <Card className="border-2 border-yellow-200 dark:border-yellow-800">
                  <CardBody className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      🎯 Yakın Başarımlar
                    </h3>
                    
                    <div className="space-y-4">
                      {nearAchievements.map((achievement) => {
                        const progress = (achievement.current / achievement.target) * 100
                        const remaining = achievement.target - achievement.current
                        
                        return (
                          <div key={achievement.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{achievement.emoji}</span>
                                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                  {achievement.title}
                                </span>
                              </div>
                              <Chip size="sm" color="warning" variant="flat">
                                {progress.toFixed(0)}%
                              </Chip>
                            </div>
                            
                            <Progress 
                              value={progress} 
                              className="h-2"
                              classNames={{
                                indicator: 'bg-gradient-to-r from-yellow-400 to-orange-500'
                              }}
                            />
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600 dark:text-gray-400">
                                {achievement.current.toLocaleString()}/{achievement.target.toLocaleString()}
                              </span>
                              <span className="text-purple-600 font-semibold">
                                {remaining.toLocaleString()} daha! • {achievement.reward}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Son Kazanılan Rozetler */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        🏅 Son Kazanılan Rozetler
                      </h3>
                      <Chip size="sm" color="secondary" variant="flat">
                        {userBadges.length} rozet
                      </Chip>
                    </div>
                    
                    <div className="space-y-3">
                      {recentBadges.map((badge, idx) => (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + idx * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:scale-105 transition-transform cursor-pointer"
                        >
                          <div className="text-4xl">{badge.emoji}</div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 dark:text-white">{badge.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{badge.time}</p>
                          </div>
                          <Sparkles className="w-5 h-5 text-yellow-500" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <Button
                      size="sm"
                      color="secondary"
                      variant="light"
                      className="w-full mt-3"
                      endContent={<ArrowUpRight className="w-3 h-3" />}
                      onClick={() => navigate('/customer/badges')}
                    >
                      📖 Tüm rozetleri gör
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Topluluk Panosu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardBody className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      👥 Topluluk Aktivitesi
                    </h3>
                    
                    <div className="space-y-4">
                      {/* En Popüler Yorumlar */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                          🔥 En Popüler Yorumlar
                        </p>
                        {communityActivity.popularComments.map((comment, idx) => (
                          <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <p className="text-sm text-gray-900 dark:text-white mb-1">
                              "{comment.text}"
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600 dark:text-gray-400">- {comment.author}</span>
                              <span className="flex items-center gap-1 text-red-500">
                                <ThumbsUp className="w-3 h-3" />
                                {comment.likes}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bugünün Yıldızı */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                          🌟 Bugünün Yıldızı
                        </p>
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Crown className="w-5 h-5 text-yellow-600" />
                            <span className="font-bold text-gray-900 dark:text-white">
                              {communityActivity.todaysStar.name}
                            </span>
                          </div>
                          <Chip size="sm" color="warning" variant="flat">
                            {communityActivity.todaysStar.points} puan
                          </Chip>
                        </div>
                      </div>

                      {/* Trend Konular */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                          📈 Trend Konular
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {communityActivity.trendingTags.map((tag, idx) => (
                            <Chip 
                              key={idx} 
                              size="sm" 
                              variant="flat"
                              color="success"
                              startContent={<Hash className="w-3 h-3" />}
                              className="cursor-pointer hover:scale-105 transition-transform"
                            >
                              {tag.replace('#', '')}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* 🎰 Günlük Ödül Çarkı & 🏆 Canlı Meydan Okumalar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Rewards Wheel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <DailyRewardsWheel />
              </motion.div>

              {/* Live Challenges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
              >
                <LiveChallenges />
              </motion.div>
            </div>

            {/* 🤖 AI Önerileri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="relative overflow-hidden border-2 border-cyan-200 dark:border-cyan-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl" />
                <CardBody className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      🤖 Sana Özel AI Önerileri
                      <Chip size="sm" color="primary" variant="flat" className="animate-pulse">
                        Yeni
                      </Chip>
                    </h3>
                    <Button
                      size="sm"
                      color="primary"
                      variant="light"
                      startContent={<Sparkles className="w-4 h-4" />}
                      onClick={() => navigate('/customer/ai-assistant')}
                    >
                      AI Asistan
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiRecommendations.map((rec, idx) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-2 border-cyan-200 dark:border-cyan-800 h-full">
                          <CardBody className="p-4">
                            <div className="flex flex-col h-full">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="text-3xl flex-shrink-0">{rec.icon}</div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                                  {rec.text}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                color="primary"
                                variant="flat"
                                className="w-full mt-auto"
                                endContent={<ArrowUpRight className="w-3 h-3" />}
                                onClick={() => navigate(rec.link)}
                              >
                                {rec.action}
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-500" />
                        AI motorumuz senin için en iyi önerileri hazırlıyor
                      </p>
                      <Button
                        size="sm"
                        variant="light"
                        className="text-cyan-600"
                        endContent={<ArrowUpRight className="w-3 h-3" />}
                        onClick={() => {
                          showToast({
                            type: 'info',
                            title: 'AI Önerileri',
                            message: 'Daha fazla öneri için AI Asistan sayfasını ziyaret edin!'
                          })
                          navigate('/customer/ai-assistant')
                        }}
                      >
                        💡 Daha fazla öneri
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* 📊 Radar Chart & 🎵 Playlist - 2 Widget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kategori Radar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card className="relative overflow-hidden border-2 border-violet-200 dark:border-violet-800 h-full min-h-[400px]">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUpIcon className="w-5 h-5 text-violet-500" />
                        <h3 className="text-lg font-bold">📊 Kategori Analizi</h3>
                      </div>
                      <Chip size="sm" color="secondary" variant="flat">
                        Radar View
                      </Chip>
                    </div>

                    {/* Radar Chart SVG */}
                    <div className="relative w-full h-64 flex items-center justify-center mb-6">
                      <svg width="280" height="280" viewBox="0 0 280 280" className="overflow-visible">
                        {/* Grid circles */}
                        {[1, 0.75, 0.5, 0.25].map((scale, i) => (
                          <circle
                            key={i}
                            cx="140"
                            cy="140"
                            r={100 * scale}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-gray-300 dark:text-gray-600"
                            opacity="0.3"
                          />
                        ))}
                        
                        {/* Grid lines */}
                        {categoryStats.map((cat, i) => {
                          const angle = (i * 72 - 90) * (Math.PI / 180)
                          const x = 140 + Math.cos(angle) * 100
                          const y = 140 + Math.sin(angle) * 100
                          return (
                            <line
                              key={i}
                              x1="140"
                              y1="140"
                              x2={x}
                              y2={y}
                              stroke="currentColor"
                              strokeWidth="1"
                              className="text-gray-300 dark:text-gray-600"
                              opacity="0.3"
                            />
                          )
                        })}
                        
                        {/* Data polygon */}
                        <motion.polygon
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 0.6, scale: 1 }}
                          transition={{ duration: 0.8, delay: 1.2 }}
                          points={categoryStats.map((cat, i) => {
                            const angle = (i * 72 - 90) * (Math.PI / 180)
                            const distance = (cat.score / cat.max) * 100
                            const x = 140 + Math.cos(angle) * distance
                            const y = 140 + Math.sin(angle) * distance
                            return `${x},${y}`
                          }).join(' ')}
                          fill="url(#radarGradient)"
                          stroke="#8B5CF6"
                          strokeWidth="2"
                        />
                        
                        {/* Data points */}
                        {categoryStats.map((cat, i) => {
                          const angle = (i * 72 - 90) * (Math.PI / 180)
                          const distance = (cat.score / cat.max) * 100
                          const x = 140 + Math.cos(angle) * distance
                          const y = 140 + Math.sin(angle) * distance
                          return (
                            <motion.circle
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                              cx={x}
                              cy={y}
                              r="5"
                              fill={cat.color}
                              stroke="white"
                              strokeWidth="2"
                            />
                          )
                        })}
                        
                        {/* Category labels */}
                        {categoryStats.map((cat, i) => {
                          const angle = (i * 72 - 90) * (Math.PI / 180)
                          const x = 140 + Math.cos(angle) * 120
                          const y = 140 + Math.sin(angle) * 120
                          return (
                            <text
                              key={i}
                              x={x}
                              y={y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-xs font-semibold fill-current"
                              style={{ fill: cat.color }}
                            >
                              {cat.category}
                            </text>
                          )
                        })}
                        
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2">
                      {categoryStats.map((cat) => (
                        <div key={cat.category} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {cat.category}: {cat.score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Spotify-Style Playlist */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Card className="relative overflow-hidden border-2 border-green-200 dark:border-green-800 h-full min-h-[400px]">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">🎵</div>
                        <h3 className="text-lg font-bold">Başarım Listem</h3>
                      </div>
                      <Chip size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        {achievements.length} Track
                      </Chip>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      🎧 Devam eden başarımların ~ {achievements.reduce((acc, a) => acc + a.points, 0)} puan değerinde
                    </p>

                    <div className="space-y-3">
                      {achievements.map((ach, idx) => (
                        <motion.div
                          key={ach.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + idx * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="group cursor-pointer"
                          onClick={() => {
                            showToast({
                              type: 'info',
                              title: ach.title,
                              message: `${ach.progress}/${ach.total} - ${ach.description}`
                            })
                          }}
                        >
                          <Card className={`bg-gradient-to-r ${ach.color} border-0 shadow-lg group-hover:shadow-xl transition-all`}>
                            <CardBody className="p-4">
                              <div className="flex items-center gap-4">
                                {/* Icon & Index */}
                                <div className="relative flex-shrink-0">
                                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-2xl">
                                    {ach.icon}
                                  </div>
                                  <div className="absolute -top-1 -left-1 w-5 h-5 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {idx + 1}
                                  </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-bold text-white truncate">
                                      {ach.title}
                                    </h4>
                                    {ach.progress >= ach.total && (
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    )}
                                  </div>
                                  <p className="text-xs text-white/80 mb-2">
                                    {ach.description}
                                  </p>
                                  
                                  {/* Progress bar */}
                                  <div className="relative">
                                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(ach.progress / ach.total) * 100}%` }}
                                        transition={{ duration: 1, delay: 1.3 + idx * 0.1 }}
                                        className="h-full bg-white rounded-full"
                                      />
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                      <span className="text-xs text-white/90 font-semibold">
                                        {ach.progress}/{ach.total}
                                      </span>
                                      <span className="text-xs text-white/90 font-semibold">
                                        +{ach.points} 💰
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Play button (hover effect) */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="flex-shrink-0"
                                >
                                  <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                  </div>
                                </motion.div>
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold"
                      endContent={<Trophy className="w-4 h-4" />}
                      onClick={() => navigate('/customer/achievements')}
                    >
                      Tüm Başarımlar
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* 🌟 Topluluk Akışı (Social Activity Feed) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <SocialActivityFeed />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Badge Unlock Animation */}
      <BadgeUnlockAnimation
        badge={selectedBadge}
        isVisible={showUnlockAnimation}
        onClose={() => {
          setShowUnlockAnimation(false)
          setSelectedBadge(null)
        }}
      />
    </div>
  )
}

export default CustomerDashboard

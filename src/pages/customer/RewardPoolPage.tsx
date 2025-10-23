import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Card, CardBody, Button, Progress, Chip, Modal, 
  ModalContent, ModalHeader, ModalBody, ModalFooter,
  Avatar, Tabs, Tab, Tooltip, Badge
} from '@nextui-org/react'
import { 
  Gift, Trophy, Star, Zap, Crown, Sparkles, 
  TrendingUp, Award, Ticket, Clock, Users, 
  ShoppingBag, Watch, Headphones, Smartphone, 
  Laptop, Camera, Gamepad2, Package, ChevronRight,
  PartyPopper, Flame, Target, CheckCircle, Lock,
  Calendar, ArrowLeft, AlertCircle, Share2, Heart,
  History, RefreshCw, TrendingDown, Percent
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface Prize {
  id: string
  name: string
  brand: string
  description: string
  image: string
  value: number
  category: 'elektronik' | 'aksesuar' | 'giyim' | 'dijital'
  stock: number
  requiredTickets: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  emoji: string
  isAccessory?: boolean
  piecesCurrent?: number
  piecesRequired?: number
}

interface TicketTier {
  minPoints: number
  maxPoints: number | null
  tickets: number
  tierName: string
  color: string
  icon: any
  benefits: string[]
  winBonus: number // Yüzde olarak şans bonusu
}

interface UserStats {
  totalPoints: number
  currentMonthPoints: number
  totalTickets: number
  usedTickets: number
  remainingTickets: number
  winHistory: number
  rank: string
}

interface DrawHistory {
  id: string
  date: string
  prizeName: string
  prizeEmoji: string
  prizeValue: number
  won: boolean
  ticketsUsed: number
}

interface ResetInfo {
  resetDate: string
  daysRemaining: number
  hoursRemaining: number
  minutesRemaining: number
}

function RewardPoolPage() {
  const navigate = useNavigate()
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null)
  const [showPrizeModal, setShowPrizeModal] = useState(false)
  const [showDrawModal, setShowDrawModal] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawProgress, setDrawProgress] = useState(0)
  const [wonPrize, setWonPrize] = useState<Prize | null>(null)
  const [activeTab, setActiveTab] = useState('prizes')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // User stats
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 12450,
    currentMonthPoints: 3250,
    totalTickets: 32,
    usedTickets: 8,
    remainingTickets: 24,
    winHistory: 3,
    rank: 'Gold'
  })

  // Reset Info - Aylık reset mekanizması
  const [resetInfo, setResetInfo] = useState<ResetInfo>({
    resetDate: '2025-11-01',
    daysRemaining: 15,
    hoursRemaining: 12,
    minutesRemaining: 34
  })

  // Draw History
  const [drawHistory, setDrawHistory] = useState<DrawHistory[]>([
    {
      id: '1',
      date: '10 Ekim 2025',
      prizeName: 'AirPods Pro 2',
      prizeEmoji: '🎧',
      prizeValue: 8999,
      won: true,
      ticketsUsed: 1
    },
    {
      id: '2',
      date: '5 Ekim 2025',
      prizeName: 'iPhone 15 Pro',
      prizeEmoji: '📱',
      prizeValue: 45999,
      won: false,
      ticketsUsed: 1
    },
    {
      id: '3',
      date: '1 Ekim 2025',
      prizeName: 'Samsung Galaxy Watch 6',
      prizeEmoji: '⌚',
      prizeValue: 9999,
      won: false,
      ticketsUsed: 1
    }
  ])

  // Countdown timer for reset
  useEffect(() => {
    const timer = setInterval(() => {
      setResetInfo(prev => {
        let { daysRemaining, hoursRemaining, minutesRemaining } = prev
        
        minutesRemaining--
        if (minutesRemaining < 0) {
          minutesRemaining = 59
          hoursRemaining--
        }
        if (hoursRemaining < 0) {
          hoursRemaining = 23
          daysRemaining--
        }
        if (daysRemaining < 0) {
          // Reset oldu!
          return {
            resetDate: '2025-12-01',
            daysRemaining: 30,
            hoursRemaining: 0,
            minutesRemaining: 0
          }
        }
        
        return {
          ...prev,
          daysRemaining,
          hoursRemaining,
          minutesRemaining
        }
      })
    }, 60000) // Her dakika güncelle

    return () => clearInterval(timer)
  }, [])

  // Ticket tiers with win bonus
  const ticketTiers: TicketTier[] = [
    {
      minPoints: 0,
      maxPoints: 999,
      tickets: 0,
      tierName: 'Başlangıç',
      color: 'from-gray-400 to-gray-600',
      icon: Star,
      benefits: ['Henüz çekiliş hakkın yok'],
      winBonus: 0
    },
    {
      minPoints: 1000,
      maxPoints: 2499,
      tickets: 5,
      tierName: 'Bronz',
      color: 'from-orange-400 to-orange-600',
      icon: Award,
      benefits: ['5 Çekiliş Bileti', 'Aylık Çekiliş Hakkı'],
      winBonus: 10
    },
    {
      minPoints: 2500,
      maxPoints: 4999,
      tickets: 12,
      tierName: 'Gümüş',
      color: 'from-gray-300 to-gray-500',
      icon: Trophy,
      benefits: ['12 Çekiliş Bileti', '+%20 Kazanma Şansı'],
      winBonus: 20
    },
    {
      minPoints: 5000,
      maxPoints: 9999,
      tickets: 25,
      tierName: 'Altın',
      color: 'from-yellow-400 to-yellow-600',
      icon: Crown,
      benefits: ['25 Çekiliş Bileti', '+%50 Kazanma Şansı', 'Öncelikli Ödüller'],
      winBonus: 50
    },
    {
      minPoints: 10000,
      maxPoints: null,
      tickets: 50,
      tierName: 'Elmas',
      color: 'from-cyan-400 via-blue-500 to-purple-600',
      icon: Sparkles,
      benefits: ['50 Çekiliş Bileti', '+%100 Kazanma Şansı', 'Özel Ödüller', 'VIP İlk Hak'],
      winBonus: 100
    }
  ]

  // Prizes with accessory system
  const prizes: Prize[] = [
    {
      id: '1',
      name: 'Apple Watch Series 9',
      brand: 'Apple',
      description: 'GPS + Cellular, 45mm, Gece Yarısı Alüminyum Kasa',
      image: '⌚',
      value: 15999,
      category: 'elektronik',
      stock: 5,
      requiredTickets: 1,
      rarity: 'legendary',
      emoji: '⌚'
    },
    {
      id: '2',
      name: 'AirPods Pro 2',
      brand: 'Apple',
      description: 'Aktif Gürültü Önleme, MagSafe Şarj Kutusu',
      image: '🎧',
      value: 8999,
      category: 'aksesuar',
      stock: 10,
      requiredTickets: 1,
      rarity: 'epic',
      emoji: '🎧',
      isAccessory: true,
      piecesCurrent: 3,
      piecesRequired: 5
    },
    {
      id: '3',
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      description: '256GB, Titanyum Mavi, A17 Pro Chip',
      image: '📱',
      value: 45999,
      category: 'elektronik',
      stock: 2,
      requiredTickets: 1,
      rarity: 'legendary',
      emoji: '📱'
    },
    {
      id: '4',
      name: 'Premium Kulaklık Standı',
      brand: 'QRATEX',
      description: 'Alüminyum, RGB LED, Her yorum için 1 parça kazan!',
      image: '🎧',
      value: 599,
      category: 'aksesuar',
      stock: 50,
      requiredTickets: 0,
      rarity: 'rare',
      emoji: '🎧',
      isAccessory: true,
      piecesCurrent: 8,
      piecesRequired: 10
    },
    {
      id: '5',
      name: 'Sony WH-1000XM5',
      brand: 'Sony',
      description: 'Kablosuz Kulaklık, Premium Gürültü Önleme',
      image: '🎧',
      value: 12999,
      category: 'elektronik',
      stock: 8,
      requiredTickets: 1,
      rarity: 'epic',
      emoji: '🎧'
    },
    {
      id: '6',
      name: 'GoPro Hero 12',
      brand: 'GoPro',
      description: '5.3K Video, Waterproof, HyperSmooth 6.0',
      image: '📷',
      value: 18999,
      category: 'elektronik',
      stock: 6,
      requiredTickets: 1,
      rarity: 'epic',
      emoji: '📷'
    },
    {
      id: '7',
      name: 'Özel Telefon Kılıfı Seti',
      brand: 'QRATEX',
      description: '3\'lü set, Premium deri, Her 50 puan için 1 parça!',
      image: '📱',
      value: 299,
      category: 'aksesuar',
      stock: 100,
      requiredTickets: 0,
      rarity: 'common',
      emoji: '📱',
      isAccessory: true,
      piecesCurrent: 15,
      piecesRequired: 20
    }
  ]

  // Get current tier
  const getCurrentTier = () => {
    return [...ticketTiers].reverse().find(tier => 
      userStats.currentMonthPoints >= tier.minPoints
    ) || ticketTiers[0]
  }

  const currentTier = getCurrentTier()

  // Calculate win chance based on points
  const calculateWinChance = (baseChance: number = 20) => {
    const base = 20 // Base 20% win rate
    const tierBonus = currentTier.winBonus
    const totalChance = Math.min(baseChance + tierBonus, 95) // Max %95
    return totalChance
  }

  // Get next tier
  const getNextTier = () => {
    const currentIndex = ticketTiers.indexOf(currentTier)
    return currentIndex > 0 ? ticketTiers[currentIndex - 1] : null
  }

  const nextTier = getNextTier()

  // Calculate progress to next tier
  const progressToNextTier = () => {
    if (!nextTier) return 100
    const currentMin = currentTier.minPoints
    const nextMin = nextTier.minPoints
    const progress = ((userStats.currentMonthPoints - currentMin) / (nextMin - currentMin)) * 100
    return Math.min(progress, 100)
  }

  // Rarity colors
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-600'
      case 'epic': return 'from-purple-400 via-pink-500 to-purple-600'
      case 'rare': return 'from-blue-400 to-cyan-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'Efsanevi'
      case 'epic': return 'Epik'
      case 'rare': return 'Nadir'
      default: return 'Yaygın'
    }
  }

  // Filter prizes
  const filteredPrizes = selectedCategory === 'all' 
    ? prizes 
    : prizes.filter(p => p.category === selectedCategory)

  // Handle draw with point-based chance
  const handleDraw = (prize: Prize) => {
    if (prize.isAccessory) {
      // Aksesuar için direkt claim
      return
    }

    if (userStats.remainingTickets < prize.requiredTickets) {
      return
    }

    setSelectedPrize(prize)
    setShowDrawModal(true)
  }

  const startDraw = () => {
    if (!selectedPrize) return

    setIsDrawing(true)
    setDrawProgress(0)

    const interval = setInterval(() => {
      setDrawProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            // Puan bazlı şans hesaplama
            const winChance = calculateWinChance()
            const win = Math.random() * 100 < winChance
            
            if (win && selectedPrize) {
              setWonPrize(selectedPrize)
              // Add to history
              const newHistory: DrawHistory = {
                id: Date.now().toString(),
                date: new Date().toLocaleDateString('tr-TR'),
                prizeName: selectedPrize.name,
                prizeEmoji: selectedPrize.emoji,
                prizeValue: selectedPrize.value,
                won: true,
                ticketsUsed: selectedPrize.requiredTickets
              }
              setDrawHistory([newHistory, ...drawHistory])
              
              // Update user stats
              setUserStats(prev => ({
                ...prev,
                remainingTickets: prev.remainingTickets - selectedPrize.requiredTickets,
                usedTickets: prev.usedTickets + selectedPrize.requiredTickets,
                winHistory: prev.winHistory + 1
              }))
            } else {
              setWonPrize(null)
              // Add to history
              const newHistory: DrawHistory = {
                id: Date.now().toString(),
                date: new Date().toLocaleDateString('tr-TR'),
                prizeName: selectedPrize.name,
                prizeEmoji: selectedPrize.emoji,
                prizeValue: selectedPrize.value,
                won: false,
                ticketsUsed: selectedPrize.requiredTickets
              }
              setDrawHistory([newHistory, ...drawHistory])
              
              // Update user stats
              setUserStats(prev => ({
                ...prev,
                remainingTickets: prev.remainingTickets - selectedPrize.requiredTickets,
                usedTickets: prev.usedTickets + selectedPrize.requiredTickets
              }))
            }
            setIsDrawing(false)
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  // Categories
  const categories = [
    { key: 'all', label: 'Tümü', icon: Package },
    { key: 'elektronik', label: 'Elektronik', icon: Smartphone },
    { key: 'aksesuar', label: 'Aksesuar', icon: Gift },
    { key: 'dijital', label: 'Dijital', icon: ShoppingBag }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🎁 Ödül Havuzu" 
          subtitle="Puanlarını kullan, büyük ödüller kazan!"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
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

            {/* Reset Countdown Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
                <CardBody className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          Aylık Reset Yaklaşıyor!
                        </h3>
                        <p className="text-sm text-white/90">
                          Biletlerin ve puanların sıfırlanacak. Fırsatları kaçırma!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-white">{resetInfo.daysRemaining}</p>
                        <p className="text-xs text-white/80">Gün</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-white">{resetInfo.hoursRemaining}</p>
                        <p className="text-xs text-white/80">Saat</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-white">{resetInfo.minutesRemaining}</p>
                        <p className="text-xs text-white/80">Dakika</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <CardBody className="p-8 relative z-10">
                  <div className="flex items-center justify-between flex-wrap gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <PartyPopper className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-1">
                            Aylık Büyük Çekiliş! 🎉
                          </h2>
                          <p className="text-white/90 text-lg">
                            Bu ay {prizes.length} farklı ödül kazanma şansın var!
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <Chip 
                          size="lg" 
                          className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30"
                          startContent={<Ticket className="w-4 h-4" />}
                        >
                          {userStats.remainingTickets} Biletiniz Var
                        </Chip>
                        <Chip 
                          size="lg" 
                          className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30"
                          startContent={<Percent className="w-4 h-4" />}
                        >
                          %{calculateWinChance()} Kazanma Şansı
                        </Chip>
                        <Chip 
                          size="lg" 
                          className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30"
                          startContent={<Users className="w-4 h-4" />}
                        >
                          12,458 Katılımcı
                        </Chip>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎁</div>
                      <p className="text-white/90 text-sm">
                        Toplam Değer
                      </p>
                      <p className="text-4xl font-bold text-white">
                        ₺205K+
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* User Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-4 md:p-6">
                    <div className="flex flex-col space-y-2">
                      <Zap className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
                      <div>
                        <p className="text-xs md:text-sm text-white opacity-90 mb-1">Bu Ay Puanın</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{userStats.currentMonthPoints.toLocaleString()}</h3>
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
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-4 md:p-6">
                    <div className="flex flex-col space-y-2">
                      <Ticket className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
                      <div>
                        <p className="text-xs md:text-sm text-white opacity-90 mb-1">Biletlerin</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{userStats.remainingTickets}</h3>
                        <p className="text-xs text-white opacity-75">/{userStats.totalTickets} toplam</p>
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
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-4 md:p-6">
                    <div className="flex flex-col space-y-2">
                      <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
                      <div>
                        <p className="text-xs md:text-sm text-white opacity-90 mb-1">Kazandığın Ödül</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{userStats.winHistory}</h3>
                        <p className="text-xs text-white opacity-75">Bu yıl</p>
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
                <Card className={`bg-gradient-to-br ${currentTier.color}`}>
                  <CardBody className="p-4 md:p-6">
                    <div className="flex flex-col space-y-2">
                      <currentTier.icon className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
                      <div>
                        <p className="text-xs md:text-sm text-white opacity-90 mb-1">Seviyeniz</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{currentTier.tierName}</h3>
                        <p className="text-xs text-white opacity-75">+%{currentTier.winBonus} şans bonusu</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Main Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardBody className="p-0">
                  <Tabs 
                    aria-label="Ödül Havuzu Sekmeleri"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as string)}
                    classNames={{
                      tabList: "w-full p-2",
                      cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                      tab: "px-6",
                      tabContent: "group-data-[selected=true]:text-white"
                    }}
                  >
                    <Tab 
                      key="prizes" 
                      title={
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4" />
                          <span>Ödüller</span>
                        </div>
                      }
                    />
                    <Tab 
                      key="history" 
                      title={
                        <div className="flex items-center gap-2">
                          <History className="w-4 h-4" />
                          <span>Geçmiş</span>
                          <Badge color="danger" size="sm">{drawHistory.length}</Badge>
                        </div>
                      }
                    />
                    <Tab 
                      key="tiers" 
                      title={
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          <span>Seviyeler</span>
                        </div>
                      }
                    />
                  </Tabs>
                </CardBody>
              </Card>
            </motion.div>

            {/* Tab Content */}
            {activeTab === 'prizes' && (
              <>
                {/* Category Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardBody className="p-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        {categories.map((cat) => {
                          const Icon = cat.icon
                          return (
                            <Button
                              key={cat.key}
                              variant={selectedCategory === cat.key ? 'solid' : 'flat'}
                              color={selectedCategory === cat.key ? 'primary' : 'default'}
                              startContent={<Icon className="w-4 h-4" />}
                              onClick={() => setSelectedCategory(cat.key)}
                            >
                              {cat.label}
                            </Button>
                          )
                        })}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Prizes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrizes.map((prize, index) => {
                    const canDraw = prize.isAccessory 
                      ? (prize.piecesCurrent || 0) >= (prize.piecesRequired || 0)
                      : userStats.remainingTickets >= prize.requiredTickets

                    return (
                      <motion.div
                        key={prize.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`hover:shadow-2xl transition-all hover:scale-[1.02] relative overflow-hidden`}>
                          {/* Rarity Glow */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(prize.rarity)} opacity-10`}></div>
                          
                          {/* Accessory Badge */}
                          {prize.isAccessory && (
                            <Chip 
                              size="sm" 
                              color="warning" 
                              className="absolute top-3 left-3 z-10"
                              startContent={<Sparkles className="w-3 h-3" />}
                            >
                              Aksesuar
                            </Chip>
                          )}

                          {/* Stock Badge */}
                          {!prize.isAccessory && prize.stock <= 5 && (
                            <Chip 
                              size="sm" 
                              color="danger" 
                              className="absolute top-3 right-3 z-10"
                              startContent={<Flame className="w-3 h-3" />}
                            >
                              Son {prize.stock} Adet!
                            </Chip>
                          )}

                          <CardBody className="p-6 relative z-10">
                            {/* Prize Image */}
                            <div className="text-center mb-4">
                              <div className={`text-8xl mb-3 filter ${canDraw ? '' : 'grayscale'}`}>
                                {prize.emoji}
                              </div>
                              <Chip 
                                size="sm" 
                                className={`bg-gradient-to-r ${getRarityColor(prize.rarity)} text-white font-bold`}
                              >
                                {getRarityLabel(prize.rarity)}
                              </Chip>
                            </div>

                            {/* Accessory Progress */}
                            {prize.isAccessory && (
                              <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-semibold">Parça İlerlemen</span>
                                  <span className="text-sm font-bold text-orange-600">
                                    {prize.piecesCurrent}/{prize.piecesRequired}
                                  </span>
                                </div>
                                <Progress 
                                  value={((prize.piecesCurrent || 0) / (prize.piecesRequired || 1)) * 100}
                                  color="warning"
                                  className="h-2"
                                />
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                  🎯 Yorum yap veya puan kazan, parçaları tamamla!
                                </p>
                              </div>
                            )}

                            {/* Prize Info */}
                            <div className="mb-4">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {prize.brand}
                              </p>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {prize.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {prize.description}
                              </p>
                              
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Değeri</p>
                                  <p className="text-xl font-bold text-green-600">
                                    ₺{prize.value.toLocaleString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {prize.isAccessory ? 'Birikimli' : 'Gerekli Bilet'}
                                  </p>
                                  <p className="text-xl font-bold text-purple-600">
                                    {prize.isAccessory ? '🎁' : `${prize.requiredTickets} 🎫`}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button
                                variant="flat"
                                className="flex-1"
                                onClick={() => {
                                  setSelectedPrize(prize)
                                  setShowPrizeModal(true)
                                }}
                              >
                                Detaylar
                              </Button>
                              <Button
                                color="primary"
                                className={`flex-1 ${!canDraw ? 'opacity-50' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                                onClick={() => handleDraw(prize)}
                                isDisabled={!canDraw}
                                endContent={!canDraw ? <Lock className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                              >
                                {prize.isAccessory 
                                  ? (canDraw ? 'Talep Et' : 'Parça Topla')
                                  : (canDraw ? 'Çekilişe Kat' : 'Bilet Gerekli')
                                }
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Çekiliş Geçmişin
                    </h3>
                    
                    {drawHistory.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎰</div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          Henüz çekiliş geçmişin yok
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          İlk çekilişine katıl ve şansını dene!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {drawHistory.map((history) => (
                          <motion.div
                            key={history.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <Card className={history.won 
                              ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700'
                              : 'bg-gray-50 dark:bg-gray-800'
                            }>
                              <CardBody className="p-4">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                  <div className="flex items-center gap-4">
                                    <div className="text-5xl">
                                      {history.prizeEmoji}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                                        {history.prizeName}
                                      </h4>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {history.date}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-500">
                                        {history.ticketsUsed} bilet kullanıldı
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <div className="text-right">
                                      <p className="text-sm text-gray-600 dark:text-gray-400">Değer</p>
                                      <p className="text-lg font-bold text-green-600">
                                        ₺{history.prizeValue.toLocaleString()}
                                      </p>
                                    </div>
                                    
                                    {history.won ? (
                                      <Chip 
                                        color="success" 
                                        size="lg"
                                        startContent={<CheckCircle className="w-4 h-4" />}
                                        className="font-bold"
                                      >
                                        KAZANDIN! 🎉
                                      </Chip>
                                    ) : (
                                      <Chip 
                                        color="default" 
                                        size="lg"
                                        startContent={<TrendingDown className="w-4 h-4" />}
                                      >
                                        Kazanamadın
                                      </Chip>
                                    )}
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Tiers Tab */}
            {activeTab === 'tiers' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          Bilet Seviyesi İlerlemen
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Daha fazla puan kazan, daha çok bilet hakkı ve şans bonusu kazan!
                        </p>
                      </div>
                      {nextTier && (
                        <Chip color="primary" variant="flat" size="lg">
                          {nextTier.minPoints - userStats.currentMonthPoints} puan kaldı
                        </Chip>
                      )}
                    </div>

                    {nextTier && (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {currentTier.tierName} (+%{currentTier.winBonus})
                          </span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {nextTier.tierName} (+%{nextTier.winBonus})
                          </span>
                        </div>
                        <Progress 
                          value={progressToNextTier()} 
                          className="h-3 mb-6"
                          classNames={{
                            indicator: `bg-gradient-to-r ${nextTier.color}`
                          }}
                        />
                      </>
                    )}

                    {/* Tier Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {[...ticketTiers].reverse().map((tier, index) => {
                        const isUnlocked = userStats.currentMonthPoints >= tier.minPoints
                        const Icon = tier.icon

                        return (
                          <motion.div
                            key={tier.tierName}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className={`${isUnlocked ? `bg-gradient-to-br ${tier.color}` : 'bg-gray-200 dark:bg-gray-800'} transition-all h-full`}>
                              <CardBody className="p-6">
                                <div className="text-center">
                                  {isUnlocked ? (
                                    <Icon className="w-12 h-12 text-white mx-auto mb-3" />
                                  ) : (
                                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                  )}
                                  <p className={`text-lg font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'} mb-2`}>
                                    {tier.tierName}
                                  </p>
                                  <p className={`text-3xl font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'} mb-2`}>
                                    {tier.tickets} 🎫
                                  </p>
                                  <p className={`text-sm ${isUnlocked ? 'text-white/80' : 'text-gray-400'} mb-3`}>
                                    {tier.minPoints.toLocaleString()}+ puan
                                  </p>
                                  
                                  {/* Benefits */}
                                  <div className="space-y-1">
                                    {tier.benefits.map((benefit, i) => (
                                      <p key={i} className={`text-xs ${isUnlocked ? 'text-white/90' : 'text-gray-500'}`}>
                                        {benefit}
                                      </p>
                                    ))}
                                    {tier.winBonus > 0 && (
                                      <Chip 
                                        size="sm" 
                                        className={isUnlocked ? 'bg-white/20 text-white mt-2' : 'bg-gray-300 text-gray-600 mt-2'}
                                      >
                                        +%{tier.winBonus} Şans
                                      </Chip>
                                    )}
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Info */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-blue-900 dark:text-blue-200">
                          <strong>Puan bazlı şans sistemi:</strong> Daha fazla puan = Daha yüksek seviye = Daha fazla kazanma şansı! 
                          Elmas seviyede %100 şans bonusu var. Şu anki kazanma şansın: <strong>%{calculateWinChance()}</strong>
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

      {/* Modals - Prize Detail, Draw etc. */}
      {/* ... (Previous modals remain the same) ... */}
    </div>
  )
}

export default RewardPoolPage

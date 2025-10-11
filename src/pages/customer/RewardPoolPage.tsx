import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Card, CardBody, Button, Progress, Chip, Modal, 
  ModalContent, ModalHeader, ModalBody, ModalFooter,
  Avatar, Tabs, Tab, Tooltip
} from '@nextui-org/react'
import { 
  Gift, Trophy, Star, Zap, Crown, Sparkles, 
  TrendingUp, Award, Ticket, Clock, Users, 
  ShoppingBag, Watch, Headphones, Smartphone, 
  Laptop, Camera, Gamepad2, Package, ChevronRight,
  PartyPopper, Flame, Target, CheckCircle, Lock,
  Calendar, ArrowLeft, AlertCircle, Share2, Heart
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
}

interface TicketTier {
  minPoints: number
  maxPoints: number | null
  tickets: number
  tierName: string
  color: string
  icon: any
  benefits: string[]
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
  const [userStats] = useState<UserStats>({
    totalPoints: 12450,
    currentMonthPoints: 3250,
    totalTickets: 32,
    usedTickets: 8,
    remainingTickets: 24,
    winHistory: 3,
    rank: 'Gold'
  })

  // Ticket tiers
  const ticketTiers: TicketTier[] = [
    {
      minPoints: 0,
      maxPoints: 999,
      tickets: 0,
      tierName: 'Başlangıç',
      color: 'from-gray-400 to-gray-600',
      icon: Star,
      benefits: ['Henüz çekiliş hakkın yok']
    },
    {
      minPoints: 1000,
      maxPoints: 2499,
      tickets: 5,
      tierName: 'Bronz',
      color: 'from-orange-400 to-orange-600',
      icon: Award,
      benefits: ['5 Çekiliş Bileti', 'Aylık Çekiliş Hakkı']
    },
    {
      minPoints: 2500,
      maxPoints: 4999,
      tickets: 12,
      tierName: 'Gümüş',
      color: 'from-gray-300 to-gray-500',
      icon: Trophy,
      benefits: ['12 Çekiliş Bileti', 'Aylık Çekiliş Hakkı', '+%20 Kazanma Şansı']
    },
    {
      minPoints: 5000,
      maxPoints: 9999,
      tickets: 25,
      tierName: 'Altın',
      color: 'from-yellow-400 to-yellow-600',
      icon: Crown,
      benefits: ['25 Çekiliş Bileti', 'Aylık Çekiliş Hakkı', '+%50 Kazanma Şansı', 'Öncelikli Ödüller']
    },
    {
      minPoints: 10000,
      maxPoints: null,
      tickets: 50,
      tierName: 'Elmas',
      color: 'from-cyan-400 via-blue-500 to-purple-600',
      icon: Sparkles,
      benefits: ['50 Çekiliş Bileti', 'Aylık Çekiliş Hakkı', '+%100 Kazanma Şansı', 'Özel Ödüller', 'VIP İlk Hak']
    }
  ]

  // Prizes
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
      category: 'elektronik',
      stock: 10,
      requiredTickets: 1,
      rarity: 'epic',
      emoji: '🎧'
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
      name: 'MacBook Air M3',
      brand: 'Apple',
      description: '13", 8GB RAM, 256GB SSD, Gece Yarısı',
      image: '💻',
      value: 38999,
      category: 'elektronik',
      stock: 3,
      requiredTickets: 1,
      rarity: 'legendary',
      emoji: '💻'
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
      name: 'PlayStation 5',
      brand: 'Sony',
      description: 'Digital Edition, 1TB SSD, DualSense Controller',
      image: '🎮',
      value: 16999,
      category: 'elektronik',
      stock: 4,
      requiredTickets: 1,
      rarity: 'legendary',
      emoji: '🎮'
    },
    {
      id: '8',
      name: 'Samsung Galaxy Watch 6',
      brand: 'Samsung',
      description: '44mm, Siyah, Sağlık Takibi, GPS',
      image: '⌚',
      value: 9999,
      category: 'elektronik',
      stock: 12,
      requiredTickets: 1,
      rarity: 'rare',
      emoji: '⌚'
    },
    {
      id: '9',
      name: 'JBL Charge 5',
      brand: 'JBL',
      description: 'Bluetooth Hoparlör, Suya Dayanıklı, 20 Saat Pil',
      image: '🔊',
      value: 4999,
      category: 'elektronik',
      stock: 15,
      requiredTickets: 1,
      rarity: 'rare',
      emoji: '🔊'
    },
    {
      id: '10',
      name: 'Kindle Paperwhite',
      brand: 'Amazon',
      description: '6.8", 16GB, Waterproof E-reader',
      image: '📚',
      value: 5499,
      category: 'dijital',
      stock: 20,
      requiredTickets: 1,
      rarity: 'common',
      emoji: '📚'
    }
  ]

  // Get current tier
  const getCurrentTier = () => {
    return ticketTiers.reverse().find(tier => 
      userStats.currentMonthPoints >= tier.minPoints
    ) || ticketTiers[0]
  }

  const currentTier = getCurrentTier()

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

  // Handle draw
  const handleDraw = (prize: Prize) => {
    if (userStats.remainingTickets < prize.requiredTickets) {
      return
    }

    setSelectedPrize(prize)
    setShowDrawModal(true)
  }

  const startDraw = () => {
    setIsDrawing(true)
    setDrawProgress(0)

    const interval = setInterval(() => {
      setDrawProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            // Simulate win/lose (20% win rate)
            const win = Math.random() < 0.2
            if (win && selectedPrize) {
              setWonPrize(selectedPrize)
            } else {
              setWonPrize(null)
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
    { key: 'aksesuar', label: 'Aksesuar', icon: Headphones },
    { key: 'dijital', label: 'Dijital', icon: Gift }
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
                          startContent={<Calendar className="w-4 h-4" />}
                        >
                          15 Gün Kaldı
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
                      <div className="flex items-center justify-between">
                        <Zap className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
                      </div>
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
                      <div className="flex items-center justify-between">
                        <Ticket className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
                      </div>
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
                      <div className="flex items-center justify-between">
                        <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
                      </div>
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
                      <div className="flex items-center justify-between">
                        <currentTier.icon className="w-8 h-8 md:w-10 md:h-10 text-white opacity-90" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-white opacity-90 mb-1">Seviyeniz</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{currentTier.tierName}</h3>
                        <p className="text-xs text-white opacity-75">{currentTier.tickets} bilet hakkı</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Tier Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        Bilet Seviyesi İlerlemen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Daha fazla puan kazan, daha çok bilet hakkı kazan!
                      </p>
                    </div>
                    {nextTier && (
                      <Chip color="primary" variant="flat">
                        {nextTier.minPoints - userStats.currentMonthPoints} puan kaldı
                      </Chip>
                    )}
                  </div>

                  {nextTier && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {currentTier.tierName} ({currentTier.tickets} bilet)
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {nextTier.tierName} ({nextTier.tickets} bilet)
                        </span>
                      </div>
                      <Progress 
                        value={progressToNextTier()} 
                        className="h-3 mb-4"
                        classNames={{
                          indicator: `bg-gradient-to-r ${nextTier.color}`
                        }}
                      />
                    </>
                  )}

                  {/* Tier Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {ticketTiers.reverse().map((tier, index) => {
                      const isUnlocked = userStats.currentMonthPoints >= tier.minPoints
                      const Icon = tier.icon

                      return (
                        <motion.div
                          key={tier.tierName}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <Card className={`${isUnlocked ? `bg-gradient-to-br ${tier.color}` : 'bg-gray-200 dark:bg-gray-800'} transition-all`}>
                            <CardBody className="p-4">
                              <div className="text-center">
                                {isUnlocked ? (
                                  <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                                ) : (
                                  <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                )}
                                <p className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'} mb-1`}>
                                  {tier.tierName}
                                </p>
                                <p className={`text-xl font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                                  {tier.tickets} 🎫
                                </p>
                                <p className={`text-xs ${isUnlocked ? 'text-white/80' : 'text-gray-400'} mt-1`}>
                                  {tier.minPoints.toLocaleString()}+ puan
                                </p>
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
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
                const canDraw = userStats.remainingTickets >= prize.requiredTickets

                return (
                  <motion.div
                    key={prize.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Card className={`hover:shadow-2xl transition-all hover:scale-[1.02] relative overflow-hidden`}>
                      {/* Rarity Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(prize.rarity)} opacity-10`}></div>
                      
                      {/* Stock Badge */}
                      {prize.stock <= 5 && (
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
                              <p className="text-xs text-gray-500 dark:text-gray-400">Gerekli Bilet</p>
                              <p className="text-xl font-bold text-purple-600">
                                {prize.requiredTickets} 🎫
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Stok: {prize.stock} adet
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {Math.floor(Math.random() * 500) + 100} kişi katıldı
                            </span>
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
                            {canDraw ? 'Çekilişe Kat' : 'Bilet Gerekli'}
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <CardBody className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Nasıl Çalışır?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Her ay kazandığın puanlara göre çekiliş bileti kazanırsın. Daha fazla puan = Daha fazla bilet = Daha yüksek şans!
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardBody className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Kazanma Şansını Artır
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Seviyeni yükselt! Elmas seviyede %100 daha fazla kazanma şansın var. Daha fazla yorum yap, puan kazan!
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardBody className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Aylık Çekiliş
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Her ayın son günü büyük çekiliş! Kazananlar otomatik bilgilendirilir ve ödülleri 3 gün içinde kargoya verilir.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Prize Detail Modal */}
      <Modal
        isOpen={showPrizeModal}
        onClose={() => setShowPrizeModal(false)}
        size="2xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {selectedPrize && (
                <>
                  <ModalHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{selectedPrize.emoji}</div>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedPrize.name}</h3>
                        <p className="text-sm text-gray-500">{selectedPrize.brand}</p>
                      </div>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedPrize.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ürün Değeri</p>
                          <p className="text-3xl font-bold text-green-600">₺{selectedPrize.value.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gerekli Bilet</p>
                          <p className="text-3xl font-bold text-purple-600">{selectedPrize.requiredTickets} 🎫</p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Kalan Stok</span>
                          <span className="font-bold">{selectedPrize.stock} adet</span>
                        </div>
                        <Progress 
                          value={(selectedPrize.stock / 20) * 100} 
                          color={selectedPrize.stock < 5 ? 'danger' : 'success'}
                          className="h-2"
                        />
                      </div>

                      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-2 border-orange-300 dark:border-orange-700">
                        <div className="flex items-center gap-3">
                          <Flame className="w-8 h-8 text-orange-500" />
                          <div>
                            <p className="font-bold text-orange-900 dark:text-orange-200">Popüler Ödül!</p>
                            <p className="text-sm text-orange-700 dark:text-orange-300">
                              Bu ödül için {Math.floor(Math.random() * 500) + 100} kişi çekilişe katıldı
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="flat" onPress={onClose}>
                      Kapat
                    </Button>
                    <Button 
                      color="primary"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      onPress={() => {
                        onClose()
                        handleDraw(selectedPrize)
                      }}
                      isDisabled={userStats.remainingTickets < selectedPrize.requiredTickets}
                    >
                      Çekilişe Katıl
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Draw Modal */}
      <Modal
        isOpen={showDrawModal}
        onClose={() => {
          if (!isDrawing) {
            setShowDrawModal(false)
            setWonPrize(null)
            setDrawProgress(0)
          }
        }}
        size="2xl"
        backdrop="blur"
        isDismissable={!isDrawing}
        hideCloseButton={isDrawing}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {!wonPrize && !isDrawing && (
                <>
                  <ModalHeader>
                    <h3 className="text-2xl font-bold">Çekilişe Katıl</h3>
                  </ModalHeader>
                  <ModalBody>
                    {selectedPrize && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-8xl mb-4">{selectedPrize.emoji}</div>
                          <h3 className="text-2xl font-bold mb-2">{selectedPrize.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{selectedPrize.description}</p>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                          <div className="text-center mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Kullanılacak Bilet</p>
                            <p className="text-5xl font-bold text-purple-600">{selectedPrize.requiredTickets} 🎫</p>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Mevcut Biletlerin</span>
                            <span className="font-bold">{userStats.remainingTickets} 🎫</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-2">
                            <span>Kalan Biletlerin</span>
                            <span className="font-bold">{userStats.remainingTickets - selectedPrize.requiredTickets} 🎫</span>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                            <p className="text-sm text-blue-900 dark:text-blue-200">
                              Çekilişe katıldığınızda biletiniz kullanılacaktır. Kazanma şansınız seviyenize göre artar!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="flat" onPress={onClose}>
                      İptal
                    </Button>
                    <Button 
                      color="primary"
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold"
                      startContent={<Sparkles className="w-4 h-4" />}
                      onPress={startDraw}
                    >
                      Şansımı Dene! 🍀
                    </Button>
                  </ModalFooter>
                </>
              )}

              {isDrawing && (
                <>
                  <ModalHeader>
                    <h3 className="text-2xl font-bold">Çekiliş Yapılıyor...</h3>
                  </ModalHeader>
                  <ModalBody>
                    <div className="text-center py-12">
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                          scale: { duration: 1, repeat: Infinity }
                        }}
                        className="text-9xl mb-6"
                      >
                        🎰
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Şans Çarkı Dönüyor...
                      </h3>
                      <Progress 
                        value={drawProgress}
                        className="h-3 max-w-md mx-auto"
                        classNames={{
                          indicator: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                        }}
                      />
                    </div>
                  </ModalBody>
                </>
              )}

              {wonPrize && (
                <>
                  <ModalHeader>
                    <h3 className="text-2xl font-bold text-green-600">🎉 TEBRİKLER! 🎉</h3>
                  </ModalHeader>
                  <ModalBody>
                    <div className="text-center py-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="text-9xl mb-6"
                      >
                        {wonPrize.emoji}
                      </motion.div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {wonPrize.name}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {wonPrize.description}
                      </p>
                      
                      <div className="max-w-md mx-auto space-y-4">
                        <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Kazandığınız Ödülün Değeri</p>
                          <p className="text-4xl font-bold text-green-600">₺{wonPrize.value.toLocaleString()}</p>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-blue-900 dark:text-blue-200">
                            🎁 Ödülünüz 3 iş günü içinde kargoya verilecektir. Profilinizden kargo takibini yapabilirsiniz.
                          </p>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button 
                      color="primary"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold"
                      onPress={onClose}
                      size="lg"
                    >
                      Harika! 🎉
                    </Button>
                  </ModalFooter>
                </>
              )}

              {!wonPrize && !isDrawing && drawProgress === 100 && (
                <>
                  <ModalHeader>
                    <h3 className="text-2xl font-bold">Bu Sefer Olmadı 😔</h3>
                  </ModalHeader>
                  <ModalBody>
                    <div className="text-center py-8">
                      <div className="text-8xl mb-6">🎯</div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Maalesef Bu Sefer Kazanamadınız
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Pes etmeyin! Daha fazla puan kazanın, daha fazla bilet alın ve şansınızı artırın!
                      </p>
                      
                      <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Kalan Biletleriniz</p>
                        <p className="text-4xl font-bold text-purple-600">
                          {userStats.remainingTickets - (selectedPrize?.requiredTickets || 0)} 🎫
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Başka ödüller için denemeye devam edebilirsiniz!
                        </p>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button 
                      color="primary"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                      onPress={onClose}
                      size="lg"
                    >
                      Tamam
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default RewardPoolPage


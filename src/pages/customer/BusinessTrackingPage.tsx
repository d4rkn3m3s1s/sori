import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Input, Tabs, Tab } from '@nextui-org/react'
import { 
  Heart, MapPin, Star, Bell, BellOff, Search, Clock, MessageSquare, 
  Eye, TrendingUp, Filter, Coffee, ShoppingBag, Utensils, Tag,
  Percent, Gift, Navigation, ArrowLeft
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface Business {
  id: string
  name: string
  category: string
  location: string
  rating: number
  commentCount: number
  following: boolean
  lastVisit?: Date
  checkIns: number
  notifications: boolean
  hasNewUpdate: boolean
  distance?: string
  image?: string
  campaign?: string
  discount?: number
  isOpen?: boolean
}

function BusinessTrackingPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: '1',
      name: 'Starbucks Kadıköy',
      category: 'Kafe',
      location: 'Kadıköy, İstanbul',
      rating: 4.8,
      commentCount: 234,
      following: true,
      lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      checkIns: 12,
      notifications: true,
      hasNewUpdate: true,
      distance: '1.2 km',
      campaign: 'Her 3. kahve hediye!',
      discount: 15,
      isOpen: true
    },
    {
      id: '2',
      name: 'Mado Beyoğlu',
      category: 'Restoran',
      location: 'Beyoğlu, İstanbul',
      rating: 4.6,
      commentCount: 189,
      following: true,
      lastVisit: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      checkIns: 8,
      notifications: false,
      hasNewUpdate: false,
      distance: '3.5 km',
      isOpen: true
    },
    {
      id: '3',
      name: 'CarrefourSA Nişantaşı',
      category: 'Market',
      location: 'Şişli, İstanbul',
      rating: 4.5,
      commentCount: 156,
      following: true,
      lastVisit: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      checkIns: 15,
      notifications: true,
      hasNewUpdate: true,
      distance: '2.1 km',
      discount: 10,
      isOpen: true
    },
    {
      id: '4',
      name: 'Burger King Etiler',
      category: 'Fast Food',
      location: 'Etiler, İstanbul',
      rating: 4.3,
      commentCount: 312,
      following: true,
      lastVisit: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      checkIns: 6,
      notifications: true,
      hasNewUpdate: true,
      distance: '1.8 km',
      campaign: 'Whopper Menü %25 indirimli',
      discount: 25,
      isOpen: true
    },
    {
      id: '5',
      name: 'Zara Zorlu Center',
      category: 'Giyim',
      location: 'Zorlu Center, İstanbul',
      rating: 4.7,
      commentCount: 523,
      following: true,
      lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      checkIns: 4,
      notifications: false,
      hasNewUpdate: false,
      distance: '4.2 km',
      campaign: 'Sezon sonu indirimle',
      discount: 40,
      isOpen: true
    },
    {
      id: '6',
      name: 'Teknosa Bağdat Caddesi',
      category: 'Elektronik',
      location: 'Bağdat Cad., İstanbul',
      rating: 4.4,
      commentCount: 187,
      following: true,
      lastVisit: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      checkIns: 3,
      notifications: true,
      hasNewUpdate: true,
      distance: '2.9 km',
      campaign: 'Akıllı saatlerde özel fiyatlar',
      discount: 20,
      isOpen: true
    }
  ])

  const followingBusinesses = businesses.filter(b => b.following)

  const toggleFollow = (id: string) => {
    setBusinesses(businesses.map(b => 
      b.id === id ? { ...b, following: !b.following } : b
    ))
  }

  const toggleNotifications = (id: string) => {
    setBusinesses(businesses.map(b => 
      b.id === id ? { ...b, notifications: !b.notifications } : b
    ))
  }

  const checkIn = (id: string) => {
    setBusinesses(businesses.map(b => 
      b.id === id ? { ...b, checkIns: b.checkIns + 1, lastVisit: new Date() } : b
    ))
  }

  const formatLastVisit = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Bugün'
    if (days === 1) return 'Dün'
    if (days < 7) return `${days} gün önce`
    return date.toLocaleDateString('tr-TR')
  }

  const categories = [
    { key: 'all', label: 'Tümü', icon: ShoppingBag },
    { key: 'Kafe', label: 'Kafe', icon: Coffee },
    { key: 'Restoran', label: 'Restoran', icon: Utensils },
    { key: 'Market', label: 'Market', icon: ShoppingBag },
    { key: 'Fast Food', label: 'Fast Food', icon: Utensils },
    { key: 'Giyim', label: 'Giyim', icon: Tag },
    { key: 'Elektronik', label: 'Elektronik', icon: ShoppingBag }
  ]

  const filteredBusinesses = businesses.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory
    const matchesFollowing = b.following
    return matchesSearch && matchesCategory && matchesFollowing
  })

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="💼 İşletme Takibi" 
          subtitle="Favori işletmelerini takip et"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
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
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Takip Edilen</p>
                        <p className="text-4xl font-bold">{followingBusinesses.length}</p>
                        <p className="text-sm">İşletme</p>
                      </div>
                      <Heart className="w-16 h-16 opacity-20 fill-white" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Check-in</p>
                        <p className="text-4xl font-bold">
                          {followingBusinesses.reduce((sum, b) => sum + b.checkIns, 0)}
                        </p>
                        <p className="text-sm">Toplam</p>
                      </div>
                      <MapPin className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Bildirim</p>
                        <p className="text-4xl font-bold">
                          {followingBusinesses.filter(b => b.notifications).length}
                        </p>
                        <p className="text-sm">Aktif</p>
                      </div>
                      <Bell className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Yeni Güncelleme</p>
                        <p className="text-4xl font-bold">
                          {followingBusinesses.filter(b => b.hasNewUpdate).length}
                        </p>
                        <p className="text-sm">İşletme</p>
                      </div>
                      <TrendingUp className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardBody className="p-4 space-y-4">
                <Input
                  placeholder="İşletme veya konum ara..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  size="lg"
                />
                
                {/* Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon
                    return (
                      <Button
                        key={cat.key}
                        size="sm"
                        variant={selectedCategory === cat.key ? 'solid' : 'flat'}
                        color={selectedCategory === cat.key ? 'primary' : 'default'}
                        startContent={<Icon className="w-4 h-4" />}
                        onClick={() => setSelectedCategory(cat.key)}
                        className="flex-shrink-0"
                      >
                        {cat.label}
                      </Button>
                    )
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Following Businesses */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredBusinesses.filter(b => b.following).map((business, index) => (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-xl transition-all">
                      <CardBody className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Business Icon */}
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                            {business.category === 'Kafe' ? '☕' : business.category === 'Restoran' ? '🍽️' : '🛒'}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {business.name}
                                  </h3>
                                  {business.hasNewUpdate && (
                                    <Chip size="sm" color="danger" variant="flat">Yeni</Chip>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                  <MapPin className="w-4 h-4" />
                                  <span>{business.location}</span>
                                  {business.distance && (
                                    <>
                                      <span>•</span>
                                      <span>{business.distance}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <Button
                                isIconOnly
                                variant="light"
                                color={business.following ? 'danger' : 'default'}
                                onPress={() => toggleFollow(business.id)}
                              >
                                <Heart className={`w-5 h-5 ${business.following ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                            </div>

                            <div className="flex items-center space-x-4 mb-4">
                              <Chip size="sm" variant="flat">{business.category}</Chip>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-bold">{business.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                                <MessageSquare className="w-4 h-4" />
                                <span>{business.commentCount}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>{business.checkIns} check-in</span>
                              </div>
                            </div>

                            {business.lastVisit && (
                              <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span>Son ziyaret: {formatLastVisit(business.lastVisit)}</span>
                              </div>
                            )}

                            {/* Campaign/Discount */}
                            {(business.campaign || business.discount) && (
                              <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                                <div className="flex items-start gap-2">
                                  {business.discount && (
                                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                                      <Percent className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    {business.discount && (
                                      <div className="flex items-center gap-2 mb-1">
                                        <Chip size="sm" color="warning" variant="solid">
                                          %{business.discount} İndirim
                                        </Chip>
                                        {business.isOpen && (
                                          <Chip size="sm" color="success" variant="dot">
                                            Açık
                                          </Chip>
                                        )}
                                      </div>
                                    )}
                                    {business.campaign && (
                                      <p className="text-sm font-medium text-orange-900 dark:text-orange-200">
                                        🎁 {business.campaign}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                startContent={<MapPin className="w-4 h-4" />}
                                onPress={() => checkIn(business.id)}
                              >
                                Check-in
                              </Button>
                              <Button
                                size="sm"
                                variant="flat"
                                startContent={business.notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                                onPress={() => toggleNotifications(business.id)}
                              >
                                {business.notifications ? 'Bildirimler Açık' : 'Bildirimleri Aç'}
                              </Button>
                              <Button
                                size="sm"
                                variant="flat"
                                startContent={<Eye className="w-4 h-4" />}
                              >
                                Detaylar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardBody className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                      💡 İşletme Takibi İpuçları
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Favori işletmelerini takip et, yeni kampanyalardan haberdar ol</li>
                      <li>• Check-in yaparak özel puanlar kazan</li>
                      <li>• Bildirimler açık kal, özel fırsatları kaçırma</li>
                      <li>• Düzenli ziyaret ettiğin yerler için sadakat rozetleri kazan</li>
                    </ul>
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

export default BusinessTrackingPage


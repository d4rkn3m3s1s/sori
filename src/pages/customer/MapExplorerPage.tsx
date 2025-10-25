import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Input, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tabs, Tab } from '@nextui-org/react'
import { 
  Map, MapPin, Navigation, Star, Award, Gift, 
  Search, Filter, TrendingUp, Zap, Clock, CheckCircle,
  ArrowLeft, Target, Sparkles, Trophy, Heart, Coffee,
  ShoppingBag, Utensils, BookOpen, Dumbbell, Play, X
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useNavigate } from 'react-router-dom'

// İşletme tipi
interface Business {
  id: string
  name: string
  category: 'cafe' | 'restaurant' | 'shop' | 'gym' | 'bookstore'
  coordinates: { lat: number; lng: number }
  distance: number // metre
  rating: number
  reviews: number
  isNew: boolean
  hasBonus: boolean
  bonusPoints: number
  address: string
  description: string
  isVisited: boolean
  lastVisit?: Date
  visitCount: number
  badges: string[]
}

// Check-in tipi
interface CheckIn {
  id: string
  businessId: string
  businessName: string
  timestamp: Date
  points: number
  bonus?: string
}

// Mock işletmeler
const mockBusinesses: Business[] = [
  {
    id: 'biz-1',
    name: 'Starbucks Kadıköy',
    category: 'cafe',
    coordinates: { lat: 40.9903, lng: 29.0253 },
    distance: 45,
    rating: 4.8,
    reviews: 1240,
    isNew: false,
    hasBonus: true,
    bonusPoints: 50,
    address: 'Kadıköy, Moda Cad. No:45',
    description: 'Özel kahve çeşitleri ve rahat ortam',
    isVisited: true,
    lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    visitCount: 8,
    badges: ['Kahve Ustası', 'Sadık Müşteri']
  },
  {
    id: 'biz-2',
    name: 'McDonald\'s Bağdat Cad.',
    category: 'restaurant',
    coordinates: { lat: 40.9853, lng: 29.0353 },
    distance: 120,
    rating: 4.5,
    reviews: 890,
    isNew: false,
    hasBonus: false,
    bonusPoints: 25,
    address: 'Bağdat Cad. No:123',
    description: 'Fast food favorileri',
    isVisited: true,
    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    visitCount: 3,
    badges: []
  },
  {
    id: 'biz-3',
    name: 'Nike Store Zorlu Center',
    category: 'shop',
    coordinates: { lat: 41.0553, lng: 29.0153 },
    distance: 230,
    rating: 4.9,
    reviews: 2100,
    isNew: true,
    hasBonus: true,
    bonusPoints: 100,
    address: 'Zorlu Center AVM',
    description: 'Spor giyim ve ekipmanları',
    isVisited: false,
    visitCount: 0,
    badges: []
  },
  {
    id: 'biz-4',
    name: 'D&R Kitap Mağazası',
    category: 'bookstore',
    coordinates: { lat: 41.0103, lng: 29.0053 },
    distance: 340,
    rating: 4.7,
    reviews: 567,
    isNew: true,
    hasBonus: true,
    bonusPoints: 75,
    address: 'İstinye Park AVM',
    description: 'Kitap, müzik ve teknoloji',
    isVisited: false,
    visitCount: 0,
    badges: []
  },
  {
    id: 'biz-5',
    name: 'Planet Fitness Etiler',
    category: 'gym',
    coordinates: { lat: 41.0703, lng: 29.0353 },
    distance: 580,
    rating: 4.6,
    reviews: 432,
    isNew: false,
    hasBonus: false,
    bonusPoints: 40,
    address: 'Etiler, Nispetiye Cad.',
    description: 'Modern spor salonu',
    isVisited: false,
    visitCount: 0,
    badges: []
  }
]

const MapExplorerPage = () => {
  const navigate = useNavigate()
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses)
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(mockBusinesses)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [checkInData, setCheckInData] = useState<CheckIn | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'new'>('distance')
  const [userLocation] = useState({ lat: 40.9903, lng: 29.0253 }) // Mock konum
  const [recentCheckIns, setRecentCheckIns] = useState<CheckIn[]>([])
  const [selectedTab, setSelectedTab] = useState('map')

  // Filtreleme ve sıralama
  useEffect(() => {
    let filtered = [...businesses]

    // Arama
    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Kategori filtresi
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(b => b.category === categoryFilter)
    }

    // Sıralama
    switch (sortBy) {
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'new':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    setFilteredBusinesses(filtered)
  }, [searchQuery, categoryFilter, sortBy, businesses])

  // Check-in yap
  const handleCheckIn = (business: Business) => {
    // Bonus hesapla
    let totalPoints = business.bonusPoints
    let bonusText = ''

    // İlk ziyaret bonusu
    if (!business.isVisited) {
      totalPoints += 100
      bonusText = '🎉 İlk Ziyaret Bonusu: +100 puan!'
    }

    // Yeni yer bonusu
    if (business.isNew) {
      totalPoints += 50
      bonusText += ' ✨ Yeni Yer Bonusu: +50 puan!'
    }

    // Sadakat bonusu (her 5 ziyarette)
    if ((business.visitCount + 1) % 5 === 0) {
      totalPoints += 150
      bonusText += ' 🏆 Sadakat Bonusu: +150 puan!'
    }

    // Check-in oluştur
    const checkIn: CheckIn = {
      id: Date.now().toString(),
      businessId: business.id,
      businessName: business.name,
      timestamp: new Date(),
      points: totalPoints,
      bonus: bonusText || undefined
    }

    setCheckInData(checkIn)
    setRecentCheckIns(prev => [checkIn, ...prev.slice(0, 9)])
    
    // İşletmeyi güncelle
    setBusinesses(prev => prev.map(b => 
      b.id === business.id 
        ? { 
            ...b, 
            isVisited: true, 
            lastVisit: new Date(), 
            visitCount: b.visitCount + 1 
          }
        : b
    ))
    
    setShowCheckInModal(true)
    setSelectedBusiness(null)
  }

  // Kategori iconları
  const getCategoryIcon = (category: Business['category']) => {
    switch (category) {
      case 'cafe': return Coffee
      case 'restaurant': return Utensils
      case 'shop': return ShoppingBag
      case 'gym': return Dumbbell
      case 'bookstore': return BookOpen
    }
  }

  // Kategori renkleri
  const getCategoryColor = (category: Business['category']) => {
    switch (category) {
      case 'cafe': return 'text-brown-500'
      case 'restaurant': return 'text-orange-500'
      case 'shop': return 'text-purple-500'
      case 'gym': return 'text-red-500'
      case 'bookstore': return 'text-blue-500'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🗺️ Harita & Keşif" 
          subtitle="Yakındaki işletmeleri keşfet, check-in yap!"
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
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <MapPin className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{businesses.length}</p>
                    <p className="text-white/80 text-sm">Toplam İşletme</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <CheckCircle className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{businesses.filter(b => b.isVisited).length}</p>
                    <p className="text-white/80 text-sm">Ziyaret Edilen</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <Target className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{businesses.filter(b => !b.isVisited).length}</p>
                    <p className="text-white/80 text-sm">Keşfedilmemiş</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <Sparkles className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">
                      {recentCheckIns.reduce((sum, ci) => sum + ci.points, 0)}
                    </p>
                    <p className="text-white/80 text-sm">Toplam Puan</p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="İşletme ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      startContent={<Search className="w-5 h-5 text-gray-400" />}
                      className="flex-1"
                    />
                    
                    <Tabs
                      selectedKey={categoryFilter}
                      onSelectionChange={(key) => setCategoryFilter(key as string)}
                      color="primary"
                      variant="bordered"
                    >
                      <Tab key="all" title="Tümü" />
                      <Tab key="cafe" title="☕ Kafe" />
                      <Tab key="restaurant" title="🍽️ Restoran" />
                      <Tab key="shop" title="🛍️ Mağaza" />
                      <Tab key="gym" title="💪 Spor" />
                      <Tab key="bookstore" title="📚 Kitap" />
                    </Tabs>

                    <Tabs
                      selectedKey={sortBy}
                      onSelectionChange={(key) => setSortBy(key as any)}
                      color="secondary"
                      variant="bordered"
                    >
                      <Tab key="distance" title="🎯 Yakın" />
                      <Tab key="rating" title="⭐ Puan" />
                      <Tab key="new" title="✨ Yeni" />
                    </Tabs>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Main Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key as string)}
                color="primary"
                size="lg"
                className="mb-6"
              >
                <Tab key="map" title={<div className="flex items-center gap-2"><Map className="w-4 h-4" /> Harita</div>} />
                <Tab key="list" title={<div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Liste</div>} />
                <Tab key="history" title={<div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Geçmiş</div>} />
              </Tabs>

              {/* Harita Görünümü */}
              {selectedTab === 'map' && (
                <Card>
                  <CardBody className="p-0">
                    <div className="relative h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                      {/* Mock Harita */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Map className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Gerçek harita Google Maps API ile entegre edilecek
                          </p>
                          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                            Şimdilik işletme listesini kullanın
                          </p>
                        </div>
                      </div>
                      
                      {/* User Location Marker */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Liste Görünümü */}
              {selectedTab === 'list' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBusinesses.map((business, index) => {
                    const CategoryIcon = getCategoryIcon(business.category)
                    return (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card 
                          className={`${
                            business.isVisited 
                              ? 'bg-green-50 dark:bg-green-900/10' 
                              : 'hover:shadow-xl'
                          } cursor-pointer transition-all`}
                          isPressable
                          onPress={() => setSelectedBusiness(business)}
                        >
                          <CardBody className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <CategoryIcon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex gap-2">
                                {business.isNew && (
                                  <Chip size="sm" color="warning" variant="flat">Yeni</Chip>
                                )}
                                {business.hasBonus && (
                                  <Chip size="sm" color="success" variant="flat">Bonus</Chip>
                                )}
                                {business.isVisited && (
                                  <Chip size="sm" color="success"><CheckCircle className="w-3 h-3" /></Chip>
                                )}
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                              {business.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {business.description}
                            </p>
                            
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium">{business.rating}</span>
                                <span className="text-xs text-gray-500">({business.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Navigation className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">{business.distance}m</span>
                              </div>
                              <Chip size="sm" color="warning" variant="flat">
                                +{business.bonusPoints}
                              </Chip>
                            </div>
                            
                            {business.visitCount > 0 && (
                              <div className="text-xs text-gray-500 mb-3">
                                {business.visitCount} kez ziyaret ettiniz
                              </div>
                            )}
                            
                            <Button
                              fullWidth
                              color="primary"
                              variant={business.isVisited ? "bordered" : "solid"}
                              className={!business.isVisited ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
                              startContent={<Target className="w-4 h-4" />}
                            >
                              {business.isVisited ? 'Tekrar Check-in' : 'Check-in Yap'}
                            </Button>
                          </CardBody>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {/* Geçmiş */}
              {selectedTab === 'history' && (
                <Card>
                  <CardBody className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-purple-500" />
                      Son Check-in'ler
                    </h3>
                    
                    {recentCheckIns.length === 0 ? (
                      <div className="text-center py-12">
                        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Henüz check-in geçmişiniz yok
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentCheckIns.map((checkIn, index) => (
                          <motion.div
                            key={checkIn.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Card className="bg-gray-50 dark:bg-gray-800">
                              <CardBody className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white">
                                      {checkIn.businessName}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {checkIn.timestamp.toLocaleString('tr-TR')}
                                    </p>
                                    {checkIn.bonus && (
                                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                        {checkIn.bonus}
                                      </p>
                                    )}
                                  </div>
                                  <Chip color="success" size="lg">
                                    +{checkIn.points} puan
                                  </Chip>
                                </div>
                              </CardBody>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Business Detail Modal */}
      <Modal
        isOpen={selectedBusiness !== null}
        onClose={() => setSelectedBusiness(null)}
        size="2xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => selectedBusiness && (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3">
                  {(() => {
                    const CategoryIcon = getCategoryIcon(selectedBusiness.category)
                    return (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <CategoryIcon className="w-6 h-6 text-white" />
                      </div>
                    )
                  })()}
                  <div>
                    <h3 className="text-xl font-bold">{selectedBusiness.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedBusiness.isNew && <Chip size="sm" color="warning">Yeni</Chip>}
                      {selectedBusiness.hasBonus && <Chip size="sm" color="success">Bonus</Chip>}
                      {selectedBusiness.isVisited && <Chip size="sm" color="success"><CheckCircle className="w-3 h-3 mr-1" /> Ziyaret Edildi</Chip>}
                    </div>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">{selectedBusiness.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{selectedBusiness.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold">{selectedBusiness.rating}</span>
                      <span className="text-sm text-gray-500">({selectedBusiness.reviews} değerlendirme)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-blue-500" />
                      <span>{selectedBusiness.distance}m uzaklıkta</span>
                    </div>
                  </div>

                  {selectedBusiness.visitCount > 0 && (
                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardBody className="p-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-green-600" />
                          <span className="font-medium">
                            Bu işletmeyi {selectedBusiness.visitCount} kez ziyaret ettiniz!
                          </span>
                        </div>
                        {selectedBusiness.lastVisit && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Son ziyaret: {selectedBusiness.lastVisit.toLocaleDateString('tr-TR')}
                          </p>
                        )}
                      </CardBody>
                    </Card>
                  )}

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <CardBody className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-lg">Check-in Ödülü</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Bu işletmeye check-in yapın ve puan kazanın!
                          </p>
                        </div>
                        <Chip size="lg" color="warning">
                          +{selectedBusiness.bonusPoints} puan
                        </Chip>
                      </div>
                      
                      {!selectedBusiness.isVisited && (
                        <div className="mt-3 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            🎉 İlk ziyaret bonusu: +100 puan ekstra!
                          </p>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Kapat
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => handleCheckIn(selectedBusiness)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                  startContent={<Target className="w-5 h-5" />}
                >
                  Check-in Yap
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Check-in Success Modal */}
      <Modal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => checkInData && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span>Check-in Başarılı!</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="text-6xl"
                  >
                    🎉
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {checkInData.businessName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Check-in işleminiz kaydedildi!
                    </p>
                  </div>

                  <Chip size="lg" color="success" className="text-lg px-6 py-2">
                    +{checkInData.points} puan kazandınız! 🎊
                  </Chip>

                  {checkInData.bonus && (
                    <Card className="bg-yellow-50 dark:bg-yellow-900/20">
                      <CardBody className="p-4">
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          {checkInData.bonus}
                        </p>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} fullWidth>
                  Harika!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MapExplorerPage









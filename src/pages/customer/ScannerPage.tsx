import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Card, CardBody, Button, Input, Textarea, Chip, Modal, 
  ModalContent, ModalHeader, ModalBody, ModalFooter,
  Avatar, Progress, Select, SelectItem, Tabs, Tab
} from '@nextui-org/react'
import { 
  QrCode, Camera, Scan, CheckCircle, MapPin, Star, 
  Clock, Award, Zap, X, History, Sparkles, TrendingUp,
  Heart, MessageCircle, Image as ImageIcon, Send, Smile,
  ThumbsUp, Coffee, Utensils, ShoppingBag, Users, Gift,
  AlertCircle, CheckCircle2, XCircle, ArrowRight, Trophy
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface PurchaseItem {
  id: string
  name: string
  quantity: number
  price: number
  category: string
  emoji: string
}

interface Business {
  id: string
  name: string
  category: string
  logo: string
  address: string
  rating: number
  totalReviews: number
  distance: string
  badges: string[]
  specialOffer?: string
  purchaseItems?: PurchaseItem[]
  totalAmount?: number
  paymentMethod?: string
  purchaseDate?: string
}

interface ScanHistory {
  id: string
  business: Business
  scannedAt: string
  commented: boolean
  earnedPoints: number
}

interface CommentFormData {
  rating: number
  comment: string
  selectedEmojis: string[]
  quickTags: string[]
  photos: File[]
}

function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [showBusinessModal, setShowBusinessModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([])
  const [activeTab, setActiveTab] = useState('scanner')
  const [scanProgress, setScanProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Comment form state
  const [commentForm, setCommentForm] = useState<CommentFormData>({
    rating: 0,
    comment: '',
    selectedEmojis: [],
    quickTags: [],
    photos: []
  })

  // Mock işletmeler
  const mockBusinesses: Business[] = [
    {
      id: '1',
      name: 'Starbucks Kadıköy',
      category: 'Kafe',
      logo: '☕',
      address: 'Kadıköy, İstanbul',
      rating: 4.5,
      totalReviews: 234,
      distance: '120m',
      badges: ['✓ Onaylı', '🏆 Popüler', '⚡ Hızlı Hizmet'],
      specialOffer: '%10 indirim - İlk yorumunda!',
      purchaseItems: [
        { id: '1', name: 'Caramel Macchiato', quantity: 1, price: 45.50, category: 'İçecek', emoji: '☕' },
        { id: '2', name: 'Cheesecake', quantity: 1, price: 35.00, category: 'Tatlı', emoji: '🍰' },
        { id: '3', name: 'Chocolate Cookie', quantity: 2, price: 18.00, category: 'Atıştırmalık', emoji: '🍪' }
      ],
      totalAmount: 116.50,
      paymentMethod: 'Kredi Kartı',
      purchaseDate: new Date().toLocaleString('tr-TR')
    },
    {
      id: '2',
      name: "McDonald's Bağdat Caddesi",
      category: 'Fast Food',
      logo: '🍔',
      address: 'Bağdat Cad. No:123, İstanbul',
      rating: 4.2,
      totalReviews: 567,
      distance: '350m',
      badges: ['✓ Onaylı', '🎁 İndirim'],
      specialOffer: 'Büyük Boy içecek bedava!',
      purchaseItems: [
        { id: '1', name: 'Big Mac Menü', quantity: 1, price: 89.90, category: 'Menü', emoji: '🍔' },
        { id: '2', name: 'McChicken', quantity: 1, price: 45.00, category: 'Burger', emoji: '🍗' },
        { id: '3', name: 'Büyük Patates', quantity: 2, price: 28.50, category: 'Yan Ürün', emoji: '🍟' },
        { id: '4', name: 'Coca Cola', quantity: 2, price: 15.00, category: 'İçecek', emoji: '🥤' },
        { id: '5', name: 'McFlurry', quantity: 1, price: 38.00, category: 'Tatlı', emoji: '🍦' }
      ],
      totalAmount: 244.90,
      paymentMethod: 'Nakit',
      purchaseDate: new Date().toLocaleString('tr-TR')
    },
    {
      id: '3',
      name: 'Nike Store Zorlu Center',
      category: 'Spor & Outdoor',
      logo: '👟',
      address: 'Zorlu Center, İstanbul',
      rating: 4.8,
      totalReviews: 892,
      distance: '2.5km',
      badges: ['✓ Onaylı', '⭐ Premium', '🔥 Trend'],
      specialOffer: 'Yorum yap, %15 indirim kazan!',
      purchaseItems: [
        { id: '1', name: 'Nike Air Max 270', quantity: 1, price: 3299.00, category: 'Ayakkabı', emoji: '👟' },
        { id: '2', name: 'Nike Dri-FIT Tişört', quantity: 2, price: 449.90, category: 'Giyim', emoji: '👕' },
        { id: '3', name: 'Nike Spor Çorap (3\'lü)', quantity: 1, price: 189.90, category: 'Aksesuar', emoji: '🧦' }
      ],
      totalAmount: 4388.70,
      paymentMethod: 'Kredi Kartı (Taksitli)',
      purchaseDate: new Date().toLocaleString('tr-TR')
    }
  ]

  // Mock scan history
  const mockScanHistory: ScanHistory[] = [
    {
      id: '1',
      business: mockBusinesses[0],
      scannedAt: '2 saat önce',
      commented: true,
      earnedPoints: 50
    },
    {
      id: '2',
      business: mockBusinesses[1],
      scannedAt: 'Dün, 18:30',
      commented: false,
      earnedPoints: 0
    },
    {
      id: '3',
      business: mockBusinesses[2],
      scannedAt: '3 gün önce',
      commented: true,
      earnedPoints: 75
    }
  ]

  // Quick emojis
  const quickEmojis = ['😊', '😍', '🤩', '👍', '❤️', '🔥', '💯', '🎉', '😋', '🙌']
  
  // Quick tags
  const quickTags = [
    'Harika Hizmet',
    'Temiz',
    'Lezzetli',
    'Hızlı',
    'Güler Yüzlü',
    'Uygun Fiyat',
    'Kaliteli',
    'Rahat Ortam',
    'Tavsiye Ederim',
    'Tekrar Geleceğim'
  ]

  // Scanner simulation
  const startScanning = () => {
    setIsScanning(true)
    setScanProgress(0)
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Simulate successful scan
          setTimeout(() => {
            const randomBusiness = mockBusinesses[Math.floor(Math.random() * mockBusinesses.length)]
            handleScanSuccess(randomBusiness)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleScanSuccess = (business: Business) => {
    setSelectedBusiness(business)
    setIsScanning(false)
    setScanProgress(0)
    setShowBusinessModal(true)
  }

  const handleOpenCommentModal = () => {
    setShowBusinessModal(false)
    setShowCommentModal(true)
  }

  const handleSubmitComment = () => {
    // Simulate comment submission
    console.log('Comment submitted:', commentForm)
    
    // Add to history
    const newScan: ScanHistory = {
      id: Date.now().toString(),
      business: selectedBusiness!,
      scannedAt: 'Şimdi',
      commented: true,
      earnedPoints: 50
    }
    setScanHistory([newScan, ...scanHistory])
    
    // Reset form
    setCommentForm({
      rating: 0,
      comment: '',
      selectedEmojis: [],
      quickTags: [],
      photos: []
    })
    
    setShowCommentModal(false)
    setSelectedBusiness(null)
  }

  const handleEmojiClick = (emoji: string) => {
    if (commentForm.selectedEmojis.includes(emoji)) {
      setCommentForm({
        ...commentForm,
        selectedEmojis: commentForm.selectedEmojis.filter(e => e !== emoji)
      })
    } else {
      setCommentForm({
        ...commentForm,
        selectedEmojis: [...commentForm.selectedEmojis, emoji]
      })
    }
  }

  const handleTagClick = (tag: string) => {
    if (commentForm.quickTags.includes(tag)) {
      setCommentForm({
        ...commentForm,
        quickTags: commentForm.quickTags.filter(t => t !== tag)
      })
    } else {
      setCommentForm({
        ...commentForm,
        quickTags: [...commentForm.quickTags, tag]
      })
    }
  }

  useEffect(() => {
    // Load mock history on mount
    setScanHistory(mockScanHistory)
  }, [])

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="QR Scanner" 
          subtitle="İşletmeleri tara, yorum yap, rozet kazan!"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Toplam Tarama</p>
                        <h3 className="text-3xl font-bold">{scanHistory.length}</h3>
                      </div>
                      <Scan className="w-10 h-10 opacity-80" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Yorum Sayısı</p>
                        <h3 className="text-3xl font-bold">
                          {scanHistory.filter(s => s.commented).length}
                        </h3>
                      </div>
                      <MessageCircle className="w-10 h-10 opacity-80" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Kazanılan Puan</p>
                        <h3 className="text-3xl font-bold">
                          {scanHistory.reduce((sum, s) => sum + s.earnedPoints, 0)}
                        </h3>
                      </div>
                      <Trophy className="w-10 h-10 opacity-80" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Bu Ay</p>
                        <h3 className="text-3xl font-bold">12</h3>
                      </div>
                      <TrendingUp className="w-10 h-10 opacity-80" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardBody className="p-0">
                  <Tabs
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as string)}
                    variant="underlined"
                    classNames={{
                      tabList: "px-6 pt-4",
                      cursor: "bg-gradient-to-r from-blue-500 to-purple-500",
                      tab: "text-gray-600 dark:text-gray-400",
                      tabContent: "group-data-[selected=true]:text-blue-600 dark:group-data-[selected=true]:text-blue-400"
                    }}
                  >
                    <Tab
                      key="scanner"
                      title={
                        <div className="flex items-center space-x-2">
                          <Scan className="w-4 h-4" />
                          <span>Tarayıcı</span>
                        </div>
                      }
                    />
                    <Tab
                      key="history"
                      title={
                        <div className="flex items-center space-x-2">
                          <History className="w-4 h-4" />
                          <span>Geçmiş</span>
                        </div>
                      }
                    />
                    <Tab
                      key="nearby"
                      title={
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>Yakınımdakiler</span>
                        </div>
                      }
                    />
                  </Tabs>

                  <div className="p-6">
                    {/* Scanner Tab */}
                    {activeTab === 'scanner' && (
                      <div className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center"
                        >
                          <Card className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                            <CardBody className="p-8">
                              {!isScanning ? (
                                <>
                                  <div className="relative mb-6">
                                    <div className="w-48 h-48 mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden">
                                      <QrCode className="w-32 h-32 text-blue-500" />
                                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white animate-bounce">
                                      <Camera className="w-6 h-6" />
                                    </div>
                                  </div>
                                  
                                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    QR Kod Tara
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    İşletmenin QR kodunu tarayarak hızlıca yorum yapın ve puan kazanın
                  </p>
                                  
                  <Button 
                    color="primary" 
                    size="lg"
                                    onPress={startScanning}
                                    className="w-full"
                    startContent={<Camera className="w-5 h-5" />}
                  >
                                    Taramayı Başlat
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <div className="relative mb-6">
                                    <div className="w-48 h-48 mx-auto bg-gray-900 rounded-2xl shadow-xl relative overflow-hidden">
                                      {/* Mock camera view */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <div className="w-40 h-40 border-4 border-blue-500 rounded-lg animate-pulse">
                                            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
                                            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
                                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
                                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>
                                          </div>
                                        </div>
                                        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-blue-500 animate-scan"></div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Taranıyor...
                                  </h2>
                                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    QR kodu çerçeve içine alın
                                  </p>
                                  
                                  <Progress 
                                    value={scanProgress} 
                                    color="primary" 
                                    className="mb-4"
                                    size="sm"
                                  />
                                  
                                  <Button 
                                    color="danger" 
                                    variant="flat"
                                    onPress={() => setIsScanning(false)}
                                    startContent={<X className="w-4 h-4" />}
                                  >
                                    İptal
                                  </Button>
                                </>
                              )}
                            </CardBody>
                          </Card>
                        </motion.div>

                        {/* Quick Tips */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardBody className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Zap className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Hızlı ve Kolay</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    QR kodu tara, saniyeler içinde yorum yap
                                  </p>
                                </div>
                              </div>
                            </CardBody>
                          </Card>

                          <Card>
                            <CardBody className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Gift className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Puan Kazan</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Her yorum için 50 puan kazanın
                                  </p>
                                </div>
                              </div>
                            </CardBody>
                          </Card>

                          <Card>
                            <CardBody className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Award className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Rozet Aç</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Özel rozetler kazanma şansı
                                  </p>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                    )}

                    {/* History Tab */}
                    {activeTab === 'history' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Tarama Geçmişi
                          </h3>
                          <Chip color="primary" variant="flat">
                            {scanHistory.length} tarama
                          </Chip>
                        </div>

                        {scanHistory.length === 0 ? (
                          <Card>
                            <CardBody className="p-8 text-center">
                              <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Henüz tarama yok
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                İlk QR kodunu tarayarak başlayın!
                              </p>
                            </CardBody>
                          </Card>
                        ) : (
                          <div className="space-y-3">
                            {scanHistory.map((scan, index) => (
                              <motion.div
                                key={scan.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Card className="hover:shadow-lg transition-shadow">
                                  <CardBody className="p-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="text-4xl">{scan.business.logo}</div>
                                      
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                          {scan.business.name}
                                        </h4>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                          <Clock className="w-3 h-3" />
                                          <span>{scan.scannedAt}</span>
                                          <span>•</span>
                                          <MapPin className="w-3 h-3" />
                                          <span>{scan.business.distance}</span>
                                        </div>
                                      </div>

                                      <div className="text-right">
                                        {scan.commented ? (
                                          <Chip size="sm" color="success" startContent={<CheckCircle className="w-3 h-3" />}>
                                            Yorum Yapıldı
                                          </Chip>
                                        ) : (
                                          <Button
                                            size="sm"
                                            color="primary"
                                            variant="flat"
                                            onPress={() => {
                                              setSelectedBusiness(scan.business)
                                              setShowCommentModal(true)
                                            }}
                                          >
                                            Yorum Yap
                                          </Button>
                                        )}
                                        {scan.earnedPoints > 0 && (
                                          <div className="mt-2 flex items-center justify-end text-sm text-green-600">
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            +{scan.earnedPoints} puan
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Nearby Tab */}
                    {activeTab === 'nearby' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Yakınınızdaki İşletmeler
                          </h3>
                          <Button size="sm" variant="flat" color="primary">
                            📍 Konumu Güncelle
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mockBusinesses.map((business, index) => (
                            <motion.div
                              key={business.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="hover:shadow-lg transition-all hover:scale-[1.02]">
                                <CardBody className="p-4">
                                  <div className="flex items-start space-x-4">
                                    <div className="text-5xl">{business.logo}</div>
                                    
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <h4 className="font-bold text-gray-900 dark:text-white">
                                            {business.name}
                                          </h4>
                                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {business.category}
                                          </p>
                                        </div>
                                        <Chip size="sm" color="primary" variant="flat">
                                          {business.distance}
                                        </Chip>
                                      </div>

                                      <div className="flex items-center space-x-2 mb-3">
                                        <div className="flex items-center">
                                          {[...Array(5)].map((_, i) => (
                                            <Star
                                              key={i}
                                              className={`w-4 h-4 ${
                                                i < Math.floor(business.rating)
                                                  ? 'text-yellow-500 fill-yellow-500'
                                                  : 'text-gray-300'
                                              }`}
                                            />
                                          ))}
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                          {business.rating} ({business.totalReviews} yorum)
                                        </span>
                                      </div>

                                      <div className="flex flex-wrap gap-1 mb-3">
                                        {business.badges.map((badge, i) => (
                                          <Chip key={i} size="sm" variant="flat" color="secondary">
                                            {badge}
                                          </Chip>
                                        ))}
                                      </div>

                                      {business.specialOffer && (
                                        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-2 mb-3">
                                          <p className="text-sm font-medium text-orange-700 dark:text-orange-400 flex items-center">
                                            <Gift className="w-4 h-4 mr-1" />
                                            {business.specialOffer}
                                          </p>
                                        </div>
                                      )}

                                      <div className="flex items-center space-x-2">
                                        <Button
                                          size="sm"
                                          color="primary"
                                          className="flex-1"
                                          onPress={() => handleScanSuccess(business)}
                                        >
                                          Yorum Yap
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          isIconOnly
                                        >
                                          <MapPin className="w-4 h-4" />
                  </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Business Info Modal */}
      <AnimatePresence>
        {showBusinessModal && selectedBusiness && (
          <Modal
            isOpen={showBusinessModal}
            onClose={() => setShowBusinessModal(false)}
            size="2xl"
            backdrop="blur"
            placement="center"
          >
            <ModalContent>
              <ModalHeader>
                <div className="flex items-center space-x-4">
                  <div className="text-5xl">{selectedBusiness.logo}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedBusiness.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedBusiness.category}
                    </p>
                  </div>
                </div>
              </ModalHeader>

              <ModalBody className="max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
                  {/* Purchase Receipt */}
                  {selectedBusiness.purchaseItems && selectedBusiness.purchaseItems.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                          <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                          Alışveriş Detayları
                        </h4>
                        <Chip size="sm" color="primary" variant="flat">
                          {selectedBusiness.purchaseItems.length} ürün
                        </Chip>
                      </div>

                      {/* Purchase Items List */}
                      <div className="space-y-2 mb-4">
                        {selectedBusiness.purchaseItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="text-3xl">{item.emoji}</div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.category}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.quantity} x ₺{item.price.toFixed(2)}
                              </p>
                              <p className="font-bold text-gray-900 dark:text-white">
                                ₺{(item.quantity * item.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total Amount */}
                      <div className="border-t-2 border-blue-200 dark:border-blue-800 pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Ara Toplam</span>
                          <span className="font-medium">₺{selectedBusiness.totalAmount?.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">KDV (%18)</span>
                          <span className="font-medium">₺{((selectedBusiness.totalAmount || 0) * 0.18).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-blue-200 dark:border-blue-700">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">Toplam</span>
                          <span className="text-2xl font-bold text-blue-600">
                            ₺{((selectedBusiness.totalAmount || 0) * 1.18).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Ödeme Yöntemi</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {selectedBusiness.paymentMethod}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">İşlem Tarihi</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {selectedBusiness.purchaseDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.floor(selectedBusiness.rating)
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {selectedBusiness.rating}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedBusiness.totalReviews} yorum
                        </p>
                      </div>
                    </div>
                    <Chip color="primary" size="lg">
                      {selectedBusiness.distance} uzakta
                    </Chip>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Adres</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedBusiness.address}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white mb-2">Özellikler</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.badges.map((badge, i) => (
                        <Chip key={i} color="secondary" variant="flat">
                          {badge}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Special Offer */}
                  {selectedBusiness.specialOffer && (
                    <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-700">
                      <div className="flex items-start space-x-3">
                        <Gift className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-orange-900 dark:text-orange-300 mb-1">
                            Özel Teklif! 🎉
                          </p>
                          <p className="text-sm text-orange-800 dark:text-orange-400">
                            {selectedBusiness.specialOffer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" onPress={() => setShowBusinessModal(false)}>
                  Kapat
                </Button>
                <Button color="primary" onPress={handleOpenCommentModal}>
                  Yorum Yap ve Puan Kazan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      {/* Comment Modal */}
      <AnimatePresence>
        {showCommentModal && selectedBusiness && (
          <Modal
            isOpen={showCommentModal}
            onClose={() => setShowCommentModal(false)}
            size="3xl"
            backdrop="blur"
            placement="center"
            scrollBehavior="inside"
          >
            <ModalContent>
              <ModalHeader>
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{selectedBusiness.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedBusiness.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Deneyimini paylaş, 50 puan kazan! ⭐
                    </p>
                  </div>
                </div>
              </ModalHeader>

              <ModalBody className="py-6">
                <div className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Puanın
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setCommentForm({ ...commentForm, rating: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-10 h-10 ${
                              star <= commentForm.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      {commentForm.rating > 0 && (
                        <span className="ml-3 text-lg font-bold text-gray-900 dark:text-white">
                          {commentForm.rating} / 5
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Emojis */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Hissini Seç (Opsiyonel)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleEmojiClick(emoji)}
                          className={`text-3xl p-2 rounded-lg transition-all ${
                            commentForm.selectedEmojis.includes(emoji)
                              ? 'bg-blue-100 dark:bg-blue-900 scale-110 ring-2 ring-blue-500'
                              : 'bg-gray-100 dark:bg-gray-800 hover:scale-105'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Yorumun
                    </label>
                    <Textarea
                      placeholder="Deneyimini detaylı anlat... (En az 20 karakter)"
                      value={commentForm.comment}
                      onValueChange={(value) => setCommentForm({ ...commentForm, comment: value })}
                      minRows={4}
                      maxRows={8}
                      variant="bordered"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        {commentForm.comment.length} / 500 karakter
                      </p>
                      {commentForm.comment.length >= 20 && (
                        <Chip size="sm" color="success" variant="flat">
                          ✓ Yeterli detay
                        </Chip>
                      )}
                    </div>
                  </div>

                  {/* Quick Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Hızlı Etiketler (En fazla 5)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickTags.map((tag) => (
                        <Chip
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={`cursor-pointer transition-all ${
                            commentForm.quickTags.includes(tag)
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {commentForm.quickTags.includes(tag) && '✓ '}
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Fotoğraf Ekle (Opsiyonel)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fotoğraf yükle veya sürükle bırak
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        +20 bonus puan kazan! 📸
                      </p>
                    </div>
                  </div>

                  {/* Earn Summary */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border-2 border-green-300 dark:border-green-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-green-900 dark:text-green-300 mb-1">
                          Kazanacağın Puanlar 🎉
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center text-green-700 dark:text-green-400">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            <span>Temel yorum: 50 puan</span>
                          </div>
                          {commentForm.rating >= 4 && (
                            <div className="flex items-center text-green-700 dark:text-green-400">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              <span>Yüksek puan bonusu: +10 puan</span>
                            </div>
                          )}
                          {commentForm.comment.length >= 50 && (
                            <div className="flex items-center text-green-700 dark:text-green-400">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              <span>Detaylı yorum bonusu: +15 puan</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-bold text-green-600">
                          {50 + 
                            (commentForm.rating >= 4 ? 10 : 0) + 
                            (commentForm.comment.length >= 50 ? 15 : 0)}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-400">puan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" onPress={() => setShowCommentModal(false)}>
                  İptal
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmitComment}
                  isDisabled={commentForm.rating === 0 || commentForm.comment.length < 20}
                  startContent={<Send className="w-4 h-4" />}
                >
                  Yorumu Gönder ve Puan Kazan
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan {
          0%, 100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default ScannerPage

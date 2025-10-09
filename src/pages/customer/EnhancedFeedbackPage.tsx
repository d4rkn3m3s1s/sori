import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Tabs, Tab, Progress, Avatar } from '@nextui-org/react'
import { MessageSquare, Star, Clock, CheckCircle, AlertCircle, Send, Image as ImageIcon, Smile, ThumbsUp, ThumbsDown, Filter, Calendar, TrendingUp, Award, Camera, X } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface Feedback {
  id: number
  business: string
  businessLogo?: string
  date: string
  rating: number
  comment: string
  status: 'responded' | 'pending' | 'archived'
  response: string | null
  category?: string
  sentiment?: 'positive' | 'neutral' | 'negative'
  photos?: string[]
  likes?: number
  helpful?: number
  tags?: string[]
}

function EnhancedFeedbackPage() {
  const [showNewFeedbackModal, setShowNewFeedbackModal] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRating, setFilterRating] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [activeTab, setActiveTab] = useState('all')
  
  // Yeni feedback formu state'leri
  const [newRating, setNewRating] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])

  const feedbackHistory: Feedback[] = [
    {
      id: 1,
      business: 'McDonald\'s Kadıköy',
      businessLogo: '🍔',
      date: '2024-01-15',
      rating: 4.5,
      comment: 'Hizmet çok hızlıydı, personel güler yüzlüydü. Hamburger tazeydi ve lezzetliydi.',
      status: 'responded',
      response: 'Geri bildiriminiz için teşekkürler! Müşteri memnuniyeti bizim için çok önemli.',
      category: 'Hizmet Kalitesi',
      sentiment: 'positive',
      photos: ['🍔', '🍟'],
      likes: 12,
      helpful: 8,
      tags: ['Hızlı Servis', 'Temizlik']
    },
    {
      id: 2,
      business: 'Starbucks Bağdat Caddesi',
      businessLogo: '☕',
      date: '2024-01-12',
      rating: 5,
      comment: 'Kahve mükemmeldi, ortam çok rahat. Wifi hızı da gayet iyiydi.',
      status: 'responded',
      response: 'Harika bir deneyim yaşattığımız için mutluyuz! Sizi tekrar aramızda görmek isteriz.',
      category: 'Ürün Kalitesi',
      sentiment: 'positive',
      photos: ['☕', '🥐'],
      likes: 24,
      helpful: 15,
      tags: ['Kahve', 'Atmosfer', 'Wifi']
    },
    {
      id: 3,
      business: 'Nike Store Zorlu',
      businessLogo: '👟',
      date: '2024-01-10',
      rating: 3,
      comment: 'Ürün kalitesi iyi ama fiyatlar biraz yüksek. Daha fazla indirim kampanyası olmalı.',
      status: 'pending',
      response: null,
      category: 'Fiyat',
      sentiment: 'neutral',
      likes: 5,
      helpful: 3,
      tags: ['Fiyat', 'Kalite']
    },
    {
      id: 4,
      business: 'Burger King Ataşehir',
      businessLogo: '🍔',
      date: '2024-01-08',
      rating: 2,
      comment: 'Sipariş çok geç geldi. Hamburger de soğuktu.',
      status: 'responded',
      response: 'Yaşadığınız olumsuz deneyim için özür dileriz. Durumu inceledik ve gerekli önlemleri aldık.',
      category: 'Teslimat',
      sentiment: 'negative',
      likes: 3,
      helpful: 7,
      tags: ['Geç Teslimat', 'Soğuk Yemek']
    },
    {
      id: 5,
      business: 'Koçtaş Kartal',
      businessLogo: '🔨',
      date: '2024-01-05',
      rating: 5,
      comment: 'Personel çok yardımseverdi. Aradığım ürünü bulmamda yardımcı oldular.',
      status: 'responded',
      response: 'Teşekkür ederiz! Ekibimizle bu güzel geri bildirimi paylaştık.',
      category: 'Müşteri Hizmetleri',
      sentiment: 'positive',
      photos: ['🔨', '🛠️'],
      likes: 18,
      helpful: 12,
      tags: ['Yardımsever Personel']
    }
  ]

  const categories = [
    { key: 'service', label: 'Hizmet Kalitesi' },
    { key: 'product', label: 'Ürün Kalitesi' },
    { key: 'price', label: 'Fiyat' },
    { key: 'delivery', label: 'Teslimat' },
    { key: 'support', label: 'Müşteri Hizmetleri' },
    { key: 'other', label: 'Diğer' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded': return 'success'
      case 'pending': return 'warning'
      case 'archived': return 'default'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'responded': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'archived': return <AlertCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const getSentimentEmoji = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return '😊'
      case 'neutral': return '😐'
      case 'negative': return '😞'
      default: return ''
    }
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500'
      case 'neutral': return 'text-yellow-500'
      case 'negative': return 'text-red-500'
      default: return ''
    }
  }

  const filteredFeedback = feedbackHistory
    .filter(f => {
      if (filterStatus !== 'all' && f.status !== filterStatus) return false
      if (filterRating !== 'all' && Math.floor(f.rating) !== parseInt(filterRating)) return false
      if (activeTab !== 'all' && f.sentiment !== activeTab) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'rating':
          return b.rating - a.rating
        case 'helpful':
          return (b.helpful || 0) - (a.helpful || 0)
        default:
          return 0
      }
    })

  const stats = {
    total: feedbackHistory.length,
    avgRating: (feedbackHistory.reduce((acc, f) => acc + f.rating, 0) / feedbackHistory.length).toFixed(1),
    responded: feedbackHistory.filter(f => f.status === 'responded').length,
    pending: feedbackHistory.filter(f => f.status === 'pending').length,
    positive: feedbackHistory.filter(f => f.sentiment === 'positive').length,
    neutral: feedbackHistory.filter(f => f.sentiment === 'neutral').length,
    negative: feedbackHistory.filter(f => f.sentiment === 'negative').length
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulated photo upload
    const emoji = ['📸', '🖼️', '🎨'][Math.floor(Math.random() * 3)]
    setUploadedPhotos([...uploadedPhotos, emoji])
  }

  const handleSubmitFeedback = () => {
    console.log('Yeni feedback gönderiliyor:', {
      rating: newRating,
      comment: newComment,
      category: newCategory,
      photos: uploadedPhotos
    })
    setShowNewFeedbackModal(false)
    // Reset form
    setNewRating(0)
    setNewComment('')
    setNewCategory('')
    setUploadedPhotos([])
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Geri Bildirimlerim" subtitle="Feedback'lerinizi yönetin ve takip edin" userType="customer" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Header with Action Button */}
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Geri Bildirimlerim
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Deneyimlerinizi paylaşın ve işletmelerle etkileşimde kalın
                </p>
              </motion.div>
              
              <Button
                color="primary"
                size="lg"
                startContent={<Send className="w-5 h-5" />}
                onPress={() => setShowNewFeedbackModal(true)}
                className="shadow-lg"
              >
                Yeni Feedback
              </Button>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm text-white/80">Toplam Feedback</p>
                        <p className="text-3xl font-bold">{stats.total}</p>
                        <p className="text-xs text-white/70 mt-1">Son 30 gün</p>
                      </div>
                      <MessageSquare className="w-12 h-12 opacity-80" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-yellow-500 to-orange-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm text-white/80">Ortalama Puan</p>
                        <p className="text-3xl font-bold">{stats.avgRating}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <Star className="w-12 h-12 opacity-80" />
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
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm text-white/80">Yanıtlanan</p>
                        <p className="text-3xl font-bold">{stats.responded}</p>
                        <p className="text-xs text-white/70 mt-1">
                          %{Math.round((stats.responded / stats.total) * 100)} yanıt oranı
                        </p>
                      </div>
                      <CheckCircle className="w-12 h-12 opacity-80" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm text-white/80">Pozitif Feedback</p>
                        <p className="text-3xl font-bold">{stats.positive}</p>
                        <p className="text-xs text-white/70 mt-1">
                          %{Math.round((stats.positive / stats.total) * 100)} memnuniyet
                        </p>
                      </div>
                      <ThumbsUp className="w-12 h-12 opacity-80" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Sentiment Analysis Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardBody className="p-6">
                  <h3 className="font-semibold mb-4">Duygu Analizi</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm flex items-center space-x-2">
                          <span>😊 Pozitif</span>
                        </span>
                        <span className="text-sm font-medium">{stats.positive} ({Math.round((stats.positive / stats.total) * 100)}%)</span>
                      </div>
                      <Progress 
                        value={(stats.positive / stats.total) * 100} 
                        className="h-2"
                        classNames={{ indicator: "bg-green-500" }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm flex items-center space-x-2">
                          <span>😐 Nötr</span>
                        </span>
                        <span className="text-sm font-medium">{stats.neutral} ({Math.round((stats.neutral / stats.total) * 100)}%)</span>
                      </div>
                      <Progress 
                        value={(stats.neutral / stats.total) * 100} 
                        className="h-2"
                        classNames={{ indicator: "bg-yellow-500" }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm flex items-center space-x-2">
                          <span>😞 Negatif</span>
                        </span>
                        <span className="text-sm font-medium">{stats.negative} ({Math.round((stats.negative / stats.total) * 100)}%)</span>
                      </div>
                      <Progress 
                        value={(stats.negative / stats.total) * 100} 
                        className="h-2"
                        classNames={{ indicator: "bg-red-500" }}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Filters and Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    <Tabs
                      selectedKey={activeTab}
                      onSelectionChange={(key) => setActiveTab(key as string)}
                    >
                      <Tab key="all" title="Tümü" />
                      <Tab 
                        key="positive" 
                        title={
                          <div className="flex items-center space-x-2">
                            <span>😊 Pozitif</span>
                          </div>
                        }
                      />
                      <Tab 
                        key="neutral" 
                        title={
                          <div className="flex items-center space-x-2">
                            <span>😐 Nötr</span>
                          </div>
                        }
                      />
                      <Tab 
                        key="negative" 
                        title={
                          <div className="flex items-center space-x-2">
                            <span>😞 Negatif</span>
                          </div>
                        }
                      />
                    </Tabs>
                    
                    <div className="flex gap-3">
                      <Select
                        placeholder="Durum"
                        selectedKeys={[filterStatus]}
                        onSelectionChange={(keys) => setFilterStatus(Array.from(keys)[0] as string)}
                        className="w-40"
                        size="sm"
                      >
                        <SelectItem key="all">Tümü</SelectItem>
                        <SelectItem key="responded">Yanıtlanan</SelectItem>
                        <SelectItem key="pending">Bekleyen</SelectItem>
                      </Select>
                      
                      <Select
                        placeholder="Puan"
                        selectedKeys={[filterRating]}
                        onSelectionChange={(keys) => setFilterRating(Array.from(keys)[0] as string)}
                        className="w-32"
                        size="sm"
                      >
                        <SelectItem key="all">Tümü</SelectItem>
                        <SelectItem key="5">5 ⭐</SelectItem>
                        <SelectItem key="4">4 ⭐</SelectItem>
                        <SelectItem key="3">3 ⭐</SelectItem>
                        <SelectItem key="2">2 ⭐</SelectItem>
                        <SelectItem key="1">1 ⭐</SelectItem>
                      </Select>
                      
                      <Select
                        placeholder="Sırala"
                        selectedKeys={[sortBy]}
                        onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                        className="w-40"
                        size="sm"
                      >
                        <SelectItem key="date">Tarihe Göre</SelectItem>
                        <SelectItem key="rating">Puana Göre</SelectItem>
                        <SelectItem key="helpful">Faydalılığa Göre</SelectItem>
                      </Select>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Feedback List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredFeedback.map((feedback, index) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" isPressable onPress={() => setSelectedFeedback(feedback)}>
                      <CardBody className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Business Logo */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl">
                              {feedback.businessLogo}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                  {feedback.business}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm text-gray-500">{feedback.date}</span>
                                  {feedback.category && (
                                    <Chip size="sm" variant="flat">
                                      {feedback.category}
                                    </Chip>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(feedback.rating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm font-medium ml-1">
                                    {feedback.rating}
                                  </span>
                                </div>
                                
                                {feedback.sentiment && (
                                  <span className={`text-2xl ${getSentimentColor(feedback.sentiment)}`}>
                                    {getSentimentEmoji(feedback.sentiment)}
                                  </span>
                                )}
                                
                                <Chip
                                  color={getStatusColor(feedback.status)}
                                  variant="flat"
                                  size="sm"
                                  startContent={getStatusIcon(feedback.status)}
                                >
                                  {feedback.status === 'responded' ? 'Yanıtlandı' : 'Bekliyor'}
                                </Chip>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                              {feedback.comment}
                            </p>
                            
                            {/* Photos */}
                            {feedback.photos && feedback.photos.length > 0 && (
                              <div className="flex gap-2 mb-3">
                                {feedback.photos.map((photo, idx) => (
                                  <div key={idx} className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                                    {photo}
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Tags */}
                            {feedback.tags && feedback.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {feedback.tags.map((tag, idx) => (
                                  <Chip key={idx} size="sm" variant="dot">
                                    {tag}
                                  </Chip>
                                ))}
                              </div>
                            )}
                            
                            {/* Response */}
                            {feedback.response && (
                              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded mt-3">
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                                  İşletme Yanıtı:
                                </p>
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                  {feedback.response}
                                </p>
                              </div>
                            )}
                            
                            {/* Engagement Stats */}
                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{feedback.likes || 0} Beğeni</span>
                              </button>
                              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                                <Award className="w-4 h-4" />
                                <span>{feedback.helpful || 0} Faydalı</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredFeedback.length === 0 && (
              <Card>
                <CardBody className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Feedback bulunamadı</h3>
                  <p className="text-gray-500 mb-4">Filtreleri değiştirmeyi deneyin</p>
                  <Button variant="bordered" onPress={() => {
                    setFilterStatus('all')
                    setFilterRating('all')
                    setActiveTab('all')
                  }}>
                    Filtreleri Temizle
                  </Button>
                </CardBody>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* New Feedback Modal */}
      <Modal 
        isOpen={showNewFeedbackModal} 
        onClose={() => setShowNewFeedbackModal(false)}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            <div>
              <h3 className="text-xl font-bold">Yeni Feedback Ekle</h3>
              <p className="text-sm text-gray-500 font-normal">Deneyiminizi bizimle paylaşın</p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">Puanınız</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= newRating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category */}
              <Select
                label="Kategori"
                placeholder="Feedback kategorisi seçin"
                selectedKeys={newCategory ? [newCategory] : []}
                onSelectionChange={(keys) => setNewCategory(Array.from(keys)[0] as string)}
              >
                {categories.map((cat) => (
                  <SelectItem key={cat.key}>{cat.label}</SelectItem>
                ))}
              </Select>
              
              {/* Comment */}
              <Textarea
                label="Yorumunuz"
                placeholder="Deneyiminizi detaylı bir şekilde anlatın..."
                value={newComment}
                onValueChange={setNewComment}
                minRows={4}
              />
              
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Fotoğraflar (İsteğe bağlı)</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="bordered"
                    startContent={<Camera className="w-4 h-4" />}
                    as="label"
                  >
                    Fotoğraf Ekle
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </Button>
                  
                  {uploadedPhotos.length > 0 && (
                    <div className="flex gap-2">
                      {uploadedPhotos.map((photo, idx) => (
                        <div key={idx} className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                          {photo}
                          <button
                            onClick={() => setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== idx))}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setShowNewFeedbackModal(false)}>
              İptal
            </Button>
            <Button 
              color="primary" 
              onPress={handleSubmitFeedback}
              isDisabled={newRating === 0 || !newComment}
              startContent={<Send className="w-4 h-4" />}
            >
              Gönder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EnhancedFeedbackPage

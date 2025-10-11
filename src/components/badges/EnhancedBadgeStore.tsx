import { useState } from 'react'
import { Card, CardBody, Button, Tabs, Tab, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem, Badge as UIBadge } from '@nextui-org/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Palette, Sparkles, Crown, Star, Search, Filter, Heart, ShoppingCart, Clock, Zap, Gift, TrendingUp } from 'lucide-react'

interface BadgeStoreProps {
  userPoints: number
  onPurchase: (item: StoreItem) => void
}

interface StoreItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  type: 'frame' | 'effect' | 'background' | 'animation' | 'sound' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  preview: string
  unlocked: boolean
  isNew?: boolean
  isOnSale?: boolean
  saleEndTime?: Date
  popularity?: number
}

interface CartItem extends StoreItem {
  quantity: number
}

function EnhancedBadgeStore({ userPoints, onPurchase }: BadgeStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showPurchaseHistory, setPurchaseHistory] = useState(false)

  // Debug state changes (geliştirme amaçlı)
  // Removed console.log for production build

  const storeItems: StoreItem[] = [
    // Çerçeveler
    {
      id: 'golden-frame',
      name: 'Altın Çerçeve',
      description: 'Rozetlerine lüks altın çerçeve ekle',
      price: 400,
      originalPrice: 500,
      type: 'frame',
      rarity: 'epic',
      preview: '🟨',
      unlocked: false,
      isOnSale: true,
      saleEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      popularity: 95
    },
    {
      id: 'diamond-frame',
      name: 'Elmas Çerçeve',
      description: 'Kristal berraklığında elmas çerçeve',
      price: 1000,
      type: 'frame',
      rarity: 'legendary',
      preview: '💎',
      unlocked: false,
      isNew: true,
      popularity: 88
    },
    {
      id: 'rainbow-frame',
      name: 'Gökkuşağı Çerçeve',
      description: 'Rengarenk gökkuşağı efektli çerçeve',
      price: 600,
      type: 'frame',
      rarity: 'epic',
      preview: '🌈',
      unlocked: false,
      popularity: 72
    },
    
    // Efektler
    {
      id: 'fire-effect',
      name: 'Ateş Efekti',
      description: 'Rozetlerin etrafında dans eden alevler',
      price: 300,
      type: 'effect',
      rarity: 'rare',
      preview: '🔥',
      unlocked: false,
      popularity: 85
    },
    {
      id: 'lightning-effect',
      name: 'Şimşek Efekti',
      description: 'Elektriksel enerji çakmaları',
      price: 400,
      type: 'effect',
      rarity: 'epic',
      preview: '⚡',
      unlocked: false,
      popularity: 78
    },
    {
      id: 'ice-effect',
      name: 'Buz Efekti',
      description: 'Dondurucu buz kristalleri',
      price: 350,
      type: 'effect',
      rarity: 'rare',
      preview: '❄️',
      unlocked: false,
      isNew: true,
      popularity: 65
    },
    
    // Arka planlar
    {
      id: 'galaxy-bg',
      name: 'Galaksi Arka Plan',
      description: 'Sonsuz uzayın derinlikleri',
      price: 250,
      type: 'background',
      rarity: 'rare',
      preview: '🌌',
      unlocked: false,
      popularity: 82
    },
    {
      id: 'forest-bg',
      name: 'Orman Arka Plan',
      description: 'Huzurlu yeşil orman manzarası',
      price: 200,
      type: 'background',
      rarity: 'common',
      preview: '🌲',
      unlocked: false,
      popularity: 60
    },
    {
      id: 'ocean-bg',
      name: 'Okyanus Arka Plan',
      description: 'Derin mavi okyanus dalgaları',
      price: 280,
      type: 'background',
      rarity: 'rare',
      preview: '🌊',
      unlocked: false,
      popularity: 70
    },
    
    // Animasyonlar
    {
      id: 'floating-animation',
      name: 'Yüzen Animasyon',
      description: 'Rozet yumuşakça yüzer',
      price: 200,
      type: 'animation',
      rarity: 'common',
      preview: '↕️',
      unlocked: false,
      popularity: 55
    },
    {
      id: 'spinning-animation',
      name: 'Dönen Animasyon',
      description: 'Rozet kendi etrafında döner',
      price: 250,
      type: 'animation',
      rarity: 'common',
      preview: '🔄',
      unlocked: false,
      popularity: 48
    },
    {
      id: 'pulse-animation',
      name: 'Nabız Animasyon',
      description: 'Rozet ritmik olarak büyür küçülür',
      price: 300,
      type: 'animation',
      rarity: 'rare',
      preview: '💓',
      unlocked: false,
      popularity: 63
    },
    
    // Ses Efektleri
    {
      id: 'victory-sound',
      name: 'Zafer Sesi',
      description: 'Rozet kazanırken çalan zafer fanfarı',
      price: 150,
      type: 'sound',
      rarity: 'common',
      preview: '🎺',
      unlocked: false,
      popularity: 40
    },
    {
      id: 'magic-sound',
      name: 'Büyü Sesi',
      description: 'Mistik büyü sesi efekti',
      price: 200,
      type: 'sound',
      rarity: 'rare',
      preview: '🪄',
      unlocked: false,
      popularity: 52
    },
    
    // Özel Ürünler
    {
      id: 'vip-package',
      name: 'VIP Paketi',
      description: 'Tüm premium özellikleri içeren özel paket',
      price: 2000,
      type: 'special',
      rarity: 'legendary',
      preview: '👑',
      unlocked: false,
      isNew: true,
      popularity: 95
    }
  ]

  const categories = [
    { key: 'all', label: 'Tümü', icon: '🛍️' },
    { key: 'frame', label: 'Çerçeveler', icon: '🖼️' },
    { key: 'effect', label: 'Efektler', icon: '✨' },
    { key: 'background', label: 'Arka Planlar', icon: '🎨' },
    { key: 'animation', label: 'Animasyonlar', icon: '🎭' },
    { key: 'sound', label: 'Ses Efektleri', icon: '🔊' },
    { key: 'special', label: 'Özel', icon: '🎁' }
  ]

  const sortOptions = [
    { key: 'popularity', label: 'Popülerlik' },
    { key: 'price-low', label: 'Fiyat (Düşük → Yüksek)' },
    { key: 'price-high', label: 'Fiyat (Yüksek → Düşük)' },
    { key: 'newest', label: 'En Yeni' },
    { key: 'rarity', label: 'Nadirlik' }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'warning'
      case 'epic': return 'secondary'
      case 'rare': return 'primary'
      default: return 'default'
    }
  }

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-400 to-pink-500'
      case 'rare': return 'from-blue-400 to-cyan-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  // Filtreleme ve sıralama
  const filteredAndSortedItems = storeItems
    .filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case 'rarity':
          const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 }
          return rarityOrder[b.rarity] - rarityOrder[a.rarity]
        default:
          return 0
      }
    })

  const addToCart = (item: StoreItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id)
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const toggleWishlist = (itemId: string) => {
    setWishlist(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handlePurchase = (item: StoreItem) => {
    if (userPoints >= item.price && !item.unlocked) {
      onPurchase(item)
      setShowPreview(false)
    }
  }

  const formatTimeLeft = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}s ${minutes}dk`
  }

  return (
    <div className="space-y-6">
      {/* Mağaza Başlığı */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rozet Mağazası</h2>
            <p className="text-gray-500">Rozetlerini özelleştir ve güzelleştir</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-lg">{userPoints}</span>
                <span className="text-sm text-gray-500">Puan</span>
              </div>
            </CardBody>
          </Card>
          
          <Button
            variant="bordered"
            startContent={<ShoppingCart className="w-4 h-4" />}
            onClick={() => setShowCart(true)}
          >
            Sepet ({cart.length})
          </Button>
        </div>
      </div>

      {/* Daily Deals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-orange-500 to-red-500">
          <CardBody className="p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Günün Fırsatları</h3>
                  <p className="text-white/90">Sınırlı süre indirimler!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/80">Kalan Süre</div>
                <div className="text-lg font-bold">
                  {formatTimeLeft(new Date(Date.now() + 24 * 60 * 60 * 1000))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-4 overflow-x-auto pb-2">
              {storeItems.filter(item => item.isOnSale).map((item) => (
                <div key={item.id} className="flex-shrink-0">
                  <Card className="w-32 bg-white/10 backdrop-blur-sm border border-white/20">
                    <CardBody className="p-3 text-center">
                      <div className="text-2xl mb-2">{item.preview}</div>
                      <p className="text-xs text-white font-medium mb-2">{item.name}</p>
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-sm font-bold text-white">{item.price}p</span>
                        {item.originalPrice && (
                          <span className="text-xs text-white/60 line-through">{item.originalPrice}p</span>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Arama ve Filtreler */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardBody className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                placeholder="Ürün ara..."
                value={searchTerm}
                onValueChange={setSearchTerm}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                className="flex-1"
                variant="bordered"
              />
              
              <Select
                placeholder="Sırala"
                selectedKeys={[sortBy]}
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                className="min-w-[180px]"
                variant="bordered"
                startContent={<TrendingUp className="w-4 h-4 text-gray-400" />}
              >
                {sortOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Kategoriler */}
      <Tabs
        selectedKey={selectedCategory}
        onSelectionChange={(key) => setSelectedCategory(key as string)}
        className="w-full"
      >
        {categories.map((category) => (
          <Tab 
            key={category.key} 
            title={
              <div className="flex items-center space-x-2">
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </div>
            } 
          />
        ))}
      </Tabs>

      {/* Ürün Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredAndSortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg relative ${
                item.unlocked ? 'opacity-50' : ''
              }`}>
                <CardBody className="p-6">
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    {item.isNew && (
                      <UIBadge color="success" size="sm">YENİ</UIBadge>
                    )}
                    {item.isOnSale && (
                      <UIBadge color="danger" size="sm">İNDİRİM</UIBadge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="absolute top-2 left-2"
                    onPress={() => toggleWishlist(item.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        wishlist.includes(item.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                  
                  <div className="flex items-start justify-between mb-4 mt-6">
                    <div className="text-4xl">{item.preview}</div>
                    <Chip 
                      color={getRarityColor(item.rarity)} 
                      size="sm"
                      className="capitalize"
                    >
                      {item.rarity === 'legendary' ? 'Efsanevi' : 
                       item.rarity === 'epic' ? 'Epik' :
                       item.rarity === 'rare' ? 'Nadir' : 'Yaygın'}
                    </Chip>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Popularity */}
                  {item.popularity && (
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">
                        %{item.popularity} popüler
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-lg">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="bordered"
                      className="flex-1"
                      onPress={() => {
                        console.log('Önizleme butonu tıklandı:', item.name)
                        setSelectedItem(item)
                        setShowPreview(true)
                      }}
                    >
                      Önizle
                    </Button>
                    
                    {item.unlocked ? (
                      <Button size="sm" color="success" disabled className="flex-1">
                        Sahip
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        color="primary"
                        className="flex-1"
                        onPress={() => addToCart(item)}
                        disabled={userPoints < item.price}
                      >
                        Sepete Ekle
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sepet Modal */}
      <Modal isOpen={showCart} onClose={() => setShowCart(false)} size="2xl">
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6" />
              <span>Alışveriş Sepeti ({cart.length} ürün)</span>
            </div>
          </ModalHeader>
          <ModalBody>
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Sepetiniz boş</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.preview}</span>
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.price} puan</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span>Adet: {item.quantity}</span>
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onClick={() => setCart(prev => prev.filter(cartItem => cartItem.id !== item.id))}
                      >
                        Kaldır
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Toplam:</span>
                    <span>{getTotalCartPrice()} Puan</span>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setShowCart(false)}>
              Kapat
            </Button>
            {cart.length > 0 && (
              <Button 
                color="primary" 
                disabled={userPoints < getTotalCartPrice()}
                onPress={() => {
                  cart.forEach(item => onPurchase(item))
                  setCart([])
                  setShowCart(false)
                }}
              >
                Satın Al ({getTotalCartPrice()} Puan)
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Önizleme Modal */}
      <Modal 
        isOpen={showPreview} 
        onClose={() => {
          console.log('Önizleme modal kapatılıyor')
          setShowPreview(false)
        }}
        size="lg"
        backdrop="blur"
        placement="center"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {selectedItem ? (
            <>
              <ModalHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{selectedItem.preview}</span>
                  <div>
                    <h3 className="text-xl font-bold">{selectedItem.name}</h3>
                    <p className="text-sm text-gray-500">{selectedItem.description}</p>
                  </div>
                </div>
              </ModalHeader>
              
              <ModalBody>
                {/* Gerçek Önizleme Alanı */}
                <div className="space-y-6">
                  {/* Önce - Sonra Karşılaştırması */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Önce */}
                    <div className="text-center">
                      <h4 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
                        Şu Anki Görünüm
                      </h4>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
                        <div className="text-4xl mb-2">🏆</div>
                        <p className="text-xs text-gray-500">Standart rozet</p>
                      </div>
                    </div>
                    
                    {/* Sonra */}
                    <div className="text-center">
                      <h4 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
                        {selectedItem.type === 'frame' && 'Çerçeve ile'}
                        {selectedItem.type === 'effect' && 'Efekt ile'}
                        {selectedItem.type === 'background' && 'Arka plan ile'}
                        {selectedItem.type === 'animation' && 'Animasyon ile'}
                        {selectedItem.type === 'sound' && 'Ses efekti ile'}
                        {selectedItem.type === 'special' && 'Özel efekt ile'}
                      </h4>
                      <div className={`bg-gradient-to-br ${getRarityGradient(selectedItem.rarity)} rounded-xl p-6 relative overflow-hidden`}>
                        {/* Arka plan efektleri */}
                        {selectedItem.type === 'background' && (
                          <div className="absolute inset-0 opacity-30">
                            {selectedItem.id === 'galaxy-bg' && (
                              <div className="w-full h-full bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900" />
                            )}
                            {selectedItem.id === 'forest-bg' && (
                              <div className="w-full h-full bg-gradient-to-r from-green-800 via-green-700 to-green-900" />
                            )}
                            {selectedItem.id === 'ocean-bg' && (
                              <div className="w-full h-full bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-900" />
                            )}
                          </div>
                        )}
                        
                        {/* Çerçeve efektleri */}
                        {selectedItem.type === 'frame' && (
                          <div className="absolute inset-0">
                            {selectedItem.id === 'golden-frame' && (
                              <div className="border-4 border-yellow-400 rounded-xl shadow-lg shadow-yellow-400/50" />
                            )}
                            {selectedItem.id === 'diamond-frame' && (
                              <div className="border-4 border-gradient-to-r from-cyan-400 to-blue-400 rounded-xl shadow-lg shadow-cyan-400/50 animate-pulse" />
                            )}
                            {selectedItem.id === 'rainbow-frame' && (
                              <div className="border-4 border-transparent bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-xl p-1">
                                <div className="bg-gray-900 rounded-lg h-full w-full" />
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Ana rozet ikonu */}
                        <div className={`text-4xl mb-2 relative z-10 ${
                          selectedItem.type === 'animation' && selectedItem.id === 'floating-animation' ? 'animate-bounce' :
                          selectedItem.type === 'animation' && selectedItem.id === 'spinning-animation' ? 'animate-spin' :
                          selectedItem.type === 'animation' && selectedItem.id === 'pulse-animation' ? 'animate-pulse' : ''
                        }`}>
                          🏆
                        </div>
                        
                        {/* Efekt parçacıkları */}
                        {selectedItem.type === 'effect' && (
                          <div className="absolute inset-0 pointer-events-none">
                            {selectedItem.id === 'fire-effect' && (
                              <>
                                <div className="absolute top-2 left-2 text-red-500 animate-pulse">🔥</div>
                                <div className="absolute top-4 right-3 text-orange-500 animate-pulse delay-300">🔥</div>
                                <div className="absolute bottom-3 left-4 text-yellow-500 animate-pulse delay-700">🔥</div>
                              </>
                            )}
                            {selectedItem.id === 'lightning-effect' && (
                              <>
                                <div className="absolute top-1 right-1 text-blue-400 animate-ping">⚡</div>
                                <div className="absolute bottom-2 left-2 text-cyan-400 animate-ping delay-500">⚡</div>
                              </>
                            )}
                            {selectedItem.id === 'ice-effect' && (
                              <>
                                <div className="absolute top-2 left-3 text-blue-200 animate-pulse">❄️</div>
                                <div className="absolute top-3 right-2 text-cyan-200 animate-pulse delay-1000">❄️</div>
                                <div className="absolute bottom-2 right-4 text-blue-300 animate-pulse delay-500">❄️</div>
                              </>
                            )}
                          </div>
                        )}
                        
                        <p className="text-xs text-white font-medium relative z-10">
                          {selectedItem.type === 'frame' && 'Çerçeveli rozet'}
                          {selectedItem.type === 'effect' && 'Efektli rozet'}
                          {selectedItem.type === 'background' && 'Özel arka plan'}
                          {selectedItem.type === 'animation' && 'Animasyonlu rozet'}
                          {selectedItem.type === 'sound' && 'Ses efektli rozet'}
                          {selectedItem.type === 'special' && 'VIP görünüm'}
                        </p>
                        
                        {/* Ses efekti göstergesi */}
                        {selectedItem.type === 'sound' && (
                          <div className="absolute top-2 right-2 animate-pulse">
                            <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Ürün Açıklaması */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Bu ürün neler sağlar?</h5>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {selectedItem.type === 'frame' && (
                        <>
                          <p>• Rozetlerinizin etrafında özel çerçeve</p>
                          <p>• {selectedItem.rarity === 'legendary' ? 'Premium' : 'Özel'} görünüm</p>
                          <p>• Tüm rozetlerde kullanılabilir</p>
                        </>
                      )}
                      {selectedItem.type === 'effect' && (
                        <>
                          <p>• Rozetlerinizin etrafında {selectedItem.preview} efekti</p>
                          <p>• Sürekli animasyonlu görünüm</p>
                          <p>• Hover'da özel efektler</p>
                        </>
                      )}
                      {selectedItem.type === 'background' && (
                        <>
                          <p>• Rozet arka planında özel tema</p>
                          <p>• Gradient renk geçişleri</p>
                          <p>• Atmosferik görünüm</p>
                        </>
                      )}
                      {selectedItem.type === 'animation' && (
                        <>
                          <p>• Rozetleriniz sürekli hareket eder</p>
                          <p>• {selectedItem.name.toLowerCase()} animasyonu</p>
                          <p>• Dikkat çekici görünüm</p>
                        </>
                      )}
                      {selectedItem.type === 'sound' && (
                        <>
                          <p>• Rozet kazanırken özel ses efekti</p>
                          <p>• {selectedItem.name.toLowerCase()} sesi</p>
                          <p>• Daha etkileşimli deneyim</p>
                        </>
                      )}
                      {selectedItem.type === 'special' && (
                        <>
                          <p>• Tüm premium özellikler dahil</p>
                          <p>• Özel VIP görünüm</p>
                          <p>• Sınırsız kullanım</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Fiyat:</span>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold">{selectedItem.price} Puan</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Nadirlik:</span>
                    <Chip 
                      color={getRarityColor(selectedItem.rarity)} 
                      size="sm"
                      className="capitalize"
                    >
                      {selectedItem.rarity === 'legendary' ? 'Efsanevi' : 
                       selectedItem.rarity === 'epic' ? 'Epik' :
                       selectedItem.rarity === 'rare' ? 'Nadir' : 'Yaygın'}
                    </Chip>
                  </div>
                </div>
              </ModalBody>
              
              <ModalFooter>
                <Button 
                  variant="bordered" 
                  onPress={() => setShowPreview(false)}
                >
                  Kapat
                </Button>
                
                <Button
                  variant="bordered"
                  startContent={<Heart className="w-4 h-4" />}
                  onClick={() => toggleWishlist(selectedItem.id)}
                >
                  {wishlist.includes(selectedItem.id) ? 'Listeden Çıkar' : 'İstek Listesine Ekle'}
                </Button>
                
                {!selectedItem.unlocked && userPoints >= selectedItem.price && (
                  <Button 
                    color="primary" 
                    onPress={() => handlePurchase(selectedItem)}
                  >
                    Satın Al ({selectedItem.price} Puan)
                  </Button>
                )}
              </ModalFooter>
            </>
          ) : (
            <ModalBody>
              <div className="text-center py-8">
                <p className="text-gray-500">Ürün bilgisi yükleniyor...</p>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EnhancedBadgeStore

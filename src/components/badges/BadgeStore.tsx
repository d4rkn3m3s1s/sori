import { useState } from 'react'
import { Card, CardBody, Button, Tabs, Tab, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { ShoppingBag, Palette, Sparkles, Crown, Star } from 'lucide-react'

interface BadgeStoreProps {
  userPoints: number
  onPurchase: (item: StoreItem) => void
}

interface StoreItem {
  id: string
  name: string
  description: string
  price: number
  type: 'frame' | 'effect' | 'background' | 'animation'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  preview: string
  unlocked: boolean
}

function BadgeStore({ userPoints, onPurchase }: BadgeStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState('frames')
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const storeItems: StoreItem[] = [
    // Çerçeveler
    {
      id: 'golden-frame',
      name: 'Altın Çerçeve',
      description: 'Rozetlerine altın çerçeve ekle',
      price: 500,
      type: 'frame',
      rarity: 'epic',
      preview: '🟨',
      unlocked: false
    },
    {
      id: 'diamond-frame',
      name: 'Elmas Çerçeve',
      description: 'Kristal berraklığında elmas çerçeve',
      price: 1000,
      type: 'frame',
      rarity: 'legendary',
      preview: '💎',
      unlocked: false
    },
    
    // Efektler
    {
      id: 'fire-effect',
      name: 'Ateş Efekti',
      description: 'Rozetlerin etrafında ateş efekti',
      price: 300,
      type: 'effect',
      rarity: 'rare',
      preview: '🔥',
      unlocked: false
    },
    {
      id: 'lightning-effect',
      name: 'Şimşek Efekti',
      description: 'Elektriksel enerji efekti',
      price: 400,
      type: 'effect',
      rarity: 'epic',
      preview: '⚡',
      unlocked: false
    },
    
    // Arka planlar
    {
      id: 'galaxy-bg',
      name: 'Galaksi Arka Plan',
      description: 'Uzay temalı arka plan',
      price: 250,
      type: 'background',
      rarity: 'rare',
      preview: '🌌',
      unlocked: false
    },
    
    // Animasyonlar
    {
      id: 'floating-animation',
      name: 'Yüzen Animasyon',
      description: 'Rozet yukarı aşağı yüzer',
      price: 200,
      type: 'animation',
      rarity: 'common',
      preview: '↕️',
      unlocked: false
    }
  ]

  const categories = [
    { key: 'frames', label: 'Çerçeveler', icon: '🖼️' },
    { key: 'effects', label: 'Efektler', icon: '✨' },
    { key: 'backgrounds', label: 'Arka Planlar', icon: '🎨' },
    { key: 'animations', label: 'Animasyonlar', icon: '🎭' }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'warning'
      case 'epic': return 'secondary'
      case 'rare': return 'primary'
      default: return 'default'
    }
  }

  const filteredItems = storeItems.filter(item => {
    switch (selectedCategory) {
      case 'frames': return item.type === 'frame'
      case 'effects': return item.type === 'effect'
      case 'backgrounds': return item.type === 'background'
      case 'animations': return item.type === 'animation'
      default: return true
    }
  })

  const handlePurchase = (item: StoreItem) => {
    if (userPoints >= item.price && !item.unlocked) {
      onPurchase(item)
      setShowPreview(false)
    }
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
        
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-lg">{userPoints}</span>
              <span className="text-sm text-gray-500">Puan</span>
            </div>
          </CardBody>
        </Card>
      </div>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
              item.unlocked ? 'opacity-50' : ''
            }`}>
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{item.preview}</div>
                  <Chip 
                    color={getRarityColor(item.rarity)} 
                    size="sm"
                    className="capitalize"
                  >
                    {item.rarity}
                  </Chip>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold">{item.price}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="bordered"
                      onClick={() => {
                        setSelectedItem(item)
                        setShowPreview(true)
                      }}
                    >
                      Önizle
                    </Button>
                    
                    {item.unlocked ? (
                      <Button size="sm" color="success" disabled>
                        Sahip
                      </Button>
                    ) : userPoints >= item.price ? (
                      <Button 
                        size="sm" 
                        color="primary"
                        onClick={() => handlePurchase(item)}
                      >
                        Satın Al
                      </Button>
                    ) : (
                      <Button size="sm" disabled>
                        Yetersiz Puan
                      </Button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Önizleme Modal */}
      <Modal 
        isOpen={showPreview} 
        onClose={() => setShowPreview(false)}
        size="lg"
      >
        <ModalContent>
          {selectedItem && (
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
                {/* Önizleme Alanı */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedItem.type === 'frame' && 'Rozet çerçeve ile gösterilecek'}
                    {selectedItem.type === 'effect' && 'Rozet efekt ile gösterilecek'}
                    {selectedItem.type === 'background' && 'Rozet arka plan ile gösterilecek'}
                    {selectedItem.type === 'animation' && 'Rozet animasyon ile gösterilecek'}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold text-lg">{selectedItem.price} Puan</span>
                  </div>
                  
                  <Chip 
                    color={getRarityColor(selectedItem.rarity)} 
                    className="capitalize"
                  >
                    {selectedItem.rarity}
                  </Chip>
                </div>
              </ModalBody>
              
              <ModalFooter>
                <Button 
                  variant="bordered" 
                  onPress={() => setShowPreview(false)}
                >
                  Kapat
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
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default BadgeStore

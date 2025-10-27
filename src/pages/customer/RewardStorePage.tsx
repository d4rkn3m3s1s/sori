import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { ShoppingCart, Star, Gift, Sparkles, CheckCircle, AlertCircle, TrendingUp, Zap } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { REWARD_STORE, REWARD_CATEGORIES, Reward } from '../../data/rewardStore'
import confetti from 'canvas-confetti'

function RewardStorePage() {
  const [rewards, setRewards] = useState<Reward[]>(REWARD_STORE)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [userPoints, setUserPoints] = useState(2500) // Mock user points
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)

  // Filter rewards
  const filteredRewards = rewards.filter(reward => {
    if (selectedCategory === 'all') return true
    return reward.type === selectedCategory
  })

  // Sort: featured first, then by price
  const sortedRewards = [...filteredRewards].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return a.price - b.price
  })

  const handlePurchase = (reward: Reward) => {
    setSelectedReward(reward)
    setIsModalOpen(true)
  }

  const confirmPurchase = () => {
    if (!selectedReward) return

    if (userPoints >= selectedReward.price) {
      // Deduct points
      setUserPoints(userPoints - selectedReward.price)
      
      // Mark as purchased
      setRewards(rewards.map(r => 
        r.id === selectedReward.id ? { ...r, purchased: true } : r
      ))

      // Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      setIsModalOpen(false)
      setSelectedReward(null)
    }
  }

  const getRarityColor = (rarity: Reward['rarity']) => {
    const colors = {
      common: 'default',
      rare: 'primary',
      epic: 'secondary',
      legendary: 'warning'
    }
    return colors[rarity] as any
  }

  const getRarityLabel = (rarity: Reward['rarity']) => {
    const labels = {
      common: 'Yaygın',
      rare: 'Nadir',
      epic: 'Epik',
      legendary: 'Efsanevi'
    }
    return labels[rarity]
  }

  const getCategoryIcon = (type: Reward['type']) => {
    const icons = {
      badge: '🏆',
      theme: '🎨',
      avatar: '🖼️',
      coupon: '🎫',
      feature: '✨',
      boost: '⚡'
    }
    return icons[type]
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🎁 Ödül Dükkanı" 
          subtitle="Puanlarınızla harika ödüller kazanın!"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* User Points Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <ShoppingCart className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-white">
                        <p className="text-sm opacity-90">Mevcut Puanın</p>
                        <p className="text-4xl font-bold">{userPoints}</p>
                        <p className="text-sm opacity-90">Harcamaya hazır</p>
                      </div>
                    </div>
                    <div className="text-right text-white">
                      <p className="text-sm opacity-90">Satın Alınan</p>
                      <p className="text-3xl font-bold">
                        {rewards.filter(r => r.purchased).length}
                      </p>
                      <p className="text-sm opacity-90">Ödül</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Category Tabs */}
            <Card>
              <CardBody className="p-4">
                <Tabs
                  selectedKey={selectedCategory}
                  onSelectionChange={(key) => setSelectedCategory(key as string)}
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                    tab: "px-4",
                    tabContent: "group-data-[selected=true]:text-purple-600"
                  }}
                >
                  {Object.entries(REWARD_CATEGORIES).map(([key, cat]) => (
                    <Tab 
                      key={key} 
                      title={
                        <div className="flex items-center space-x-2">
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </div>
                      } 
                    />
                  ))}
                </Tabs>
              </CardBody>
            </Card>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedRewards.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`relative overflow-hidden transition-all hover:scale-105 ${
                        reward.purchased ? 'border-2 border-green-500' : ''
                      } ${reward.featured ? 'shadow-xl shadow-purple-500/20' : ''}`}
                    >
                      <CardBody className="p-6">
                        {/* Featured Badge */}
                        {reward.featured && !reward.purchased && (
                          <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                            ÖNE ÇIKAN
                          </div>
                        )}

                        {/* Purchased Badge */}
                        {reward.purchased && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <div className="bg-green-500 rounded-full p-2">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          </motion.div>
                        )}

                        {/* Icon */}
                        <div 
                          className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-5xl bg-gradient-to-br ${reward.gradient}`}
                        >
                          {reward.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
                          {reward.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                          {reward.description}
                        </p>

                        {/* Badges */}
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <Chip size="sm" color={getRarityColor(reward.rarity)} variant="flat">
                            {getRarityLabel(reward.rarity)}
                          </Chip>
                          <Chip size="sm" variant="flat">
                            {getCategoryIcon(reward.type)} {REWARD_CATEGORIES[reward.type].label}
                          </Chip>
                        </div>

                        {/* Stock */}
                        {reward.limited && reward.stock && (
                          <div className="text-center mb-4">
                            <Chip 
                              size="sm" 
                              color={reward.stock < 10 ? 'danger' : 'warning'}
                              variant="flat"
                            >
                              Sadece {reward.stock} adet kaldı!
                            </Chip>
                          </div>
                        )}

                        {/* Price & Button */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Fiyat</span>
                            <div className="flex items-center space-x-2">
                              {reward.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  {reward.originalPrice}
                                </span>
                              )}
                              <Chip
                                size="sm"
                                className={`bg-gradient-to-r ${reward.gradient} text-white font-bold`}
                                startContent={<Star className="w-3 h-3" />}
                              >
                                {reward.price} puan
                              </Chip>
                            </div>
                          </div>

                          <Button
                            fullWidth
                            size="lg"
                            className={`font-bold ${
                              reward.purchased
                                ? 'bg-green-500 text-white'
                                : userPoints >= reward.price
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-gray-300 text-gray-500'
                            }`}
                            isDisabled={reward.purchased || userPoints < reward.price}
                            onPress={() => handlePurchase(reward)}
                            startContent={
                              reward.purchased ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <ShoppingCart className="w-5 h-5" />
                              )
                            }
                          >
                            {reward.purchased ? 'Satın Alındı' : 'Satın Al'}
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Tips Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardBody className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                      💡 Daha Fazla Puan Nasıl Kazanılır?
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Yorum yaparak puan kazanın</li>
                      <li>• Hedefleri tamamlayarak bonus puan alın</li>
                      <li>• Başarıları açarak ekstra ödüller kazanın</li>
                      <li>• Günlük serinizi koruyarak puan çarpanı artırın</li>
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>

      {/* Purchase Confirmation Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="md"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Satın Alma Onayı</h2>
          </ModalHeader>
          <ModalBody>
            {selectedReward && (
              <div className="text-center space-y-4">
                <div 
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-6xl bg-gradient-to-br ${selectedReward.gradient}`}
                >
                  {selectedReward.icon}
                </div>
                <h3 className="text-xl font-bold">{selectedReward.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedReward.description}
                </p>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Mevcut Puan:</span>
                    <span className="font-bold">{userPoints}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Fiyat:</span>
                    <span className="font-bold text-purple-600">-{selectedReward.price}</span>
                  </div>
                  <div className="h-px bg-gray-300 dark:bg-gray-600 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Kalan Puan:</span>
                    <span className="font-bold text-green-600">
                      {userPoints - selectedReward.price}
                    </span>
                  </div>
                </div>

                {userPoints < selectedReward.price && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">Yetersiz puan!</span>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button 
              color="danger" 
              variant="light" 
              onPress={() => setIsModalOpen(false)}
            >
              İptal
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              onPress={confirmPurchase}
              isDisabled={!selectedReward || userPoints < selectedReward.price}
            >
              Satın Al
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default RewardStorePage













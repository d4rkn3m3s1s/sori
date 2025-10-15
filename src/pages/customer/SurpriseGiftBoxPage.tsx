import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Card, CardBody, Button, Progress, Chip, Modal, 
  ModalContent, ModalHeader, ModalBody, ModalFooter
} from '@nextui-org/react'
import { 
  Gift, Sparkles, Trophy, Star, Zap, Heart, 
  Crown, Diamond, ArrowLeft, Lock, Unlock, PartyPopper,
  Coins, TrendingUp, Clock, CheckCircle, Package
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useConfetti } from '../../hooks/useConfetti'

interface GiftBox {
  id: string
  name: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  pointsCost: number
  possibleRewards: string[]
  color: string
  gradient: string
  unlocked: boolean
  cooldown?: number
  description: string
}

interface UnlockedReward {
  id: string
  name: string
  type: 'points' | 'badge' | 'discount' | 'item'
  value: string
  icon: string
  rarity: string
}

function SurpriseGiftBoxPage() {
  const navigate = useNavigate()
  const { triggerConfetti } = useConfetti()
  
  const [selectedBox, setSelectedBox] = useState<GiftBox | null>(null)
  const [showOpenModal, setShowOpenModal] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [openProgress, setOpenProgress] = useState(0)
  const [unlockedReward, setUnlockedReward] = useState<UnlockedReward | null>(null)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [userPoints, setUserPoints] = useState(1250)
  const [openedBoxes, setOpenedBoxes] = useState<string[]>([])
  
  // Zaman bazlı aktivite sistemi
  const [currentHour] = useState(new Date().getHours())
  const [activityPeriod, setActivityPeriod] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning')
  
  // Aktivite süresini hesapla (Mock data - gerçekte backend'den gelecek)
  useEffect(() => {
    if (currentHour >= 6 && currentHour < 12) {
      setActivityPeriod('morning') // Sabah 06:00-12:00
    } else if (currentHour >= 12 && currentHour < 18) {
      setActivityPeriod('afternoon') // Öğleden sonra 12:00-18:00
    } else if (currentHour >= 18 && currentHour < 24) {
      setActivityPeriod('evening') // Akşam 18:00-24:00
    } else {
      setActivityPeriod('night') // Gece 00:00-06:00
    }
  }, [currentHour])

  const giftBoxes: GiftBox[] = [
    {
      id: 'starter',
      name: 'Başlangıç Kutusu',
      icon: '🎁',
      rarity: 'common',
      pointsCost: 50,
      possibleRewards: ['10-50 Puan', 'Küçük İndirim Kuponu', 'Bronz Rozet'],
      color: '#9CA3AF',
      gradient: 'from-gray-400 to-gray-600',
      unlocked: true,
      description: 'Her zaman erişilebilir temel hediye kutusu'
    },
    {
      id: 'bronze',
      name: 'Bronz Kutu',
      icon: '📦',
      rarity: 'common',
      pointsCost: 100,
      possibleRewards: ['50-100 Puan', 'Orta İndirim Kuponu', 'Gümüş Rozet'],
      color: '#CD7F32',
      gradient: 'from-orange-400 to-orange-600',
      unlocked: true,
      description: 'İyi şanslar içeren bronz seviye kutu'
    },
    {
      id: 'silver',
      name: 'Gümüş Kutu',
      icon: '💎',
      rarity: 'rare',
      pointsCost: 200,
      possibleRewards: ['100-200 Puan', 'Büyük İndirim Kuponu', 'Altın Rozet', 'Özel Avatar'],
      color: '#C0C0C0',
      gradient: 'from-gray-300 to-gray-500',
      unlocked: true,
      description: 'Değerli ödüller içeren gümüş kutu'
    },
    {
      id: 'gold',
      name: 'Altın Kutu',
      icon: '🏆',
      rarity: 'epic',
      pointsCost: 400,
      possibleRewards: ['200-400 Puan', 'Premium İndirim', 'Platin Rozet', 'Özel Efekt', 'VIP Erişim (1 Gün)'],
      color: '#FFD700',
      gradient: 'from-yellow-400 to-yellow-600',
      unlocked: userPoints >= 300,
      cooldown: openedBoxes.includes('gold') ? 24 : undefined,
      description: 'Nadir ödüller içeren altın seviye kutu'
    },
    {
      id: 'platinum',
      name: 'Platin Kutu',
      icon: '💠',
      rarity: 'epic',
      pointsCost: 600,
      possibleRewards: ['400-600 Puan', 'Mega İndirim', 'Elmas Rozet', 'Özel Tema', 'VIP Erişim (3 Gün)'],
      color: '#E5E4E2',
      gradient: 'from-gray-200 to-blue-300',
      unlocked: userPoints >= 500,
      cooldown: openedBoxes.includes('platinum') ? 48 : undefined,
      description: 'Çok değerli ödüller içeren platin kutu'
    },
    {
      id: 'diamond',
      name: 'Elmas Kutu',
      icon: '💍',
      rarity: 'legendary',
      pointsCost: 1000,
      possibleRewards: ['600-1000 Puan', 'Ultimate İndirim', 'Efsanevi Rozet', 'Özel Animasyon', 'VIP Erişim (7 Gün)', 'Özel Unvan'],
      color: '#B9F2FF',
      gradient: 'from-cyan-300 to-blue-500',
      unlocked: userPoints >= 800,
      cooldown: openedBoxes.includes('diamond') ? 72 : undefined,
      description: 'Efsanevi ödüller içeren en değerli kutu'
    }
  ]

  const stats = {
    totalPoints: userPoints,
    boxesOpened: openedBoxes.length,
    nextMilestone: 2000,
    rarityProgress: Math.min((openedBoxes.length / 10) * 100, 100)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'default'
      case 'rare': return 'primary'
      case 'epic': return 'secondary'
      case 'legendary': return 'warning'
      default: return 'default'
    }
  }

  // Zaman bazlı ödül bonusları
  const getTimeBonusRewards = (period: typeof activityPeriod) => {
    switch (period) {
      case 'morning':
        return {
          name: 'Sabah Kahvesi',
          bonus: '+%10 Ekstra Puan',
          icon: '☕',
          color: 'from-orange-400 to-yellow-500',
          description: 'Sabah erken kalkanlar için kahve bonusu!'
        }
      case 'afternoon':
        return {
          name: 'Öğle Arası',
          bonus: '+%15 İndirim Kuponu',
          icon: '🍽️',
          color: 'from-green-400 to-emerald-500',
          description: 'Öğle vakti özel yemek indirimleri!'
        }
      case 'evening':
        return {
          name: 'Akşam Molası',
          bonus: '+%20 Ekstra Ödül Şansı',
          icon: '🌙',
          color: 'from-purple-400 to-pink-500',
          description: 'Akşam saatlerinde şansınız daha yüksek!'
        }
      case 'night':
        return {
          name: 'Gece Kuşu',
          bonus: '+Gizemli Rozet Şansı',
          icon: '🦉',
          color: 'from-blue-600 to-indigo-700',
          description: 'Gece geç saatlerde nadir ödüller!'
        }
    }
  }
  
  const getTimeBasedMultiplier = (period: typeof activityPeriod) => {
    switch (period) {
      case 'morning': return 1.1   // +%10
      case 'afternoon': return 1.15 // +%15
      case 'evening': return 1.2   // +%20
      case 'night': return 1.25    // +%25
    }
  }

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Yaygın'
      case 'rare': return 'Nadir'
      case 'epic': return 'Epik'
      case 'legendary': return 'Efsanevi'
      default: return rarity
    }
  }

  const handleOpenBox = (box: GiftBox) => {
    if (box.cooldown) {
      // Cooldown varsa açamaz
      return
    }
    if (!box.unlocked) {
      // Kilidi açık değilse açamaz
      return
    }
    if (userPoints < box.pointsCost) {
      // Yeterli puan yoksa açamaz
      return
    }

    setSelectedBox(box)
    setShowOpenModal(true)
  }

  const confirmOpenBox = () => {
    if (!selectedBox) return

    setIsOpening(true)
    setShowOpenModal(false)
    setOpenProgress(0)

    // Animasyon progress
    const interval = setInterval(() => {
      setOpenProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 50)

    // 2 saniye sonra ödülü göster
    setTimeout(() => {
      clearInterval(interval)
      setIsOpening(false)
      
      // Rastgele ödül oluştur
      const rewards = selectedBox.possibleRewards
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)]
      
      // Zaman bazlı çarpan uygula
      const multiplier = getTimeBasedMultiplier(activityPeriod)
      const timeBonus = getTimeBonusRewards(activityPeriod)
      
      // Puan ödüllerini çarpan ile artır
      let finalRewardName = randomReward
      if (randomReward.includes('Puan')) {
        const match = randomReward.match(/(\d+)-(\d+)/)
        if (match) {
          const min = Math.floor(parseInt(match[1]) * multiplier)
          const max = Math.floor(parseInt(match[2]) * multiplier)
          finalRewardName = `${min}-${max} Puan (${timeBonus.icon} ${timeBonus.name} Bonusu!)`
        }
      }
      
      const reward: UnlockedReward = {
        id: Date.now().toString(),
        name: finalRewardName,
        type: randomReward.includes('Puan') ? 'points' : 
              randomReward.includes('Rozet') ? 'badge' : 
              randomReward.includes('İndirim') ? 'discount' : 'item',
        value: finalRewardName,
        icon: selectedBox.icon,
        rarity: selectedBox.rarity
      }

      setUnlockedReward(reward)
      setShowRewardModal(true)
      
      // Puanı düş ve kutuyu işaretle
      setUserPoints(prev => prev - selectedBox.pointsCost)
      setOpenedBoxes(prev => [...prev, selectedBox.id])
      
      // Confetti efekti
      triggerConfetti()
    }, 2000)
  }

  const closeRewardModal = () => {
    setShowRewardModal(false)
    setUnlockedReward(null)
    setSelectedBox(null)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🎁 Sürpriz Hediye Kutuları" 
          subtitle="Kutuları aç, harika ödüller kazan!"
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

            {/* Time-Based Bonus Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={`bg-gradient-to-r ${getTimeBonusRewards(activityPeriod).color} border-2 border-white/30`}>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl animate-pulse">
                        {getTimeBonusRewards(activityPeriod).icon}
                      </div>
                      <div className="text-white">
                        <h3 className="text-2xl font-bold mb-1">
                          {getTimeBonusRewards(activityPeriod).name}
                        </h3>
                        <p className="text-white/90 text-sm mb-2">
                          {getTimeBonusRewards(activityPeriod).description}
                        </p>
                        <Chip 
                          size="lg" 
                          className="bg-white/20 text-white font-bold"
                          startContent={<Sparkles className="w-4 h-4" />}
                        >
                          {getTimeBonusRewards(activityPeriod).bonus}
                        </Chip>
                      </div>
                    </div>
                    
                    <div className="text-white text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-5 h-5" />
                        <span className="text-lg font-semibold">
                          {currentHour}:00 - {currentHour + 1}:00
                        </span>
                      </div>
                      <p className="text-sm text-white/80">
                        {activityPeriod === 'morning' && '🌅 Sabah (06:00-12:00)'}
                        {activityPeriod === 'afternoon' && '☀️ Öğleden Sonra (12:00-18:00)'}
                        {activityPeriod === 'evening' && '🌆 Akşam (18:00-24:00)'}
                        {activityPeriod === 'night' && '🌙 Gece (00:00-06:00)'}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600">
                  <CardBody className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-100 mb-1">Toplam Puanın</p>
                        <p className="text-3xl font-bold text-white">{stats.totalPoints}</p>
                      </div>
                      <Coins className="w-12 h-12 text-purple-200" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-pink-500 to-pink-600">
                  <CardBody className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-pink-100 mb-1">Açılan Kutu</p>
                        <p className="text-3xl font-bold text-white">{stats.boxesOpened}</p>
                      </div>
                      <Package className="w-12 h-12 text-pink-200" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
                  <CardBody className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-100 mb-1">Sonraki Hedef</p>
                        <p className="text-3xl font-bold text-white">{stats.nextMilestone}</p>
                      </div>
                      <TrendingUp className="w-12 h-12 text-blue-200" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600">
                  <CardBody className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-100 mb-1">Nadir Ödül İlerleme</p>
                        <p className="text-3xl font-bold text-white">{stats.rarityProgress.toFixed(0)}%</p>
                      </div>
                      <Trophy className="w-12 h-12 text-yellow-200" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Seviye İlerleme
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {userPoints} / {stats.nextMilestone} Puan
                      </span>
                    </div>
                    <Progress 
                      value={(userPoints / stats.nextMilestone) * 100} 
                      color="warning"
                      className="w-full"
                      size="lg"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Sonraki seviyeye ulaşmak için {stats.nextMilestone - userPoints} puan daha kazanmalısın!
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <PartyPopper className="w-8 h-8 text-white flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        Nasıl Çalışır?
                      </h3>
                      <p className="text-sm text-blue-50">
                        Puanlarını kullanarak hediye kutuları aç ve rastgele ödüller kazan! 
                        Daha değerli kutular açmak için daha fazla puan gerekir, ancak daha iyi ödüller kazanma şansın artar.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Gift Boxes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {giftBoxes.map((box, index) => (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card 
                    className={`relative overflow-hidden hover:scale-105 transition-transform duration-300 ${
                      !box.unlocked ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-10`} />
                    
                    <CardBody className="p-6 relative">
                      {/* Lock/Unlock Badge */}
                      <div className="absolute top-4 right-4">
                        {box.unlocked ? (
                          box.cooldown ? (
                            <Chip 
                              size="sm" 
                              color="warning"
                              startContent={<Clock className="w-3 h-3" />}
                            >
                              {box.cooldown}s
                            </Chip>
                          ) : (
                            <Chip 
                              size="sm" 
                              color="success"
                              startContent={<Unlock className="w-3 h-3" />}
                            >
                              Açık
                            </Chip>
                          )
                        ) : (
                          <Chip 
                            size="sm" 
                            color="default"
                            startContent={<Lock className="w-3 h-3" />}
                          >
                            Kilitli
                          </Chip>
                        )}
                      </div>

                      {/* Box Icon */}
                      <div className="text-center mb-4">
                        <div className="text-7xl mb-3 animate-bounce">{box.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {box.name}
                        </h3>
                        <Chip 
                          size="sm" 
                          color={getRarityColor(box.rarity)}
                          variant="flat"
                        >
                          {getRarityText(box.rarity)}
                        </Chip>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                        {box.description}
                      </p>

                      {/* Possible Rewards */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Olası Ödüller:
                        </p>
                        <div className="space-y-1">
                          {box.possibleRewards.map((reward, i) => (
                            <div 
                              key={i}
                              className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3 text-yellow-500" />
                              {reward}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cost and Open Button */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <Coins className="w-5 h-5 text-yellow-500" />
                          <span className="font-bold text-gray-900 dark:text-white">
                            {box.pointsCost} Puan
                          </span>
                        </div>
                        
                        <Button
                          fullWidth
                          size="lg"
                          className={`font-bold bg-gradient-to-r ${box.gradient} text-white`}
                          onClick={() => handleOpenBox(box)}
                          isDisabled={!box.unlocked || box.cooldown !== undefined || userPoints < box.pointsCost}
                          startContent={<Gift className="w-5 h-5" />}
                        >
                          {!box.unlocked ? 'Kilitli' :
                           box.cooldown ? `Bekleme: ${box.cooldown}s` :
                           userPoints < box.pointsCost ? 'Yetersiz Puan' :
                           'Kutuyu Aç!'}
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Confirm Open Modal */}
      <Modal
        isOpen={showOpenModal}
        onClose={() => setShowOpenModal(false)}
        size="md"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="text-4xl">{selectedBox?.icon}</div>
              <div>
                <h3 className="text-xl font-bold">{selectedBox?.name}</h3>
                <Chip size="sm" color={getRarityColor(selectedBox?.rarity || '')}>
                  {getRarityText(selectedBox?.rarity || '')}
                </Chip>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Bu kutuyu açmak istediğinden emin misin?
              </p>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Maliyet: {selectedBox?.pointsCost} Puan
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kalan puanın: {userPoints - (selectedBox?.pointsCost || 0)} olacak
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Kazanabileceğin ödüller:
                </p>
                {selectedBox?.possibleRewards.map((reward, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    {reward}
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setShowOpenModal(false)}>
              İptal
            </Button>
            <Button 
              color="primary"
              onPress={confirmOpenBox}
              className={`bg-gradient-to-r ${selectedBox?.gradient} text-white font-bold`}
            >
              Evet, Aç!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Opening Animation Modal */}
      <Modal
        isOpen={isOpening}
        hideCloseButton
        backdrop="blur"
        size="md"
      >
        <ModalContent>
          <ModalBody className="py-10">
            <div className="text-center space-y-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity
                }}
                className="text-8xl"
              >
                {selectedBox?.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Kutu Açılıyor...
              </h3>
              
              <Progress 
                value={openProgress} 
                color="success"
                size="lg"
                className="w-full"
              />
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sürpriz ödülün hazırlanıyor! 🎉
              </p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Reward Reveal Modal */}
      <AnimatePresence>
        {showRewardModal && unlockedReward && (
          <Modal
            isOpen={showRewardModal}
            onClose={closeRewardModal}
            size="lg"
            backdrop="blur"
          >
            <ModalContent>
              <ModalHeader>
                <h3 className="text-2xl font-bold text-center w-full">
                  🎊 Tebrikler! 🎊
                </h3>
              </ModalHeader>
              <ModalBody className="py-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="text-center space-y-6"
                >
                  <div className="text-9xl">{unlockedReward.icon}</div>
                  
                  <div>
                    <Chip 
                      size="lg" 
                      color={getRarityColor(unlockedReward.rarity)}
                      className="mb-3"
                    >
                      {getRarityText(unlockedReward.rarity)}
                    </Chip>
                    <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {unlockedReward.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ödülün envanterine eklendi!
                    </p>
                  </div>

                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <CardBody className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          Ödül Başarıyla Kazanıldı!
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  fullWidth
                  size="lg"
                  color="success"
                  onPress={closeRewardModal}
                  className="font-bold"
                >
                  Harika! 🎉
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SurpriseGiftBoxPage


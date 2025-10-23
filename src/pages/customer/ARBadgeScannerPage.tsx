import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Progress, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tabs, Tab, Tooltip } from '@nextui-org/react'
import { 
  Camera, MapPin, Crosshair, Zap, Award, Star, 
  Sparkles, TrendingUp, AlertCircle, ArrowLeft, Play,
  Pause, RotateCcw, Info, Lock, Unlock, Target, Scan,
  Battery, Flame, Gift, Share2, Volume2, Filter
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useNavigate } from 'react-router-dom'
import { ALL_AR_BADGES, ARBadge, BADGE_CATEGORIES, BADGE_COMBOS, INITIAL_ENERGY, SCAN_COST } from '../../data/arBadges'
import confetti from 'canvas-confetti'

const ARBadgeScannerPage = () => {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [nearbyBadges, setNearbyBadges] = useState<ARBadge[]>([])
  const [selectedBadge, setSelectedBadge] = useState<ARBadge | null>(null)
  const [discoveredBadge, setDiscoveredBadge] = useState<ARBadge | null>(null)
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [arMode, setArMode] = useState<'idle' | 'scanning' | 'found'>('idle')
  const [foundBadges, setFoundBadges] = useState<string[]>([])
  
  // YENİ: Enerji sistemi
  const [energy, setEnergy] = useState(INITIAL_ENERGY.current)
  const [maxEnergy] = useState(INITIAL_ENERGY.max)
  
  // YENİ: Power-up'lar
  const [activePowerUps, setActivePowerUps] = useState<string[]>([])
  
  // YENİ: Kategori filtresi
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  
  // YENİ: Sesler
  const [soundEnabled, setSoundEnabled] = useState(true)
  
  // YENİ: Combo tracker
  const [completedCombos, setCompletedCombos] = useState<string[]>([])

  // Kullanıcı konumunu al ve rozetleri yükle
  useEffect(() => {
    setUserLocation({ lat: 40.9903, lng: 29.0253 })
    
    // 1000m içindeki rozetler
    const nearby = ALL_AR_BADGES.filter(badge => badge.distance <= 1000)
    setNearbyBadges(nearby.sort((a, b) => a.distance - b.distance))
    
    // Enerji yenileme
    const energyInterval = setInterval(() => {
      setEnergy(prev => Math.min(prev + INITIAL_ENERGY.regenRate, maxEnergy))
    }, 60000) // Her dakika
    
    return () => clearInterval(energyInterval)
  }, [])

  // Kamera başlat (simülasyon)
  const startCamera = async () => {
    try {
      // Gerçek uygulama için:
      // const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      // if (videoRef.current) videoRef.current.srcObject = stream
      
      setIsCameraActive(true)
      setArMode('idle')
    } catch (error) {
      console.error('Kamera erişim hatası:', error)
      alert('Kamera erişimi için izin gerekli!')
    }
  }

  // Kamera durdur
  const stopCamera = () => {
    // Gerçek uygulama için stream.getTracks().forEach(track => track.stop())
    setIsCameraActive(false)
    setIsScanning(false)
    setArMode('idle')
    setScanProgress(0)
  }

  // YENİ: Ses çal (simülasyon)
  const playSound = (type: 'scan' | 'found' | 'error') => {
    if (!soundEnabled) return
    console.log(`🔊 ${type} sesi çalındı!`)
    // Gerçek uygulamada: new Audio(`/sounds/${type}.mp3`).play()
  }

  // YENİ: Confetti efekti
  const triggerConfetti = (rarity: ARBadge['rarity']) => {
    const colors = {
      common: ['#gray', '#silver'],
      rare: ['#3b82f6', '#60a5fa'],
      epic: ['#a855f7', '#c084fc'],
      legendary: ['#f59e0b', '#fbbf24'],
      mythical: ['#ef4444', '#f87171', '#fbbf24']
    }
    
    confetti({
      particleCount: rarity === 'mythical' ? 200 : rarity === 'legendary' ? 100 : 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors[rarity]
    })
  }

  // AR Tarama başlat (Geliştirilmiş)
  const startScanning = () => {
    // Enerji kontrolü
    if (energy < SCAN_COST.normal) {
      alert('⚡ Yeterli enerjin yok! Enerji yenilenmesini bekle.')
      return
    }
    
    if (!isCameraActive) {
      startCamera()
    }
    
    setIsScanning(true)
    setArMode('scanning')
    setScanProgress(0)
    
    // Enerji azalt
    setEnergy(prev => prev - SCAN_COST.normal)
    
    // Ses efekti
    playSound('scan')

    // Tarama simülasyonu (Power-up'a göre hız ayarlı)
    const scanSpeed = activePowerUps.includes('speed_boost') ? 3 : 2
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          
          // Filtrelenmiş rozetler
          const filteredBadges = categoryFilter === 'all' 
            ? nearbyBadges 
            : nearbyBadges.filter(b => b.category === categoryFilter)
          
          const availableBadges = filteredBadges.filter(b => !foundBadges.includes(b.id))
          
          if (availableBadges.length > 0) {
            // Şans hesaplama (Power-up'lara göre)
            let luckMultiplier = 1
            if (activePowerUps.includes('lucky_charm')) luckMultiplier = 1.5
            if (activePowerUps.includes('rare_boost')) luckMultiplier = 2
            
            // Rarity'ye göre şans
            const rarityWeights = {
              common: 0.5 * luckMultiplier,
              rare: 0.3 * luckMultiplier,
              epic: 0.15 * luckMultiplier,
              legendary: 0.04 * luckMultiplier,
              mythical: 0.01 * luckMultiplier
            }
            
            // Weighted random selection
            const randomBadge = availableBadges[Math.floor(Math.random() * availableBadges.length)]
            handleBadgeFound(randomBadge)
          } else {
            setArMode('idle')
            setIsScanning(false)
            playSound('error')
          }
          return 100
        }
        return prev + scanSpeed
      })
    }, 50)
  }

  // YENİ: Rozet bulundu! (Geliştirilmiş)
  const handleBadgeFound = (badge: ARBadge) => {
    setArMode('found')
    setDiscoveredBadge(badge)
    setFoundBadges(prev => [...prev, badge.id])
    
    // Ses efekti
    playSound('found')
    
    // Confetti efekti
    triggerConfetti(badge.rarity)
    
    // Combo kontrolü
    checkCombos([...foundBadges, badge.id])
    
    setTimeout(() => {
      setShowDiscoveryModal(true)
      setIsScanning(false)
      setScanProgress(0)
    }, 1500)
  }

  // YENİ: Combo kontrolü
  const checkCombos = (currentBadges: string[]) => {
    BADGE_COMBOS.forEach(combo => {
      if (completedCombos.includes(combo.id)) return
      
      const hasAllBadges = combo.badges.every(b => currentBadges.includes(b))
      if (hasAllBadges) {
        setCompletedCombos(prev => [...prev, combo.id])
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 }
        })
        console.log(`🎉 COMBO TAMAMLANDI: ${combo.name}!`)
      }
    })
  }

  // YENİ: Power-up'ı aktifleştir
  const activatePowerUp = (powerUpType: string) => {
    if (!activePowerUps.includes(powerUpType)) {
      setActivePowerUps(prev => [...prev, powerUpType])
      console.log(`⚡ Power-up aktif: ${powerUpType}`)
    }
  }

  // Rozeti koleksiyona ekle
  const collectBadge = () => {
    if (discoveredBadge) {
      // Backend'e kaydet
      console.log('Rozet koleksiyona eklendi:', discoveredBadge.name)
      setShowDiscoveryModal(false)
      setArMode('idle')
      setDiscoveredBadge(null)
    }
  }

  // Rarity renkleri
  const getRarityColor = (rarity: ARBadge['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-500'
      case 'rare': return 'text-blue-500'
      case 'epic': return 'text-purple-500'
      case 'legendary': return 'text-orange-500'
      case 'mythical': return 'text-red-500'
    }
  }

  const getRarityBg = (rarity: ARBadge['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-orange-400 via-red-500 to-pink-600'
      case 'mythical': return 'from-red-500 via-pink-500 to-purple-600'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📸 AR Rozet Tarayıcı" 
          subtitle="Gerçek dünyada rozetleri keşfet!"
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

            {/* Nasıl Çalışır */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        🎯 Nasıl Çalışır?
                      </h3>
                      <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                          Kameranı aç ve işletmelere doğrult
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                          "Tara" butonuna bas ve çevreni keşfet
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                          AR rozetlerini bul ve koleksiyonuna ekle!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AR Kamera Görüntüsü */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                <Card className="bg-black">
                  <CardBody className="p-0">
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      {/* Video (Kamera görüntüsü) */}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Kamera kapalı overlay */}
                      {!isCameraActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
                          <Camera className="w-24 h-24 text-gray-600 mb-4" />
                          <p className="text-gray-400 text-lg mb-4">Kamera kapalı</p>
                          <Button
                            color="primary"
                            size="lg"
                            startContent={<Camera className="w-5 h-5" />}
                            onClick={startCamera}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500"
                          >
                            Kamerayı Aç
                          </Button>
                        </div>
                      )}

                      {/* AR Overlay - Scanning */}
                      {isCameraActive && arMode === 'scanning' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          {/* Scan çizgileri */}
                          <motion.div
                            animate={{ y: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
                            style={{ height: '20%' }}
                          />
                          
                          {/* Hedef işareti */}
                          <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="relative"
                          >
                            <Crosshair className="w-32 h-32 text-cyan-400" strokeWidth={3} />
                          </motion.div>

                          {/* Progress */}
                          <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex items-center gap-3 mb-2">
                              <Scan className="w-5 h-5 text-cyan-400 animate-pulse" />
                              <span className="text-white font-medium">Taranıyor...</span>
                            </div>
                            <Progress 
                              value={scanProgress} 
                              color="primary"
                              className="max-w-md"
                              classNames={{
                                indicator: "bg-gradient-to-r from-cyan-500 to-purple-500"
                              }}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* AR Overlay - Found */}
                      {isCameraActive && arMode === 'found' && discoveredBadge && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/50"
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 0.5, repeat: 3 }}
                            className={`text-9xl`}
                          >
                            {discoveredBadge.icon}
                          </motion.div>
                          
                          {/* Işık efekti */}
                          <motion.div
                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className={`absolute inset-0 bg-gradient-to-br ${getRarityBg(discoveredBadge.rarity)} opacity-20 blur-3xl`}
                          />
                        </motion.div>
                      )}

                      {/* Üst bilgi çubuğu */}
                      {isCameraActive && arMode !== 'found' && (
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <Chip 
                            startContent={<MapPin className="w-4 h-4" />}
                            className="bg-black/50 text-white backdrop-blur-sm"
                          >
                            {nearbyBadges.length} rozet yakınında
                          </Chip>
                          
                          <Chip 
                            startContent={<Award className="w-4 h-4" />}
                            className="bg-black/50 text-white backdrop-blur-sm"
                          >
                            {foundBadges.length} keşfedildi
                          </Chip>
                        </div>
                      )}

                      {/* Alt kontrol çubuğu */}
                      {isCameraActive && (
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-4">
                          {!isScanning ? (
                            <Button
                              size="lg"
                              color="primary"
                              startContent={<Play className="w-5 h-5" />}
                              onClick={startScanning}
                              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold shadow-lg"
                            >
                              Tara
                            </Button>
                          ) : (
                            <Button
                              size="lg"
                              color="danger"
                              startContent={<Pause className="w-5 h-5" />}
                              onClick={() => {
                                setIsScanning(false)
                                setArMode('idle')
                                setScanProgress(0)
                              }}
                            >
                              Durdur
                            </Button>
                          )}
                          
                          <Button
                            size="lg"
                            variant="bordered"
                            startContent={<Camera className="w-5 h-5" />}
                            onClick={stopCamera}
                            className="border-white text-white"
                          >
                            Kapat
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Yakındaki Rozetler */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-purple-500" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Yakındaki Rozetler
                      </h3>
                    </div>
                    
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {nearbyBadges.map((badge) => (
                        <motion.div
                          key={badge.id}
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <Card 
                            className={`${
                              foundBadges.includes(badge.id) 
                                ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' 
                                : 'bg-gray-50 dark:bg-gray-800'
                            } cursor-pointer`}
                            isPressable
                            onPress={() => setSelectedBadge(badge)}
                          >
                            <CardBody className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="text-3xl">
                                  {foundBadges.includes(badge.id) ? badge.icon : '❓'}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className={`font-bold ${getRarityColor(badge.rarity)}`}>
                                      {foundBadges.includes(badge.id) ? badge.name : '???'}
                                    </h4>
                                    {foundBadges.includes(badge.id) && (
                                      <Unlock className="w-4 h-4 text-green-500" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                    {badge.location}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <Chip 
                                      size="sm" 
                                      variant="flat"
                                      startContent={<MapPin className="w-3 h-3" />}
                                    >
                                      {badge.distance}m
                                    </Chip>
                                    <Chip size="sm" variant="flat" color="warning">
                                      +{badge.points} puan
                                    </Chip>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <Target className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{foundBadges.length}</p>
                    <p className="text-white/80 text-sm">Keşfedilen</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <MapPin className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{nearbyBadges.length}</p>
                    <p className="text-white/80 text-sm">Yakınında</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <Award className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{ALL_AR_BADGES.length}</p>
                    <p className="text-white/80 text-sm">Toplam AR Rozet</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <Sparkles className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">
                      {foundBadges.reduce((sum, id) => {
                        const badge = ALL_AR_BADGES.find(b => b.id === id)
                        return sum + (badge?.points || 0)
                      }, 0)}
                    </p>
                    <p className="text-white/80 text-sm">Kazanılan Puan</p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Rozet Keşif Modal */}
      <Modal
        isOpen={showDiscoveryModal}
        onClose={() => setShowDiscoveryModal(false)}
        size="2xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  <span>Rozet Bulundu!</span>
                </div>
              </ModalHeader>
              <ModalBody>
                {discoveredBadge && (
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="text-9xl"
                    >
                      {discoveredBadge.icon}
                    </motion.div>
                    
                    <div>
                      <h3 className={`text-2xl font-bold ${getRarityColor(discoveredBadge.rarity)}`}>
                        {discoveredBadge.name}
                      </h3>
                      <Chip 
                        size="sm" 
                        className={`mt-2 bg-gradient-to-r ${getRarityBg(discoveredBadge.rarity)} text-white`}
                      >
                        {discoveredBadge.rarity.toUpperCase()}
                      </Chip>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400">
                      {discoveredBadge.description}
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <Chip startContent={<MapPin className="w-4 h-4" />}>
                        {discoveredBadge.location}
                      </Chip>
                      <Chip color="warning" startContent={<Star className="w-4 h-4" />}>
                        +{discoveredBadge.points} puan
                      </Chip>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Sonra
                </Button>
                <Button 
                  color="primary" 
                  onPress={collectBadge}
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                  startContent={<Award className="w-5 h-5" />}
                >
                  Koleksiyona Ekle
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ARBadgeScannerPage


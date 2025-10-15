import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Progress, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tooltip } from '@nextui-org/react'
import { TreePine, Sparkles, Droplet, Sun, Award, TrendingUp, Gift, Info, CheckCircle, Leaf, ExternalLink } from 'lucide-react'
import confetti from 'canvas-confetti'
import { OGM_INFO, TEMA_INFO, TREE_PLANTING_PROCESS, CERTIFICATE_INFO } from '../../data/socialResponsibility'

type TreeStage = 'seed' | 'sprout' | 'sapling' | 'young-tree' | 'mature-tree'

interface TreeData {
  stage: TreeStage
  seeds: number
  seedsRequired: number
  totalTrees: number
  lastWatered: Date | null
  daysGrowing: number
}

interface TreeInfo {
  stage: TreeStage
  emoji: string
  name: string
  description: string
  seedsRequired: number
  tlValue: number
  co2Absorption: string
}

const treeStages: TreeInfo[] = [
  {
    stage: 'seed',
    emoji: '🌱',
    name: 'Tohum',
    description: 'Yolculuğun başlangıcı! Her yorum ve puan tohum getiriyor.',
    seedsRequired: 0,
    tlValue: 0,
    co2Absorption: '0 kg/yıl'
  },
  {
    stage: 'sprout',
    emoji: '🌿',
    name: 'Filiz',
    description: 'Tohum filizlendi! Büyümeye devam ediyor.',
    seedsRequired: 10,
    tlValue: 15,
    co2Absorption: '5 kg/yıl'
  },
  {
    stage: 'sapling',
    emoji: '🌳',
    name: 'Fidan',
    description: 'Artık genç bir fidan! Toprakla buluşmaya hazır.',
    seedsRequired: 30,
    tlValue: 50,
    co2Absorption: '25 kg/yıl'
  },
  {
    stage: 'young-tree',
    emoji: '🌲',
    name: 'Genç Ağaç',
    description: 'Güçlü bir genç ağaç! CO2 emmeye başladı.',
    seedsRequired: 50,
    tlValue: 75,
    co2Absorption: '50 kg/yıl'
  },
  {
    stage: 'mature-tree',
    emoji: '🎄',
    name: 'Olgun Ağaç',
    description: 'Muhteşem bir ağaç! Dikilmeye hazır, OGM sertifikalı.',
    seedsRequired: 75,
    tlValue: 75, // 75 TL değerinde
    co2Absorption: '100 kg/yıl'
  }
]

function TreeGrowthSystem() {
  const [treeData, setTreeData] = useState<TreeData>({
    stage: 'seed',
    seeds: 35, // Demo için 35 tohum
    seedsRequired: 75,
    totalTrees: 3,
    lastWatered: null,
    daysGrowing: 12
  })

  const [showPlantModal, setShowPlantModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [isGrowing, setIsGrowing] = useState(false)

  // Get current stage info
  const getCurrentStage = () => {
    return [...treeStages].reverse().find(
      stage => treeData.seeds >= stage.seedsRequired
    ) || treeStages[0]
  }

  const currentStage = getCurrentStage()

  // Get next stage
  const getNextStage = () => {
    const currentIndex = treeStages.findIndex(s => s.stage === currentStage.stage)
    return currentIndex < treeStages.length - 1 ? treeStages[currentIndex + 1] : null
  }

  const nextStage = getNextStage()

  // Calculate progress
  const calculateProgress = () => {
    if (!nextStage) return 100
    const current = treeData.seeds - currentStage.seedsRequired
    const required = nextStage.seedsRequired - currentStage.seedsRequired
    return (current / required) * 100
  }

  // Add seeds (called when user earns points)
  const addSeeds = (amount: number) => {
    setTreeData(prev => ({
      ...prev,
      seeds: prev.seeds + amount
    }))
  }

  // Water tree animation
  const waterTree = () => {
    setTreeData(prev => ({
      ...prev,
      lastWatered: new Date()
    }))
    
    // Show watering animation
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#4ade80', '#22c55e', '#16a34a']
    })
  }

  // Plant tree (when fully grown)
  const plantTree = () => {
    if (treeData.seeds < 75) return
    
    setIsGrowing(true)
    
    // Confetti animation
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#4ade80', '#22c55e', '#fbbf24', '#f59e0b']
    })
    
    setTimeout(() => {
      setTreeData(prev => ({
        stage: 'seed',
        seeds: prev.seeds - 75,
        seedsRequired: 75,
        totalTrees: prev.totalTrees + 1,
        lastWatered: null,
        daysGrowing: 0
      }))
      setIsGrowing(false)
      setShowPlantModal(false)
    }, 2000)
  }

  // Get seeds from actions
  const seedSources = [
    { action: 'Yorum Yap', seeds: 1, icon: '💬' },
    { action: '5 Yıldız Ver', seeds: 2, icon: '⭐' },
    { action: 'Fotoğraf Paylaş', seeds: 3, icon: '📸' },
    { action: 'İlk Yorum', seeds: 5, icon: '🎯' },
    { action: 'Günlük Giriş', seeds: 1, icon: '📅' }
  ]

  return (
    <div className="space-y-6">
      {/* Main Tree Card */}
      <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 border-2 border-green-200 dark:border-green-700">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                <TreePine className="w-7 h-7 text-green-600" />
                Fidan Yetiştir, Orman Ol! 🌳
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tohum biriktir, fidan yetiştir, gerçek ağaç dik!
              </p>
            </div>
            <Button
              size="sm"
              variant="flat"
              color="primary"
              startContent={<Info className="w-4 h-4" />}
              onClick={() => setShowInfoModal(true)}
            >
              Nasıl Çalışır?
            </Button>
          </div>

          {/* Tree Animation Area */}
          <div className="relative min-h-[300px] flex items-center justify-center mb-6 bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-900/30 dark:to-green-900/30 rounded-2xl p-8">
            {/* Sun */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="absolute top-4 right-4 text-6xl"
            >
              ☀️
            </motion.div>

            {/* Clouds */}
            <motion.div
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-10 text-4xl opacity-60"
            >
              ☁️
            </motion.div>

            {/* Tree Growing */}
            <motion.div
              key={currentStage.stage}
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-9xl mb-4"
              >
                {currentStage.emoji}
              </motion.div>
              
              <Chip 
                size="lg"
                className="bg-green-500 text-white font-bold text-lg"
                startContent={<Sparkles className="w-5 h-5" />}
              >
                {currentStage.name}
              </Chip>

              {/* Water drops when watered */}
              {treeData.lastWatered && (
                <motion.div
                  initial={{ y: -50, opacity: 1 }}
                  animate={{ y: 50, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute text-4xl"
                >
                  💧
                </motion.div>
              )}
            </motion.div>

            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-800 to-amber-600 dark:from-amber-900 dark:to-amber-700 rounded-b-2xl" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-3xl mb-1">🌱</div>
              <p className="text-2xl font-bold text-green-600">{treeData.seeds}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tohumun</p>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-3xl mb-1">🌳</div>
              <p className="text-2xl font-bold text-emerald-600">{treeData.totalTrees}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Dikilen Ağaç</p>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-3xl mb-1">💰</div>
              <p className="text-2xl font-bold text-yellow-600">₺{currentStage.tlValue}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Değer</p>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-3xl mb-1">🌍</div>
              <p className="text-2xl font-bold text-blue-600">{currentStage.co2Absorption}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">CO₂ Emilimi</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {currentStage.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({treeData.seeds} tohum)
                </span>
              </div>
              {nextStage && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Sonraki: {nextStage.name}
                  </span>
                  <span className="font-semibold text-green-600">
                    ({nextStage.seedsRequired} tohum)
                  </span>
                </div>
              )}
            </div>
            
            <Progress 
              value={calculateProgress()}
              className="h-4"
              classNames={{
                indicator: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"
              }}
            />
            
            {nextStage && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {nextStage.seedsRequired - treeData.seeds} tohum daha gerekli
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="lg"
              color="primary"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500"
              startContent={<Droplet className="w-5 h-5" />}
              onClick={waterTree}
            >
              Ağacını Sula 💧
            </Button>
            
            <Tooltip content={treeData.seeds < 75 ? "75 tohum gerekli!" : "Ağacını dik!"}>
              <Button
                size="lg"
                color="success"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                startContent={<TreePine className="w-5 h-5" />}
                onClick={() => setShowPlantModal(true)}
                isDisabled={treeData.seeds < 75}
              >
                Fidan Dik (75 Tohum)
              </Button>
            </Tooltip>
          </div>
        </CardBody>
      </Card>

      {/* Seed Sources Card */}
      <Card>
        <CardBody className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            Tohum Nasıl Kazanılır?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {seedSources.map((source, index) => (
              <motion.div
                key={source.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:scale-105 transition-transform">
                  <CardBody className="p-4 text-center">
                    <div className="text-4xl mb-2">{source.icon}</div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {source.action}
                    </p>
                    <Chip size="sm" color="success" className="font-bold">
                      +{source.seeds} 🌱
                    </Chip>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
        <CardBody className="p-4">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">
                1 Fidan = 75 TL Değerinde!
              </h4>
              <p className="text-sm text-white/90">
                75 tohum toplayarak bir fidan yetiştir. Gerçekten dikileceği için OGM sertifikan olacak! 🎖️
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Info Modal */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        size="2xl"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <TreePine className="w-7 h-7 text-green-600" />
              Fidan Sistemi Nasıl Çalışır?
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold text-green-900 dark:text-green-200 mb-2 text-lg">
                  🌱 Adım 1: Tohum Biriktir
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Yorum yap, puan kazan, fotoğraf paylaş. Her aktivite sana tohum kazandırır!
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2 text-lg">
                  🌿 Adım 2: Fidan Yetiştir
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  75 tohum toplayınca fidanın olgunlaşır. Bu süreçte büyüyen ağacını izle!
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-bold text-orange-900 dark:text-orange-200 mb-2 text-lg">
                  🌳 Adım 3: Gerçek Ağaç Dik
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  OGM ve TEMA Vakfı işbirliğiyle gerçek fidanın dikiliyor. Dijital sertifikan geliyor!
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700">
                <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-2 text-lg">
                  🎖️ Adım 4: Sertifika Al
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Dikilen her ağaç için OGM onaylı dijital sertifika alıyorsun. GPS koordinatları ile takip edebilirsin!
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-2 border-yellow-400 dark:border-yellow-700">
                <div className="flex items-center gap-3">
                  <div className="text-5xl">💰</div>
                  <div>
                    <h4 className="font-bold text-yellow-900 dark:text-yellow-200 text-lg mb-1">
                      Fidan Değeri: 75 TL
                    </h4>
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      Her 75 tohum = 1 gerçek fidan = 75 TL değerinde bağış!
                    </p>
                  </div>
                </div>
              </div>

              {/* OGM İşbirliği */}
              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border-2 border-green-400 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <div className="text-5xl">{OGM_INFO.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-green-900 dark:text-green-200 text-lg">
                        {OGM_INFO.name}
                      </h4>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-300 mb-3">
                      {OGM_INFO.description}
                    </p>
                    <div className="space-y-1">
                      {OGM_INFO.benefits.slice(0, 3).map((benefit, i) => (
                        <p key={i} className="text-xs text-green-700 dark:text-green-400">
                          {benefit}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* TEMA İşbirliği */}
              <div className="p-4 bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg border-2 border-teal-400 dark:border-teal-700">
                <div className="flex items-start gap-3">
                  <div className="text-5xl">{TEMA_INFO.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-teal-900 dark:text-teal-200 text-lg">
                        {TEMA_INFO.name}
                      </h4>
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                    </div>
                    <p className="text-sm text-teal-800 dark:text-teal-300 mb-3">
                      {TEMA_INFO.description}
                    </p>
                    <div className="space-y-1">
                      {TEMA_INFO.benefits.slice(0, 3).map((benefit, i) => (
                        <p key={i} className="text-xs text-teal-700 dark:text-teal-400">
                          {benefit}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sertifika İçeriği */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Sertifika İçeriği
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {CERTIFICATE_INFO.includes.slice(0, 6).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-2 w-full">
              <Button 
                variant="flat"
                startContent={<ExternalLink className="w-4 h-4" />}
                onClick={() => window.open(OGM_INFO.website, '_blank')}
              >
                OGM Web
              </Button>
              <Button 
                variant="flat"
                startContent={<ExternalLink className="w-4 h-4" />}
                onClick={() => window.open(TEMA_INFO.website, '_blank')}
              >
                TEMA Web
              </Button>
              <Button 
                color="primary"
                onClick={() => setShowInfoModal(false)}
                size="lg"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
              >
                Anladım! 🌳
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Plant Tree Modal */}
      <Modal
        isOpen={showPlantModal}
        onClose={() => !isGrowing && setShowPlantModal(false)}
        size="2xl"
        backdrop="blur"
        isDismissable={!isGrowing}
        hideCloseButton={isGrowing}
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-2xl font-bold text-green-600">
              🌳 Fidanını Dik!
            </h3>
          </ModalHeader>
          <ModalBody>
            {!isGrowing ? (
              <div className="space-y-6 text-center py-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-9xl"
                >
                  🌳
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Fidanın Hazır!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    75 tohumunu kullanarak bir gerçek fidan dikeceksin. Emin misin?
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">75</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tohum</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">₺75</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Değer</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">100kg</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">CO₂/Yıl</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border-2 border-green-400 dark:border-green-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div className="text-left">
                      <p className="font-bold text-green-900 dark:text-green-200">
                        OGM + TEMA Vakfı İşbirliği
                      </p>
                      <p className="text-sm text-green-800 dark:text-green-300">
                        Fidanın gerçekten dikiliyor, dijital sertifikan geliyor!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-9xl mb-6"
                >
                  🌱
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Fidanın Dikiliyor...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Orman Genel Müdürlüğü'ne iletiliyor 🌳
                </p>
              </div>
            )}
          </ModalBody>
          {!isGrowing && (
            <ModalFooter>
              <Button 
                variant="flat"
                onClick={() => setShowPlantModal(false)}
              >
                İptal
              </Button>
              <Button 
                color="success"
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 font-bold"
                startContent={<TreePine className="w-5 h-5" />}
                onClick={plantTree}
              >
                Evet, Dik! 🌳
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TreeGrowthSystem


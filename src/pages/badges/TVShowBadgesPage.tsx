import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Card, CardBody, Button, Input, Tabs, Tab, Chip, Progress,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from '@nextui-org/react'
import { 
  Search, Trophy, Star, Filter, 
  ArrowLeft, Sparkles, Award,
  Tv, Film, Grid3x3, List,
  Heart, Info, Share2
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { TV_SHOW_BADGES, GENRE_STATS, TOTAL_TV_BADGES } from '../../data/tvShowBadges'
import { Badge } from '../../types/badge'
import confetti from 'canvas-confetti'

function TVShowBadgesPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [selectedRarity, setSelectedRarity] = useState<string>('all')
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  // All badges are unlocked for testing
  const unlockedBadgeIds = TV_SHOW_BADGES.filter(b => b.unlocked).map(b => b.id)

  // Calculate stats
  const totalUnlocked = unlockedBadgeIds.length
  const totalPoints = TV_SHOW_BADGES
    .filter(b => unlockedBadgeIds.includes(b.id))
    .reduce((sum, b) => sum + b.points, 0)
  const completionPercentage = Math.round((totalUnlocked / TOTAL_TV_BADGES) * 100)

  // Filter badges
  const filteredBadges = useMemo(() => {
    return TV_SHOW_BADGES.filter(badge => {
      const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          badge.showName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          badge.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesGenre = selectedGenre === 'all' || badge.genre === selectedGenre
      const matchesRarity = selectedRarity === 'all' || badge.rarity === selectedRarity

      return matchesSearch && matchesGenre && matchesRarity
    })
  }, [searchQuery, selectedGenre, selectedRarity])

  // Group badges by genre
  const badgesByGenre = useMemo(() => {
    const genres: { [key: string]: Badge[] } = {}
    filteredBadges.forEach(badge => {
      const genre = badge.genre || 'Diğer'
      if (!genres[genre]) {
        genres[genre] = []
      }
      genres[genre].push(badge)
    })
    return genres
  }, [filteredBadges])

  const handleBadgeClick = useCallback((badge: Badge, event?: React.MouseEvent) => {
    if (unlockedBadgeIds.includes(badge.id)) {
      setSelectedBadge(badge)
      setShowBadgeModal(true)
      
      // Trigger confetti from click position
      if (event) {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (rect.left + rect.width / 2) / window.innerWidth
        const y = (rect.top + rect.height / 2) / window.innerHeight
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
          colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b']
        })
      }
    }
  }, [unlockedBadgeIds])

  const toggleCardFlip = (badgeId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(badgeId)) {
        newSet.delete(badgeId)
      } else {
        newSet.add(badgeId)
      }
      return newSet
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-500'
      case 'rare': return 'text-blue-500'
      case 'epic': return 'text-purple-500'
      case 'legendary': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 dark:bg-gray-800'
      case 'rare': return 'bg-blue-100 dark:bg-blue-900/20'
      case 'epic': return 'bg-purple-100 dark:bg-purple-900/20'
      case 'legendary': return 'bg-yellow-100 dark:bg-yellow-900/20'
      default: return 'bg-gray-100 dark:bg-gray-800'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📺 TV Show & Genel Rozetler (TEST)" 
          subtitle="80+ rozet: Dizi karakterleri + Genel emoji rozetleri - TÜM KİLİTLER AÇIK"
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
                onClick={() => navigate('/customer/badges')}
              >
                Ana Rozet Sayfasına Dön
              </Button>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Toplam Rozet</p>
                      <p className="text-3xl font-bold text-white">{TOTAL_TV_BADGES}</p>
                    </div>
                    <Tv className="w-12 h-12 text-white/20" />
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Kazanılan</p>
                      <p className="text-3xl font-bold text-white">{totalUnlocked}</p>
                    </div>
                    <Trophy className="w-12 h-12 text-white/20" />
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Toplam Puan</p>
                      <p className="text-3xl font-bold text-white">{totalPoints}</p>
                    </div>
                    <Star className="w-12 h-12 text-white/20" />
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Tamamlanma</p>
                      <p className="text-3xl font-bold text-white">{completionPercentage}%</p>
                    </div>
                    <Award className="w-12 h-12 text-white/20" />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Koleksiyon İlerlemesi
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {totalUnlocked} / {TOTAL_TV_BADGES}
                      </span>
                    </div>
                    <Progress 
                      value={completionPercentage}
                      className="h-3"
                      classNames={{
                        indicator: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardBody className="p-4 space-y-4">
                  <div className="flex flex-col lg:flex-row gap-3">
                    <Input
                      placeholder="Rozet veya dizi adı ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      startContent={<Search className="w-4 h-4 text-gray-400" />}
                      className="flex-1"
                      size="lg"
                      isClearable
                      onClear={() => setSearchQuery('')}
                    />

                    <Dropdown>
                      <DropdownTrigger>
                        <Button 
                          variant="flat" 
                          startContent={<Filter className="w-4 h-4" />}
                          className="min-w-[150px]"
                        >
                          {selectedRarity === 'all' ? 'Tüm Nadirlkler' :
                           selectedRarity === 'legendary' ? '⭐ Legendary' :
                           selectedRarity === 'epic' ? '💎 Epic' :
                           selectedRarity === 'rare' ? '🔷 Rare' : '⚪ Common'}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        selectedKeys={[selectedRarity]}
                        onAction={(key) => setSelectedRarity(key as string)}
                      >
                        <DropdownItem key="all">Tüm Nadirlikler</DropdownItem>
                        <DropdownItem key="legendary">⭐ Legendary</DropdownItem>
                        <DropdownItem key="epic">💎 Epic</DropdownItem>
                        <DropdownItem key="rare">🔷 Rare</DropdownItem>
                        <DropdownItem key="common">⚪ Common</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <Button
                      isIconOnly
                      variant="flat"
                      onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    >
                      {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <Button
                      size="sm"
                      variant={selectedGenre === 'all' ? 'solid' : 'flat'}
                      color={selectedGenre === 'all' ? 'primary' : 'default'}
                      onClick={() => setSelectedGenre('all')}
                    >
                      Tümü ({TOTAL_TV_BADGES})
                    </Button>
                    {Object.entries(GENRE_STATS).map(([genre, count]) => (
                      <Button
                        key={genre}
                        size="sm"
                        variant={selectedGenre === genre ? 'solid' : 'flat'}
                        color={selectedGenre === genre ? 'secondary' : 'default'}
                        onClick={() => setSelectedGenre(genre)}
                        className="flex-shrink-0"
                      >
                        {genre} ({count})
                      </Button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Badges Grid by Genre */}
            <div className="space-y-8">
              {Object.entries(badgesByGenre).map(([genre, badges], genreIndex) => (
                <motion.div
                  key={genre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + genreIndex * 0.1 }}
                >
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Film className="w-6 h-6" />
                      {genre}
                      <Chip size="sm" className="ml-2">{badges.length} rozet</Chip>
                    </h2>
                  </div>

                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-3'}>
                    {badges.map((badge, index) => {
                      const isUnlocked = unlockedBadgeIds.includes(badge.id)
                      const isHovered = hoveredBadge === badge.id
                      const isFlipped = flippedCards.has(badge.id)

                      if (viewMode === 'list') {
                        return (
                          <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                          >
                            <Card isPressable onClick={(e) => handleBadgeClick(badge, e as any)}>
                              <CardBody className="p-4">
                                <div className="flex items-center gap-4">
                                  <div className={`
                                    w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0
                                    bg-gradient-to-br ${badge.gradient}
                                  `}>
                                    {badge.icon}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                                        {badge.name}
                                      </h3>
                                      <Chip size="sm" className={getRarityBg(badge.rarity)}>
                                        <span className={getRarityColor(badge.rarity)}>
                                          {badge.rarity === 'legendary' ? '⭐' :
                                           badge.rarity === 'epic' ? '💎' :
                                           badge.rarity === 'rare' ? '🔷' : '⚪'}
                                        </span>
                                      </Chip>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{badge.showName}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{badge.description}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Chip size="sm" color="secondary" startContent={<Star className="w-3 h-3" />}>
                                      {badge.points}
                                    </Chip>
                                    <Trophy className="w-5 h-5 text-green-500" />
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </motion.div>
                        )
                      }

                      return (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.03 }}
                          whileHover={{ scale: 1.05, y: -8 }}
                          onHoverStart={() => setHoveredBadge(badge.id)}
                          onHoverEnd={() => setHoveredBadge(null)}
                          style={{ perspective: '1000px' }}
                        >
                          <motion.div
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                            <Card
                              isPressable
                              onClick={(e) => handleBadgeClick(badge, e as any)}
                              className={`
                                relative overflow-hidden cursor-pointer
                                ${isHovered ? 'shadow-2xl border-4' : 'shadow-lg border-2'}
                                ${badge.rarity === 'legendary' ? 'border-yellow-500' :
                                  badge.rarity === 'epic' ? 'border-purple-500' :
                                  badge.rarity === 'rare' ? 'border-blue-500' : 'border-gray-300'}
                                transition-all duration-300
                              `}
                            >
                              {/* Animated Background */}
                              <div className={`
                                absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-5
                                ${isHovered ? 'opacity-10' : ''}
                                transition-opacity duration-300
                              `} />
                              
                              <CardBody className="p-5 relative z-10">

                                {/* Badge Icon */}
                                <div className={`
                                  w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-4xl
                                  bg-gradient-to-br ${badge.gradient}
                                  shadow-lg
                                  ${isHovered ? 'animate-bounce' : ''}
                                `}>
                                  {badge.icon}
                                </div>

                                {/* Badge Info */}
                                <div className="text-center space-y-2">
                                  <Chip
                                    size="sm"
                                    className={getRarityBg(badge.rarity)}
                                  >
                                    <span className={`${getRarityColor(badge.rarity)} font-bold`}>
                                      {badge.rarity === 'legendary' ? '⭐ Legendary' :
                                       badge.rarity === 'epic' ? '💎 Epic' :
                                       badge.rarity === 'rare' ? '🔷 Rare' : '⚪ Common'}
                                    </span>
                                  </Chip>

                                  <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-2">
                                    {badge.name}
                                  </h3>

                                  {badge.showName && (
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                      📺 {badge.showName}
                                    </p>
                                  )}

                                  <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                                    {badge.description}
                                  </p>

                                  <div className="flex items-center justify-center gap-2 pt-1">
                                    <Chip
                                      size="sm"
                                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                                      startContent={<Star className="w-3 h-3" />}
                                    >
                                      {badge.points}
                                    </Chip>
                                  </div>

                                  {/* Unlocked Badge */}
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", duration: 0.6 }}
                                    className="absolute top-2 right-2"
                                  >
                                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2 shadow-lg">
                                      <Trophy className="w-4 h-4 text-white" />
                                    </div>
                                  </motion.div>

                                </div>
                              </CardBody>
                            </Card>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredBadges.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Tv className="w-24 h-24 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Rozet Bulunamadı
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Arama kriterlerinize uygun rozet bulunamadı.
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Badge Detail Modal */}
      <Modal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-3xl
                    bg-gradient-to-br ${selectedBadge?.gradient}
                    shadow-lg animate-pulse
                  `}>
                    {selectedBadge?.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBadge?.name}</h2>
                    {selectedBadge?.showName && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📺 {selectedBadge.showName}
                      </p>
                    )}
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {/* Rarity and Points */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nadirlik</p>
                      <Chip className={getRarityBg(selectedBadge?.rarity || 'common')}>
                        <span className={`${getRarityColor(selectedBadge?.rarity || 'common')} font-bold`}>
                          {selectedBadge?.rarity === 'legendary' ? '⭐ Legendary' :
                           selectedBadge?.rarity === 'epic' ? '💎 Epic' :
                           selectedBadge?.rarity === 'rare' ? '🔷 Rare' : '⚪ Common'}
                        </span>
                      </Chip>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Puan</p>
                      <Chip
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                        startContent={<Star className="w-4 h-4" />}
                      >
                        {selectedBadge?.points}
                      </Chip>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-500" />
                      Açıklama
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedBadge?.description}
                    </p>
                  </div>

                  {/* Genre */}
                  {selectedBadge?.genre && (
                    <div>
                      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <Film className="w-5 h-5 text-purple-500" />
                        Kategori
                      </h3>
                      <Chip size="lg" color="secondary" variant="flat">
                        {selectedBadge.genre}
                      </Chip>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-green-500" />
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Durum</p>
                      </div>
                      <p className="text-lg font-bold text-green-600">Kazanıldı ✓</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-blue-500" />
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Seviye</p>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {selectedBadge?.rarity === 'legendary' ? 'Efsanevi' :
                         selectedBadge?.rarity === 'epic' ? 'Epik' :
                         selectedBadge?.rarity === 'rare' ? 'Nadir' : 'Yaygın'}
                      </p>
                    </div>
                  </div>

                  {/* Share Section */}
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold mb-1 flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Bu rozeti paylaş
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Arkadaşlarınla bu başarını paylaş!
                        </p>
                      </div>
                      <Button
                        color="warning"
                        variant="flat"
                        startContent={<Heart className="w-4 h-4" />}
                      >
                        Paylaş
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Kapat
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    confetti({
                      particleCount: 150,
                      spread: 100,
                      origin: { y: 0.6 },
                      colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b']
                    })
                  }}
                  startContent={<Sparkles className="w-4 h-4" />}
                >
                  Kutla! 🎉
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TVShowBadgesPage


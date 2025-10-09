import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Input, Select, SelectItem, Tabs, Tab, Chip } from '@nextui-org/react'
import { Search, Filter, Trophy, Star, Award, Crown } from 'lucide-react'
import { Badge } from '../../types/badge'
import BadgeCard from './BadgeCard'

interface BadgeCollectionProps {
  badges: Badge[]
  userBadges: Badge[]
  onBadgeClick?: (badge: Badge) => void
  showProgress?: boolean
}

function BadgeCollection({ badges, userBadges, onBadgeClick, showProgress = true }: BadgeCollectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRarity, setSelectedRarity] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const categories = [
    { key: 'all', label: 'Tümü', icon: Trophy },
    { key: 'activity', label: 'Aktivite', icon: Star },
    { key: 'behavior', label: 'Davranış', icon: Award },
    { key: 'brand', label: 'Marka', icon: Crown },
    { key: 'special', label: 'Özel', icon: Trophy }
  ]

  const rarities = [
    { key: 'all', label: 'Tüm Nadirlikler' },
    { key: 'common', label: 'Yaygın' },
    { key: 'rare', label: 'Nadir' },
    { key: 'epic', label: 'Epik' },
    { key: 'legendary', label: 'Efsanevi' }
  ]

  // Filter badges based on search and filters
  const filteredBadges = badges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || badge.category === selectedCategory
    const matchesRarity = selectedRarity === 'all' || badge.rarity === selectedRarity
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unlocked' && badge.unlocked) ||
                      (activeTab === 'locked' && !badge.unlocked)

    return matchesSearch && matchesCategory && matchesRarity && matchesTab
  })

  // Group badges by category for better organization
  const groupedBadges = categories.reduce((acc, category) => {
    if (category.key === 'all') return acc
    
    acc[category.key] = filteredBadges.filter(badge => badge.category === category.key)
    return acc
  }, {} as Record<string, Badge[]>)

  // Statistics
  const unlockedCount = userBadges.filter(b => b.unlocked).length
  const totalCount = badges.length
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100)

  const rarityStats = {
    common: userBadges.filter(b => b.unlocked && b.rarity === 'common').length,
    rare: userBadges.filter(b => b.unlocked && b.rarity === 'rare').length,
    epic: userBadges.filter(b => b.unlocked && b.rarity === 'epic').length,
    legendary: userBadges.filter(b => b.unlocked && b.rarity === 'legendary').length
  }

  return (
    <div className="space-y-6">
      {/* Collection Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
          <CardBody className="p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-2xl font-bold mb-2">Rozet Koleksiyonum</h2>
                <p className="text-white/90">
                  {unlockedCount} / {totalCount} rozet kazandın ({completionPercentage}%)
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold">{unlockedCount}</div>
                <div className="text-sm text-white/80">Toplam Rozet</div>
              </div>
            </div>

            {/* Rarity breakdown */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-xl font-bold">{rarityStats.common}</div>
                <div className="text-xs text-white/80">Yaygın</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-200">{rarityStats.rare}</div>
                <div className="text-xs text-white/80">Nadir</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-200">{rarityStats.epic}</div>
                <div className="text-xs text-white/80">Epik</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-200">{rarityStats.legendary}</div>
                <div className="text-xs text-white/80">Efsanevi</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardBody className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                placeholder="Rozet ara..."
                value={searchTerm}
                onValueChange={setSearchTerm}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                className="flex-1"
                variant="bordered"
              />
              
              <Select
                placeholder="Kategori"
                selectedKeys={selectedCategory ? [selectedCategory] : []}
                onSelectionChange={(keys) => setSelectedCategory(Array.from(keys)[0] as string)}
                className="min-w-[150px]"
                variant="bordered"
                startContent={<Filter className="w-4 h-4 text-gray-400" />}
              >
                {categories.map((category) => (
                  <SelectItem key={category.key} value={category.key}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                placeholder="Nadirlik"
                selectedKeys={selectedRarity ? [selectedRarity] : []}
                onSelectionChange={(keys) => setSelectedRarity(Array.from(keys)[0] as string)}
                className="min-w-[150px]"
                variant="bordered"
              >
                {rarities.map((rarity) => (
                  <SelectItem key={rarity.key} value={rarity.key}>
                    {rarity.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          className="w-full"
          classNames={{
            tabList: "bg-white dark:bg-gray-800 shadow-lg",
            cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
            tab: "text-gray-600 dark:text-gray-400",
            tabContent: "group-data-[selected=true]:text-white"
          }}
        >
          <Tab key="all" title="Tümü" />
          <Tab 
            key="unlocked" 
            title={
              <div className="flex items-center space-x-2">
                <span>Kazanılan</span>
                <Chip size="sm" className="bg-green-100 text-green-800">
                  {unlockedCount}
                </Chip>
              </div>
            } 
          />
          <Tab 
            key="locked" 
            title={
              <div className="flex items-center space-x-2">
                <span>Kilitli</span>
                <Chip size="sm" className="bg-gray-100 text-gray-800">
                  {totalCount - unlockedCount}
                </Chip>
              </div>
            } 
          />
        </Tabs>
      </motion.div>

      {/* Badge Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${selectedCategory}-${selectedRarity}-${searchTerm}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedCategory === 'all' ? (
            // Show all categories with headers
            <div className="space-y-8">
              {categories.slice(1).map((category) => {
                const categoryBadges = groupedBadges[category.key] || []
                if (categoryBadges.length === 0) return null

                return (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {category.label} Rozetleri
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {categoryBadges.filter(b => b.unlocked).length} / {categoryBadges.length} kazanıldı
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                      {categoryBadges.map((badge, index) => (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <BadgeCard
                            badge={badge}
                            showProgress={showProgress}
                            onClick={() => onBadgeClick?.(badge)}
                            size="md"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            // Show single category
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BadgeCard
                    badge={badge}
                    showProgress={showProgress}
                    onClick={() => onBadgeClick?.(badge)}
                    size="md"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* No results */}
          {filteredBadges.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Rozet bulunamadı
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Arama kriterlerinizi değiştirmeyi deneyin
              </p>
              <Button
                className="mt-4"
                variant="bordered"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedRarity('all')
                }}
              >
                Filtreleri Temizle
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default BadgeCollection

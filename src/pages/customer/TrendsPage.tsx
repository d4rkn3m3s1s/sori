import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Tabs, Tab, Progress, Button } from '@nextui-org/react'
import { TrendingUp, MapPin, Star, Users, Flame, Sparkles, Coffee, ShoppingBag, Heart, Bell, BellOff, Eye, Navigation } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface TrendItem {
  id: string
  name: string
  category: string
  trend: 'up' | 'down' | 'stable'
  trendValue: number
  rating: number
  commentCount: number
  visitors: number
  icon: any
  image?: string
}

interface TrackedBusiness {
  id: string
  name: string
  category: string
  location: string
  rating: number
  following: boolean
  notifications: boolean
  hasNewUpdate: boolean
  distance: string
  discount?: number
  campaign?: string
  checkIns: number
}

function TrendsPage() {
  const [selectedTab, setSelectedTab] = useState('trends')
  
  // Takip edilen işletmeler
  const [trackedBusinesses, setTrackedBusinesses] = useState<TrackedBusiness[]>([
    {
      id: '1',
      name: 'Starbucks Kadıköy',
      category: 'Kafe',
      location: 'Kadıköy, İstanbul',
      rating: 4.8,
      following: true,
      notifications: true,
      hasNewUpdate: true,
      distance: '1.2 km',
      campaign: 'Her 3. kahve hediye!',
      discount: 15,
      checkIns: 12
    },
    {
      id: '2',
      name: 'Mado Beyoğlu',
      category: 'Restoran',
      location: 'Beyoğlu, İstanbul',
      rating: 4.6,
      following: true,
      notifications: false,
      hasNewUpdate: false,
      distance: '3.5 km',
      checkIns: 8
    },
    {
      id: '3',
      name: 'CarrefourSA Nişantaşı',
      category: 'Market',
      location: 'Şişli, İstanbul',
      rating: 4.5,
      following: true,
      notifications: true,
      hasNewUpdate: true,
      distance: '2.1 km',
      discount: 10,
      checkIns: 15
    }
  ])

  const toggleNotifications = (id: string) => {
    setTrackedBusinesses(prev => prev.map(b => 
      b.id === id ? { ...b, notifications: !b.notifications } : b
    ))
  }

  const toggleFollow = (id: string) => {
    setTrackedBusinesses(prev => prev.map(b => 
      b.id === id ? { ...b, following: !b.following } : b
    ))
  }

  // Mock data
  const trendingBusinesses: TrendItem[] = [
    {
      id: '1',
      name: 'Starbucks Kadıköy',
      category: 'Kafe',
      trend: 'up',
      trendValue: 45,
      rating: 4.8,
      commentCount: 234,
      visitors: 1250,
      icon: Coffee
    },
    {
      id: '2',
      name: 'Mado Beyoğlu',
      category: 'Restoran',
      trend: 'up',
      trendValue: 38,
      rating: 4.6,
      commentCount: 189,
      visitors: 980,
      icon: Coffee
    },
    {
      id: '3',
      name: 'CarrefourSA Nişantaşı',
      category: 'Market',
      trend: 'up',
      trendValue: 25,
      rating: 4.5,
      commentCount: 156,
      visitors: 750,
      icon: ShoppingBag
    }
  ]

  const trendingCategories = [
    { name: 'Kahve & Kafe', count: 456, growth: 32, color: '#92400E', icon: '☕' },
    { name: 'Restoran', count: 389, growth: 28, color: '#DC2626', icon: '🍽️' },
    { name: 'Fast Food', count: 234, growth: 15, color: '#F59E0B', icon: '🍔' },
    { name: 'Market', count: 178, growth: 12, color: '#10B981', icon: '🛒' },
    { name: 'Pastane', count: 145, growth: 8, color: '#EC4899', icon: '🍰' }
  ]

  const risingStars = [
    { name: 'Ali Yılmaz', avatar: '👨', points: 2450, growth: 156, badge: 'Ahenk' },
    { name: 'Ayşe Demir', avatar: '👩', points: 2180, growth: 142, badge: 'Parıltı' },
    { name: 'Mehmet Kaya', avatar: '👨', points: 1950, growth: 128, badge: 'Parıltı' }
  ]

  const hotTopics = [
    { tag: '#KahveSevgisi', count: 234, growth: 45 },
    { tag: '#YeniMekan', count: 189, growth: 38 },
    { tag: '#LezzetDolu', count: 156, growth: 25 },
    { tag: '#HizmetMükemmel', count: 134, growth: 18 }
  ]

  const cityTrends = [
    { city: 'İstanbul', count: 1250, percentage: 45 },
    { city: 'Ankara', count: 680, percentage: 24 },
    { city: 'İzmir', count: 520, percentage: 19 },
    { city: 'Bursa', count: 340, percentage: 12 }
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📈 Analiz & Takip" 
          subtitle="Trendleri keşfet, favori işletmelerini takip et"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Trend İşletme</p>
                        <p className="text-4xl font-bold">256</p>
                        <p className="text-sm">Aktif</p>
                      </div>
                      <Flame className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Popüler Kategori</p>
                        <p className="text-4xl font-bold">5</p>
                        <p className="text-sm">Kategori</p>
                      </div>
                      <TrendingUp className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Yükselen</p>
                        <p className="text-4xl font-bold">12</p>
                        <p className="text-sm">Kullanıcı</p>
                      </div>
                      <Users className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Hot Topic</p>
                        <p className="text-4xl font-bold">18</p>
                        <p className="text-sm">Etiket</p>
                      </div>
                      <Sparkles className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Tabs */}
            <Card>
              <CardBody className="p-4">
                <Tabs
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(key as string)}
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "bg-gradient-to-r from-purple-500 to-pink-500"
                  }}
                >
                  <Tab key="trends" title="🔥 Trendler" />
                  <Tab key="tracking" title="💝 Takip Ettiklerim" />
                  <Tab key="categories" title="📊 Kategoriler" />
                  <Tab key="cities" title="🌍 Şehirler" />
                </Tabs>
              </CardBody>
            </Card>

            {/* Content */}
            {selectedTab === 'trends' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingBusinesses.map((business, index) => (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-xl transition-all">
                      <CardBody className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <business.icon className="w-8 h-8 text-white" />
                          </div>
                          <Chip
                            size="sm"
                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold"
                            startContent={<TrendingUp className="w-3 h-3" />}
                          >
                            +{business.trendValue}%
                          </Chip>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {business.name}
                        </h3>
                        
                        <Chip size="sm" variant="flat" className="mb-4">
                          {business.category}
                        </Chip>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Puan</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-bold">{business.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Yorum</span>
                            <span className="font-bold">{business.commentCount}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Ziyaretçi</span>
                            <span className="font-bold">{business.visitors}</span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'tracking' && (
              <div className="space-y-4">
                {trackedBusinesses.map((business, index) => (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all">
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl">
                              {business.category === 'Kafe' ? '☕' : business.category === 'Restoran' ? '🍽️' : '🛒'}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {business.name}
                                </h3>
                                {business.hasNewUpdate && (
                                  <Chip size="sm" className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                                    YENİ
                                  </Chip>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {business.distance}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  {business.rating}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {business.checkIns} check-in
                                </div>
                              </div>
                              
                              {business.campaign && (
                                <div className="mt-2">
                                  <Chip size="sm" variant="flat" color="success" startContent={<Sparkles className="w-3 h-3" />}>
                                    {business.campaign}
                                  </Chip>
                                </div>
                              )}
                              
                              {business.discount && (
                                <div className="mt-2">
                                  <Chip size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                    %{business.discount} İndirim
                                  </Chip>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button
                              isIconOnly
                              variant={business.notifications ? "solid" : "flat"}
                              color={business.notifications ? "warning" : "default"}
                              onClick={() => toggleNotifications(business.id)}
                            >
                              {business.notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                            </Button>
                            <Button
                              isIconOnly
                              variant={business.following ? "solid" : "flat"}
                              color={business.following ? "danger" : "default"}
                              onClick={() => toggleFollow(business.id)}
                            >
                              <Heart className={`w-4 h-4 ${business.following ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              isIconOnly
                              variant="flat"
                              color="primary"
                            >
                              <Navigation className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'categories' && (
              <div className="space-y-4">
                {trendingCategories.map((cat, index) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardBody className="p-6">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                            style={{ backgroundColor: cat.color + '20' }}
                          >
                            {cat.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {cat.name}
                              </h3>
                              <Chip
                                size="sm"
                                color="success"
                                variant="flat"
                                startContent={<TrendingUp className="w-3 h-3" />}
                              >
                                +{cat.growth}%
                              </Chip>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {cat.count} yorum yapıldı
                            </p>
                            <Progress
                              value={(cat.count / 500) * 100}
                              className="h-2"
                              classNames={{
                                indicator: `bg-gradient-to-r from-purple-500 to-pink-500`
                              }}
                            />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'users' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {risingStars.map((user, index) => (
                  <motion.div
                    key={user.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-xl transition-all">
                      <CardBody className="p-6 text-center">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-5xl mb-4">
                          {user.avatar}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {user.name}
                        </h3>
                        <Chip size="sm" color="secondary" variant="flat" className="mb-4">
                          {user.badge} Ligi
                        </Chip>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Puan</span>
                            <span className="font-bold">{user.points}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Artış</span>
                            <Chip size="sm" color="success" variant="flat">
                              +{user.growth}
                            </Chip>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'topics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotTopics.map((topic, index) => (
                  <motion.div
                    key={topic.tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all">
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                              {topic.tag}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {topic.count} yorumda kullanıldı
                            </p>
                          </div>
                          <Chip
                            size="lg"
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold"
                            startContent={<Flame className="w-4 h-4" />}
                          >
                            +{topic.growth}%
                          </Chip>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'cities' && (
              <div className="space-y-4">
                {cityTrends.map((city, index) => (
                  <motion.div
                    key={city.city}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-6 h-6 text-red-500" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {city.city}
                            </h3>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">{city.count}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">yorum</p>
                          </div>
                        </div>
                        <Progress
                          value={city.percentage}
                          className="h-3"
                          classNames={{
                            indicator: "bg-gradient-to-r from-blue-500 to-purple-500"
                          }}
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Toplam yorumların %{city.percentage}'i
                        </p>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default TrendsPage


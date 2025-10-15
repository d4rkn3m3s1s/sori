import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Avatar, Chip, Tabs, Tab, Button, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Progress, Tooltip } from '@nextui-org/react'
import { Trophy, Crown, Medal, Star, TrendingUp, Users, Calendar, Filter, Zap, Target, Eye, Sparkles, ArrowUp, ArrowDown, Minus, Flame, Award, BarChart3, MessageCircle, Heart } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useBadgeSystem } from '../../hooks/useBadgeSystem'
import BadgeCard from '../../components/badges/BadgeCard'
import { Badge } from '../../types/badge'
import { BADGE_LEVELS } from '../../data/badges'

interface UserProfile {
  userId: string
  username: string
  avatar: string
  rank: number
  totalPoints: number
  totalBadges: number
  level: number
  topBadges: Badge[]
  isVip: boolean
  categoryStats: {
    activity: number
    behavior: number
    brand: number
    special: number
  }
  weeklyGrowth: number
  monthlyGrowth: number
  joinDate: string
  lastActive: string
}

function LeaderboardPage() {
  const { leaderboard, userStats, isLoading } = useBadgeSystem('current-user')
  const [activeTab, setActiveTab] = useState('overall')
  const [timeFilter, setTimeFilter] = useState('all-time')
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [compareUser, setCompareUser] = useState<UserProfile | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [leagueFilter, setLeagueFilter] = useState<string>('all')
  const [regionFilter, setRegionFilter] = useState<'all' | 'turkey' | 'global'>('all')

  const timeFilters = [
    { key: 'all-time', label: 'Tüm Zamanlar' },
    { key: 'this-month', label: 'Bu Ay' },
    { key: 'this-week', label: 'Bu Hafta' },
    { key: 'today', label: 'Bugün' }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Medal className="w-6 h-6 text-orange-600" />
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return { color: 'warning', text: '🥇 1.' }
      case 2: return { color: 'default', text: '🥈 2.' }
      case 3: return { color: 'warning', text: '🥉 3.' }
      default: return { color: 'primary', text: `#${rank}` }
    }
  }

  const getRankChangeIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="w-4 h-4 text-green-500" />
    if (growth < 0) return <ArrowDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getRankChangeColor = (growth: number) => {
    if (growth > 0) return 'text-green-600 dark:text-green-400'
    if (growth < 0) return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  // Yeni lig sistemi fonksiyonları
  const getLeagueInfo = (points: number) => {
    const league = [...BADGE_LEVELS].reverse().find(level => points >= level.requiredPoints) || BADGE_LEVELS[0]
    return league
  }

  const getLeagueBadge = (points: number) => {
    const league = getLeagueInfo(points)
    return (
      <Chip 
        size="sm"
        className={`bg-gradient-to-r ${league.gradient} text-white font-bold`}
        startContent={<span className="text-sm">{league.icon}</span>}
      >
        {league.name}
      </Chip>
    )
  }

  const handleViewProfile = (user: any) => {
    // Mock olarak detaylı profil oluştur
    const detailedProfile: UserProfile = {
      ...user,
      categoryStats: {
        activity: Math.floor(Math.random() * 20),
        behavior: Math.floor(Math.random() * 15),
        brand: Math.floor(Math.random() * 10),
        special: Math.floor(Math.random() * 5)
      },
      weeklyGrowth: Math.floor(Math.random() * 200) - 50,
      monthlyGrowth: Math.floor(Math.random() * 500) - 100,
      joinDate: '15 Ocak 2024',
      lastActive: '2 saat önce'
    }
    setSelectedUser(detailedProfile)
  }

  const handleCompareWith = (user: any) => {
    const detailedProfile: UserProfile = {
      ...user,
      categoryStats: {
        activity: Math.floor(Math.random() * 20),
        behavior: Math.floor(Math.random() * 15),
        brand: Math.floor(Math.random() * 10),
        special: Math.floor(Math.random() * 5)
      },
      weeklyGrowth: Math.floor(Math.random() * 200) - 50,
      monthlyGrowth: Math.floor(Math.random() * 500) - 100,
      joinDate: '10 Şubat 2024',
      lastActive: '5 dakika önce'
    }
    setCompareUser(detailedProfile)
    setShowCompareModal(true)
  }

  // Lig filtreleme
  const filteredLeaderboard = leaderboard.filter(user => {
    // League filter
    if (leagueFilter !== 'all') {
      const userLeague = getLeagueInfo(user.totalPoints)
      if (userLeague.name !== leagueFilter) return false
    }
    
    // Region filter (Mock - gerçekte backend'den gelecek)
    if (regionFilter !== 'all') {
      // Mock: username'e göre basit bir region ataması
      const isTurkish = user.username.includes('TR') || Math.random() > 0.5
      if (regionFilter === 'turkey' && !isTurkish) return false
      if (regionFilter === 'global' && isTurkish) return false
    }
    
    return true
  })

  const topUsers = filteredLeaderboard.slice(0, 3)
  const otherUsers = filteredLeaderboard.slice(3)

  const categoryLeaders = {
    activity: leaderboard[0],
    behavior: leaderboard[1],
    brand: leaderboard[2],
    special: leaderboard[0]
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar userType="customer" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Liderlik Tablosu" subtitle="Sıralama yükleniyor..." userType="customer" />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Liderlik tablosu yükleniyor...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Liderlik Tablosu" 
          subtitle="En başarılı rozet koleksiyoncularını keşfet"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Header Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Liderlik Tablosu</h2>
                        <p className="text-white/90">En başarılı rozet koleksiyoncuları</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold">#{userStats?.rank || 0}</div>
                      <div className="text-sm text-white/80">Senin Sıran</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-bold">{userStats?.totalBadges || 0}</div>
                      <div className="text-xs text-white/80">Rozetlerin</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">{userStats?.totalPoints || 0}</div>
                      <div className="text-xs text-white/80">Puanın</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold flex items-center justify-center">{getLeagueBadge(userStats?.totalPoints || 0)}</div>
                      <div className="text-xs text-white/80">Ligin</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <Tabs
                      selectedKey={activeTab}
                      onSelectionChange={(key) => setActiveTab(key as string)}
                      classNames={{
                        tabList: "bg-gray-100 dark:bg-gray-800",
                        cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                        tab: "text-gray-600 dark:text-gray-400",
                        tabContent: "group-data-[selected=true]:text-white"
                      }}
                    >
                      <Tab key="overall" title="Genel Sıralama" />
                      <Tab key="weekly" title="Haftalık" />
                      <Tab key="monthly" title="Aylık" />
                    </Tabs>

                    <div className="flex gap-3 flex-wrap">
                      <Select
                        placeholder="Bölge Seçimi"
                        selectedKeys={regionFilter ? [regionFilter] : []}
                        onSelectionChange={(keys) => setRegionFilter(Array.from(keys)[0] as 'all' | 'turkey' | 'global')}
                        className="min-w-[150px]"
                        variant="bordered"
                        startContent={<Users className="w-4 h-4 text-gray-400" />}
                        items={[
                          { key: 'all', label: '🌐 Tüm Bölgeler' },
                          { key: 'turkey', label: '🇹🇷 Türkiye Ligi' },
                          { key: 'global', label: '🌍 Global Lig' }
                        ]}
                      >
                        {(item: any) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                      </Select>
                      
                      <Select
                        placeholder="Lig Filtresi"
                        selectedKeys={leagueFilter ? [leagueFilter] : []}
                        onSelectionChange={(keys) => setLeagueFilter(Array.from(keys)[0] as string)}
                        className="min-w-[150px]"
                        variant="bordered"
                        startContent={<Trophy className="w-4 h-4 text-gray-400" />}
                        items={[{ key: 'all', label: 'Tüm Ligler' }, ...BADGE_LEVELS.map(l => ({ key: l.name, label: `${l.icon} ${l.name}` }))]}
                      >
                        {(item: any) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                      </Select>

                      <Select
                        placeholder="Zaman Filtresi"
                        selectedKeys={timeFilter ? [timeFilter] : []}
                        onSelectionChange={(keys) => setTimeFilter(Array.from(keys)[0] as string)}
                        className="min-w-[150px]"
                        variant="bordered"
                        startContent={<Filter className="w-4 h-4 text-gray-400" />}
                      >
                        {timeFilters.map((filter) => (
                          <SelectItem key={filter.key} value={filter.key}>
                            {filter.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Top 3 Podium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardBody className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white">
                    🏆 En İyi 3 Rozet Koleksiyoncusu
                  </h3>
                  
                  <div className="flex items-end justify-center space-x-2 sm:space-x-4 md:space-x-8">
                    {/* 2nd Place */}
                    {topUsers[1] && (
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="w-20 h-16 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg flex items-end justify-center mb-4 relative">
                          <div className="absolute -top-12">
                            <Avatar
                              src={topUsers[1].avatar}
                              className="w-16 h-16 border-4 border-gray-300"
                            />
                            <div className="absolute -top-2 -right-2">
                              <Medal className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <span className="text-white font-bold text-lg mb-2">2</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {topUsers[1].username}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {topUsers[1].totalPoints} puan
                        </p>
                        <div className="flex justify-center mt-2 space-x-1">
                          {topUsers[1].topBadges.slice(0, 3).map((badge) => (
                            <div key={badge.id} className="w-6 h-6 text-sm">
                              {badge.icon}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* 1st Place */}
                    {topUsers[0] && (
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                      >
                        <div className="w-24 h-20 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex items-end justify-center mb-4 relative">
                          <div className="absolute -top-14">
                            <Avatar
                              src={topUsers[0].avatar}
                              className="w-20 h-20 border-4 border-yellow-400"
                            />
                            <div className="absolute -top-2 -right-2">
                              <Crown className="w-8 h-8 text-yellow-500" />
                            </div>
                          </div>
                          <span className="text-white font-bold text-xl mb-2">1</span>
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                          {topUsers[0].username}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {topUsers[0].totalPoints} puan
                        </p>
                        <Chip size="sm" className="bg-yellow-100 text-yellow-800 mt-1">
                          👑 Şampiyon
                        </Chip>
                        <div className="flex justify-center mt-2 space-x-1">
                          {topUsers[0].topBadges.slice(0, 3).map((badge) => (
                            <div key={badge.id} className="w-6 h-6 text-sm">
                              {badge.icon}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* 3rd Place */}
                    {topUsers[2] && (
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                      >
                        <div className="w-20 h-12 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-lg flex items-end justify-center mb-4 relative">
                          <div className="absolute -top-10">
                            <Avatar
                              src={topUsers[2].avatar}
                              className="w-14 h-14 border-4 border-orange-400"
                            />
                            <div className="absolute -top-1 -right-1">
                              <Medal className="w-5 h-5 text-orange-600" />
                            </div>
                          </div>
                          <span className="text-white font-bold mb-1">3</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {topUsers[2].username}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {topUsers[2].totalPoints} puan
                        </p>
                        <div className="flex justify-center mt-2 space-x-1">
                          {topUsers[2].topBadges.slice(0, 3).map((badge) => (
                            <div key={badge.id} className="w-6 h-6 text-sm">
                              {badge.icon}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Full Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Tam Sıralama
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tüm kullanıcıların rozet performansı
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {leaderboard.map((user, index) => {
                      const rankBadge = getRankBadge(user.rank)
                      const isCurrentUser = user.userId === 'current-user'
                      const weeklyGrowth = Math.floor(Math.random() * 200) - 50 // Mock data
                      
                      return (
                        <motion.div
                          key={user.userId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-center space-x-4 p-4 rounded-lg border transition-all hover:shadow-lg ${
                            isCurrentUser 
                              ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-700' 
                              : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Rank */}
                          <div className="flex flex-col items-center justify-center w-14">
                            {getRankIcon(user.rank)}
                            <div className="flex items-center mt-1">
                              {getRankChangeIcon(weeklyGrowth)}
                              <span className={`text-xs font-medium ${getRankChangeColor(weeklyGrowth)}`}>
                                {Math.abs(weeklyGrowth)}
                              </span>
                            </div>
                          </div>

                          {/* User Info */}
                          <Avatar
                            src={user.avatar}
                            className="w-14 h-14 cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-purple-500 transition-all"
                            onClick={() => handleViewProfile(user)}
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className={`font-semibold truncate ${isCurrentUser ? 'text-purple-700 dark:text-purple-300' : 'text-gray-900 dark:text-white'}`}>
                                {user.username}
                                {isCurrentUser && <span className="text-sm text-purple-600"> (Sen)</span>}
                              </h4>
                              {user.isVip && (
                                <Chip size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                                  <Crown className="w-3 h-3 mr-1" />
                                  VIP
                                </Chip>
                              )}
                              {user.rank <= 3 && (
                                <Tooltip content="Top 3 Kullanıcı">
                                  <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                                </Tooltip>
                              )}
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center">
                                {getLeagueBadge(user.totalPoints)}
                              </span>
                              <span className="flex items-center">
                                <Trophy className="w-3 h-3 mr-1" />
                                {user.totalBadges} rozet
                              </span>
                              <span className={`flex items-center ${getRankChangeColor(weeklyGrowth)}`}>
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {weeklyGrowth > 0 ? '+' : ''}{weeklyGrowth} bu hafta
                              </span>
                            </div>
                          </div>

                          {/* Top Badges */}
                          <div className="hidden md:flex space-x-1">
                            {user.topBadges.slice(0, 3).map((badge) => (
                              <Tooltip key={badge.id} content={badge.name}>
                                <div className="relative group cursor-pointer">
                                  <div className="w-9 h-9 text-xl hover:scale-110 transition-transform">
                                    {badge.icon}
                                  </div>
                                </div>
                              </Tooltip>
                            ))}
                            {user.totalBadges > 3 && (
                              <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                                +{user.totalBadges - 3}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2">
                            <Tooltip content="Profili Görüntüle">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                color="primary"
                                onPress={() => handleViewProfile(user)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                            {!isCurrentUser && (
                              <Tooltip content="Karşılaştır">
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="flat"
                                  color="secondary"
                                  onPress={() => handleCompareWith(user)}
                                >
                                  <Target className="w-4 h-4" />
                                </Button>
                              </Tooltip>
                            )}
                          </div>

                          {/* Points */}
                          <div className="text-right min-w-[90px]">
                            <div className={`text-xl font-bold ${isCurrentUser ? 'text-purple-700 dark:text-purple-300' : 'text-gray-900 dark:text-white'}`}>
                              {user.totalPoints.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end">
                              <Sparkles className="w-3 h-3 mr-1" />
                              puan
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Category Leaders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    🎯 Kategori Liderleri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Activity Leader */}
                    {categoryLeaders.activity && (
                      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-lg transition-shadow">
                        <CardBody className="p-4 text-center">
                          <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Aktivite Lideri</h4>
                          <Avatar src={categoryLeaders.activity.avatar} className="w-16 h-16 mx-auto mb-2" />
                          <p className="font-bold text-gray-900 dark:text-white">{categoryLeaders.activity.username}</p>
                          <p className="text-xs text-gray-500">{categoryLeaders.activity.totalPoints} puan</p>
                        </CardBody>
                      </Card>
                    )}

                    {/* Behavior Leader */}
                    {categoryLeaders.behavior && (
                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-lg transition-shadow">
                        <CardBody className="p-4 text-center">
                          <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Davranış Lideri</h4>
                          <Avatar src={categoryLeaders.behavior.avatar} className="w-16 h-16 mx-auto mb-2" />
                          <p className="font-bold text-gray-900 dark:text-white">{categoryLeaders.behavior.username}</p>
                          <p className="text-xs text-gray-500">{categoryLeaders.behavior.totalPoints} puan</p>
                        </CardBody>
                      </Card>
                    )}

                    {/* Brand Leader */}
                    {categoryLeaders.brand && (
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-lg transition-shadow">
                        <CardBody className="p-4 text-center">
                          <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Marka Lideri</h4>
                          <Avatar src={categoryLeaders.brand.avatar} className="w-16 h-16 mx-auto mb-2" />
                          <p className="font-bold text-gray-900 dark:text-white">{categoryLeaders.brand.username}</p>
                          <p className="text-xs text-gray-500">{categoryLeaders.brand.totalPoints} puan</p>
                        </CardBody>
                      </Card>
                    )}

                    {/* Special Leader */}
                    {categoryLeaders.special && (
                      <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:shadow-lg transition-shadow">
                        <CardBody className="p-4 text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Özel Rozet Lideri</h4>
                          <Avatar src={categoryLeaders.special.avatar} className="w-16 h-16 mx-auto mb-2" />
                          <p className="font-bold text-gray-900 dark:text-white">{categoryLeaders.special.username}</p>
                          <p className="text-xs text-gray-500">{categoryLeaders.special.totalPoints} puan</p>
                        </CardBody>
                      </Card>
                    )}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </main>

        {/* User Profile Modal */}
        <AnimatePresence>
          {selectedUser && (
            <Modal
              isOpen={!!selectedUser}
              onClose={() => setSelectedUser(null)}
              size="2xl"
              backdrop="blur"
              placement="center"
              classNames={{
                backdrop: "bg-black/50 backdrop-blur-sm",
                base: "border-[#292f46] bg-white dark:bg-[#19172c]",
                header: "border-b-[1px] border-gray-200 dark:border-[#292f46]",
                footer: "border-t-[1px] border-gray-200 dark:border-[#292f46]",
              }}
            >
              <ModalContent>
                <ModalHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar src={selectedUser.avatar} className="w-16 h-16" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>{selectedUser.username}</span>
                        {selectedUser.isVip && <Crown className="w-5 h-5 text-yellow-500" />}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          {getRankIcon(selectedUser.rank)} Sıralama: #{selectedUser.rank}
                        </span>
                        <span className="flex items-center gap-2">
                          Lig: {getLeagueBadge(selectedUser.totalPoints)}
                        </span>
                      </div>
                    </div>
                  </div>
                </ModalHeader>

                <ModalBody className="py-6">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardBody className="p-4 text-center">
                        <Trophy className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.totalBadges}</p>
                        <p className="text-xs text-gray-500">Toplam Rozet</p>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="p-4 text-center">
                        <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.totalPoints.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Toplam Puan</p>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="p-4 text-center">
                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className={`text-2xl font-bold ${getRankChangeColor(selectedUser.weeklyGrowth)}`}>
                          {selectedUser.weeklyGrowth > 0 ? '+' : ''}{selectedUser.weeklyGrowth}
                        </p>
                        <p className="text-xs text-gray-500">Bu Hafta</p>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Category Performance */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Kategori Performansı</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Zap className="w-4 h-4 mr-1 text-blue-500" />
                            Aktivite
                          </span>
                          <span className="text-sm font-medium">{selectedUser.categoryStats.activity} rozet</span>
                        </div>
                        <Progress
                          value={(selectedUser.categoryStats.activity / 20) * 100}
                          color="primary"
                          size="sm"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Heart className="w-4 h-4 mr-1 text-green-500" />
                            Davranış
                          </span>
                          <span className="text-sm font-medium">{selectedUser.categoryStats.behavior} rozet</span>
                        </div>
                        <Progress
                          value={(selectedUser.categoryStats.behavior / 15) * 100}
                          color="success"
                          size="sm"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Star className="w-4 h-4 mr-1 text-purple-500" />
                            Marka
                          </span>
                          <span className="text-sm font-medium">{selectedUser.categoryStats.brand} rozet</span>
                        </div>
                        <Progress
                          value={(selectedUser.categoryStats.brand / 10) * 100}
                          color="secondary"
                          size="sm"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Sparkles className="w-4 h-4 mr-1 text-orange-500" />
                            Özel
                          </span>
                          <span className="text-sm font-medium">{selectedUser.categoryStats.special} rozet</span>
                        </div>
                        <Progress
                          value={(selectedUser.categoryStats.special / 5) * 100}
                          color="warning"
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">En İyi Rozetler</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {selectedUser.topBadges.slice(0, 8).map((badge) => (
                        <Tooltip key={badge.id} content={badge.name}>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-3xl mb-1">{badge.icon}</div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{badge.name}</p>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  {/* Activity Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Katılım Tarihi</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedUser.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Son Aktiflik</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedUser.lastActive}</p>
                      </div>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button variant="bordered" onPress={() => setSelectedUser(null)}>
                    Kapat
                  </Button>
                  {selectedUser.userId !== 'current-user' && (
                    <Button color="secondary" onPress={() => {
                      handleCompareWith(selectedUser)
                      setSelectedUser(null)
                    }}>
                      Karşılaştır
                    </Button>
                  )}
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>

        {/* Compare Modal */}
        <AnimatePresence>
          {showCompareModal && compareUser && userStats && (
            <Modal
              isOpen={showCompareModal}
              onClose={() => setShowCompareModal(false)}
              size="3xl"
              backdrop="blur"
              placement="center"
              classNames={{
                backdrop: "bg-black/50 backdrop-blur-sm",
                base: "border-[#292f46] bg-white dark:bg-[#19172c]",
              }}
            >
              <ModalContent>
                <ModalHeader>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2" />
                    Rozet Karşılaştırması
                  </h3>
                </ModalHeader>

                <ModalBody className="py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Current User */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 md:p-6 mb-4">
                        <Avatar src="https://i.pravatar.cc/150?u=current" className="w-20 h-20 mx-auto mb-3" />
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Sen</h4>
                        <Chip size="sm" className="bg-purple-100 text-purple-800">
                          #{userStats.rank}
                        </Chip>
                      </div>
                      
                      <div className="space-y-3 text-left">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Puan</span>
                          <span className="font-bold text-gray-900 dark:text-white">{userStats.totalPoints}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Rozet</span>
                          <span className="font-bold text-gray-900 dark:text-white">{userStats.totalBadges}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Lig</span>
                          <span>{getLeagueBadge(userStats.totalPoints)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Compare User */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6 mb-4">
                        <Avatar src={compareUser.avatar} className="w-20 h-20 mx-auto mb-3" />
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{compareUser.username}</h4>
                        <Chip size="sm" className="bg-blue-100 text-blue-800">
                          #{compareUser.rank}
                        </Chip>
                      </div>
                      
                      <div className="space-y-3 text-left">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Puan</span>
                          <span className="font-bold text-gray-900 dark:text-white">{compareUser.totalPoints}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Rozet</span>
                          <span className="font-bold text-gray-900 dark:text-white">{compareUser.totalBadges}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Lig</span>
                          <span>{getLeagueBadge(compareUser.totalPoints)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Comparison */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Kategori Karşılaştırması</h5>
                    <div className="space-y-3">
                      {Object.entries(compareUser.categoryStats).map(([category, value]) => {
                        const currentUserValue = Math.floor(Math.random() * 20) // Mock data
                        const total = Math.max(value, currentUserValue, 1)
                        const comparePercentage = (value / total) * 100
                        const currentPercentage = (currentUserValue / total) * 100
                        
                        return (
                          <div key={category}>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">{category}</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={currentPercentage} color="secondary" size="sm" className="flex-1" />
                              <span className="text-xs font-medium w-8 text-right">{currentUserValue}</span>
                              <span className="text-xs text-gray-400">vs</span>
                              <span className="text-xs font-medium w-8">{value}</span>
                              <Progress value={comparePercentage} color="primary" size="sm" className="flex-1" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      İçgörüler
                    </h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {compareUser.totalPoints > (userStats?.totalPoints || 0) ? (
                        <li>• {compareUser.username} senden {compareUser.totalPoints - (userStats?.totalPoints || 0)} puan önde</li>
                      ) : (
                        <li>• Sen {compareUser.username}'den {(userStats?.totalPoints || 0) - compareUser.totalPoints} puan öndesin</li>
                      )}
                      {compareUser.totalBadges > (userStats?.totalBadges || 0) ? (
                        <li>• {compareUser.username}'in {compareUser.totalBadges - (userStats?.totalBadges || 0)} rozet daha fazla</li>
                      ) : (
                        <li>• Senin {(userStats?.totalBadges || 0) - compareUser.totalBadges} rozet daha fazla</li>
                      )}
                      <li>• Aktivite kategorisinde daha fazla rozet kazanarak öne geçebilirsin!</li>
                    </ul>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button variant="bordered" onPress={() => setShowCompareModal(false)}>
                    Kapat
                  </Button>
                  <Button color="primary" onPress={() => {
                    setShowCompareModal(false)
                    // Navigate to badge collection to see how to unlock more badges
                  }}>
                    Rozetlerime Git
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LeaderboardPage

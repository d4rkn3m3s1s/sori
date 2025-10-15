import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Avatar, Chip, Button, Progress, Tooltip } from '@nextui-org/react'
import { 
  Trophy, Crown, Medal, Star, TrendingUp, ArrowUp, ArrowDown, 
  Zap, Target, Flame, Award, Users, Clock, ArrowLeft, RefreshCw
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useNavigate } from 'react-router-dom'

interface LiveUser {
  id: string
  username: string
  avatar: string
  rank: number
  points: number
  level: number
  streak: number
  isOnline: boolean
  recentActivity: string
  rankChange: number
  trend: 'up' | 'down' | 'same'
}

function LiveLeaderboardPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<LiveUser[]>([])
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Rastgele kullanıcı verileri oluştur
  const generateMockUsers = (): LiveUser[] => {
    const names = [
      'Ali Yılmaz', 'Ayşe Demir', 'Mehmet Kaya', 'Fatma Çelik', 'Ahmet Şahin',
      'Zeynep Yıldız', 'Mustafa Arslan', 'Elif Öztürk', 'Hüseyin Kurt', 'Merve Aydın',
      'İbrahim Özkan', 'Selin Polat', 'Oğuz Şimşek', 'Büşra Koç', 'Emre Acar',
      'Gamze Yılmaz', 'Burak Doğan', 'Cemre Kara', 'Deniz Çetin', 'Ece Yavuz'
    ]

    return names.map((name, index) => {
      const previousPoints = 1000 + (names.length - index) * 150 + Math.random() * 100
      const currentPoints = previousPoints + Math.random() * 50 - 10
      const rankChange = Math.floor(Math.random() * 5) - 2

      return {
        id: `user-${index}`,
        username: name,
        avatar: `https://i.pravatar.cc/150?u=${index}`,
        rank: index + 1,
        points: Math.round(currentPoints),
        level: Math.floor(currentPoints / 200) + 1,
        streak: Math.floor(Math.random() * 30),
        isOnline: Math.random() > 0.3,
        recentActivity: [
          '2 dakika önce puan kazandı',
          '5 dakika önce rozet aldı',
          '10 dakika önce görev tamamladı',
          '15 dakika önce yorum yaptı',
          '30 dakika önce aktifti'
        ][Math.floor(Math.random() * 5)],
        rankChange: rankChange,
        trend: rankChange > 0 ? 'up' : rankChange < 0 ? 'down' : 'same'
      }
    })
  }

  // İlk yükleme
  useEffect(() => {
    setUsers(generateMockUsers())
  }, [])

  // Otomatik yenileme (her 5 saniyede bir)
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setUsers(prev => {
        // Kullanıcıları hafifçe karıştır
        return prev.map((user, index) => {
          const pointChange = (Math.random() - 0.5) * 20
          const newPoints = Math.max(0, user.points + pointChange)

          return {
            ...user,
            points: Math.round(newPoints),
            rankChange: pointChange > 5 ? 1 : pointChange < -5 ? -1 : 0,
            trend: (pointChange > 5 ? 'up' : pointChange < -5 ? 'down' : 'same') as 'up' | 'down' | 'same'
          }
        }).sort((a, b) => b.points - a.points).map((user, index) => ({
          ...user,
          rank: index + 1
        }))
      })
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-8 h-8 text-yellow-500" />
      case 2: return <Medal className="w-8 h-8 text-gray-400" />
      case 3: return <Medal className="w-8 h-8 text-orange-600" />
      default: return null
    }
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600'
    if (rank === 2) return 'from-gray-300 to-gray-500'
    if (rank === 3) return 'from-orange-400 to-orange-600'
    return 'from-blue-400 to-blue-600'
  }

  const getTrendIcon = (trend: LiveUser['trend']) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📊 Canlı Liderlik Tablosu" 
          subtitle="Anlık sıralama ve rekabet durumu"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="light"
                startContent={<ArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/customer/leaderboard')}
              >
                Ana Liderlik Tablosuna Dön
              </Button>
            </motion.div>

            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Toplam Yarışmacı</p>
                        <p className="text-4xl font-bold">{users.length}</p>
                      </div>
                      <Users className="w-12 h-12 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Çevrimiçi</p>
                        <p className="text-4xl font-bold">{users.filter(u => u.isOnline).length}</p>
                      </div>
                      <Zap className="w-12 h-12 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Lider</p>
                        <p className="text-2xl font-bold truncate">{users[0]?.username}</p>
                      </div>
                      <Trophy className="w-12 h-12 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Son Güncelleme</p>
                        <p className="text-lg font-bold">
                          {lastUpdate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <Clock className="w-12 h-12 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Controls */}
            <Card>
              <CardBody className="p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Chip
                      color={autoRefresh ? 'success' : 'default'}
                      variant="dot"
                      size="lg"
                    >
                      {autoRefresh ? 'Otomatik Yenileme Açık' : 'Otomatik Yenileme Kapalı'}
                    </Chip>
                    <Chip variant="flat" size="lg">
                      Her 5 saniyede bir güncellenir
                    </Chip>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      variant={autoRefresh ? 'solid' : 'flat'}
                      onPress={() => setAutoRefresh(!autoRefresh)}
                      startContent={<RefreshCw className="w-4 h-4" />}
                    >
                      {autoRefresh ? 'Durdur' : 'Başlat'}
                    </Button>
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={() => {
                        setUsers(generateMockUsers())
                        setLastUpdate(new Date())
                      }}
                      startContent={<Zap className="w-4 h-4" />}
                    >
                      Manuel Yenile
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {users.slice(0, 3).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={`bg-gradient-to-br ${getRankColor(user.rank)} relative overflow-hidden`}>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    
                    <CardBody className="p-6 relative z-10">
                      <div className="text-center text-white">
                        {/* Rank Icon */}
                        <div className="flex justify-center mb-3">
                          {getRankIcon(user.rank)}
                        </div>

                        {/* Avatar */}
                        <div className="relative inline-block mb-3">
                          <Avatar
                            src={user.avatar}
                            className="w-20 h-20 border-4 border-white shadow-xl"
                          />
                          {user.isOnline && (
                            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>

                        {/* User Info */}
                        <h3 className="text-xl font-bold mb-1">{user.username}</h3>
                        <Chip size="lg" className="bg-white/20 text-white font-bold mb-2">
                          #{user.rank}
                        </Chip>
                        
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                            <span className="text-sm">Puan</span>
                            <span className="font-bold text-lg">{user.points.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                            <span className="text-sm">Seviye</span>
                            <span className="font-bold">{user.level}</span>
                          </div>
                          <div className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                            <span className="text-sm">Seri</span>
                            <span className="font-bold flex items-center gap-1">
                              <Flame className="w-4 h-4" />
                              {user.streak} gün
                            </span>
                          </div>
                        </div>

                        {/* Trend */}
                        {user.trend !== 'same' && (
                          <div className="mt-3 flex items-center justify-center gap-1">
                            {getTrendIcon(user.trend)}
                            <span className="text-sm font-semibold">
                              {user.rankChange > 0 ? '+' : ''}{user.rankChange} sıra
                            </span>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Rest of the Leaderboard */}
            <Card>
              <CardBody className="p-4">
                <div className="space-y-2">
                  <AnimatePresence>
                    {users.slice(3).map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.02 }}
                        layout
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardBody className="p-4">
                            <div className="flex items-center gap-4">
                              {/* Rank */}
                              <div className="w-12 text-center">
                                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                                  #{user.rank}
                                </span>
                              </div>

                              {/* Avatar */}
                              <div className="relative">
                                <Avatar
                                  src={user.avatar}
                                  size="lg"
                                  className="border-2 border-gray-200 dark:border-gray-700"
                                />
                                {user.isOnline && (
                                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                                )}
                              </div>

                              {/* User Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-gray-900 dark:text-white truncate">
                                    {user.username}
                                  </h3>
                                  {user.streak > 7 && (
                                    <Tooltip content={`${user.streak} gün seri`}>
                                      <Chip size="sm" color="warning" variant="flat" startContent={<Flame className="w-3 h-3" />}>
                                        {user.streak}
                                      </Chip>
                                    </Tooltip>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {user.recentActivity}
                                </p>
                              </div>

                              {/* Stats */}
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Puan</p>
                                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                                    {user.points.toLocaleString()}
                                  </p>
                                </div>
                                
                                <div className="text-right">
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Seviye</p>
                                  <Chip size="sm" color="primary" variant="flat">
                                    {user.level}
                                  </Chip>
                                </div>

                                {/* Trend */}
                                <div className="w-12 flex justify-center">
                                  {user.trend !== 'same' && (
                                    <Tooltip content={`${Math.abs(user.rankChange)} sıra ${user.trend === 'up' ? 'yükseldi' : 'düştü'}`}>
                                      <div className={`flex items-center gap-1 ${
                                        user.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                      }`}>
                                        {getTrendIcon(user.trend)}
                                        <span className="text-sm font-bold">{Math.abs(user.rankChange)}</span>
                                      </div>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardBody>
            </Card>

          </div>
        </main>
      </div>
    </div>
  )
}

export default LiveLeaderboardPage


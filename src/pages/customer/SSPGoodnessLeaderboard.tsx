import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button, Chip, Avatar, Progress } from '@nextui-org/react'
import { ArrowLeft, Heart, TrendingUp, Users, Sparkles, Award, TreePine, Droplet } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface AnonymousUser {
  id: string
  displayName: string // "İyilik Meleği #123" gibi
  avatar: string // Rastgele avatar emoji
  totalDonations: number
  impactScore: number
  lastDonationType: string
  joinDate: string
  rank?: number
}

function SSPGoodnessLeaderboard() {
  const navigate = useNavigate()
  
  // Mock anonymous users - Gösterişe yol açmayan, anonim yaklaşım
  const [anonymousLeaders] = useState<AnonymousUser[]>([
    {
      id: '1',
      displayName: 'İyilik Meleği #4782',
      avatar: '😇',
      totalDonations: 45,
      impactScore: 98,
      lastDonationType: 'Fidan Bağışı',
      joinDate: '2024-01',
      rank: 1
    },
    {
      id: '2',
      displayName: 'Umut Yıldızı #2341',
      avatar: '⭐',
      totalDonations: 42,
      impactScore: 95,
      lastDonationType: 'Su Bağışı',
      joinDate: '2024-02',
      rank: 2
    },
    {
      id: '3',
      displayName: 'Yardım Kahramanı #8923',
      avatar: '🦸',
      totalDonations: 38,
      impactScore: 92,
      lastDonationType: 'Kırtasiye Bağışı',
      joinDate: '2024-01',
      rank: 3
    },
    {
      id: '4',
      displayName: 'Sevgi Elçisi #1567',
      avatar: '💝',
      totalDonations: 35,
      impactScore: 89,
      lastDonationType: 'Gıda Kolisi',
      joinDate: '2024-03',
      rank: 4
    },
    {
      id: '5',
      displayName: 'Barış Güvercini #3456',
      avatar: '🕊️',
      totalDonations: 32,
      impactScore: 86,
      lastDonationType: 'İlaç Desteği',
      joinDate: '2024-02',
      rank: 5
    }
  ])

  // Kullanıcının kendi anonim profili
  const [myProfile] = useState<AnonymousUser>({
    id: 'me',
    displayName: 'Gönül Dostu #5628',
    avatar: '🌟',
    totalDonations: 12,
    impactScore: 45,
    lastDonationType: 'Fidan Bağışı',
    joinDate: '2024-04',
    rank: 48
  })

  // Toplam istatistikler
  const globalStats = {
    totalUsers: 12450,
    totalDonations: 45632,
    totalImpact: 98765,
    treesPlanted: 2156,
    peopleHelped: 8921
  }

  const getRankColor = (rank?: number) => {
    if (!rank) return 'default'
    if (rank === 1) return 'warning'
    if (rank === 2) return 'default'
    if (rank === 3) return 'warning'
    return 'primary'
  }

  const getRankIcon = (rank?: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return '🏅'
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="💚 İyilik Liderlik Tablosu" 
          subtitle="Anonim iyilikler, gerçek etkiler"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="light"
                startContent={<ArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/customer/donations')}
              >
                Bağışlara Dön
              </Button>
            </motion.div>

            {/* Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">🌱</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Anonim İyilik Felsefesi
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        Bu liderlik tablosu <strong>gösterişe yol açmamak</strong> için tasarlandı. 
                        Gerçek isimler gizli tutulur, herkes anonim kod isimleriyle görünür. 
                        İyilik yapmak için motivasyon ödül değil, <strong>yardım etmenin kendisi</strong>dir. 
                        Burada sadece topluluk olarak birlikte ne kadar iyilik yaptığımızı görüyoruz. 💚
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Chip size="sm" color="success" variant="flat">Anonim</Chip>
                        <Chip size="sm" color="primary" variant="flat">Gösteriş Yok</Chip>
                        <Chip size="sm" color="secondary" variant="flat">Sadece İyilik</Chip>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Global Impact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardBody className="p-4 text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {globalStats.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Yardımsever</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardBody className="p-4 text-center">
                    <div className="text-3xl mb-2">🎁</div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {globalStats.totalDonations.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Bağış</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardBody className="p-4 text-center">
                    <div className="text-3xl mb-2">🌳</div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {globalStats.treesPlanted.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dikilen Fidan</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardBody className="p-4 text-center">
                    <div className="text-3xl mb-2">❤️</div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {globalStats.peopleHelped.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Yardım Alan</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardBody className="p-4 text-center">
                    <div className="text-3xl mb-2">✨</div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {globalStats.totalImpact.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Etki Skoru</p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* My Anonymous Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{myProfile.avatar}</div>
                      <div className="text-white">
                        <h3 className="text-2xl font-bold mb-1">Senin Anonim Profilin</h3>
                        <p className="text-white/90 text-lg mb-2">{myProfile.displayName}</p>
                        <div className="flex gap-2">
                          <Chip size="sm" className="bg-white/20 text-white">
                            {myProfile.totalDonations} Bağış
                          </Chip>
                          <Chip size="sm" className="bg-white/20 text-white">
                            #{myProfile.rank} Sırada
                          </Chip>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-white text-right">
                      <p className="text-sm text-white/80 mb-1">Etki Skorun</p>
                      <p className="text-4xl font-bold">{myProfile.impactScore}</p>
                      <p className="text-sm text-white/80 mt-2">
                        Son bağış: {myProfile.lastDonationType}
                      </p>
                    </div>
                  </div>
                  
                  <Progress 
                    value={myProfile.impactScore} 
                    className="mt-4"
                    classNames={{
                      indicator: "bg-white"
                    }}
                  />
                  <p className="text-white/80 text-sm mt-2 text-center">
                    Bir üst seviyeye {100 - myProfile.impactScore} etki puanı kaldı!
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            {/* Anonymous Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Award className="w-6 h-6 text-yellow-500" />
                        İyilik Liderleri (Anonim)
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Topluluk olarak ne kadar güçlüyüz!
                      </p>
                    </div>
                    
                    <Chip 
                      size="lg" 
                      color="success" 
                      variant="flat"
                      startContent={<Users className="w-4 h-4" />}
                    >
                      Top 5
                    </Chip>
                  </div>

                  <div className="space-y-3">
                    {anonymousLeaders.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (index * 0.1) }}
                      >
                        <Card className="shadow-sm hover:shadow-md transition-shadow">
                          <CardBody className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 flex-1">
                                <div className="text-3xl">{getRankIcon(user.rank)}</div>
                                <div className="text-4xl">{user.avatar}</div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 dark:text-white">
                                    {user.displayName}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {user.totalDonations} bağış • Son: {user.lastDonationType}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <Chip 
                                  color={getRankColor(user.rank)} 
                                  variant="flat"
                                  size="lg"
                                  className="font-bold"
                                >
                                  {user.impactScore} Etki
                                </Chip>
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

            {/* Motivation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30">
                <CardBody className="p-6 text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Her İyilik Önemlidir
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Birinci olmak değil, yardım etmek önemli. Burada herkes kazanır, çünkü her bağış bir hayatı değiştirir.
                  </p>
                  <Button
                    color="warning"
                    variant="shadow"
                    size="lg"
                    startContent={<Heart className="w-5 h-5" />}
                    onClick={() => navigate('/customer/donations')}
                  >
                    Sen de Bağış Yap
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SSPGoodnessLeaderboard


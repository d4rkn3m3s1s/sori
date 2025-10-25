import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Progress, Avatar, Tabs, Tab, ScrollShadow } from '@nextui-org/react'
import { 
  Brain, Target, TrendingUp, Award, Zap, Clock, 
  Calendar, CheckCircle, Star, Sparkles, Trophy,
  ArrowLeft, Heart, Coffee, ShoppingBag, MessageSquare,
  BarChart3, Flame, AlertCircle, RefreshCw, Play, Users
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useNavigate } from 'react-router-dom'

// Görev tipi
interface AITask {
  id: string
  title: string
  description: string
  category: 'scan' | 'comment' | 'visit' | 'social' | 'badge'
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  deadline: Date
  progress: number
  target: number
  completed: boolean
  icon: any
  priority: number
}

// Kullanıcı alışkanlıkları
interface UserHabits {
  favoriteCategories: string[]
  activeHours: number[]
  averageScansPerWeek: number
  averageCommentsPerWeek: number
  preferredBusinessTypes: string[]
  activityStreak: number
  lastActive: Date
}

// Motivasyon mesajı
interface MotivationMessage {
  id: string
  text: string
  type: 'encouragement' | 'achievement' | 'reminder' | 'tip'
  icon: string
  timestamp: Date
}

// Mock kullanıcı alışkanlıkları
const mockUserHabits: UserHabits = {
  favoriteCategories: ['Cafe', 'Restoran', 'Alışveriş'],
  activeHours: [9, 10, 11, 12, 13, 18, 19, 20],
  averageScansPerWeek: 8,
  averageCommentsPerWeek: 5,
  preferredBusinessTypes: ['Starbucks', 'McDonald\'s', 'Nike'],
  activityStreak: 7,
  lastActive: new Date()
}

const AITrainerPage = () => {
  const navigate = useNavigate()
  const [userHabits] = useState<UserHabits>(mockUserHabits)
  const [aiTasks, setAiTasks] = useState<AITask[]>([])
  const [motivationMessages, setMotivationMessages] = useState<MotivationMessage[]>([])
  const [selectedTab, setSelectedTab] = useState('tasks')
  const [userLevel, setUserLevel] = useState(12)
  const [totalXP, setTotalXP] = useState(2450)
  const [nextLevelXP] = useState(3000)
  const [completedToday, setCompletedToday] = useState(3)
  const [weeklyGoal] = useState(15)

  // AI görev önerileri oluştur
  useEffect(() => {
    generateAITasks()
    generateMotivationMessages()
  }, [userHabits])

  const generateAITasks = () => {
    const currentHour = new Date().getHours()
    const tasks: AITask[] = []

    // Kullanıcı alışkanlıklarına göre görevler oluştur
    
    // Sabah aktivitesi (eğer sabah aktifse)
    if (userHabits.activeHours.includes(currentHour) && currentHour < 12) {
      tasks.push({
        id: 'morning-scan',
        title: '☕ Sabah Kahvesi',
        description: 'Favori kafende check-in yap ve kahve fişini tarat!',
        category: 'scan',
        difficulty: 'easy',
        points: 50,
        deadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
        progress: 0,
        target: 1,
        completed: false,
        icon: Coffee,
        priority: 10
      })
    }

    // Favori kategorilere göre
    if (userHabits.favoriteCategories.includes('Cafe')) {
      tasks.push({
        id: 'cafe-lover',
        title: '☕ Kahve Tutkunu',
        description: 'Bu hafta 3 farklı kafede check-in yap',
        category: 'visit',
        difficulty: 'medium',
        points: 150,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        progress: 1,
        target: 3,
        completed: false,
        icon: Coffee,
        priority: 8
      })
    }

    // Yorum hedefi (ortalamanın üstü için motive et)
    if (userHabits.averageCommentsPerWeek < 10) {
      tasks.push({
        id: 'comment-boost',
        title: '💬 Yorum Kampanyonu',
        description: 'Bu hafta 5 detaylı yorum yap, ekstra puan kazan!',
        category: 'comment',
        difficulty: 'medium',
        points: 200,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        progress: 2,
        target: 5,
        completed: false,
        icon: MessageSquare,
        priority: 9
      })
    }

    // Sosyal etkileşim
    tasks.push({
      id: 'social-butterfly',
      title: '🦋 Sosyal Kelebek',
      description: 'Arkadaşlarının yorumlarını beğen ve paylaş',
      category: 'social',
      difficulty: 'easy',
      points: 75,
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      progress: 0,
      target: 5,
      completed: false,
      icon: Users,
      priority: 6
    })

    // Streak devam ettirme
    if (userHabits.activityStreak >= 5) {
      tasks.push({
        id: 'keep-streak',
        title: '🔥 Serini Koru',
        description: `${userHabits.activityStreak} günlük serini koru! Bugün aktif ol.`,
        category: 'scan',
        difficulty: 'easy',
        points: userHabits.activityStreak * 10,
        deadline: new Date(Date.now() + 12 * 60 * 60 * 1000),
        progress: 0,
        target: 1,
        completed: false,
        icon: Flame,
        priority: 10
      })
    }

    // Rozet avcısı
    tasks.push({
      id: 'badge-hunter',
      title: '🏆 Rozet Avcısı',
      description: 'AR tarayıcı ile 2 yeni rozet keşfet',
      category: 'badge',
      difficulty: 'hard',
      points: 300,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      progress: 0,
      target: 2,
      completed: false,
      icon: Trophy,
      priority: 7
    })

    // Keşif görevi (yeni yerler)
    tasks.push({
      id: 'explorer',
      title: '🗺️ Kaşif',
      description: 'Harita üzerinde hiç gitmediğin 3 yeni yer keşfet',
      category: 'visit',
      difficulty: 'medium',
      points: 180,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: 0,
      target: 3,
      completed: false,
      icon: Target,
      priority: 7
    })

    // Haftalık hedef
    tasks.push({
      id: 'weekly-challenge',
      title: '⚡ Haftalık Meydan Okuma',
      description: 'Bu hafta 15 aktivite tamamla (scan + yorum + check-in)',
      category: 'scan',
      difficulty: 'hard',
      points: 500,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: 8,
      target: 15,
      completed: false,
      icon: Zap,
      priority: 9
    })

    // Önceliğe göre sırala
    tasks.sort((a, b) => b.priority - a.priority)
    setAiTasks(tasks)
  }

  const generateMotivationMessages = () => {
    const messages: MotivationMessage[] = []
    const currentHour = new Date().getHours()

    // Selamlaşma mesajı
    if (currentHour >= 6 && currentHour < 12) {
      messages.push({
        id: 'morning',
        text: 'Günaydın! 🌅 Harika bir gün seni bekliyor, hadi bugünün görevlerini tamamla!',
        type: 'encouragement',
        icon: '☀️',
        timestamp: new Date()
      })
    } else if (currentHour >= 12 && currentHour < 18) {
      messages.push({
        id: 'afternoon',
        text: 'Öğleden sonra enerjini topla! ☕ Bir kahve molası verebilir ve puan kazanabilirsin.',
        type: 'tip',
        icon: '☕',
        timestamp: new Date()
      })
    } else if (currentHour >= 18 && currentHour < 22) {
      messages.push({
        id: 'evening',
        text: 'Akşam saatleri aktif olduğun zamanlar! 🌙 Şimdi görevlerini tamamlamak için mükemmel bir zaman.',
        type: 'encouragement',
        icon: '🌙',
        timestamp: new Date()
      })
    }

    // Streak mesajı
    if (userHabits.activityStreak >= 7) {
      messages.push({
        id: 'streak',
        text: `Harika! 🔥 ${userHabits.activityStreak} günlük serinle ateş gibisin! Devam et!`,
        type: 'achievement',
        icon: '🔥',
        timestamp: new Date()
      })
    }

    // Performans analizi
    if (userHabits.averageScansPerWeek > 5) {
      messages.push({
        id: 'performance',
        text: 'Sen bir yıldızsın! ⭐ Haftalık ortalamanın üzerinde performans gösteriyorsun!',
        type: 'achievement',
        icon: '⭐',
        timestamp: new Date()
      })
    }

    // Hatırlatma
    messages.push({
      id: 'reminder',
      text: '💡 İpucu: Yeni yerler keşfetmek ekstra bonus puan kazandırır!',
      type: 'tip',
      icon: '💡',
      timestamp: new Date()
    })

    // Sosyal teşvik
    messages.push({
      id: 'social',
      text: 'Arkadaşlarınla rekabet et! 👥 Liderlik tablosunda yerinigör.',
      type: 'tip',
      icon: '👥',
      timestamp: new Date()
    })

    setMotivationMessages(messages)
  }

  // Görev tamamla
  const completeTask = (taskId: string) => {
    setAiTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: true, progress: task.target }
        : task
    ))
    
    const task = aiTasks.find(t => t.id === taskId)
    if (task) {
      setTotalXP(prev => prev + task.points)
      setCompletedToday(prev => prev + 1)
      
      // Yeni motivasyon mesajı
      setMotivationMessages(prev => [{
        id: `complete-${Date.now()}`,
        text: `Tebrikler! 🎉 "${task.title}" görevini tamamladın! +${task.points} XP kazandın!`,
        type: 'achievement',
        icon: '🎉',
        timestamp: new Date()
      }, ...prev])
    }
  }

  // Zorluk rengi
  const getDifficultyColor = (difficulty: AITask['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'danger'
    }
  }

  // Kategori rengi
  const getCategoryColor = (category: AITask['category']) => {
    switch (category) {
      case 'scan': return 'from-blue-500 to-cyan-500'
      case 'comment': return 'from-purple-500 to-pink-500'
      case 'visit': return 'from-green-500 to-emerald-500'
      case 'social': return 'from-orange-500 to-red-500'
      case 'badge': return 'from-yellow-500 to-orange-500'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🧠 AI Kişisel Trainer" 
          subtitle="Sana özel görevler ve motivasyon!"
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

            {/* Seviye ve İlerleme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar
                        icon={<Brain className="w-8 h-8" />}
                        className="w-16 h-16 bg-white/20"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-white">Seviye {userLevel}</h3>
                        <p className="text-white/80">AI Trainer ile gelişmeye devam et!</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Chip size="lg" className="bg-white/20 text-white font-bold">
                        🔥 {userHabits.activityStreak} gün
                      </Chip>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span>{totalXP} XP</span>
                      <span>{nextLevelXP} XP</span>
                    </div>
                    <Progress 
                      value={(totalXP / nextLevelXP) * 100} 
                      className="h-3"
                      classNames={{
                        indicator: "bg-gradient-to-r from-yellow-400 to-orange-500"
                      }}
                    />
                    <p className="text-white/80 text-sm text-center">
                      {nextLevelXP - totalXP} XP kaldı Seviye {userLevel + 1} için!
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Günlük Özet */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <CheckCircle className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{completedToday}</p>
                    <p className="text-white/80 text-sm">Bugün Tamamlanan</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <Target className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{aiTasks.filter(t => !t.completed).length}</p>
                    <p className="text-white/80 text-sm">Aktif Görev</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <BarChart3 className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{Math.round((completedToday / weeklyGoal) * 100)}%</p>
                    <p className="text-white/80 text-sm">Haftalık Hedef</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Card className="bg-gradient-to-br from-orange-500 to-red-500">
                  <CardBody className="p-6">
                    <Sparkles className="w-8 h-8 text-white mb-2" />
                    <p className="text-3xl font-bold text-white">{aiTasks.reduce((sum, t) => sum + t.points, 0)}</p>
                    <p className="text-white/80 text-sm">Potansiyel Puan</p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Ana Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key as string)}
                color="primary"
                size="lg"
                className="mb-6"
              >
                <Tab 
                  key="tasks" 
                  title={<div className="flex items-center gap-2"><Target className="w-4 h-4" /> AI Görevler</div>} 
                />
                <Tab 
                  key="motivation" 
                  title={<div className="flex items-center gap-2"><Heart className="w-4 h-4" /> Motivasyon</div>} 
                />
                <Tab 
                  key="analytics" 
                  title={<div className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Analizim</div>} 
                />
              </Tabs>

              {/* AI Görevler */}
              {selectedTab === 'tasks' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Brain className="w-6 h-6 text-purple-500" />
                      Sana Özel Görevler
                    </h3>
                    <Button
                      size="sm"
                      variant="bordered"
                      startContent={<RefreshCw className="w-4 h-4" />}
                      onClick={generateAITasks}
                    >
                      Yenile
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className={task.completed ? 'bg-green-50 dark:bg-green-900/10' : ''}>
                          <CardBody className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(task.category)} rounded-full flex items-center justify-center`}>
                                <task.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex gap-2">
                                <Chip size="sm" color={getDifficultyColor(task.difficulty)}>
                                  {task.difficulty}
                                </Chip>
                                {task.completed && (
                                  <Chip size="sm" color="success"><CheckCircle className="w-3 h-3" /></Chip>
                                )}
                              </div>
                            </div>

                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                              {task.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {task.description}
                            </p>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">İlerleme</span>
                                <span className="font-medium">{task.progress}/{task.target}</span>
                              </div>
                              <Progress 
                                value={(task.progress / task.target) * 100} 
                                color={task.completed ? "success" : "primary"}
                                className="h-2"
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 text-sm">
                                <Chip size="sm" color="warning" variant="flat">
                                  +{task.points} XP
                                </Chip>
                                <div className="flex items-center gap-1 text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  <span>{Math.round((task.deadline.getTime() - Date.now()) / (1000 * 60 * 60))}s</span>
                                </div>
                              </div>
                              
                              <Button
                                size="sm"
                                color={task.completed ? "success" : "primary"}
                                variant={task.completed ? "flat" : "solid"}
                                isDisabled={task.completed}
                                startContent={task.completed ? <CheckCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                onClick={() => completeTask(task.id)}
                              >
                                {task.completed ? 'Tamamlandı' : 'Başla'}
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Motivasyon Mesajları */}
              {selectedTab === 'motivation' && (
                <Card>
                  <CardBody className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-red-500" />
                      Motivasyon Merkezi
                    </h3>

                    <ScrollShadow className="h-[600px]">
                      <div className="space-y-4">
                        {motivationMessages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className={`${
                              message.type === 'achievement' ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' :
                              message.type === 'encouragement' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' :
                              message.type === 'tip' ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' :
                              'bg-gray-50 dark:bg-gray-800'
                            }`}>
                              <CardBody className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="text-3xl">{message.icon}</div>
                                  <div className="flex-1">
                                    <p className="text-gray-900 dark:text-white font-medium">
                                      {message.text}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                      {message.timestamp.toLocaleTimeString('tr-TR', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                      })}
                                    </p>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollShadow>
                  </CardBody>
                </Card>
              )}

              {/* Analiz */}
              {selectedTab === 'analytics' && (
                <div className="space-y-6">
                  <Card>
                    <CardBody className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-blue-500" />
                        Performans Analizi
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Favori Kategoriler</h4>
                          <div className="space-y-2">
                            {userHabits.favoriteCategories.map((cat, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Aktif Saatler</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                              <div
                                key={hour}
                                className={`p-2 rounded text-center text-sm ${
                                  userHabits.activeHours.includes(hour)
                                    ? 'bg-green-500 text-white font-bold'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                                }`}
                              >
                                {hour}:00
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Haftalık Ortalamalar</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Taramalar</span>
                                <span className="font-bold">{userHabits.averageScansPerWeek}/hafta</span>
                              </div>
                              <Progress value={(userHabits.averageScansPerWeek / 15) * 100} color="primary" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Yorumlar</span>
                                <span className="font-bold">{userHabits.averageCommentsPerWeek}/hafta</span>
                              </div>
                              <Progress value={(userHabits.averageCommentsPerWeek / 10) * 100} color="secondary" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Tercih Edilen İşletmeler</h4>
                          <div className="space-y-2">
                            {userHabits.preferredBusinessTypes.map((business, index) => (
                              <Chip key={index} color="primary" variant="flat">
                                {business}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <CardBody className="p-6">
                      <div className="flex items-center gap-4">
                        <AlertCircle className="w-12 h-12 text-indigo-500" />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                            AI Önerisi
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            Performansını artırmak için sabah saatlerinde daha aktif olmayı dene! 
                            Özellikle 9-12 arası en verimli olduğun saatler. ☕
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AITrainerPage









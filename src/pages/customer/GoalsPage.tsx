import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Progress, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem } from '@nextui-org/react'
import { Target, TrendingUp, Calendar, Award, CheckCircle, Plus, Edit2, Trash2, Star, Flame, MessageSquare, Trophy } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

interface Goal {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'custom'
  target: number
  current: number
  icon: string
  color: string
  gradient: string
  reward: number
  deadline: string
  completed: boolean
}

function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Günlük Yorum Hedefi',
      description: 'Bugün 5 yorum yap',
      type: 'daily',
      target: 5,
      current: 3,
      icon: '💬',
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-500',
      reward: 50,
      deadline: 'Bugün 23:59',
      completed: false
    },
    {
      id: '2',
      title: 'Haftalık Rozet Avı',
      description: 'Bu hafta 3 yeni rozet kazan',
      type: 'weekly',
      target: 3,
      current: 2,
      icon: '🏆',
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-pink-500',
      reward: 150,
      deadline: 'Pazar 23:59',
      completed: false
    },
    {
      id: '3',
      title: 'Aylık Puan Hedefi',
      description: 'Bu ay 1000 puan kazan',
      type: 'monthly',
      target: 1000,
      current: 750,
      icon: '⭐',
      color: '#F59E0B',
      gradient: 'from-yellow-500 to-orange-500',
      reward: 500,
      deadline: '30 Ekim',
      completed: false
    },
    {
      id: '4',
      title: 'Seri Koruyucu',
      description: '7 gün üst üste yorum yap',
      type: 'custom',
      target: 7,
      current: 7,
      icon: '🔥',
      color: '#EF4444',
      gradient: 'from-red-500 to-orange-500',
      reward: 200,
      deadline: 'Devam ediyor',
      completed: true
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'daily' as Goal['type'],
    target: 5,
    icon: '🎯',
    reward: 50
  })

  const completedGoals = goals.filter(g => g.completed).length
  const totalGoals = goals.length
  const totalRewards = goals.filter(g => g.completed).reduce((sum, g) => sum + g.reward, 0)

  const getTypeLabel = (type: Goal['type']) => {
    const labels = {
      daily: 'Günlük',
      weekly: 'Haftalık',
      monthly: 'Aylık',
      custom: 'Özel'
    }
    return labels[type]
  }

  const getTypeColor = (type: Goal['type']) => {
    const colors = {
      daily: 'primary',
      weekly: 'secondary',
      monthly: 'warning',
      custom: 'success'
    }
    return colors[type] as any
  }

  const handleAddGoal = () => {
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      target: newGoal.target,
      current: 0,
      icon: newGoal.icon,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-pink-500',
      reward: newGoal.reward,
      deadline: 'Devam ediyor',
      completed: false
    }
    setGoals([...goals, goal])
    setIsModalOpen(false)
    setNewGoal({
      title: '',
      description: '',
      type: 'daily',
      target: 5,
      icon: '🎯',
      reward: 50
    })
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🎯 Hedeflerim" 
          subtitle="Hedeflerini belirle, ilerlemeni takip et, ödüllerini kazan"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Tamamlanan</p>
                        <p className="text-4xl font-bold">{completedGoals}/{totalGoals}</p>
                        <p className="text-sm">Hedef</p>
                      </div>
                      <Target className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Kazanılan Ödül</p>
                        <p className="text-4xl font-bold">{totalRewards}</p>
                        <p className="text-sm">Puan</p>
                      </div>
                      <Award className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Başarı Oranı</p>
                        <p className="text-4xl font-bold">
                          {totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%
                        </p>
                        <p className="text-sm">Başarı</p>
                      </div>
                      <TrendingUp className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Add Goal Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Aktif Hedefler
              </h2>
              <Button
                color="primary"
                startContent={<Plus className="w-5 h-5" />}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
                onPress={() => setIsModalOpen(true)}
              >
                Yeni Hedef
              </Button>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`relative overflow-hidden ${goal.completed ? 'border-2 border-green-500' : ''}`}>
                      <CardBody className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${goal.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>
                              {goal.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                {goal.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {goal.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Chip size="sm" color={getTypeColor(goal.type)} variant="flat">
                              {getTypeLabel(goal.type)}
                            </Chip>
                            {!goal.completed && (
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="danger"
                                onPress={() => handleDeleteGoal(goal.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              İlerleme
                            </span>
                            <span className="text-sm font-bold" style={{ color: goal.color }}>
                              {goal.current} / {goal.target}
                            </span>
                          </div>
                          <Progress
                            value={(goal.current / goal.target) * 100}
                            className="h-3"
                            classNames={{
                              indicator: `bg-gradient-to-r ${goal.gradient}`
                            }}
                          />
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{goal.deadline}</span>
                          </div>
                          <Chip
                            size="sm"
                            className={`bg-gradient-to-r ${goal.gradient} text-white font-bold`}
                            startContent={<Star className="w-3 h-3" />}
                          >
                            +{goal.reward} puan
                          </Chip>
                        </div>

                        {/* Completed Badge */}
                        {goal.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4"
                          >
                            <div className="bg-green-500 rounded-full p-2">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          </motion.div>
                        )}
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Suggested Goals */}
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📌 Önerilen Hedefler
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                        Sosyal Kelebek
                      </h4>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                      10 farklı işletmeye yorum yap
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                      +100 puan ödül
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center space-x-3 mb-2">
                      <Trophy className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                        Rozet Avcısı
                      </h4>
                    </div>
                    <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                      5 yeni rozet kazan
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">
                      +250 puan ödül
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center space-x-3 mb-2">
                      <Flame className="w-5 h-5 text-orange-600" />
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                        Ateş Gibi
                      </h4>
                    </div>
                    <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                      14 gün seriyi devam ettir
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-bold">
                      +500 puan ödül
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>

      {/* Add Goal Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="2xl"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Yeni Hedef Ekle
            </h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Hedef Başlığı"
                placeholder="Örn: Günlük Yorum Hedefi"
                value={newGoal.title}
                onValueChange={(value) => setNewGoal({ ...newGoal, title: value })}
              />
              
              <Input
                label="Açıklama"
                placeholder="Örn: Bugün 5 yorum yap"
                value={newGoal.description}
                onValueChange={(value) => setNewGoal({ ...newGoal, description: value })}
              />

              <Select
                label="Hedef Tipi"
                selectedKeys={[newGoal.type]}
                onSelectionChange={(keys) => setNewGoal({ ...newGoal, type: Array.from(keys)[0] as Goal['type'] })}
              >
                <SelectItem key="daily" value="daily">Günlük</SelectItem>
                <SelectItem key="weekly" value="weekly">Haftalık</SelectItem>
                <SelectItem key="monthly" value="monthly">Aylık</SelectItem>
                <SelectItem key="custom" value="custom">Özel</SelectItem>
              </Select>

              <Input
                type="number"
                label="Hedef Sayısı"
                placeholder="5"
                value={newGoal.target.toString()}
                onValueChange={(value) => setNewGoal({ ...newGoal, target: parseInt(value) || 5 })}
              />

              <Input
                label="İkon (Emoji)"
                placeholder="🎯"
                value={newGoal.icon}
                onValueChange={(value) => setNewGoal({ ...newGoal, icon: value })}
              />

              <Input
                type="number"
                label="Ödül Puanı"
                placeholder="50"
                value={newGoal.reward.toString()}
                onValueChange={(value) => setNewGoal({ ...newGoal, reward: parseInt(value) || 50 })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="danger" 
              variant="light" 
              onPress={() => setIsModalOpen(false)}
            >
              İptal
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              onPress={handleAddGoal}
              isDisabled={!newGoal.title || !newGoal.description}
            >
              Hedef Ekle
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default GoalsPage




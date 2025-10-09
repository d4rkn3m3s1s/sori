import { useState } from 'react'
import { Card, CardBody, Button, Progress, Chip, Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { Target, Clock, Gift, Trophy, CheckCircle, Calendar } from 'lucide-react'

interface BadgeQuest {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  reward: {
    badge?: string
    points: number
    items?: string[]
  }
  progress: {
    current: number
    required: number
  }
  timeLeft: number // dakika cinsinden
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
  completed: boolean
  requirements: string[]
}

interface BadgeQuestsProps {
  quests: BadgeQuest[]
  onQuestComplete: (questId: string) => void
}

function BadgeQuests({ quests, onQuestComplete }: BadgeQuestsProps) {
  const [selectedQuest, setSelectedQuest] = useState<BadgeQuest | null>(null)
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'special'>('daily')

  const questTypes = [
    { key: 'daily', label: 'Günlük', icon: '📅', color: 'bg-green-500' },
    { key: 'weekly', label: 'Haftalık', icon: '📊', color: 'bg-blue-500' },
    { key: 'monthly', label: 'Aylık', icon: '🗓️', color: 'bg-purple-500' },
    { key: 'special', label: 'Özel', icon: '⭐', color: 'bg-orange-500' }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'warning'
      case 'hard': return 'danger'
      case 'legendary': return 'secondary'
      default: return 'default'
    }
  }

  const formatTimeLeft = (minutes: number) => {
    if (minutes < 60) return `${minutes}dk`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}sa`
    return `${Math.floor(minutes / 1440)}g`
  }

  const filteredQuests = quests.filter(quest => quest.type === activeTab)

  const mockQuests: BadgeQuest[] = [
    {
      id: 'daily-1',
      title: '3 Yorum Yap',
      description: 'Bugün 3 farklı mekana yorum bırak',
      type: 'daily',
      reward: { points: 50 },
      progress: { current: 1, required: 3 },
      timeLeft: 480, // 8 saat
      difficulty: 'easy',
      completed: false,
      requirements: ['3 farklı mekan', 'Minimum 10 kelime', 'Pozitif değerlendirme']
    },
    {
      id: 'weekly-1',
      title: 'Kahve Uzmanı',
      description: 'Bu hafta 5 farklı kahve mekanına git',
      type: 'weekly',
      reward: { 
        badge: 'coffee-expert',
        points: 200,
        items: ['coffee-frame']
      },
      progress: { current: 2, required: 5 },
      timeLeft: 2880, // 2 gün
      difficulty: 'medium',
      completed: false,
      requirements: ['5 farklı kahve mekanı', 'Her birine yorum', 'Fotoğraf paylaş']
    },
    {
      id: 'monthly-1',
      title: 'Şehir Kaşifi',
      description: 'Bu ay 20 farklı mekana git',
      type: 'monthly',
      reward: {
        badge: 'city-explorer',
        points: 1000,
        items: ['explorer-frame', 'city-background']
      },
      progress: { current: 8, required: 20 },
      timeLeft: 10080, // 7 gün
      difficulty: 'hard',
      completed: false,
      requirements: ['20 farklı mekan', 'Her birine yorum', '5 farklı kategori']
    },
    {
      id: 'special-1',
      title: 'DRACARYS Challenge',
      description: 'Ejder ateşi gibi yakıcı 10 yorum yap',
      type: 'special',
      reward: {
        badge: 'dracarys-master',
        points: 800,
        items: ['fire-effect', 'dragon-frame']
      },
      progress: { current: 3, required: 10 },
      timeLeft: 4320, // 3 gün
      difficulty: 'legendary',
      completed: false,
      requirements: ['10 etkileyici yorum', 'Minimum 50 kelime', '5+ beğeni al']
    }
  ]

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rozet Görevleri</h2>
          <p className="text-gray-500">Görevleri tamamla, özel rozetler kazan!</p>
        </div>
      </div>

      {/* Tab Seçimi */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {questTypes.map((type) => (
          <Button
            key={type.key}
            variant={activeTab === type.key ? 'solid' : 'bordered'}
            color={activeTab === type.key ? 'primary' : 'default'}
            onClick={() => setActiveTab(type.key as any)}
            startContent={<span>{type.icon}</span>}
            className="flex-shrink-0"
          >
            {type.label}
          </Button>
        ))}
      </div>

      {/* Görev Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockQuests.filter(quest => quest.type === activeTab).map((quest, index) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
              quest.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''
            }`}>
              <CardBody className="p-6">
                {/* Başlık ve Zorluk */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{quest.title}</h3>
                      {quest.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{quest.description}</p>
                  </div>
                  
                  <Chip 
                    color={getDifficultyColor(quest.difficulty)} 
                    size="sm"
                    className="capitalize"
                  >
                    {quest.difficulty}
                  </Chip>
                </div>

                {/* İlerleme */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">İlerleme</span>
                    <span className="text-sm text-gray-500">
                      {quest.progress.current} / {quest.progress.required}
                    </span>
                  </div>
                  <Progress 
                    value={(quest.progress.current / quest.progress.required) * 100}
                    className="h-2"
                    classNames={{
                      indicator: quest.completed 
                        ? "bg-green-500" 
                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }}
                  />
                </div>

                {/* Kalan Süre */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Kalan: {formatTimeLeft(quest.timeLeft)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm font-medium text-purple-600">
                    <Gift className="w-4 h-4" />
                    <span>+{quest.reward.points}p</span>
                  </div>
                </div>

                {/* Butonlar */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="bordered"
                    onClick={() => setSelectedQuest(quest)}
                    className="flex-1"
                  >
                    Detaylar
                  </Button>
                  
                  {quest.completed ? (
                    <Button
                      size="sm"
                      color="success"
                      disabled
                      startContent={<CheckCircle className="w-4 h-4" />}
                    >
                      Tamamlandı
                    </Button>
                  ) : quest.progress.current >= quest.progress.required ? (
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => onQuestComplete(quest.id)}
                      startContent={<Trophy className="w-4 h-4" />}
                    >
                      Tamamla
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      color="primary"
                      variant="bordered"
                    >
                      Devam Et
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Görev Detay Modal */}
      <Modal 
        isOpen={!!selectedQuest} 
        onClose={() => setSelectedQuest(null)}
        size="lg"
      >
        <ModalContent>
          {selectedQuest && (
            <>
              <ModalHeader>
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-purple-500" />
                  <div>
                    <h3 className="text-xl font-bold">{selectedQuest.title}</h3>
                    <p className="text-sm text-gray-500">{selectedQuest.description}</p>
                  </div>
                </div>
              </ModalHeader>
              
              <ModalBody className="pb-6">
                {/* İlerleme */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">İlerleme Durumu</span>
                    <span className="text-sm text-gray-500">
                      {selectedQuest.progress.current} / {selectedQuest.progress.required}
                    </span>
                  </div>
                  <Progress 
                    value={(selectedQuest.progress.current / selectedQuest.progress.required) * 100}
                    className="h-3"
                  />
                </div>

                {/* Gereksinimler */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Gereksinimler:</h4>
                  <div className="space-y-2">
                    {selectedQuest.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ödüller */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-purple-500" />
                    <span>Ödüller</span>
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">💰</span>
                      <span>{selectedQuest.reward.points} Puan</span>
                    </div>
                    
                    {selectedQuest.reward.badge && (
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🏆</span>
                        <span>Özel Rozet</span>
                      </div>
                    )}
                    
                    {selectedQuest.reward.items && (
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🎁</span>
                        <span>{selectedQuest.reward.items.length} Özel Eşya</span>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default BadgeQuests

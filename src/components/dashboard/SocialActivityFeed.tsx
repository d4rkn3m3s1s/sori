import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Avatar, Button, Chip } from '@nextui-org/react'
import { 
  Heart, MessageCircle, Share2, Trophy, Star,
  ThumbsUp, MapPin, Clock, Award, Flame, Crown
} from 'lucide-react'

interface Activity {
  id: string
  user: {
    name: string
    avatar: string
    level: number
    badge?: string
  }
  type: 'comment' | 'badge' | 'achievement' | 'review'
  action: string
  business?: string
  location?: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
  image?: string
  rating?: number
  badgeIcon?: string
  badgeRarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

function SocialActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      user: {
        name: 'Ayşe K.',
        avatar: 'https://i.pravatar.cc/150?u=ayse',
        level: 12,
        badge: '🏆'
      },
      type: 'badge',
      action: 'DRACARYS rozetini kazandı!',
      timestamp: '2 dakika önce',
      likes: 24,
      comments: 5,
      isLiked: false,
      badgeIcon: '🐉',
      badgeRarity: 'legendary'
    },
    {
      id: '2',
      user: {
        name: 'Mehmet Y.',
        avatar: 'https://i.pravatar.cc/150?u=mehmet',
        level: 8,
      },
      type: 'review',
      action: 'harika bir yorum yaptı',
      business: 'Starbucks Kadıköy',
      location: 'Kadıköy, İstanbul',
      timestamp: '15 dakika önce',
      likes: 12,
      comments: 3,
      isLiked: true,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      user: {
        name: 'Zeynep A.',
        avatar: 'https://i.pravatar.cc/150?u=zeynep',
        level: 15,
        badge: '👑'
      },
      type: 'achievement',
      action: '7 günlük seriyi tamamladı!',
      timestamp: '1 saat önce',
      likes: 45,
      comments: 8,
      isLiked: false,
    },
    {
      id: '4',
      user: {
        name: 'Can D.',
        avatar: 'https://i.pravatar.cc/150?u=can',
        level: 5,
      },
      type: 'comment',
      action: 'yorum yaptı',
      business: "McDonald's Bağdat Cad.",
      location: 'Kadıköy, İstanbul',
      timestamp: '3 saat önce',
      likes: 8,
      comments: 2,
      isLiked: false,
      rating: 4
    },
  ])

  const handleLike = (id: string) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id
          ? {
              ...activity,
              isLiked: !activity.isLiked,
              likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1
            }
          : activity
      )
    )
  }

  const getBadgeRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-500 to-pink-500'
      case 'rare': return 'from-blue-500 to-cyan-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'badge': return Trophy
      case 'achievement': return Award
      case 'review': return Star
      case 'comment': return MessageCircle
      default: return MessageCircle
    }
  }

  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Topluluk Akışı
          </h3>
          <Button size="sm" variant="flat" color="primary">
            Filtrele
          </Button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const ActionIcon = getActionIcon(activity.type)

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardBody className="p-4">
                    {/* Header */}
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="relative">
                        <Avatar
                          src={activity.user.avatar}
                          className="w-12 h-12"
                        />
                        {activity.user.badge && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                            <span className="text-xs">{activity.user.badge}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {activity.user.name}
                          </h4>
                          <Chip size="sm" variant="flat" color="secondary">
                            Lv {activity.user.level}
                          </Chip>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <ActionIcon className="w-4 h-4" />
                          <span>{activity.action}</span>
                        </div>
                        {activity.business && (
                          <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{activity.business}</span>
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge Content */}
                    {activity.type === 'badge' && activity.badgeIcon && (
                      <div className={`p-4 rounded-lg bg-gradient-to-br ${getBadgeRarityColor(activity.badgeRarity)} mb-3`}>
                        <div className="flex items-center justify-center space-x-4 text-white">
                          <div className="text-6xl">{activity.badgeIcon}</div>
                          <div>
                            <p className="text-2xl font-bold">DRACARYS</p>
                            <Chip size="sm" className="bg-white/20 text-white capitalize">
                              {activity.badgeRarity}
                            </Chip>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Review Content */}
                    {activity.type === 'review' && activity.image && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img
                          src={activity.image}
                          alt="Review"
                          className="w-full h-48 object-cover"
                        />
                        {activity.rating && (
                          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < activity.rating!
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-400'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Achievement Content */}
                    {activity.type === 'achievement' && (
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg mb-3 flex items-center justify-center space-x-3">
                        <Flame className="w-12 h-12 text-orange-500 animate-pulse" />
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            7 Günlük Seri! 🔥
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            +200 puan kazandı
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        size="sm"
                        variant="flat"
                        color={activity.isLiked ? 'danger' : 'default'}
                        startContent={
                          activity.isLiked ? (
                            <Heart className="w-4 h-4 fill-current" />
                          ) : (
                            <Heart className="w-4 h-4" />
                          )
                        }
                        onPress={() => handleLike(activity.id)}
                      >
                        {activity.likes}
                      </Button>

                      <Button
                        size="sm"
                        variant="flat"
                        startContent={<MessageCircle className="w-4 h-4" />}
                      >
                        {activity.comments}
                      </Button>

                      <Button
                        size="sm"
                        variant="flat"
                        startContent={<Share2 className="w-4 h-4" />}
                      >
                        Paylaş
                      </Button>

                      <div className="flex-1" />

                      {activity.type === 'badge' && (
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                        >
                          Nasıl Kazanılır?
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Load More */}
        <Button
          variant="flat"
          color="primary"
          className="w-full mt-4"
        >
          Daha Fazla Yükle
        </Button>
      </CardBody>
    </Card>
  )
}

export default SocialActivityFeed


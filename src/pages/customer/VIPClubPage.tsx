import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip, Progress, Avatar, Divider } from '@nextui-org/react'
import { 
  Crown, Star, Sparkles, Gift, Zap, Trophy, Award, Heart,
  TrendingUp, Target, Calendar, Lock, Unlock, ArrowLeft, Check,
  Diamond, Gem, Shield, Flame
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useNavigate } from 'react-router-dom'

interface VIPTier {
  id: string
  name: string
  icon: string
  color: string
  gradient: string
  requiredPoints: number
  benefits: string[]
  discount: number
  priority: boolean
  exclusiveAccess: boolean
}

interface VIPBenefit {
  id: string
  icon: any
  title: string
  description: string
  isUnlocked: boolean
  tier: string
}

function VIPClubPage() {
  const navigate = useNavigate()
  const [userPoints, setUserPoints] = useState(2500)
  const [currentTier, setCurrentTier] = useState('gold')

  const vipTiers: VIPTier[] = [
    {
      id: 'bronze',
      name: 'Bronz Üye',
      icon: '🥉',
      color: 'orange-600',
      gradient: 'from-orange-400 to-orange-600',
      requiredPoints: 0,
      benefits: ['%5 indirim', 'Aylık 1 ücretsiz ödül', 'Özel rozetler'],
      discount: 5,
      priority: false,
      exclusiveAccess: false
    },
    {
      id: 'silver',
      name: 'Gümüş Üye',
      icon: '🥈',
      color: 'gray-400',
      gradient: 'from-gray-300 to-gray-500',
      requiredPoints: 1000,
      benefits: ['%10 indirim', 'Aylık 2 ücretsiz ödül', 'Öncelikli destek', 'Özel rozetler'],
      discount: 10,
      priority: true,
      exclusiveAccess: false
    },
    {
      id: 'gold',
      name: 'Altın Üye',
      icon: '🥇',
      color: 'yellow-500',
      gradient: 'from-yellow-400 to-yellow-600',
      requiredPoints: 2500,
      benefits: ['%15 indirim', 'Aylık 3 ücretsiz ödül', 'VIP etkinlikler', 'Öncelikli destek', 'Özel rozetler'],
      discount: 15,
      priority: true,
      exclusiveAccess: true
    },
    {
      id: 'platinum',
      name: 'Platin Üye',
      icon: '💎',
      color: 'purple-500',
      gradient: 'from-purple-400 to-purple-600',
      requiredPoints: 5000,
      benefits: ['%20 indirim', 'Aylık 5 ücretsiz ödül', 'VIP etkinlikler', 'Öncelikli destek', 'Özel rozetler', 'Sınırsız erişim'],
      discount: 20,
      priority: true,
      exclusiveAccess: true
    },
    {
      id: 'diamond',
      name: 'Elmas Üye',
      icon: '💠',
      color: 'cyan-500',
      gradient: 'from-cyan-400 to-blue-600',
      requiredPoints: 10000,
      benefits: ['%25 indirim', 'Aylık 10 ücretsiz ödül', 'VIP etkinlikler', 'Öncelikli destek', 'Özel rozetler', 'Sınırsız erişim', 'Kişisel danışman'],
      discount: 25,
      priority: true,
      exclusiveAccess: true
    }
  ]

  const vipBenefits: VIPBenefit[] = [
    {
      id: '1',
      icon: Gift,
      title: 'Özel Ödüller',
      description: 'VIP üyelere özel ödül seçenekleri',
      isUnlocked: true,
      tier: 'bronze'
    },
    {
      id: '2',
      icon: Sparkles,
      title: 'Premium Rozetler',
      description: 'Sadece VIP üyelerin kazanabileceği özel rozetler',
      isUnlocked: true,
      tier: 'silver'
    },
    {
      id: '3',
      icon: Zap,
      title: 'Hızlı Destek',
      description: 'Öncelikli müşteri desteği',
      isUnlocked: true,
      tier: 'gold'
    },
    {
      id: '4',
      icon: Calendar,
      title: 'VIP Etkinlikler',
      description: 'Özel etkinliklere davet',
      isUnlocked: true,
      tier: 'gold'
    },
    {
      id: '5',
      icon: Trophy,
      title: 'Bonus Puanlar',
      description: 'Her işlemde ekstra %50 puan',
      isUnlocked: false,
      tier: 'platinum'
    },
    {
      id: '6',
      icon: Shield,
      title: 'Sınırsız Erişim',
      description: 'Tüm özelliklere sınırsız erişim',
      isUnlocked: false,
      tier: 'platinum'
    },
    {
      id: '7',
      icon: Heart,
      title: 'Kişisel Danışman',
      description: 'Size özel kişisel danışman',
      isUnlocked: false,
      tier: 'diamond'
    },
    {
      id: '8',
      icon: Diamond,
      title: 'Elmas Rozetleri',
      description: 'En nadir ve değerli rozetler',
      isUnlocked: false,
      tier: 'diamond'
    }
  ]

  const getCurrentTierIndex = () => {
    return vipTiers.findIndex(tier => tier.id === currentTier)
  }

  const getNextTier = () => {
    const currentIndex = getCurrentTierIndex()
    return currentIndex < vipTiers.length - 1 ? vipTiers[currentIndex + 1] : null
  }

  const getProgressToNextTier = () => {
    const nextTier = getNextTier()
    if (!nextTier) return 100

    const currentTierPoints = vipTiers[getCurrentTierIndex()].requiredPoints
    const nextTierPoints = nextTier.requiredPoints
    const progress = ((userPoints - currentTierPoints) / (nextTierPoints - currentTierPoints)) * 100

    return Math.min(Math.max(progress, 0), 100)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="💎 VIP Kulübü" 
          subtitle="Premium özellikler ve özel ayrıcalıklar"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
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

            {/* VIP Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={`bg-gradient-to-br ${vipTiers[getCurrentTierIndex()].gradient} relative overflow-hidden`}>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                
                <CardBody className="p-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-white">
                    {/* Icon */}
                    <div className="text-8xl animate-bounce">
                      {vipTiers[getCurrentTierIndex()].icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                      <Chip size="lg" className="bg-white/20 text-white font-bold mb-3">
                        <Crown className="w-4 h-4 mr-1" />
                        VIP Üye
                      </Chip>
                      <h2 className="text-4xl font-bold mb-2">
                        {vipTiers[getCurrentTierIndex()].name}
                      </h2>
                      <p className="text-xl opacity-90 mb-4">
                        Toplam Puanınız: {userPoints.toLocaleString()} ⭐
                      </p>
                      
                      {getNextTier() && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Sonraki Seviye: {getNextTier()!.name}</span>
                            <span>{getNextTier()!.requiredPoints - userPoints} puan kaldı</span>
                          </div>
                          <Progress
                            value={getProgressToNextTier()}
                            className="h-3"
                            classNames={{
                              indicator: "bg-white"
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Benefits Preview */}
                    <div className="bg-white/10 backdrop-blur rounded-xl p-6 min-w-[250px]">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Ayrıcalıklarınız
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">İndirim Oranı</span>
                          <Chip size="sm" className="bg-white/20 text-white font-bold">
                            %{vipTiers[getCurrentTierIndex()].discount}
                          </Chip>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Öncelikli Destek</span>
                          {vipTiers[getCurrentTierIndex()].priority ? 
                            <Check className="w-5 h-5 text-white" /> : 
                            <Lock className="w-5 h-5 opacity-50" />
                          }
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">VIP Etkinlikler</span>
                          {vipTiers[getCurrentTierIndex()].exclusiveAccess ? 
                            <Check className="w-5 h-5 text-white" /> : 
                            <Lock className="w-5 h-5 opacity-50" />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* VIP Tiers */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                VIP Seviyeleri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {vipTiers.map((tier, index) => {
                  const isCurrentTier = tier.id === currentTier
                  const isUnlocked = userPoints >= tier.requiredPoints
                  
                  return (
                    <motion.div
                      key={tier.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`relative overflow-hidden ${
                          isCurrentTier ? 'border-4 border-yellow-500 shadow-2xl' : ''
                        } ${!isUnlocked ? 'opacity-60' : ''}`}
                      >
                        {isCurrentTier && (
                          <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-white text-xs font-bold py-1 px-2 text-center">
                            MEVCUT SEVİYE
                          </div>
                        )}
                        
                        <CardBody className="p-6 text-center">
                          <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center text-3xl`}>
                            {tier.icon}
                          </div>
                          
                          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                            {tier.name}
                          </h3>
                          
                          <Chip size="sm" variant="flat" className="mb-3">
                            {tier.requiredPoints.toLocaleString()} puan
                          </Chip>

                          <Divider className="my-3" />

                          <div className="space-y-2 text-left">
                            {tier.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs">
                                {isUnlocked ? 
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> :
                                  <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                }
                                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                              </div>
                            ))}
                          </div>

                          {!isUnlocked && (
                            <Button
                              size="sm"
                              color="warning"
                              variant="flat"
                              className="mt-4 w-full"
                              startContent={<Target className="w-4 h-4" />}
                            >
                              Kilidi Aç
                            </Button>
                          )}
                        </CardBody>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* VIP Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Gem className="w-6 h-6 text-purple-500" />
                Premium Özellikler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {vipBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`h-full ${!benefit.isUnlocked ? 'opacity-60' : ''}`}>
                      <CardBody className="p-6">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-4 ${
                          benefit.isUnlocked ? '' : 'grayscale'
                        }`}>
                          <benefit.icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {benefit.title}
                          </h3>
                          {benefit.isUnlocked ? 
                            <Unlock className="w-4 h-4 text-green-500" /> :
                            <Lock className="w-4 h-4 text-gray-400" />
                          }
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {benefit.description}
                        </p>
                        
                        <Chip size="sm" variant="flat" color={benefit.isUnlocked ? 'success' : 'default'}>
                          {benefit.tier.toUpperCase()}
                        </Chip>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Special Offers */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="w-6 h-6 text-orange-500" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        VIP Özel Teklif!
                      </h2>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Bu ay VIP üyelerimize özel! Tüm ödüllerde ekstra %30 indirim!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Chip color="warning" variant="solid">Sadece VIP</Chip>
                      <Chip color="danger" variant="solid">Sınırlı Süre</Chip>
                      <Chip color="success" variant="solid">%30 İndirim</Chip>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    color="warning"
                    className="font-bold"
                    startContent={<Gift className="w-5 h-5" />}
                    onClick={() => navigate('/customer/reward-store')}
                  >
                    Tekliften Yararlan
                  </Button>
                </div>
              </CardBody>
            </Card>

          </div>
        </main>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  )
}

export default VIPClubPage


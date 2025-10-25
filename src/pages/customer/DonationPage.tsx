import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Divider } from '@nextui-org/react'
import { 
  Droplet, Heart, TreePine, Award, Star, TrendingUp, Trophy,
  ArrowLeft, Sparkles, Check, Gift, Users, Target, PartyPopper,
  MessageCircle, ThumbsUp, Crown
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import MultiGrowthSystem from '../../components/donation/MultiGrowthSystem'
import { getRandomSlogan, SSP_SLOGANS } from '../../data/socialResponsibility'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'

interface Donation {
  id: string
  title: string
  description: string
  icon: any
  emoji: string
  color: string
  gradient: string
  pointCost: number
  realValue: string
  impact: string
  donated: number
  goal: number
  categories: string[]
}

function DonationPage() {
  const navigate = useNavigate()
  const [userPoints, setUserPoints] = useState(25000) // Kullanıcının toplam puanı
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)
  const [donationAmount, setDonationAmount] = useState(1)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [totalDonated, setTotalDonated] = useState(0)
  const [showDonationAnimation, setShowDonationAnimation] = useState(false)
  const [donationMessage, setDonationMessage] = useState('')
  const [hearts, setHearts] = useState<Array<{id: number, x: number, y: number}>>([])
  const [currentSlogan, setCurrentSlogan] = useState(getRandomSlogan())

  // Rotating slogan effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan(getRandomSlogan())
    }, 5000) // Her 5 saniyede bir slogan değiştir

    return () => clearInterval(interval)
  }, [])

  const [myDonations, setMyDonations] = useState<Array<{
    id: string
    type: string
    emoji: string
    amount: number
    points: number
    date: string
    status: string
    certificate: boolean
  }>>([
    {
      id: '1',
      type: 'Su Bağışı',
      emoji: '💧',
      amount: 2,
      points: 10000,
      date: '5 Ocak 2025',
      status: 'Tamamlandı',
      certificate: true
    },
    {
      id: '2',
      type: 'Mama Bağışı',
      emoji: '🐾',
      amount: 3,
      points: 9000,
      date: '3 Ocak 2025',
      status: 'Tamamlandı',
      certificate: true
    },
    {
      id: '3',
      type: 'Fidan Bağışı',
      emoji: '🌳',
      amount: 5,
      points: 12500,
      date: '28 Aralık 2024',
      status: 'Tamamlandı',
      certificate: true
    }
  ])

  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)

  const donations: Donation[] = [
    {
      id: 'water',
      title: '💧 50 Damla - 1 Su Bağışı',
      description: 'Bir damla da senden olsun. Birike birike bir hayat olsun. 💙',
      icon: Droplet,
      emoji: '💧',
      color: 'blue',
      gradient: 'from-blue-400 via-cyan-400 to-blue-500',
      pointCost: 5000,
      realValue: '1 kişinin 1 aylık su ihtiyacı',
      impact: 'Bir damla daha hayat oldu! Bir aile 30 gün temiz suya kavuşur 💙',
      donated: 847,
      goal: 1000,
      categories: ['50 Damla', 'Temel İhtiyaç', 'Popüler']
    },
    {
      id: 'animal-food',
      title: '🐾 30 Pati - 1 Mama Bağışı',
      description: 'Sevgi paylaştıkça çoğalır, patiler paylaştıkça doyar. Bir pati kadar iyiliğin olsun! 🐱🐶',
      icon: Heart,
      emoji: '🐾',
      color: 'pink',
      gradient: 'from-pink-400 via-rose-400 to-red-500',
      pointCost: 3000,
      realValue: '10 kg kedi/köpek maması',
      impact: 'Bir dostun karnı seninle doydu! Minik dostların seni bekliyor 🐱🐶',
      donated: 1243,
      goal: 2000,
      categories: ['30 Pati', 'Hayvan Hakları', 'Favori']
    },
    {
      id: 'tree',
      title: '🌳 20 Tohum - 1 Fidan Bağışı',
      description: 'Sabırla büyüyen iyilik fidan olur. Bir yorumla toprağa nefes ver. Bir tohum büyük bir ormana dönüşebilir! 🌱',
      icon: TreePine,
      emoji: '🌳',
      color: 'green',
      gradient: 'from-green-400 via-emerald-400 to-teal-500',
      pointCost: 2500,
      realValue: '5 adet meyve fidanı',
      impact: 'Senin katkınla 1 fidan dikildi! Yılda 100 kg CO2 emilimi 🌍',
      donated: 2156,
      goal: 5000,
      categories: ['20 Tohum', 'Çevre', 'Trend']
    },
    {
      id: 'education',
      title: '✏️ 15 Kalem - 1 Eğitim Bağışı',
      description: 'Bir kalem, bin hayal. Kutundan çıkan iyilik, bir çocuğun geleceğini yazar! 📚',
      icon: Gift,
      emoji: '✏️',
      color: 'purple',
      gradient: 'from-purple-400 via-violet-400 to-indigo-500',
      pointCost: 4000,
      realValue: 'Tam set okul malzemesi',
      impact: 'Bir çocuğun kalemi seninle yazdı! 1 öğrenci tüm yıl eğitime devam eder 🎓',
      donated: 567,
      goal: 1000,
      categories: ['15 Kalem', 'Eğitim', 'Özel'],
    }
  ]

  const handleDonate = () => {
    if (!selectedDonation) return
    
    const totalCost = selectedDonation.pointCost * donationAmount
    
    if (totalCost > userPoints) {
      alert('Yetersiz puan! Daha fazla puan kazanmak için aktivitelere katılın.')
      return
    }

    // Animasyonu göster
    setShowDonationAnimation(true)
    
    // Mesajları sırayla göster
    const messages = [
      '💝 Bağışınız hazırlanıyor...',
      '✨ Puanlarınız dönüştürülüyor...',
      '🌟 İyilik yolculuğu başlıyor...',
      '🎉 Bağışınız tamamlandı!'
    ]
    
    let messageIndex = 0
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setDonationMessage(messages[messageIndex])
        messageIndex++
      } else {
        clearInterval(messageInterval)
      }
    }, 800)

    // Kalpler animasyonu
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        setHearts(prev => [...prev, {
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight
        }])
      }, i * 100)
    }

    // Konfeti patlatma - çoklu
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.3, y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
      })
    }, 500)

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.7, y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
      })
    }, 700)

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
      })
    }, 1000)

    // 3 saniye sonra işlemi tamamla
    setTimeout(() => {
      // Puanları düş
      setUserPoints(userPoints - totalCost)
      setTotalDonated(totalDonated + totalCost)
      
      // Yeni bağışı my donations'a ekle
      const newDonation = {
        id: Date.now().toString(),
        type: selectedDonation.title,
        emoji: selectedDonation.emoji,
        amount: donationAmount,
        points: totalCost,
        date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'Tamamlandı',
        certificate: true
      }
      setMyDonations(prev => [newDonation, ...prev])

      // Animasyonu gizle
      setShowDonationAnimation(false)
      setHearts([])
      
      // Başarı modalını göster
      setShowSuccessModal(true)
    }, 3500)
  }

  // Kalpler animasyonunu temizle
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => prev.filter(heart => Date.now() - heart.id < 3000))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      pink: 'bg-pink-500',
      green: 'bg-green-500',
      cyan: 'bg-cyan-500',
      purple: 'bg-purple-500',
      emerald: 'bg-emerald-500'
    }
    return colors[color] || 'bg-gray-500'
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="💝 Sosyal Sorumluluk Bağışları" 
          subtitle="Puanlarınızla dünyayı değiştirin!"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6 relative overflow-hidden">
          {/* Floating Background Animations - Reduced for Performance */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`float-bg-${i}`}
              className="absolute text-3xl pointer-events-none opacity-10"
              style={{
                left: `${(i + 1) * 20}%`,
                top: `${(i * 25)}%`,
                willChange: 'transform',
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {['🌱', '💧', '🐾', '✏️'][i]}
            </motion.div>
          ))}
          
          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            
            {/* Hero Banner - ULTRA MODERN! */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Card className="relative overflow-hidden border-2 border-white/20 shadow-2xl">
                {/* Animated Gradient Background */}
                <motion.div 
                  className="absolute inset-0 z-0"
                  animate={{
                    background: [
                      'linear-gradient(135deg, #10b981 0%, #059669 50%, #14b8a6 100%)',
                      'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #059669 100%)',
                      'linear-gradient(135deg, #059669 0%, #14b8a6 50%, #10b981 100%)',
                      'linear-gradient(135deg, #10b981 0%, #059669 50%, #14b8a6 100%)',
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Floating Orbs */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${150 + i * 50}px`,
                        height: `${150 + i * 50}px`,
                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                        left: `${20 + i * 30}%`,
                        top: `${-20 + i * 10}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 5 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-5 z-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.5) 35px, rgba(255,255,255,0.5) 70px)',
                }} />
                
                <CardBody className="p-6 sm:p-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-6xl md:text-7xl filter drop-shadow-lg"
                      >
                        💝
                      </motion.div>
                      <div className="text-white">
                        <motion.h2 
                          className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-md"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          Küçük bir adım senden, büyük bir etki bizden.
                        </motion.h2>
                        <motion.p 
                          className="text-sm md:text-lg opacity-95 font-medium"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          Her puan, her yorum gerçek bir iyiliğe dönüşür ✨
                        </motion.p>
                      </div>
                    </div>
                    
                    {/* Animated Stats - Enhanced */}
                    <div className="flex gap-4">
                      {[
                        { emoji: '🌳', count: '2,156', label: 'Fidan', color: 'from-green-400 to-emerald-400' },
                        { emoji: '💧', count: '847', label: 'Su', color: 'from-blue-400 to-cyan-400' },
                        { emoji: '🐾', count: '1,243', label: 'Mama', color: 'from-orange-400 to-amber-400' }
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="group relative bg-white/25 hover:bg-white/35 backdrop-blur-md rounded-2xl px-4 py-3 text-center min-w-[85px] cursor-pointer transition-all duration-300 border border-white/30"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                          }}
                          whileHover={{ 
                            scale: 1.08,
                            y: -5,
                          }}
                          transition={{
                            delay: idx * 0.1,
                          }}
                        >
                          {/* Glow effect on hover */}
                          <motion.div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
                          />
                          
                          <motion.div 
                            className="text-3xl mb-1 filter drop-shadow-md"
                            animate={{
                              scale: [1, 1.15, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: idx * 0.4,
                            }}
                          >
                            {stat.emoji}
                          </motion.div>
                          <div className="text-xl font-bold text-white drop-shadow-md">{stat.count}</div>
                          <div className="text-xs font-medium opacity-90 text-white">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
            
            {/* Back Button & SSP Leaderboard */}
            <div className="flex items-center justify-between flex-wrap gap-3">
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

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Button
                  color="success"
                  variant="shadow"
                  startContent={<Trophy className="w-4 h-4" />}
                  onClick={() => navigate('/customer/ssp-leaderboard')}
                >
                  💚 İyilik Liderlik Tablosu
                </Button>
              </motion.div>
            </div>

            {/* Rotating Slogan Banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlogan.text}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-center gap-3 text-white">
                      <div className="text-3xl">{currentSlogan.icon}</div>
                      <h3 className="text-xl md:text-2xl font-bold text-center">
                        {currentSlogan.text}
                      </h3>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* User Stats - ULTRA MODERN! */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <Card className="relative overflow-hidden border-2 border-white/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Animated Gradient Background */}
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)'
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Floating Icon */}
                  <motion.div 
                    className="absolute text-5xl pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.1, 0.2, 0.1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    ⭐
                  </motion.div>

                  <CardBody className="p-6 relative z-10">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90 font-medium mb-1">Kullanılabilir Puan</p>
                        <motion.p 
                          className="text-4xl font-bold drop-shadow-lg"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          {userPoints.toLocaleString()}
                        </motion.p>
                        <p className="text-xs opacity-75 font-medium mt-1">puan</p>
                      </div>
                      <motion.div
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                        whileHover={{
                          scale: 1.15,
                        }}
                      >
                        <Star className="w-8 h-8" />
                      </motion.div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="group"
              >
                <Card className="relative overflow-hidden border-2 border-white/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="absolute text-5xl pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    💚
                  </motion.div>

                  <CardBody className="p-6 relative z-10">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90 font-medium mb-1">Toplam Bağış</p>
                        <motion.p 
                          className="text-4xl font-bold drop-shadow-lg"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5,
                          }}
                        >
                          {totalDonated.toLocaleString()}
                        </motion.p>
                        <p className="text-xs opacity-75 font-medium mt-1">puan</p>
                      </div>
                      <motion.div
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                        whileHover={{
                          scale: 1.15,
                        }}
                      >
                        <Gift className="w-8 h-8" />
                      </motion.div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="group"
              >
                <Card className="relative overflow-hidden border-2 border-white/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="absolute text-5xl pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.1, 0.2, 0.1],
                      rotate: [0, -15, 15, 0]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                    }}
                  >
                    👑
                  </motion.div>

                  <CardBody className="p-6 relative z-10">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90 font-medium mb-1">Etki Seviyesi</p>
                        <motion.p 
                          className="text-3xl font-bold drop-shadow-lg"
                          animate={{
                            scale: [1, 1.08, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                          }}
                        >
                          {totalDonated > 100000 ? '👑 Efsane' :
                           totalDonated > 50000 ? '🦸 Kahraman' :
                           totalDonated > 20000 ? '⭐ Yıldız' :
                           totalDonated > 5000 ? '💪 Destekçi' : '🌱 Başlangıç'}
                        </motion.p>
                      </div>
                      <motion.div
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                        }}
                        whileHover={{
                          scale: 1.15,
                        }}
                      >
                        <Award className="w-8 h-8" />
                      </motion.div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Multi Growth System - Tüm Bağış Türleri İçin Yetiştirme Sistemi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MultiGrowthSystem />
            </motion.div>

            {/* Info Banner - Ultra Modern & Responsive */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="relative overflow-hidden border-2 border-white/20 backdrop-blur-md shadow-2xl">
                {/* Animated Gradient Background */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #14b8a6 100%)',
                      'linear-gradient(135deg, #14b8a6 0%, #3b82f6 50%, #06b6d4 100%)',
                      'linear-gradient(135deg, #06b6d4 0%, #14b8a6 50%, #3b82f6 100%)',
                      'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #14b8a6 100%)',
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                  }}
                />

                <CardBody className="p-5 sm:p-7 md:p-9 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-5 md:gap-7 text-white">
                    <motion.div 
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-white/25 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 border-2 border-white/40"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity
                      }}
                    >
                      <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
                    </motion.div>
                    <div className="flex-1 text-center md:text-left">
                      <motion.h3 
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 flex flex-wrap items-center justify-center md:justify-start gap-2 drop-shadow-md"
                        animate={{
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        <Sparkles className="w-6 h-6 md:w-7 md:h-7" />
                        Puanlarınız Gerçek Değişim Yaratıyor!
                        <Sparkles className="w-6 h-6 md:w-7 md:h-7" />
                      </motion.h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-95 leading-relaxed font-medium mb-4">
                        QR-tex olarak kazandığınız her puan, doğrudan sosyal sorumluluk projelerine dönüşüyor. 
                        Bağışlarınız <span className="font-bold underline decoration-2">%100 şeffaflıkla</span> yerine ulaşıyor ve gerçek etki yaratıyor! 💝
                      </p>
                      <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                        <Chip size="md" className="bg-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/30">
                          <Check className="w-4 h-4 mr-1" />
                          %100 Şeffaf
                        </Chip>
                        <Chip size="md" className="bg-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/30">
                          <Heart className="w-4 h-4 mr-1" />
                          Gerçek Etki
                        </Chip>
                        <Chip size="md" className="bg-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/30">
                          <Star className="w-4 h-4 mr-1" />
                          Onaylı Projeler
                        </Chip>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Donation Cards */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                Bağış Seçenekleri
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {donations.map((donation, index) => {
                  const progress = (donation.donated / donation.goal) * 100
                  const canAfford = userPoints >= donation.pointCost

                  return (
                    <motion.div
                      key={donation.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
                      whileHover={{ 
                        scale: 1.03,
                        y: -8,
                      }}
                      className="relative group"
                    >
                      {/* Floating Badge */}
                      <motion.div 
                        className="absolute text-3xl pointer-events-none z-30 -top-4 -right-2 drop-shadow-lg"
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      >
                        {donation.emoji}
                      </motion.div>
                      
                      <Card 
                        className={`h-full ${!canAfford ? 'opacity-60' : ''} relative overflow-hidden border-2 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300`}
                        style={{
                          borderColor: canAfford ? 'rgba(255, 255, 255, 0.3)' : 'rgba(200, 200, 200, 0.2)',
                          background: 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        {/* Gradient Overlay on Hover */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${donation.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />
                        
                        {/* Sparkle Corner */}
                        <motion.div 
                          className="absolute top-4 right-4 text-2xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                          }}
                        >
                          ✨
                        </motion.div>
                        
                        <CardBody className="p-6 relative z-10">
                          {/* Icon and Badge */}
                          <div className="flex items-start justify-between mb-5">
                            <motion.div 
                              className={`w-18 h-18 bg-gradient-to-br ${donation.gradient} rounded-2xl flex items-center justify-center text-4xl shadow-lg border-2 border-white/30`}
                              whileHover={{
                                scale: 1.1,
                                rotate: [0, -10, 10, 0],
                              }}
                              transition={{
                                duration: 0.5
                              }}
                            >
                              {donation.emoji}
                            </motion.div>
                            {!canAfford && (
                              <Chip size="sm" color="danger" variant="flat" className="font-semibold">
                                Yetersiz Puan
                              </Chip>
                            )}
                          </div>

                          {/* Title and Description */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {donation.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {donation.description}
                          </p>

                          {/* Categories */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {donation.categories.map((cat, i) => (
                              <Chip key={i} size="sm" variant="flat">
                                {cat}
                              </Chip>
                            ))}
                          </div>

                          {/* Cost and Value */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Maliyet</span>
                              <Chip color="warning" variant="solid" size="lg">
                                <Star className="w-4 h-4 mr-1" />
                                {donation.pointCost.toLocaleString()}
                              </Chip>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                              Gerçek Değer: {donation.realValue}
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                              ✨ {donation.impact}
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="mb-4 relative">
                            <div className="flex items-center justify-between mb-2">
                              <motion.span 
                                className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1"
                                animate={{
                                  x: [0, 2, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              >
                                <TrendingUp className="w-3 h-3" />
                                Topluluk İlerlemesi
                              </motion.span>
                              <motion.span 
                                className="text-xs font-bold text-gray-900 dark:text-white"
                                animate={{
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              >
                                {donation.donated} / {donation.goal}
                              </motion.span>
                            </div>
                            <Progress
                              value={progress}
                              className="h-2"
                              aria-label={`${donation.title} bağış ilerlemesi: ${donation.donated} / ${donation.goal}`}
                              classNames={{
                                indicator: `bg-gradient-to-r ${donation.gradient}`
                              }}
                            />
                          </div>

                          {/* Button - Performance Optimized */}
                          <Button
                            color="primary"
                            className={`w-full bg-gradient-to-r ${donation.gradient} text-white font-bold`}
                            size="lg"
                            isDisabled={!canAfford}
                            onPress={() => setSelectedDonation(donation)}
                          >
                            💝 Bağış Yap
                          </Button>
                        </CardBody>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Certificates Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                Güvenilirlik Sertifikalarımız
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { name: 'ISO 9001', desc: 'Kalite Yönetimi', color: 'from-blue-500 to-cyan-500', icon: '🏆' },
                  { name: 'SGK Onaylı', desc: 'Sosyal Güvenlik', color: 'from-green-500 to-emerald-500', icon: '✅' },
                  { name: 'Şeffaflık', desc: '%100 Raporlama', color: 'from-purple-500 to-pink-500', icon: '📊' },
                  { name: 'Güven Damgası', desc: 'Onaylı Kuruluş', color: 'from-orange-500 to-red-500', icon: '🎖️' }
                ].map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="h-full">
                      <CardBody className="p-3 sm:p-4 md:p-6 text-center">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-gradient-to-br ${cert.color} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}>
                          {cert.icon}
                        </div>
                        <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-white mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {cert.desc}
                        </p>
                        <Chip size="sm" color="success" variant="flat" className="mt-2">
                          Onaylı
                        </Chip>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* My Donations History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardBody className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                      Bağış Geçmişim
                    </h2>
                    <Chip color="primary" variant="flat" size="sm">
                      {myDonations.length} Bağış
                    </Chip>
                  </div>

                  <div className="space-y-3">
                    {myDonations.map((donation, index) => (
                      <motion.div
                        key={donation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                          <CardBody className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                              {/* Emoji Icon */}
                              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                                {donation.emoji}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                                    {donation.amount}x {donation.type}
                                  </h3>
                                  <Chip size="sm" color="success" variant="flat">
                                    {donation.status}
                                  </Chip>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                                    {donation.points.toLocaleString()} puan
                                  </span>
                                  <span>📅 {donation.date}</span>
                                </div>
                              </div>

                              {/* Certificate Button */}
                              {donation.certificate && (
                                <Button
                                  size="sm"
                                  color="warning"
                                  variant="flat"
                                  onPress={() => {
                                    setSelectedCertificate(donation)
                                    setShowCertificateModal(true)
                                  }}
                                  startContent={<Award className="w-3 h-3 sm:w-4 sm:h-4" />}
                                  className="w-full sm:w-auto"
                                >
                                  Sertifika
                                </Button>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {myDonations.length === 0 && (
                    <div className="text-center py-12">
                      <Gift className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Henüz bağış yapmadınız. İlk bağışınızı yapın!
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>

            {/* Impact Stats */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardBody className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Topluluk Etkisi
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <Droplet className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">847</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Su Bağışı</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1,243</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mama Bağışı</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <TreePine className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">2,156</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fidan Bağışı</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4,246</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Aktif Bağışçı</p>
                  </div>
                </div>
              </CardBody>
            </Card>

          </div>
        </main>
      </div>

      {/* Donation Modal */}
      <Modal 
        isOpen={!!selectedDonation && !showSuccessModal} 
        onClose={() => setSelectedDonation(null)}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => selectedDonation && (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedDonation.gradient} rounded-xl flex items-center justify-center text-2xl`}>
                    {selectedDonation.emoji}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedDonation.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                      {selectedDonation.description}
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {/* Amount Selector */}
                  <div>
                    <Input
                      type="number"
                      value={donationAmount.toString()}
                      onChange={(e) => setDonationAmount(Math.max(1, parseInt(e.target.value) || 1))}
                      min={1}
                      size="lg"
                      aria-label="Bağış miktarı"
                      label="Bağış Miktarı"
                      endContent={
                        <span className="text-gray-500">adet</span>
                      }
                    />
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 5, 10].map(num => (
                        <Button
                          key={num}
                          size="sm"
                          variant="flat"
                          onPress={() => setDonationAmount(num)}
                        >
                          {num}x
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Bağış Özeti
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Miktar</span>
                        <span className="font-bold text-gray-900 dark:text-white">{donationAmount} adet</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Birim Maliyet</span>
                        <Chip color="warning" variant="flat" size="sm">
                          {selectedDonation.pointCost.toLocaleString()} puan
                        </Chip>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200 dark:border-gray-700">
                        <span className="font-bold text-gray-900 dark:text-white">Toplam</span>
                        <Chip color="warning" variant="solid" size="lg">
                          <Star className="w-4 h-4 mr-1" />
                          {(selectedDonation.pointCost * donationAmount).toLocaleString()}
                        </Chip>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Kalan Puan</span>
                        <span className="font-bold text-green-600">
                          {(userPoints - selectedDonation.pointCost * donationAmount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-500" />
                      Yaratacağınız Etki
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      ✨ {selectedDonation.impact}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Gerçek Değer: {donationAmount} × {selectedDonation.realValue}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  İptal
                </Button>
                <Button
                  color="success"
                  onPress={handleDonate}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold"
                  size="lg"
                  startContent={<Heart className="w-5 h-5" />}
                >
                  Bağış Yap
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Donation Animation Modal */}
      <Modal 
        isOpen={showDonationAnimation} 
        hideCloseButton
        isDismissable={false}
        size="md"
        className="bg-transparent shadow-none"
      >
        <ModalContent className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
          <ModalBody className="p-12">
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="text-8xl mb-6"
              >
                💝
              </motion.div>
              <motion.h2
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
                className="text-3xl font-bold text-white mb-4"
              >
                {donationMessage}
              </motion.h2>
              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                ))}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Flying Hearts Animation */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: heart.y, x: heart.x, opacity: 1, scale: 0.5 }}
            animate={{ 
              y: -100, 
              x: heart.x + (Math.random() - 0.5) * 100,
              opacity: 0,
              scale: 1.5
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 text-5xl"
            style={{ left: heart.x, top: heart.y }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Success Modal - ULTRA CELEBRATION! */}
      <Modal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false)
          setSelectedDonation(null)
          setDonationAmount(1)
        }} 
        size="2xl"
        className="bg-transparent"
      >
        <ModalContent className="relative overflow-hidden">
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(135deg, #10b981 0%, #059669 50%, #14b8a6 100%)',
                'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #059669 100%)',
                'linear-gradient(135deg, #059669 0%, #14b8a6 50%, #10b981 100%)',
                'linear-gradient(135deg, #10b981 0%, #059669 50%, #14b8a6 100%)',
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          
          {/* Floating Celebration Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              >
                {['🎉', '✨', '💝', '🎊', '⭐', '🌟'][i]}
              </motion.div>
            ))}
          </div>

          <ModalBody className="p-10 relative z-10">
            <div className="text-center text-white">
              {/* Giant Success Icon with Burst Effect */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                }}
                transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                className="relative inline-block mb-6"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0px rgba(255, 255, 255, 0.7)',
                      '0 0 0 20px rgba(255, 255, 255, 0)',
                      '0 0 0 0px rgba(255, 255, 255, 0)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-32 h-32 mx-auto bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/50"
                >
                  <Check className="w-16 h-16 text-white drop-shadow-2xl" strokeWidth={3} />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <motion.h2 
                  className="text-5xl font-bold mb-4 drop-shadow-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  🎉 Muhteşem! 🎉
                </motion.h2>
                <h3 className="text-3xl font-bold mb-5 drop-shadow-md">
                  Bağışınız Başarıyla Gerçekleşti!
                </h3>
                <p className="text-xl opacity-95 mb-6">
                  Daha iyi bir dünya için yaptığınız bu katkı için içten teşekkürlerimizi sunuyoruz! 💝
                </p>
              </motion.div>

              {selectedDonation && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="bg-white/25 backdrop-blur-xl rounded-3xl p-8 mb-6 border-2 border-white/40 shadow-2xl"
                >
                  <div className="flex items-center justify-center gap-5 mb-5">
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-br ${selectedDonation.gradient} rounded-2xl flex items-center justify-center text-4xl shadow-xl border-2 border-white/50`}
                      animate={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      {selectedDonation.emoji}
                    </motion.div>
                    <div className="text-left">
                      <p className="text-3xl font-bold drop-shadow-md">
                        {donationAmount}x {selectedDonation.title}
                      </p>
                      <p className="text-base opacity-95 font-medium mt-1">
                        ✨ {selectedDonation.pointCost * donationAmount} puan kullanıldı
                      </p>
                    </div>
                  </div>
                  
                  <Divider className="my-5 bg-white/50" />
                  
                  <motion.div 
                    className="flex items-start gap-4 bg-white/15 rounded-2xl p-4"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                    >
                      <Sparkles className="w-7 h-7 flex-shrink-0 mt-1" />
                    </motion.div>
                    <div className="text-left">
                      <p className="font-bold text-xl mb-2 drop-shadow-sm">Yaratacağınız Etki:</p>
                      <p className="text-lg opacity-95 leading-relaxed">
                        {selectedDonation.impact}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <Button
                  size="lg"
                  className="w-full bg-white text-green-600 font-bold text-xl py-7 shadow-2xl hover:scale-105 transition-transform"
                  onPress={() => {
                    setShowSuccessModal(false)
                    setSelectedDonation(null)
                    setDonationAmount(1)
                  }}
                  startContent={<ThumbsUp className="w-6 h-6" />}
                >
                  Harika! Anladım 🎉
                </Button>
                
                <Button
                  size="lg"
                  variant="light"
                  className="w-full text-white font-semibold"
                  onPress={() => {
                    setShowSuccessModal(false)
                    setDonationAmount(1)
                  }}
                  startContent={<Heart className="w-5 h-5" />}
                >
                  Başka Bağış Yap
                </Button>
              </motion.div>

              {/* Simplified Decorative elements - Performance Optimized */}
              <div className="absolute top-4 right-4 text-3xl opacity-40">⭐</div>
              <div className="absolute bottom-4 left-4 text-2xl opacity-40">💝</div>
              <div className="absolute top-1/4 left-4 text-xl opacity-30">✨</div>
              <div className="absolute bottom-1/4 right-4 text-xl opacity-30">💫</div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Certificate Modal */}
      <Modal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        size="3xl"
      >
        <ModalContent>
          <ModalBody className="p-0">
            {selectedCertificate && (
              <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 sm:p-8 md:p-12 rounded-lg">
                {/* Decorative Border */}
                <div className="absolute inset-4 border-4 border-yellow-500 rounded-lg" />
                <div className="absolute inset-6 border-2 border-yellow-400 rounded-lg" />
                
                {/* Certificate Content */}
                <div className="relative z-10 text-center">
                  {/* Top Badge */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Bağış Sertifikası
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Certificate of Donation
                  </p>

                  <Divider className="my-6" />

                  {/* Main Text */}
                  <div className="my-8 space-y-6">
                    <p className="text-xl text-gray-700 dark:text-gray-300">
                      Bu sertifika, aşağıdaki kişinin
                    </p>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border-2 border-yellow-400">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
                            <img 
                              src="https://api.dicebear.com/7.x/adventurer/svg?seed=girl-3d&backgroundColor=65c3f5&eyes=variant06&mouth=variant06&hair=variant23"
                              alt="Ahmet Yılmaz"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Ahmet Yılmaz
                      </p>
                      <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-1">
                        <span>✨</span>
                        <span>QR-tex Gold Member</span>
                      </p>
                    </div>

                    <p className="text-xl text-gray-700 dark:text-gray-300">
                      sosyal sorumluluk projelerine katkısını onaylar.
                    </p>

                    {/* Donation Details */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 my-6">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-5xl">{selectedCertificate.emoji}</div>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedCertificate.amount}x {selectedCertificate.type}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedCertificate.points.toLocaleString()} puan değerinde
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date & ID */}
                    <div className="grid grid-cols-2 gap-4 my-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Tarih</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {selectedCertificate.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sertifika No</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          #{selectedCertificate.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Divider className="my-6" />

                  {/* Footer */}
                  <div className="mt-8">
                    <div className="flex justify-center items-center gap-8">
                      <div className="text-center">
                        <div className="w-32 h-1 bg-gray-900 dark:bg-white mb-2" />
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          QR-tex Sosyal Sorumluluk
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Yetkili İmza
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Crown className="w-4 h-4" />
                      <span>Onaylı ve Güvenilir Bağış • www.qr-tex.com</span>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-8 left-8 text-4xl opacity-20">✨</div>
                  <div className="absolute top-8 right-8 text-4xl opacity-20">✨</div>
                  <div className="absolute bottom-8 left-8 text-4xl opacity-20">💝</div>
                  <div className="absolute bottom-8 right-8 text-4xl opacity-20">💝</div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => setShowCertificateModal(false)}
            >
              Kapat
            </Button>
            <Button
              color="primary"
              onPress={() => {
                alert('Sertifika indiriliyor! (Demo)')
                setShowCertificateModal(false)
              }}
              startContent={<Award className="w-4 h-4" />}
            >
              Sertifikayı İndir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Simplified CSS - Performance Optimized */}
      <style>{`
        .delay-75 {
          animation-delay: 0.75s;
        }
      `}</style>
    </div>
  )
}

export default DonationPage


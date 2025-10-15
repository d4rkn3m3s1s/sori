import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Divider } from '@nextui-org/react'
import { 
  Droplet, Heart, TreePine, Award, Star, TrendingUp, Trophy,
  ArrowLeft, Sparkles, Check, Gift, Users, Target, PartyPopper,
  Smile, MessageCircle, ThumbsUp, Crown
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import TreeGrowthSystem from '../../components/donation/TreeGrowthSystem'
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
  const [recentDonations, setRecentDonations] = useState<Array<{name: string, amount: string, time: string}>>([
    { name: 'Ayşe K.', amount: '1x Su Bağışı', time: '2 dakika önce' },
    { name: 'Mehmet Y.', amount: '2x Mama Bağışı', time: '5 dakika önce' },
    { name: 'Zeynep S.', amount: '3x Fidan Bağışı', time: '8 dakika önce' },
  ])

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
      title: 'Su Bağışı',
      description: 'Susuz kalan bölgelere temiz su ulaştırın',
      icon: Droplet,
      emoji: '💧',
      color: 'blue',
      gradient: 'from-blue-400 to-cyan-500',
      pointCost: 5000,
      realValue: '1 kişinin 1 aylık su ihtiyacı',
      impact: 'Bir aile 30 gün temiz suya kavuşur',
      donated: 847,
      goal: 1000,
      categories: ['Temel İhtiyaç', 'Acil']
    },
    {
      id: 'animal-food',
      title: 'Mama Bağışı',
      description: 'Sokak hayvanlarına mama desteği',
      icon: Heart,
      emoji: '🐾',
      color: 'pink',
      gradient: 'from-pink-400 to-red-500',
      pointCost: 3000,
      realValue: '10 kg kedi/köpek maması',
      impact: '20 hayvan 1 hafta beslenebilir',
      donated: 1243,
      goal: 2000,
      categories: ['Hayvan Hakları', 'Popüler']
    },
    {
      id: 'tree',
      title: 'Fidan Bağışı',
      description: 'Yeşil bir gelecek için fidan dikin',
      icon: TreePine,
      emoji: '🌳',
      color: 'green',
      gradient: 'from-green-400 to-emerald-500',
      pointCost: 2500,
      realValue: '5 adet meyve fidanı',
      impact: 'Yılda 100 kg CO2 emilimi',
      donated: 2156,
      goal: 5000,
      categories: ['Çevre', 'Uzun Vadeli']
    },
    {
      id: 'water-bulk',
      title: 'Toplu Su Bağışı',
      description: 'Bir köye su kuyusu açın',
      icon: Droplet,
      emoji: '💦',
      color: 'cyan',
      gradient: 'from-cyan-400 to-blue-600',
      pointCost: 50000,
      realValue: '1 su kuyusu',
      impact: 'Bir köy kalıcı temiz suya kavuşur',
      donated: 3,
      goal: 10,
      categories: ['Temel İhtiyaç', 'Kalıcı Etki']
    },
    {
      id: 'animal-shelter',
      title: 'Barınak Desteği',
      description: 'Hayvan barınağına tam destek',
      icon: Heart,
      emoji: '🏠',
      color: 'purple',
      gradient: 'from-purple-400 to-pink-500',
      pointCost: 10000,
      realValue: '1 aylık barınak gideri',
      impact: '50 hayvan 1 ay barınır ve beslenir',
      donated: 124,
      goal: 200,
      categories: ['Hayvan Hakları', 'Kalıcı Etki']
    },
    {
      id: 'forest',
      title: 'Orman Bağışı',
      description: 'Bir orman alanı oluşturun',
      icon: TreePine,
      emoji: '🌲',
      color: 'emerald',
      gradient: 'from-emerald-400 to-green-600',
      pointCost: 25000,
      realValue: '100 adet karışık fidan',
      impact: '1000 m² yeşil alan, yılda 2 ton CO2',
      donated: 45,
      goal: 100,
      categories: ['Çevre', 'Prestij']
    },
    {
      id: 'stationary',
      title: 'Kırtasiye Bağışı',
      description: 'Okuma yazması olmayan çocuklara kırtasiye desteği',
      icon: Gift,
      emoji: '📚',
      color: 'indigo',
      gradient: 'from-indigo-400 to-purple-500',
      pointCost: 2000,
      realValue: '1 öğrenci için tam set kırtasiye',
      impact: '1 öğrenci 1 dönem eğitime devam edebilir',
      donated: 567,
      goal: 1000,
      categories: ['Eğitim', 'Çocuk']
    },
    {
      id: 'school-bag',
      title: 'Okul Çantası Bağışı',
      description: 'İhtiyaç sahibi öğrencilere okul çantası',
      icon: Gift,
      emoji: '🎒',
      color: 'violet',
      gradient: 'from-violet-400 to-purple-600',
      pointCost: 4000,
      realValue: '1 dolu okul çantası (defter, kalem, vs.)',
      impact: 'Bir çocuk okula hazır başlar',
      donated: 234,
      goal: 500,
      categories: ['Eğitim', 'Çocuk']
    },
    {
      id: 'medicine',
      title: 'İlaç Bağışı',
      description: 'Maddi durumu iyi olmayanlara ilaç desteği',
      icon: Heart,
      emoji: '💊',
      color: 'red',
      gradient: 'from-red-400 to-pink-500',
      pointCost: 6000,
      realValue: '1 aylık kronik ilaç ihtiyacı',
      impact: 'Bir hasta 30 gün tedavisine devam edebilir',
      donated: 189,
      goal: 300,
      categories: ['Sağlık', 'Acil']
    },
    {
      id: 'wheelchair',
      title: 'Tekerlekli Sandalye',
      description: 'Hareket kısıtlılığı olan bireylere destek',
      icon: Heart,
      emoji: '♿',
      color: 'sky',
      gradient: 'from-sky-400 to-blue-500',
      pointCost: 15000,
      realValue: '1 tekerlekli sandalye',
      impact: 'Bir engelli birey hareket özgürlüğü kazanır',
      donated: 23,
      goal: 50,
      categories: ['Sağlık', 'Kalıcı Etki']
    },
    {
      id: 'food-package',
      title: 'Gıda Kolisi',
      description: 'Aç kalan ailelere gıda paketi',
      icon: Gift,
      emoji: '🍲',
      color: 'orange',
      gradient: 'from-orange-400 to-red-500',
      pointCost: 3500,
      realValue: '1 ailenin 1 haftalık gıda ihtiyacı',
      impact: '4 kişilik aile 7 gün tok kalır',
      donated: 892,
      goal: 1500,
      categories: ['Temel İhtiyaç', 'Acil']
    },
    {
      id: 'blanket',
      title: 'Battaniye Bağışı',
      description: 'Soğukta kalanlara sıcaklık',
      icon: Heart,
      emoji: '🛏️',
      color: 'amber',
      gradient: 'from-amber-400 to-orange-500',
      pointCost: 1500,
      realValue: '2 adet kaliteli battaniye',
      impact: 'Bir aile kışı sıcak geçirir',
      donated: 445,
      goal: 800,
      categories: ['Temel İhtiyaç', 'Mevsimsel']
    },
    {
      id: 'scholarship',
      title: 'Burs Desteği',
      description: 'Eğitimine devam edemeyen öğrencilere burs',
      icon: Award,
      emoji: '🎓',
      color: 'teal',
      gradient: 'from-teal-400 to-cyan-500',
      pointCost: 20000,
      realValue: '1 öğrencinin 6 aylık eğitim masrafı',
      impact: 'Bir öğrenci okulu bırakmaz',
      donated: 67,
      goal: 150,
      categories: ['Eğitim', 'Uzun Vadeli']
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
      
      // Yeni bağışı recent donations'a ekle
      setRecentDonations(prev => [
        { name: 'Siz', amount: `${donationAmount}x ${selectedDonation.title}`, time: 'Az önce' },
        ...prev.slice(0, 4)
      ])

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
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
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

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-gradient-to-br from-yellow-400 to-orange-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Kullanılabilir Puan</p>
                        <p className="text-4xl font-bold">{userPoints.toLocaleString()}</p>
                      </div>
                      <Star className="w-12 h-12 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-gradient-to-br from-green-400 to-emerald-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Toplam Bağış</p>
                        <p className="text-4xl font-bold">{totalDonated.toLocaleString()}</p>
                        <p className="text-xs opacity-75">puan</p>
                      </div>
                      <Gift className="w-12 h-12 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-gradient-to-br from-purple-400 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Etki Seviyesi</p>
                        <p className="text-4xl font-bold">
                          {totalDonated > 100000 ? 'Efsane' :
                           totalDonated > 50000 ? 'Kahraman' :
                           totalDonated > 20000 ? 'Yıldız' :
                           totalDonated > 5000 ? 'Destekçi' : 'Başlangıç'}
                        </p>
                      </div>
                      <Award className="w-12 h-12 opacity-20" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Tree Growth System - Fidan Yetiştirme Sistemi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TreeGrowthSystem />
            </motion.div>

            {/* Info Banner - Geliştirilmiş */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                <CardBody className="p-4 sm:p-6 md:p-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-white">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 animate-bounce">
                      <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                        Puanlarınız Gerçek Değişim Yaratıyor!
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-95 leading-relaxed">
                        QR-tex olarak kazandığınız her puan, doğrudan sosyal sorumluluk projelerine dönüşüyor. 
                        Bağışlarınız <span className="font-bold underline">%100 şeffaflıkla</span> yerine ulaşıyor ve gerçek etki yaratıyor! 💝
                      </p>
                      <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-4 justify-center md:justify-start">
                        <Chip size="sm" className="bg-white/20 text-white font-bold text-xs sm:text-sm">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          %100 Şeffaf
                        </Chip>
                        <Chip size="sm" className="bg-white/20 text-white font-bold text-xs sm:text-sm">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Gerçek Etki
                        </Chip>
                        <Chip size="sm" className="bg-white/20 text-white font-bold text-xs sm:text-sm">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Onaylı Projeler
                        </Chip>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Recent Donations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardBody className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                      Son Bağışlar
                    </h3>
                    <Chip color="secondary" variant="flat" size="sm">
                      Canlı
                    </Chip>
                  </div>
                  <Divider className="mb-4" />
                  <div className="space-y-3">
                    <AnimatePresence>
                      {recentDonations.map((donation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {donation.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                              {donation.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {donation.amount}
                            </p>
                          </div>
                          <div className="text-right">
                            <Chip size="sm" variant="flat" color="success">
                              {donation.time}
                            </Chip>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <Card 
                        isPressable 
                        onPress={() => canAfford && setSelectedDonation(donation)}
                        className={`h-full ${!canAfford ? 'opacity-60' : ''}`}
                      >
                        <CardBody className="p-6">
                          {/* Icon and Badge */}
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-16 h-16 bg-gradient-to-br ${donation.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                              {donation.emoji}
                            </div>
                            {!canAfford && (
                              <Chip size="sm" color="danger" variant="flat">
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
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Topluluk İlerlemesi
                              </span>
                              <span className="text-xs font-bold text-gray-900 dark:text-white">
                                {donation.donated} / {donation.goal}
                              </span>
                            </div>
                            <Progress
                              value={progress}
                              className="h-2"
                              classNames={{
                                indicator: `bg-gradient-to-r ${donation.gradient}`
                              }}
                            />
                          </div>

                          {/* Button */}
                          <Button
                            color="primary"
                            className={`w-full bg-gradient-to-r ${donation.gradient} text-white font-bold`}
                            size="lg"
                            isDisabled={!canAfford}
                            onPress={() => setSelectedDonation(donation)}
                          >
                            Bağış Yap
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
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      Bağış Miktarı
                    </label>
                    <Input
                      type="number"
                      value={donationAmount.toString()}
                      onChange={(e) => setDonationAmount(Math.max(1, parseInt(e.target.value) || 1))}
                      min={1}
                      size="lg"
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

      {/* Success Modal - Geliştirilmiş */}
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
        <ModalContent className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500">
          <ModalBody className="p-8">
            <div className="text-center text-white">
              {/* Animated Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl font-bold mb-3">
                  🎉 Harika!
                </h2>
                <h3 className="text-2xl font-bold mb-4">
                  Bağışınız Başarıyla Gerçekleşti!
                </h3>
                <p className="text-xl opacity-95 mb-6">
                  Daha iyi bir dünya için yaptığınız bu katkı için içten teşekkürlerimizi sunuyoruz! 💝
                </p>
              </motion.div>

              {selectedDonation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${selectedDonation.gradient} rounded-xl flex items-center justify-center text-3xl`}>
                      {selectedDonation.emoji}
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold">
                        {donationAmount}x {selectedDonation.title}
                      </p>
                      <p className="text-sm opacity-90">
                        {selectedDonation.pointCost * donationAmount} puan kullanıldı
                      </p>
                    </div>
                  </div>
                  
                  <Divider className="my-4 bg-white/30" />
                  
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <p className="font-bold text-lg mb-1">Yaratacağınız Etki:</p>
                      <p className="text-base opacity-95">
                        {selectedDonation.impact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <Button
                  size="lg"
                  className="w-full bg-white text-green-600 font-bold text-lg"
                  onPress={() => {
                    setShowSuccessModal(false)
                    setSelectedDonation(null)
                    setDonationAmount(1)
                  }}
                  startContent={<ThumbsUp className="w-5 h-5" />}
                >
                  Harika! Anladım
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

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 text-4xl animate-spin-slow">⭐</div>
              <div className="absolute bottom-4 left-4 text-3xl animate-bounce">💝</div>
              <div className="absolute top-1/4 left-4 text-2xl animate-pulse">✨</div>
              <div className="absolute bottom-1/4 right-4 text-2xl animate-pulse delay-75">💫</div>
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
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Ahmet Yılmaz
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        QR-tex Kullanıcısı
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

      {/* Custom CSS Animations */}
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
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .delay-75 {
          animation-delay: 0.75s;
        }
      `}</style>
    </div>
  )
}

export default DonationPage


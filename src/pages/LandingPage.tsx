import { motion } from 'framer-motion'
import { Button, Card, CardBody, Input, Chip, Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useAnimationLevel } from '../contexts/AnimationContext'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { 
  QrCode, 
  Brain, 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Star,
  Zap,
  Shield,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  Sparkles,
  Award,
  Target,
  TrendingDown,
  Clock,
  Mail,
  Play,
  ChevronDown,
  Rocket,
  Globe,
  Lock,
  HeartHandshake,
  Smartphone,
  Laptop,
  Send,
  Check,
  MessageCircle,
  X
} from 'lucide-react'
import ParticleBackground from '../components/ui/ParticleBackground'
import GradientCard from '../components/ui/GradientCard'
import Logo from '../components/ui/Logo'

// Counter Animation Component
function CounterAnimation({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  useEffect(() => {
    if (hasAnimated) return
    
    let startTime: number
    let animationFrame: number
    const duration = 2000
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setDisplayValue(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setHasAnimated(true)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, hasAnimated])
  
  return <>{displayValue.toLocaleString()}{suffix}</>
}

function LandingPage() {
  const navigate = useNavigate()
  const { isReduced } = useAnimationLevel()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  // Removed heavy scroll animations for performance

  const stats = [
    { label: 'Aktif Kullanıcı', value: 12500, suffix: '+', icon: Users },
    { label: 'Toplanan Feedback', value: 250000, suffix: '+', icon: MessageSquare },
    { label: 'Memnuniyet Oranı', value: 98, suffix: '%', icon: Star },
    { label: 'Ortalama Yanıt Süresi', value: 24, suffix: 'sn', icon: Clock }
  ]

  const features = [
    {
      icon: QrCode,
      title: 'QR Kod ile Hızlı Geri Bildirim',
      description: 'Müşterileriniz QR kodu tarayarak anında geri bildirim bırakabilir.',
      gradient: 'primary' as const
    },
    {
      icon: Brain,
      title: 'AI Destekli Sentiment Analizi',
      description: 'Yapay zeka ile müşteri duygularını analiz edin ve içgörüler elde edin.',
      gradient: 'secondary' as const
    },
    {
      icon: BarChart3,
      title: 'Canlı Raporlama ve İçgörüler',
      description: 'Gerçek zamanlı dashboard ile performansınızı takip edin.',
      gradient: 'tertiary' as const
    },
    {
      icon: TrendingUp,
      title: 'Müşteri Memnuniyetini Artırın',
      description: 'Veri odaklı kararlarla müşteri deneyimini sürekli geliştirin.',
      gradient: 'primary' as const
    }
  ]

  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Restoran Sahibi',
      content: 'Qratex sayesinde müşteri memnuniyetimiz %40 arttı. AI analizleri gerçekten çok değerli!',
      rating: 5,
      avatar: '👨‍💼',
      company: 'Lezzet Durağı'
    },
    {
      name: 'Elif Kaya',
      role: 'Otel Müdürü',
      content: 'QR kod sistemi çok pratik. Müşterilerimiz kolayca geri bildirim bırakabiliyor.',
      rating: 5,
      avatar: '👩‍💼',
      company: 'Grand Hotel Istanbul'
    },
    {
      name: 'Mehmet Demir',
      role: 'Kafe Sahibi',
      content: 'Canlı raporlama özelliği sayesinde sorunları hemen fark edip çözüyoruz.',
      rating: 5,
      avatar: '👨‍🍳',
      company: 'Aroma Coffee'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₺0',
      period: '/ay',
      description: 'Küçük işletmeler için ideal başlangıç',
      features: [
        '100 feedback/ay',
        '1 QR kod',
        'Temel analitik',
        'Email destek',
        'Mobil uygulama'
      ],
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Professional',
      price: '₺299',
      period: '/ay',
      description: 'Büyüyen işletmeler için güçlü çözüm',
      features: [
        'Sınırsız feedback',
        'Sınırsız QR kod',
        'AI sentiment analizi',
        'Gelişmiş raporlama',
        'Öncelikli destek',
        'API erişimi',
        'Özel entegrasyonlar'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Enterprise',
      price: 'Özel',
      period: '',
      description: 'Kurumsal çözümler ve özel gereksinimler',
      features: [
        'Tüm Professional özellikler',
        'Özel AI modelleri',
        'Özel entegrasyonlar',
        '7/24 destek',
        'SLA garantisi',
        'Eğitim ve danışmanlık',
        'White-label çözüm'
      ],
      popular: false,
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setEmail('')
        setIsSubscribed(false)
      }, 3000)
    }
  }

  // Check if cookies were already accepted
  useEffect(() => {
    const accepted = localStorage.getItem('qratex-cookies-accepted')
    if (accepted === 'true') {
      setShowCookieBanner(false)
    }
  }, [])

  const faqs = [
    {
      question: 'QRATEX nedir ve nasıl çalışır?',
      answer: 'QRATEX, QR kod tabanlı müşteri geri bildirim platformudur. Müşterileriniz QR kodu tarayarak anında geri bildirim bırakabilir, siz de AI destekli analizlerle bu geri bildirimleri değerlendirebilirsiniz.'
    },
    {
      question: 'Ücretsiz deneme süresi var mı?',
      answer: 'Evet! 14 gün boyunca tüm özellikleri ücretsiz deneyebilirsiniz. Kredi kartı bilgisi gerekmez ve istediğiniz zaman iptal edebilirsiniz.'
    },
    {
      question: 'Kaç tane QR kod oluşturabilirim?',
      answer: 'Starter planında 1 QR kod, Professional ve Enterprise planlarda sınırsız QR kod oluşturabilirsiniz. Her QR kod farklı lokasyonlar veya ürünler için özelleştirilebilir.'
    },
    {
      question: 'AI analizi nasıl çalışır?',
      answer: 'Yapay zeka teknolojimiz, müşteri yorumlarını otomatik olarak analiz eder, duygu analizi yapar ve size içgörüler sunar. Olumlu/olumsuz yorumları ayırır ve trend analizi yapabilirsiniz.'
    },
    {
      question: 'Verilerim güvende mi?',
      answer: 'Kesinlikle! ISO 27001 sertifikalıyız ve GDPR uyumluyuz. Tüm verileriniz şifrelenmiş olarak saklanır ve hiçbir zaman üçüncü taraflarla paylaşılmaz.'
    },
    {
      question: 'Mobil uygulama var mı?',
      answer: 'Evet! iOS ve Android için mobil uygulamamız mevcuttur. Web paneli ile tam entegre çalışır ve anında bildirimler alabilirsiniz.'
    },
    {
      question: 'Başka sistemlerle entegrasyon yapabiliyor muyum?',
      answer: 'Professional ve Enterprise planlarda API erişimi sunuyoruz. Slack, WhatsApp, Email ve daha fazla platformla entegrasyon yapabilirsiniz.'
    },
    {
      question: 'Destek nasıl alabilirim?',
      answer: 'Email, canlı chat ve telefon desteği sunuyoruz. Professional plan için öncelikli destek, Enterprise plan için 7/24 destek mevcuttur.'
    }
  ]

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showBanner, setShowBanner] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showCookieBanner, setShowCookieBanner] = useState(true)

  const clientLogos = [
    { name: 'Starbucks', icon: '☕' },
    { name: 'McDonalds', icon: '🍔' },
    { name: 'Hilton', icon: '🏨' },
    { name: 'Nike', icon: '👟' },
    { name: 'Apple', icon: '🍎' },
    { name: 'Amazon', icon: '📦' },
    { name: 'Tesla', icon: '⚡' },
    { name: 'Netflix', icon: '🎬' }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-4 sm:p-6"
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Logo size="md" animated={true} showText={true} />
          
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                isIconOnly
                variant="bordered"
                onClick={() => {
                  const root = document.documentElement
                  const hasDark = root.classList.contains('dark')
                  if (hasDark) {
                    root.classList.remove('dark')
                    localStorage.setItem('qratex-theme', 'light')
                  } else {
                    root.classList.add('dark')
                    localStorage.setItem('qratex-theme', 'dark')
                  }
                }}
                className="
                  relative overflow-hidden
                  bg-white/10 dark:bg-black/10
                  backdrop-blur-md
                  border border-white/20 dark:border-white/10
                  hover:bg-white/20 dark:hover:bg-black/20
                  hover:border-white/30 dark:hover:border-white/20
                  shadow-lg shadow-black/5 dark:shadow-black/20
                  transition-all duration-300 ease-out
                  before:absolute before:inset-0
                  before:bg-gradient-to-r before:from-white/10 before:to-transparent
                  before:opacity-0 hover:before:opacity-100
                  before:transition-opacity before:duration-300
                  after:absolute after:inset-0
                  after:bg-gradient-to-br after:from-white/5 after:to-transparent
                  after:opacity-0 hover:after:opacity-100
                  after:transition-opacity after:duration-500
                "
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: 0 }}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Sun className="w-5 h-5 text-amber-400 dark:hidden drop-shadow-sm" />
                  <Moon className="w-5 h-5 text-blue-300 hidden dark:block drop-shadow-sm" />
                </motion.div>
                
                {/* Liquid Glass Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </Button>
            </motion.div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dealer/login')}
              className="text-gray-700 hover:text-purple-600"
            >
              Bayi Girişi
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate('/customer/login')}
              className="text-gray-700 hover:text-purple-600"
            >
              Müşteri Girişi
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Limited Time Offer Banner */}
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="relative z-10 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-semibold">
                    🎉 <strong>Sınırlı Süre!</strong> İlk 100 kayda <strong>%40 indirim</strong> + 
                    <strong> 3 ay ücretsiz</strong> Professional plan!
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-white text-red-600 font-bold hover:bg-gray-100"
                  onClick={() => navigate('/dealer/register')}
                >
                  Hemen Al
                </Button>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">Transform Feedback Into </span>
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Actionable Intelligence
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                AI ile müşteri geri bildiriminizi anlayın, geliştirin, büyütün. 
                QR tabanlı hızlı geri bildirim toplama ve gerçek zamanlı analiz platformu.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-4 text-lg"
                  onClick={() => navigate('/dealer/register')}
                  endContent={<ArrowRight className="w-5 h-5" />}
                >
                  Ücretsiz Başla
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-2 border-purple-500 text-purple-600 font-semibold px-8 py-4 text-lg hover:bg-purple-50"
                  onClick={() => setShowVideoModal(true)}
                  startContent={<Play className="w-5 h-5" />}
                >
                  Demo İzle
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 mt-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Kredi Kartı Gerektirmez</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>5 Dakikada Kurulum</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Sınırsız Kullanıcı</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="
                    relative overflow-hidden
                    bg-white/10 dark:bg-black/10
                    backdrop-blur-xl
                    border border-white/20 dark:border-white/10
                    shadow-2xl shadow-black/10 dark:shadow-black/30
                    rounded-2xl
                    transform rotate-3 hover:rotate-0
                    transition-all duration-500 ease-out
                    before:absolute before:inset-0
                    before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-white/5
                    before:opacity-0 hover:before:opacity-100
                    before:transition-opacity before:duration-500
                    after:absolute after:inset-0
                    after:bg-gradient-to-tr after:from-transparent after:via-white/10 after:to-transparent
                    after:opacity-0 hover:after:opacity-100
                    after:transition-opacity after:duration-700
                  "
                >
                  <div className="relative z-10 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white drop-shadow-sm">
                        Dashboard Preview
                      </h3>
                      <div className="flex space-x-2">
                        <motion.div 
                          className="w-3 h-3 bg-red-500 rounded-full shadow-lg"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.div 
                          className="w-3 h-3 bg-green-500 rounded-full shadow-lg"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <motion.div 
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="
                          relative overflow-hidden
                          bg-gradient-to-br from-blue-500/20 to-cyan-500/20
                          backdrop-blur-sm
                          border border-white/20 dark:border-white/10
                          p-4 rounded-xl
                          shadow-lg shadow-blue-500/10
                          hover:shadow-xl hover:shadow-blue-500/20
                          transition-all duration-300
                        "
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">2,847</p>
                        <p className="text-sm text-green-600">+12%</p>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="
                          relative overflow-hidden
                          bg-gradient-to-br from-purple-500/20 to-pink-500/20
                          backdrop-blur-sm
                          border border-white/20 dark:border-white/10
                          p-4 rounded-xl
                          shadow-lg shadow-purple-500/10
                          hover:shadow-xl hover:shadow-purple-500/20
                          transition-all duration-300
                        "
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                              <Star className="w-4 h-4 fill-current drop-shadow-sm" />
                            </motion.div>
                          ))}
                        </div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="
                        relative overflow-hidden
                        bg-gradient-to-r from-green-500/20 to-emerald-500/20
                        backdrop-blur-sm
                        border border-white/20 dark:border-white/10
                        p-4 rounded-xl
                        shadow-lg shadow-green-500/10
                        hover:shadow-xl hover:shadow-green-500/20
                        transition-all duration-300
                      "
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">AI Insights</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        "Müşteri memnuniyeti son hafta %15 arttı. Hizmet kalitesi övgüleri dikkat çekiyor."
                      </p>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8 }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Liquid Glass Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Aşağı Kaydır
            </span>
            <ChevronDown className="w-6 h-6 text-purple-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900/80 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Chip 
              startContent={<Sparkles className="w-4 h-4" />}
              variant="flat" 
              color="secondary"
              className="mb-4"
            >
              Güvenilir Platform
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Rakamlarla QRATEX
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Binlerce işletme QRATEX ile büyüyor
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass backdrop-blur-xl border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <CardBody className="p-6 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className="inline-flex p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.div
                        className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                      >
                        <CounterAnimation value={stat.value} suffix={stat.suffix} />
                      </motion.div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {stat.label}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Badges */}
      <section className="relative z-10 px-4 sm:px-6 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium">ISO 27001 Sertifikalı</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
            >
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="font-medium">GDPR Uyumlu</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
            >
              <Award className="w-5 h-5 text-purple-500" />
              <span className="font-medium">Best SaaS 2024</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
            >
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-medium">4.9/5 Trustpilot</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Intelligent Feedback Management
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Gelişmiş AI yetenekleri ile müşteri geri bildirimlerinizi nasıl topladığınızı, 
              analiz ettiğinizi ve harekete geçirdiğinizi dönüştürün.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GradientCard gradient={feature.gradient}>
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-xl mb-4 ${
                      feature.gradient === 'primary' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                      feature.gradient === 'secondary' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                      'bg-gradient-to-br from-orange-500 to-red-500'
                    }`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GradientCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Chip 
              startContent={<Rocket className="w-4 h-4" />}
              variant="flat" 
              color="secondary"
              className="mb-4"
            >
              Nasıl Çalışır?
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              3 Adımda Başlayın
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              QRATEX ile müşteri geri bildirimi toplamak çok kolay. Dakikalar içinde kurulumu tamamlayın.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800 -translate-y-1/2 z-0" />
            
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <Card className="glass backdrop-blur-xl border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <CardBody className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center mb-6 relative"
                  >
                    <span className="text-3xl font-bold text-white">1</span>
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-8 h-8 text-yellow-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Ücretsiz Kayıt Ol
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Email adresinizle hemen kaydolun. Kredi kartı gerektirmez, kurulum ücreti yok.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10"
            >
              <Card className="glass backdrop-blur-xl border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <CardBody className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 items-center justify-center mb-6 relative"
                  >
                    <span className="text-3xl font-bold text-white">2</span>
                    <div className="absolute -top-2 -right-2">
                      <QrCode className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    QR Kod Oluştur
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Birkaç tıklamayla QR kodunuzu oluşturun. Masalara, menülere veya faturalara ekleyin.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative z-10"
            >
              <Card className="glass backdrop-blur-xl border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <CardBody className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 items-center justify-center mb-6 relative"
                  >
                    <span className="text-3xl font-bold text-white">3</span>
                    <div className="absolute -top-2 -right-2">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    AI İle Analiz Et
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Geri bildirimleri AI ile otomatik analiz edin. Anında içgörü elde edin, aksiyonlar alın.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-12 py-6 text-lg"
              onClick={() => navigate('/dealer/register')}
              endContent={<ArrowRight className="w-5 h-5" />}
            >
              Hemen Başla - Ücretsiz
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              14 gün ücretsiz deneme • Kredi kartı gerektirmez
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Binlerce işletme Qratex ile müşteri deneyimini geliştiriyor.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass backdrop-blur-xl border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardBody className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl mr-3">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "{testimonial.content}"
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-2xl pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
        
        {/* Floating Money Emojis - SIRA DIŞI! */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`money-${i}`}
            className="absolute text-3xl pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          >
            {['💰', '💵', '💸', '🪙', '💳', '💎'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
        
        {/* Confetti Effect - SIRA DIŞI! */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            className="absolute w-2 h-2 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              background: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)],
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
            animate={{
              y: ['0vh', '120vh'],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, Math.random() * 720],
              opacity: [1, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Floating Rockets - SIRA DIŞI! */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`rocket-${i}`}
            className="absolute text-4xl pointer-events-none"
            style={{
              left: `${10 + i * 20}%`,
              bottom: '-50px',
            }}
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2 + Math.random() * 3,
              ease: "easeOut",
            }}
          >
            🚀
          </motion.div>
        ))}
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* 3D Rotating Discount Badge - SIRA DIŞI! */}
            <motion.div
              className="absolute top-10 right-10 sm:right-20"
              animate={{
                rotateY: [0, 360],
                y: [0, -10, 0],
              }}
              transition={{
                rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              <div className="relative">
                <motion.div
                  className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white font-bold px-6 py-3 rounded-full shadow-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(251, 191, 36, 0.5)',
                      '0 0 40px rgba(251, 191, 36, 0.8)',
                      '0 0 20px rgba(251, 191, 36, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-2xl">🔥</div>
                    <div className="text-sm whitespace-nowrap">%50 İNDİRİM</div>
                  </div>
                </motion.div>
                
                {/* Sparkle effect around badge */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xl"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos(i * Math.PI / 4) * 50],
                      y: [0, Math.sin(i * Math.PI / 4) * 50],
                      opacity: [1, 0],
                      scale: [0, 1.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Live Users Counter - SIRA DIŞI! */}
            <motion.div
              className="absolute top-10 left-10 sm:left-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-purple-200 dark:border-purple-700"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <motion.span
                    key={Math.floor(Date.now() / 5000)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {127 + Math.floor(Math.random() * 50)}
                  </motion.span>
                  {' '}kişi bakıyor 👀
                </span>
              </div>
            </motion.div>
            
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Chip 
                startContent={<Rocket className="w-4 h-4" />}
                variant="flat" 
                color="secondary"
                className="mb-4"
              >
                💰 Fiyatlandırma
              </Chip>
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              animate={isReduced ? undefined : {
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={isReduced ? undefined : {
                duration: 5,
                repeat: Infinity,
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6, #8B5CF6)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Size Uygun Planı Seçin ✨
            </motion.h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Her büyüklükteki işletme için esnek ve şeffaf fiyatlandırma. 
              İstediğiniz zaman planınızı değiştirebilirsiniz. 🚀
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={isReduced ? undefined : { 
                  y: -6,
                  scale: 1.01,
                }}
                animate={isReduced ? undefined : {
                  y: [0, -3, 0],
                }}
                // tek transition objesi: y anim'i burada
                {...(!isReduced && {
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                  } as any
                })}
                className={`${plan.popular ? 'md:-mt-4' : ''} relative group`}
              >
                {/* Floating Testimonial Bubbles - SIRA DIŞI! */}
                {!isReduced && index === 1 && [...Array(2)].map((_, i) => (
                  <motion.div
                    key={`bubble-${i}`}
                    className="absolute text-xs bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-md pointer-events-none z-5"
                    style={{
                      left: i === 0 ? '-10%' : '110%',
                      top: `${30 + i * 30}%`,
                    }}
                    animate={{ y: [0, -8, 0], opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                  >
                    {['🔥 Harika!', '⭐⭐⭐⭐⭐'][i]}
                  </motion.div>
                ))}
                
                {/* Special Ribbon for First Plan - SIRA DIŞI! */}
                {!isReduced && index === 0 && (
                  <motion.div
                    className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl z-40"
                    animate={{
                      rotate: [-5, 5, -5],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    🌱 Başlangıç
                  </motion.div>
                )}
                
                {/* Special Ribbon for Last Plan - SIRA DIŞI! */}
                {!isReduced && index === 2 && (
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl z-40"
                    animate={{
                      rotate: [5, -5, 5],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    👑 Premium
                  </motion.div>
                )}
                
                {/* Sparkle Burst on Hover - SIRA DIŞI! */}
                {!isReduced && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  whileHover="hover"
                  initial="rest"
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 },
                  }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`spark-${i}`}
                      className="absolute text-2xl"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      variants={{
                        rest: { scale: 0, opacity: 0 },
                        hover: { 
                          x: Math.cos(i * Math.PI / 6) * 80,
                          y: Math.sin(i * Math.PI / 6) * 80,
                          scale: 1,
                          opacity: [0, 1, 0],
                        },
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
                )}
                <Card 
                  className={`relative overflow-visible rounded-2xl backdrop-blur-md ${
                    plan.popular 
                      ? 'border-2 border-purple-400/40 shadow-2xl shadow-purple-500/20' 
                      : 'border-2 border-white/30 dark:border-white/20 shadow-xl'
                  } transition-all duration-300 group-hover:shadow-2xl`}
                  style={{
                    background: plan.popular 
                      ? 'rgba(139, 92, 246, 0.08)'
                      : 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: 'radial-gradient(1000px 200px at 50% -20%, rgba(139,92,246,0.15), transparent)'
                  }} />
                  {(plan.popular && !isReduced) && (
                    <motion.div 
                      className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-2xl z-40"
                      animate={{
                        scale: [1, 1.03, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <span className="drop-shadow-lg">
                        ⭐ EN POPÜLER ⭐
                      </span>
                    </motion.div>
                  )}
                  
                  <CardBody className="p-8 relative z-10">
                    {/* Corner Decorations - SIRA DIŞI! */}
                    {!isReduced && (
                    <motion.div
                      className="absolute top-4 left-4 text-3xl pointer-events-none z-0 opacity-40"
                      animate={{
                        rotate: [0, 20, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      {['🎨', '🚀', '💎'][index]}
                    </motion.div>
                    )}
                    
                    {!isReduced && (
                    <motion.div
                      className="absolute bottom-4 right-4 text-2xl pointer-events-none opacity-20 z-0"
                      animate={{
                        rotate: [0, -360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {['🌟', '⚡', '✨'][index]}
                    </motion.div>
                    )}
                    
                    {/* Floating Mini Emojis Inside Card - SIRA DIŞI! */}
                    {(!isReduced ? [...Array(3)] : []).map((_, i) => (
                      <motion.div
                        key={`mini-emoji-${i}`}
                        className="absolute text-xs pointer-events-none opacity-20 z-0"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.15, 0.25, 0.15],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      >
                        {['💫', '⭐', '✨'][i]}
                      </motion.div>
                    ))}
                    
                    {/* Shine Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <motion.div 
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.color} mb-4 relative z-10`}
                      animate={isReduced ? undefined : {
                        scale: [1, 1.06, 1],
                      }}
                      transition={isReduced ? undefined : {
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                      {/* Icon Glow */}
                      {!isReduced && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 to-transparent"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      )}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 relative z-10">
                      {plan.description}
                    </p>
                    
                    <motion.div 
                      className="mb-6 relative z-10"
                      whileHover={isReduced ? undefined : { scale: 1.03 }}
                    >
                      <motion.span 
                        className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent inline-block"
                        animate={isReduced ? undefined : { backgroundPosition: ['0%', '100%', '0%'] }}
                        transition={isReduced ? undefined : { duration: 5, repeat: Infinity }}
                      >
                        {plan.price}
                      </motion.span>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">
                        {plan.period}
                      </span>
                    </motion.div>
                    
                    <ul className="space-y-3 mb-8 relative z-10">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={isReduced ? undefined : { x: 3, scale: 1.01 }}
                          className="flex items-start space-x-3 group cursor-pointer relative z-10"
                        >
                          {!isReduced && (
                          <motion.div
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:text-green-400 transition-colors" />
                          </motion.div>
                          )}
                          <span className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      {plan.popular && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-xl opacity-50"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.95, 1.05, 0.95],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      )}
                      <Button
                        size="lg"
                        className={`w-full font-semibold relative ${
                          plan.popular
                            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                            : 'border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        }`}
                        variant={plan.popular ? 'solid' : 'bordered'}
                        onClick={() => navigate('/dealer/register')}
                      >
                        <motion.span
                          animate={plan.popular ? {
                            scale: [1, 1.05, 1],
                          } : {}}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          {plan.price === 'Özel' ? 'İletişime Geç' : 'Hemen Başla'}
                        </motion.span>
                      </Button>
                    </motion.div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Limited Time Offer Banner - SIRA DIŞI! */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 mb-8 relative"
          >
            <motion.div
              className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-2xl p-6 shadow-2xl overflow-hidden"
              animate={{
                boxShadow: [
                  '0 10px 40px rgba(239, 68, 68, 0.3)',
                  '0 10px 60px rgba(251, 146, 60, 0.5)',
                  '0 10px 40px rgba(239, 68, 68, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '40px 40px'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    className="text-4xl"
                  >
                    ⚡
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">Sınırlı Süreli Özel Fırsat!</h3>
                    <p className="text-sm opacity-90">İlk 100 müşteriye özel %50 indirim</p>
                  </div>
                </div>
                
                {/* Countdown Timer */}
                <div className="flex space-x-2">
                  {['23', '59', '45'].map((time, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                    >
                      <div className="text-2xl font-bold">{time}</div>
                      <div className="text-xs opacity-80">{['Saat', 'Dakika', 'Saniye'][idx]}</div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Urgency Indicator */}
                <motion.div
                  className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-sm font-bold whitespace-nowrap">🔥 47 kişi kaldı!</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Social Proof Floating Badges - SIRA DIŞI! */}
          <div className="relative mb-8">
            {[
              { emoji: '🏆', text: '1000+ Mutlu Müşteri', color: 'from-yellow-500 to-orange-500', position: 'left-0' },
              { emoji: '⭐', text: '4.9/5 Ortalama Puan', color: 'from-purple-500 to-pink-500', position: 'right-0' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                className={`absolute ${badge.position} top-0 bg-gradient-to-r ${badge.color} text-white px-4 py-2 rounded-full shadow-lg hidden lg:flex items-center space-x-2`}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 0.5,
                }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 20, -20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-xl"
                >
                  {badge.emoji}
                </motion.span>
                <span className="text-sm font-bold whitespace-nowrap">{badge.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Pricing FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center relative"
          >
            {/* Decorative background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            
            <div className="relative z-10 py-8 px-4">
              <motion.p 
                className="text-gray-700 dark:text-gray-300 mb-6 text-lg font-semibold"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                🎉 Tüm planlarda 14 gün ücretsiz deneme ve para iade garantisi 🎉
              </motion.p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {[
                  { icon: '💳', text: 'Kredi kartı gerektirmez' },
                  { icon: '⏰', text: 'İstediğiniz zaman iptal edin' },
                  { icon: '💰', text: '30 gün para iade garantisi' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 border-2 border-purple-200 dark:border-purple-700 shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.1,
                      borderColor: '#8B5CF6',
                      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.3,
                      }}
                    >
                      {item.icon}
                    </motion.span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Feedback Strategy?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8">
              Binlerce şirket Qratex kullanarak müşteri geri bildirimlerini 
              rekabet avantajına dönüştürüyor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 font-semibold px-8 py-4 text-lg hover:bg-gray-100"
                onClick={() => navigate('/dealer/register')}
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Ücretsiz Başla
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-2 border-white text-white font-semibold px-8 py-4 text-lg hover:bg-white/10"
              >
                Demo Planla
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Partners Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Chip 
              startContent={<Globe className="w-4 h-4" />}
              variant="flat" 
              color="secondary"
              className="mb-4"
            >
              Entegrasyonlar
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kullandığınız Platformlarla Entegre
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              QRATEX, en popüler araçlar ve platformlarla sorunsuz entegre çalışır
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Slack', icon: '💬', color: 'from-purple-500 to-pink-500' },
              { name: 'WhatsApp', icon: '📱', color: 'from-green-500 to-emerald-500' },
              { name: 'Telegram', icon: '✈️', color: 'from-blue-500 to-cyan-500' },
              { name: 'Discord', icon: '🎮', color: 'from-indigo-500 to-purple-500' },
              { name: 'Email', icon: '📧', color: 'from-red-500 to-orange-500' },
              { name: 'SMS', icon: '💬', color: 'from-blue-500 to-blue-600' },
              { name: 'Zapier', icon: '⚡', color: 'from-orange-500 to-red-500' },
              { name: 'Webhook', icon: '🔗', color: 'from-gray-500 to-gray-600' },
              { name: 'API', icon: '🔌', color: 'from-purple-500 to-blue-500' },
              { name: 'Excel', icon: '📊', color: 'from-green-500 to-teal-500' },
              { name: 'Google', icon: '🔍', color: 'from-red-500 to-yellow-500' },
              { name: 'Microsoft', icon: '🪟', color: 'from-blue-500 to-blue-600' }
            ].map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="glass backdrop-blur-xl border-white/20 hover:shadow-xl transition-all duration-300">
                  <CardBody className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-3xl`}>
                      {integration.icon}
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {integration.name}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="bordered"
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              Tüm Entegrasyonları Gör
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
              Güvenilir Markalar QRATEX Kullanıyor
            </p>
          </motion.div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 flex flex-col items-center justify-center space-y-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="text-4xl">{logo.icon}</span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 text-center">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Chip 
              startContent={<MessageSquare className="w-4 h-4" />}
              variant="flat" 
              color="secondary"
              className="mb-4"
            >
              Sık Sorulan Sorular
            </Chip>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Merak Ettikleriniz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              QRATEX hakkında en çok sorulan soruların cevapları
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card 
                  className="glass backdrop-blur-xl border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  isPressable
                  onPress={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFAQ === index ? 'auto' : 0,
                        opacity: openFAQ === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Card className="glass backdrop-blur-xl border-white/20">
              <CardBody className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Başka sorunuz mu var?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Ekibimiz size yardımcı olmaktan mutluluk duyar
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    startContent={<Mail className="w-5 h-5" />}
                  >
                    Email Gönder
                  </Button>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    startContent={<MessageSquare className="w-5 h-5" />}
                  >
                    Canlı Destek
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
              <CardBody className="p-8 sm:p-12">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4"
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Haberdar Olun! 📬
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yeni özellikler, ipuçları ve özel tekliflerden haberdar olun.
                    Ayda sadece 1-2 email, spam yok!
                  </p>
                </div>

                {!isSubscribed ? (
                  <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <Input
                      type="email"
                      placeholder="Email adresiniz"
                      value={email}
                      onValueChange={setEmail}
                      size="lg"
                      classNames={{
                        input: "text-base",
                        inputWrapper: "border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600"
                      }}
                      startContent={<Mail className="w-5 h-5 text-gray-400" />}
                    />
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 sm:w-auto w-full"
                      onClick={handleSubscribe}
                      endContent={<Send className="w-5 h-5" />}
                    >
                      Abone Ol
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center justify-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4"
                    >
                      <Check className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      Teşekkürler! Abone oldunuz. 🎉
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Email adresinizi kontrol edin.
                    </p>
                  </motion.div>
                )}

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  Email adresinizi kimseyle paylaşmıyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="mb-6">
                <Logo size="md" animated={true} showText={true} />
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Modern işletmeler için AI destekli müşteri geri bildirim platformu. 
                Müşteri deneyiminizi bir sonraki seviyeye taşıyın.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </motion.a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Ürün</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  Feedback Collection
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  AI Analytics
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  QR Generator
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  API & Integrations
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Şirket</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  Hakkımızda
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  Blog
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  Kariyer
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  İletişim
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Destek</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  Yardım Merkezi
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  Dokümantasyon
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  API Docs
                </a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                  <ChevronDown className="w-3 h-3 mr-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                  Status Page
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-purple-400 transition-colors">Gizlilik Politikası</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Kullanım Koşulları</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Çerez Politikası</a>
                <a href="#" className="hover:text-purple-400 transition-colors">KVKK</a>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 <span className="text-purple-400 font-semibold">QRATEX</span>. Tüm hakları saklıdır.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/905XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/50 flex items-center justify-center hover:shadow-green-500/70 transition-all group relative"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp ile İletişim
          </span>
        </motion.a>

        {/* Live Chat Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl shadow-blue-500/50 flex items-center justify-center hover:shadow-blue-500/70 transition-all group relative"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Canlı Destek
          </span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </motion.button>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:shadow-purple-500/70 transition-all group relative"
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Yukarı Çık
          </span>
        </motion.button>
      </div>

      {/* Video Demo Modal */}
      <Modal 
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)}
        size="5xl"
        classNames={{
          base: "bg-transparent",
          backdrop: "bg-black/80 backdrop-blur-sm"
        }}
      >
        <ModalContent>
          <ModalHeader className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
            <div className="flex items-center space-x-3">
              <Play className="w-6 h-6" />
              <span className="text-xl font-bold">QRATEX Demo Video</span>
            </div>
          </ModalHeader>
          <ModalBody className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {/* YouTube/Video Player */}
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center rounded-b-xl">
                <div className="text-center text-white p-8">
                  <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Demo Video Yakında!</p>
                  <p className="text-sm opacity-75">
                    QRATEX'in tüm özelliklerini keşfedin
                  </p>
                </div>
                {/* Gerçek video için:
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="QRATEX Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                */}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ delay: 2 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4"
        >
          <Card className="max-w-4xl mx-auto glass backdrop-blur-xl border-white/20 shadow-2xl">
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-purple-500/10">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      🍪 Çerez Bildirimi
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. 
                      Detaylı bilgi için{' '}
                      <a href="#" className="text-purple-600 hover:underline">
                        çerez politikamıza
                      </a>{' '}
                      göz atabilirsiniz.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    size="sm"
                    variant="bordered"
                    className="border-gray-300 dark:border-gray-700"
                    onClick={() => setShowCookieBanner(false)}
                  >
                    Reddet
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    startContent={<Check className="w-4 h-4" />}
                    onClick={() => {
                      setShowCookieBanner(false)
                      localStorage.setItem('qratex-cookies-accepted', 'true')
                    }}
                  >
                    Kabul Et
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default LandingPage

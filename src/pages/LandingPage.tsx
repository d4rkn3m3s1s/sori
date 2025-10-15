import { motion } from 'framer-motion'
import { Button, Card, CardBody } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
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
  Moon
} from 'lucide-react'
import ParticleBackground from '../components/ui/ParticleBackground'
import GradientCard from '../components/ui/GradientCard'
import Logo from '../components/ui/Logo'

function LandingPage() {
  const navigate = useNavigate()

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
      avatar: '👨‍💼'
    },
    {
      name: 'Elif Kaya',
      role: 'Otel Müdürü',
      content: 'QR kod sistemi çok pratik. Müşterilerimiz kolayca geri bildirim bırakabiliyor.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Mehmet Demir',
      role: 'Kafe Sahibi',
      content: 'Canlı raporlama özelliği sayesinde sorunları hemen fark edip çözüyoruz.',
      rating: 5,
      avatar: '👨‍🍳'
    }
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
                      <div className="text-3xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
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

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="mb-4">
                <Logo size="sm" animated={false} showText={true} />
              </div>
              <p className="text-gray-400 text-sm">
                Modern işletmeler için AI destekli 
                müşteri geri bildirim platformu.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Feedback Collection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">QR Generator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Assistant</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Dashboards</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Admin Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">User Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Quick Rating</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dokümantasyon</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 QRATEX. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

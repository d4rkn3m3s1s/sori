import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Input, Avatar, Chip, ScrollShadow, Tooltip } from '@nextui-org/react'
import { 
  Bot, Send, Sparkles, TrendingUp, Gift, HelpCircle, 
  MessageSquare, Zap, Award, Trophy, Heart, ShoppingBag,
  ArrowLeft, Clock, ThumbsUp, ThumbsDown
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useNavigate } from 'react-router-dom'

// Mesaj tipi
interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  category?: string
}

// Hızlı soru kategorileri
const quickQuestions = [
  { icon: Gift, text: 'Nasıl puan kazanabilirim?', category: 'puan' },
  { icon: Award, text: 'Rozetler nasıl çalışır?', category: 'rozet' },
  { icon: Trophy, text: 'Liderlik tablosunda nasıl yükselirim?', category: 'liderlik' },
  { icon: ShoppingBag, text: 'Ödül mağazasından nasıl alışveriş yapabilirim?', category: 'ödül' },
  { icon: Heart, text: 'Bağış sistemi nedir?', category: 'bağış' },
  { icon: Sparkles, text: 'Sürpriz hediye kutuları nedir?', category: 'hediye' },
  { icon: Zap, text: 'Günlük görevler nerede?', category: 'görev' },
  { icon: TrendingUp, text: 'Seviyem nasıl artar?', category: 'seviye' }
]

// AI yanıtları (mock data)
const aiResponses: { [key: string]: string } = {
  'puan': 'Puan kazanmak için fiş taratabilir, günlük görevleri tamamlayabilir, sosyal sorumluluk projelerine katılabilir ve ödül çarkını çevirebilirsiniz! Her fiş tarama işlemi size puan kazandırır. 🎯',
  'rozet': 'Rozetler, başarılarınızı gösteren özel ödüllerdir! Farklı aktiviteleri tamamlayarak rozetler kazanabilirsiniz. Bazı rozetler çok nadir ve gizemlidir! 🏆 Rozetler sayfasına giderek tüm rozetleri görebilirsiniz.',
  'liderlik': 'Liderlik tablosunda yükselmek için düzenli olarak puan kazanmanız ve rozetler toplamanız gerekir. Haftalık ve aylık liderlik tablolarında yerinizi alabilirsiniz! Global ve Türkiye ligleri arasından seçim yapabilirsiniz. 📈',
  'ödül': 'Ödül mağazasından kazandığınız puanları kullanarak çeşitli hediyeler, indirim kuponları ve özel ödüller satın alabilirsiniz. Mağazaya gitmek için menüden "Ödül Mağazası" seçeneğini tıklayın! 🎁',
  'bağış': 'Bağış sistemi ile kazandığınız puanları sosyal sorumluluk projelerine bağışlayabilirsiniz. Fidan dikimi, su bağışı, kırtasiye bağışı gibi çeşitli projelere destek olabilirsiniz! 🌱',
  'hediye': 'Sürpriz hediye kutuları, farklı seviyelerde ödüller içeren özel kutulardır! Kazandığınız puanları kullanarak kutu açabilir ve sürpriz ödüller kazanabilirsiniz. Zaman bazlı bonuslar da var! 🎁✨',
  'görev': 'Günlük görevler Dashboard sayfanızda görünür. Her gün yeni görevler yüklenir ve tamamladığınızda ekstra puan kazanırsınız. Görevlerinizi takip etmeyi unutmayın! 🎯',
  'seviye': 'Seviyeniz, toplam puanınıza ve aktivite düzeyinize göre otomatik olarak artar. Daha yüksek seviyelerde daha fazla özellik ve ödül kilidi açılır! 🚀'
}

const AIAssistantPage = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! 👋 Ben senin AI asistanın! Size nasıl yardımcı olabilirim?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mesaj gönderme
  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    // Kullanıcı mesajı ekle
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // AI yanıtını simüle et
    setIsTyping(true)
    setTimeout(() => {
      const category = selectedCategory || detectCategory(messageText)
      const aiResponse = aiResponses[category] || 'Üzgünüm, bu konuda size yardımcı olamıyorum. Lütfen hızlı sorulardan birini seçin veya daha spesifik bir soru sorun. 🤔'
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        category
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      setSelectedCategory(null)
    }, 1500)
  }

  // Kategori tespiti (basit bir implementasyon)
  const detectCategory = (text: string): string => {
    const lowerText = text.toLowerCase()
    if (lowerText.includes('puan') || lowerText.includes('kazanmak')) return 'puan'
    if (lowerText.includes('rozet') || lowerText.includes('badge')) return 'rozet'
    if (lowerText.includes('lider') || lowerText.includes('sıralama')) return 'liderlik'
    if (lowerText.includes('ödül') || lowerText.includes('mağaza')) return 'ödül'
    if (lowerText.includes('bağış') || lowerText.includes('sosyal')) return 'bağış'
    if (lowerText.includes('hediye') || lowerText.includes('kutu')) return 'hediye'
    if (lowerText.includes('görev') || lowerText.includes('task')) return 'görev'
    if (lowerText.includes('seviye') || lowerText.includes('level')) return 'seviye'
    return 'genel'
  }

  // Hızlı soru tıklama
  const handleQuickQuestion = (question: string, category: string) => {
    setSelectedCategory(category)
    handleSendMessage(question)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🤖 AI Asistan" 
          subtitle="Size yardımcı olmak için buradayım!"
          userType="customer"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
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

            {/* Ana Chat Kartı */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-xl">
                <CardBody className="p-6">
                  {/* Chat Header */}
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Avatar
                      icon={<Bot className="w-6 h-6" />}
                      className="bg-gradient-to-br from-purple-500 to-pink-500"
                      size="lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        AI Asistan
                        <Chip size="sm" color="success" variant="flat">Çevrimiçi</Chip>
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Her zaman yanınızda, yardım için hazır!
                      </p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <ScrollShadow className="h-[500px] my-4">
                    <div className="space-y-4 pr-4">
                      <AnimatePresence>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex items-start gap-3 ${
                              message.sender === 'user' ? 'flex-row-reverse' : ''
                            }`}
                          >
                            {message.sender === 'ai' && (
                              <Avatar
                                icon={<Bot className="w-5 h-5" />}
                                className="bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0"
                                size="sm"
                              />
                            )}
                            
                            <div
                              className={`flex flex-col gap-1 max-w-[70%] ${
                                message.sender === 'user' ? 'items-end' : 'items-start'
                              }`}
                            >
                              <div
                                className={`rounded-2xl px-4 py-2 ${
                                  message.sender === 'user'
                                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                              </div>
                              <div className="flex items-center gap-2 px-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {message.timestamp.toLocaleTimeString('tr-TR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                                {message.sender === 'ai' && (
                                  <div className="flex gap-1">
                                    <Tooltip content="Yardımcı oldu">
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        className="h-5 w-5 min-w-5"
                                      >
                                        <ThumbsUp className="w-3 h-3" />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip content="Yardımcı olmadı">
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        className="h-5 w-5 min-w-5"
                                      >
                                        <ThumbsDown className="w-3 h-3" />
                                      </Button>
                                    </Tooltip>
                                  </div>
                                )}
                              </div>
                            </div>

                            {message.sender === 'user' && (
                              <Avatar
                                name="U"
                                className="bg-gradient-to-br from-green-500 to-blue-500 flex-shrink-0"
                                size="sm"
                              />
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-start gap-3"
                        >
                          <Avatar
                            icon={<Bot className="w-5 h-5" />}
                            className="bg-gradient-to-br from-purple-500 to-pink-500"
                            size="sm"
                          />
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollShadow>

                  {/* Input Area */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Mesajınızı yazın..."
                      size="lg"
                      classNames={{
                        input: "text-base",
                        inputWrapper: "bg-gray-100 dark:bg-gray-700"
                      }}
                      endContent={
                        <Button
                          isIconOnly
                          color="primary"
                          onClick={() => handleSendMessage()}
                          isDisabled={!inputValue.trim()}
                          className="bg-gradient-to-br from-blue-500 to-purple-500"
                        >
                          <Send className="w-5 h-5" />
                        </Button>
                      }
                    />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Hızlı Sorular */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Hızlı Sorular
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {quickQuestions.map((q, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="bordered"
                          className="w-full h-auto py-3 px-4 flex flex-col items-start gap-2 border-purple-200 dark:border-purple-700 hover:bg-white dark:hover:bg-gray-800"
                          onClick={() => handleQuickQuestion(q.text, q.category)}
                        >
                          <q.icon className="w-5 h-5 text-purple-500" />
                          <span className="text-sm text-left text-gray-700 dark:text-gray-300">
                            {q.text}
                          </span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Bilgi Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <CardBody className="p-6">
                    <MessageSquare className="w-8 h-8 text-blue-500 mb-3" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      7/24 Destek
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Her zaman yanınızdayım! Soru sormaktan çekinmeyin.
                    </p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardBody className="p-6">
                    <Sparkles className="w-8 h-8 text-green-500 mb-3" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Akıllı Yanıtlar
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI destekli yanıtlarla hızlı çözümler sunuyorum.
                    </p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardBody className="p-6">
                    <HelpCircle className="w-8 h-8 text-purple-500 mb-3" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Kolay Kullanım
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hızlı sorular ile kolayca yardım alabilirsiniz.
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AIAssistantPage












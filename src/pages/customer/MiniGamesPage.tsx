import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Chip, Progress, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { Gamepad2, Trophy, Star, Brain, Target, ArrowLeft, Clock, Award, Zap, Heart } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'

type GameType = 'memory' | 'word' | 'number' | null

function MiniGamesPage() {
  const navigate = useNavigate()
  const [selectedGame, setSelectedGame] = useState<GameType>(null)
  const [totalPoints, setTotalPoints] = useState(0)

  // Memory Game States
  const [memoryCards, setMemoryCards] = useState<Array<{id: number, emoji: string, flipped: boolean, matched: boolean}>>([])
  const [memoryFlippedCards, setMemoryFlippedCards] = useState<number[]>([])
  const [memoryMoves, setMemoryMoves] = useState(0)
  const [memoryTime, setMemoryTime] = useState(0)
  const [memoryStarted, setMemoryStarted] = useState(false)

  // Word Game States
  const [wordTarget, setWordTarget] = useState('')
  const [wordGuess, setWordGuess] = useState('')
  const [wordAttempts, setWordAttempts] = useState<string[]>([])
  const [wordMessage, setWordMessage] = useState('')
  const [wordWon, setWordWon] = useState(false)

  // Number Game States
  const [numberTarget, setNumberTarget] = useState(0)
  const [numberGuess, setNumberGuess] = useState('')
  const [numberAttempts, setNumberAttempts] = useState(0)
  const [numberHints, setNumberHints] = useState<string[]>([])
  const [numberWon, setNumberWon] = useState(false)

  const [showResultModal, setShowResultModal] = useState(false)
  const [gameResult, setGameResult] = useState({ points: 0, message: '' })

  // ========== MEMORY GAME ==========
  const startMemoryGame = () => {
    const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎤']
    const cards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }))
    
    setMemoryCards(cards)
    setMemoryFlippedCards([])
    setMemoryMoves(0)
    setMemoryTime(0)
    setMemoryStarted(true)

    // Start timer
    const interval = setInterval(() => {
      setMemoryTime(prev => {
        if (prev >= 120) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  const handleMemoryCardClick = (id: number) => {
    if (memoryFlippedCards.length === 2) return
    if (memoryCards[id].matched || memoryCards[id].flipped) return

    const newCards = [...memoryCards]
    newCards[id].flipped = true
    setMemoryCards(newCards)

    const newFlipped = [...memoryFlippedCards, id]
    setMemoryFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setMemoryMoves(memoryMoves + 1)
      
      const [first, second] = newFlipped
      if (memoryCards[first].emoji === memoryCards[second].emoji) {
        // Match!
        setTimeout(() => {
          const matchedCards = [...memoryCards]
          matchedCards[first].matched = true
          matchedCards[second].matched = true
          setMemoryCards(matchedCards)
          setMemoryFlippedCards([])

          // Check if game won
          if (matchedCards.every(card => card.matched)) {
            finishMemoryGame()
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...memoryCards]
          resetCards[first].flipped = false
          resetCards[second].flipped = false
          setMemoryCards(resetCards)
          setMemoryFlippedCards([])
        }, 1000)
      }
    }
  }

  const finishMemoryGame = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    
    const basePoints = 100
    const timeBonus = Math.max(0, 50 - memoryTime)
    const moveBonus = Math.max(0, 30 - memoryMoves * 2)
    const totalGamePoints = basePoints + timeBonus + moveBonus

    setTotalPoints(prev => prev + totalGamePoints)
    setGameResult({
      points: totalGamePoints,
      message: `Tebrikler! ${memoryMoves} hamle, ${memoryTime} saniye!`
    })
    setShowResultModal(true)
    setMemoryStarted(false)
  }

  // ========== WORD GAME ==========
  const startWordGame = () => {
    const words = ['ROZET', 'OYUN', 'PUAN', 'KART', 'QUIZ', 'YORUM', 'TAKIM', 'BONUS']
    const randomWord = words[Math.floor(Math.random() * words.length)]
    setWordTarget(randomWord)
    setWordGuess('')
    setWordAttempts([])
    setWordMessage('')
    setWordWon(false)
  }

  const handleWordGuess = () => {
    if (wordGuess.length !== wordTarget.length) {
      setWordMessage(`${wordTarget.length} harfli kelime girin!`)
      return
    }

    const upperGuess = wordGuess.toUpperCase()
    const newAttempts = [...wordAttempts, upperGuess]
    setWordAttempts(newAttempts)

    if (upperGuess === wordTarget) {
      // Won!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setWordWon(true)
      const points = Math.max(50, 150 - newAttempts.length * 20)
      setTotalPoints(prev => prev + points)
      setGameResult({
        points,
        message: `Doğru! ${newAttempts.length} denemede buldunuz!`
      })
      setShowResultModal(true)
    } else {
      if (newAttempts.length >= 6) {
        setWordMessage(`Oyun bitti! Kelime: ${wordTarget}`)
      } else {
        setWordMessage('Yanlış! Tekrar deneyin.')
      }
    }
    setWordGuess('')
  }

  const getLetterColor = (attempt: string, index: number) => {
    if (attempt[index] === wordTarget[index]) {
      return 'bg-green-500 text-white'
    } else if (wordTarget.includes(attempt[index])) {
      return 'bg-yellow-500 text-white'
    }
    return 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
  }

  // ========== NUMBER GAME ==========
  const startNumberGame = () => {
    const target = Math.floor(Math.random() * 100) + 1
    setNumberTarget(target)
    setNumberGuess('')
    setNumberAttempts(0)
    setNumberHints([])
    setNumberWon(false)
  }

  const handleNumberGuess = () => {
    const guess = parseInt(numberGuess)
    if (isNaN(guess) || guess < 1 || guess > 100) {
      return
    }

    const newAttempts = numberAttempts + 1
    setNumberAttempts(newAttempts)

    if (guess === numberTarget) {
      // Won!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setNumberWon(true)
      const points = Math.max(50, 200 - newAttempts * 15)
      setTotalPoints(prev => prev + points)
      setGameResult({
        points,
        message: `Doğru! ${newAttempts} denemede buldunuz!`
      })
      setShowResultModal(true)
    } else {
      const hint = guess < numberTarget 
        ? `${guess} çok küçük! Daha büyük bir sayı deneyin.`
        : `${guess} çok büyük! Daha küçük bir sayı deneyin.`
      
      setNumberHints([hint, ...numberHints])
      
      if (newAttempts >= 10) {
        setNumberHints([`Oyun bitti! Sayı ${numberTarget} idi.`, ...numberHints])
      }
    }
    setNumberGuess('')
  }

  const closeGame = () => {
    setSelectedGame(null)
    setMemoryStarted(false)
    setWordWon(false)
    setNumberWon(false)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🎮 Mini Oyunlar" 
          subtitle="Oynarken puan kazan!"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {!selectedGame && (
              <>
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

                {/* Total Points */}
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-sm opacity-90">Toplam Kazanılan Puan</p>
                        <p className="text-5xl font-bold">{totalPoints}</p>
                      </div>
                      <Trophy className="w-16 h-16 opacity-20" />
                    </div>
                  </CardBody>
                </Card>

                {/* Game Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Memory Game */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card isPressable onPress={() => setSelectedGame('memory')} className="h-full">
                      <CardBody className="p-6">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                            <Brain className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            Hafıza Oyunu
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Kartları eşleştir, hafızanı test et!
                          </p>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <Chip color="warning" variant="flat" startContent={<Star className="w-3 h-3" />}>
                              100-180 Puan
                            </Chip>
                          </div>
                          <Button color="primary" className="w-full" size="lg">
                            Oyna
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>

                  {/* Word Game */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card isPressable onPress={() => setSelectedGame('word')} className="h-full">
                      <CardBody className="p-6">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <Target className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            Kelime Bulma
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            6 denemede kelimeyi bul!
                          </p>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <Chip color="success" variant="flat" startContent={<Star className="w-3 h-3" />}>
                              50-150 Puan
                            </Chip>
                          </div>
                          <Button color="primary" className="w-full" size="lg">
                            Oyna
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>

                  {/* Number Game */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card isPressable onPress={() => setSelectedGame('number')} className="h-full">
                      <CardBody className="p-6">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                            <Zap className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            Sayı Tahmin
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            1-100 arası sayıyı tahmin et!
                          </p>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <Chip color="danger" variant="flat" startContent={<Star className="w-3 h-3" />}>
                              50-200 Puan
                            </Chip>
                          </div>
                          <Button color="primary" className="w-full" size="lg">
                            Oyna
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                </div>
              </>
            )}

            {/* MEMORY GAME */}
            {selectedGame === 'memory' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <Button
                    variant="light"
                    startContent={<ArrowLeft className="w-4 h-4" />}
                    onClick={closeGame}
                  >
                    Geri
                  </Button>
                  {!memoryStarted ? (
                    <Button
                      color="primary"
                      size="lg"
                      onClick={startMemoryGame}
                      startContent={<Gamepad2 className="w-5 h-5" />}
                    >
                      Oyunu Başlat
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Chip size="lg" variant="flat">
                        <Clock className="w-4 h-4 mr-1" />
                        {memoryTime}s
                      </Chip>
                      <Chip size="lg" variant="flat">
                        Hamle: {memoryMoves}
                      </Chip>
                    </div>
                  )}
                </div>

                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                      🧠 Hafıza Oyunu
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                      Aynı emojileri eşleştirin!
                    </p>

                    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                      {memoryCards.map((card) => (
                        <motion.div
                          key={card.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Card
                            isPressable={!card.matched && !card.flipped}
                            onPress={() => handleMemoryCardClick(card.id)}
                            className={`aspect-square ${
                              card.matched ? 'bg-green-100 dark:bg-green-900/20' : ''
                            }`}
                          >
                            <CardBody className="flex items-center justify-center p-0">
                              <div className="text-5xl">
                                {card.flipped || card.matched ? card.emoji : '❓'}
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* WORD GAME */}
            {selectedGame === 'word' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <Button
                    variant="light"
                    startContent={<ArrowLeft className="w-4 h-4" />}
                    onClick={closeGame}
                  >
                    Geri
                  </Button>
                  {!wordTarget && (
                    <Button
                      color="primary"
                      size="lg"
                      onClick={startWordGame}
                      startContent={<Gamepad2 className="w-5 h-5" />}
                    >
                      Oyunu Başlat
                    </Button>
                  )}
                </div>

                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                      🎯 Kelime Bulma
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                      {wordTarget ? `${wordTarget.length} harfli kelime - 6 deneme hakkınız var` : 'Başlamak için butona tıklayın'}
                    </p>

                    {wordTarget && !wordWon && wordAttempts.length < 6 && (
                      <div className="max-w-md mx-auto mb-6">
                        <div className="flex gap-2">
                          <Input
                            value={wordGuess}
                            onChange={(e) => setWordGuess(e.target.value.toUpperCase())}
                            placeholder="Tahmininizi girin"
                            size="lg"
                            maxLength={wordTarget.length}
                            onKeyPress={(e) => e.key === 'Enter' && handleWordGuess()}
                          />
                          <Button color="primary" size="lg" onClick={handleWordGuess}>
                            Tahmin Et
                          </Button>
                        </div>
                        {wordMessage && (
                          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {wordMessage}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="max-w-md mx-auto space-y-2">
                      {wordAttempts.map((attempt, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-2 justify-center"
                        >
                          {attempt.split('').map((letter, letterIdx) => (
                            <div
                              key={letterIdx}
                              className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-xl ${getLetterColor(attempt, letterIdx)}`}
                            >
                              {letter}
                            </div>
                          ))}
                        </motion.div>
                      ))}
                    </div>

                    {wordTarget && (
                      <div className="mt-6 text-center">
                        <Progress
                          value={(wordAttempts.length / 6) * 100}
                          className="max-w-md mx-auto"
                          color={wordAttempts.length > 4 ? 'danger' : 'primary'}
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {wordAttempts.length} / 6 deneme
                        </p>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* NUMBER GAME */}
            {selectedGame === 'number' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <Button
                    variant="light"
                    startContent={<ArrowLeft className="w-4 h-4" />}
                    onClick={closeGame}
                  >
                    Geri
                  </Button>
                  {!numberTarget && (
                    <Button
                      color="primary"
                      size="lg"
                      onClick={startNumberGame}
                      startContent={<Gamepad2 className="w-5 h-5" />}
                    >
                      Oyunu Başlat
                    </Button>
                  )}
                </div>

                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                      ⚡ Sayı Tahmin
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                      1-100 arası bir sayı tuttum. Tahmin et!
                    </p>

                    {numberTarget && !numberWon && numberAttempts < 10 && (
                      <div className="max-w-md mx-auto mb-6">
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={numberGuess}
                            onChange={(e) => setNumberGuess(e.target.value)}
                            placeholder="1-100 arası sayı"
                            size="lg"
                            min={1}
                            max={100}
                            onKeyPress={(e) => e.key === 'Enter' && handleNumberGuess()}
                          />
                          <Button color="primary" size="lg" onClick={handleNumberGuess}>
                            Tahmin Et
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="max-w-md mx-auto space-y-2">
                      <AnimatePresence>
                        {numberHints.map((hint, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <Card className={idx === 0 ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                              <CardBody className="p-3">
                                <p className="text-center text-sm">{hint}</p>
                              </CardBody>
                            </Card>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {numberTarget && (
                      <div className="mt-6 text-center">
                        <Chip size="lg" variant="flat">
                          Deneme: {numberAttempts} / 10
                        </Chip>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            )}

          </div>
        </main>
      </div>

      {/* Result Modal */}
      <Modal isOpen={showResultModal} onClose={() => setShowResultModal(false)} size="md">
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>Tebrikler!</span>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="text-center py-6">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-xl font-bold mb-2">{gameResult.message}</p>
              <Chip size="lg" color="warning" variant="solid" className="text-lg px-6 py-6">
                <Star className="w-5 h-5 mr-2" />
                +{gameResult.points} Puan
              </Chip>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={() => {
              setShowResultModal(false)
              closeGame()
            }} className="w-full">
              Tamam
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MiniGamesPage

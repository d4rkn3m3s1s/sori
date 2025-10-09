import confetti from 'canvas-confetti'

export function useConfetti() {
  const fireConfetti = (options?: {
    particleCount?: number
    spread?: number
    origin?: { x?: number; y?: number }
    colors?: string[]
  }) => {
    const defaults = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
    }
    
    confetti({
      ...defaults,
      ...options
    })
  }

  const fireworksConfetti = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
      })
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#96CEB4', '#FFEAA7', '#DDA0DD']
      })
    }, 250)
  }

  const schoolPride = () => {
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ['#FF6B6B', '#4ECDC4']
    })
    
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ['#45B7D1', '#96CEB4']
    })
  }

  const starConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star' as const],
      colors: ['#FFE400', '#FFBD00', '#E89611', '#E89611', '#FFCA28']
    }

    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 1.2,
      shapes: ['star' as const]
    })

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 0.75,
      shapes: ['circle' as const]
    })
  }

  const emojiConfetti = (emojis: string[] = ['🎉', '🎊', '🥳', '✨', '🌟']) => {
    const scalar = 2
    const unicorn = confetti.shapeFromText({ text: emojis[Math.floor(Math.random() * emojis.length)], scalar })

    confetti({
      shapes: [unicorn],
      particleCount: 25,
      spread: 100,
      scalar
    })
  }

  return {
    fireConfetti,
    fireworksConfetti,
    schoolPride,
    starConfetti,
    emojiConfetti
  }
}


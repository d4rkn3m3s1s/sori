import { useEffect, useState } from 'react'
import { useConfetti } from './useConfetti'
import { useToast } from '../contexts/ToastContext'

export function useEasterEggs() {
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const { fireworksConfetti, emojiConfetti } = useConfetti()
  const { showToast } = useToast()

  // Konami Code: ↑↑↓↓←→←→BA
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...konamiSequence, event.code].slice(-10)
      setKonamiSequence(newSequence)

      // Check if Konami code is completed
      if (newSequence.length === 10 && newSequence.every((key, index) => key === konamiCode[index])) {
        triggerKonamiEasterEgg()
        setKonamiSequence([])
      }

      // Secret shortcuts
      if (event.ctrlKey && event.shiftKey) {
        switch (event.code) {
          case 'KeyP': // Ctrl+Shift+P = Party mode
            event.preventDefault()
            triggerPartyMode()
            break
          case 'KeyR': // Ctrl+Shift+R = Rainbow mode
            event.preventDefault()
            triggerRainbowMode()
            break
          case 'KeyU': // Ctrl+Shift+U = Unicorn mode
            event.preventDefault()
            triggerUnicornMode()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [konamiSequence])

  const triggerKonamiEasterEgg = () => {
    fireworksConfetti()
    showToast({
      type: 'success',
      title: '🎮 Konami Code Activated!',
      message: 'You found the secret! 30 extra points awarded! 🎉',
      duration: 8000
    })
    
    // Add rainbow effect to body
    document.body.style.animation = 'rainbow 2s infinite'
    setTimeout(() => {
      document.body.style.animation = ''
    }, 10000)
  }

  const triggerPartyMode = () => {
    fireworksConfetti()
    emojiConfetti(['🎉', '🎊', '🥳', '🎈', '🎁'])
    
    showToast({
      type: 'success',
      title: '🎉 Party Mode Activated!',
      message: 'Let\'s celebrate! 🥳',
      duration: 5000
    })

    // Add party animation
    document.body.classList.add('party-mode')
    setTimeout(() => {
      document.body.classList.remove('party-mode')
    }, 5000)
  }

  const triggerRainbowMode = () => {
    emojiConfetti(['🌈', '✨', '🦄', '💫', '🌟'])
    
    showToast({
      type: 'info',
      title: '🌈 Rainbow Mode!',
      message: 'Colors everywhere! ✨',
      duration: 5000
    })

    // Add rainbow background
    const originalBg = document.body.style.background
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)'
    document.body.style.backgroundSize = '400% 400%'
    document.body.style.animation = 'rainbow-bg 3s ease infinite'
    
    setTimeout(() => {
      document.body.style.background = originalBg
      document.body.style.animation = ''
    }, 5000)
  }

  const triggerUnicornMode = () => {
    emojiConfetti(['🦄', '✨', '💖', '🌟', '💫'])
    
    showToast({
      type: 'success',
      title: '🦄 Unicorn Mode!',
      message: 'Magical unicorns everywhere! ✨💖',
      duration: 5000
    })

    // Add sparkle cursor
    document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Ctext y=\'24\' font-size=\'24\'%3E✨%3C/text%3E%3C/svg%3E"), auto'
    
    setTimeout(() => {
      document.body.style.cursor = ''
    }, 10000)
  }

  // Triple click easter egg
  const handleTripleClick = () => {
    const now = Date.now()
    
    if (now - lastClickTime < 500) {
      setClickCount(prev => prev + 1)
    } else {
      setClickCount(1)
    }
    
    setLastClickTime(now)

    if (clickCount >= 2) { // Triple click
      emojiConfetti(['🎯', '💥', '⚡', '🔥'])
      showToast({
        type: 'warning',
        title: '🎯 Triple Click Master!',
        message: 'You\'re fast! 🔥',
        duration: 3000
      })
      setClickCount(0)
    }
  }

  // Secret badge unlock
  const triggerSecretBadge = () => {
    emojiConfetti(['🏆', '👑', '💎', '⭐'])
    showToast({
      type: 'success',
      title: '🏆 Secret Badge Unlocked!',
      message: 'Easter Egg Hunter - You found a hidden secret! 🕵️‍♂️',
      duration: 8000
    })
  }

  return {
    handleTripleClick,
    triggerSecretBadge,
    triggerPartyMode,
    triggerRainbowMode,
    triggerUnicornMode
  }
}


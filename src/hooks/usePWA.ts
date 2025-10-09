import { useState, useEffect } from 'react'

interface PWAInstallPrompt {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface PWAState {
  isInstallable: boolean
  isInstalled: boolean
  isOnline: boolean
  isStandalone: boolean
  installPrompt: PWAInstallPrompt | null
}

export function usePWA() {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOnline: navigator.onLine,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
    installPrompt: null
  })

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any).standalone

      setPwaState(prev => ({
        ...prev,
        isInstalled: isStandalone || (isIOS && isInStandaloneMode),
        isStandalone
      }))
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setPwaState(prev => ({
        ...prev,
        isInstallable: true,
        installPrompt: e as any
      }))
    }

    // Listen for app installed
    const handleAppInstalled = () => {
      setPwaState(prev => ({
        ...prev,
        isInstallable: false,
        isInstalled: true,
        installPrompt: null
      }))
    }

    // Listen for online/offline status
    const handleOnline = () => {
      setPwaState(prev => ({ ...prev, isOnline: true }))
    }

    const handleOffline = () => {
      setPwaState(prev => ({ ...prev, isOnline: false }))
    }

    // Register service worker
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js')
          console.log('Service Worker registered successfully:', registration)
        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }
    }

    // Initial setup
    checkInstalled()
    registerServiceWorker()

    // Event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Install PWA
  const installPWA = async () => {
    if (!pwaState.installPrompt) {
      return { success: false, error: 'Install prompt not available' }
    }

    try {
      await pwaState.installPrompt.prompt()
      const choiceResult = await pwaState.installPrompt.userChoice
      
      if (choiceResult.outcome === 'accepted') {
        setPwaState(prev => ({
          ...prev,
          isInstallable: false,
          installPrompt: null
        }))
        return { success: true }
      } else {
        return { success: false, error: 'User dismissed install prompt' }
      }
    } catch (error) {
      return { success: false, error: 'Installation failed' }
    }
  }

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      return { success: false, error: 'Notifications not supported' }
    }

    if (Notification.permission === 'granted') {
      return { success: true, permission: 'granted' }
    }

    if (Notification.permission === 'denied') {
      return { success: false, error: 'Notifications blocked' }
    }

    try {
      const permission = await Notification.requestPermission()
      return { success: permission === 'granted', permission }
    } catch (error) {
      return { success: false, error: 'Permission request failed' }
    }
  }

  // Show notification
  const showNotification = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options
      })
    }
  }

  // Check if PWA features are supported
  const isPWASupported = () => {
    return 'serviceWorker' in navigator && 'PushManager' in window
  }

  return {
    ...pwaState,
    installPWA,
    requestNotificationPermission,
    showNotification,
    isPWASupported: isPWASupported()
  }
}


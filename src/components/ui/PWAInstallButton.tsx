import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, CardBody } from '@nextui-org/react'
import { Download, Smartphone, X, CheckCircle, Wifi, WifiOff } from 'lucide-react'
import { usePWA } from '../../hooks/usePWA'

interface PWAInstallButtonProps {
  variant?: 'default' | 'banner' | 'floating'
  className?: string
}

export function PWAInstallButton({ variant = 'default', className = '' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isOnline, installPWA, isPWASupported } = usePWA()
  const [isInstalling, setIsInstalling] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  // Show banner for installable PWA
  useEffect(() => {
    if (isInstallable && !isInstalled) {
      setTimeout(() => setShowBanner(true), 3000) // Show after 3 seconds
    }
  }, [isInstallable, isInstalled])

  const handleInstall = async () => {
    setIsInstalling(true)
    const result = await installPWA()
    setIsInstalling(false)
    
    if (result.success) {
      setShowBanner(false)
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    // Remember dismissal for this session
    sessionStorage.setItem('pwa-banner-dismissed', 'true')
  }

  // Don't show if not supported or already installed
  if (!isPWASupported || isInstalled) {
    return null
  }

  // Banner variant
  if (variant === 'banner' && showBanner && isInstallable) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
        >
          <Card className="bg-transparent border-white/20">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Qratex'i Yükle</h3>
                    <p className="text-sm text-white/90">
                      Daha hızlı erişim için uygulamayı cihazınıza yükleyin
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                    onClick={handleInstall}
                    isLoading={isInstalling}
                    startContent={!isInstalling && <Download className="w-4 h-4" />}
                  >
                    {isInstalling ? 'Yükleniyor...' : 'Yükle'}
                  </Button>
                  
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-white hover:bg-white/20"
                    onClick={handleDismiss}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Floating variant
  if (variant === 'floating' && isInstallable) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          isIconOnly
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
          onClick={handleInstall}
          isLoading={isInstalling}
        >
          {!isInstalling && <Download className="w-6 h-6" />}
        </Button>
      </motion.div>
    )
  }

  // Default variant
  if (variant === 'default' && isInstallable) {
    return (
      <Button
        className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white ${className}`}
        startContent={<Download className="w-4 h-4" />}
        onClick={handleInstall}
        isLoading={isInstalling}
      >
        {isInstalling ? 'Yükleniyor...' : 'Uygulamayı Yükle'}
      </Button>
    )
  }

  return null
}

// Online/Offline indicator
export function NetworkStatus() {
  const { isOnline } = usePWA()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-4 right-4 z-50"
    >
      <Card className={`${isOnline ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        <CardBody className="p-2">
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
            </span>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

// PWA Status Card
export function PWAStatusCard() {
  const { isInstalled, isOnline, isPWASupported } = usePWA()

  return (
    <Card className="w-full">
      <CardBody className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isInstalled ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {isInstalled ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Smartphone className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                PWA Durumu
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isInstalled ? 'Uygulama yüklü' : 'Web uygulaması'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
            </span>
          </div>
        </div>
        
        {!isPWASupported && (
          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              PWA özellikleri bu tarayıcıda desteklenmiyor
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

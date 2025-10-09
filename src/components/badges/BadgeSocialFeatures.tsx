import { useState } from 'react'
import { Card, CardBody, Button, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { Share2, Users, Trophy, Copy, Check } from 'lucide-react'
import { Badge } from '../../types/badge'

interface BadgeSocialFeaturesProps {
  badge: Badge
  isVisible: boolean
  onClose: () => void
}

function BadgeSocialFeatures({ badge, isVisible, onClose }: BadgeSocialFeaturesProps) {
  const [copied, setCopied] = useState(false)
  const [shareMethod, setShareMethod] = useState<'link' | 'image' | 'story'>('link')

  const shareUrl = `https://qratex.com/badge/${badge.id}`
  const shareText = `🏆 "${badge.name}" rozetini kazandım! ${badge.description}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Kopyalama hatası:', err)
    }
  }

  const handleSocialShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    }

    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
  }

  return (
    <Modal isOpen={isVisible} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${badge.gradient} rounded-lg flex items-center justify-center`}>
              <span className="text-2xl">{badge.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Rozeti Paylaş</h3>
              <p className="text-sm text-gray-500">Başarını arkadaşlarınla paylaş!</p>
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
          {/* Rozet Önizleme */}
          <Card className={`bg-gradient-to-br ${badge.gradient} mb-6`}>
            <CardBody className="p-6 text-center text-white">
              <div className="text-6xl mb-4">{badge.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{badge.name}</h3>
              <p className="text-white/90 mb-4">{badge.description}</p>
              <div className="flex justify-center space-x-4">
                <div className="bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium">+{badge.points} Puan</span>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium capitalize">{badge.rarity}</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Paylaşım Seçenekleri */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Paylaşım Yöntemi Seç:</h4>
            
            {/* Hızlı Kopyala */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleCopyLink}>
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-500" />}
                    </div>
                    <div>
                      <p className="font-medium">Linki Kopyala</p>
                      <p className="text-sm text-gray-500">Hızlı paylaşım için</p>
                    </div>
                  </div>
                  {copied && (
                    <span className="text-sm text-green-500 font-medium">Kopyalandı!</span>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Sosyal Medya Platformları */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-16 bg-blue-500 text-white"
                onClick={() => handleSocialShare('twitter')}
                startContent={<Share2 className="w-5 h-5" />}
              >
                Twitter
              </Button>
              
              <Button
                className="h-16 bg-blue-600 text-white"
                onClick={() => handleSocialShare('facebook')}
                startContent={<Share2 className="w-5 h-5" />}
              >
                Facebook
              </Button>
              
              <Button
                className="h-16 bg-blue-700 text-white"
                onClick={() => handleSocialShare('linkedin')}
                startContent={<Share2 className="w-5 h-5" />}
              >
                LinkedIn
              </Button>
              
              <Button
                className="h-16 bg-green-500 text-white"
                onClick={() => handleSocialShare('whatsapp')}
                startContent={<Share2 className="w-5 h-5" />}
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Arkadaş Karşılaştırması */}
          <Card className="mt-6">
            <CardBody className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-5 h-5 text-gray-500" />
                <h4 className="font-semibold">Arkadaşların Bu Rozete Sahip Mi?</h4>
              </div>
              
              <div className="flex space-x-3">
                <Avatar src="/api/placeholder/32/32" size="sm" />
                <Avatar src="/api/placeholder/32/32" size="sm" />
                <Avatar src="/api/placeholder/32/32" size="sm" />
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">+5</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                8 arkadaşın da bu rozete sahip
              </p>
            </CardBody>
          </Card>
        </ModalBody>

        <ModalFooter>
          <Button variant="bordered" onPress={onClose}>
            Kapat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BadgeSocialFeatures

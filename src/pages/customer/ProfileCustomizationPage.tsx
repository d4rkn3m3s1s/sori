import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Button, Input, Textarea, Avatar, Chip, Tabs, Tab, Switch } from '@nextui-org/react'
import { User, Palette, Award, Eye, Save, Camera, Sparkles, Shield, Bell, Lock, Globe } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { BADGE_LEVELS } from '../../data/badges'
import { TV_SHOW_BADGES } from '../../data/tvShowBadges'

interface ProfileSettings {
  displayName: string
  bio: string
  avatar: string
  showcaseBadges: string[]
  theme: string
  accentColor: string
  privacy: {
    showProfile: boolean
    showBadges: boolean
    showStats: boolean
    showActivity: boolean
  }
  notifications: {
    email: boolean
    push: boolean
    badges: boolean
    comments: boolean
  }
}

function ProfileCustomizationPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [userLeague] = useState('harmony') // Kullanıcının lig seviyesi (simüle edilmiş)
  const [profile, setProfile] = useState<ProfileSettings>({
    displayName: 'Didar Mıhçı',
    bio: 'QR-tex topluluğunun aktif üyesi 🌟 Her yorumla fark yaratıyorum!',
    avatar: '/images/avatar-girl-braids.png',
    showcaseBadges: ['barney-stinson', 'sherlock-holmes', 'joker'],
    theme: 'purple',
    accentColor: '#8B5CF6',
    privacy: {
      showProfile: true,
      showBadges: true,
      showStats: true,
      showActivity: false
    },
    notifications: {
      email: true,
      push: true,
      badges: true,
      comments: false
    }
  })

  // Avatar kategorileri
  const avatarCategories = {
    premium: {
      name: '3D Avatarlar Premium ✨',
      icon: '🎨',
      items: [
        { type: 'image', src: '/images/avatar-girl-braids.png', alt: 'Saç Örgülü Kız' },
      ]
    },
    '3d': {
      name: '3D Emojiler ✨',
      icon: '👤',
      items: ['👦', '👧', '🧑', '👨', '👩', '🧒', '👴', '👵', '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🧑‍💼', '👨‍💼', '👩‍💼', '🧑‍🎨', '👨‍🎨'].map(emoji => ({ type: 'emoji', value: emoji }))
    },
    faces: {
      name: 'Yüzler',
      icon: '😊',
      items: ['😀', '😁', '😎', '🤓', '🥳', '😇', '🤠', '🥸', '😈', '👻', '💀', '🤡', '👹', '👺', '🤖', '👽'].map(emoji => ({ type: 'emoji', value: emoji }))
    },
    animals: {
      name: 'Hayvanlar',
      icon: '🐱',
      items: ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'].map(emoji => ({ type: 'emoji', value: emoji }))
    },
    fantasy: {
      name: 'Fantastik',
      icon: '🦄',
      items: ['🦄', '🐉', '🐲', '🦖', '🦕', '🐙', '🦑', '🦋', '🐝', '🐞', '🦗', '🕷️', '🦂', '🦀', '🦞', '🐢'].map(emoji => ({ type: 'emoji', value: emoji }))
    },
    objects: {
      name: 'Objeler',
      icon: '⭐',
      items: ['⭐', '🌟', '✨', '💫', '🔥', '💧', '⚡', '☄️', '💎', '👑', '🎭', '🎨', '🎮', '🎯', '🎪', '🎬'].map(emoji => ({ type: 'emoji', value: emoji }))
    },
    food: {
      name: 'Yiyecekler',
      icon: '🍕',
      items: ['🍕', '🍔', '🌮', '🍟', '🍿', '🧋', '🍩', '🍪', '🎂', '🍰', '🧁', '🍓', '🍉', '🍊', '🍌', '🥑'].map(emoji => ({ type: 'emoji', value: emoji }))
    },
    symbols: {
      name: 'Semboller',
      icon: '💯',
      items: ['💯', '🔥', '💪', '🚀', '🎯', '🏆', '🥇', '🥈', '🥉', '🎖️', '🏅', '⚔️', '🛡️', '🎓', '📚', '🔮'].map(emoji => ({ type: 'emoji', value: emoji }))
    }
  }

  // Avatar arkaplan renkleri
  const avatarBackgrounds = [
    { name: 'Gökyüzü Mavi 🌤️', gradient: 'bg-gradient-to-br from-sky-400 to-blue-500', border: 'border-sky-400' },
    { name: 'Pembe Bulut ☁️', gradient: 'bg-gradient-to-br from-pink-300 to-purple-400', border: 'border-pink-300' },
    { name: 'Mor Rüya 💜', gradient: 'bg-gradient-to-br from-purple-400 to-pink-400', border: 'border-purple-400' },
    { name: 'Turkuaz Okyanus 🌊', gradient: 'bg-gradient-to-br from-cyan-400 to-blue-500', border: 'border-cyan-400' },
    { name: 'Neon Yeşil 💚', gradient: 'bg-gradient-to-br from-green-400 to-emerald-500', border: 'border-green-400' },
    { name: 'Gün Batımı 🌅', gradient: 'bg-gradient-to-br from-orange-400 to-red-500', border: 'border-orange-400' },
    { name: 'Altın Işık ✨', gradient: 'bg-gradient-to-br from-yellow-300 to-orange-400', border: 'border-yellow-400' },
    { name: 'Gümüş Glow 🪙', gradient: 'bg-gradient-to-br from-gray-300 to-slate-400', border: 'border-gray-400' },
    { name: 'Gökkuşağı 🌈', gradient: 'bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400', border: 'border-pink-400' },
    { name: 'Beyaz ⚪', gradient: 'bg-white', border: 'border-gray-200' },
  ]

  // Avatar çerçeveleri (lig seviyesine göre)
  const avatarFrames = [
    { 
      name: 'Çerçevesiz', 
      style: 'border-4 border-gray-200',
      requiredLeague: 'bronze',
      shadow: 'shadow-lg'
    },
    { 
      name: 'Bronz', 
      style: 'border-4 border-amber-700',
      requiredLeague: 'bronze',
      shadow: 'shadow-lg shadow-amber-700/30'
    },
    { 
      name: 'Gümüş', 
      style: 'border-4 border-gray-400',
      requiredLeague: 'silver',
      shadow: 'shadow-xl shadow-gray-400/40'
    },
    { 
      name: 'Altın', 
      style: 'border-4 border-yellow-400',
      requiredLeague: 'gold',
      shadow: 'shadow-xl shadow-yellow-400/50',
      animated: true
    },
    { 
      name: 'Platin', 
      style: 'border-4 border-cyan-400',
      requiredLeague: 'platinum',
      shadow: 'shadow-2xl shadow-cyan-400/60',
      animated: true
    },
    { 
      name: 'Elmas', 
      style: 'border-[6px] border-blue-300',
      requiredLeague: 'diamond',
      shadow: 'shadow-2xl shadow-blue-300/70',
      animated: true,
      glow: true
    },
    { 
      name: 'Gökkuşağı', 
      style: 'border-[6px]',
      gradient: 'border-gradient-rainbow',
      requiredLeague: 'master',
      shadow: 'shadow-2xl shadow-purple-500/70',
      animated: true,
      glow: true
    },
    { 
      name: 'Efsanevi', 
      style: 'border-[8px]',
      gradient: 'border-gradient-legendary',
      requiredLeague: 'legendary',
      shadow: 'shadow-2xl shadow-yellow-500/80',
      animated: true,
      glow: true,
      particles: true
    },
  ]

  // Renk paletleri - lig seviyesine göre kilitleme
  const themeColors = [
    // Temel renkler - Herkes için
    { 
      name: 'purple', 
      color: '#8B5CF6', 
      gradient: 'from-purple-500 to-pink-500',
      requiredLeague: 'bronze',
      leagueName: 'Bronz'
    },
    { 
      name: 'blue', 
      color: '#3B82F6', 
      gradient: 'from-blue-500 to-cyan-500',
      requiredLeague: 'bronze',
      leagueName: 'Bronz'
    },
    { 
      name: 'green', 
      color: '#10B981', 
      gradient: 'from-green-500 to-emerald-500',
      requiredLeague: 'bronze',
      leagueName: 'Bronz'
    },
    
    // Gelişmiş renkler - Gümüş+
    { 
      name: 'ocean', 
      color: '#0EA5E9', 
      gradient: 'from-sky-500 via-blue-500 to-indigo-500',
      requiredLeague: 'silver',
      leagueName: 'Gümüş'
    },
    { 
      name: 'sunset', 
      color: '#F59E0B', 
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      requiredLeague: 'silver',
      leagueName: 'Gümüş'
    },
    { 
      name: 'forest', 
      color: '#059669', 
      gradient: 'from-emerald-600 via-green-500 to-teal-500',
      requiredLeague: 'silver',
      leagueName: 'Gümüş'
    },
    
    // Premium renkler - Altın+
    { 
      name: 'royal', 
      color: '#7C3AED', 
      gradient: 'from-violet-600 via-purple-600 to-indigo-600',
      requiredLeague: 'gold',
      leagueName: 'Altın'
    },
    { 
      name: 'fire', 
      color: '#DC2626', 
      gradient: 'from-red-600 via-orange-600 to-yellow-500',
      requiredLeague: 'gold',
      leagueName: 'Altın'
    },
    { 
      name: 'mint', 
      color: '#14B8A6', 
      gradient: 'from-teal-400 via-cyan-500 to-blue-400',
      requiredLeague: 'gold',
      leagueName: 'Altın'
    },
    
    // Özel renkler - Platin+
    { 
      name: 'aurora', 
      color: '#A855F7', 
      gradient: 'from-purple-400 via-pink-400 to-rose-400',
      requiredLeague: 'platinum',
      leagueName: 'Platin'
    },
    { 
      name: 'galaxy', 
      color: '#6366F1', 
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      requiredLeague: 'platinum',
      leagueName: 'Platin'
    },
    { 
      name: 'cyber', 
      color: '#06B6D4', 
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      requiredLeague: 'platinum',
      leagueName: 'Platin'
    },
    
    // Elite renkler - Elmas+
    { 
      name: 'diamond', 
      color: '#38BDF8', 
      gradient: 'from-blue-300 via-cyan-300 to-teal-200',
      requiredLeague: 'diamond',
      leagueName: 'Elmas'
    },
    { 
      name: 'ruby', 
      color: '#F43F5E', 
      gradient: 'from-rose-500 via-red-500 to-pink-600',
      requiredLeague: 'diamond',
      leagueName: 'Elmas'
    },
    { 
      name: 'emerald', 
      color: '#10B981', 
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
      requiredLeague: 'diamond',
      leagueName: 'Elmas'
    },
    
    // Efsanevi renkler - Usta+
    { 
      name: 'phoenix', 
      color: '#FB923C', 
      gradient: 'from-yellow-400 via-orange-500 to-red-600',
      requiredLeague: 'master',
      leagueName: 'Usta'
    },
    { 
      name: 'midnight', 
      color: '#312E81', 
      gradient: 'from-indigo-900 via-purple-800 to-violet-700',
      requiredLeague: 'master',
      leagueName: 'Usta'
    },
    { 
      name: 'neon', 
      color: '#22D3EE', 
      gradient: 'from-cyan-400 via-teal-400 to-green-400',
      requiredLeague: 'master',
      leagueName: 'Usta'
    },
    
    // Mitolojik renkler - Efsanevi
    { 
      name: 'legendary', 
      color: '#FBBF24', 
      gradient: 'from-amber-300 via-yellow-400 to-orange-500',
      requiredLeague: 'legendary',
      leagueName: 'Efsanevi',
      animated: true
    },
    { 
      name: 'mythic', 
      color: '#C026D3', 
      gradient: 'from-fuchsia-500 via-purple-600 to-indigo-600',
      requiredLeague: 'legendary',
      leagueName: 'Efsanevi',
      animated: true
    },
    { 
      name: 'cosmic', 
      color: '#8B5CF6', 
      gradient: 'from-purple-600 via-blue-600 to-cyan-500',
      requiredLeague: 'legendary',
      leagueName: 'Efsanevi',
      animated: true
    },
  ]

  // Lig seviyesine göre tema kontrolü
  const leagueOrder = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'legendary', 'harmony']
  
  const isThemeUnlocked = (requiredLeague: string) => {
    const userIndex = leagueOrder.indexOf(userLeague)
    const requiredIndex = leagueOrder.indexOf(requiredLeague)
    return userIndex >= requiredIndex
  }

  // Avatar state'leri
  const [selectedAvatarCategory, setSelectedAvatarCategory] = useState<string>('faces')
  const [avatarBackground, setAvatarBackground] = useState('bg-white')
  const [avatarFrame, setAvatarFrame] = useState('border-4 border-gray-200')

  const allBadges = [...TV_SHOW_BADGES.filter(b => b.unlocked).slice(0, 12)]

  const handleSave = () => {
    // Save logic here
    alert('Profil ayarların kaydedildi! ✨')
  }

  const toggleShowcaseBadge = (badgeId: string) => {
    if (profile.showcaseBadges.includes(badgeId)) {
      setProfile({
        ...profile,
        showcaseBadges: profile.showcaseBadges.filter(id => id !== badgeId)
      })
    } else if (profile.showcaseBadges.length < 6) {
      setProfile({
        ...profile,
        showcaseBadges: [...profile.showcaseBadges, badgeId]
      })
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="🎨 Profil Özelleştirme" 
          subtitle="Profilini kişiselleştir, tarzını yansıt"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Profile Preview */}
            <Card className={`bg-gradient-to-br ${themeColors.find(t => t.name === profile.theme)?.gradient || 'from-purple-500 via-pink-500 to-orange-500'}`}>
              <CardBody className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`w-24 h-24 ${avatarBackground} rounded-full flex items-center justify-center ${profile.avatar.startsWith('/images/') ? 'p-2 overflow-hidden' : 'text-5xl'} ${avatarFrame} shadow-xl`}
                      >
                        {profile.avatar.startsWith('/images/') ? (
                          <img 
                            src={profile.avatar} 
                            alt="Profile Avatar" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : profile.avatar}
                      </motion.div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-2 -right-2"
                      >
                        <Sparkles className="w-8 h-8 text-yellow-300" />
                      </motion.div>
                    </div>
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-2">{profile.displayName}</h2>
                      <p className="text-white/90 mb-3 max-w-md">{profile.bio}</p>
                      <div className="flex items-center space-x-2">
                        <Chip 
                          size="sm" 
                          className="bg-white/20 text-white font-bold"
                          startContent={<Award className="w-3 h-3" />}
                        >
                          Ahenk Ligi
                        </Chip>
                        <Chip 
                          size="sm" 
                          className="bg-white/20 text-white font-bold"
                          startContent={<Eye className="w-3 h-3" />}
                        >
                          {profile.showcaseBadges.length} Vitrin Rozeti
                        </Chip>
                        <Chip 
                          size="sm" 
                          className="bg-white/20 text-white font-bold"
                          startContent={<Palette className="w-3 h-3" />}
                        >
                          Tema: {profile.theme}
                        </Chip>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="bg-white font-bold"
                    style={{ color: profile.accentColor }}
                    startContent={<Save className="w-5 h-5" />}
                    onPress={handleSave}
                  >
                    Kaydet
                  </Button>
                </div>

                {/* Showcase Badges */}
                {profile.showcaseBadges.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-white/90 text-sm mb-3 font-semibold">VİTRİN ROZETLERİ</p>
                    <div className="flex flex-wrap gap-3">
                      {profile.showcaseBadges.map(badgeId => {
                        const badge = allBadges.find(b => b.id === badgeId)
                        if (!badge) return null
                        return (
                          <motion.div
                            key={badge.id}
                            whileHover={{ scale: 1.1 }}
                            className="relative"
                          >
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm border-2 border-white/40">
                              {badge.icon}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Settings Tabs */}
            <Card>
              <CardBody className="p-6">
                <Tabs
                  selectedKey={activeTab}
                  onSelectionChange={(key) => setActiveTab(key as string)}
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "bg-gradient-to-r from-purple-500 to-pink-500",
                    tab: "px-4",
                    tabContent: "group-data-[selected=true]:text-purple-600"
                  }}
                >
                  <Tab 
                    key="profile" 
                    title={
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profil</span>
                      </div>
                    }
                  />
                  <Tab 
                    key="appearance" 
                    title={
                      <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4" />
                        <span>Görünüm</span>
                      </div>
                    }
                  />
                  <Tab 
                    key="showcase" 
                    title={
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span>Vitrin</span>
                      </div>
                    }
                  />
                  <Tab 
                    key="privacy" 
                    title={
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Gizlilik</span>
                      </div>
                    }
                  />
                </Tabs>

                <div className="mt-6">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Görünen Ad
                        </label>
                        <Input
                          value={profile.displayName}
                          onValueChange={(value) => setProfile({ ...profile, displayName: value })}
                          placeholder="Adın veya takma adın"
                          size="lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Biyografi
                        </label>
                        <Textarea
                          value={profile.bio}
                          onValueChange={(value) => setProfile({ ...profile, bio: value })}
                          placeholder="Kendini tanıt..."
                          size="lg"
                          maxRows={3}
                          maxLength={150}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {profile.bio.length}/150 karakter
                        </p>
                      </div>

                      {/* Avatar Önizleme */}
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <CardBody className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                                Avatar Önizleme
                              </p>
                              <p className="text-sm text-purple-700 dark:text-purple-300">
                                Emoji, arkaplan ve çerçeveni özelleştir
                              </p>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`w-20 h-20 ${avatarBackground} rounded-full flex items-center justify-center ${profile.avatar.startsWith('/images/') ? 'p-1 overflow-hidden' : 'text-4xl'} ${avatarFrame} transition-all`}
                            >
                              {profile.avatar.startsWith('/images/') ? (
                                <img 
                                  src={profile.avatar} 
                                  alt="Avatar" 
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : profile.avatar}
                            </motion.div>
                          </div>
                        </CardBody>
                      </Card>

                      {/* Avatar Emoji Seçimi */}
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                          Avatar Emoji (96+ seçenek!)
                        </label>
                        
                        {/* Kategori Seçimi */}
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                          {Object.entries(avatarCategories).map(([key, category]) => (
                            <Button
                              key={key}
                              size="sm"
                              variant={selectedAvatarCategory === key ? 'solid' : 'flat'}
                              color={selectedAvatarCategory === key ? 'secondary' : 'default'}
                              startContent={<span className="text-lg">{category.icon}</span>}
                              onPress={() => setSelectedAvatarCategory(key)}
                              className="flex-shrink-0"
                            >
                              {category.name}
                            </Button>
                          ))}
                        </div>

                        {/* Emoji & Image Grid */}
                        <div className="grid grid-cols-8 gap-2">
                          {avatarCategories[selectedAvatarCategory as keyof typeof avatarCategories].items.map((item, index) => {
                            const isImage = typeof item === 'object' && 'type' in item && item.type === 'image'
                            const isEmoji = typeof item === 'object' && 'type' in item && item.type === 'emoji'
                            const avatarValue = isImage ? item.src : (isEmoji ? item.value : item)
                            const displayValue = isImage ? (
                              <img 
                                src={item.src} 
                                alt={item.alt} 
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (isEmoji ? item.value : item)
                            
                            return (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setProfile({ ...profile, avatar: avatarValue })}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${isImage ? 'p-1 overflow-hidden' : 'text-2xl'} transition-all ${
                                  profile.avatar === avatarValue
                                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ring-4 ring-purple-300 dark:ring-purple-700'
                                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                              >
                                {displayValue}
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Avatar Arkaplan Seçimi */}
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                          Avatar Arkaplanı
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {avatarBackgrounds.map((bg, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setAvatarBackground(bg.gradient)}
                              className={`p-3 rounded-xl transition-all ${
                                avatarBackground === bg.gradient
                                  ? 'ring-4 ring-purple-500 dark:ring-purple-400'
                                  : 'ring-2 ring-gray-200 dark:ring-gray-700'
                              }`}
                            >
                              <div className={`h-16 ${bg.gradient} rounded-lg mb-2 flex items-center justify-center ${profile.avatar.startsWith('/images/') ? 'p-1' : 'text-3xl'}`}>
                                {profile.avatar.startsWith('/images/') ? (
                                  <img 
                                    src={profile.avatar} 
                                    alt="Avatar" 
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : profile.avatar}
                              </div>
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {bg.name}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Avatar Çerçeve Seçimi */}
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          Avatar Çerçevesi
                          <Chip size="sm" color="warning" variant="flat">Lig Ödülü</Chip>
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {avatarFrames.map((frame, index) => {
                            const unlocked = isThemeUnlocked(frame.requiredLeague)
                            return (
                              <motion.button
                                key={index}
                                whileHover={unlocked ? { scale: 1.05 } : {}}
                                whileTap={unlocked ? { scale: 0.95 } : {}}
                                onClick={() => unlocked && setAvatarFrame(frame.style)}
                                disabled={!unlocked}
                                className={`p-3 rounded-xl transition-all relative ${
                                  avatarFrame === frame.style
                                    ? 'ring-4 ring-purple-500 dark:ring-purple-400 bg-purple-50 dark:bg-purple-900/20'
                                    : 'ring-2 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800'
                                } ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <div className={`h-16 ${avatarBackground} rounded-full mb-2 flex items-center justify-center ${profile.avatar.startsWith('/images/') ? 'p-1' : 'text-3xl'} ${frame.style} ${frame.shadow}`}>
                                  {profile.avatar.startsWith('/images/') ? (
                                    <img 
                                      src={profile.avatar} 
                                      alt="Avatar" 
                                      className="w-full h-full object-cover rounded-full"
                                    />
                                  ) : profile.avatar}
                                </div>
                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                  {frame.name}
                                </p>
                                {frame.animated && (
                                  <Chip size="sm" className="mt-1 text-[10px]" color="warning" variant="flat">
                                    Animasyonlu
                                  </Chip>
                                )}
                                {!unlocked && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                    <Lock className="w-5 h-5 text-white" />
                                  </div>
                                )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance Tab */}
                  {activeTab === 'appearance' && (
                    <div className="space-y-6">
                      {/* Bilgilendirme */}
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <CardBody className="p-4">
                          <div className="flex items-start space-x-3">
                            <Palette className="w-5 h-5 text-purple-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-purple-900 dark:text-purple-100">
                                Renk Paletleri 🎨
                              </p>
                              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                                Daha yüksek liglere ulaşarak özel renk paletlerini kilitle! Şu an: <strong>Ahenk Ligi</strong> - Tüm temalar açık! 🌟
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      <div>
                        <label className="block text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">
                          Tema Rengi Seç ({themeColors.filter(t => isThemeUnlocked(t.requiredLeague)).length}/{themeColors.length} Açık)
                        </label>
                        
                        {/* Temel Renkler */}
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                            🥉 Temel Renkler (Bronz+)
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {themeColors.filter(t => t.requiredLeague === 'bronze').map(theme => {
                              const unlocked = isThemeUnlocked(theme.requiredLeague)
                              return (
                                <motion.button
                                  key={theme.name}
                                  whileHover={unlocked ? { scale: 1.05 } : {}}
                                  whileTap={unlocked ? { scale: 0.95 } : {}}
                                  onClick={() => unlocked && setProfile({ 
                                    ...profile, 
                                    theme: theme.name,
                                    accentColor: theme.color 
                                  })}
                                  disabled={!unlocked}
                                  className={`p-4 rounded-xl transition-all relative ${
                                    profile.theme === theme.name
                                      ? 'ring-4 ring-offset-2 ring-purple-500 dark:ring-offset-gray-900'
                                      : ''
                                  } ${!unlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                  <div className={`h-14 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2 ${theme.animated ? 'animate-pulse' : ''}`} />
                                  <p className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
                                    {theme.name}
                                  </p>
                                  {!unlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                      <Lock className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Gümüş Renkler */}
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                            🥈 Gelişmiş Renkler (Gümüş+)
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {themeColors.filter(t => t.requiredLeague === 'silver').map(theme => {
                              const unlocked = isThemeUnlocked(theme.requiredLeague)
                              return (
                                <motion.button
                                  key={theme.name}
                                  whileHover={unlocked ? { scale: 1.05 } : {}}
                                  whileTap={unlocked ? { scale: 0.95 } : {}}
                                  onClick={() => unlocked && setProfile({ 
                                    ...profile, 
                                    theme: theme.name,
                                    accentColor: theme.color 
                                  })}
                                  disabled={!unlocked}
                                  className={`p-4 rounded-xl transition-all relative ${
                                    profile.theme === theme.name
                                      ? 'ring-4 ring-offset-2 ring-purple-500 dark:ring-offset-gray-900'
                                      : ''
                                  } ${!unlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                  <div className={`h-14 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`} />
                                  <p className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
                                    {theme.name}
                                  </p>
                                  {!unlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                      <Lock className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Altın Renkler */}
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                            🥇 Premium Renkler (Altın+)
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {themeColors.filter(t => t.requiredLeague === 'gold').map(theme => {
                              const unlocked = isThemeUnlocked(theme.requiredLeague)
                              return (
                                <motion.button
                                  key={theme.name}
                                  whileHover={unlocked ? { scale: 1.05 } : {}}
                                  whileTap={unlocked ? { scale: 0.95 } : {}}
                                  onClick={() => unlocked && setProfile({ 
                                    ...profile, 
                                    theme: theme.name,
                                    accentColor: theme.color 
                                  })}
                                  disabled={!unlocked}
                                  className={`p-4 rounded-xl transition-all relative ${
                                    profile.theme === theme.name
                                      ? 'ring-4 ring-offset-2 ring-purple-500 dark:ring-offset-gray-900'
                                      : ''
                                  } ${!unlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                  <div className={`h-14 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`} />
                                  <p className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
                                    {theme.name}
                                  </p>
                                  {!unlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                      <Lock className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Platin Renkler */}
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                            💠 Özel Renkler (Platin+)
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {themeColors.filter(t => t.requiredLeague === 'platinum').map(theme => {
                              const unlocked = isThemeUnlocked(theme.requiredLeague)
                              return (
                                <motion.button
                                  key={theme.name}
                                  whileHover={unlocked ? { scale: 1.05 } : {}}
                                  whileTap={unlocked ? { scale: 0.95 } : {}}
                                  onClick={() => unlocked && setProfile({ 
                                    ...profile, 
                                    theme: theme.name,
                                    accentColor: theme.color 
                                  })}
                                  disabled={!unlocked}
                                  className={`p-4 rounded-xl transition-all relative ${
                                    profile.theme === theme.name
                                      ? 'ring-4 ring-offset-2 ring-purple-500 dark:ring-offset-gray-900'
                                      : ''
                                  } ${!unlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                  <div className={`h-14 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`} />
                                  <p className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
                                    {theme.name}
                                  </p>
                                  {!unlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                      <Lock className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Elmas Renkler */}
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                            💎 Elite Renkler (Elmas+)
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {themeColors.filter(t => t.requiredLeague === 'diamond').map(theme => {
                              const unlocked = isThemeUnlocked(theme.requiredLeague)
                              return (
                                <motion.button
                                  key={theme.name}
                                  whileHover={unlocked ? { scale: 1.05 } : {}}
                                  whileTap={unlocked ? { scale: 0.95 } : {}}
                                  onClick={() => unlocked && setProfile({ 
                                    ...profile, 
                                    theme: theme.name,
                                    accentColor: theme.color 
                                  })}
                                  disabled={!unlocked}
                                  className={`p-4 rounded-xl transition-all relative ${
                                    profile.theme === theme.name
                                      ? 'ring-4 ring-offset-2 ring-purple-500 dark:ring-offset-gray-900'
                                      : ''
                                  } ${!unlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                  <div className={`h-14 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`} />
                                  <p className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
                                    {theme.name}
                                  </p>
                                  {!unlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                      <Lock className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Usta Renkler */}
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                            🏆 Efsanevi Renkler (Usta+)
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {themeColors.filter(t => t.requiredLeague === 'master').map(theme => {
                              const unlocked = isThemeUnlocked(theme.requiredLeague)
                              return (
                                <motion.button
                                  key={theme.name}
                                  whileHover={unlocked ? { scale: 1.05 } : {}}
                                  whileTap={unlocked ? { scale: 0.95 } : {}}
                                  onClick={() => unlocked && setProfile({ 
                                    ...profile, 
                                    theme: theme.name,
                                    accentColor: theme.color 
                                  })}
                                  disabled={!unlocked}
                                  className={`p-4 rounded-xl transition-all relative ${
                                    profile.theme === theme.name
                                      ? 'ring-4 ring-offset-2 ring-purple-500 dark:ring-offset-gray-900'
                                      : ''
                                  } ${!unlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                  <div className={`h-14 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`} />
                                  <p className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
                                    {theme.name}
                                  </p>
                                  {!unlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                      <Lock className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Mitolojik Renkler - Efsanevi */}
                        <div className="mb-6">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                            ⚡ Mitolojik Renkler (Efsanevi Lig) 
                            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {themeColors.filter(t => t.requiredLeague === 'legendary').map(theme => {
                              const unlocked = isThemeUnlocked(theme.requiredLeague)
                              return (
                                <motion.button
                                  key={theme.name}
                                  whileHover={unlocked ? { scale: 1.05 } : {}}
                                  whileTap={unlocked ? { scale: 0.95 } : {}}
                                  onClick={() => unlocked && setProfile({ 
                                    ...profile, 
                                    theme: theme.name,
                                    accentColor: theme.color 
                                  })}
                                  disabled={!unlocked}
                                  className={`p-4 rounded-xl transition-all relative ${
                                    profile.theme === theme.name
                                      ? 'ring-4 ring-offset-2 ring-yellow-500 dark:ring-offset-gray-900 shadow-xl shadow-yellow-500/20'
                                      : ''
                                  } ${!unlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                  <div className={`h-14 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2 ${theme.animated ? 'animate-pulse' : ''}`} />
                                  <p className="text-xs font-bold capitalize text-gray-700 dark:text-gray-300">
                                    {theme.name}
                                  </p>
                                  <Chip size="sm" className="mt-1 text-[10px]" color="warning" variant="flat">
                                    Animasyonlu
                                  </Chip>
                                  {!unlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                      <Lock className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Showcase Tab */}
                  {activeTab === 'showcase' && (
                    <div className="space-y-6">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Vitrin Rozetleri:</strong> Profilinde gösterilecek en özel {profile.showcaseBadges.length}/6 rozetini seç
                        </p>
                      </div>

                      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                        {allBadges.map(badge => {
                          const isSelected = profile.showcaseBadges.includes(badge.id)
                          return (
                            <motion.button
                              key={badge.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleShowcaseBadge(badge.id)}
                              className={`p-4 rounded-xl transition-all ${
                                isSelected
                                  ? 'ring-4 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                  : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              <div className="text-4xl mb-2">{badge.icon}</div>
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 line-clamp-1">
                                {badge.name}
                              </p>
                              {isSelected && (
                                <div className="mt-2">
                                  <Chip size="sm" color="success" variant="flat">
                                    Seçili
                                  </Chip>
                                </div>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Privacy Tab */}
                  {activeTab === 'privacy' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                          Gizlilik Ayarları
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Profili Göster</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Diğer kullanıcılar profilini görebilir</p>
                              </div>
                            </div>
                            <Switch
                              isSelected={profile.privacy.showProfile}
                              onValueChange={(value) => setProfile({
                                ...profile,
                                privacy: { ...profile.privacy, showProfile: value }
                              })}
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Award className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Rozetleri Göster</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Kazandığın rozetler görünsün</p>
                              </div>
                            </div>
                            <Switch
                              isSelected={profile.privacy.showBadges}
                              onValueChange={(value) => setProfile({
                                ...profile,
                                privacy: { ...profile.privacy, showBadges: value }
                              })}
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">İstatistikleri Göster</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Puan ve seviyeni paylaş</p>
                              </div>
                            </div>
                            <Switch
                              isSelected={profile.privacy.showStats}
                              onValueChange={(value) => setProfile({
                                ...profile,
                                privacy: { ...profile.privacy, showStats: value }
                              })}
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Aktiviteyi Göster</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Son aktivitelerini göster</p>
                              </div>
                            </div>
                            <Switch
                              isSelected={profile.privacy.showActivity}
                              onValueChange={(value) => setProfile({
                                ...profile,
                                privacy: { ...profile.privacy, showActivity: value }
                              })}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                          Bildirim Tercihleri
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">E-posta Bildirimleri</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Önemli güncellemeler için e-posta al</p>
                              </div>
                            </div>
                            <Switch
                              isSelected={profile.notifications.email}
                              onValueChange={(value) => setProfile({
                                ...profile,
                                notifications: { ...profile.notifications, email: value }
                              })}
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Push Bildirimleri</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Anında bildirim al</p>
                              </div>
                            </div>
                            <Switch
                              isSelected={profile.notifications.push}
                              onValueChange={(value) => setProfile({
                                ...profile,
                                notifications: { ...profile.notifications, push: value }
                              })}
                            />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Award className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Rozet Bildirimleri</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Yeni rozet kazandığında bildir</p>
                              </div>
                            </div>
                            <Switch
                              isSelected={profile.notifications.badges}
                              onValueChange={(value) => setProfile({
                                ...profile,
                                notifications: { ...profile.notifications, badges: value }
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileCustomizationPage






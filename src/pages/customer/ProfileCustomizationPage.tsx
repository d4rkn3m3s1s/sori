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
  const [profile, setProfile] = useState<ProfileSettings>({
    displayName: 'Yıldız Kullanıcı',
    bio: 'QR-tex topluluğunun aktif üyesi 🌟 Her yorumla fark yaratıyorum!',
    avatar: '🎭',
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

  const avatarEmojis = ['😀', '😎', '🤖', '👽', '🎭', '🎨', '🎮', '🎯', '🌟', '⭐', '🔥', '💎', '👑', '🦄', '🐉', '🦋']
  
  const themeColors = [
    { name: 'purple', color: '#8B5CF6', gradient: 'from-purple-500 to-pink-500' },
    { name: 'blue', color: '#3B82F6', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'green', color: '#10B981', gradient: 'from-green-500 to-emerald-500' },
    { name: 'orange', color: '#F59E0B', gradient: 'from-orange-500 to-red-500' },
    { name: 'pink', color: '#EC4899', gradient: 'from-pink-500 to-rose-500' },
    { name: 'red', color: '#EF4444', gradient: 'from-red-500 to-orange-600' },
  ]

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
            <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
              <CardBody className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-xl">
                        {profile.avatar}
                      </div>
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
                      </div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 font-bold"
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

                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                          Avatar
                        </label>
                        <div className="grid grid-cols-8 gap-3">
                          {avatarEmojis.map(emoji => (
                            <motion.button
                              key={emoji}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setProfile({ ...profile, avatar: emoji })}
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                                profile.avatar === emoji
                                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg scale-110'
                                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance Tab */}
                  {activeTab === 'appearance' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                          Tema Rengi
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {themeColors.map(theme => (
                            <motion.button
                              key={theme.name}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setProfile({ 
                                ...profile, 
                                theme: theme.name,
                                accentColor: theme.color 
                              })}
                              className={`p-4 rounded-xl transition-all ${
                                profile.theme === theme.name
                                  ? 'ring-4 ring-offset-2 ring-purple-500 dark:ring-offset-gray-900'
                                  : ''
                              }`}
                            >
                              <div className={`h-16 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`} />
                              <p className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                                {theme.name}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <CardBody className="p-4">
                          <div className="flex items-start space-x-3">
                            <Palette className="w-5 h-5 text-purple-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-purple-900 dark:text-purple-100">
                                Özel Temalar
                              </p>
                              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                                Daha fazla tema ve özelleştirme seçeneği için Efsanevi lige ulaş!
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
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





import { motion } from 'framer-motion'
import { Card, CardBody, Button, Switch, Input, Select, SelectItem } from '@nextui-org/react'
import { Settings, User, Bell, Shield, Moon, Globe, Mail, Phone } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { useState } from 'react'

function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    badges: true,
    responses: true
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showBadges: true,
    showStats: false
  })

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Ayarlar
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Hesap ve uygulama ayarlarınızı yönetin
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* Profile Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profil Bilgileri
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Ad Soyad"
                        placeholder="Adınızı girin"
                        defaultValue="Ahmet Yılmaz"
                        startContent={<User className="w-4 h-4 text-gray-400" />}
                      />
                      
                      <Input
                        label="E-posta"
                        placeholder="E-posta adresiniz"
                        defaultValue="ahmet@example.com"
                        startContent={<Mail className="w-4 h-4 text-gray-400" />}
                      />
                      
                      <Input
                        label="Telefon"
                        placeholder="Telefon numaranız"
                        defaultValue="+90 555 123 4567"
                        startContent={<Phone className="w-4 h-4 text-gray-400" />}
                      />
                      
                      <Select
                        label="Dil"
                        placeholder="Dil seçin"
                        defaultSelectedKeys={["tr"]}
                        startContent={<Globe className="w-4 h-4 text-gray-400" />}
                      >
                        <SelectItem key="tr" value="tr">Türkçe</SelectItem>
                        <SelectItem key="en" value="en">English</SelectItem>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button color="primary">
                        Değişiklikleri Kaydet
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Notification Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Bildirim Ayarları
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">E-posta Bildirimleri</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Yeni yanıtlar ve güncellemeler</p>
                        </div>
                        <Switch
                          isSelected={notifications.email}
                          onValueChange={(value) => setNotifications({...notifications, email: value})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Push Bildirimleri</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Anlık bildirimler</p>
                        </div>
                        <Switch
                          isSelected={notifications.push}
                          onValueChange={(value) => setNotifications({...notifications, push: value})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">SMS Bildirimleri</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Önemli güncellemeler</p>
                        </div>
                        <Switch
                          isSelected={notifications.sms}
                          onValueChange={(value) => setNotifications({...notifications, sms: value})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Rozet Bildirimleri</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Yeni rozet kazanımları</p>
                        </div>
                        <Switch
                          isSelected={notifications.badges}
                          onValueChange={(value) => setNotifications({...notifications, badges: value})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Yanıt Bildirimleri</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Geri bildirim yanıtları</p>
                        </div>
                        <Switch
                          isSelected={notifications.responses}
                          onValueChange={(value) => setNotifications({...notifications, responses: value})}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Privacy Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Gizlilik Ayarları
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Profil Görünürlüğü</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Profilinizi herkese açık yapın</p>
                        </div>
                        <Switch
                          isSelected={privacy.profilePublic}
                          onValueChange={(value) => setPrivacy({...privacy, profilePublic: value})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Rozet Görünürlüğü</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Rozetlerinizi liderlik tablosunda göster</p>
                        </div>
                        <Switch
                          isSelected={privacy.showBadges}
                          onValueChange={(value) => setPrivacy({...privacy, showBadges: value})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">İstatistik Görünürlüğü</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Aktivite istatistiklerinizi göster</p>
                        </div>
                        <Switch
                          isSelected={privacy.showStats}
                          onValueChange={(value) => setPrivacy({...privacy, showStats: value})}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* App Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Uygulama Ayarları
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Koyu Tema</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Karanlık modu etkinleştir</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Otomatik Yedekleme</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Verilerinizi otomatik yedekle</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                      <div className="flex gap-3">
                        <Button variant="bordered" color="danger">
                          Hesabı Sil
                        </Button>
                        <Button variant="bordered">
                          Verileri Dışa Aktar
                        </Button>
                      </div>
                    </div>
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

export default SettingsPage

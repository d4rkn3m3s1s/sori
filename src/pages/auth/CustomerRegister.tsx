import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Input, Button, Link, Divider } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, MessageSquare, ArrowLeft, User, Phone } from 'lucide-react'

function CustomerRegister() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate registration
    navigate('/customer/dashboard')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-900 dark:to-teal-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="light"
            startContent={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            Ana Sayfaya Dön
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass backdrop-blur-xl border-white/20 shadow-2xl">
            <CardBody className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Müşteri Kaydı
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Geri bildirim platformuna katılın
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ad"
                    placeholder="Adınız"
                    value={formData.firstName}
                    onValueChange={(value) => handleInputChange('firstName', value)}
                    startContent={<User className="w-4 h-4 text-gray-400" />}
                    variant="bordered"
                    classNames={{
                      input: "bg-transparent",
                      inputWrapper: "border-gray-200 hover:border-blue-300 focus-within:border-blue-500"
                    }}
                    required
                  />

                  <Input
                    label="Soyad"
                    placeholder="Soyadınız"
                    value={formData.lastName}
                    onValueChange={(value) => handleInputChange('lastName', value)}
                    startContent={<User className="w-4 h-4 text-gray-400" />}
                    variant="bordered"
                    classNames={{
                      input: "bg-transparent",
                      inputWrapper: "border-gray-200 hover:border-blue-300 focus-within:border-blue-500"
                    }}
                    required
                  />
                </div>

                <Input
                  type="email"
                  label="E-posta"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onValueChange={(value) => handleInputChange('email', value)}
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  variant="bordered"
                  classNames={{
                    input: "bg-transparent",
                    inputWrapper: "border-gray-200 hover:border-blue-300 focus-within:border-blue-500"
                  }}
                  required
                />

                <Input
                  type="tel"
                  label="Telefon (Opsiyonel)"
                  placeholder="+90 555 123 45 67"
                  value={formData.phone}
                  onValueChange={(value) => handleInputChange('phone', value)}
                  startContent={<Phone className="w-4 h-4 text-gray-400" />}
                  variant="bordered"
                  classNames={{
                    input: "bg-transparent",
                    inputWrapper: "border-gray-200 hover:border-blue-300 focus-within:border-blue-500"
                  }}
                />

                <Input
                  label="Şifre"
                  placeholder="Güçlü bir şifre oluşturun"
                  value={formData.password}
                  onValueChange={(value) => handleInputChange('password', value)}
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  classNames={{
                    input: "bg-transparent",
                    inputWrapper: "border-gray-200 hover:border-blue-300 focus-within:border-blue-500"
                  }}
                  required
                />

                <Input
                  label="Şifre Tekrar"
                  placeholder="Şifrenizi tekrar girin"
                  value={formData.confirmPassword}
                  onValueChange={(value) => handleInputChange('confirmPassword', value)}
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  type="password"
                  variant="bordered"
                  classNames={{
                    input: "bg-transparent",
                    inputWrapper: "border-gray-200 hover:border-blue-300 focus-within:border-blue-500"
                  }}
                  required
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 text-base mt-6"
                  size="lg"
                >
                  Hesap Oluştur
                </Button>
              </form>

              <Divider className="my-6" />

              {/* Social Register */}
              <div className="space-y-3">
                <Button
                  variant="bordered"
                  className="w-full border-gray-200 hover:border-gray-300"
                  startContent={
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  }
                >
                  Google ile Kayıt Ol
                </Button>

                <Button
                  variant="bordered"
                  className="w-full border-gray-200 hover:border-gray-300"
                  startContent={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877f2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  }
                >
                  Facebook ile Kayıt Ol
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Zaten hesabınız var mı?{' '}
                  <Link
                    onClick={() => navigate('/customer/login')}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    Giriş Yap
                  </Link>
                </p>
              </div>

              {/* Terms */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  Kayıt olarak{' '}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Kullanım Şartları
                  </Link>{' '}
                  ve{' '}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Gizlilik Politikası
                  </Link>
                  'nı kabul etmiş olursunuz.
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Dealer Register Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            İşletme sahibi misiniz?{' '}
            <Link
              onClick={() => navigate('/dealer/register')}
              className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
            >
              Bayi Kaydı
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default CustomerRegister

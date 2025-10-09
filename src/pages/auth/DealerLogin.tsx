import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Input, Button, Link, Divider } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, QrCode, ArrowLeft } from 'lucide-react'

function DealerLogin() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    navigate('/dealer/dashboard')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Bayi Girişi
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Qratex yönetim paneline hoş geldiniz
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  label="E-posta"
                  placeholder="ornek@sirket.com"
                  value={formData.email}
                  onValueChange={(value) => handleInputChange('email', value)}
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  variant="bordered"
                  classNames={{
                    input: "bg-transparent",
                    inputWrapper: "border-gray-200 hover:border-purple-300 focus-within:border-purple-500"
                  }}
                  required
                />

                <Input
                  label="Şifre"
                  placeholder="Şifrenizi girin"
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
                    inputWrapper: "border-gray-200 hover:border-purple-300 focus-within:border-purple-500"
                  }}
                  required
                />

                <div className="flex justify-between items-center">
                  <Link
                    href="#"
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    Şifremi Unuttum
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 text-base"
                  size="lg"
                >
                  Giriş Yap
                </Button>
              </form>

              <Divider className="my-6" />

              {/* Social Login */}
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
                  Google ile Giriş Yap
                </Button>
              </div>

              {/* Register Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Hesabınız yok mu?{' '}
                  <Link
                    onClick={() => navigate('/dealer/register')}
                    className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
                  >
                    Kayıt Ol
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Customer Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Müşteri misiniz?{' '}
            <Link
              onClick={() => navigate('/customer/login')}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Müşteri Girişi
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default DealerLogin

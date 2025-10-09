import { useState } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { Textarea } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { Badge } from '@nextui-org/react'
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Users, 
  BarChart3, 
  Calendar,
  Eye,
  Edit,
  Trash2,
  Share2
} from 'lucide-react'
import Header from '../../components/dashboard/Header'
import Sidebar from '../../components/dashboard/Sidebar'

interface Survey {
  id: string
  title: string
  description: string
  status: 'draft' | 'active' | 'completed' | 'paused'
  responses: number
  createdAt: string
  endDate: string
  questions: number
}

const SurveysPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Mock data
  const surveys: Survey[] = [
    {
      id: '1',
      title: 'Müşteri Memnuniyeti Anketi',
      description: 'Hizmet kalitemizi değerlendirmek için müşteri geri bildirimlerini topluyoruz.',
      status: 'active',
      responses: 127,
      createdAt: '2024-01-15',
      endDate: '2024-02-15',
      questions: 8
    },
    {
      id: '2',
      title: 'Ürün Geliştirme Anketi',
      description: 'Yeni ürünlerimiz hakkında müşteri görüşlerini almak istiyoruz.',
      status: 'draft',
      responses: 0,
      createdAt: '2024-01-20',
      endDate: '2024-03-01',
      questions: 12
    },
    {
      id: '3',
      title: 'Uygulama Kullanım Deneyimi',
      description: 'Mobil uygulamamızın kullanılabilirliği hakkında feedback topluyoruz.',
      status: 'completed',
      responses: 89,
      createdAt: '2023-12-01',
      endDate: '2023-12-31',
      questions: 6
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'draft': return 'warning'
      case 'completed': return 'primary'
      case 'paused': return 'danger'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif'
      case 'draft': return 'Taslak'
      case 'completed': return 'Tamamlandı'
      case 'paused': return 'Duraklatıldı'
      default: return status
    }
  }

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || survey.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Anketler
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Müşteri anketlerinizi oluşturun ve yönetin
                </p>
              </div>
              <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onClick={() => setShowCreateModal(true)}
              >
                Yeni Anket
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardBody className="flex flex-row items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Toplam Anket
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {surveys.length}
                    </p>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="flex flex-row items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Aktif Anket
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {surveys.filter(s => s.status === 'active').length}
                    </p>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="flex flex-row items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Toplam Yanıt
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {surveys.reduce((total, survey) => total + survey.responses, 0)}
                    </p>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="flex flex-row items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Bu Ay
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {surveys.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Anket ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  placeholder="Durum filtrele"
                  selectedKeys={[statusFilter]}
                  onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] as string)}
                  startContent={<Filter className="w-4 h-4" />}
                >
                  <SelectItem key="all" value="all">Tümü</SelectItem>
                  <SelectItem key="active" value="active">Aktif</SelectItem>
                  <SelectItem key="draft" value="draft">Taslak</SelectItem>
                  <SelectItem key="completed" value="completed">Tamamlandı</SelectItem>
                  <SelectItem key="paused" value="paused">Duraklatıldı</SelectItem>
                </Select>
              </div>
            </div>

            {/* Surveys Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSurveys.map((survey) => (
                <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {survey.title}
                      </h3>
                      <Badge color={getStatusColor(survey.status)} variant="flat" size="sm">
                        {getStatusText(survey.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {survey.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Yanıt Sayısı:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {survey.responses}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Soru Sayısı:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {survey.questions}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Bitiş Tarihi:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {new Date(survey.endDate).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="flat" startContent={<Eye className="w-4 h-4" />}>
                        Görüntüle
                      </Button>
                      <Button size="sm" variant="flat" startContent={<Edit className="w-4 h-4" />}>
                        Düzenle
                      </Button>
                      <Button size="sm" variant="flat" startContent={<Share2 className="w-4 h-4" />}>
                        Paylaş
                      </Button>
                      <Button 
                        size="sm" 
                        variant="flat" 
                        color="danger" 
                        startContent={<Trash2 className="w-4 h-4" />}
                      >
                        Sil
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            {filteredSurveys.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Anket bulunamadı
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Arama kriterlerinize uygun anket bulunamadı.
                </p>
                <Button
                  color="primary"
                  startContent={<Plus className="w-4 h-4" />}
                  onClick={() => setShowCreateModal(true)}
                >
                  İlk Anketinizi Oluşturun
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default SurveysPage


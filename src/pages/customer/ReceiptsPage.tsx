import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Card, CardBody, Button, Chip, Input, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Pagination
} from '@nextui-org/react'
import { 
  Receipt, Search, Filter, Calendar, Download, Printer,
  Eye, TrendingUp, DollarSign, Store, MapPin, X, FileText,
  BarChart3, PieChart, ArrowLeft, Share2, Copy, Check
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface ReceiptItem {
  id: string
  business: string
  location: string
  date: string
  amount: number
  items: { name: string; quantity: number; price: number }[]
  category: string
  paymentMethod: string
  status: 'verified' | 'pending' | 'rejected'
  points: number
  imageUrl?: string
}

function ReceiptsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(null)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [copied, setCopied] = useState(false)
  const itemsPerPage = 8

  // Mock receipt data
  const [receipts] = useState<ReceiptItem[]>([
    {
      id: 'RCP001',
      business: 'Starbucks Kadıköy',
      location: 'Kadıköy, İstanbul',
      date: '2024-01-15 14:30',
      amount: 125.50,
      items: [
        { name: 'Caramel Latte', quantity: 2, price: 45.00 },
        { name: 'Cheesecake', quantity: 1, price: 35.50 }
      ],
      category: 'Kahve',
      paymentMethod: 'Kredi Kartı',
      status: 'verified',
      points: 125,
      imageUrl: 'https://via.placeholder.com/400x600/8b5cf6/ffffff?text=Receipt'
    },
    {
      id: 'RCP002',
      business: 'Migros',
      location: 'Bağdat Cad., İstanbul',
      date: '2024-01-14 18:45',
      amount: 456.75,
      items: [
        { name: 'Süt', quantity: 2, price: 25.00 },
        { name: 'Ekmek', quantity: 3, price: 8.50 },
        { name: 'Peynir', quantity: 1, price: 89.90 }
      ],
      category: 'Market',
      paymentMethod: 'Nakit',
      status: 'verified',
      points: 456
    },
    {
      id: 'RCP003',
      business: 'Teknosa',
      location: 'Zorlu Center, İstanbul',
      date: '2024-01-13 16:20',
      amount: 2499.00,
      items: [
        { name: 'Kablosuz Kulaklık', quantity: 1, price: 2499.00 }
      ],
      category: 'Elektronik',
      paymentMethod: 'Kredi Kartı',
      status: 'pending',
      points: 0
    },
    {
      id: 'RCP004',
      business: 'Zara',
      location: 'İstinye Park, İstanbul',
      date: '2024-01-12 13:15',
      amount: 899.90,
      items: [
        { name: 'Gömlek', quantity: 2, price: 349.95 },
        { name: 'Pantolon', quantity: 1, price: 199.90 }
      ],
      category: 'Giyim',
      paymentMethod: 'Kredi Kartı',
      status: 'verified',
      points: 899
    },
    {
      id: 'RCP005',
      business: 'Burger King',
      location: 'Nişantaşı, İstanbul',
      date: '2024-01-11 20:30',
      amount: 185.00,
      items: [
        { name: 'Whopper Menu', quantity: 2, price: 85.00 },
        { name: 'Patates', quantity: 1, price: 15.00 }
      ],
      category: 'Fast Food',
      paymentMethod: 'Nakit',
      status: 'verified',
      points: 185
    }
  ])

  // Filter receipts
  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || receipt.category === filterCategory
    const matchesStatus = filterStatus === 'all' || receipt.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage)
  const paginatedReceipts = filteredReceipts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Statistics
  const stats = {
    total: receipts.length,
    totalAmount: receipts.reduce((sum, r) => sum + r.amount, 0),
    totalPoints: receipts.filter(r => r.status === 'verified').reduce((sum, r) => sum + r.points, 0),
    verified: receipts.filter(r => r.status === 'verified').length
  }

  const handleViewReceipt = (receipt: ReceiptItem) => {
    setSelectedReceipt(receipt)
    setShowReceiptModal(true)
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    if (!selectedReceipt) return

    const element = document.getElementById('receipt-content')
    if (!element) return

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`Fis-${selectedReceipt.id}.pdf`)
  }

  const handleCopyReceiptId = () => {
    if (selectedReceipt) {
      navigator.clipboard.writeText(selectedReceipt.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'danger'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Onaylandı'
      case 'pending': return 'Beklemede'
      case 'rejected': return 'Reddedildi'
      default: return status
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="📄 Fişlerim" 
          subtitle="Tüm alışveriş fişlerini yönet"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="light"
                startContent={<ArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/customer/dashboard')}
              >
                Dashboard'a Dön
              </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardBody className="p-4 md:p-5">
                    <div className="flex flex-col space-y-2">
                      <Receipt className="w-7 h-7 md:w-9 md:h-9 text-purple-500" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Toplam Fiş</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.total}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardBody className="p-4 md:p-5">
                    <div className="flex flex-col space-y-2">
                      <DollarSign className="w-7 h-7 md:w-9 md:h-9 text-green-500" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Toplam Tutar</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          ₺{stats.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardBody className="p-4 md:p-5">
                    <div className="flex flex-col space-y-2">
                      <TrendingUp className="w-7 h-7 md:w-9 md:h-9 text-blue-500" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Kazanılan Puan</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.totalPoints}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardBody className="p-4 md:p-5">
                    <div className="flex flex-col space-y-2">
                      <Check className="w-7 h-7 md:w-9 md:h-9 text-emerald-500" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Onaylı Fiş</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.verified}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <Input
                      placeholder="İşletme veya konum ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      startContent={<Search className="w-4 h-4 text-gray-400" />}
                      className="flex-1"
                    />

                    {/* Category Filter */}
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="flat" startContent={<Filter className="w-4 h-4" />}>
                          Kategori: {filterCategory === 'all' ? 'Tümü' : filterCategory}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        onAction={(key) => setFilterCategory(key as string)}
                      >
                        <DropdownItem key="all">Tümü</DropdownItem>
                        <DropdownItem key="Kahve">Kahve</DropdownItem>
                        <DropdownItem key="Market">Market</DropdownItem>
                        <DropdownItem key="Elektronik">Elektronik</DropdownItem>
                        <DropdownItem key="Giyim">Giyim</DropdownItem>
                        <DropdownItem key="Fast Food">Fast Food</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    {/* Status Filter */}
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="flat" startContent={<FileText className="w-4 h-4" />}>
                          Durum: {filterStatus === 'all' ? 'Tümü' : getStatusText(filterStatus)}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        onAction={(key) => setFilterStatus(key as string)}
                      >
                        <DropdownItem key="all">Tümü</DropdownItem>
                        <DropdownItem key="verified">Onaylandı</DropdownItem>
                        <DropdownItem key="pending">Beklemede</DropdownItem>
                        <DropdownItem key="rejected">Reddedildi</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    {/* Analytics Button */}
                    <Button
                      color="secondary"
                      startContent={<BarChart3 className="w-4 h-4" />}
                      onClick={() => navigate('/customer/receipt-analytics')}
                    >
                      Analitik
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Receipts Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardBody className="p-6">
                  <Table aria-label="Fişler tablosu">
                    <TableHeader>
                      <TableColumn>FİŞ NO</TableColumn>
                      <TableColumn>İŞLETME</TableColumn>
                      <TableColumn>KONUM</TableColumn>
                      <TableColumn>TARİH</TableColumn>
                      <TableColumn>TUTAR</TableColumn>
                      <TableColumn>KATEGORİ</TableColumn>
                      <TableColumn>DURUM</TableColumn>
                      <TableColumn>PUAN</TableColumn>
                      <TableColumn>İŞLEMLER</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {paginatedReceipts.map((receipt) => (
                        <TableRow key={receipt.id}>
                          <TableCell>
                            <span className="font-mono text-sm font-bold">{receipt.id}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Store className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{receipt.business}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {receipt.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              {receipt.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-green-600">₺{receipt.amount.toFixed(2)}</span>
                          </TableCell>
                          <TableCell>
                            <Chip size="sm" variant="flat" color="primary">
                              {receipt.category}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Chip size="sm" color={getStatusColor(receipt.status)}>
                              {getStatusText(receipt.status)}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-purple-600">+{receipt.points}</span>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="light"
                              startContent={<Eye className="w-4 h-4" />}
                              onClick={() => handleViewReceipt(receipt)}
                            >
                              Görüntüle
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                      <Pagination
                        total={totalPages}
                        page={currentPage}
                        onChange={setCurrentPage}
                        showControls
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Receipt Detail Modal */}
      <Modal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span>Fiş Detayları</span>
                  <Chip color={getStatusColor(selectedReceipt?.status || '')} size="sm">
                    {getStatusText(selectedReceipt?.status || '')}
                  </Chip>
                </div>
              </ModalHeader>
              <ModalBody>
                {selectedReceipt && (
                  <div id="receipt-content" className="space-y-6 p-4 bg-white dark:bg-gray-900">
                    {/* Receipt Header */}
                    <div className="text-center border-b pb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedReceipt.business}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1 mt-2">
                        <MapPin className="w-4 h-4" />
                        {selectedReceipt.location}
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedReceipt.date}</p>
                      </div>
                    </div>

                    {/* Receipt ID */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Fiş No:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-900 dark:text-white">
                          {selectedReceipt.id}
                        </span>
                        <Button
                          size="sm"
                          isIconOnly
                          variant="light"
                          onClick={handleCopyReceiptId}
                        >
                          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Ürünler</h4>
                      <div className="space-y-2">
                        {selectedReceipt.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.quantity} x ₺{item.price.toFixed(2)}
                              </p>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white">
                              ₺{(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Ara Toplam:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ₺{selectedReceipt.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Ödeme Yöntemi:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {selectedReceipt.paymentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Kategori:</span>
                        <Chip size="sm" color="primary">{selectedReceipt.category}</Chip>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Toplam:</span>
                        <span className="text-2xl font-bold text-green-600">
                          ₺{selectedReceipt.amount.toFixed(2)}
                        </span>
                      </div>
                      {selectedReceipt.status === 'verified' && (
                        <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <span className="font-semibold text-purple-900 dark:text-purple-200">Kazanılan Puan:</span>
                          <span className="text-xl font-bold text-purple-600">+{selectedReceipt.points}</span>
                        </div>
                      )}
                    </div>

                    {/* Receipt Image */}
                    {selectedReceipt.imageUrl && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Fiş Görseli</h4>
                        <img
                          src={selectedReceipt.imageUrl}
                          alt="Fiş görseli"
                          className="w-full rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-2 w-full">
                  <Button
                    color="default"
                    variant="flat"
                    onPress={onClose}
                    startContent={<X className="w-4 h-4" />}
                  >
                    Kapat
                  </Button>
                  <Button
                    color="secondary"
                    variant="flat"
                    startContent={<Share2 className="w-4 h-4" />}
                  >
                    Paylaş
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Printer className="w-4 h-4" />}
                    onClick={handlePrintReceipt}
                  >
                    Yazdır
                  </Button>
                  <Button
                    color="success"
                    startContent={<Download className="w-4 h-4" />}
                    onClick={handleDownloadPDF}
                  >
                    PDF İndir
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ReceiptsPage


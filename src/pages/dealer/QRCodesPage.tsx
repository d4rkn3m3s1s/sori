import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardBody, 
  Button, 
  Input, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea
} from '@nextui-org/react'
import { 
  QrCode, 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Download,
  Copy,
  Eye,
  Calendar,
  BarChart3,
  Filter
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { ExportButton } from '../../components/ui/ExportButton'

function QRCodesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedQRs, setSelectedQRs] = useState<string[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Mock QR code data
  const qrCodes = [
    {
      id: '1',
      name: 'Restaurant Feedback',
      description: 'Main entrance feedback QR',
      url: 'https://qratex.com/feedback/restaurant-1',
      location: 'Main Entrance',
      status: 'Active',
      scans: 245,
      createdAt: '2024-01-15',
      lastScan: '2024-01-20'
    },
    {
      id: '2',
      name: 'Table Service',
      description: 'Table service feedback QR',
      url: 'https://qratex.com/feedback/table-1',
      location: 'Table 5',
      status: 'Active',
      scans: 89,
      createdAt: '2024-01-12',
      lastScan: '2024-01-19'
    },
    {
      id: '3',
      name: 'Drive Through',
      description: 'Drive through feedback QR',
      url: 'https://qratex.com/feedback/drive-1',
      location: 'Drive Through Window',
      status: 'Inactive',
      scans: 156,
      createdAt: '2024-01-10',
      lastScan: '2024-01-15'
    },
    {
      id: '4',
      name: 'Bathroom Feedback',
      description: 'Bathroom cleanliness feedback',
      url: 'https://qratex.com/feedback/bathroom-1',
      location: 'Men\'s Restroom',
      status: 'Active',
      scans: 67,
      createdAt: '2024-01-08',
      lastScan: '2024-01-18'
    }
  ]

  const filteredQRCodes = qrCodes.filter(qr =>
    qr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    qr.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'warning'
      case 'Expired': return 'danger'
      default: return 'default'
    }
  }

  const handleQRAction = (action: string, qrId: string) => {
    console.log(`${action} QR code:`, qrId)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const exportQRData = {
    title: 'QR Codes Report',
    headers: ['Name', 'Description', 'Location', 'Status', 'Scans', 'Created', 'Last Scan'],
    rows: qrCodes.map(qr => [
      qr.name,
      qr.description,
      qr.location,
      qr.status,
      qr.scans,
      qr.createdAt,
      qr.lastScan
    ]),
    metadata: {
      generatedAt: new Date(),
      generatedBy: 'Qratex Admin',
      period: 'All QR Codes'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="QR Code Management" 
          subtitle="Create and manage your feedback QR codes"
          userType="dealer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">QR Code Management</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Create and manage your feedback QR codes
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ExportButton
                  data={exportQRData}
                  filename="qr_codes_report"
                  size="sm"
                />
                <Button
                  color="primary"
                  startContent={<Plus className="w-4 h-4" />}
                  onClick={onOpen}
                >
                  Create QR Code
                </Button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total QR Codes</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{qrCodes.length}</p>
                    </div>
                    <QrCode className="w-8 h-8 text-purple-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Codes</p>
                      <p className="text-2xl font-bold text-green-600">
                        {qrCodes.filter(qr => qr.status === 'Active').length}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Scans</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {qrCodes.reduce((sum, qr) => sum + qr.scans, 0)}
                      </p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Scans</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.round(qrCodes.reduce((sum, qr) => sum + qr.scans, 0) / qrCodes.length)}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-500" />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <Input
                placeholder="Search QR codes..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                className="max-w-md"
              />
              
              <Button
                variant="bordered"
                startContent={<Filter className="w-4 h-4" />}
              >
                Filters
              </Button>
            </motion.div>

            {/* QR Codes Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardBody className="p-0">
                  <Table aria-label="QR codes table">
                    <TableHeader>
                      <TableColumn>QR CODE</TableColumn>
                      <TableColumn>LOCATION</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>SCANS</TableColumn>
                      <TableColumn>CREATED</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {filteredQRCodes.map((qr) => (
                        <TableRow key={qr.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {qr.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {qr.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">
                              {qr.location}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={getStatusColor(qr.status) as any}
                            >
                              {qr.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">
                              {qr.scans}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {qr.createdAt}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                onClick={() => copyToClipboard(qr.url)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                  <DropdownItem
                                    key="view"
                                    startContent={<Eye className="w-4 h-4" />}
                                    onClick={() => handleQRAction('view', qr.id)}
                                  >
                                    View Details
                                  </DropdownItem>
                                  <DropdownItem
                                    key="edit"
                                    startContent={<Edit className="w-4 h-4" />}
                                    onClick={() => handleQRAction('edit', qr.id)}
                                  >
                                    Edit QR Code
                                  </DropdownItem>
                                  <DropdownItem
                                    key="download"
                                    startContent={<Download className="w-4 h-4" />}
                                    onClick={() => handleQRAction('download', qr.id)}
                                  >
                                    Download QR
                                  </DropdownItem>
                                  <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    startContent={<Trash2 className="w-4 h-4" />}
                                    onClick={() => handleQRAction('delete', qr.id)}
                                  >
                                    Delete QR Code
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Create QR Code Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>Create New QR Code</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="QR Code Name"
                placeholder="Enter QR code name"
                variant="bordered"
              />
              <Textarea
                label="Description"
                placeholder="Enter description"
                variant="bordered"
              />
              <Input
                label="Location"
                placeholder="Enter location"
                variant="bordered"
              />
              <Input
                label="Custom URL (Optional)"
                placeholder="Enter custom URL"
                variant="bordered"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              Create QR Code
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default QRCodesPage


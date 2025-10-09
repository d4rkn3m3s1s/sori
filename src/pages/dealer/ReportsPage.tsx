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
  DropdownItem
} from '@nextui-org/react'
import { 
  FileText, 
  Search, 
  Download, 
  Calendar,
  BarChart3,
  TrendingUp,
  Filter
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { ExportButton } from '../../components/ui/ExportButton'

function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock reports data
  const reports = [
    {
      id: '1',
      title: 'Monthly Customer Feedback Report',
      description: 'Comprehensive monthly feedback analysis',
      type: 'Monthly',
      status: 'Generated',
      createdAt: '2024-01-20',
      size: '2.4 MB',
      downloads: 15
    },
    {
      id: '2',
      title: 'QR Code Performance Report',
      description: 'QR code scan statistics and performance',
      type: 'Weekly',
      status: 'Generated',
      createdAt: '2024-01-19',
      size: '1.8 MB',
      downloads: 8
    },
    {
      id: '3',
      title: 'Customer Satisfaction Analysis',
      description: 'Detailed satisfaction metrics and trends',
      type: 'Custom',
      status: 'Generating',
      createdAt: '2024-01-18',
      size: '0 MB',
      downloads: 0
    }
  ]

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'success'
      case 'Generating': return 'warning'
      case 'Failed': return 'danger'
      default: return 'default'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Monthly': return 'primary'
      case 'Weekly': return 'success'
      case 'Custom': return 'warning'
      default: return 'default'
    }
  }

  const handleReportAction = (action: string, reportId: string) => {
    console.log(`${action} report:`, reportId)
  }

  const exportReportsData = {
    title: 'Reports List',
    headers: ['Title', 'Description', 'Type', 'Status', 'Created', 'Size', 'Downloads'],
    rows: reports.map(report => [
      report.title,
      report.description,
      report.type,
      report.status,
      report.createdAt,
      report.size,
      report.downloads
    ]),
    metadata: {
      generatedAt: new Date(),
      generatedBy: 'Qratex Admin',
      period: 'All Reports'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Reports" 
          subtitle="Generate and download business reports"
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
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generate and download business reports
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ExportButton
                  data={exportReportsData}
                  filename="reports_list"
                  size="sm"
                />
                <Button
                  color="primary"
                  startContent={<BarChart3 className="w-4 h-4" />}
                >
                  Generate Report
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Reports</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-indigo-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Generated</p>
                      <p className="text-2xl font-bold text-green-600">
                        {reports.filter(r => r.status === 'Generated').length}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Downloads</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {reports.reduce((sum, r) => sum + r.downloads, 0)}
                      </p>
                    </div>
                    <Download className="w-8 h-8 text-blue-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                      <p className="text-2xl font-bold text-purple-600">3</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-500" />
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
                placeholder="Search reports..."
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

            {/* Reports Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardBody className="p-0">
                  <Table aria-label="Reports table">
                    <TableHeader>
                      <TableColumn>REPORT</TableColumn>
                      <TableColumn>TYPE</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>SIZE</TableColumn>
                      <TableColumn>DOWNLOADS</TableColumn>
                      <TableColumn>CREATED</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {report.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {report.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={getTypeColor(report.type) as any}
                            >
                              {report.type}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={getStatusColor(report.status) as any}
                            >
                              {report.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">
                              {report.size}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">
                              {report.downloads}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {report.createdAt}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              color="primary"
                              variant="light"
                              startContent={<Download className="w-4 h-4" />}
                              onClick={() => handleReportAction('download', report.id)}
                              isDisabled={report.status !== 'Generated'}
                            >
                              Download
                            </Button>
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
    </div>
  )
}

export default ReportsPage



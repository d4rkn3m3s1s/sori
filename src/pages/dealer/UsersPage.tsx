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
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Shield, 
  Mail,
  Phone,
  Calendar,
  Filter,
  Download
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { ExportButton } from '../../components/ui/ExportButton'
import { exportDashboardData } from '../../utils/exportUtils'

function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Mock user data
  const users = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@email.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      feedbackCount: 12,
      avatar: 'https://i.pravatar.cc/150?u=ahmet'
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@email.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      feedbackCount: 8,
      avatar: 'https://i.pravatar.cc/150?u=ayse'
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@email.com',
      role: 'Customer',
      status: 'Inactive',
      joinDate: '2024-01-05',
      lastActive: '2024-01-15',
      feedbackCount: 3,
      avatar: 'https://i.pravatar.cc/150?u=mehmet'
    },
    {
      id: '4',
      name: 'Fatma Özkan',
      email: 'fatma@email.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-01-12',
      lastActive: '2024-01-20',
      feedbackCount: 15,
      avatar: 'https://i.pravatar.cc/150?u=fatma'
    }
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'warning'
      case 'Banned': return 'danger'
      default: return 'default'
    }
  }

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId)
  }

  const exportUsersData = {
    title: 'Users Report',
    headers: ['Name', 'Email', 'Role', 'Status', 'Join Date', 'Last Active', 'Feedback Count'],
    rows: users.map(user => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.joinDate,
      user.lastActive,
      user.feedbackCount
    ]),
    metadata: {
      generatedAt: new Date(),
      generatedBy: 'Qratex Admin',
      period: 'All Users'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="User Management" 
          subtitle="Manage your customers and their accounts"
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your customers and their accounts
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ExportButton
                  data={exportUsersData}
                  filename="users_report"
                  size="sm"
                />
                <Button
                  color="primary"
                  startContent={<Plus className="w-4 h-4" />}
                  onClick={onOpen}
                >
                  Add User
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                      <p className="text-2xl font-bold text-green-600">
                        {users.filter(u => u.status === 'Active').length}
                      </p>
                    </div>
                    <Shield className="w-8 h-8 text-green-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {users.reduce((sum, user) => sum + user.feedbackCount, 0)}
                      </p>
                    </div>
                    <Mail className="w-8 h-8 text-purple-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Feedback</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {(users.reduce((sum, user) => sum + user.feedbackCount, 0) / users.length).toFixed(1)}
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
                placeholder="Search users..."
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
              
              <Button
                variant="bordered"
                startContent={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
            </motion.div>

            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardBody className="p-0">
                  <Table aria-label="Users table">
                    <TableHeader>
                      <TableColumn>USER</TableColumn>
                      <TableColumn>ROLE</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>FEEDBACK</TableColumn>
                      <TableColumn>LAST ACTIVE</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar
                                src={user.avatar}
                                size="sm"
                                name={user.name}
                              />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {user.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Chip size="sm" variant="flat" color="primary">
                              {user.role}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={getStatusColor(user.status) as any}
                            >
                              {user.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">
                              {user.feedbackCount}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {user.lastActive}
                            </span>
                          </TableCell>
                          <TableCell>
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
                                  key="edit"
                                  startContent={<Edit className="w-4 h-4" />}
                                  onClick={() => handleUserAction('edit', user.id)}
                                >
                                  Edit User
                                </DropdownItem>
                                <DropdownItem
                                  key="contact"
                                  startContent={<Mail className="w-4 h-4" />}
                                  onClick={() => handleUserAction('contact', user.id)}
                                >
                                  Send Email
                                </DropdownItem>
                                <DropdownItem
                                  key="delete"
                                  className="text-danger"
                                  color="danger"
                                  startContent={<Trash2 className="w-4 h-4" />}
                                  onClick={() => handleUserAction('delete', user.id)}
                                >
                                  Delete User
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
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

      {/* Add User Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter full name"
                variant="bordered"
              />
              <Input
                label="Email"
                placeholder="Enter email address"
                type="email"
                variant="bordered"
              />
              <Input
                label="Phone"
                placeholder="Enter phone number"
                variant="bordered"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              Add User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UsersPage


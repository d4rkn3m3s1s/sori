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
  useDisclosure,
  Textarea
} from '@nextui-org/react'
import { 
  MessageCircle, 
  Search, 
  Filter, 
  MoreVertical, 
  Reply, 
  Flag, 
  ThumbsUp,
  ThumbsDown,
  Star,
  Calendar,
  User,
  Download,
  Eye
} from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'
import { ExportButton } from '../../components/ui/ExportButton'

function CommentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedComment, setSelectedComment] = useState<any>(null)

  // Mock comments data
  const comments = [
    {
      id: '1',
      customer: 'Ahmet Yılmaz',
      avatar: 'https://i.pravatar.cc/150?u=ahmet',
      comment: 'Harika bir deneyim yaşadım! Personel çok ilgili ve yemekler lezzetliydi.',
      rating: 5,
      sentiment: 'Positive',
      location: 'Main Restaurant',
      date: '2024-01-20',
      time: '14:30',
      likes: 12,
      replies: 2,
      status: 'Published'
    },
    {
      id: '2',
      customer: 'Ayşe Demir',
      avatar: 'https://i.pravatar.cc/150?u=ayse',
      comment: 'Servis biraz yavaştı ama yemek kalitesi iyiydi.',
      rating: 4,
      sentiment: 'Neutral',
      location: 'Table 5',
      date: '2024-01-19',
      time: '19:45',
      likes: 8,
      replies: 1,
      status: 'Published'
    },
    {
      id: '3',
      customer: 'Mehmet Kaya',
      avatar: 'https://i.pravatar.cc/150?u=mehmet',
      comment: 'Çok kötü bir deneyim. Yemek soğuk geldi ve personel ilgisizdi.',
      rating: 2,
      sentiment: 'Negative',
      location: 'Drive Through',
      date: '2024-01-18',
      time: '12:15',
      likes: 3,
      replies: 0,
      status: 'Pending'
    },
    {
      id: '4',
      customer: 'Fatma Özkan',
      avatar: 'https://i.pravatar.cc/150?u=fatma',
      comment: 'Mükemmel! Kesinlikle tekrar geleceğim.',
      rating: 5,
      sentiment: 'Positive',
      location: 'Main Restaurant',
      date: '2024-01-17',
      time: '20:30',
      likes: 15,
      replies: 3,
      status: 'Published'
    }
  ]

  const filteredComments = comments.filter(comment =>
    comment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'success'
      case 'Neutral': return 'warning'
      case 'Negative': return 'danger'
      default: return 'default'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'success'
      case 'Pending': return 'warning'
      case 'Hidden': return 'danger'
      default: return 'default'
    }
  }

  const handleCommentAction = (action: string, commentId: string) => {
    console.log(`${action} comment:`, commentId)
    if (action === 'view') {
      const comment = comments.find(c => c.id === commentId)
      setSelectedComment(comment)
      onOpen()
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const exportCommentsData = {
    title: 'Comments Report',
    headers: ['Customer', 'Comment', 'Rating', 'Sentiment', 'Location', 'Date', 'Status'],
    rows: comments.map(comment => [
      comment.customer,
      comment.comment,
      comment.rating,
      comment.sentiment,
      comment.location,
      comment.date,
      comment.status
    ]),
    metadata: {
      generatedAt: new Date(),
      generatedBy: 'Qratex Admin',
      period: 'All Comments'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="dealer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Comments Management" 
          subtitle="Manage customer feedback and comments"
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
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comments Management</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage customer feedback and comments
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ExportButton
                  data={exportCommentsData}
                  filename="comments_report"
                  size="sm"
                />
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Comments</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{comments.length}</p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-blue-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Positive</p>
                      <p className="text-2xl font-bold text-green-600">
                        {comments.filter(c => c.sentiment === 'Positive').length}
                      </p>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Negative</p>
                      <p className="text-2xl font-bold text-red-600">
                        {comments.filter(c => c.sentiment === 'Negative').length}
                      </p>
                    </div>
                    <ThumbsDown className="w-8 h-8 text-red-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {(comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)}
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
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
                placeholder="Search comments..."
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

            {/* Comments Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardBody className="p-0">
                  <Table aria-label="Comments table">
                    <TableHeader>
                      <TableColumn>CUSTOMER</TableColumn>
                      <TableColumn>COMMENT</TableColumn>
                      <TableColumn>RATING</TableColumn>
                      <TableColumn>SENTIMENT</TableColumn>
                      <TableColumn>LOCATION</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {filteredComments.map((comment) => (
                        <TableRow key={comment.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar
                                src={comment.avatar}
                                size="sm"
                                name={comment.customer}
                              />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {comment.customer}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {comment.date} {comment.time}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                                {comment.comment}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-500">
                                  {comment.likes} likes
                                </span>
                                <span className="text-xs text-gray-500">
                                  {comment.replies} replies
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {renderStars(comment.rating)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={getSentimentColor(comment.sentiment) as any}
                            >
                              {comment.sentiment}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">
                              {comment.location}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={getStatusColor(comment.status) as any}
                            >
                              {comment.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                onClick={() => handleCommentAction('view', comment.id)}
                              >
                                <Eye className="w-4 h-4" />
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
                                    key="reply"
                                    startContent={<Reply className="w-4 h-4" />}
                                    onClick={() => handleCommentAction('reply', comment.id)}
                                  >
                                    Reply
                                  </DropdownItem>
                                  <DropdownItem
                                    key="flag"
                                    startContent={<Flag className="w-4 h-4" />}
                                    onClick={() => handleCommentAction('flag', comment.id)}
                                  >
                                    Flag Comment
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

      {/* Comment Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>
            {selectedComment && `Comment from ${selectedComment.customer}`}
          </ModalHeader>
          <ModalBody>
            {selectedComment && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={selectedComment.avatar}
                    size="md"
                    name={selectedComment.customer}
                  />
                  <div>
                    <p className="font-medium">{selectedComment.customer}</p>
                    <p className="text-sm text-gray-500">
                      {selectedComment.date} at {selectedComment.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {renderStars(selectedComment.rating)}
                  <span className="ml-2 text-sm text-gray-500">
                    {selectedComment.rating}/5
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedComment.comment}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Chip 
                    size="sm" 
                    variant="flat" 
                    color={getSentimentColor(selectedComment.sentiment) as any}
                  >
                    {selectedComment.sentiment}
                  </Chip>
                  <span className="text-sm text-gray-500">
                    Location: {selectedComment.location}
                  </span>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CommentsPage


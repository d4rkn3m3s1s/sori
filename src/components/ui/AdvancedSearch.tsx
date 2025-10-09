import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Input, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Chip,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { 
  Search, 
  Filter, 
  X, 
  Clock, 
  TrendingUp, 
  Star,
  MessageSquare,
  Award,
  BarChart3,
  History,
  ChevronDown
} from 'lucide-react'

export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'feedback' | 'badge' | 'analytics' | 'user' | 'report'
  category?: string
  date?: Date
  rating?: number
  url: string
  icon?: React.ComponentType<any>
}

export interface SearchFilter {
  type: string[]
  category: string[]
  dateRange: {
    start?: Date
    end?: Date
  }
  rating?: number
}

interface AdvancedSearchProps {
  isOpen: boolean
  onClose: () => void
  onResultClick?: (result: SearchResult) => void
  placeholder?: string
}

// Mock search data
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    title: 'McDonald\'s Feedback',
    description: 'Recent customer feedback about service quality',
    type: 'feedback',
    category: 'Restaurant',
    date: new Date('2024-01-15'),
    rating: 4.5,
    url: '/customer/feedback/1',
    icon: MessageSquare
  },
  {
    id: '2',
    title: 'Big Mac Badge',
    description: 'Achievement badge for 20+ comments',
    type: 'badge',
    category: 'Activity',
    date: new Date('2024-01-10'),
    url: '/customer/badges',
    icon: Award
  },
  {
    id: '3',
    title: 'Monthly Analytics',
    description: 'Customer satisfaction trends and insights',
    type: 'analytics',
    category: 'Reports',
    date: new Date('2024-01-01'),
    url: '/customer/analytics',
    icon: BarChart3
  },
  {
    id: '4',
    title: 'Starbucks Review',
    description: 'Coffee quality feedback from last visit',
    type: 'feedback',
    category: 'Restaurant',
    date: new Date('2024-01-12'),
    rating: 5.0,
    url: '/customer/feedback/4',
    icon: MessageSquare
  },
  {
    id: '5',
    title: 'Filozof Badge',
    description: 'Badge for detailed and thoughtful comments',
    type: 'badge',
    category: 'Behavior',
    date: new Date('2024-01-08'),
    url: '/customer/badges',
    icon: Award
  }
]

const searchHistory = [
  'McDonald\'s feedback',
  'badge collection',
  'analytics report',
  'Starbucks review'
]

export function AdvancedSearch({ 
  isOpen, 
  onClose, 
  onResultClick,
  placeholder = "Search everything..." 
}: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [filters, setFilters] = useState<SearchFilter>({
    type: [],
    category: [],
    dateRange: {}
  })
  const [showFilters, setShowFilters] = useState(false)
  const [recentSearches, setRecentSearches] = useState(searchHistory)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Search function
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Filter mock data based on query and filters
    let filteredResults = mockSearchData.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                          item.description.toLowerCase().includes(query.toLowerCase())
      
      const matchesType = filters.type.length === 0 || filters.type.includes(item.type)
      const matchesCategory = filters.category.length === 0 || 
                             (item.category && filters.category.includes(item.category))
      
      return matchesQuery && matchesType && matchesCategory
    })
    
    setSearchResults(filteredResults)
    setIsSearching(false)
  }

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      performSearch(value)
    } else {
      setSearchResults([])
    }
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Add to search history
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)])
      }
      performSearch(searchQuery)
    }
  }

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result)
    }
    onClose()
  }

  // Handle filter change
  const handleFilterChange = (filterType: keyof SearchFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
    
    // Re-search with new filters
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    }
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({
      type: [],
      category: [],
      dateRange: {}
    })
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    }
  }

  const typeOptions = [
    { key: 'feedback', label: 'Feedback', icon: MessageSquare },
    { key: 'badge', label: 'Badges', icon: Award },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'user', label: 'Users', icon: Star },
    { key: 'report', label: 'Reports', icon: BarChart3 }
  ]

  const categoryOptions = [
    { key: 'Restaurant', label: 'Restaurant' },
    { key: 'Activity', label: 'Activity' },
    { key: 'Behavior', label: 'Behavior' },
    { key: 'Reports', label: 'Reports' }
  ]

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        base: "max-h-[80vh]",
        body: "py-6",
        header: "pb-2"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-purple-500" />
            <span>Advanced Search</span>
          </div>
        </ModalHeader>
        
        <ModalBody>
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <Input
              ref={inputRef}
              placeholder={placeholder}
              value={searchQuery}
              onValueChange={handleSearchChange}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              endContent={
                <div className="flex items-center space-x-2">
                  {searchQuery && (
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => {
                        setSearchQuery('')
                        setSearchResults([])
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={() => setShowFilters(!showFilters)}
                    className={showFilters ? 'bg-purple-100 text-purple-600' : ''}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              }
              variant="bordered"
              classNames={{
                input: "text-lg",
                inputWrapper: "border-gray-200 hover:border-purple-300 focus-within:border-purple-500"
              }}
            />

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white">Filters</h4>
                    <Button
                      size="sm"
                      variant="light"
                      onClick={clearFilters}
                      className="text-gray-500"
                    >
                      Clear All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Type Filter */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Type
                      </label>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            endContent={<ChevronDown className="w-4 h-4" />}
                            className="justify-between"
                          >
                            {filters.type.length === 0 ? 'All Types' : `${filters.type.length} selected`}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          selectionMode="multiple"
                          selectedKeys={filters.type}
                          onSelectionChange={(keys) => handleFilterChange('type', Array.from(keys))}
                        >
                          {typeOptions.map((option) => (
                            <DropdownItem key={option.key} startContent={<option.icon className="w-4 h-4" />}>
                              {option.label}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Category
                      </label>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            endContent={<ChevronDown className="w-4 h-4" />}
                            className="justify-between"
                          >
                            {filters.category.length === 0 ? 'All Categories' : `${filters.category.length} selected`}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          selectionMode="multiple"
                          selectedKeys={filters.category}
                          onSelectionChange={(keys) => handleFilterChange('category', Array.from(keys))}
                        >
                          {categoryOptions.map((option) => (
                            <DropdownItem key={option.key}>
                              {option.label}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {(filters.type.length > 0 || filters.category.length > 0) && (
                    <div className="flex flex-wrap gap-2">
                      {filters.type.map((type) => (
                        <Chip
                          key={type}
                          size="sm"
                          onClose={() => {
                            const newTypes = filters.type.filter(t => t !== type)
                            handleFilterChange('type', newTypes)
                          }}
                          variant="flat"
                          color="primary"
                        >
                          {typeOptions.find(opt => opt.key === type)?.label || type}
                        </Chip>
                      ))}
                      {filters.category.map((category) => (
                        <Chip
                          key={category}
                          size="sm"
                          onClose={() => {
                            const newCategories = filters.category.filter(c => c !== category)
                            handleFilterChange('category', newCategories)
                          }}
                          variant="flat"
                          color="secondary"
                        >
                          {category}
                        </Chip>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Search Results */}
          <div className="space-y-4">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <span className="ml-3 text-gray-500">Searching...</span>
              </div>
            ) : searchQuery && searchResults.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Results ({searchResults.length})
                  </h4>
                </div>
                {searchResults.map((result) => {
                  const IconComponent = result.icon || Search
                  return (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="cursor-pointer"
                      onClick={() => handleResultClick(result)}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardBody className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                              <IconComponent className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-gray-900 dark:text-white truncate">
                                {result.title}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {result.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <Chip size="sm" variant="flat" color="primary">
                                  {typeOptions.find(opt => opt.key === result.type)?.label || result.type}
                                </Chip>
                                {result.category && (
                                  <Chip size="sm" variant="flat" color="secondary">
                                    {result.category}
                                  </Chip>
                                )}
                                {result.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-xs text-gray-500">{result.rating}</span>
                                  </div>
                                )}
                                {result.date && (
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">
                                      {result.date.toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            ) : searchQuery && searchResults.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">No results found</h4>
                <p className="text-sm text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <History className="w-4 h-4 text-gray-400" />
                      <h4 className="font-medium text-gray-900 dark:text-white">Recent Searches</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <Chip
                          key={index}
                          size="sm"
                          variant="flat"
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            setSearchQuery(search)
                            performSearch(search)
                          }}
                        >
                          {search}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Quick Actions</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'View All Feedback', icon: MessageSquare, action: () => {} },
                      { label: 'Badge Collection', icon: Award, action: () => {} },
                      { label: 'Analytics Report', icon: BarChart3, action: () => {} },
                      { label: 'Recent Activity', icon: Clock, action: () => {} }
                    ].map((action, index) => (
                      <Button
                        key={index}
                        variant="bordered"
                        size="sm"
                        startContent={<action.icon className="w-4 h-4" />}
                        className="justify-start"
                        onClick={action.action}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}


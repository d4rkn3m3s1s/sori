import { useState, useEffect, useMemo } from 'react'

export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'page' | 'badge' | 'feedback' | 'user' | 'business'
  url: string
  icon?: string
  category?: string
}

// Mock data for search - in real app this would come from API
const mockSearchData: SearchResult[] = [
  // Pages
  { id: '1', title: 'Dashboard', description: 'Ana kontrol paneli', type: 'page', url: '/customer/dashboard', icon: '📊' },
  { id: '2', title: 'Rozetler', description: 'Rozet koleksiyonunuz', type: 'page', url: '/customer/badges', icon: '🏆' },
  { id: '3', title: 'Liderlik Tablosu', description: 'Sıralama ve yarışma', type: 'page', url: '/customer/leaderboard', icon: '🥇' },
  { id: '4', title: 'Geri Bildirimlerim', description: 'Verdiğiniz yorumlar', type: 'page', url: '/customer/feedback', icon: '💬' },
  { id: '5', title: 'Analitikler', description: 'Kişisel istatistikleriniz', type: 'page', url: '/customer/analytics', icon: '📈' },
  { id: '6', title: 'QR Tarayıcı', description: 'QR kod tarama', type: 'page', url: '/customer/scanner', icon: '📱' },
  { id: '7', title: 'Bildirimler', description: 'Yeni bildirimler', type: 'page', url: '/customer/notifications', icon: '🔔' },
  { id: '8', title: 'Ayarlar', description: 'Hesap ayarları', type: 'page', url: '/customer/settings', icon: '⚙️' },

  // Badges
  { id: '9', title: 'Yeni Ses', description: 'İlk yorumunuzu yaptınız', type: 'badge', url: '/customer/badges', icon: '🎤', category: 'Aktivite' },
  { id: '10', title: 'Filozof', description: 'Detaylı yorumlar yapan', type: 'badge', url: '/customer/badges', icon: '🧠', category: 'Davranış' },
  { id: '11', title: 'Şakamatik', description: 'Eğlenceli yorumlar yapan', type: 'badge', url: '/customer/badges', icon: '🃏', category: 'Davranış' },
  { id: '12', title: 'McDonald\'s McNuggets', description: 'McDonald\'s\'ta 3 yorum', type: 'badge', url: '/customer/badges', icon: '🍟', category: 'Marka' },
  { id: '13', title: 'Starbucks Espresso', description: 'Starbucks\'ta ilk yorum', type: 'badge', url: '/customer/badges', icon: '☕', category: 'Marka' },

  // Businesses
  { id: '14', title: 'McDonald\'s Kadıköy', description: 'Fast food restoranı', type: 'business', url: '/business/mcdonalds-kadikoy', icon: '🍔' },
  { id: '15', title: 'Starbucks Bağdat Caddesi', description: 'Kahve dükkanı', type: 'business', url: '/business/starbucks-bagdat', icon: '☕' },
  { id: '16', title: 'Nike Store Zorlu', description: 'Spor mağazası', type: 'business', url: '/business/nike-zorlu', icon: '👟' },

  // Features
  { id: '17', title: 'Dark Theme', description: 'Karanlık tema ayarı', type: 'page', url: '/customer/settings', icon: '🌙' },
  { id: '18', title: 'Export Data', description: 'Verileri dışa aktarma', type: 'page', url: '/customer/analytics', icon: '📤' },
  { id: '19', title: 'Notification Settings', description: 'Bildirim ayarları', type: 'page', url: '/customer/settings', icon: '🔔' }
]

export function useGlobalSearch() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('qratex-recent-searches')
    return saved ? JSON.parse(saved) : []
  })

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return mockSearchData.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category?.toLowerCase().includes(searchTerm)
    ).slice(0, 10) // Limit to 10 results
  }, [query])

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    results.forEach(result => {
      const type = result.type
      if (!groups[type]) groups[type] = []
      groups[type].push(result)
    })
    return groups
  }, [results])

  // Add to recent searches
  const addToRecentSearches = (searchTerm: string) => {
    if (!searchTerm.trim()) return
    
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('qratex-recent-searches', JSON.stringify(updated))
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('qratex-recent-searches')
  }

  // Simulate search delay
  useEffect(() => {
    if (query) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setIsSearching(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setIsSearching(false)
    }
  }, [query])

  return {
    query,
    setQuery,
    results,
    groupedResults,
    isSearching,
    recentSearches,
    addToRecentSearches,
    clearRecentSearches
  }
}

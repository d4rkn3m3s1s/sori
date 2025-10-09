import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdvancedSearch, SearchResult } from './AdvancedSearch'

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
}

function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const navigate = useNavigate()

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url)
  }

  return (
    <AdvancedSearch
      isOpen={isOpen}
      onClose={onClose}
      onResultClick={handleResultClick}
      placeholder="Ara... (sayfalar, rozetler, işletmeler)"
    />
  )
}

export default GlobalSearch

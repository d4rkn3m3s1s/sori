import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Local storage'dan tema tercihini al
    const savedTheme = localStorage.getItem('qratex-theme') as Theme
    return savedTheme || 'system'
  })

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const updateTheme = () => {
      const root = window.document.documentElement
      
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(systemTheme)
        if (systemTheme) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
        console.log('System theme applied:', systemTheme)
      } else {
        const isDarkMode = theme === 'dark'
        setIsDark(isDarkMode)
        if (isDarkMode) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
        console.log('Manual theme applied:', theme, isDarkMode)
      }
    }

    updateTheme()

    // Sistem teması değişikliklerini dinle
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  useEffect(() => {
    // Tema tercihini local storage'a kaydet
    localStorage.setItem('qratex-theme', theme)
  }, [theme])

  const value = {
    theme,
    setTheme,
    isDark
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
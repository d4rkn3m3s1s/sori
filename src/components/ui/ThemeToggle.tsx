import { motion } from 'framer-motion'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme()

  const handleThemeChange = (newTheme: Theme) => {
    console.log('Changing theme to:', newTheme)
    setTheme(newTheme)
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="bg-transparent border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          startContent={isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          endContent={<ChevronDown className="w-3 h-3" />}
        >
          <span className="hidden sm:inline">
            {theme === 'light' ? 'Açık' : theme === 'dark' ? 'Koyu' : 'Sistem'}
          </span>
        </Button>
      </DropdownTrigger>
      
      <DropdownMenu 
        aria-label="Tema seçenekleri"
        className="w-64"
        selectedKeys={[theme]}
        onSelectionChange={(keys) => {
          const selectedTheme = Array.from(keys)[0] as Theme
          handleThemeChange(selectedTheme)
        }}
      >
        <DropdownItem
          key="light"
          className="p-3"
          startContent={<Sun className="w-4 h-4" />}
        >
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white">
              Açık Tema
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Parlak ve temiz görünüm
            </span>
          </div>
        </DropdownItem>
        
        <DropdownItem
          key="dark"
          className="p-3"
          startContent={<Moon className="w-4 h-4" />}
        >
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white">
              Koyu Tema
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Göz yormayan koyu görünüm
            </span>
          </div>
        </DropdownItem>
        
        <DropdownItem
          key="system"
          className="p-3"
          startContent={<Monitor className="w-4 h-4" />}
        >
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white">
              Sistem Teması
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Sistem ayarlarını takip et
            </span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

// Basit toggle butonu (sadece light/dark arasında geçiş)
export function SimpleThemeToggle() {
  const { isDark, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        isIconOnly
        variant="bordered"
        className="bg-transparent border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={toggleTheme}
        aria-label="Tema değiştir"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-yellow-500" />
        ) : (
          <Moon className="w-4 h-4 text-blue-500" />
        )}
      </Button>
    </motion.div>
  )
}

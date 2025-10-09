import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from '@nextui-org/react'
import { Download, FileText, Table, FileSpreadsheet, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react'
import { exportToPDF, exportToExcel, exportToCSV, ExportData } from '../../utils/exportUtils'

interface ExportButtonProps {
  data: ExportData
  filename?: string
  variant?: 'light' | 'shadow' | 'solid' | 'flat' | 'bordered' | 'faded' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
}

export function ExportButton({ 
  data, 
  filename, 
  variant = 'bordered', 
  size = 'md',
  className = '',
  showLabel = true
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState<{ type: string; success: boolean; message: string } | null>(null)

  const handleExport = async (type: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(true)
    setExportStatus(null)

    try {
      let result
      switch (type) {
        case 'pdf':
          result = await exportToPDF(data, filename)
          break
        case 'excel':
          result = await exportToExcel(data, filename)
          break
        case 'csv':
          result = exportToCSV(data, filename)
          break
      }

      if (result.success) {
        setExportStatus({
          type,
          success: true,
          message: `${type.toUpperCase()} exported successfully!`
        })
      } else {
        setExportStatus({
          type,
          success: false,
          message: result.error || 'Export failed'
        })
      }
    } catch (error) {
      setExportStatus({
        type,
        success: false,
        message: 'Export failed'
      })
    } finally {
      setIsExporting(false)
      // Clear status after 3 seconds
      setTimeout(() => setExportStatus(null), 3000)
    }
  }

  const exportOptions = [
    {
      key: 'pdf',
      label: 'PDF Document',
      description: 'Professional PDF report',
      icon: FileText,
      color: 'text-red-500'
    },
    {
      key: 'excel',
      label: 'Excel Spreadsheet',
      description: 'Editable Excel file',
      icon: FileSpreadsheet,
      color: 'text-green-500'
    },
    {
      key: 'csv',
      label: 'CSV File',
      description: 'Simple CSV format',
      icon: Table,
      color: 'text-blue-500'
    }
  ]

  return (
    <div className="relative">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant={variant}
            size={size}
            className={`${className} ${isExporting ? 'opacity-50' : ''}`}
            startContent={
              isExporting ? (
                <Spinner size="sm" />
              ) : (
                <Download className="w-4 h-4" />
              )
            }
            endContent={!isExporting && <ChevronDown className="w-3 h-3" />}
            isDisabled={isExporting}
          >
            {showLabel && (isExporting ? 'Exporting...' : 'Export')}
          </Button>
        </DropdownTrigger>
        
        <DropdownMenu 
          aria-label="Export options"
          className="w-64"
          onAction={(key) => handleExport(key as 'pdf' | 'excel' | 'csv')}
        >
          {exportOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <DropdownItem
                key={option.key}
                className="p-3"
                startContent={
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className={`w-4 h-4 ${option.color}`} />
                  </motion.div>
                }
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {option.label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {option.description}
                  </span>
                </div>
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </Dropdown>

      {/* Export Status */}
      {exportStatus && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 p-2 rounded-lg shadow-lg z-50"
          style={{
            backgroundColor: exportStatus.success ? '#10B981' : '#EF4444',
            color: 'white'
          }}
        >
          <div className="flex items-center space-x-2">
            {exportStatus.success ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {exportStatus.message}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Quick export buttons for common formats
export function QuickExportButtons({ data, filename, className = '' }: { data: ExportData; filename?: string; className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        size="sm"
        variant="light"
        isIconOnly
        onClick={() => exportToPDF(data, filename)}
        className="text-red-500 hover:bg-red-50"
        title="Export to PDF"
      >
        <FileText className="w-4 h-4" />
      </Button>
      
      <Button
        size="sm"
        variant="light"
        isIconOnly
        onClick={() => exportToExcel(data, filename)}
        className="text-green-500 hover:bg-green-50"
        title="Export to Excel"
      >
        <FileSpreadsheet className="w-4 h-4" />
      </Button>
      
      <Button
        size="sm"
        variant="light"
        isIconOnly
        onClick={() => exportToCSV(data, filename)}
        className="text-blue-500 hover:bg-blue-50"
        title="Export to CSV"
      >
        <Table className="w-4 h-4" />
      </Button>
    </div>
  )
}
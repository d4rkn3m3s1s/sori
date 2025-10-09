import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Preloader from './components/ui/Preloader'
import LandingPage from './pages/LandingPage'
import DealerLogin from './pages/auth/DealerLogin'
import CustomerLogin from './pages/auth/CustomerLogin'
import DealerRegister from './pages/auth/DealerRegister'
import CustomerRegister from './pages/auth/CustomerRegister'
import DealerDashboard from './pages/dashboard/DealerDashboard'
import CustomerDashboard from './pages/dashboard/AdvancedCustomerDashboard'
import FeedbackPage from './pages/dealer/FeedbackPage'
import AnalyticsPage from './pages/dealer/AnalyticsPage'
import AIInsightsPage from './pages/dealer/AIInsightsPage'
import BadgesPage from './pages/badges/BadgesPage'
import LeaderboardPage from './pages/badges/LeaderboardPage'
import CustomerFeedbackPage from './pages/customer/FeedbackPage'
import EnhancedCustomerFeedbackPage from './pages/customer/EnhancedFeedbackPage'
import CustomerAnalyticsPage from './pages/customer/AnalyticsPage'
import CustomerScannerPage from './pages/customer/ScannerPage'
import CustomerNotificationsPage from './pages/customer/NotificationsPage'
import CustomerSettingsPage from './pages/customer/SettingsPage'
import UsersPage from './pages/dealer/UsersPage'
import QRCodesPage from './pages/dealer/QRCodesPage'
import CommentsPage from './pages/dealer/CommentsPage'
import SurveysPage from './pages/dealer/SurveysPage'
import ReportsPage from './pages/dealer/ReportsPage'
import NotificationsPage from './pages/dealer/NotificationsPage'
import SecurityPage from './pages/dealer/SecurityPage'
import SettingsPage from './pages/dealer/SettingsPage'
import TestDashboard from './pages/dashboard/TestDashboard'

function App() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <ThemeProvider>
      <Preloader 
        isLoading={isLoading} 
        onComplete={handlePreloaderComplete}
        duration={1500}
      />
      
      {!isLoading && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dealer/login" element={<DealerLogin />} />
        <Route path="/dealer/register" element={<DealerRegister />} />
        <Route path="/dealer/dashboard" element={<DealerDashboard />} />
        <Route path="/dealer/feedback" element={<FeedbackPage />} />
        <Route path="/dealer/analytics" element={<AnalyticsPage />} />
        <Route path="/dealer/ai-insights" element={<AIInsightsPage />} />
        <Route path="/dealer/users" element={<UsersPage />} />
        <Route path="/dealer/qr-codes" element={<QRCodesPage />} />
        <Route path="/dealer/comments" element={<CommentsPage />} />
        <Route path="/dealer/surveys" element={<SurveysPage />} />
        <Route path="/dealer/reports" element={<ReportsPage />} />
        <Route path="/dealer/notifications" element={<NotificationsPage />} />
        <Route path="/dealer/security" element={<SecurityPage />} />
        <Route path="/dealer/settings" element={<SettingsPage />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/feedback" element={<EnhancedCustomerFeedbackPage />} />
        <Route path="/customer/analytics" element={<CustomerAnalyticsPage />} />
        <Route path="/customer/scanner" element={<CustomerScannerPage />} />
        <Route path="/customer/notifications" element={<CustomerNotificationsPage />} />
        <Route path="/customer/settings" element={<CustomerSettingsPage />} />
        <Route path="/customer/badges" element={<BadgesPage />} />
        <Route path="/customer/leaderboard" element={<LeaderboardPage />} />
        <Route path="/test" element={<TestDashboard />} />
          </Routes>
        </div>
      )}
    </ThemeProvider>
  )
}

export default App

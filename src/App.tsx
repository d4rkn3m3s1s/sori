import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
import TVShowBadgesPage from './pages/badges/TVShowBadgesPage'
import LeagueSystemPage from './pages/badges/LeagueSystemPage'
import LiveLeaderboardPage from './pages/customer/LiveLeaderboardPage'
import VIPClubPage from './pages/customer/VIPClubPage'
import StatsDashboardPage from './pages/customer/StatsDashboardPage'
import DonationPage from './pages/customer/DonationPage'
import SSPGoodnessLeaderboard from './pages/customer/SSPGoodnessLeaderboard'
import CustomerFeedbackPage from './pages/customer/FeedbackPage'
import EnhancedCustomerFeedbackPage from './pages/customer/EnhancedFeedbackPage'
import CustomerAnalyticsPage from './pages/customer/AnalyticsPage'
import EnhancedAnalyticsPage from './pages/customer/EnhancedAnalyticsPage'
import GoalsPage from './pages/customer/GoalsPage'
import ProfileCustomizationPage from './pages/customer/ProfileCustomizationPage'
import AchievementsPage from './pages/customer/AchievementsPage'
import RewardStorePage from './pages/customer/RewardStorePage'
import QuestsPage from './pages/customer/QuestsPage'
import ActivityLogPage from './pages/customer/ActivityLogPage'
import EnhancedNotificationsPage from './pages/customer/EnhancedNotificationsPage'
import TrendsPage from './pages/customer/TrendsPage'
import EventsPage from './pages/customer/EventsPage'
import BusinessTrackingPage from './pages/customer/BusinessTrackingPage'
import MiniGamesPage from './pages/customer/MiniGamesPage'
import CustomerScannerPage from './pages/customer/ScannerPage'
import CustomerNotificationsPage from './pages/customer/NotificationsPage'
import CustomerSettingsPage from './pages/customer/SettingsPage'
import ReceiptsPage from './pages/customer/ReceiptsPage'
import ReceiptAnalyticsPage from './pages/customer/ReceiptAnalyticsPage'
import RewardPoolPage from './pages/customer/RewardPoolPage'
import SurpriseGiftBoxPage from './pages/customer/SurpriseGiftBoxPage'
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
    <>
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
        <Route path="/customer/enhanced-analytics" element={<EnhancedAnalyticsPage />} />
        <Route path="/customer/goals" element={<GoalsPage />} />
        <Route path="/customer/profile-customize" element={<ProfileCustomizationPage />} />
        <Route path="/customer/achievements" element={<AchievementsPage />} />
        <Route path="/customer/reward-store" element={<RewardStorePage />} />
        <Route path="/customer/quests" element={<QuestsPage />} />
        <Route path="/customer/activity-log" element={<ActivityLogPage />} />
        <Route path="/customer/enhanced-notifications" element={<EnhancedNotificationsPage />} />
        <Route path="/customer/trends" element={<TrendsPage />} />
        <Route path="/customer/events" element={<EventsPage />} />
        <Route path="/customer/business-tracking" element={<BusinessTrackingPage />} />
        <Route path="/customer/mini-games" element={<MiniGamesPage />} />
        <Route path="/customer/scanner" element={<CustomerScannerPage />} />
        <Route path="/customer/notifications" element={<CustomerNotificationsPage />} />
        <Route path="/customer/settings" element={<CustomerSettingsPage />} />
        <Route path="/customer/receipts" element={<ReceiptsPage />} />
        <Route path="/customer/receipt-analytics" element={<ReceiptAnalyticsPage />} />
        <Route path="/customer/reward-pool" element={<RewardPoolPage />} />
        <Route path="/customer/surprise-gifts" element={<SurpriseGiftBoxPage />} />
        <Route path="/customer/badges" element={<BadgesPage />} />
        <Route path="/customer/leaderboard" element={<LeaderboardPage />} />
        <Route path="/customer/live-leaderboard" element={<LiveLeaderboardPage />} />
        <Route path="/customer/vip-club" element={<VIPClubPage />} />
        <Route path="/customer/stats-dashboard" element={<StatsDashboardPage />} />
        <Route path="/customer/donations" element={<DonationPage />} />
        <Route path="/customer/ssp-leaderboard" element={<SSPGoodnessLeaderboard />} />
        <Route path="/customer/tv-badges" element={<TVShowBadgesPage />} />
        <Route path="/customer/league" element={<LeagueSystemPage />} />
        <Route path="/test" element={<TestDashboard />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App

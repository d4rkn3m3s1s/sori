import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Button } from '@nextui-org/react'
import { MessageSquare, Star, TrendingUp, QrCode } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import Header from '../../components/dashboard/Header'

function SimpleCustomerDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType="customer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Dashboard" 
          subtitle="Welcome back to QRATEX Customer Portal"
          userType="customer" 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6">
                <CardBody>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Hoş Geldiniz! 👋
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    QRATEX Customer Portal'a hoş geldiniz. Bu basit dashboard test sayfasıdır.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-6">
                  <CardBody className="text-center">
                    <MessageSquare className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Feedback</h3>
                    <p className="text-2xl font-bold text-blue-500">24</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-6">
                  <CardBody className="text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rating</h3>
                    <p className="text-2xl font-bold text-yellow-500">4.8</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-6">
                  <CardBody className="text-center">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Growth</h3>
                    <p className="text-2xl font-bold text-green-500">+12%</p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-6">
                  <CardBody className="text-center">
                    <QrCode className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">QR Scans</h3>
                    <p className="text-2xl font-bold text-purple-500">156</p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center space-x-4"
            >
              <Button color="primary" size="lg">
                Start Feedback
              </Button>
              <Button color="secondary" size="lg">
                View Analytics
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SimpleCustomerDashboard



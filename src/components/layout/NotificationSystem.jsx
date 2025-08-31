import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { hoverScale } from '../../lib/animations'

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'info',
    title: 'New compliance update',
    message: 'CIDB has updated regulations for electrical installations',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: 'Project bid accepted',
    message: 'Your bid for Kuala Lumpur Tower renovation was accepted',
    time: '1 day ago',
    read: false
  },
  {
    id: 3,
    type: 'warning',
    title: 'Material price alert',
    message: 'Steel prices have increased by 5% in the last week',
    time: '3 days ago',
    read: true
  }
]

export default function NotificationSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = (e) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const unreadCount = notifications.filter(notification => !notification.read).length

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case 'warning': return <AlertCircle className="h-5 w-5 text-amber-500" />
      default: return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  }

  const notificationVariants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: { opacity: 1, height: 'auto', marginBottom: 12 },
    exit: { opacity: 0, height: 0, marginBottom: 0 }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="rounded-full relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="h-[1.2rem] w-[1.2rem]" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
            {unreadCount}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </Button>
      
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute right-0 mt-2 w-80 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout" initial={false}>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        layout
                        variants={notificationVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`p-3 rounded-md relative ${notification.read ? 'bg-card' : 'bg-muted'}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {!notification.read && (
                          <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              
              {notifications.length > 0 && (
                <div className="mt-4 pt-3 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    to="/notifications"
                  >
                    View all notifications
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
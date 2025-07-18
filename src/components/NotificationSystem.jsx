import React, { useState, useEffect } from 'react'

const NotificationItem = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(notification.id), 300) // Allow time for fade-out animation
    }, notification.duration || 5000)
    
    return () => clearTimeout(timer)
  }, [notification, onClose])
  
  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700'
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700'
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700'
      case 'info':
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700'
    }
  }
  
  return (
    <div 
      className={`${getTypeStyles()} border px-4 py-3 rounded mb-3 flex justify-between items-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <span>{notification.message}</span>
      <button 
        onClick={() => onClose(notification.id)} 
        className="text-current"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}

const NotificationContainer = ({ notifications, onClose }) => {
  if (!notifications.length) return null
  
  return (
    <div className="fixed top-5 right-5 z-50 w-80">
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          onClose={onClose} 
        />
      ))}
    </div>
  )
}

// Create a notification context for app-wide notifications
const NotificationContext = React.createContext({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {}
})

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  
  const addNotification = (notification) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { id, ...notification }])
  }
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }
  
  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onClose={removeNotification} 
      />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = React.useContext(NotificationContext)
  
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  
  return {
    notifications: context.notifications,
    notify: (message, type = 'info', duration = 5000) => {
      context.addNotification({ message, type, duration })
    },
    success: (message, duration = 5000) => {
      context.addNotification({ message, type: 'success', duration })
    },
    error: (message, duration = 5000) => {
      context.addNotification({ message, type: 'error', duration })
    },
    warning: (message, duration = 5000) => {
      context.addNotification({ message, type: 'warning', duration })
    },
    info: (message, duration = 5000) => {
      context.addNotification({ message, type: 'info', duration })
    },
    removeNotification: context.removeNotification
  }
}
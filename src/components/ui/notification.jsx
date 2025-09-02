import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '../../lib/notificationService';
import { cn } from '../../lib/utils';

const NotificationContainer = () => {
  const { notifications, remove } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={remove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationItem = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(notification.id), 150);
  };

  const handleActionClick = (action) => {
    if (typeof action.action === 'function') {
      action.action(notification.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 300, 
        scale: isVisible ? 1 : 0.3 
      }}
      exit={{ opacity: 0, x: 300, scale: 0.3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative p-4 rounded-lg border shadow-lg backdrop-blur-sm",
        getBackgroundColor(notification.type)
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {notification.title && (
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              {notification.title}
            </h4>
          )}
          <p className="text-sm text-gray-700 leading-relaxed">
            {notification.message}
          </p>

          {/* Actions */}
          {notification.actions && notification.actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleActionClick(action)}
                  className="text-xs font-medium px-3 py-1 rounded-md bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors border border-gray-300 hover:border-gray-400"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        {notification.dismissible && (
          <button
            onClick={handleRemove}
            className="flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Progress bar for timed notifications */}
      {notification.duration > 0 && (
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: notification.duration / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
        />
      )}
    </motion.div>
  );
};

// Toast notification hook for imperative usage
export const useToast = () => {
  const { success, error, warning, info } = useNotifications();

  return {
    toast: {
      success: (message, options) => success(message, options),
      error: (message, options) => error(message, options),
      warning: (message, options) => warning(message, options),
      info: (message, options) => info(message, options)
    }
  };
};

export default NotificationContainer;
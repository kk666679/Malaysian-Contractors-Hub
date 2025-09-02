import React from 'react';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, FileEdit, Calculator, Calendar, Users, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { hoverScale } from '../../lib/animations'

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  
  const actions = [
    { 
      icon: <FileEdit className="h-5 w-5" />, 
      label: 'New Project', 
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate('/bid-engine/new')
    },
    { 
      icon: <Calculator className="h-5 w-5" />, 
      label: 'Create Bid', 
      color: 'bg-emerald-500 hover:bg-emerald-600',
      onClick: () => navigate('/bid-engine')
    },
    { 
      icon: <Calendar className="h-5 w-5" />, 
      label: 'Schedule', 
      color: 'bg-amber-500 hover:bg-amber-600',
      onClick: () => navigate('/monsoon-planner')
    },
    { 
      icon: <Users className="h-5 w-5" />, 
      label: 'Find Specialist', 
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => navigate('/marketplace')
    },
    { 
      icon: <MessageSquare className="h-5 w-5" />, 
      label: 'Support', 
      color: 'bg-cyan-500 hover:bg-cyan-600',
      onClick: () => navigate('/contact')
    }
  ]
  
  return (
    <div className="fixed right-6 bottom-6 z-40">
      <AnimatePresence mode="sync" initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 mb-2 flex flex-col-reverse items-end gap-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setIsOpen(false)
                  action.onClick()
                }}
                className={`flex items-center gap-2 rounded-full ${action.color} text-white px-4 py-2 shadow-lg`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">{action.label}</span>
                {action.icon}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-4 shadow-lg ${
          isOpen ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        layout
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </motion.div>
      </motion.button>
    </div>
  )
}
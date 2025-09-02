import React from 'react';
import { motion } from 'framer-motion'
import { cardVariants, layoutTransition } from '../../lib/animations'
import { cn } from '../../lib/utils'

/**
 * A card component with motion animations
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Optional CSS classes
 * @param {boolean} props.layoutId - Optional layout ID for shared layout animations
 * @param {Object} props.customVariants - Custom animation variants
 * @param {Function} props.onClick - Optional click handler
 */
const MotionCard = ({ 
  children, 
  className = '', 
  layoutId = null,
  customVariants = null,
  onClick = null,
  ...props 
}) => {
  const variants = customVariants || cardVariants
  
  return (
    <motion.div
      layoutId={layoutId}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover="hover"
      whileTap="tap"
      {...layoutTransition}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { MotionCard }
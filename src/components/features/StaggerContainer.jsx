import { motion } from 'framer-motion'
import { staggerContainer, staggerItems } from '../lib/animations'

/**
 * A container component that applies staggered animations to its children
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} props.className - Optional CSS classes
 * @param {number} props.staggerDelay - Delay between each child animation (default: 0.1)
 * @param {boolean} props.inView - Whether to trigger animation when in view
 * @param {Object} props.customVariants - Custom animation variants
 */
const StaggerContainer = ({ 
  children, 
  className = '', 
  staggerDelay = 0.1,
  inView = false,
  customVariants = null
}) => {
  // Create custom stagger timing if needed
  const containerVariants = customVariants || {
    ...staggerContainer,
    animate: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  return (
    <motion.div
      initial="initial"
      animate={inView ? "animate" : "initial"}
      exit="exit"
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={staggerItems}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={staggerItems}>{children}</motion.div>
      }
    </motion.div>
  )
}

export default StaggerContainer
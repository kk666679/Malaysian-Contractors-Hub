import { motion } from 'framer-motion'
import { slideUp, easeTransition } from '../lib/animations'

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideUp}
      transition={easeTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
// Animation variants for Framer Motion v12

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

export const scaleUp = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 }
}

export const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 }
}

export const buttonTap = {
  scale: 0.95,
  transition: { type: "spring", stiffness: 400, damping: 10 }
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 17
}

export const easeTransition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.4
}
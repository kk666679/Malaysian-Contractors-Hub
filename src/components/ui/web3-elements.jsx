import { motion } from 'framer-motion';
import styled from 'styled-components';
import { darkTheme, fonts } from '../../styles/theme';

// Glass Card component with glow effect
export const GlassCard = styled(motion.div)`
  background: ${darkTheme.background.glass};
  backdrop-filter: blur(10px);
  border-radius: ${darkTheme.border.radius.medium};
  border: ${darkTheme.border.width} solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: ${darkTheme.shadow.medium};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${darkTheme.gradient.primary};
    opacity: 0.7;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${darkTheme.gradient.glow};
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: -1;
  }
`;

// Neon Button with hover animation
export const NeonButton = styled(motion.button)`
  background: transparent;
  border: ${darkTheme.border.width} solid ${darkTheme.accent.primary};
  border-radius: ${darkTheme.border.radius.full};
  color: ${darkTheme.text.primary};
  font-family: ${fonts.display};
  font-size: ${fonts.sizes.md};
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
  
  &:hover {
    background: rgba(0, 240, 255, 0.1);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
  }
  
  &:active {
    transform: translateY(2px);
  }
`;

// Gradient Text
export const GradientText = styled(motion.span)`
  background: ${props => props.gradient || darkTheme.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-family: ${fonts.display};
  font-weight: 700;
`;

// Web3 Heading
export const Web3Heading = styled(motion.h2)`
  font-family: ${fonts.display};
  color: ${darkTheme.text.primary};
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60%;
    height: 2px;
    background: ${darkTheme.gradient.primary};
  }
`;

// Glowing Icon Container
export const GlowingIcon = styled(motion.div)`
  color: ${darkTheme.accent.primary};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: ${darkTheme.border.radius.full};
  background: rgba(0, 240, 255, 0.1);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
`;

// Grid Layout
export const Web3Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const glowPulse = {
  initial: { boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)' },
  pulse: { 
    boxShadow: ['0 0 10px rgba(0, 240, 255, 0.3)', '0 0 20px rgba(0, 240, 255, 0.6)', '0 0 10px rgba(0, 240, 255, 0.3)'],
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
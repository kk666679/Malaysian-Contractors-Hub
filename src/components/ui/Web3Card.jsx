import { motion } from 'framer-motion';
import styled from 'styled-components';
import { darkTheme } from '../../styles/theme';

const CardVariants = {
  default: {
    background: darkTheme.background.secondary,
    border: `1px solid rgba(255, 255, 255, 0.1)`,
  },
  glass: {
    background: darkTheme.background.glass,
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    backdropFilter: 'blur(10px)',
  },
  gradient: {
    background: `linear-gradient(135deg, ${darkTheme.background.secondary} 0%, ${darkTheme.background.tertiary} 100%)`,
    border: `1px solid rgba(255, 255, 255, 0.05)`,
  },
  highlighted: {
    background: darkTheme.background.secondary,
    border: `1px solid ${darkTheme.accent.primary}`,
  },
};

const StyledCard = styled(motion.div)`
  background: ${props => CardVariants[props.variant]?.background || CardVariants.default.background};
  border: ${props => CardVariants[props.variant]?.border || CardVariants.default.border};
  backdrop-filter: ${props => CardVariants[props.variant]?.backdropFilter || 'none'};
  border-radius: ${darkTheme.border.radius.medium};
  padding: ${props => props.padding || '1.5rem'};
  box-shadow: ${darkTheme.shadow.medium};
  position: relative;
  overflow: hidden;
  
  ${props => props.variant === 'highlighted' && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: ${darkTheme.gradient.primary};
    }
  `}
  
  ${props => props.glowEffect && `
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
    
    &:hover::after {
      opacity: 1;
    }
  `}
`;

const Web3Card = ({ 
  children, 
  variant = 'default',
  padding,
  glowEffect = false,
  ...props 
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      glowEffect={glowEffect}
      whileHover={{ y: glowEffect ? -5 : 0, transition: { duration: 0.2 } }}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Web3Card;
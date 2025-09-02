import { motion } from 'framer-motion';
import styled from 'styled-components';
import { darkTheme, fonts } from '../../styles/theme';

const ButtonVariants = {
  primary: {
    background: darkTheme.gradient.primary,
    color: darkTheme.text.primary,
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: darkTheme.text.primary,
    border: `1px solid ${darkTheme.accent.primary}`,
  },
  outline: {
    background: 'transparent',
    color: darkTheme.accent.primary,
    border: `1px solid ${darkTheme.accent.primary}`,
  },
  ghost: {
    background: 'transparent',
    color: darkTheme.text.primary,
    border: 'none',
  },
};

const StyledButton = styled(motion.button)`
  background: ${props => ButtonVariants[props.variant]?.background || ButtonVariants.primary.background};
  color: ${props => ButtonVariants[props.variant]?.color || ButtonVariants.primary.color};
  border: ${props => ButtonVariants[props.variant]?.border || ButtonVariants.primary.border};
  border-radius: ${props => props.rounded ? '9999px' : darkTheme.border.radius.medium};
  font-family: ${fonts.display};
  font-size: ${props => props.size === 'small' ? fonts.sizes.sm : 
                props.size === 'large' ? fonts.sizes.lg : 
                fonts.sizes.md};
  font-weight: 500;
  padding: ${props => props.size === 'small' ? '0.5rem 1rem' : 
             props.size === 'large' ? '1rem 2rem' : 
             '0.75rem 1.5rem'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: ${props => props.variant === 'primary' ? darkTheme.shadow.medium : 'none'};
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.variant === 'primary' && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
  `}
  
  ${props => props.variant === 'outline' && `
    &:hover {
      background: rgba(0, 240, 255, 0.1);
      box-shadow: ${darkTheme.shadow.small};
    }
  `}
  
  ${props => props.variant === 'ghost' && `
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  `}
`;

const Web3Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  rounded = false,
  icon,
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      rounded={rounded}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      {...props}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

export default Web3Button;
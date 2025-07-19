import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import useClickOutside from '../../hooks/useClickOutside';

const DropdownMenu = ({ 
  trigger, 
  children, 
  align = 'right',
  className = '',
  contentClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsOpen(false));

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {typeof trigger === 'function' ? trigger(isOpen) : trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 mt-2 min-w-[10rem] rounded-md bg-background border border-border shadow-lg",
              align === 'left' ? 'left-0' : 'right-0',
              contentClassName
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  icon
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const DropdownSeparator = () => {
  return <div className="my-1 h-px w-full bg-border" />;
};

const DropdownLabel = ({ children, className = '' }) => {
  return (
    <div className={cn("px-4 py-1.5 text-xs font-medium text-muted-foreground", className)}>
      {children}
    </div>
  );
};

export { DropdownMenu, DropdownItem, DropdownSeparator, DropdownLabel };
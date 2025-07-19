import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (isOpen) setIsOpen(false);
  };

  // Animation variants for the icon
  const iconVariants = {
    initial: { scale: 0.6, rotate: 0 },
    animate: { scale: 1, rotate: 360, transition: { duration: 0.5 } },
  };

  // Get the current theme icon with animation
  const ThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return (
          <motion.div
            key="moon"
            initial="initial"
            animate="animate"
            variants={iconVariants}
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        );
      case 'light':
        return (
          <motion.div
            key="sun"
            initial="initial"
            animate="animate"
            variants={iconVariants}
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="monitor"
            initial="initial"
            animate="animate"
            variants={iconVariants}
          >
            <Monitor className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        );
    }
  };

  return (
    <div className="relative" onClick={handleClickOutside}>
      <motion.button
        onClick={handleToggle}
        className="flex items-center justify-center p-2 rounded-full bg-background-secondary hover:bg-background-tertiary transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <ThemeIcon />
        <span className="sr-only">Toggle theme</span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 rounded-md bg-background-secondary shadow-card border border-border z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              <motion.button
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                onClick={() => handleThemeChange('light')}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  theme === 'light' ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background-tertiary'
                }`}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  theme === 'dark' ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background-tertiary'
                }`}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                onClick={() => handleThemeChange('system')}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  theme === 'system' ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background-tertiary'
                }`}
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
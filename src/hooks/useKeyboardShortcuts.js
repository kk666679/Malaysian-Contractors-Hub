import { useEffect, useCallback } from 'react';

export const useKeyboardShortcuts = (shortcuts = {}) => {
  const handleKeyDown = useCallback((event) => {
    const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
    const modifierKey = ctrlKey || metaKey;

    // Create shortcut key combination
    const combination = [
      modifierKey && 'ctrl',
      shiftKey && 'shift', 
      altKey && 'alt',
      key.toLowerCase()
    ].filter(Boolean).join('+');

    // Check if shortcut exists and execute
    if (shortcuts[combination]) {
      event.preventDefault();
      shortcuts[combination]();
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

// Predefined shortcut combinations for common actions
export const commonShortcuts = {
  // Navigation
  'ctrl+h': () => window.location.href = '/',
  'ctrl+d': () => window.location.href = '/dashboard',
  'ctrl+p': () => window.location.href = '/projects',
  
  // Actions
  'ctrl+n': () => console.log('New item'),
  'ctrl+s': () => console.log('Save'),
  'ctrl+f': () => document.querySelector('input[type="search"]')?.focus(),
  'escape': () => {
    // Close modals, clear focus
    document.activeElement?.blur();
    const modal = document.querySelector('[role="dialog"]');
    if (modal) {
      const closeButton = modal.querySelector('[aria-label="Close"]');
      closeButton?.click();
    }
  },
  
  // Quick access
  'ctrl+shift+c': () => window.location.href = '/compliance',
  'ctrl+shift+m': () => window.location.href = '/marketplace',
  'ctrl+shift+w': () => window.location.href = '/weather',
  
  // Help
  'ctrl+shift+?': () => {
    // Show keyboard shortcuts help
    console.log('Keyboard shortcuts help');
  }
};
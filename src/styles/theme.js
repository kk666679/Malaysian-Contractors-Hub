// Web3 Dark Theme Color Palette
export const darkTheme = {
  // Base colors
  background: {
    primary: '#0A0E17',
    secondary: '#121A29',
    tertiary: '#1E2A45',
    glass: 'rgba(16, 24, 39, 0.7)',
  },
  
  // Text colors
  text: {
    primary: '#F2F5FF',
    secondary: '#A9B1D6',
    muted: '#636B8A',
    accent: '#00F0FF',
  },
  
  // Accent colors
  accent: {
    primary: '#00F0FF',    // Cyan
    secondary: '#7B5CFF',  // Purple
    tertiary: '#FF3864',   // Pink
    quaternary: '#00FFA3', // Green
  },
  
  // Gradients
  gradient: {
    primary: 'linear-gradient(135deg, #00F0FF 0%, #7B5CFF 100%)',
    secondary: 'linear-gradient(135deg, #7B5CFF 0%, #FF3864 100%)',
    glow: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0, 240, 255, 0) 70%)',
  },
  
  // Shadows
  shadow: {
    small: '0 2px 10px rgba(0, 240, 255, 0.15)',
    medium: '0 4px 20px rgba(0, 240, 255, 0.2)',
    large: '0 8px 30px rgba(0, 240, 255, 0.25)',
  },
  
  // Border
  border: {
    width: '1px',
    radius: {
      small: '4px',
      medium: '8px',
      large: '16px',
      full: '9999px',
    },
  },
};

// Font settings
export const fonts = {
  primary: "'Inter', sans-serif",
  display: "'Orbitron', sans-serif",
  mono: "'Space Mono', monospace",
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
};
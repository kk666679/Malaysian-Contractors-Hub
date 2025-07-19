// Dark Theme Color Palette
export const darkTheme = {
  // Base colors
  background: {
    primary: '#0A0E17',
    secondary: '#121A29',
    tertiary: '#1E2A45',
    glass: 'rgba(16, 24, 39, 0.7)',
    card: '#151F30',
    input: '#0F172A',
  },
  
  // Text colors
  text: {
    primary: '#F2F5FF',
    secondary: '#A9B1D6',
    muted: '#636B8A',
    accent: '#00F0FF',
    error: '#FF5370',
    success: '#00FFA3',
  },
  
  // Accent colors
  accent: {
    primary: '#00F0FF',    // Cyan
    secondary: '#7B5CFF',  // Purple
    tertiary: '#FF3864',   // Pink
    quaternary: '#00FFA3', // Green
    warning: '#FFD166',    // Yellow
    error: '#FF5370',      // Red
  },
  
  // Gradients
  gradient: {
    primary: 'linear-gradient(135deg, #00F0FF 0%, #7B5CFF 100%)',
    secondary: 'linear-gradient(135deg, #7B5CFF 0%, #FF3864 100%)',
    tertiary: 'linear-gradient(135deg, #00FFA3 0%, #00F0FF 100%)',
    glow: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0, 240, 255, 0) 70%)',
  },
  
  // Shadows
  shadow: {
    small: '0 2px 10px rgba(0, 240, 255, 0.15)',
    medium: '0 4px 20px rgba(0, 240, 255, 0.2)',
    large: '0 8px 30px rgba(0, 240, 255, 0.25)',
    card: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  
  // Border
  border: {
    width: '1px',
    color: '#2A3A59',
    focus: '#00F0FF',
    radius: {
      small: '4px',
      medium: '8px',
      large: '16px',
      full: '9999px',
    },
  },
  
  // Mode
  mode: 'dark',
};

// Light Theme Color Palette
export const lightTheme = {
  // Base colors
  background: {
    primary: '#F8FAFC',
    secondary: '#FFFFFF',
    tertiary: '#EEF2F6',
    glass: 'rgba(255, 255, 255, 0.8)',
    card: '#FFFFFF',
    input: '#F1F5F9',
  },
  
  // Text colors
  text: {
    primary: '#0F172A',
    secondary: '#334155',
    muted: '#64748B',
    accent: '#0284C7',
    error: '#EF4444',
    success: '#10B981',
  },
  
  // Accent colors
  accent: {
    primary: '#0284C7',    // Blue
    secondary: '#8B5CF6',  // Purple
    tertiary: '#EC4899',   // Pink
    quaternary: '#10B981', // Green
    warning: '#F59E0B',    // Yellow
    error: '#EF4444',      // Red
  },
  
  // Gradients
  gradient: {
    primary: 'linear-gradient(135deg, #0284C7 0%, #8B5CF6 100%)',
    secondary: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    tertiary: 'linear-gradient(135deg, #10B981 0%, #0284C7 100%)',
    glow: 'radial-gradient(circle, rgba(2, 132, 199, 0.1) 0%, rgba(2, 132, 199, 0) 70%)',
  },
  
  // Shadows
  shadow: {
    small: '0 2px 10px rgba(15, 23, 42, 0.08)',
    medium: '0 4px 20px rgba(15, 23, 42, 0.1)',
    large: '0 8px 30px rgba(15, 23, 42, 0.12)',
    card: '0 4px 20px rgba(15, 23, 42, 0.08)',
  },
  
  // Border
  border: {
    width: '1px',
    color: '#E2E8F0',
    focus: '#0284C7',
    radius: {
      small: '4px',
      medium: '8px',
      large: '16px',
      full: '9999px',
    },
  },
  
  // Mode
  mode: 'light',
};

// Font settings
export const fonts = {
  primary: "'Inter', sans-serif",
  display: "'Orbitron', sans-serif",
  mono: "'Space Mono', monospace",
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
};

// Breakpoints
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Animation settings
export const animation = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easings: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};
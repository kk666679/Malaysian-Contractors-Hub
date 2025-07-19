# Web3 Dark Theme Design System

This document provides an overview of the Web3 dark theme design system implemented in the Malaysian Civil & MEP Contractors Hub application.

## Overview

The Web3 dark theme design system features:

- Dark color palette with neon accents
- Glassmorphism effects
- Gradient highlights
- Glowing elements
- Modern typography with Web3 aesthetics
- Smooth Framer Motion animations

## Theme Components

### Color Palette

- **Background Colors**:
  - Primary: `#0A0E17` (Dark blue-black)
  - Secondary: `#121A29` (Dark blue)
  - Tertiary: `#1E2A45` (Medium blue)
  - Glass: `rgba(16, 24, 39, 0.7)` (Semi-transparent dark blue)

- **Text Colors**:
  - Primary: `#F2F5FF` (Off-white)
  - Secondary: `#A9B1D6` (Light blue-gray)
  - Muted: `#636B8A` (Medium blue-gray)
  - Accent: `#00F0FF` (Cyan)

- **Accent Colors**:
  - Primary: `#00F0FF` (Cyan)
  - Secondary: `#7B5CFF` (Purple)
  - Tertiary: `#FF3864` (Pink)
  - Quaternary: `#00FFA3` (Green)

### Typography

- **Font Families**:
  - Primary: `'Inter', sans-serif` (Body text)
  - Display: `'Orbitron', sans-serif` (Headings)
  - Mono: `'Space Mono', monospace` (Code)

### Components

1. **Web3Button**: Customizable button with variants:
   - Primary (gradient background)
   - Secondary (transparent with border)
   - Outline (transparent with accent border)
   - Ghost (transparent)

2. **Web3Card**: Card component with variants:
   - Default (solid background)
   - Glass (glassmorphism effect)
   - Gradient (subtle gradient background)
   - Highlighted (accent border and top highlight)

3. **GlassCard**: Specialized card with glassmorphism effect and glow on hover

4. **GradientText**: Text with gradient background

5. **Web3Heading**: Heading with accent underline

6. **GlowingIcon**: Icon with glow effect

### Animations

The design system uses Framer Motion for smooth animations:

- **fadeIn**: Simple fade-in animation
- **slideUp**: Slide up and fade in
- **staggerContainer**: Container for staggered child animations
- **glowPulse**: Pulsing glow effect

## Usage

### Basic Components

```jsx
import { GlassCard, NeonButton, GradientText } from './components/ui/web3-elements';

function MyComponent() {
  return (
    <div>
      <GradientText>Web3 Heading</GradientText>
      <GlassCard>
        <p>This is a glass card with hover glow effect</p>
        <NeonButton>Click Me</NeonButton>
      </GlassCard>
    </div>
  );
}
```

### Custom Button

```jsx
import Web3Button from './components/ui/Web3Button';

function ButtonExample() {
  return (
    <div>
      <Web3Button>Primary Button</Web3Button>
      <Web3Button variant="outline" size="large" rounded>
        Rounded Outline Button
      </Web3Button>
    </div>
  );
}
```

### Custom Card

```jsx
import Web3Card from './components/ui/Web3Card';

function CardExample() {
  return (
    <Web3Card variant="glass" glowEffect>
      <h3>Glass Card</h3>
      <p>This card has glassmorphism effect and glow on hover</p>
    </Web3Card>
  );
}
```

## Demo

Visit the `/web3-demo` route to see all components in action.

## Accessibility Considerations

- The theme maintains sufficient contrast ratios for text readability
- Interactive elements have clear focus states
- Animations are subtle and not disruptive

## Performance Optimization

- Animations are optimized using Framer Motion's best practices
- CSS variables are used for theme values to reduce style recalculations
- Glassmorphism effects are applied selectively to avoid performance issues on lower-end devices
import { createGlobalStyle } from 'styled-components';
import { darkTheme, fonts } from './theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${darkTheme.background.primary};
    color: ${darkTheme.text.primary};
    font-family: ${fonts.primary};
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${fonts.display};
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: ${fonts.sizes['4xl']};
  }

  h2 {
    font-size: ${fonts.sizes['3xl']};
  }

  h3 {
    font-size: ${fonts.sizes['2xl']};
  }

  p {
    margin-bottom: 1rem;
    color: ${darkTheme.text.secondary};
  }

  a {
    color: ${darkTheme.accent.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${darkTheme.accent.secondary};
    }
  }

  button {
    font-family: ${fonts.primary};
  }

  code, pre {
    font-family: ${fonts.mono};
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${darkTheme.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${darkTheme.background.tertiary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${darkTheme.accent.primary};
  }
`;

export default GlobalStyles;
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Web3Button from '../components/ui/Web3Button';
import Web3Card from '../components/ui/Web3Card';
import { GradientText, Web3Heading, Web3Grid, fadeIn, slideUp, staggerContainer } from '../components/ui/web3-elements';
import { darkTheme } from '../styles/theme';

const PageContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled(motion.section)`
  margin-bottom: 3rem;
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CardsContainer = styled(Web3Grid)`
  margin-bottom: 2rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeroSection = styled(motion.div)`
  text-align: center;
  margin: 3rem 0 4rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: ${darkTheme.gradient.glow};
    border-radius: 50%;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    filter: blur(80px);
  }
`;

const Web3DemoPage = () => {
  return (
    <PageContainer
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <HeroSection variants={slideUp}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText as="h1" style={{ fontSize: '3rem' }}>
            Web3 Design System
          </GradientText>
          <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
            A modern, dark-themed UI kit with Web3 aesthetics featuring glassmorphism, 
            neon accents, and smooth Framer Motion animations.
          </p>
        </motion.div>
      </HeroSection>

      <Section variants={staggerContainer}>
        <Web3Heading variants={slideUp}>Buttons</Web3Heading>
        <ButtonsContainer variants={staggerContainer}>
          <motion.div variants={slideUp}>
            <Web3Button>Primary Button</Web3Button>
          </motion.div>
          <motion.div variants={slideUp}>
            <Web3Button variant="secondary">Secondary Button</Web3Button>
          </motion.div>
          <motion.div variants={slideUp}>
            <Web3Button variant="outline">Outline Button</Web3Button>
          </motion.div>
          <motion.div variants={slideUp}>
            <Web3Button variant="ghost">Ghost Button</Web3Button>
          </motion.div>
          <motion.div variants={slideUp}>
            <Web3Button rounded>Rounded Button</Web3Button>
          </motion.div>
          <motion.div variants={slideUp}>
            <Web3Button size="small">Small Button</Web3Button>
          </motion.div>
          <motion.div variants={slideUp}>
            <Web3Button size="large">Large Button</Web3Button>
          </motion.div>
          <motion.div variants={slideUp}>
            <Web3Button disabled>Disabled Button</Web3Button>
          </motion.div>
        </ButtonsContainer>
      </Section>

      <Section variants={staggerContainer}>
        <Web3Heading variants={slideUp}>Cards</Web3Heading>
        <CardsContainer variants={staggerContainer}>
          <motion.div variants={slideUp}>
            <Web3Card>
              <CardContent>
                <h3>Default Card</h3>
                <p>This is a standard card with default styling.</p>
                <Web3Button size="small">Learn More</Web3Button>
              </CardContent>
            </Web3Card>
          </motion.div>
          
          <motion.div variants={slideUp}>
            <Web3Card variant="glass" glowEffect>
              <CardContent>
                <h3>Glass Card</h3>
                <p>A card with glassmorphism effect and hover glow.</p>
                <Web3Button size="small" variant="outline">Explore</Web3Button>
              </CardContent>
            </Web3Card>
          </motion.div>
          
          <motion.div variants={slideUp}>
            <Web3Card variant="gradient">
              <CardContent>
                <h3>Gradient Card</h3>
                <p>This card features a subtle gradient background.</p>
                <Web3Button size="small" variant="secondary">Details</Web3Button>
              </CardContent>
            </Web3Card>
          </motion.div>
          
          <motion.div variants={slideUp}>
            <Web3Card variant="highlighted" glowEffect>
              <CardContent>
                <h3>Highlighted Card</h3>
                <p>A card with accent border and top highlight.</p>
                <Web3Button size="small">View</Web3Button>
              </CardContent>
            </Web3Card>
          </motion.div>
        </CardsContainer>
      </Section>

      <Section variants={staggerContainer}>
        <Web3Heading variants={slideUp}>Typography</Web3Heading>
        <motion.div variants={slideUp}>
          <Web3Card>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <p>Regular paragraph text. The Web3 design system uses modern typography with Orbitron for headings and Inter for body text.</p>
            <p><GradientText>This text has a gradient effect</GradientText></p>
            <p><code>Monospace text uses Space Mono font</code></p>
          </Web3Card>
        </motion.div>
      </Section>
    </PageContainer>
  );
};

export default Web3DemoPage;
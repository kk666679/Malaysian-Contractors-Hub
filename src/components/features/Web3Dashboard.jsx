import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  GlassCard,
  NeonButton,
  GradientText,
  Web3Heading,
  GlowingIcon,
  Web3Grid,
  fadeIn,
  slideUp,
  staggerContainer,
  glowPulse
} from '../ui/web3-elements';
import { darkTheme } from '../../styles/theme';

// Icons (replace with your preferred icon library)
const ChartIcon = () => <span>📊</span>;
const UserIcon = () => <span>👤</span>;
const ProjectIcon = () => <span>📁</span>;
const AlertIcon = () => <span>🔔</span>;

const DashboardContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatValue = styled.div`
  font-family: ${props => props.theme.fonts?.display || "'Orbitron', sans-serif"};
  font-size: 2rem;
  font-weight: 700;
`;

const ProjectCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressBar = styled(motion.div)`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.gradient || darkTheme.gradient.primary};
  border-radius: 3px;
`;

const Web3Dashboard = () => {
  return (
    <DashboardContainer
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <DashboardHeader variants={slideUp}>
        <div>
          <GradientText as="h1">MEP Dashboard</GradientText>
          <p>Welcome back to your project overview</p>
        </div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NeonButton>+ New Project</NeonButton>
        </motion.div>
      </DashboardHeader>
      
      <StatsContainer variants={staggerContainer}>
        <StatCard variants={slideUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <StatHeader>
            <p>Active Projects</p>
            <motion.div variants={glowPulse} initial="initial" animate="pulse">
              <GlowingIcon>
                <ProjectIcon />
              </GlowingIcon>
            </motion.div>
          </StatHeader>
          <StatValue>12</StatValue>
        </StatCard>
        
        <StatCard variants={slideUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <StatHeader>
            <p>Team Members</p>
            <motion.div variants={glowPulse} initial="initial" animate="pulse">
              <GlowingIcon>
                <UserIcon />
              </GlowingIcon>
            </motion.div>
          </StatHeader>
          <StatValue>24</StatValue>
        </StatCard>
        
        <StatCard variants={slideUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <StatHeader>
            <p>Compliance Score</p>
            <motion.div variants={glowPulse} initial="initial" animate="pulse">
              <GlowingIcon>
                <ChartIcon />
              </GlowingIcon>
            </motion.div>
          </StatHeader>
          <StatValue>94%</StatValue>
        </StatCard>
        
        <StatCard variants={slideUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <StatHeader>
            <p>Alerts</p>
            <motion.div variants={glowPulse} initial="initial" animate="pulse">
              <GlowingIcon>
                <AlertIcon />
              </GlowingIcon>
            </motion.div>
          </StatHeader>
          <StatValue>3</StatValue>
        </StatCard>
      </StatsContainer>
      
      <Web3Heading variants={slideUp}>Current Projects</Web3Heading>
      
      <Web3Grid variants={staggerContainer}>
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            variants={slideUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <ProjectHeader>
              <h3>{project.name}</h3>
              <GradientText gradient={getProgressGradient(project.progress)}>
                {project.progress}%
              </GradientText>
            </ProjectHeader>
            <p>{project.description}</p>
            <ProgressBar>
              <ProgressFill 
                gradient={getProgressGradient(project.progress)}
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </ProgressBar>
          </ProjectCard>
        ))}
      </Web3Grid>
    </DashboardContainer>
  );
};

// Helper function to get gradient based on progress
const getProgressGradient = (progress) => {
  if (progress < 30) return 'linear-gradient(90deg, #FF3864 0%, #FF5E5E 100%)';
  if (progress < 70) return 'linear-gradient(90deg, #FFB302 0%, #FF5E5E 100%)';
  return 'linear-gradient(90deg, #00FFA3 0%, #00F0FF 100%)';
};

// Sample project data
const projects = [
  {
    id: 1,
    name: 'Kuala Lumpur Tower Renovation',
    description: 'MEP system upgrade for the iconic KL Tower',
    progress: 75
  },
  {
    id: 2,
    name: 'Penang Smart Building',
    description: 'Implementation of IoT systems in commercial building',
    progress: 45
  },
  {
    id: 3,
    name: 'Johor Bahru Hospital',
    description: 'Critical systems installation for new hospital wing',
    progress: 90
  },
  {
    id: 4,
    name: 'Sabah Resort Complex',
    description: 'Sustainable energy solutions for luxury resort',
    progress: 20
  }
];

export default Web3Dashboard;
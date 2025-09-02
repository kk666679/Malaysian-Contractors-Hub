import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  addTeamMember,
  getProjectTeam,
  updateTeamMemberRole,
  removeTeamMember
} from '../controllers/teamController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Add team member to project
router.post('/add', addTeamMember);

// Get project team members
router.get('/project/:projectId', getProjectTeam);

// Update team member role
router.put('/project/:projectId/member/:userId', updateTeamMemberRole);

// Remove team member
router.delete('/project/:projectId/member/:userId', removeTeamMember);

export default router;
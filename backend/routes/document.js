import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import {
  uploadDocument,
  getProjectDocuments,
  downloadDocument,
  deleteDocument,
  getDocument
} from '../controllers/documentController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Upload document to project
router.post('/project/:projectId/upload', upload.single('document'), uploadDocument);

// Get all documents for a project
router.get('/project/:projectId', getProjectDocuments);

// Get specific document metadata
router.get('/project/:projectId/document/:documentId', getDocument);

// Download document
router.get('/project/:projectId/document/:documentId/download', downloadDocument);

// Delete document
router.delete('/project/:projectId/document/:documentId', deleteDocument);

export default router;
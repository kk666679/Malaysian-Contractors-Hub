import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload document to project
export const uploadDocument = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Verify project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId
      }
    });

    if (!project) {
      // Clean up uploaded file if project not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Create document record in database
    const document = await prisma.document.create({
      data: {
        name: name || req.file.originalname,
        description: description || '',
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        projectId,
        uploadedById: userId
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        document
      }
    });
  } catch (error) {
    console.error('Upload document error:', error);

    // Clean up uploaded file on error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to upload document',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all documents for a project
export const getProjectDocuments = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Verify project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where: {
          projectId
        },
        include: {
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: parseInt(limit)
      }),
      prisma.document.count({
        where: {
          projectId
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        documents,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get project documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get documents',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Download document
export const downloadDocument = async (req, res) => {
  try {
    const { projectId, documentId } = req.params;
    const userId = req.user.id;

    // Find document and verify access
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        projectId,
        project: {
          userId
        }
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if file exists
    if (!fs.existsSync(document.path)) {
      return res.status(404).json({
        success: false,
        message: 'File not found on server'
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`);
    res.setHeader('Content-Length', document.size);

    // Stream file to response
    const fileStream = fs.createReadStream(document.path);
    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      console.error('File stream error:', error);
      res.status(500).json({
        success: false,
        message: 'Error downloading file'
      });
    });
  } catch (error) {
    console.error('Download document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download document',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete document
export const deleteDocument = async (req, res) => {
  try {
    const { projectId, documentId } = req.params;
    const userId = req.user.id;

    // Find document and verify access
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        projectId,
        project: {
          userId
        }
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Delete file from filesystem
    if (fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }

    // Delete document record from database
    await prisma.document.delete({
      where: {
        id: documentId
      }
    });

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete document',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get document metadata
export const getDocument = async (req, res) => {
  try {
    const { projectId, documentId } = req.params;
    const userId = req.user.id;

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        projectId,
        project: {
          userId
        }
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        project: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    res.json({
      success: true,
      data: {
        document
      }
    });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get document',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  uploadDocument,
  getProjectDocuments,
  downloadDocument,
  deleteDocument,
  getDocument
};

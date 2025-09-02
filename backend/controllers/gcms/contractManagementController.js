// Contract & Document Management Controller - GCMS
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Contract
const createContract = async (req, res) => {
  try {
    const {
      title, type, value, startDate, endDate, clientName, clientEmail,
      clientAddress, paymentTerms, deliverables, projectId
    } = req.body;

    const contract = await prisma.contract.create({
      data: {
        title,
        type,
        value: parseFloat(value),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        clientName,
        clientEmail,
        clientAddress,
        paymentTerms,
        deliverables,
        projectId,
        companyId: req.user.companyId
      },
      include: {
        project: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: contract,
      message: 'Contract created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating contract',
      error: error.message
    });
  }
};

// Get Contracts
const getContracts = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = { companyId: req.user.companyId };
    if (status) where.status = status;
    if (type) where.type = type;

    const [contracts, total] = await Promise.all([
      prisma.contract.findMany({
        where,
        include: {
          project: { select: { id: true, name: true } },
          _count: {
            select: {
              documents: true,
              changeOrders: true,
              invoices: true
            }
          }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.contract.count({ where })
    ]);

    res.json({
      success: true,
      data: contracts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contracts',
      error: error.message
    });
  }
};

// Update Contract Status
const updateContractStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, signedDate } = req.body;

    const updateData = { status };
    if (signedDate) updateData.signedDate = new Date(signedDate);

    const contract = await prisma.contract.update({
      where: {
        id,
        companyId: req.user.companyId
      },
      data: updateData,
      include: {
        project: { select: { id: true, name: true } }
      }
    });

    res.json({
      success: true,
      data: contract,
      message: 'Contract status updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contract status',
      error: error.message
    });
  }
};

// Upload Document
const uploadDocument = async (req, res) => {
  try {
    const {
      name, type, category, description, projectId, contractId, taskId
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const document = await prisma.document.create({
      data: {
        name,
        type,
        category,
        description,
        fileName: req.file.filename,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        projectId,
        contractId,
        taskId,
        uploadedById: req.user.id
      },
      include: {
        uploadedBy: { select: { id: true, name: true } },
        project: { select: { id: true, name: true } },
        contract: { select: { id: true, title: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: document,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading document',
      error: error.message
    });
  }
};

// Get Documents
const getDocuments = async (req, res) => {
  try {
    const { type, category, projectId, contractId, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (type) where.type = type;
    if (category) where.category = category;
    if (projectId) where.projectId = projectId;
    if (contractId) where.contractId = contractId;

    // Ensure user can only access their company's documents
    where.OR = [
      { project: { companyId: req.user.companyId } },
      { contract: { companyId: req.user.companyId } },
      { uploadedById: req.user.id }
    ];

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        include: {
          uploadedBy: { select: { id: true, name: true } },
          project: { select: { id: true, name: true } },
          contract: { select: { id: true, title: true } }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.document.count({ where })
    ]);

    res.json({
      success: true,
      data: documents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching documents',
      error: error.message
    });
  }
};

// Create Change Order
const createChangeOrder = async (req, res) => {
  try {
    const {
      title, description, reason, type, costImpact, scheduleImpact,
      projectId, contractId
    } = req.body;

    // Generate change order number
    const count = await prisma.changeOrder.count();
    const number = `CO-${String(count + 1).padStart(6, '0')}`;

    const changeOrder = await prisma.changeOrder.create({
      data: {
        number,
        title,
        description,
        reason,
        type,
        costImpact: parseFloat(costImpact),
        scheduleImpact: parseInt(scheduleImpact),
        projectId,
        contractId,
        requestedById: req.user.id
      },
      include: {
        project: { select: { id: true, name: true } },
        contract: { select: { id: true, title: true } },
        requestedBy: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: changeOrder,
      message: 'Change order created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating change order',
      error: error.message
    });
  }
};

// Get Contract Templates
const getContractTemplates = async (req, res) => {
  try {
    const templates = [
      {
        id: 'main-contract',
        name: 'Main Construction Contract',
        type: 'MAIN_CONTRACT',
        description: 'Standard main contract template for construction projects'
      },
      {
        id: 'subcontract',
        name: 'Subcontractor Agreement',
        type: 'SUBCONTRACT',
        description: 'Template for subcontractor agreements'
      },
      {
        id: 'supply-contract',
        name: 'Material Supply Contract',
        type: 'SUPPLY_CONTRACT',
        description: 'Contract template for material suppliers'
      },
      {
        id: 'service-contract',
        name: 'Service Agreement',
        type: 'SERVICE_CONTRACT',
        description: 'General service agreement template'
      }
    ];

    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contract templates',
      error: error.message
    });
  }
};

// Generate Contract from Template
const generateContractFromTemplate = async (req, res) => {
  try {
    const { templateId, projectId, clientData, contractData } = req.body;

    // Get project details
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        companyId: req.user.companyId
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Generate contract based on template
    const contractTemplate = {
      title: `${project.name} - Construction Contract`,
      type: 'MAIN_CONTRACT',
      value: contractData.value || project.budget,
      startDate: contractData.startDate || project.startDate,
      endDate: contractData.endDate || project.endDate,
      clientName: clientData.name,
      clientEmail: clientData.email,
      clientAddress: clientData.address,
      paymentTerms: contractData.paymentTerms || 'Net 30 days',
      deliverables: contractData.deliverables || 'Complete construction as per specifications',
      projectId,
      companyId: req.user.companyId
    };

    const contract = await prisma.contract.create({
      data: contractTemplate,
      include: {
        project: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: contract,
      message: 'Contract generated from template successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating contract from template',
      error: error.message
    });
  }
};

module.exports = {
  createContract,
  getContracts,
  updateContractStatus,
  uploadDocument,
  getDocuments,
  createChangeOrder,
  getContractTemplates,
  generateContractFromTemplate
};
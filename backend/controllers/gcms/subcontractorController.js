// Subcontractor & Vendor Management Controller - GCMS
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Subcontractor
const createSubcontractor = async (req, res) => {
  try {
    const {
      name, registrationNumber, email, phone, address, specialization,
      insuranceExpiry, certifications
    } = req.body;

    const subcontractor = await prisma.subcontractor.create({
      data: {
        name,
        registrationNumber,
        email,
        phone,
        address,
        specialization,
        insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : null,
        certifications: certifications || [],
        companyId: req.user.companyId
      }
    });

    res.status(201).json({
      success: true,
      data: subcontractor,
      message: 'Subcontractor created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating subcontractor',
      error: error.message
    });
  }
};

// Get Subcontractors
const getSubcontractors = async (req, res) => {
  try {
    const { status, specialization, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = { companyId: req.user.companyId };
    if (status) where.status = status;
    if (specialization) where.specialization = { contains: specialization, mode: 'insensitive' };

    const [subcontractors, total] = await Promise.all([
      prisma.subcontractor.findMany({
        where,
        include: {
          assignments: {
            include: {
              project: { select: { id: true, name: true } }
            }
          },
          evaluations: {
            select: { rating: true, qualityScore: true, timelinessScore: true }
          },
          _count: {
            select: {
              assignments: true,
              evaluations: true
            }
          }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.subcontractor.count({ where })
    ]);

    // Calculate average ratings
    const subcontractorsWithStats = subcontractors.map(sub => {
      const avgRating = sub.evaluations.length > 0
        ? sub.evaluations.reduce((sum, eval) => sum + eval.rating, 0) / sub.evaluations.length
        : 0;
      
      const avgQuality = sub.evaluations.length > 0
        ? sub.evaluations.reduce((sum, eval) => sum + eval.qualityScore, 0) / sub.evaluations.length
        : 0;

      const avgTimeliness = sub.evaluations.length > 0
        ? sub.evaluations.reduce((sum, eval) => sum + eval.timelinessScore, 0) / sub.evaluations.length
        : 0;

      return {
        ...sub,
        stats: {
          totalAssignments: sub._count.assignments,
          totalEvaluations: sub._count.evaluations,
          averageRating: avgRating.toFixed(1),
          averageQuality: avgQuality.toFixed(1),
          averageTimeliness: avgTimeliness.toFixed(1),
          insuranceStatus: sub.insuranceExpiry 
            ? (new Date(sub.insuranceExpiry) > new Date() ? 'VALID' : 'EXPIRED')
            : 'NOT_PROVIDED'
        }
      };
    });

    res.json({
      success: true,
      data: subcontractorsWithStats,
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
      message: 'Error fetching subcontractors',
      error: error.message
    });
  }
};

// Assign Subcontractor to Project
const assignSubcontractor = async (req, res) => {
  try {
    const { subcontractorId, projectId, startDate, endDate, rate } = req.body;

    // Check if subcontractor exists and belongs to company
    const subcontractor = await prisma.subcontractor.findFirst({
      where: {
        id: subcontractorId,
        companyId: req.user.companyId
      }
    });

    if (!subcontractor) {
      return res.status(404).json({
        success: false,
        message: 'Subcontractor not found'
      });
    }

    // Check if project exists and belongs to company
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

    const assignment = await prisma.subcontractorAssignment.create({
      data: {
        subcontractorId,
        projectId,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        rate: rate ? parseFloat(rate) : null
      },
      include: {
        subcontractor: { select: { id: true, name: true, specialization: true } },
        project: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: assignment,
      message: 'Subcontractor assigned to project successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assigning subcontractor',
      error: error.message
    });
  }
};

// Evaluate Subcontractor Performance
const evaluateSubcontractor = async (req, res) => {
  try {
    const { subcontractorId } = req.params;
    const { rating, qualityScore, timelinessScore, communicationScore, comments } = req.body;

    const evaluation = await prisma.subcontractorEvaluation.create({
      data: {
        subcontractorId,
        rating: parseInt(rating),
        qualityScore: parseInt(qualityScore),
        timelinessScore: parseInt(timelinessScore),
        communicationScore: parseInt(communicationScore),
        comments,
        evaluatedById: req.user.id
      },
      include: {
        subcontractor: { select: { id: true, name: true } },
        evaluatedBy: { select: { id: true, name: true } }
      }
    });

    // Update subcontractor's overall rating
    const allEvaluations = await prisma.subcontractorEvaluation.findMany({
      where: { subcontractorId },
      select: { rating: true }
    });

    const avgRating = allEvaluations.reduce((sum, eval) => sum + eval.rating, 0) / allEvaluations.length;

    await prisma.subcontractor.update({
      where: { id: subcontractorId },
      data: { rating: avgRating }
    });

    res.status(201).json({
      success: true,
      data: evaluation,
      message: 'Subcontractor evaluation submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error evaluating subcontractor',
      error: error.message
    });
  }
};

// Create Vendor
const createVendor = async (req, res) => {
  try {
    const {
      name, type, email, phone, address, paymentTerms, creditLimit
    } = req.body;

    const vendor = await prisma.vendor.create({
      data: {
        name,
        type,
        email,
        phone,
        address,
        paymentTerms,
        creditLimit: creditLimit ? parseFloat(creditLimit) : null,
        companyId: req.user.companyId
      }
    });

    res.status(201).json({
      success: true,
      data: vendor,
      message: 'Vendor created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating vendor',
      error: error.message
    });
  }
};

// Get Vendors
const getVendors = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = { companyId: req.user.companyId };
    if (type) where.type = type;
    if (status) where.status = status;

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        include: {
          materials: {
            select: { id: true, name: true, unitCost: true }
          },
          purchaseOrders: {
            select: { id: true, totalAmount: true, status: true }
          },
          _count: {
            select: {
              materials: true,
              purchaseOrders: true
            }
          }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.vendor.count({ where })
    ]);

    // Calculate vendor statistics
    const vendorsWithStats = vendors.map(vendor => {
      const totalOrders = vendor.purchaseOrders.length;
      const totalValue = vendor.purchaseOrders.reduce((sum, po) => sum + parseFloat(po.totalAmount), 0);
      const completedOrders = vendor.purchaseOrders.filter(po => po.status === 'RECEIVED').length;

      return {
        ...vendor,
        stats: {
          totalMaterials: vendor._count.materials,
          totalOrders,
          totalValue,
          completedOrders,
          completionRate: totalOrders > 0 ? (completedOrders / totalOrders * 100).toFixed(1) : 0
        }
      };
    });

    res.json({
      success: true,
      data: vendorsWithStats,
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
      message: 'Error fetching vendors',
      error: error.message
    });
  }
};

// Get Subcontractor Performance Report
const getSubcontractorPerformanceReport = async (req, res) => {
  try {
    const { subcontractorId } = req.params;

    const subcontractor = await prisma.subcontractor.findFirst({
      where: {
        id: subcontractorId,
        companyId: req.user.companyId
      },
      include: {
        assignments: {
          include: {
            project: { select: { name: true, status: true } }
          }
        },
        evaluations: {
          include: {
            evaluatedBy: { select: { name: true } }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!subcontractor) {
      return res.status(404).json({
        success: false,
        message: 'Subcontractor not found'
      });
    }

    // Calculate performance metrics
    const totalAssignments = subcontractor.assignments.length;
    const completedAssignments = subcontractor.assignments.filter(a => a.status === 'COMPLETED').length;
    const ongoingAssignments = subcontractor.assignments.filter(a => a.status === 'IN_PROGRESS').length;

    const evaluations = subcontractor.evaluations;
    const avgRating = evaluations.length > 0
      ? evaluations.reduce((sum, eval) => sum + eval.rating, 0) / evaluations.length
      : 0;
    
    const avgQuality = evaluations.length > 0
      ? evaluations.reduce((sum, eval) => sum + eval.qualityScore, 0) / evaluations.length
      : 0;

    const avgTimeliness = evaluations.length > 0
      ? evaluations.reduce((sum, eval) => sum + eval.timelinessScore, 0) / evaluations.length
      : 0;

    const avgCommunication = evaluations.length > 0
      ? evaluations.reduce((sum, eval) => sum + eval.communicationScore, 0) / evaluations.length
      : 0;

    const report = {
      subcontractor: {
        id: subcontractor.id,
        name: subcontractor.name,
        specialization: subcontractor.specialization,
        status: subcontractor.status,
        insuranceExpiry: subcontractor.insuranceExpiry,
        certifications: subcontractor.certifications
      },
      performance: {
        totalAssignments,
        completedAssignments,
        ongoingAssignments,
        completionRate: totalAssignments > 0 ? (completedAssignments / totalAssignments * 100).toFixed(1) : 0,
        averageRating: avgRating.toFixed(1),
        averageQuality: avgQuality.toFixed(1),
        averageTimeliness: avgTimeliness.toFixed(1),
        averageCommunication: avgCommunication.toFixed(1)
      },
      recentAssignments: subcontractor.assignments.slice(-5),
      recentEvaluations: evaluations.slice(0, 5),
      recommendations: [
        avgRating < 3 ? 'Consider additional training or performance improvement plan' : null,
        avgTimeliness < 7 ? 'Focus on project timeline management' : null,
        avgQuality < 7 ? 'Implement quality control measures' : null,
        subcontractor.insuranceExpiry && new Date(subcontractor.insuranceExpiry) < new Date() 
          ? 'Insurance renewal required' : null
      ].filter(Boolean)
    };

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating performance report',
      error: error.message
    });
  }
};

// Get Vendor Performance Analytics
const getVendorAnalytics = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    const [
      totalVendors,
      activeVendors,
      totalPurchaseOrders,
      totalPurchaseValue,
      topVendors,
      vendorsByType
    ] = await Promise.all([
      prisma.vendor.count({ where: { companyId } }),
      prisma.vendor.count({ where: { companyId, status: 'ACTIVE' } }),
      prisma.purchaseOrder.count({
        where: { vendor: { companyId } }
      }),
      prisma.purchaseOrder.aggregate({
        where: { vendor: { companyId } },
        _sum: { totalAmount: true }
      }),
      prisma.vendor.findMany({
        where: { companyId },
        include: {
          purchaseOrders: {
            select: { totalAmount: true, status: true }
          }
        },
        take: 5
      }),
      prisma.vendor.groupBy({
        by: ['type'],
        where: { companyId },
        _count: { id: true }
      })
    ]);

    // Calculate top vendors by purchase value
    const vendorsWithValue = topVendors.map(vendor => ({
      ...vendor,
      totalValue: vendor.purchaseOrders.reduce((sum, po) => sum + parseFloat(po.totalAmount), 0),
      completedOrders: vendor.purchaseOrders.filter(po => po.status === 'RECEIVED').length
    })).sort((a, b) => b.totalValue - a.totalValue);

    const analytics = {
      summary: {
        totalVendors,
        activeVendors,
        totalPurchaseOrders,
        totalPurchaseValue: totalPurchaseValue._sum.totalAmount || 0,
        averageOrderValue: totalPurchaseOrders > 0 
          ? (totalPurchaseValue._sum.totalAmount || 0) / totalPurchaseOrders 
          : 0
      },
      topVendors: vendorsWithValue.slice(0, 5),
      vendorsByType: vendorsByType.reduce((acc, item) => {
        acc[item.type] = item._count.id;
        return acc;
      }, {})
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendor analytics',
      error: error.message
    });
  }
};

// Update Subcontractor Status
const updateSubcontractorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const subcontractor = await prisma.subcontractor.update({
      where: {
        id,
        companyId: req.user.companyId
      },
      data: { status }
    });

    res.json({
      success: true,
      data: subcontractor,
      message: 'Subcontractor status updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating subcontractor status',
      error: error.message
    });
  }
};

module.exports = {
  createSubcontractor,
  getSubcontractors,
  assignSubcontractor,
  evaluateSubcontractor,
  createVendor,
  getVendors,
  getSubcontractorPerformanceReport,
  getVendorAnalytics,
  updateSubcontractorStatus
};
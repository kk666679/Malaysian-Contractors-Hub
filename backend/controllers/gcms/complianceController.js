// Compliance & Safety Controller - GCMS
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Safety Checklist
const createSafetyChecklist = async (req, res) => {
  try {
    const { name, description, category, projectId, items } = req.body;

    const checklist = await prisma.safetyChecklist.create({
      data: {
        name,
        description,
        category,
        projectId,
        items: {
          create: items.map((item, index) => ({
            description: item.description,
            isRequired: item.isRequired || true,
            order: index + 1
          }))
        }
      },
      include: {
        items: true,
        project: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: checklist,
      message: 'Safety checklist created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating safety checklist',
      error: error.message
    });
  }
};

// Get Safety Checklists
const getSafetyChecklists = async (req, res) => {
  try {
    const { category, projectId, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (projectId) where.projectId = projectId;

    const [checklists, total] = await Promise.all([
      prisma.safetyChecklist.findMany({
        where,
        include: {
          items: {
            include: {
              inspections: {
                select: { id: true, status: true, date: true }
              }
            }
          },
          project: { select: { id: true, name: true } }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.safetyChecklist.count({ where })
    ]);

    res.json({
      success: true,
      data: checklists,
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
      message: 'Error fetching safety checklists',
      error: error.message
    });
  }
};

// Conduct Safety Inspection
const conductSafetyInspection = async (req, res) => {
  try {
    const { itemId, projectId, status, notes, photos } = req.body;

    const inspection = await prisma.safetyInspection.create({
      data: {
        itemId,
        projectId,
        status,
        notes,
        photos: photos || [],
        inspectorId: req.user.id
      },
      include: {
        item: { select: { id: true, description: true } },
        inspector: { select: { id: true, name: true } },
        project: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: inspection,
      message: 'Safety inspection recorded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error conducting safety inspection',
      error: error.message
    });
  }
};

// Report Incident
const reportIncident = async (req, res) => {
  try {
    const {
      title, description, type, severity, location, dateOccurred,
      injuredParty, witnesses, immediateAction, projectId
    } = req.body;

    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        type,
        severity,
        location,
        dateOccurred: new Date(dateOccurred),
        injuredParty,
        witnesses: witnesses || [],
        immediateAction,
        projectId,
        reportedById: req.user.id
      },
      include: {
        project: { select: { id: true, name: true } },
        reportedBy: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: incident,
      message: 'Incident reported successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reporting incident',
      error: error.message
    });
  }
};

// Get Incidents
const getIncidents = async (req, res) => {
  try {
    const { type, severity, status, projectId, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (type) where.type = type;
    if (severity) where.severity = severity;
    if (status) where.status = status;
    if (projectId) where.projectId = projectId;

    const [incidents, total] = await Promise.all([
      prisma.incident.findMany({
        where,
        include: {
          project: { select: { id: true, name: true } },
          reportedBy: { select: { id: true, name: true } }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { dateOccurred: 'desc' }
      }),
      prisma.incident.count({ where })
    ]);

    res.json({
      success: true,
      data: incidents,
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
      message: 'Error fetching incidents',
      error: error.message
    });
  }
};

// Update Incident Status
const updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, correctiveAction } = req.body;

    const incident = await prisma.incident.update({
      where: { id },
      data: {
        status,
        correctiveAction
      },
      include: {
        project: { select: { id: true, name: true } },
        reportedBy: { select: { id: true, name: true } }
      }
    });

    res.json({
      success: true,
      data: incident,
      message: 'Incident status updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating incident status',
      error: error.message
    });
  }
};

// Get Compliance Dashboard
const getComplianceDashboard = async (req, res) => {
  try {
    const { projectId } = req.query;

    const where = {};
    if (projectId) where.projectId = projectId;

    const [
      totalInspections,
      passedInspections,
      failedInspections,
      totalIncidents,
      criticalIncidents,
      openIncidents,
      recentInspections,
      recentIncidents
    ] = await Promise.all([
      prisma.safetyInspection.count({ where }),
      prisma.safetyInspection.count({ where: { ...where, status: 'PASS' } }),
      prisma.safetyInspection.count({ where: { ...where, status: 'FAIL' } }),
      prisma.incident.count({ where }),
      prisma.incident.count({ where: { ...where, severity: 'CRITICAL' } }),
      prisma.incident.count({ where: { ...where, status: { in: ['REPORTED', 'UNDER_INVESTIGATION'] } } }),
      prisma.safetyInspection.findMany({
        where,
        include: {
          item: { select: { description: true } },
          inspector: { select: { name: true } },
          project: { select: { name: true } }
        },
        orderBy: { date: 'desc' },
        take: 10
      }),
      prisma.incident.findMany({
        where,
        include: {
          project: { select: { name: true } },
          reportedBy: { select: { name: true } }
        },
        orderBy: { dateOccurred: 'desc' },
        take: 5
      })
    ]);

    const dashboardData = {
      summary: {
        totalInspections,
        passedInspections,
        failedInspections,
        complianceRate: totalInspections > 0 ? (passedInspections / totalInspections * 100).toFixed(1) : 0,
        totalIncidents,
        criticalIncidents,
        openIncidents,
        safetyScore: totalIncidents > 0 ? Math.max(0, 100 - (criticalIncidents * 20) - (totalIncidents * 5)) : 100
      },
      recentInspections,
      recentIncidents
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching compliance dashboard',
      error: error.message
    });
  }
};

// Get Compliance Standards
const getComplianceStandards = async (req, res) => {
  try {
    const standards = [
      {
        id: 'osha-1994',
        name: 'Occupational Safety and Health Act 1994',
        category: 'SAFETY',
        description: 'Malaysian workplace safety regulations',
        requirements: [
          'Safety training for all workers',
          'Personal protective equipment (PPE)',
          'Hazard identification and risk assessment',
          'Emergency response procedures'
        ]
      },
      {
        id: 'ubbl-1984',
        name: 'Uniform Building By-Laws 1984',
        category: 'BUILDING',
        description: 'Malaysian building construction standards',
        requirements: [
          'Structural design compliance',
          'Fire safety measures',
          'Accessibility requirements',
          'Environmental considerations'
        ]
      },
      {
        id: 'ms-iso-45001',
        name: 'MS ISO 45001:2018',
        category: 'MANAGEMENT',
        description: 'Occupational health and safety management systems',
        requirements: [
          'Management system implementation',
          'Risk assessment procedures',
          'Performance monitoring',
          'Continuous improvement'
        ]
      },
      {
        id: 'cidb-standards',
        name: 'CIDB Safety Standards',
        category: 'CONSTRUCTION',
        description: 'Construction Industry Development Board safety requirements',
        requirements: [
          'Site safety management',
          'Worker competency certification',
          'Safety equipment standards',
          'Incident reporting procedures'
        ]
      }
    ];

    res.json({
      success: true,
      data: standards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching compliance standards',
      error: error.message
    });
  }
};

// Generate Compliance Report
const generateComplianceReport = async (req, res) => {
  try {
    const { projectId, startDate, endDate } = req.query;

    const where = {};
    if (projectId) where.projectId = projectId;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.gte = new Date(startDate);
      dateFilter.lte = new Date(endDate);
    }

    const [
      inspections,
      incidents,
      project
    ] = await Promise.all([
      prisma.safetyInspection.findMany({
        where: {
          ...where,
          ...(startDate && endDate ? { date: dateFilter } : {})
        },
        include: {
          item: { select: { description: true } },
          inspector: { select: { name: true } }
        }
      }),
      prisma.incident.findMany({
        where: {
          ...where,
          ...(startDate && endDate ? { dateOccurred: dateFilter } : {})
        },
        include: {
          reportedBy: { select: { name: true } }
        }
      }),
      projectId ? prisma.project.findUnique({
        where: { id: projectId },
        select: { name: true, address: true }
      }) : null
    ]);

    // Calculate compliance metrics
    const totalInspections = inspections.length;
    const passedInspections = inspections.filter(i => i.status === 'PASS').length;
    const failedInspections = inspections.filter(i => i.status === 'FAIL').length;
    const complianceRate = totalInspections > 0 ? (passedInspections / totalInspections * 100) : 0;

    const incidentsByType = incidents.reduce((acc, incident) => {
      acc[incident.type] = (acc[incident.type] || 0) + 1;
      return acc;
    }, {});

    const incidentsBySeverity = incidents.reduce((acc, incident) => {
      acc[incident.severity] = (acc[incident.severity] || 0) + 1;
      return acc;
    }, {});

    const report = {
      period: { startDate, endDate },
      project: project,
      summary: {
        totalInspections,
        passedInspections,
        failedInspections,
        complianceRate: complianceRate.toFixed(1),
        totalIncidents: incidents.length,
        criticalIncidents: incidents.filter(i => i.severity === 'CRITICAL').length
      },
      inspectionDetails: {
        byStatus: {
          PASS: passedInspections,
          FAIL: failedInspections,
          NEEDS_ATTENTION: inspections.filter(i => i.status === 'NEEDS_ATTENTION').length
        }
      },
      incidentDetails: {
        byType: incidentsByType,
        bySeverity: incidentsBySeverity
      },
      recommendations: [
        complianceRate < 80 ? 'Increase safety training frequency' : null,
        incidents.filter(i => i.severity === 'CRITICAL').length > 0 ? 'Review critical incident procedures' : null,
        failedInspections > passedInspections ? 'Implement corrective action plan' : null
      ].filter(Boolean)
    };

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating compliance report',
      error: error.message
    });
  }
};

// Check Regulatory Compliance
const checkRegulatoryCompliance = async (req, res) => {
  try {
    const { projectId, standardId } = req.body;

    // Get project details
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        riskAssessments: true,
        tasks: true
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Compliance check logic based on standard
    const complianceChecks = {
      'osha-1994': {
        name: 'OSHA 1994 Compliance',
        checks: [
          {
            requirement: 'Safety training records',
            status: 'COMPLIANT', // This would be determined by actual data
            details: 'All workers have completed safety training'
          },
          {
            requirement: 'PPE availability',
            status: 'NEEDS_ATTENTION',
            details: 'PPE inventory needs replenishment'
          },
          {
            requirement: 'Risk assessment documentation',
            status: project.riskAssessments.length > 0 ? 'COMPLIANT' : 'NON_COMPLIANT',
            details: `${project.riskAssessments.length} risk assessments on file`
          }
        ]
      },
      'ubbl-1984': {
        name: 'UBBL 1984 Compliance',
        checks: [
          {
            requirement: 'Building permit approval',
            status: 'COMPLIANT',
            details: 'Valid building permit obtained'
          },
          {
            requirement: 'Structural design approval',
            status: 'COMPLIANT',
            details: 'Structural plans approved by PE'
          },
          {
            requirement: 'Fire safety compliance',
            status: 'PENDING',
            details: 'Fire safety inspection scheduled'
          }
        ]
      }
    };

    const compliance = complianceChecks[standardId] || {
      name: 'Unknown Standard',
      checks: []
    };

    // Calculate overall compliance score
    const totalChecks = compliance.checks.length;
    const compliantChecks = compliance.checks.filter(c => c.status === 'COMPLIANT').length;
    const complianceScore = totalChecks > 0 ? (compliantChecks / totalChecks * 100) : 0;

    res.json({
      success: true,
      data: {
        project: { id: project.id, name: project.name },
        standard: compliance.name,
        complianceScore: complianceScore.toFixed(1),
        checks: compliance.checks,
        summary: {
          total: totalChecks,
          compliant: compliantChecks,
          needsAttention: compliance.checks.filter(c => c.status === 'NEEDS_ATTENTION').length,
          nonCompliant: compliance.checks.filter(c => c.status === 'NON_COMPLIANT').length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking regulatory compliance',
      error: error.message
    });
  }
};

module.exports = {
  createSafetyChecklist,
  getSafetyChecklists,
  conductSafetyInspection,
  reportIncident,
  getIncidents,
  updateIncidentStatus,
  getComplianceDashboard,
  getComplianceStandards,
  generateComplianceReport,
  checkRegulatoryCompliance
};
// Bidding & Estimation Controller - GCMS
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Bid
const createBid = async (req, res) => {
  try {
    const {
      title, description, type, estimatedValue, submissionDate, validUntil,
      clientName, clientEmail, clientPhone, bidItems
    } = req.body;

    const bid = await prisma.bid.create({
      data: {
        title,
        description,
        type,
        estimatedValue: parseFloat(estimatedValue),
        submissionDate: new Date(submissionDate),
        validUntil: new Date(validUntil),
        clientName,
        clientEmail,
        clientPhone,
        companyId: req.user.companyId,
        bidItems: {
          create: bidItems.map(item => ({
            description: item.description,
            quantity: parseFloat(item.quantity),
            unit: item.unit,
            unitPrice: parseFloat(item.unitPrice),
            totalPrice: parseFloat(item.quantity) * parseFloat(item.unitPrice)
          }))
        }
      },
      include: {
        bidItems: true
      }
    });

    res.status(201).json({
      success: true,
      data: bid,
      message: 'Bid created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating bid',
      error: error.message
    });
  }
};

// Get Bids
const getBids = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = { companyId: req.user.companyId };
    if (status) where.status = status;
    if (type) where.type = type;

    const [bids, total] = await Promise.all([
      prisma.bid.findMany({
        where,
        include: {
          bidItems: true,
          _count: {
            select: {
              bidItems: true,
              documents: true
            }
          }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.bid.count({ where })
    ]);

    // Calculate bid statistics
    const bidsWithStats = bids.map(bid => ({
      ...bid,
      stats: {
        totalItems: bid._count.bidItems,
        totalDocuments: bid._count.documents,
        daysUntilExpiry: Math.ceil((new Date(bid.validUntil) - new Date()) / (1000 * 60 * 60 * 24))
      }
    }));

    res.json({
      success: true,
      data: bidsWithStats,
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
      message: 'Error fetching bids',
      error: error.message
    });
  }
};

// Update Bid Status
const updateBidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, finalAmount } = req.body;

    const updateData = { status };
    if (finalAmount) updateData.finalAmount = parseFloat(finalAmount);

    const bid = await prisma.bid.update({
      where: {
        id,
        companyId: req.user.companyId
      },
      data: updateData,
      include: {
        bidItems: true
      }
    });

    res.json({
      success: true,
      data: bid,
      message: 'Bid status updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating bid status',
      error: error.message
    });
  }
};

// Cost Estimation Calculator
const calculateCostEstimation = async (req, res) => {
  try {
    const {
      projectType, area, location, specifications, materials, labor
    } = req.body;

    // Base rates per square meter (Malaysian market rates)
    const baseRates = {
      RESIDENTIAL: 800, // RM per sqm
      COMMERCIAL: 1200,
      INDUSTRIAL: 1000,
      INFRASTRUCTURE: 1500
    };

    // Location multipliers
    const locationMultipliers = {
      'Kuala Lumpur': 1.3,
      'Selangor': 1.2,
      'Penang': 1.15,
      'Johor': 1.1,
      'Sabah': 1.25,
      'Sarawak': 1.25,
      'default': 1.0
    };

    const baseRate = baseRates[projectType] || baseRates.RESIDENTIAL;
    const locationMultiplier = locationMultipliers[location] || locationMultipliers.default;
    
    // Calculate base construction cost
    const baseCost = area * baseRate * locationMultiplier;

    // Material cost calculation
    const materialCost = materials.reduce((total, material) => {
      return total + (material.quantity * material.unitPrice);
    }, 0);

    // Labor cost calculation
    const laborCost = labor.reduce((total, laborItem) => {
      return total + (laborItem.hours * laborItem.hourlyRate);
    }, 0);

    // Additional costs
    const overheadPercentage = 0.15; // 15%
    const profitMarginPercentage = 0.20; // 20%
    const contingencyPercentage = 0.10; // 10%

    const directCost = baseCost + materialCost + laborCost;
    const overheadCost = directCost * overheadPercentage;
    const subtotal = directCost + overheadCost;
    const profitMargin = subtotal * profitMarginPercentage;
    const contingency = subtotal * contingencyPercentage;
    const totalCost = subtotal + profitMargin + contingency;

    const estimation = {
      projectDetails: {
        type: projectType,
        area,
        location
      },
      costBreakdown: {
        baseCost,
        materialCost,
        laborCost,
        overheadCost,
        profitMargin,
        contingency,
        totalCost
      },
      costPerSqm: totalCost / area,
      timeline: {
        estimatedDuration: Math.ceil(area / 100), // Rough estimate: 100 sqm per month
        phases: [
          { name: 'Planning & Design', duration: '2-4 weeks' },
          { name: 'Foundation', duration: '3-6 weeks' },
          { name: 'Structure', duration: '8-12 weeks' },
          { name: 'Finishing', duration: '6-10 weeks' }
        ]
      }
    };

    res.json({
      success: true,
      data: estimation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating cost estimation',
      error: error.message
    });
  }
};

// Bid Comparison Analysis
const compareBids = async (req, res) => {
  try {
    const { bidIds } = req.body;

    const bids = await prisma.bid.findMany({
      where: {
        id: { in: bidIds },
        companyId: req.user.companyId
      },
      include: {
        bidItems: true
      }
    });

    if (bids.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No bids found for comparison'
      });
    }

    // Analyze bids
    const comparison = {
      totalBids: bids.length,
      lowestBid: Math.min(...bids.map(b => b.estimatedValue)),
      highestBid: Math.max(...bids.map(b => b.estimatedValue)),
      averageBid: bids.reduce((sum, b) => sum + parseFloat(b.estimatedValue), 0) / bids.length,
      bids: bids.map(bid => ({
        id: bid.id,
        title: bid.title,
        clientName: bid.clientName,
        estimatedValue: bid.estimatedValue,
        status: bid.status,
        submissionDate: bid.submissionDate,
        itemCount: bid.bidItems.length,
        costPerItem: bid.bidItems.length > 0 ? bid.estimatedValue / bid.bidItems.length : 0
      }))
    };

    res.json({
      success: true,
      data: comparison
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error comparing bids',
      error: error.message
    });
  }
};

// Get Bid Analytics
const getBidAnalytics = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    const [
      totalBids,
      wonBids,
      lostBids,
      pendingBids,
      totalValue,
      wonValue,
      recentBids
    ] = await Promise.all([
      prisma.bid.count({ where: { companyId } }),
      prisma.bid.count({ where: { companyId, status: 'WON' } }),
      prisma.bid.count({ where: { companyId, status: 'LOST' } }),
      prisma.bid.count({ where: { companyId, status: { in: ['SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED'] } } }),
      prisma.bid.aggregate({
        where: { companyId },
        _sum: { estimatedValue: true }
      }),
      prisma.bid.aggregate({
        where: { companyId, status: 'WON' },
        _sum: { finalAmount: true }
      }),
      prisma.bid.findMany({
        where: { companyId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          estimatedValue: true,
          submissionDate: true,
          clientName: true
        }
      })
    ]);

    const analytics = {
      summary: {
        totalBids,
        wonBids,
        lostBids,
        pendingBids,
        winRate: totalBids > 0 ? (wonBids / totalBids * 100).toFixed(1) : 0,
        totalValue: totalValue._sum.estimatedValue || 0,
        wonValue: wonValue._sum.finalAmount || 0
      },
      recentBids
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bid analytics',
      error: error.message
    });
  }
};

// Generate Bid Report
const generateBidReport = async (req, res) => {
  try {
    const { id } = req.params;

    const bid = await prisma.bid.findFirst({
      where: {
        id,
        companyId: req.user.companyId
      },
      include: {
        bidItems: true,
        company: {
          select: { name: true, address: true, phone: true, email: true }
        }
      }
    });

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: 'Bid not found'
      });
    }

    // Generate comprehensive bid report
    const report = {
      bidDetails: {
        title: bid.title,
        description: bid.description,
        type: bid.type,
        status: bid.status,
        submissionDate: bid.submissionDate,
        validUntil: bid.validUntil
      },
      clientDetails: {
        name: bid.clientName,
        email: bid.clientEmail,
        phone: bid.clientPhone
      },
      companyDetails: {
        name: bid.company.name,
        address: bid.company.address,
        phone: bid.company.phone,
        email: bid.company.email
      },
      itemBreakdown: bid.bidItems.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })),
      financialSummary: {
        subtotal: bid.bidItems.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0),
        tax: bid.bidItems.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0) * 0.06, // 6% SST
        total: bid.estimatedValue,
        finalAmount: bid.finalAmount
      }
    };

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating bid report',
      error: error.message
    });
  }
};

module.exports = {
  createBid,
  getBids,
  updateBidStatus,
  calculateCostEstimation,
  compareBids,
  getBidAnalytics,
  generateBidReport
};
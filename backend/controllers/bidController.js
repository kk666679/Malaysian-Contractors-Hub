import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Generate project bid
export const generateBid = async (req, res) => {
  try {
    const {
      projectType,
      area,
      location,
      complexity = 'medium',
      timeline,
      materials = []
    } = req.body;

    if (!projectType || !area || !location) {
      return res.status(400).json({
        success: false,
        message: 'Project type, area, and location are required'
      });
    }

    // Base rates per sqm for different project types (RM)
    const baseRates = {
      residential: 800,
      commercial: 1200,
      industrial: 1000,
      infrastructure: 1500
    };

    // Location multipliers
    const locationMultipliers = {
      'kuala-lumpur': 1.3,
      'selangor': 1.2,
      'penang': 1.15,
      'johor': 1.1,
      'default': 1.0
    };

    // Complexity multipliers
    const complexityMultipliers = {
      simple: 0.8,
      medium: 1.0,
      complex: 1.3,
      very_complex: 1.6
    };

    const baseRate = baseRates[projectType] || baseRates.residential;
    const locationMultiplier = locationMultipliers[location.toLowerCase()] || locationMultipliers.default;
    const complexityMultiplier = complexityMultipliers[complexity] || 1.0;

    // Calculate base cost
    const baseCost = area * baseRate * locationMultiplier * complexityMultiplier;

    // Add material costs
    const materialCost = materials.reduce((sum, material) => {
      return sum + (material.quantity * material.unitPrice);
    }, 0);

    // Calculate additional costs
    const laborCost = baseCost * 0.4; // 40% of base cost
    const overheadCost = baseCost * 0.15; // 15% overhead
    const profitMargin = baseCost * 0.2; // 20% profit

    const totalCost = baseCost + materialCost + laborCost + overheadCost + profitMargin;

    // Timeline adjustment
    const timelineAdjustment = timeline < 6 ? 1.1 : timeline > 12 ? 0.95 : 1.0;
    const finalCost = totalCost * timelineAdjustment;

    const bid = {
      projectDetails: {
        type: projectType,
        area,
        location,
        complexity,
        timeline
      },
      costBreakdown: {
        baseCost: Math.round(baseCost),
        materialCost: Math.round(materialCost),
        laborCost: Math.round(laborCost),
        overheadCost: Math.round(overheadCost),
        profitMargin: Math.round(profitMargin),
        timelineAdjustment: Math.round((finalCost - totalCost))
      },
      totalCost: Math.round(finalCost),
      pricePerSqm: Math.round(finalCost / area),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      terms: [
        '30% advance payment',
        'Progress payments based on milestones',
        'Final payment upon completion',
        'Warranty period: 12 months'
      ]
    };

    res.json({
      success: true,
      data: bid
    });
  } catch (error) {
    console.error('Generate bid error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate bid',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default { generateBid };
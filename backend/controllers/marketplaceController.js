import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Get all services in marketplace
export const getServices = async (req, res) => {
  try {
    const { category, location, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      isActive: true,
      ...(category && { category }),
      ...(location && { location: { contains: location, mode: 'insensitive' } })
    };

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          provider: {
            select: { id: true, name: true, email: true, role: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.service.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        services,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get services',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    const { title, description, category, price, location } = req.body;
    const providerId = req.user.id;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and category are required'
      });
    }

    const service = await prisma.service.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        category,
        price: price ? parseFloat(price) : null,
        location: location?.trim(),
        providerId
      },
      include: {
        provider: {
          select: { id: true, name: true, email: true, role: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service }
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get suppliers
export const getSuppliers = async (req, res) => {
  try {
    const { category, location } = req.query;

    const where = {
      isActive: true,
      ...(category && { category }),
      ...(location && { address: { contains: location, mode: 'insensitive' } })
    };

    const suppliers = await prisma.supplier.findMany({
      where,
      orderBy: { rating: 'desc' }
    });

    res.json({
      success: true,
      data: { suppliers }
    });
  } catch (error) {
    console.error('Get suppliers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get suppliers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  getServices,
  createService,
  getSuppliers
};
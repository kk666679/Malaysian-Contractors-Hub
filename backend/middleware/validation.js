import { z } from 'zod';

// Validation middleware factory
export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Internal validation error'
      });
    }
  };
};

// Common validation schemas
export const userRegistrationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['ADMIN', 'CONTRACTOR', 'CONSULTANT', 'SUPPLIER', 'CLIENT']).optional()
  })
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
  })
});

export const projectCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().optional(),
    location: z.string().min(1, 'Location is required'),
    client: z.string().min(1, 'Client is required'),
    budget: z.number().positive('Budget must be positive'),
    startDate: z.string().datetime('Invalid start date'),
    endDate: z.string().datetime('Invalid end date')
  })
});

export const civilEngineeringCalculationSchema = z.object({
  body: z.object({
    concreteGrade: z.string().min(1, 'Concrete grade is required'),
    steelGrade: z.string().min(1, 'Steel grade is required'),
    beamWidth: z.number().positive('Beam width must be positive'),
    beamDepth: z.number().positive('Beam depth must be positive'),
    beamLength: z.number().positive('Beam length must be positive'),
    reinforcement: z.number().positive('Reinforcement must be positive'),
    barDiameter: z.number().positive('Bar diameter must be positive'),
    loadType: z.enum(['dead', 'live', 'wind']),
    loadValue: z.number().positive('Load value must be positive')
  })
});

export const electricalCalculationSchema = z.object({
  body: z.object({
    voltage: z.number().positive('Voltage must be positive'),
    current: z.number().positive('Current must be positive'),
    length: z.number().positive('Length must be positive'),
    cableSize: z.string().optional(),
    cableType: z.enum(['copper', 'aluminum']).optional(),
    voltageDropMax: z.number().positive().optional()
  })
});

export default {
  validateRequest,
  userRegistrationSchema,
  userLoginSchema,
  projectCreateSchema,
  civilEngineeringCalculationSchema,
  electricalCalculationSchema
};
// Application constants
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CONTRACTOR: 'CONTRACTOR',
  CONSULTANT: 'CONSULTANT',
  SUPPLIER: 'SUPPLIER',
  CLIENT: 'CLIENT'
};

export const PROJECT_STATUS = {
  PLANNING: 'PLANNING',
  DESIGN: 'DESIGN',
  CONSTRUCTION: 'CONSTRUCTION',
  COMPLETED: 'COMPLETED',
  ON_HOLD: 'ON_HOLD',
  CANCELLED: 'CANCELLED'
};

export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export const NOTIFICATION_TYPES = {
  PROJECT_UPDATE: 'PROJECT_UPDATE',
  TASK_ASSIGNED: 'TASK_ASSIGNED',
  TASK_COMPLETED: 'TASK_COMPLETED',
  DOCUMENT_UPLOADED: 'DOCUMENT_UPLOADED',
  TEAM_INVITATION: 'TEAM_INVITATION',
  SYSTEM_ALERT: 'SYSTEM_ALERT'
};

export const DOCUMENT_TYPES = {
  DRAWING: 'DRAWING',
  SPECIFICATION: 'SPECIFICATION',
  REPORT: 'REPORT',
  CALCULATION: 'CALCULATION',
  PHOTO: 'PHOTO',
  OTHER: 'OTHER'
};

export const MALAYSIAN_STANDARDS = {
  CIVIL: {
    'MS 1183:2015': 'Code of practice for design of steel structures',
    'UBBL 1984': 'Uniform Building By-Laws',
    'MS 1553:2018': 'Code of practice for design of concrete structures'
  },
  ELECTRICAL: {
    'MS IEC 60364': 'Electrical installations of buildings',
    'TNB Distribution Code': 'TNB electricity supply standards',
    'SIRIM Standards': 'Malaysian electrical safety standards'
  },
  HVAC: {
    'MS 1525:2019': 'Code of practice for energy efficiency and use of renewable energy',
    'ASHRAE Standards': 'International HVAC standards adopted in Malaysia'
  }
};

export const CALCULATION_TYPES = {
  STRUCTURAL: 'STRUCTURAL',
  ELECTRICAL: 'ELECTRICAL',
  HVAC: 'HVAC',
  HYDRAULIC: 'HYDRAULIC',
  GEOTECHNICAL: 'GEOTECHNICAL'
};

export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/zip'
  ]
};

export const API_RESPONSE_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500
};

export const RATE_LIMITS = {
  AUTH: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 5
  },
  API: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100
  },
  UPLOAD: {
    WINDOW_MS: 60 * 60 * 1000, // 1 hour
    MAX_REQUESTS: 20
  }
};

export default {
  USER_ROLES,
  PROJECT_STATUS,
  TASK_STATUS,
  TASK_PRIORITY,
  NOTIFICATION_TYPES,
  DOCUMENT_TYPES,
  MALAYSIAN_STANDARDS,
  CALCULATION_TYPES,
  FILE_UPLOAD_LIMITS,
  API_RESPONSE_CODES,
  RATE_LIMITS
};
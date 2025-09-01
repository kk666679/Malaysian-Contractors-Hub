// Enhanced form validation utilities for Malaysian Contractors Hub

export function isRequired(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

export function isEmail(value) {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(value);
}

export function isPhoneNumber(value) {
  const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
  return phoneRegex.test(value);
}

// Malaysian phone number validation
export function isMalaysianPhone(value) {
  const malaysianPhoneRegex = /^(\+?6?01[0-46-9]\d{7,8}|\+?6?0[2-9]\d{7,8})$/;
  return malaysianPhoneRegex.test(value.replace(/[\s-]/g, ''));
}

export function isDate(value) {
  return !isNaN(Date.parse(value));
}

export function minLength(value, length) {
  return value && value.length >= length;
}

export function maxLength(value, length) {
  return value && value.length <= length;
}

export function isNumber(value) {
  return !isNaN(value) && value !== '';
}

export function isPositiveNumber(value) {
  return isNumber(value) && Number(value) > 0;
}

export function isInteger(value) {
  return Number.isInteger(Number(value));
}

export function isInRange(value, min, max) {
  const num = Number(value);
  return num >= min && num <= max;
}

// Malaysian-specific validations
export function isMalaysianPostcode(value) {
  const postcodeRegex = /^\d{5}$/;
  return postcodeRegex.test(value);
}

export function isMalaysianIC(value) {
  const icRegex = /^\d{6}-\d{2}-\d{4}$/;
  return icRegex.test(value);
}

export function validateBudgetType(value) {
  return ['hourly', 'fixed', 'milestone'].includes(value);
}

export function validateProjectStatus(value) {
  return ['PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED'].includes(value);
}

export function validateUserRole(value) {
  return ['ADMIN', 'CONTRACTOR', 'CONSULTANT', 'SUPPLIER', 'CLIENT'].includes(value);
}

// Enhanced project form validation
export function validateProjectForm(formData) {
  const errors = {};

  if (!isRequired(formData.name || formData.project_title)) {
    errors.name = 'Project name is required';
  }

  if (!isRequired(formData.description || formData.project_description)) {
    errors.description = 'Project description is required';
  }

  if (!isRequired(formData.location || formData.project_location)) {
    errors.location = 'Project location is required';
  }

  if (!isRequired(formData.client)) {
    errors.client = 'Client name is required';
  }

  if (formData.startDate && !isDate(formData.startDate)) {
    errors.startDate = 'Start date is invalid';
  }

  if (formData.endDate && !isDate(formData.endDate)) {
    errors.endDate = 'End date is invalid';
  }

  if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
    errors.endDate = 'End date must be after start date';
  }

  if (!isPositiveNumber(formData.budget)) {
    errors.budget = 'Budget must be a positive number';
  }

  if (formData.status && !validateProjectStatus(formData.status)) {
    errors.status = 'Invalid project status';
  }

  return errors;
}

// User registration form validation
export function validateUserForm(formData) {
  const errors = {};

  if (!isRequired(formData.name)) {
    errors.name = 'Name is required';
  }

  if (!isRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!isEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!isRequired(formData.password)) {
    errors.password = 'Password is required';
  } else if (!minLength(formData.password, 8)) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (formData.phone && !isMalaysianPhone(formData.phone)) {
    errors.phone = 'Please enter a valid Malaysian phone number';
  }

  if (formData.role && !validateUserRole(formData.role)) {
    errors.role = 'Invalid user role';
  }

  return errors;
}

// Engineering calculation form validation
export function validateEngineeringForm(formData, type) {
  const errors = {};

  switch (type) {
    case 'structural':
      if (!isPositiveNumber(formData.beamWidth)) {
        errors.beamWidth = 'Beam width must be a positive number';
      }
      if (!isPositiveNumber(formData.beamDepth)) {
        errors.beamDepth = 'Beam depth must be a positive number';
      }
      if (!isPositiveNumber(formData.loadValue)) {
        errors.loadValue = 'Load value must be a positive number';
      }
      break;

    case 'electrical':
      if (!isPositiveNumber(formData.voltage)) {
        errors.voltage = 'Voltage must be a positive number';
      }
      if (!isPositiveNumber(formData.current)) {
        errors.current = 'Current must be a positive number';
      }
      if (!isPositiveNumber(formData.length)) {
        errors.length = 'Cable length must be a positive number';
      }
      break;

    default:
      break;
  }

  return errors;
}

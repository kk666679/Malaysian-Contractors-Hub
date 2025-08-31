// Basic form validation utilities

export function isRequired(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

export function isEmail(value) {
  const emailRegex = /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
  return emailRegex.test(value);
}

export function isPhoneNumber(value) {
  const phoneRegex = /^\\+?[0-9\\s-]{7,15}$/;
  return phoneRegex.test(value);
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
  return !isNaN(value);
}

export function isPositiveNumber(value) {
  return isNumber(value) && Number(value) > 0;
}

export function validateBudgetType(value) {
  return ['hourly', 'fixed'].includes(value);
}

// Example usage for a project form validation
export function validateProjectForm(formData) {
  const errors = {};

  if (!isRequired(formData.project_title)) {
    errors.project_title = 'Project title is required';
  }

  if (!isRequired(formData.project_description)) {
    errors.project_description = 'Project description is required';
  }

  if (!isRequired(formData.project_location)) {
    errors.project_location = 'Project location is required';
  }

  if (!isDate(formData.start_date)) {
    errors.start_date = 'Start date is invalid';
  }

  if (!isRequired(formData.duration)) {
    errors.duration = 'Project duration is required';
  }

  if (!validateBudgetType(formData.budget_type)) {
    errors.budget_type = 'Budget type must be hourly or fixed';
  }

  if (!isPositiveNumber(formData.budget)) {
    errors.budget = 'Budget must be a positive number';
  }

  return errors;
}

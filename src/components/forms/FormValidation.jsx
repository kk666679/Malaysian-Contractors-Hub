import { useState } from 'react';
import { z } from 'zod';

// Validation schemas
export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Name too long'),
  description: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  client: z.string().min(1, 'Client is required'),
  budget: z.number().positive('Budget must be positive').optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional()
});

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'CONTRACTOR', 'CLIENT', 'CONSULTANT', 'SUPPLIER'])
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(100, 'Title too long'),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional()
});

// Custom validation hook
export const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const clearErrors = () => setErrors({});

  return { errors, validate, clearErrors };
};

// Validation component wrapper
export const ValidatedForm = ({ children, schema, onSubmit, className = '' }) => {
  const { errors, validate } = useFormValidation(schema);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (validate(data)) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children({ errors })}
    </form>
  );
};

export default { projectSchema, userSchema, taskSchema, useFormValidation, ValidatedForm };
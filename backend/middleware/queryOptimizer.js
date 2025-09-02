// Query optimization middleware for database operations
export const queryOptimizer = (req, res, next) => {
  // Add pagination defaults
  if (req.query.page) {
    req.query.page = Math.max(1, parseInt(req.query.page) || 1);
  }
  if (req.query.limit) {
    req.query.limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  }

  // Sanitize sort parameters
  if (req.query.sort) {
    const allowedSortFields = ['createdAt', 'updatedAt', 'name', 'status', 'priority'];
    const sortField = req.query.sort.replace(/^-/, '');
    if (!allowedSortFields.includes(sortField)) {
      req.query.sort = 'createdAt';
    }
  }

  // Add select optimization hint
  req.optimizeQuery = {
    pagination: {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      skip: ((req.query.page || 1) - 1) * (req.query.limit || 10)
    },
    sort: req.query.sort || 'createdAt',
    select: req.query.fields ? req.query.fields.split(',') : undefined
  };

  next();
};
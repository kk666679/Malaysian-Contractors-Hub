// Financial & Invoicing Routes - GCMS
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  createInvoice,
  getInvoices,
  recordPayment,
  createExpense,
  getExpenses,
  getFinancialDashboard,
  generateFinancialReport,
  getCashFlowForecast
} = require('../../controllers/gcms/financialController');

// Invoice routes
router.post('/invoices', auth, createInvoice);
router.get('/invoices', auth, getInvoices);
router.post('/invoices/:invoiceId/payments', auth, recordPayment);

// Expense routes
router.post('/expenses', auth, createExpense);
router.get('/expenses', auth, getExpenses);

// Dashboard and reporting routes
router.get('/dashboard', auth, getFinancialDashboard);
router.get('/reports', auth, generateFinancialReport);
router.get('/cash-flow-forecast', auth, getCashFlowForecast);

module.exports = router;
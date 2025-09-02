// Financial & Invoicing Controller - GCMS
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Invoice
const createInvoice = async (req, res) => {
  try {
    const {
      type, clientName, clientEmail, clientAddress, dueDate,
      contractId, invoiceItems, taxAmount = 0
    } = req.body;

    // Generate invoice number
    const count = await prisma.invoice.count();
    const number = `INV-${String(count + 1).padStart(6, '0')}`;

    // Calculate totals
    const subtotal = invoiceItems.reduce((sum, item) => 
      sum + (parseFloat(item.quantity) * parseFloat(item.unitPrice)), 0
    );
    const totalAmount = subtotal + parseFloat(taxAmount);

    const invoice = await prisma.invoice.create({
      data: {
        number,
        type,
        subtotal,
        taxAmount: parseFloat(taxAmount),
        totalAmount,
        dueDate: new Date(dueDate),
        clientName,
        clientEmail,
        clientAddress,
        contractId,
        companyId: req.user.companyId,
        invoiceItems: {
          create: invoiceItems.map(item => ({
            description: item.description,
            quantity: parseFloat(item.quantity),
            unit: item.unit,
            unitPrice: parseFloat(item.unitPrice),
            totalPrice: parseFloat(item.quantity) * parseFloat(item.unitPrice)
          }))
        }
      },
      include: {
        invoiceItems: true,
        contract: { select: { id: true, title: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: invoice,
      message: 'Invoice created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating invoice',
      error: error.message
    });
  }
};

// Get Invoices
const getInvoices = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = { companyId: req.user.companyId };
    if (status) where.status = status;
    if (type) where.type = type;

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: {
          contract: { select: { id: true, title: true } },
          payments: true,
          _count: {
            select: {
              invoiceItems: true,
              payments: true
            }
          }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.invoice.count({ where })
    ]);

    // Calculate invoice statistics
    const invoicesWithStats = invoices.map(invoice => ({
      ...invoice,
      stats: {
        totalItems: invoice._count.invoiceItems,
        totalPayments: invoice._count.payments,
        remainingAmount: parseFloat(invoice.totalAmount) - parseFloat(invoice.paidAmount),
        daysOverdue: invoice.status === 'OVERDUE' 
          ? Math.ceil((new Date() - new Date(invoice.dueDate)) / (1000 * 60 * 60 * 24))
          : 0
      }
    }));

    res.json({
      success: true,
      data: invoicesWithStats,
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
      message: 'Error fetching invoices',
      error: error.message
    });
  }
};

// Record Payment
const recordPayment = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { amount, method, reference, notes } = req.body;

    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        companyId: req.user.companyId
      }
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(amount),
        method,
        reference,
        notes,
        invoiceId
      }
    });

    // Update invoice paid amount and status
    const newPaidAmount = parseFloat(invoice.paidAmount) + parseFloat(amount);
    const newStatus = newPaidAmount >= parseFloat(invoice.totalAmount) ? 'PAID' : invoice.status;

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: newPaidAmount,
        status: newStatus,
        paidDate: newStatus === 'PAID' ? new Date() : invoice.paidDate
      }
    });

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment recorded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording payment',
      error: error.message
    });
  }
};

// Create Expense
const createExpense = async (req, res) => {
  try {
    const {
      description, category, amount, date, projectId, receipt
    } = req.body;

    const expense = await prisma.expense.create({
      data: {
        description,
        category,
        amount: parseFloat(amount),
        date: new Date(date),
        projectId,
        receipt,
        companyId: req.user.companyId,
        recordedById: req.user.id
      },
      include: {
        project: { select: { id: true, name: true } },
        recordedBy: { select: { id: true, name: true } }
      }
    });

    // Update project actual cost if expense is project-related
    if (projectId) {
      await prisma.project.update({
        where: { id: projectId },
        data: {
          actualCost: {
            increment: parseFloat(amount)
          }
        }
      });
    }

    res.status(201).json({
      success: true,
      data: expense,
      message: 'Expense recorded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating expense',
      error: error.message
    });
  }
};

// Get Expenses
const getExpenses = async (req, res) => {
  try {
    const { category, projectId, startDate, endDate, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = { companyId: req.user.companyId };
    if (category) where.category = category;
    if (projectId) where.projectId = projectId;
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({
        where,
        include: {
          project: { select: { id: true, name: true } },
          recordedBy: { select: { id: true, name: true } }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { date: 'desc' }
      }),
      prisma.expense.count({ where })
    ]);

    res.json({
      success: true,
      data: expenses,
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
      message: 'Error fetching expenses',
      error: error.message
    });
  }
};

// Get Financial Dashboard
const getFinancialDashboard = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const [
      totalInvoices,
      paidInvoices,
      overdueInvoices,
      monthlyRevenue,
      monthlyExpenses,
      outstandingAmount,
      recentTransactions
    ] = await Promise.all([
      prisma.invoice.count({ where: { companyId } }),
      prisma.invoice.count({ where: { companyId, status: 'PAID' } }),
      prisma.invoice.count({ where: { companyId, status: 'OVERDUE' } }),
      prisma.invoice.aggregate({
        where: {
          companyId,
          paidDate: {
            gte: startOfMonth,
            lte: endOfMonth
          }
        },
        _sum: { paidAmount: true }
      }),
      prisma.expense.aggregate({
        where: {
          companyId,
          date: {
            gte: startOfMonth,
            lte: endOfMonth
          }
        },
        _sum: { amount: true }
      }),
      prisma.invoice.aggregate({
        where: {
          companyId,
          status: { in: ['SENT', 'VIEWED', 'OVERDUE'] }
        },
        _sum: { totalAmount: true }
      }),
      // Recent payments
      prisma.payment.findMany({
        where: {
          invoice: { companyId }
        },
        include: {
          invoice: { select: { number: true, clientName: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ]);

    const dashboardData = {
      summary: {
        totalInvoices,
        paidInvoices,
        overdueInvoices,
        paymentRate: totalInvoices > 0 ? (paidInvoices / totalInvoices * 100).toFixed(1) : 0,
        monthlyRevenue: monthlyRevenue._sum.paidAmount || 0,
        monthlyExpenses: monthlyExpenses._sum.amount || 0,
        monthlyProfit: (monthlyRevenue._sum.paidAmount || 0) - (monthlyExpenses._sum.amount || 0),
        outstandingAmount: outstandingAmount._sum.totalAmount || 0
      },
      recentTransactions
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching financial dashboard',
      error: error.message
    });
  }
};

// Generate Financial Report
const generateFinancialReport = async (req, res) => {
  try {
    const { startDate, endDate, type = 'summary' } = req.query;
    const companyId = req.user.companyId;

    const dateFilter = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };

    const [
      invoiceData,
      expenseData,
      paymentData
    ] = await Promise.all([
      prisma.invoice.findMany({
        where: {
          companyId,
          issueDate: dateFilter
        },
        include: {
          invoiceItems: true,
          payments: true
        }
      }),
      prisma.expense.findMany({
        where: {
          companyId,
          date: dateFilter
        },
        include: {
          project: { select: { name: true } }
        }
      }),
      prisma.payment.findMany({
        where: {
          invoice: { companyId },
          createdAt: dateFilter
        },
        include: {
          invoice: { select: { number: true, clientName: true } }
        }
      })
    ]);

    // Calculate totals
    const totalInvoiced = invoiceData.reduce((sum, inv) => sum + parseFloat(inv.totalAmount), 0);
    const totalPaid = paymentData.reduce((sum, pay) => sum + parseFloat(pay.amount), 0);
    const totalExpenses = expenseData.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const netProfit = totalPaid - totalExpenses;

    // Expense breakdown by category
    const expenseByCategory = expenseData.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});

    const report = {
      period: { startDate, endDate },
      summary: {
        totalInvoiced,
        totalPaid,
        totalExpenses,
        netProfit,
        profitMargin: totalPaid > 0 ? (netProfit / totalPaid * 100).toFixed(2) : 0
      },
      invoices: invoiceData.length,
      payments: paymentData.length,
      expenses: expenseData.length,
      expenseByCategory,
      details: type === 'detailed' ? {
        invoiceData,
        expenseData,
        paymentData
      } : null
    };

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating financial report',
      error: error.message
    });
  }
};

// Cash Flow Forecast
const getCashFlowForecast = async (req, res) => {
  try {
    const { months = 6 } = req.query;
    const companyId = req.user.companyId;

    const forecast = [];
    const currentDate = new Date();

    for (let i = 0; i < parseInt(months); i++) {
      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + i + 1, 0);

      const [expectedIncome, plannedExpenses] = await Promise.all([
        prisma.invoice.aggregate({
          where: {
            companyId,
            dueDate: {
              gte: monthStart,
              lte: monthEnd
            },
            status: { in: ['SENT', 'VIEWED'] }
          },
          _sum: { totalAmount: true }
        }),
        prisma.expense.aggregate({
          where: {
            companyId,
            date: {
              gte: monthStart,
              lte: monthEnd
            }
          },
          _sum: { amount: true }
        })
      ]);

      forecast.push({
        month: monthStart.toISOString().substring(0, 7),
        expectedIncome: expectedIncome._sum.totalAmount || 0,
        plannedExpenses: plannedExpenses._sum.amount || 0,
        netCashFlow: (expectedIncome._sum.totalAmount || 0) - (plannedExpenses._sum.amount || 0)
      });
    }

    res.json({
      success: true,
      data: forecast
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating cash flow forecast',
      error: error.message
    });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  recordPayment,
  createExpense,
  getExpenses,
  getFinancialDashboard,
  generateFinancialReport,
  getCashFlowForecast
};
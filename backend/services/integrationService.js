const axios = require('axios');

class IntegrationService {
  // Payment gateway integration (Malaysian banks)
  async processPayment(paymentData) {
    const { amount, currency = 'MYR', method, bankCode } = paymentData;
    
    const payload = {
      amount: amount * 100, // Convert to cents
      currency,
      payment_method: method,
      bank_code: bankCode,
      description: `MC-Hub Payment - ${paymentData.description}`
    };

    try {
      const response = await axios.post(process.env.PAYMENT_GATEWAY_URL, payload, {
        headers: {
          'Authorization': `Bearer ${process.env.PAYMENT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      return {
        success: true,
        transactionId: response.data.id,
        status: response.data.status,
        paymentUrl: response.data.payment_url
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Payment processing failed'
      };
    }
  }

  // BIM software integration
  async syncBIMData(projectId, bimData) {
    try {
      const response = await axios.post(`${process.env.BIM_API_URL}/projects/${projectId}/sync`, {
        geometry: bimData.geometry,
        materials: bimData.materials,
        quantities: bimData.quantities
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.BIM_API_KEY}`
        }
      });

      return {
        success: true,
        syncId: response.data.sync_id,
        updatedElements: response.data.updated_count
      };
    } catch (error) {
      return {
        success: false,
        error: 'BIM sync failed'
      };
    }
  }

  // Government portal integration
  async submitComplianceReport(reportData) {
    const { projectId, reportType, data } = reportData;
    
    try {
      const response = await axios.post(`${process.env.GOV_PORTAL_URL}/submissions`, {
        project_reference: projectId,
        report_type: reportType,
        submission_data: data,
        timestamp: new Date().toISOString()
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.GOV_API_KEY}`,
          'X-Agency-Code': 'CIDB'
        }
      });

      return {
        success: true,
        submissionId: response.data.submission_id,
        status: response.data.status,
        trackingNumber: response.data.tracking_number
      };
    } catch (error) {
      return {
        success: false,
        error: 'Government submission failed'
      };
    }
  }

  // Accounting software integration
  async syncFinancialData(financialData) {
    try {
      const response = await axios.post(`${process.env.ACCOUNTING_API_URL}/transactions`, {
        transactions: financialData.map(item => ({
          date: item.date,
          amount: item.amount,
          description: item.description,
          category: item.category,
          project_id: item.projectId
        }))
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.ACCOUNTING_API_KEY}`
        }
      });

      return {
        success: true,
        syncedCount: response.data.synced_count
      };
    } catch (error) {
      return {
        success: false,
        error: 'Financial sync failed'
      };
    }
  }
}

module.exports = new IntegrationService();
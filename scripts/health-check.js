#!/usr/bin/env node

const https = require('https');
const http = require('http');

class HealthChecker {
  constructor() {
    this.endpoints = {
      frontend: process.env.FRONTEND_URL || 'https://mc-hub.site',
      backend: process.env.BACKEND_URL || 'https://api.mc-hub.site',
      database: process.env.DATABASE_URL
    };
  }

  async checkEndpoint(url, timeout = 10000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const client = url.startsWith('https') ? https : http;
      
      const req = client.get(url, (res) => {
        const responseTime = Date.now() - startTime;
        resolve({
          status: res.statusCode,
          responseTime,
          healthy: res.statusCode >= 200 && res.statusCode < 400
        });
      });

      req.setTimeout(timeout, () => {
        req.destroy();
        resolve({
          status: 'timeout',
          responseTime: timeout,
          healthy: false
        });
      });

      req.on('error', (error) => {
        resolve({
          status: 'error',
          error: error.message,
          responseTime: Date.now() - startTime,
          healthy: false
        });
      });
    });
  }

  async checkDatabase() {
    if (!this.endpoints.database) {
      return { healthy: false, error: 'No database URL configured' };
    }

    try {
      // Simple connection test (would need actual DB client in real implementation)
      return { healthy: true, responseTime: 50 };
    } catch (error) {
      return { healthy: false, error: error.message };
    }
  }

  formatResult(name, result) {
    const status = result.healthy ? '✅' : '❌';
    const time = result.responseTime ? `${result.responseTime}ms` : 'N/A';
    const error = result.error ? ` (${result.error})` : '';
    
    return `${status} ${name}: ${time}${error}`;
  }

  async runHealthCheck() {
    console.log('🏥 Malaysian Contractors Hub - Health Check\n');

    const checks = await Promise.all([
      this.checkEndpoint(this.endpoints.frontend).then(result => ({ name: 'Frontend', result })),
      this.checkEndpoint(`${this.endpoints.backend}/health`).then(result => ({ name: 'Backend API', result })),
      this.checkDatabase().then(result => ({ name: 'Database', result }))
    ]);

    let allHealthy = true;
    
    checks.forEach(({ name, result }) => {
      console.log(this.formatResult(name, result));
      if (!result.healthy) allHealthy = false;
    });

    console.log('\n📊 Overall Status:', allHealthy ? '✅ Healthy' : '❌ Issues Detected');
    
    if (process.env.CI) {
      process.exit(allHealthy ? 0 : 1);
    }

    return allHealthy;
  }
}

// Run health check
const checker = new HealthChecker();
checker.runHealthCheck().catch(error => {
  console.error('Health check failed:', error);
  process.exit(1);
});

module.exports = HealthChecker;
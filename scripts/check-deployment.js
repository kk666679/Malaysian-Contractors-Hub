#!/usr/bin/env node

const https = require('https');

const domains = [
  'https://mc-hub.site',
  'https://malaysian-contractors-hub.vercel.app'
];

async function checkDomain(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        success: res.statusCode === 200
      });
    });
    
    req.on('error', () => {
      resolve({
        url,
        status: 'ERROR',
        success: false
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false
      });
    });
  });
}

async function main() {
  console.log('🚀 Checking deployment status...\n');
  
  const results = await Promise.all(domains.map(checkDomain));
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.url} - ${result.status}`);
  });
  
  const allSuccess = results.every(r => r.success);
  console.log(`\n${allSuccess ? '✅' : '❌'} Overall status: ${allSuccess ? 'SUCCESS' : 'FAILED'}`);
  
  process.exit(allSuccess ? 0 : 1);
}

main().catch(console.error);
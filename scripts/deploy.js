#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class DeploymentCLI {
  constructor() {
    this.environments = {
      staging: {
        name: 'Staging',
        branch: 'develop',
        url: 'https://malaysian-contractors-hub.vercel.app'
      },
      production: {
        name: 'Production',
        branch: 'main',
        url: 'https://mc-hub.site',
        domains: ['mc-hub.site', 'www.mc-hub.site']
      }
    };
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };
    console.log(`${colors[type]}[${type.toUpperCase()}]${colors.reset} ${message}`);
  }

  async checkPrerequisites() {
    this.log('Checking prerequisites...');
    
    try {
      execSync('git --version', { stdio: 'ignore' });
      execSync('node --version', { stdio: 'ignore' });
      execSync('npm --version', { stdio: 'ignore' });
      this.log('Prerequisites check passed', 'success');
      return true;
    } catch (error) {
      this.log('Missing required tools: git, node, npm', 'error');
      return false;
    }
  }

  async runTests() {
    this.log('Running tests...');
    
    try {
      execSync('npm test', { stdio: 'inherit' });
      this.log('Tests passed', 'success');
      return true;
    } catch (error) {
      this.log('Tests failed', 'error');
      return false;
    }
  }

  async buildProject() {
    this.log('Building project...');
    
    try {
      execSync('npm run build', { stdio: 'inherit' });
      this.log('Build completed', 'success');
      return true;
    } catch (error) {
      this.log('Build failed', 'error');
      return false;
    }
  }

  async deployToEnvironment(env) {
    const environment = this.environments[env];
    if (!environment) {
      this.log(`Unknown environment: ${env}`, 'error');
      return false;
    }

    this.log(`Deploying to ${environment.name}...`);

    try {
      // Check current branch
      const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      
      if (currentBranch !== environment.branch) {
        this.log(`Switching to ${environment.branch} branch...`);
        execSync(`git checkout ${environment.branch}`);
        execSync(`git pull origin ${environment.branch}`);
      }

      // Deploy based on environment
      if (env === 'production') {
        execSync('vercel --prod', { stdio: 'inherit' });
        
        // Configure custom domains if specified
        if (environment.domains) {
          this.log('Configuring custom domains...');
          for (const domain of environment.domains) {
            try {
              execSync(`vercel domains add ${domain}`, { stdio: 'inherit' });
              this.log(`Domain ${domain} configured`, 'success');
            } catch (domainError) {
              this.log(`Domain ${domain} already configured or failed`, 'warning');
            }
          }
        }
      } else {
        execSync('vercel', { stdio: 'inherit' });
      }

      this.log(`Deployment to ${environment.name} completed`, 'success');
      this.log(`Primary URL: ${environment.url}`, 'info');
      
      if (environment.domains) {
        environment.domains.forEach(domain => {
          this.log(`Domain: https://${domain}`, 'info');
        });
      }
      
      return true;
    } catch (error) {
      this.log(`Deployment to ${environment.name} failed`, 'error');
      return false;
    }
  }

  async createRelease(version) {
    this.log(`Creating release ${version}...`);

    try {
      // Create and push tag
      execSync(`git tag -a ${version} -m "Release ${version}"`);
      execSync(`git push origin ${version}`);

      this.log(`Release ${version} created`, 'success');
      return true;
    } catch (error) {
      this.log(`Failed to create release ${version}`, 'error');
      return false;
    }
  }

  async rollback(environment) {
    this.log(`Rolling back ${environment}...`);
    
    try {
      execSync(`vercel rollback --env ${environment}`, { stdio: 'inherit' });
      this.log(`Rollback completed for ${environment}`, 'success');
      return true;
    } catch (error) {
      this.log(`Rollback failed for ${environment}`, 'error');
      return false;
    }
  }

  async getStatus() {
    this.log('Getting deployment status...');
    
    try {
      this.log('Vercel deployments:');
      execSync('vercel ls', { stdio: 'inherit' });
      
      this.log('\nDomain status:');
      execSync('vercel domains ls', { stdio: 'inherit' });
      
      this.log('\nProject info:');
      execSync('vercel inspect', { stdio: 'inherit' });
      
      return true;
    } catch (error) {
      this.log('Failed to get status', 'error');
      return false;
    }
  }

  showHelp() {
    console.log(`
Malaysian Contractors Hub - Deployment CLI

Usage: node scripts/deploy.js <command> [options]

Commands:
  deploy <env>     Deploy to environment (staging|production)
  test            Run tests only
  build           Build project only
  release <ver>   Create and deploy release
  rollback <env>  Rollback deployment
  status          Show deployment status
  domains         Manage custom domains
  help            Show this help

Examples:
  node scripts/deploy.js deploy staging
  node scripts/deploy.js deploy production
  node scripts/deploy.js release v0.4.1
  node scripts/deploy.js rollback production
  node scripts/deploy.js domains
  node scripts/deploy.js status

Production Domains:
  - https://mc-hub.site (Primary)
  - https://www.mc-hub.site (Redirects to primary)
  - https://malaysian-contractors-hub.vercel.app (Vercel)
    `);
  }

  async run() {
    const [,, command, ...args] = process.argv;

    if (!command || command === 'help') {
      this.showHelp();
      return;
    }

    const prerequisitesOk = await this.checkPrerequisites();
    if (!prerequisitesOk) {
      process.exit(1);
    }

    switch (command) {
      case 'deploy':
        const env = args[0];
        if (!env) {
          this.log('Environment required: staging or production', 'error');
          process.exit(1);
        }
        
        const testsOk = await this.runTests();
        if (!testsOk) {
          this.log('Deployment aborted due to test failures', 'error');
          process.exit(1);
        }

        const buildOk = await this.buildProject();
        if (!buildOk) {
          this.log('Deployment aborted due to build failure', 'error');
          process.exit(1);
        }

        const deployOk = await this.deployToEnvironment(env);
        if (!deployOk) {
          process.exit(1);
        }
        break;

      case 'test':
        const testResult = await this.runTests();
        process.exit(testResult ? 0 : 1);

      case 'build':
        const buildResult = await this.buildProject();
        process.exit(buildResult ? 0 : 1);

      case 'release':
        const version = args[0];
        if (!version) {
          this.log('Version required (e.g., v0.4.1)', 'error');
          process.exit(1);
        }

        const releaseOk = await this.createRelease(version);
        if (releaseOk) {
          await this.deployToEnvironment('production');
        }
        break;

      case 'rollback':
        const rollbackEnv = args[0];
        if (!rollbackEnv) {
          this.log('Environment required for rollback', 'error');
          process.exit(1);
        }
        await this.rollback(rollbackEnv);
        break;

      case 'status':
        await this.getStatus();
        break;

      case 'domains':
        this.log('Domain Configuration:');
        this.log('Production: mc-hub.site, www.mc-hub.site', 'info');
        this.log('Staging: malaysian-contractors-hub.vercel.app', 'info');
        try {
          execSync('vercel domains ls', { stdio: 'inherit' });
        } catch (error) {
          this.log('Failed to get domain status', 'error');
        }
        break;

      default:
        this.log(`Unknown command: ${command}`, 'error');
        this.showHelp();
        process.exit(1);
    }
  }
}

// Run CLI
const cli = new DeploymentCLI();
cli.run().catch(error => {
  console.error('Deployment CLI error:', error);
  process.exit(1);
});

module.exports = DeploymentCLI;
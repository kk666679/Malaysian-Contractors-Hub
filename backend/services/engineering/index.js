/**
 * MC-Hub Engineering Services
 * Comprehensive engineering calculations and standards compliance for Malaysian contractors
 */

// Core Engineering Modules
export { default as CivilEngineering } from './civil/index.js';
export { default as ElectricalSystems } from './electrical/index.js';
export { default as HVACEngineering } from './hvac/index.js';
export { default as SewerageEngineering } from './sewerage/index.js';
export { default as ELVSystems } from './elv/index.js';

// Standards and Compliance
export { default as MalaysianStandards } from './standards/malaysian.js';
export { default as ISOStandards } from './standards/iso.js';
export { default as SafetyCompliance } from './standards/safety.js';

// Utilities
export { default as UnitConverter } from './utils/unitConverter.js';
export { default as LoadCalculator } from './utils/loadCalculator.js';
export { default as SafetyChecker } from './utils/safetyChecker.js';
export { default as MaterialDatabase } from './utils/materialDatabase.js';

// GCMS Integration
export { default as GCMSIntegration } from './gcms/integration.js';
export { default as ProjectLifecycle } from './gcms/projectLifecycle.js';
export { default as ResourceManager } from './gcms/resourceManager.js';

// Analytics and Reporting
export { default as PerformanceAnalytics } from './analytics/performance.js';
export { default as FinancialTracking } from './analytics/financial.js';
export { default as ComplianceReporting } from './analytics/compliance.js';

/**
 * Main Engineering Services Class
 */
class EngineeringServices {
  constructor() {
    this.modules = {
      civil: null, // Lazy loaded
      electrical: null,
      hvac: null,
      sewerage: null,
      elv: null
    };
  }

  async getModule(moduleName) {
    if (!this.modules[moduleName]) {
      switch (moduleName) {
        case 'civil':
          const { default: CivilEngineering } = await import('./civil/index.js');
          this.modules[moduleName] = new CivilEngineering();
          break;
        case 'electrical':
          const { default: ElectricalSystems } = await import('./electrical/index.js');
          this.modules[moduleName] = new ElectricalSystems();
          break;
        case 'hvac':
          const { default: HVACEngineering } = await import('./hvac/index.js');
          this.modules[moduleName] = new HVACEngineering();
          break;
        case 'sewerage':
          const { default: SewerageEngineering } = await import('./sewerage/index.js');
          this.modules[moduleName] = new SewerageEngineering();
          break;
        case 'elv':
          const { default: ELVSystems } = await import('./elv/index.js');
          this.modules[moduleName] = new ELVSystems();
          break;
        default:
          throw new Error(`Module ${moduleName} not found`);
      }
    }
    return this.modules[moduleName];
  }

  getAvailableModules() {
    return Object.keys(this.modules);
  }

  async performCalculation(moduleName, calculationType, inputs, options = {}) {
    const module = await this.getModule(moduleName);
    return module.calculate(calculationType, inputs, options);
  }
}

export default EngineeringServices;
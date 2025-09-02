/**
 * Unit Conversion Utilities
 * Comprehensive unit conversion for engineering calculations
 */

class UnitConverter {
  constructor() {
    this.conversions = {
      // Length conversions (base: meters)
      length: {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144
      },
      
      // Area conversions (base: square meters)
      area: {
        'mm²': 0.000001,
        'cm²': 0.0001,
        'm²': 1,
        'km²': 1000000,
        'in²': 0.00064516,
        'ft²': 0.092903,
        'yd²': 0.836127
      },
      
      // Volume conversions (base: cubic meters)
      volume: {
        'mm³': 0.000000001,
        'cm³': 0.000001,
        'm³': 1,
        'l': 0.001,
        'ml': 0.000001,
        'in³': 0.000016387,
        'ft³': 0.028317,
        'yd³': 0.764555
      },
      
      // Force conversions (base: Newtons)
      force: {
        N: 1,
        kN: 1000,
        MN: 1000000,
        lbf: 4.44822,
        kip: 4448.22,
        tf: 9806.65 // metric ton-force
      },
      
      // Pressure/Stress conversions (base: Pascals)
      pressure: {
        Pa: 1,
        kPa: 1000,
        MPa: 1000000,
        GPa: 1000000000,
        'N/mm²': 1000000,
        'kN/m²': 1000,
        'MN/m²': 1000000,
        psi: 6894.76,
        ksi: 6894760,
        bar: 100000,
        atm: 101325
      },
      
      // Moment conversions (base: Newton-meters)
      moment: {
        'N·m': 1,
        'kN·m': 1000,
        'MN·m': 1000000,
        'N·mm': 0.001,
        'kN·mm': 1,
        'lbf·ft': 1.35582,
        'kip·ft': 1355.82
      },
      
      // Mass conversions (base: kilograms)
      mass: {
        g: 0.001,
        kg: 1,
        t: 1000, // metric ton
        lb: 0.453592,
        oz: 0.0283495
      },
      
      // Density conversions (base: kg/m³)
      density: {
        'kg/m³': 1,
        'g/cm³': 1000,
        'lb/ft³': 16.0185,
        'lb/in³': 27679.9
      },
      
      // Temperature conversions (base: Celsius)
      temperature: {
        C: { offset: 0, scale: 1 },
        F: { offset: 32, scale: 9/5 },
        K: { offset: 273.15, scale: 1 },
        R: { offset: 491.67, scale: 9/5 } // Rankine
      }
    };
  }

  /**
   * Convert value between units
   * @param {number} value - Value to convert
   * @param {string} fromUnit - Source unit
   * @param {string} toUnit - Target unit
   * @param {string} type - Unit type (length, area, force, etc.)
   * @returns {number} Converted value
   */
  convert(value, fromUnit, toUnit, type) {
    if (!this.conversions[type]) {
      throw new Error(`Unit type '${type}' not supported`);
    }

    const conversions = this.conversions[type];

    // Special handling for temperature
    if (type === 'temperature') {
      return this.convertTemperature(value, fromUnit, toUnit);
    }

    if (!conversions[fromUnit] || !conversions[toUnit]) {
      throw new Error(`Unit conversion not available for ${fromUnit} to ${toUnit}`);
    }

    // Convert to base unit, then to target unit
    const baseValue = value * conversions[fromUnit];
    const convertedValue = baseValue / conversions[toUnit];

    return this.roundToSignificantFigures(convertedValue, 6);
  }

  /**
   * Convert temperature with special handling for offset scales
   */
  convertTemperature(value, fromUnit, toUnit) {
    const conversions = this.conversions.temperature;
    
    if (!conversions[fromUnit] || !conversions[toUnit]) {
      throw new Error(`Temperature unit conversion not available for ${fromUnit} to ${toUnit}`);
    }

    // Convert from source to Celsius
    let celsius;
    if (fromUnit === 'C') {
      celsius = value;
    } else if (fromUnit === 'F') {
      celsius = (value - 32) * 5/9;
    } else if (fromUnit === 'K') {
      celsius = value - 273.15;
    } else if (fromUnit === 'R') {
      celsius = (value - 491.67) * 5/9;
    }

    // Convert from Celsius to target
    let result;
    if (toUnit === 'C') {
      result = celsius;
    } else if (toUnit === 'F') {
      result = celsius * 9/5 + 32;
    } else if (toUnit === 'K') {
      result = celsius + 273.15;
    } else if (toUnit === 'R') {
      result = celsius * 9/5 + 491.67;
    }

    return this.roundToSignificantFigures(result, 6);
  }

  /**
   * Batch convert multiple values
   */
  convertBatch(values, fromUnit, toUnit, type) {
    return values.map(value => this.convert(value, fromUnit, toUnit, type));
  }

  /**
   * Get available units for a type
   */
  getAvailableUnits(type) {
    if (!this.conversions[type]) {
      throw new Error(`Unit type '${type}' not supported`);
    }
    return Object.keys(this.conversions[type]);
  }

  /**
   * Get all supported unit types
   */
  getSupportedTypes() {
    return Object.keys(this.conversions);
  }

  /**
   * Validate unit and type combination
   */
  isValidUnit(unit, type) {
    return this.conversions[type] && this.conversions[type][unit] !== undefined;
  }

  /**
   * Get conversion factor between two units
   */
  getConversionFactor(fromUnit, toUnit, type) {
    if (type === 'temperature') {
      throw new Error('Conversion factor not applicable for temperature (use convert method)');
    }

    const conversions = this.conversions[type];
    if (!conversions || !conversions[fromUnit] || !conversions[toUnit]) {
      throw new Error(`Cannot get conversion factor for ${fromUnit} to ${toUnit}`);
    }

    return conversions[fromUnit] / conversions[toUnit];
  }

  /**
   * Round to significant figures
   */
  roundToSignificantFigures(value, significantFigures) {
    if (value === 0) return 0;
    
    const magnitude = Math.floor(Math.log10(Math.abs(value)));
    const factor = Math.pow(10, significantFigures - magnitude - 1);
    
    return Math.round(value * factor) / factor;
  }

  /**
   * Format value with appropriate precision and units
   */
  formatValue(value, unit, precision = 3) {
    const formattedValue = parseFloat(value.toFixed(precision));
    return `${formattedValue} ${unit}`;
  }

  /**
   * Convert engineering units commonly used in Malaysian construction
   */
  convertMalaysianUnits(value, fromUnit, toUnit) {
    // Common Malaysian construction unit conversions
    const malaysianConversions = {
      // Length
      'kaki': { type: 'length', unit: 'ft' },
      'inci': { type: 'length', unit: 'in' },
      'meter': { type: 'length', unit: 'm' },
      
      // Area
      'kaki persegi': { type: 'area', unit: 'ft²' },
      'meter persegi': { type: 'area', unit: 'm²' },
      
      // Force
      'tan': { type: 'force', unit: 'tf' },
      'kilogram': { type: 'force', unit: 'N', factor: 9.80665 },
      
      // Pressure
      'kg/cm²': { type: 'pressure', unit: 'Pa', factor: 98066.5 },
      'psi': { type: 'pressure', unit: 'psi' }
    };

    // Handle Malaysian unit names
    const fromConversion = malaysianConversions[fromUnit];
    const toConversion = malaysianConversions[toUnit];

    if (fromConversion && toConversion) {
      if (fromConversion.type !== toConversion.type) {
        throw new Error('Cannot convert between different unit types');
      }

      // Use standard conversion if available
      if (fromConversion.unit && toConversion.unit) {
        return this.convert(value, fromConversion.unit, toConversion.unit, fromConversion.type);
      }

      // Use custom factor if specified
      if (fromConversion.factor && toConversion.factor) {
        return value * fromConversion.factor / toConversion.factor;
      }
    }

    // Fall back to standard conversion
    const type = this.detectUnitType(fromUnit, toUnit);
    return this.convert(value, fromUnit, toUnit, type);
  }

  /**
   * Detect unit type from unit names
   */
  detectUnitType(fromUnit, toUnit) {
    for (const [type, units] of Object.entries(this.conversions)) {
      if (units[fromUnit] !== undefined && units[toUnit] !== undefined) {
        return type;
      }
    }
    throw new Error(`Cannot detect unit type for ${fromUnit} to ${toUnit}`);
  }

  /**
   * Convert between metric and imperial systems
   */
  convertToMetric(value, imperialUnit) {
    const imperialToMetric = {
      // Length
      'in': { value: value * 0.0254, unit: 'm' },
      'ft': { value: value * 0.3048, unit: 'm' },
      'yd': { value: value * 0.9144, unit: 'm' },
      
      // Area
      'in²': { value: value * 0.00064516, unit: 'm²' },
      'ft²': { value: value * 0.092903, unit: 'm²' },
      
      // Force
      'lbf': { value: value * 4.44822, unit: 'N' },
      'kip': { value: value * 4448.22, unit: 'N' },
      
      // Pressure
      'psi': { value: value * 6894.76, unit: 'Pa' },
      'ksi': { value: value * 6894760, unit: 'Pa' }
    };

    return imperialToMetric[imperialUnit] || { value: value, unit: imperialUnit };
  }

  /**
   * Convert from metric to imperial
   */
  convertToImperial(value, metricUnit) {
    const metricToImperial = {
      // Length
      'm': { value: value * 3.28084, unit: 'ft' },
      'mm': { value: value * 0.0393701, unit: 'in' },
      
      // Area
      'm²': { value: value * 10.7639, unit: 'ft²' },
      
      // Force
      'N': { value: value * 0.224809, unit: 'lbf' },
      'kN': { value: value * 224.809, unit: 'lbf' },
      
      // Pressure
      'Pa': { value: value * 0.000145038, unit: 'psi' },
      'MPa': { value: value * 145.038, unit: 'psi' }
    };

    return metricToImperial[metricUnit] || { value: value, unit: metricUnit };
  }

  /**
   * Create conversion table for reference
   */
  createConversionTable(type, baseValue = 1) {
    if (!this.conversions[type]) {
      throw new Error(`Unit type '${type}' not supported`);
    }

    const table = {};
    const units = this.conversions[type];
    
    for (const [unit, factor] of Object.entries(units)) {
      if (type === 'temperature') {
        // Special handling for temperature
        table[unit] = this.convertTemperature(baseValue, 'C', unit);
      } else {
        table[unit] = this.roundToSignificantFigures(baseValue / factor, 6);
      }
    }

    return table;
  }
}

export default UnitConverter;
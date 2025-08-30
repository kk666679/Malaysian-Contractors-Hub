const civilEngineeringService = require('../services/civilEngineeringService');

describe('Civil Engineering Service', () => {
  describe('Structural Capacity Calculations', () => {
    test('should calculate beam capacity for concrete', () => {
      const result = civilEngineeringService.calculateStructuralCapacity(
        'beam',
        'concrete',
        { width: 300, height: 600, length: 8000, cover: 30 },
        { deadLoad: 20, liveLoad: 15, windLoad: 5 }
      );

      expect(result).toHaveProperty('momentCapacity');
      expect(result).toHaveProperty('shearCapacity');
      expect(result).toHaveProperty('deflection');
      expect(result).toHaveProperty('safetyFactor');
      expect(result).toHaveProperty('compliance');
    });

    test('should calculate column capacity for steel', () => {
      const result = civilEngineeringService.calculateStructuralCapacity(
        'column',
        'steel',
        { width: 300, height: 300, length: 4000 },
        { deadLoad: 500, liveLoad: 300 }
      );

      expect(result).toHaveProperty('axialCapacity');
      expect(result).toHaveProperty('bucklingCapacity');
      expect(result).toHaveProperty('slendernessRatio');
      expect(result.compliance.compliant).toBeDefined();
    });

    test('should throw error for unsupported structure type', () => {
      expect(() => {
        civilEngineeringService.calculateStructuralCapacity(
          'unsupported',
          'concrete',
          { width: 300, height: 600 },
          { deadLoad: 20, liveLoad: 15 }
        );
      }).toThrow('Unsupported structure type');
    });
  });

  describe('Compliance Checking', () => {
    test('should check compliance for beam design', () => {
      const capacity = {
        momentCapacity: '245 kNm',
        shearCapacity: '180 kN',
        deflection: '0.002 m (L/363)'
      };

      const compliance = civilEngineeringService.checkCompliance(
        'beam',
        'concrete',
        capacity,
        { width: 300, height: 600, cover: 25 }
      );

      expect(compliance).toHaveProperty('compliant');
      expect(compliance).toHaveProperty('issues');
      expect(compliance).toHaveProperty('recommendations');
      expect(compliance).toHaveProperty('standards');
    });

    test('should detect non-compliance for insufficient concrete cover', () => {
      const capacity = {
        momentCapacity: '245 kNm',
        shearCapacity: '180 kN',
        deflection: '0.002 m (L/363)'
      };

      const compliance = civilEngineeringService.checkCompliance(
        'beam',
        'concrete',
        capacity,
        { width: 300, height: 600, cover: 15 } // Less than minimum 25mm
      );

      expect(compliance.compliant).toBe(false);
      expect(compliance.issues).toContain('Concrete cover less than minimum required (25mm)');
    });
  });

  describe('Malaysian Standards', () => {
    test('should return all Malaysian standards', () => {
      const standards = civilEngineeringService.getMalaysianStandards();
      
      expect(standards).toHaveProperty('MS 1183:2015');
      expect(standards).toHaveProperty('UBBL 1984');
      expect(standards).toHaveProperty('MS 1553:2018');
    });

    test('should return specific standard requirements', () => {
      const requirements = civilEngineeringService.getStandardRequirements('MS 1183:2015');
      
      expect(requirements).toHaveProperty('title');
      expect(requirements).toHaveProperty('requirements');
      expect(requirements.title).toBe('Fire precautions in the design and construction of buildings');
    });

    test('should return null for non-existent standard', () => {
      const requirements = civilEngineeringService.getStandardRequirements('NON_EXISTENT');
      expect(requirements).toBeNull();
    });
  });

  describe('Deflection Checking', () => {
    test('should detect excessive deflection', () => {
      const isExcessive = civilEngineeringService.isDeflectionExcessive(0.003, 'L/360');
      expect(isExcessive).toBe(true);
    });

    test('should accept acceptable deflection', () => {
      const isExcessive = civilEngineeringService.isDeflectionExcessive(0.002, 'L/360');
      expect(isExcessive).toBe(false);
    });
  });
});

const civilEngineeringService = require('../services/civilEngineeringService');

describe('Civil Engineering Service - Edge Cases', () => {
  describe('Structural Capacity Calculations', () => {
    it('should handle extreme load values', () => {
      const capacity = civilEngineeringService.calculateStructuralCapacity(
        'beam',
        'concrete',
        { width: 300, height: 600, length: 8000, cover: 30 },
        { deadLoad: 1000, liveLoad: 500, windLoad: 200 }
      );
      
      expect(capacity).toHaveProperty('momentCapacity');
      expect(capacity).toHaveProperty('shearCapacity');
      expect(capacity.momentCapacity).toMatch(/kNm/);
    });

    it('should handle very small dimensions', () => {
      const capacity = civilEngineeringService.calculateStructuralCapacity(
        'beam',
        'concrete',
        { width: 100, height: 200, length: 3000, cover: 20 },
        { deadLoad: 5, liveLoad: 3, windLoad: 1 }
      );
      
      expect(capacity).toHaveProperty('momentCapacity');
      expect(capacity.momentCapacity).toMatch(/kNm/);
    });

    it('should handle invalid structure types gracefully', () => {
      expect(() => {
        civilEngineeringService.calculateStructuralCapacity(
          'invalid_type',
          'concrete',
          { width: 300, height: 600 },
          { deadLoad: 20 }
        );
      }).toThrow('Unsupported structure type: invalid_type');
    });

    it('should handle invalid material types gracefully', () => {
      expect(() => {
        civilEngineeringService.calculateStructuralCapacity(
          'beam',
          'invalid_material',
          { width: 300, height: 600 },
          { deadLoad: 20 }
        );
      }).toThrow('Unsupported material: invalid_material');
    });
  });

  describe('Compliance Checking', () => {
    it('should handle edge case deflection values', () => {
      const compliance = civilEngineeringService.checkCompliance(
        'beam',
        'concrete',
        { momentCapacity: '245 kNm', shearCapacity: '180 kN', deflection: '0.0001 m (L/80000)' },
        { width: 300, height: 600, cover: 25 }
      );
      
      expect(compliance).toHaveProperty('compliant');
      expect(compliance.compliant).toBe(true);
    });

    it('should detect multiple compliance issues', () => {
      const compliance = civilEngineeringService.checkCompliance(
        'beam',
        'concrete',
        { momentCapacity: '50 kNm', shearCapacity: '30 kN', deflection: '0.05 m (L/160)' },
        { width: 200, height: 400, cover: 10 }
      );
      
      expect(compliance.compliant).toBe(false);
      expect(compliance.issues.length).toBeGreaterThan(1);
    });

    it('should handle missing deflection data', () => {
      const compliance = civilEngineeringService.checkCompliance(
        'beam',
        'concrete',
        { momentCapacity: '245 kNm', shearCapacity: '180 kN' },
        { width: 300, height: 600, cover: 25 }
      );
      
      expect(compliance).toHaveProperty('compliant');
      expect(compliance.issues).toContain('Deflection data not provided');
    });
  });

  describe('Malaysian Standards', () => {
    it('should handle invalid standard codes', () => {
      const requirements = civilEngineeringService.getStandardRequirements('INVALID_CODE');
      expect(requirements).toBeNull();
    });

    it('should return all standards without errors', () => {
      const standards = civilEngineeringService.getMalaysianStandards();
      expect(Object.keys(standards).length).toBeGreaterThan(0);
      expect(standards).toHaveProperty('MS 1183:2015');
    });
  });

  describe('Performance Testing', () => {
    it('should handle multiple rapid calculations efficiently', () => {
      const startTime = Date.now();
      
      // Perform 100 calculations
      for (let i = 0; i < 100; i++) {
        civilEngineeringService.calculateStructuralCapacity(
          'beam',
          'concrete',
          { width: 300, height: 600, length: 8000, cover: 30 },
          { deadLoad: 20 + i, liveLoad: 15, windLoad: 5 }
        );
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete 100 calculations in under 1 second
      expect(duration).toBeLessThan(1000);
    });
  });
});

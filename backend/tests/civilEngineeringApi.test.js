const request = require('supertest');
const express = require('express');
const civilEngineeringRoutes = require('../routes/civilEngineering');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/civil-engineering', civilEngineeringRoutes);

describe('Civil Engineering API Endpoints', () => {
  describe('POST /civil-engineering/calculate-capacity', () => {
    it('should calculate structural capacity for a beam', async () => {
      const response = await request(app)
        .post('/civil-engineering/calculate-capacity')
        .send({
          structureType: 'beam',
          material: 'concrete',
          dimensions: { width: 300, height: 600, length: 8000, cover: 30 },
          loads: { deadLoad: 20, liveLoad: 15, windLoad: 5 }
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('momentCapacity');
      expect(response.body.data).toHaveProperty('shearCapacity');
      expect(response.body.data).toHaveProperty('deflection');
    });

    it('should return 400 for missing parameters', async () => {
      const response = await request(app)
        .post('/civil-engineering/calculate-capacity')
        .send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /civil-engineering/standards', () => {
    it('should return all Malaysian standards', async () => {
      const response = await request(app).get('/civil-engineering/standards');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('MS 1183:2015');
    });
  });

  describe('GET /civil-engineering/standards/:standardCode', () => {
    it('should return specific standard requirements', async () => {
      const response = await request(app).get('/civil-engineering/standards/MS 1183:2015');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('title');
    });

    it('should return 404 for non-existent standard', async () => {
      const response = await request(app).get('/civil-engineering/standards/UNKNOWN');
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /civil-engineering/check-compliance', () => {
    it('should check design compliance', async () => {
      const response = await request(app)
        .post('/civil-engineering/check-compliance')
        .send({
          structureType: 'beam',
          material: 'concrete',
          designData: {
            capacity: {
              momentCapacity: '245 kNm',
              shearCapacity: '180 kN',
              deflection: '0.002 m (L/363)'
            },
            dimensions: { width: 300, height: 600, cover: 25 }
          }
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('compliant');
    });

    it('should return 400 for missing parameters', async () => {
      const response = await request(app)
        .post('/civil-engineering/check-compliance')
        .send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /civil-engineering/generate-report', () => {
    it('should generate a design report', async () => {
      const response = await request(app)
        .post('/civil-engineering/generate-report')
        .send({
          projectData: { projectName: 'Test Project' },
          designData: { capacity: { momentCapacity: '245 kNm' } },
          complianceResults: { compliant: true, issues: [], recommendations: [] }
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('reportId');
      expect(response.body.data).toHaveProperty('summary');
    });

    it('should return 400 for missing parameters', async () => {
      const response = await request(app)
        .post('/civil-engineering/generate-report')
        .send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});

const BASE_URL = 'http://localhost:5000/api';

// Test configuration
const testUsers = {
  admin: { email: 'admin@contractorshub.com', name: 'Admin User', password: 'admin123', role: 'ADMIN' },
  contractor: { email: 'contractor@contractorshub.com', name: 'Contractor User', password: 'contractor123', role: 'CONTRACTOR' },
  client: { email: 'client@contractorshub.com', name: 'Client User', password: 'client123', role: 'CLIENT' }
};

let tokens = {};
let userIds = {};

class APITester {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async makeRequest(method, endpoint, data = null, token = null) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const responseData = await response.json().catch(() => ({}));

    return {
      status: response.status,
      data: responseData,
      ok: response.ok
    };
  }

  async testAuthEndpoints() {
    console.log('\n=== TESTING AUTH ENDPOINTS ===');

    try {
      // Test user registration
      console.log('\n1. Testing User Registration...');
      for (const [key, user] of Object.entries(testUsers)) {
        try {
          const response = await this.makeRequest('POST', '/auth/register', user);
          if (response.ok) {
            console.log(`✅ ${key.toUpperCase()} Registration:`, response.data.message);
            if (response.data.data?.token) {
              tokens[key] = response.data.data.token;
              userIds[key] = response.data.data.user.id;
            }
          } else {
            if (response.status === 409) {
              console.log(`ℹ️  ${key.toUpperCase()} already exists, attempting login...`);
              // Try login instead
              const loginResponse = await this.makeRequest('POST', '/auth/login', { email: user.email, password: user.password });
              if (loginResponse.ok) {
                console.log(`✅ ${key.toUpperCase()} Login:`, loginResponse.data.message);
                tokens[key] = loginResponse.data.data.token;
                userIds[key] = loginResponse.data.data.user.id;
              } else {
                console.log(`❌ ${key.toUpperCase()} Login failed:`, loginResponse.data.message);
              }
            } else {
              console.log(`❌ ${key.toUpperCase()} Registration failed:`, response.data.message);
            }
          }
        } catch (error) {
          console.log(`❌ ${key.toUpperCase()} Registration error:`, error.message);
        }
      }

      // Test login for existing users
      console.log('\n2. Testing User Login...');
      for (const [key, user] of Object.entries(testUsers)) {
        try {
          const response = await this.makeRequest('POST', '/auth/login', { email: user.email });
          if (response.ok) {
            console.log(`✅ ${key.toUpperCase()} Login:`, response.data.message);
            tokens[key] = response.data.data.token;
          } else {
            console.log(`❌ ${key.toUpperCase()} Login failed:`, response.data.message);
          }
        } catch (error) {
          console.log(`❌ ${key.toUpperCase()} Login error:`, error.message);
        }
      }

      // Test profile access
      console.log('\n3. Testing Profile Access...');
      for (const [key, token] of Object.entries(tokens)) {
        try {
          const response = await this.makeRequest('GET', '/auth/profile', null, token);
          if (response.ok) {
            console.log(`✅ ${key.toUpperCase()} Profile:`, response.data.data.user.name);
          } else {
            console.log(`❌ ${key.toUpperCase()} Profile access failed:`, response.data.message);
          }
        } catch (error) {
          console.log(`❌ ${key.toUpperCase()} Profile access error:`, error.message);
        }
      }

      // Test admin endpoints
      console.log('\n4. Testing Admin Endpoints...');
      if (tokens.admin) {
        try {
          const response = await this.makeRequest('GET', '/auth/users', null, tokens.admin);
          if (response.ok) {
            console.log(`✅ Admin Users List: Found ${response.data.data.total} users`);
          } else {
            console.log(`❌ Admin Users List failed:`, response.data.message);
          }
        } catch (error) {
          console.log(`❌ Admin Users List error:`, error.message);
        }
      }

    } catch (error) {
      console.log('❌ Auth endpoints test failed:', error.message);
    }
  }

  async testCivilEngineeringEndpoints() {
    console.log('\n=== TESTING CIVIL ENGINEERING ENDPOINTS ===');

    try {
      // Test standards endpoint
      console.log('\n1. Testing Civil Engineering Standards...');
      const response = await this.makeRequest('GET', '/civil-engineering/standards');
      if (response.ok) {
        console.log(`✅ Civil Standards: Found ${response.data.length} standards`);
      } else {
        console.log(`❌ Civil Standards failed:`, response.data.message);
      }

      // Test capacity calculation
      console.log('\n2. Testing Capacity Calculation...');
      const capacityData = {
        structureType: 'beam',
        material: 'concrete',
        dimensions: { length: 5, width: 0.3, height: 0.3, cover: 30 },
        loads: { deadLoad: 10, liveLoad: 5, windLoad: 2 }
      };
      const capacityResponse = await this.makeRequest('POST', '/civil-engineering/calculate-capacity', capacityData);
      if (capacityResponse.ok) {
        console.log(`✅ Capacity Calculation:`, capacityResponse.data);
      } else {
        console.log(`❌ Capacity Calculation failed:`, capacityResponse.data.message);
      }

      // Test compliance check
      console.log('\n3. Testing Compliance Check...');
      const complianceData = {
        structureType: 'beam',
        material: 'concrete',
        dimensions: { length: 6, width: 0.3, height: 0.4, cover: 30 },
        loads: { deadLoad: 15, liveLoad: 10, windLoad: 3 }
      };
      const complianceResponse = await this.makeRequest('POST', '/civil-engineering/check-compliance', complianceData);
      if (complianceResponse.ok) {
        console.log(`✅ Compliance Check:`, complianceResponse.data);
      } else {
        console.log(`❌ Compliance Check failed:`, complianceResponse.data.message);
      }

    } catch (error) {
      console.log('❌ Civil Engineering endpoints test failed:', error.message);
    }
  }

  async testElectricalSystemsEndpoints() {
    console.log('\n=== TESTING ELECTRICAL SYSTEMS ENDPOINTS ===');

    try {
      // Test standards endpoint
      console.log('\n1. Testing Electrical Standards...');
      const response = await this.makeRequest('GET', '/electrical-systems/standards');
      if (response.ok) {
        console.log(`✅ Electrical Standards: Found ${response.data.length} standards`);
      } else {
        console.log(`❌ Electrical Standards failed:`, response.data.message);
      }

      // Test voltage drop calculation
      console.log('\n2. Testing Voltage Drop Calculation...');
      const voltageData = {
        voltage: 400,
        current: 50,
        cableSize: '10',
        cableType: 'copper',
        length: 100
      };
      const voltageResponse = await this.makeRequest('POST', '/electrical-systems/voltage-drop', voltageData);
      if (voltageResponse.ok) {
        console.log(`✅ Voltage Drop:`, voltageResponse.data);
      } else {
        console.log(`❌ Voltage Drop failed:`, voltageResponse.data.message);
      }

      // Test cable sizing
      console.log('\n3. Testing Cable Sizing...');
      const cableData = {
        current: 75,
        voltage: 400,
        length: 150,
        installationMethod: 'cable_tray',
        ambientTemp: 35
      };
      const cableResponse = await this.makeRequest('POST', '/electrical-systems/cable-sizing', cableData);
      if (cableResponse.ok) {
        console.log(`✅ Cable Sizing:`, cableResponse.data);
      } else {
        console.log(`❌ Cable Sizing failed:`, cableResponse.data.message);
      }

      // Test transformer sizing
      console.log('\n4. Testing Transformer Sizing...');
      const transformerData = {
        totalLoad: 150,
        voltage: 400,
        powerFactor: 0.85,
        efficiency: 0.95
      };
      const transformerResponse = await this.makeRequest('POST', '/electrical-systems/transformer-sizing', transformerData);
      if (transformerResponse.ok) {
        console.log(`✅ Transformer Sizing:`, transformerResponse.data);
      } else {
        console.log(`❌ Transformer Sizing failed:`, transformerResponse.data.message);
      }

      // Test compliance check
      console.log('\n5. Testing Electrical Compliance...');
      const complianceData = {
        systemType: 'distribution',
        specifications: {
          voltage: 400,
          current: 100,
          protection: 'MCB'
        }
      };
      const complianceResponse = await this.makeRequest('POST', '/electrical-systems/check-compliance', complianceData);
      if (complianceResponse.ok) {
        console.log(`✅ Electrical Compliance:`, complianceResponse.data);
      } else {
        console.log(`❌ Electrical Compliance failed:`, complianceResponse.data.message);
      }

    } catch (error) {
      console.log('❌ Electrical Systems endpoints test failed:', error.message);
    }
  }

  async testWeatherEndpoints() {
    console.log('\n=== TESTING WEATHER ENDPOINTS ===');

    try {
      // Test all weather data
      console.log('\n1. Testing Weather Data...');
      const response = await this.makeRequest('GET', '/weather');
      if (response.ok) {
        console.log(`✅ Weather Data: Found ${Object.keys(response.data).length} regions`);
      } else {
        console.log(`❌ Weather Data failed:`, response.data.message);
      }

      // Test specific region
      console.log('\n2. Testing Region Weather...');
      const regionResponse = await this.makeRequest('GET', '/weather/kuala-lumpur');
      if (regionResponse.ok) {
        console.log(`✅ Kuala Lumpur Weather:`, regionResponse.data);
      } else {
        console.log(`❌ Kuala Lumpur Weather failed:`, regionResponse.data.message);
      }

      // Test monsoon forecast
      console.log('\n3. Testing Monsoon Forecast...');
      const monsoonResponse = await this.makeRequest('GET', '/weather/monsoon/forecast');
      if (monsoonResponse.ok) {
        console.log(`✅ Monsoon Forecast:`, monsoonResponse.data);
      } else {
        console.log(`❌ Monsoon Forecast failed:`, monsoonResponse.data.message);
      }

    } catch (error) {
      console.log('❌ Weather endpoints test failed:', error.message);
    }
  }

  async testProtectedRoutes() {
    console.log('\n=== TESTING PROTECTED ROUTES ===');

    // Test without authentication
    console.log('\n1. Testing Unauthenticated Access...');
    try {
      const response = await this.makeRequest('GET', '/auth/profile');
      if (response.status === 401) {
        console.log('✅ Correctly blocked unauthenticated access');
      } else {
        console.log('❌ Should have failed without authentication');
      }
    } catch (error) {
      console.log('❌ Unauthenticated access test error:', error.message);
    }

    // Test with invalid token
    console.log('\n2. Testing Invalid Token...');
    try {
      const response = await this.makeRequest('GET', '/auth/profile', null, 'invalid-token');
      if (response.status === 401) {
        console.log('✅ Correctly rejected invalid token');
      } else {
        console.log('❌ Should have failed with invalid token');
      }
    } catch (error) {
      console.log('❌ Invalid token test error:', error.message);
    }
  }

  async runAllTests() {
    console.log('🚀 Starting Malaysian Contractors Hub API Testing Suite');
    console.log('=' .repeat(60));

    await this.testAuthEndpoints();
    await this.testCivilEngineeringEndpoints();
    await this.testElectricalSystemsEndpoints();
    await this.testWeatherEndpoints();
    await this.testProtectedRoutes();

    console.log('\n' + '=' .repeat(60));
    console.log('✅ API Testing Suite Complete');
    console.log('=' .repeat(60));
  }
}

// Run the tests
const tester = new APITester();
tester.runAllTests().catch(console.error);

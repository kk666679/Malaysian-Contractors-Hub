# MC-Hub Engineering Services

## Overview

The MC-Hub Engineering Services is a comprehensive backend system designed specifically for Malaysian contractors, providing integrated tools for managing construction projects across multiple engineering disciplines. This system reflects real-world engineering logic and complies with Malaysian and international standards.

## Architecture

```
backend/services/engineering/
├── index.js                    # Main engineering services entry point
├── api/
│   └── routes.js              # RESTful API endpoints
├── civil/                     # Civil Engineering Module
│   ├── index.js              # Civil engineering main class
│   ├── structural.js         # Structural calculations
│   ├── foundation.js         # Foundation engineering
│   ├── concrete.js           # Concrete design
│   ├── steel.js              # Steel design
│   └── loads.js              # Load calculations
├── electrical/               # Electrical Systems (stub)
├── hvac/                     # HVAC Engineering (stub)
├── sewerage/                 # Sewerage Engineering (stub)
├── elv/                      # ELV Systems (stub)
├── standards/                # Standards Compliance
│   ├── malaysian.js          # Malaysian standards
│   ├── iso.js                # ISO standards
│   └── safety.js             # Safety compliance
├── utils/                    # Utilities
│   ├── unitConverter.js      # Unit conversions
│   ├── loadCalculator.js     # Load calculations
│   ├── safetyChecker.js      # Safety validation
│   └── materialDatabase.js   # Material properties
├── gcms/                     # GCMS Integration
│   └── integration.js        # Project management integration
└── README.md                 # This file
```

## Features

### ✅ Implemented Features

#### Civil Engineering Module
- **Structural Calculations**
  - Beam analysis (simply supported)
  - Column design (reinforced concrete)
  - Load combinations per BS EN 1990
  - Real-world engineering formulas

- **Foundation Engineering**
  - Bearing capacity calculations
  - Settlement estimation
  - Malaysian soil conditions
  - Pile foundation design

- **Concrete Design**
  - Mix design per MS 522:2007
  - Reinforcement calculations
  - Durability requirements
  - Cost estimation

- **Steel Design**
  - Beam design per MS 1462:2009
  - Connection design
  - Column design
  - Buckling analysis

- **Load Calculations**
  - Dead load calculations
  - Live load calculations
  - Wind loads (Malaysian conditions)
  - Seismic loads (low seismic zone)
  - Load combinations

#### Standards Compliance
- **Malaysian Standards**
  - MS 76:2005 (Concrete structures)
  - MS 1462:2009 (Steel structures)
  - MS 1553:2002 (Wind loading)
  - MS 1194:2015 (Soil investigation)
  - UBBL 1984 (Building by-laws)

- **ISO Standards**
  - ISO 9001:2015 (Quality management)
  - ISO 14001:2015 (Environmental management)
  - ISO 45001:2018 (Safety management)
  - ISO 19650:2018 (BIM)

- **Safety Compliance**
  - OSHA 1994 (Malaysian safety act)
  - CIDB regulations
  - NIOSH guidelines
  - DOSH requirements

#### Utilities
- **Unit Converter**
  - Comprehensive unit conversions
  - Malaysian unit support
  - Metric/Imperial conversions
  - Temperature conversions

- **Load Calculator**
  - Standard load values
  - Wind load calculations
  - Seismic load calculations
  - Load combinations

- **Safety Checker**
  - Structural safety validation
  - Construction safety requirements
  - Environmental safety assessment
  - Emergency preparedness

- **Material Database**
  - Malaysian construction materials
  - Material properties
  - Cost estimation
  - Sustainable alternatives

#### GCMS Integration
- Project creation from calculations
- Calculation result storage
- Compliance tracking
- Resource allocation
- Progress monitoring
- Document management

### 🚧 Stub Implementations (Ready for Extension)

- **Electrical Systems**: Voltage drop, cable sizing, load calculations
- **HVAC Engineering**: Cooling loads, duct sizing, ventilation rates
- **Sewerage Engineering**: Pipe sizing, flow calculations, rainfall analysis
- **ELV Systems**: Cable sizing, power budget, coverage analysis

## API Endpoints

### Core Engineering Services

```
GET    /api/engineering/modules
GET    /api/engineering/:module/calculations
POST   /api/engineering/:module/calculate/:type
```

### Civil Engineering Calculations

```
POST   /api/engineering/civil/beam-analysis
POST   /api/engineering/civil/column-design
POST   /api/engineering/civil/foundation-bearing
POST   /api/engineering/civil/concrete-mix
POST   /api/engineering/civil/steel-connection
POST   /api/engineering/civil/load-combination
```

### Utilities

```
POST   /api/engineering/utils/convert
GET    /api/engineering/utils/units/:type
POST   /api/engineering/loads/calculate
GET    /api/engineering/loads/standards
```

### Standards and Compliance

```
GET    /api/engineering/standards/:country
POST   /api/engineering/compliance/check
```

### Information

```
GET    /api/engineering/info
```

## Usage Examples

### Beam Analysis

```javascript
POST /api/engineering/civil/beam-analysis
{
  "inputs": {
    "length": 6.0,
    "load": 25.0,
    "width": 300,
    "height": 500,
    "material": "concrete"
  },
  "options": {
    "checkCompliance": true
  }
}
```

### Foundation Bearing Capacity

```javascript
POST /api/engineering/civil/foundation-bearing
{
  "inputs": {
    "width": 2.0,
    "length": 3.0,
    "depth": 1.5,
    "soilType": "clay-stiff",
    "appliedLoad": 1000
  }
}
```

### Unit Conversion

```javascript
POST /api/engineering/utils/convert
{
  "value": 100,
  "fromUnit": "kN",
  "toUnit": "lbf",
  "type": "force"
}
```

### Load Calculation

```javascript
POST /api/engineering/loads/calculate
{
  "loadType": "wind",
  "inputs": {
    "buildingHeight": 20,
    "buildingWidth": 15,
    "buildingLength": 30,
    "location": "kuala-lumpur"
  }
}
```

## Standards Compliance

### Malaysian Standards
- **MS 76:2005**: Code of practice for structural use of concrete
- **MS 1462:2009**: Code of practice for structural use of steel
- **MS 1553:2002**: Code of practice for wind loading
- **MS 1194:2015**: Code of practice for soil investigation
- **MS 522:2007**: Specification for Portland cement
- **UBBL 1984**: Uniform Building By-Laws 1984

### International Standards
- **ISO 9001:2015**: Quality management systems
- **ISO 14001:2015**: Environmental management systems
- **ISO 45001:2018**: Occupational health and safety management
- **ISO 19650:2018**: Information management using BIM

### Safety Regulations
- **OSHA 1994**: Occupational Safety and Health Act 1994 (Malaysia)
- **CIDB**: Construction Industry Development Board regulations
- **NIOSH**: National Institute of Occupational Safety and Health guidelines
- **DOSH**: Department of Occupational Safety and Health requirements

## Installation and Setup

### Prerequisites
- Node.js 20+
- Express.js
- Authentication middleware
- Validation middleware

### Installation

1. The engineering services are already integrated into the MC-Hub backend
2. Import and use the services:

```javascript
import EngineeringServices from './services/engineering/index.js';

const engineeringServices = new EngineeringServices();
const result = await engineeringServices.performCalculation(
  'civil', 
  'beam-analysis', 
  inputs, 
  options
);
```

### Configuration

The services are configured to work with:
- Malaysian building codes and standards
- Tropical climate conditions
- Local material properties
- Malaysian construction practices

## Authentication and Authorization

All calculation endpoints require authentication:
- JWT token in Authorization header
- Role-based access control
- User context in calculation options

## Error Handling

The system provides comprehensive error handling:
- Input validation errors
- Calculation errors
- Compliance check failures
- Safety validation warnings

## Testing

### Manual Testing
Use the provided API endpoints with sample data to test calculations.

### Automated Testing
Test files are prepared for:
- Calculation accuracy
- Standards compliance
- Input validation
- Error handling

## Future Enhancements

### Phase 1 (Immediate)
- Complete electrical systems calculations
- Implement HVAC load calculations
- Add sewerage pipe sizing
- Enhance ELV system design

### Phase 2 (Short-term)
- Real-time collaboration features
- Mobile app integration
- Advanced analytics
- AI-powered recommendations

### Phase 3 (Long-term)
- Machine learning optimization
- IoT sensor integration
- Blockchain compliance tracking
- AR/VR visualization

## Contributing

### Code Standards
- Follow existing code structure
- Include comprehensive JSDoc documentation
- Implement proper error handling
- Add input validation
- Include unit tests

### Adding New Calculations
1. Create calculation method in appropriate module
2. Add validation logic
3. Include standards compliance checks
4. Update API routes
5. Add documentation

### Adding New Standards
1. Create standards module
2. Implement compliance checks
3. Add to main standards checker
4. Update documentation

## Support and Documentation

### Technical Support
- Review calculation formulas and standards
- Check input validation requirements
- Verify compliance with Malaysian standards
- Ensure proper error handling

### Documentation
- API endpoint documentation
- Calculation methodology
- Standards compliance requirements
- Usage examples

## License

This engineering services module is part of the MC-Hub platform and follows the same MIT license terms.

## Changelog

### Version 1.0.0 (Current)
- ✅ Complete civil engineering calculations
- ✅ Malaysian standards compliance
- ✅ ISO standards integration
- ✅ Safety compliance checks
- ✅ Comprehensive utilities
- ✅ GCMS integration
- ✅ RESTful API endpoints
- 🚧 Other engineering modules (stubs)

### Planned Updates
- Complete implementation of all engineering modules
- Enhanced real-time collaboration
- Advanced analytics and reporting
- Mobile app integration
- AI-powered optimization

---

**Note**: This is a comprehensive engineering services system designed specifically for Malaysian contractors. All calculations follow established engineering principles and comply with Malaysian building codes and international standards.
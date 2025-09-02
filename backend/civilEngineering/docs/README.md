# Civil Engineering Calculations Module

This module provides a comprehensive set of civil engineering calculations and material properties for structural analysis and design. The module is built with real-world engineering principles and follows international standards.

## Module Structure

```
civilEngineering/
├── calculations/          # Core calculation functions
│   └── beamCalculations.js
├── materials/            # Material properties and data
│   └── concrete.js
├── utils/               # Helper functions and utilities
│   └── formulas.js
├── validation/          # Input validation functions
│   └── inputValidation.js
├── api/                 # REST API endpoints
│   └── civilEngineeringRoutes.js
└── docs/               # Documentation
    └── README.md
```

## Available Calculations

### Beam Calculations

#### Maximum Bending Moment (Simply Supported, Uniform Load)
**Formula:** `M_max = (w × L²) / 8`

**Parameters:**
- `w`: Uniform load (N/mm)
- `L`: Span length (mm)

**Returns:** Maximum bending moment (N·mm)

#### Maximum Shear Force (Simply Supported, Uniform Load)
**Formula:** `V_max = w × L / 2`

**Parameters:**
- `w`: Uniform load (N/mm)
- `L`: Span length (mm)

**Returns:** Maximum shear force (N)

#### Maximum Deflection (Simply Supported, Uniform Load)
**Formula:** `δ_max = (5 × w × L⁴) / (384 × E × I)`

**Parameters:**
- `w`: Uniform load (N/mm)
- `L`: Span length (mm)
- `E`: Modulus of elasticity (MPa)
- `I`: Moment of inertia (mm⁴)

**Returns:** Maximum deflection (mm)

#### Section Modulus (Rectangular Section)
**Formula:** `Z = (b × h²) / 6`

**Parameters:**
- `b`: Width (mm)
- `h`: Height (mm)

**Returns:** Section modulus (mm³)

### Concrete Material Properties

#### Strength Classes
The module supports standard concrete strength classes according to BS EN 1992-1-1:

- C12/15, C16/20, C20/25, C25/30, C30/37, C35/45
- C40/50, C45/55, C50/60, C55/67, C60/75
- C70/85, C80/95, C90/105

#### Modulus of Elasticity
**Formula:** `E_cm = 22 × (f_cm / 10)^0.3 × 1000`

**Parameters:**
- `f_cm`: Mean compressive strength (MPa)

**Returns:** Modulus of elasticity (MPa)

#### Design Strengths
**Compressive:** `f_cd = α_cc × f_ck / γ_c`
**Tensile:** `f_ctd = α_ct × f_ctk,0.05 / γ_c`

## API Endpoints

### Beam Calculations

#### POST `/api/civil-engineering/beam/bending-moment`
Calculate maximum bending moment for simply supported beam.

**Request Body:**
```json
{
  "load": 10,
  "span": 5000
}
```

**Response:**
```json
{
  "success": true,
  "calculation": "Maximum Bending Moment",
  "formula": "M_max = (w × L²) / 8",
  "inputs": {
    "load": "10 N/mm",
    "span": "5000 mm"
  },
  "result": "125000000 N·mm",
  "result_kNm": "125 kN·m"
}
```

#### POST `/api/civil-engineering/beam/shear-force`
Calculate maximum shear force for simply supported beam.

#### POST `/api/civil-engineering/beam/deflection`
Calculate maximum deflection for simply supported beam.

### Concrete Properties

#### POST `/api/civil-engineering/concrete/properties`
Get concrete properties for a strength class.

**Request Body:**
```json
{
  "strengthClass": "C25/30"
}
```

**Response:**
```json
{
  "success": true,
  "strengthClass": "C25/30",
  "properties": {
    "characteristicStrength": "25 MPa",
    "meanStrength": "33 MPa",
    "meanTensileStrength": "2.6 MPa",
    "modulusOfElasticity": "30940 MPa",
    "density": "2400 kg/m³"
  }
}
```

#### POST `/api/civil-engineering/concrete/design-strength`
Calculate design compressive and tensile strengths.

### Utility Functions

#### Unit Conversions
- `metersToMillimeters(meters)`: Convert meters to millimeters
- `millimetersToMeters(millimeters)`: Convert millimeters to meters
- `kiloNewtonsToNewtons(kN)`: Convert kiloNewtons to Newtons
- `newtonsToKiloNewtons(N)`: Convert Newtons to kiloNewtons

#### Rounding
- `roundToDecimals(value, decimals)`: Round number to specified decimal places

## Input Validation

The module includes comprehensive input validation to ensure:

- All inputs are valid numbers
- Values are within realistic engineering ranges
- Units are appropriate for calculations
- Material properties are within expected bounds

### Validation Functions

- `validateBeamDimensions(length, width, height)`
- `validateLoad(load, loadType)`
- `validateMaterialProperties(E, fy, materialType)`
- `validateConcreteStrengthClass(strengthClass)`

## Usage Examples

### JavaScript Import
```javascript
import {
  calculateMaxBendingMomentUniformLoad,
  getConcreteProperties
} from './civilEngineering/calculations/beamCalculations.js';

import {
  getConcreteProperties
} from './civilEngineering/materials/concrete.js';
```

### Basic Calculation
```javascript
// Calculate bending moment
const bendingMoment = calculateMaxBendingMomentUniformLoad(10, 5000);
console.log(`Maximum bending moment: ${bendingMoment} N·mm`);

// Get concrete properties
const concreteProps = getConcreteProperties('C25/30');
console.log(`Concrete strength: ${concreteProps.fck} MPa`);
```

## Standards and References

- **BS EN 1992-1-1**: Eurocode 2 - Design of concrete structures
- **BS EN 1993-1-1**: Eurocode 3 - Design of steel structures
- **ACI 318**: Building Code Requirements for Structural Concrete
- **ASCE 7**: Minimum Design Loads for Buildings and Other Structures

## Future Extensions

The module is designed for easy extension with:

- Additional beam types (cantilever, continuous)
- More load types (point loads, varying loads)
- Additional materials (steel, timber, masonry)
- Advanced calculations (buckling, vibration)
- Integration with structural analysis software

## Error Handling

All functions include proper error handling and throw descriptive error messages for:

- Invalid input types
- Values outside acceptable ranges
- Missing required parameters
- Mathematical errors (division by zero, etc.)

## Units

The module uses consistent SI units:

- **Length:** mm, m
- **Force:** N, kN
- **Stress/Strength:** MPa
- **Moment:** N·mm, kN·m
- **Density:** kg/m³

## Testing Preparation

The module structure is prepared for future unit testing with:

- Modular function design
- Predictable input/output relationships
- Comprehensive error handling
- Validation functions for test data generation

Test files can be added later in a `tests/` directory following the same structure as the main modules.

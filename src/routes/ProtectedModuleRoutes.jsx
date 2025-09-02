import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/routes/ProtectedRoute';

// Lazy load module components
const PowerGridSimulator = lazy(() => import('../modules/electrical-systems/components/PowerGridSimulator'));
const SmartComplianceEngine = lazy(() => import('../modules/electrical-systems/components/SmartComplianceEngine'));
const EnergyEfficiencyAuditor = lazy(() => import('../modules/electrical-systems/components/EnergyEfficiencyAuditor'));
const HVACDesignCalculator = lazy(() => import('../modules/acmv-hvac/components/HVACDesignCalculator'));
const PerformanceDiagnostics = lazy(() => import('../modules/acmv-hvac/components/PerformanceDiagnostics'));
const IndoorAirQualityDashboard = lazy(() => import('../modules/acmv-hvac/components/IndoorAirQualityDashboard'));
const StormwaterDesigner = lazy(() => import('../modules/sewerage-drainage/components/StormwaterDesigner'));
const FloodRiskAnalyzer = lazy(() => import('../modules/sewerage-drainage/components/FloodRiskAnalyzer'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const ProtectedModuleRoutes = () => {
  return (
    <Routes>
      {/* Electrical Systems Module - Protected Routes */}
      <Route
        path="/electrical-systems/power-grid-simulator"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingFallback />}>
              <PowerGridSimulator />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/electrical-systems/smart-compliance-engine"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingFallback />}>
              <SmartComplianceEngine />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/electrical-systems/energy-efficiency-auditor"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingFallback />}>
              <EnergyEfficiencyAuditor />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* ACMV-HVAC Module - Protected Routes */}
      <Route
        path="/acmv-hvac/hvac-design-calculator"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingFallback />}>
              <HVACDesignCalculator />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/acmv-hvac/performance-diagnostics"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingFallback />}>
              <PerformanceDiagnostics />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/acmv-hvac/indoor-air-quality-dashboard"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingFallback />}>
              <IndoorAirQualityDashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Sewerage-Drainage Module - Protected Routes */}
      <Route
        path="/sewerage-drainage/stormwater-designer"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingFallback />}>
              <StormwaterDesigner />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/sewerage-drainage/flood-risk-analyzer"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Suspense fallback={<LoadingFallback />}>
              <FloodRiskAnalyzer />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ProtectedModuleRoutes;

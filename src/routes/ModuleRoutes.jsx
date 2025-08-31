import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

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

const ModuleRoutes = () => {
  return (
    <Routes>
      {/* Electrical Systems Module */}
      <Route
        path="/electrical-systems/power-grid-simulator"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PowerGridSimulator />
          </Suspense>
        }
      />
      <Route
        path="/electrical-systems/smart-compliance-engine"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <SmartComplianceEngine />
          </Suspense>
        }
      />
      <Route
        path="/electrical-systems/energy-efficiency-auditor"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <EnergyEfficiencyAuditor />
          </Suspense>
        }
      />

      {/* ACMV-HVAC Module */}
      <Route
        path="/acmv-hvac/hvac-design-calculator"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <HVACDesignCalculator />
          </Suspense>
        }
      />
      <Route
        path="/acmv-hvac/performance-diagnostics"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PerformanceDiagnostics />
          </Suspense>
        }
      />
      <Route
        path="/acmv-hvac/indoor-air-quality-dashboard"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <IndoorAirQualityDashboard />
          </Suspense>
        }
      />

      {/* Sewerage-Drainage Module */}
      <Route
        path="/sewerage-drainage/stormwater-designer"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <StormwaterDesigner />
          </Suspense>
        }
      />
      <Route
        path="/sewerage-drainage/flood-risk-analyzer"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <FloodRiskAnalyzer />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default ModuleRoutes;

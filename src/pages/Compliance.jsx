import ComplianceChecker from '../components/compliance/ComplianceChecker';

const Compliance = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Compliance Center</h1>
        <p className="text-gray-600 mt-2">Check compliance with Malaysian building standards and regulations</p>
      </div>
      <ComplianceChecker />
    </div>
  );
};

export default Compliance;
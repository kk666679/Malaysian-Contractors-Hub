import { Button } from '../components/ui/button.jsx'
import { ArrowLeft, Building2 } from 'lucide-react'
import PageTransition from '../components/features/PageTransition.jsx'

const BuildingAutomation = () => {
  return (
    <PageTransition>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button 
              to="/features"
              variant="ghost" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Features
            </Button>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Building Automation</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Connect with building automation systems for smart building integration and management.
            </p>
          </div>
          <div className="max-w-3xl mx-auto text-left space-y-6">
            <p>
              This page provides tools and integrations to manage and monitor building automation systems,
              including HVAC, lighting, security, and energy management.
            </p>
            <p>
              Features will include real-time system status, alerts, control interfaces, and analytics dashboards.
            </p>
            <p>
              Stay tuned for upcoming updates as we build out this functionality.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default BuildingAutomation

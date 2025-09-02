import { HelpCircle, X, Search, Book, Video, MessageCircle } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

const helpContent = {
  dashboard: {
    title: 'Dashboard Help',
    content: 'The dashboard provides an overview of your projects, recent activities, and key metrics.',
    video: '/help/dashboard-tour.mp4'
  },
  projects: {
    title: 'Project Management',
    content: 'Create and manage construction projects with timeline tracking and budget monitoring.',
    video: '/help/project-management.mp4'
  },
  civil: {
    title: 'Civil Engineering Module',
    content: 'Perform structural calculations and compliance checks according to Malaysian standards.',
    video: '/help/civil-engineering.mp4'
  },
  electrical: {
    title: 'Electrical Systems',
    content: 'Calculate voltage drops, cable sizing, and ensure TNB compliance.',
    video: '/help/electrical-systems.mp4'
  }
};

export const HelpSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');

  const filteredContent = Object.entries(helpContent).filter(([key, content]) =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg"
        aria-label="Open help system"
      >
        <HelpCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Help & Support</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close help system"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-1/3 border-r p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredContent.map(([key, content]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeSection === key
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Book className="w-4 h-4" />
                    <span className="font-medium">{content.title}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open('/support', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {helpContent[activeSection] && (
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {helpContent[activeSection].title}
                </h3>
                
                <div className="prose max-w-none mb-6">
                  <p>{helpContent[activeSection].content}</p>
                </div>

                {helpContent[activeSection].video && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <Video className="w-5 h-5 mr-2" />
                      Video Tutorial
                    </h4>
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <Video className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">Video tutorial coming soon</p>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Quick Tips</h4>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Use Ctrl+H to return to dashboard</li>
                    <li>• Press Ctrl+F to search within any page</li>
                    <li>• Use Ctrl+S to save your work</li>
                    <li>• Press Escape to close dialogs</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
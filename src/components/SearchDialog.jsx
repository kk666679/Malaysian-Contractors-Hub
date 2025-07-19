import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Building2, FileText, Users, Calendar, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SEARCH_RESULTS = {
  projects: [
    { id: 1, title: 'KL Tower Renovation', type: 'Commercial', location: 'Kuala Lumpur' },
    { id: 2, title: 'Penang Bridge Maintenance', type: 'Infrastructure', location: 'Penang' },
    { id: 3, title: 'Johor Bahru Shopping Mall', type: 'Commercial', location: 'Johor' }
  ],
  specialists: [
    { id: 1, name: 'Ahmad Rizal', specialty: 'Electrical Engineer', rating: 4.8 },
    { id: 2, name: 'Sarah Tan', specialty: 'Plumbing Specialist', rating: 4.9 },
    { id: 3, name: 'Rajesh Kumar', specialty: 'HVAC Expert', rating: 4.7 }
  ],
  documents: [
    { id: 1, title: 'CIDB Compliance Guide', category: 'Compliance' },
    { id: 2, title: 'JKR Building Standards', category: 'Standards' },
    { id: 3, title: 'Malaysian MEP Best Practices', category: 'Guidelines' }
  ]
}

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const navigate = useNavigate()
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])
  
  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would trigger a search
    console.log('Searching for:', query)
  }
  
  const filteredResults = {
    projects: SEARCH_RESULTS.projects.filter(project => 
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.type.toLowerCase().includes(query.toLowerCase()) ||
      project.location.toLowerCase().includes(query.toLowerCase())
    ),
    specialists: SEARCH_RESULTS.specialists.filter(specialist => 
      specialist.name.toLowerCase().includes(query.toLowerCase()) ||
      specialist.specialty.toLowerCase().includes(query.toLowerCase())
    ),
    documents: SEARCH_RESULTS.documents.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.category.toLowerCase().includes(query.toLowerCase())
    )
  }
  
  const handleItemClick = (type, item) => {
    setIsOpen(false)
    // In a real app, this would navigate to the item
    switch (type) {
      case 'projects':
        navigate(`/projects/${item.id}`)
        break
      case 'specialists':
        navigate(`/marketplace/specialists/${item.id}`)
        break
      case 'documents':
        navigate(`/compliance/documents/${item.id}`)
        break
      default:
        break
    }
  }
  
  const hasResults = query && (
    filteredResults.projects.length > 0 || 
    filteredResults.specialists.length > 0 || 
    filteredResults.documents.length > 0
  )
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center w-full max-w-sm px-3 h-9 rounded-md bg-muted text-muted-foreground text-sm"
      >
        <Search className="h-4 w-4 mr-2" />
        <span>Search...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed left-[50%] top-[20%] z-50 w-full max-w-2xl -translate-x-[50%] -translate-y-[10%] overflow-hidden rounded-xl border bg-card shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for projects, specialists, documents..."
                    className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </form>
                
                {query && (
                  <div className="mt-4 border-t pt-4">
                    <div className="flex space-x-2 mb-4">
                      <button
                        onClick={() => setActiveTab('all')}
                        className={`px-3 py-1 text-xs rounded-full ${
                          activeTab === 'all' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-3 py-1 text-xs rounded-full ${
                          activeTab === 'projects' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Projects
                      </button>
                      <button
                        onClick={() => setActiveTab('specialists')}
                        className={`px-3 py-1 text-xs rounded-full ${
                          activeTab === 'specialists' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Specialists
                      </button>
                      <button
                        onClick={() => setActiveTab('documents')}
                        className={`px-3 py-1 text-xs rounded-full ${
                          activeTab === 'documents' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Documents
                      </button>
                    </div>
                    
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                      {hasResults ? (
                        <>
                          {(activeTab === 'all' || activeTab === 'projects') && filteredResults.projects.length > 0 && (
                            <div className="mb-6">
                              <h3 className="text-sm font-medium mb-2 flex items-center">
                                <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                                Projects
                              </h3>
                              <div className="space-y-2">
                                {filteredResults.projects.map(project => (
                                  <div
                                    key={project.id}
                                    className="p-2 rounded-md hover:bg-muted cursor-pointer"
                                    onClick={() => handleItemClick('projects', project)}
                                  >
                                    <div className="font-medium text-sm">{project.title}</div>
                                    <div className="text-xs text-muted-foreground flex items-center justify-between">
                                      <span>{project.type}</span>
                                      <span>{project.location}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {(activeTab === 'all' || activeTab === 'specialists') && filteredResults.specialists.length > 0 && (
                            <div className="mb-6">
                              <h3 className="text-sm font-medium mb-2 flex items-center">
                                <Users className="h-4 w-4 mr-2 text-emerald-500" />
                                Specialists
                              </h3>
                              <div className="space-y-2">
                                {filteredResults.specialists.map(specialist => (
                                  <div
                                    key={specialist.id}
                                    className="p-2 rounded-md hover:bg-muted cursor-pointer"
                                    onClick={() => handleItemClick('specialists', specialist)}
                                  >
                                    <div className="font-medium text-sm">{specialist.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center justify-between">
                                      <span>{specialist.specialty}</span>
                                      <span>★ {specialist.rating}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {(activeTab === 'all' || activeTab === 'documents') && filteredResults.documents.length > 0 && (
                            <div className="mb-6">
                              <h3 className="text-sm font-medium mb-2 flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-amber-500" />
                                Documents
                              </h3>
                              <div className="space-y-2">
                                {filteredResults.documents.map(doc => (
                                  <div
                                    key={doc.id}
                                    className="p-2 rounded-md hover:bg-muted cursor-pointer"
                                    onClick={() => handleItemClick('documents', doc)}
                                  >
                                    <div className="font-medium text-sm">{doc.title}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {doc.category}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        query && (
                          <div className="py-8 text-center">
                            <p className="text-muted-foreground">No results found for "{query}"</p>
                          </div>
                        )
                      )}
                      
                      {!query && (
                        <div className="py-8 text-center">
                          <Shield className="h-12 w-12 mx-auto text-muted-foreground/30 mb-2" />
                          <p className="text-muted-foreground">Start typing to search</p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Search for projects, specialists, documents, and more
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="mt-4 border-t pt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div>
                    Press <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">ESC</kbd> to close
                  </div>
                  <div>
                    <span className="mr-2">Navigation:</span>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs ml-1">↓</kbd>
                    <span className="mx-2">Select:</span>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">Enter</kbd>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
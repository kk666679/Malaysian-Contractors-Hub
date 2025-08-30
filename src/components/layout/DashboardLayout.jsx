import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FileText, 
  Shield, 
  CloudRain, 
  Settings, 
  ChevronRight, 
  Menu, 
  X,
  Bell,
  Search,
  LogOut
} from 'lucide-react'
import { ThemeToggle } from '../ui/theme-toggle'
import NotificationSystem from './NotificationSystem'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/dashboard',
    badge: null
  },
  {
    title: 'Projects',
    icon: <Building2 className="h-5 w-5" />,
    href: '/dashboard/projects',
    badge: '3'
  },
  {
    title: 'Bid Engine',
    icon: <FileText className="h-5 w-5" />,
    href: '/bid-engine',
    badge: null
  },
  {
    title: 'Specialists',
    icon: <Users className="h-5 w-5" />,
    href: '/marketplace',
    badge: '5'
  },
  {
    title: 'Compliance',
    icon: <Shield className="h-5 w-5" />,
    href: '/compliance',
    badge: '2'
  },
  {
    title: 'Monsoon Planner',
    icon: <CloudRain className="h-5 w-5" />,
    href: '/monsoon-planner',
    badge: null
  },
  {
    title: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/dashboard/settings',
    badge: null
  }
]

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])
  
  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const isActive = (href) => location.pathname === href || location.pathname.startsWith(`${href}/`)
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 280 : 80 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:block border-r bg-card shadow-sm z-30 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-4 border-b">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isSidebarOpen ? 1 : 0, display: isSidebarOpen ? 'block' : 'none' }}
              className="flex items-center gap-2"
            >
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">MEP Contractors</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isSidebarOpen ? 0 : 1, display: isSidebarOpen ? 'none' : 'block' }}
            >
              <Building2 className="h-6 w-6 text-primary" />
            </motion.div>
            
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight
                  className={`h-5 w-5 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isSidebarOpen ? 1 : 0, display: isSidebarOpen ? 'block' : 'none' }}
                    className="ml-3 flex-1"
                  >
                    {item.title}
                  </motion.span>
                  
                  {item.badge && isSidebarOpen && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Mohd Azlan</p>
                  <p className="text-xs text-muted-foreground truncate">KL Builders Sdn Bhd</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>
      
      {/* Mobile Sidebar */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] border-r bg-card shadow-lg z-50 lg:hidden"
            >
              <div className="h-full flex flex-col">
                <div className="h-16 flex items-center px-4 border-b">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">MEP Contractors</span>
                  </div>
                  
                  <div className="ml-auto">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4 px-3">
                  <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                          isActive(item.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span className="ml-3 flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Mohd Azlan</p>
                      <p className="text-xs text-muted-foreground truncate">KL Builders Sdn Bhd</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-card shadow-sm flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="ml-4 lg:ml-0 flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-9 rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationSystem />
            <ThemeToggle />
            
            <Separator orientation="vertical" className="h-8" />
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
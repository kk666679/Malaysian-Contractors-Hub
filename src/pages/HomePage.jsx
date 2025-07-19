import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import PageTransition from '../components/PageTransition'
import { 
  Building2, 
  CheckCircle2, 
  Users, 
  Calendar, 
  CloudRain, 
  Zap, 
  Shield,
  ChevronRight
} from 'lucide-react'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('bid-engine')
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const features = [
    {
      id: 'bid-engine',
      title: 'Project Bid Engine',
      description: 'Generate accurate project bids with our comprehensive cost database tailored for Malaysian construction.',
      icon: <Building2 className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      benefits: [
        'Malaysian-specific labor rates database',
        'Material cost tracking with local supplier integration',
        'JKR rate compliance checking',
        'Automated BOQ generation'
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance Tracker',
      description: 'Stay up-to-date with Malaysian building codes, CIDB requirements, and local regulations.',
      icon: <Shield className="h-6 w-6" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      benefits: [
        'Real-time CIDB regulation updates',
        'JKR building standards integration',
        'Automated compliance checking',
        'Certificate management system'
      ]
    },
    {
      id: 'marketplace',
      title: 'Specialist Marketplace',
      description: 'Connect with qualified MEP specialists across Malaysia for your project needs.',
      icon: <Users className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      benefits: [
        'Verified specialist profiles',
        'Rating and review system',
        'Secure payment processing',
        'Project-based hiring tools'
      ]
    },
    {
      id: 'monsoon-planner',
      title: 'Monsoon Risk Planner',
      description: "Plan your construction schedule around Malaysia's monsoon seasons to minimize weather-related delays.",
      icon: <CloudRain className="h-6 w-6" />,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      benefits: [
        'Historical weather pattern analysis',
        'Region-specific monsoon forecasting',
        'Schedule optimization tools',
        'Risk mitigation recommendations'
      ]
    }
  ]

  const testimonials = [
    {
      quote: "This platform has transformed how we manage compliance for our MEP projects across Klang Valley.",
      author: "Ahmad Rizal",
      position: "Project Director",
      company: "KL Builders Sdn Bhd"
    },
    {
      quote: "The monsoon risk planner saved us weeks of potential delays on our Penang coastal development.",
      author: "Sarah Tan",
      position: "Site Manager",
      company: "Eastern Construction"
    },
    {
      quote: "Finding qualified MEP specialists used to take weeks. Now we can source verified professionals in days.",
      author: "Rajesh Kumar",
      position: "Procurement Manager",
      company: "Johor Development Corp"
    }
  ]

  const stats = [
    { value: '500+', label: 'Contractors', icon: <Building2 className="h-5 w-5 text-blue-500" /> },
    { value: '1,200+', label: 'Projects Completed', icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> },
    { value: '98%', label: 'Compliance Rate', icon: <Shield className="h-5 w-5 text-purple-500" /> },
    { value: 'RM 2.5B', label: 'Project Value', icon: <Zap className="h-5 w-5 text-amber-500" /> }
  ]

  return (
    <PageTransition>
      <div className="bg-background overflow-hidden">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          style={{ opacity, scale }}
          className="relative py-20 md:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
                  Built for Malaysian Contractors
                </Badge>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
              >
                Malaysia's Premier Civil & MEP <br className="hidden sm:block" />
                <span className="text-primary">Contractor Platform</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground"
              >
                Streamline your construction projects with our comprehensive suite of tools designed specifically for Malaysian contractors.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-x-6"
              >
                <Button 
                  to="/dashboard" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  to="/services" 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Services
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl" />
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          ref={statsRef}
          className="py-12 bg-muted"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-background rounded-full mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          ref={featuresRef}
          className="py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tools designed specifically for Malaysian contractors
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Feature tabs */}
              <div className="lg:col-span-2">
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <motion.button
                      key={feature.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setActiveTab(feature.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center gap-4 ${
                        activeTab === feature.id 
                          ? 'bg-card shadow-md border-l-4 border-primary' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                        <div className={feature.color}>{feature.icon}</div>
                      </div>
                      <div>
                        <h3 className={`font-medium ${activeTab === feature.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {feature.title}
                        </h3>
                      </div>
                      {activeTab === feature.id && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="ml-auto"
                        >
                          <ChevronRight className="h-5 w-5 text-primary" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Feature details */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {features.map((feature) => (
                      feature.id === activeTab && (
                        <Card key={feature.id} className="overflow-hidden border-none shadow-lg">
                          <div className={`h-2 w-full ${feature.bgColor}`} />
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                                <div className={feature.color}>{feature.icon}</div>
                              </div>
                              <CardTitle>{feature.title}</CardTitle>
                            </div>
                            <CardDescription className="text-base mt-2">
                              {feature.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <h4 className="font-medium text-foreground mb-3">Key Benefits</h4>
                            <ul className="space-y-2">
                              {feature.benefits.map((benefit, index) => (
                                <motion.li 
                                  key={index}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle2 className={`h-5 w-5 ${feature.color} mt-0.5`} />
                                  <span>{benefit}</span>
                                </motion.li>
                              ))}
                            </ul>
                            <div className="mt-6">
                              <Button 
                                to={`/${feature.id}`}
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Learn More
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section 
          ref={testimonialsRef}
          className="py-20 bg-muted"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-foreground">Trusted by Malaysian Contractors</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our users have to say about our platform
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-foreground italic mb-6">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2 className="text-3xl font-bold">Ready to transform your contracting business?</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
              Join hundreds of Malaysian contractors already using our platform to streamline their operations.
            </p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <Button 
                to="/dashboard"
                variant="secondary" 
                size="lg" 
                className="font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  )
}

export default HomePage
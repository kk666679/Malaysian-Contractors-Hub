import React from 'react';
import { Button } from '../ui/button'
import PageTransition from './PageTransition.jsx'
import { ArrowLeft, Construction } from 'lucide-react'

const PlaceholderPage = ({ title, returnPath = '/' }) => {
  return (
    <PageTransition>
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <Button 
            to={returnPath}
            variant="ghost" 
            className="flex items-center gap-2"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="text-center py-20 border rounded-lg bg-muted/30">
          <Construction className="h-16 w-16 mx-auto mb-4 text-primary/60" />
          <h1 className="text-3xl font-bold mb-4">{title} Coming Soon</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            We're currently building this feature. Check back soon for updates!
          </p>
          <Button 
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}

export default PlaceholderPage
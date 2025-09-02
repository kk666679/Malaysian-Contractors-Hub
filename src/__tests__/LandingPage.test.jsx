import React from 'react';
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LandingPage from '../pages/LandingPage'
import { BrowserRouter } from 'react-router-dom'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Play: () => <div data-testid="play-icon">Play</div>,
  Building2: () => <div data-testid="building-icon">Building2</div>,
  CheckCircle2: () => <div data-testid="check-icon">CheckCircle2</div>,
  ArrowRight: () => <div data-testid="arrow-icon">ArrowRight</div>,
  Mail: () => <div data-testid="mail-icon">Mail</div>,
  Phone: () => <div data-testid="phone-icon">Phone</div>,
  MapPin: () => <div data-testid="map-icon">MapPin</div>,
  Send: () => <div data-testid="send-icon">Send</div>,
}))

describe('LandingPage', () => {
  it('renders the landing page with hero section', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    )

    // Check if main heading is present
    expect(screen.getByText('MC-Hub: Malaysian Contractors Hub')).toBeInTheDocument()

    // Check if CTA buttons are present
    expect(screen.getByText('Get Started Free')).toBeInTheDocument()
    expect(screen.getByText('Watch Demo')).toBeInTheDocument()
  })

  it('renders features section', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    )

    // Check if features section title is present
    expect(screen.getByText('Powerful Features for Malaysian Contractors')).toBeInTheDocument()

    // Check if some feature titles are present
    expect(screen.getByText('Custom Bids')).toBeInTheDocument()
    expect(screen.getByText('Compliance')).toBeInTheDocument()
    expect(screen.getByText('Project Tools')).toBeInTheDocument()
  })

  it('renders contact section', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    )

    // Check if contact section title is present
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()

    // Check if contact form elements are present
    expect(screen.getByText('Send us a Message')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    )

    // Check if CTA section content is present
    expect(screen.getByText('Ready to Transform Your Contracting Business?')).toBeInTheDocument()
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
  })
})

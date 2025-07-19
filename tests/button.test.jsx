import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Button } from '../src/components/ui/button'

// Mock the navigate function
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('Button Navigation', () => {
  it('should navigate to the specified path when clicked', () => {
    render(
      <BrowserRouter>
        <Button to="/test-path">Test Button</Button>
      </BrowserRouter>
    )
    
    const button = screen.getByText('Test Button')
    fireEvent.click(button)
    
    expect(mockNavigate).toHaveBeenCalledWith('/test-path')
  })
  
  it('should call onClick handler if provided', () => {
    const handleClick = vi.fn()
    
    render(
      <BrowserRouter>
        <Button onClick={handleClick}>Test Button</Button>
      </BrowserRouter>
    )
    
    const button = screen.getByText('Test Button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalled()
  })
  
  it('should call both navigate and onClick when both are provided', () => {
    const handleClick = vi.fn()
    
    render(
      <BrowserRouter>
        <Button to="/test-path" onClick={handleClick}>Test Button</Button>
      </BrowserRouter>
    )
    
    const button = screen.getByText('Test Button')
    fireEvent.click(button)
    
    expect(mockNavigate).toHaveBeenCalledWith('/test-path')
    expect(handleClick).toHaveBeenCalled()
  })
})
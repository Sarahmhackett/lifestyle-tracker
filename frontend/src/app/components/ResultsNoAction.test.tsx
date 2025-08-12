import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResultsNoAction from './ResultsNoAction'

describe('Results - No action required', () => {
    test('renders title and messages', () => {
      render(<ResultsNoAction />)
  
      expect(screen.getByRole('heading', { name: /your results/i })).toBeInTheDocument()
      expect(screen.getByText(/we don't need to see you at this time/i)).toBeInTheDocument()
      expect(screen.getByText(/keep up the good work/i)).toBeInTheDocument()
    })
  
    test('renders the logout button', () => {
      render(<ResultsNoAction />)
  
      expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument()
    })
  })
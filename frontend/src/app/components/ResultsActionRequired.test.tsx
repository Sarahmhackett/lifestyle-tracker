import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResultsActionRequired from './ResultsActionRequired'

describe('Results - Action Required', () => {
    test('renders title and messages', () => {
      render(<ResultsActionRequired />)
  
      expect(screen.getByRole('heading', { name: /your results/i })).toBeInTheDocument()
      expect(
        screen.getByText(/We think there are some simple things you could do to improve you quality of life/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Please phone to book an appointment/i)
      ).toBeInTheDocument()
    })
  
    test('renders the logout button', () => {
      render(<ResultsActionRequired />)
  
      expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument()
    })
  })
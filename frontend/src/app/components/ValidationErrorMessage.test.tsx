import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ValidationErrorMessage from './ValidationErrorMessage'

describe('Validation error message', () => {
  test('renders the message with alert role', () => {
      render(<ValidationErrorMessage message="Validation Error" />)
    
      const alert = screen.getByRole('alert')
    
      expect(alert).toHaveTextContent('Validation Error')
      expect(alert).toHaveAttribute('aria-live', 'polite')
    })
})
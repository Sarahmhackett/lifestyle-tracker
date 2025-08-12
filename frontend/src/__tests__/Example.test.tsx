// src/__tests__/Example.test.tsx
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

function Example() {
  return <h1>Hello, world!</h1>
}

test('renders hello world', () => {
  render(<Example />)
  expect(screen.getByText(/hello, world!/i)).toBeInTheDocument()
})

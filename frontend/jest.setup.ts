// jest.setup.ts
import '@testing-library/jest-dom'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const React = require('react')
    return React.createElement('img', props) 
  },
}))

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation')
  return {
    ...actual,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    }),
  }
})

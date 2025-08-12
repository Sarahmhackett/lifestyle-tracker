import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import InfoContentBlock from './InfoContentBlock'

describe('Info content block', () => {
    test('renders the info content block', () => {
        render(<InfoContentBlock />)
        expect(screen.getByRole('heading', { name: 'What is NHS Login?' })).toBeInTheDocument()
    })
})
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import LifestyleForm from './lifestyleForm'
import { submitLifestyleForm } from '../utils/submitLifestyleFormAPI'

jest.mock('../utils/submitLifestyleFormAPI', () => ({
    submitLifestyleForm: jest.fn(),
  }))

const submitLifestyleMock = submitLifestyleForm as jest.MockedFunction<typeof submitLifestyleForm>

describe('Lifestyle Form', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders questions and radio options', () => {
        render(<LifestyleForm nhsNumber="1234567890" />)
      
        expect(screen.getByRole('heading', { name: /lifestyle tracker/i })).toBeInTheDocument()
      
        expect(screen.getByRole('group', { name: /do you drink on more than 2 days per week\?/i })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: /do you smoke\?/i })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: /do you exercise for more than 1 hour per week\?/i })).toBeInTheDocument()
      
        expect(screen.getAllByRole('radio', { name: /yes/i })).toHaveLength(3)
        expect(screen.getAllByRole('radio', { name: /no/i })).toHaveLength(3)
      
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
      })

      test('does not submit if radios are not selected', async () => {
        const user = userEvent.setup()
        render(<LifestyleForm nhsNumber="1234567890" />)
      
        await user.click(screen.getByRole('button', { name: /submit/i }))
      
        expect(submitLifestyleMock).not.toHaveBeenCalled()
      })

      test('submits form with selected options (true)', async () => {
        const user = userEvent.setup()
        render(<LifestyleForm nhsNumber="1234567890" />)
      
        const drinkGroup = screen.getByRole('group', { name: /do you drink on more than 2 days per week\?/i })
        await user.click(within(drinkGroup).getByRole('radio', { name: /yes/i }))
      
        const smokeGroup = screen.getByRole('group', { name: /do you smoke\?/i })
        await user.click(within(smokeGroup).getByRole('radio', { name: /yes/i }))
      
        const exerciseGroup = screen.getByRole('group', { name: /do you exercise for more than 1 hour per week\?/i })
        await user.click(within(exerciseGroup).getByRole('radio', { name: /yes/i }))
      
        await user.click(screen.getByRole('button', { name: /submit/i }))
      
        expect(submitLifestyleMock).toHaveBeenCalledWith(true, true, true, '1234567890')
        expect(submitLifestyleMock).toHaveBeenCalledTimes(1)

      })

      test('submits form with selected options (false)', async () => {
        const user = userEvent.setup()
        render(<LifestyleForm nhsNumber="1234567890" />)
      
        const drinkGroup = screen.getByRole('group', { name: /do you drink on more than 2 days per week\?/i })
        await user.click(within(drinkGroup).getByRole('radio', { name: /no/i }))
      
        const smokeGroup = screen.getByRole('group', { name: /do you smoke\?/i })
        await user.click(within(smokeGroup).getByRole('radio', { name: /no/i }))
      
        const exerciseGroup = screen.getByRole('group', { name: /do you exercise for more than 1 hour per week\?/i })
        await user.click(within(exerciseGroup).getByRole('radio', { name: /no/i }))
      
        await user.click(screen.getByRole('button', { name: /submit/i }))
      
        expect(submitLifestyleMock).toHaveBeenCalledWith(false, false, false, '1234567890')
        expect(submitLifestyleMock).toHaveBeenCalledTimes(1)
      })
})

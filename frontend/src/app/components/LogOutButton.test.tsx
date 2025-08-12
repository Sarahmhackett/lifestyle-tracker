import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import LogOutButton from './LogOutButton'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('Log Out Button', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        global.fetch = jest.fn()
        global.alert = jest.fn()
      })

    test('renders the log out button', () => {
        render(<LogOutButton />)
  
        expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument()
    })

    test('calls fetch and redirects on successful logout', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
        })
    
        const user = userEvent.setup()
        render(<LogOutButton />)
    
        await user.click(screen.getByRole('button', { name: /log out/i }))
    
        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/logout', {
          method: 'POST',
          credentials: 'include',
        })
        expect(pushMock).toHaveBeenCalledWith('/')
      })
    
})
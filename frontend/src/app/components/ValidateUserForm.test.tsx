import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ValidateUserForm from './ValidateUserForm'
import { validatePatient } from '../utils/validatePatientAPI'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

jest.mock('../utils/validatePatientAPI', () => ({
    validatePatient: jest.fn().mockResolvedValue({
      success: false,
      message: 'Your details could not be found',
      data: { nhsNumber: '111222333', surname: 'DOE', dateOfBirth: '2007-01-14' }
    }),
  }));
  
const validatePatientMock = validatePatient as jest.MockedFunction<typeof validatePatient>;

beforeEach(() => {
    jest.clearAllMocks(); 
  })
  
test('renders form fields and submit button', () => {
    render(<ValidateUserForm />)
  
    expect(screen.getByLabelText(/NHS Number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Surname/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument()
 })

 test('shows error if NHS number is not 9 digits', async () => {
    const user = userEvent.setup()
    render(<ValidateUserForm />)
  
    await user.type(screen.getByLabelText(/nhs number/i), '12345678') 
    await user.type(screen.getByLabelText(/surname/i), 'DOE')
    await user.type(screen.getByLabelText(/date of birth/i), '2007-01-14')
  
    await user.click(screen.getByRole('button', { name: /continue/i }))
  
    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/please enter a valid 9 digit nhs number/i)
  })

  test('shows error if details are not found', async () => {
    const user = userEvent.setup()
    render(<ValidateUserForm />)
  
    await user.type(screen.getByLabelText(/nhs number/i), '111222333') 
    await user.type(screen.getByLabelText(/surname/i), 'Hackett')
    await user.type(screen.getByLabelText(/date of birth/i), '2007-01-14')
  
    await user.click(screen.getByRole('button', { name: /continue/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/Your details could not be found/i)
    
  })

  test('routes to questionnaire when validation succeeds', async () => {
    validatePatientMock.mockResolvedValueOnce({ success: true, data: { nhsNumber: '111222333', surname: 'DOE', dateOfBirth: '2007-01-14' } });
  
    const user = userEvent.setup();
    render(<ValidateUserForm />);
  
    await user.type(screen.getByLabelText(/nhs number/i), '111222333');
    await user.type(screen.getByLabelText(/surname/i), 'DOE');
    await user.type(screen.getByLabelText(/date of birth/i), '2007-01-14');
  
    await user.click(screen.getByRole('button', { name: /continue/i }));
  
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/questionnaire');
    });
  });
  
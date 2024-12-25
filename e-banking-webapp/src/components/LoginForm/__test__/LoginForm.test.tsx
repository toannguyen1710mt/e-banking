jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm component', () => {
  it('Should render snapshot correctly', () => {
    // expect(render(<LoginForm />)).toMatchSnapshot();
  });

  it('renders the form with required fields', () => {
    // const { getByPlaceholderText, getByRole, getByText } = render(
    //   <LoginForm />,
    // );
    // expect(getByPlaceholderText('Username')).toBeInTheDocument();
    // expect(getByPlaceholderText('Password')).toBeInTheDocument();
    // expect(getByRole('button', { name: /Sign In/i })).toBeDisabled();
    // expect(getByText('Forgot Password?')).toBeInTheDocument();
  });
});

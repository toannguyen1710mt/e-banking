import { render, screen } from '@testing-library/react';
import SignUpPage from '../page';

jest.mock('@/components/SignUpForm', () => ({
  SignUpForm: () => <div data-testid='sign-up-form'>Sign Up Form</div>,
}));

describe('SignUpPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly snapshot', async () => {
    render(await SignUpPage());

    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();
  });
});

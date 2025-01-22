import { render, screen } from '@testing-library/react';
import SignInPage from '../page';

jest.mock('@/components/LoginForm', () => ({
  LoginForm: () => <div data-testid='sign-in-form'>Sign In Form</div>,
}));

describe('SignInPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly snapshot', async () => {
    render(await SignInPage());

    const signInForm = screen.getByTestId('sign-in-form');
    expect(signInForm).toBeInTheDocument();
  });
});

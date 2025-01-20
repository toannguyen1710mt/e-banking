import { render, screen } from '@testing-library/react';

// Components
import { ConnectedAccountsTab, PAYMENT_METHODS } from '..';

describe('ConnectedAccountsTab component', () => {
  it('should match snapshot for ConnectedAccountsTab', () => {
    const { container } = render(<ConnectedAccountsTab />);

    expect(container).toMatchSnapshot();
  });

  it('should render buttons for each payment method with correct label and button text', () => {
    render(<ConnectedAccountsTab />);

    PAYMENT_METHODS.forEach(({ label, buttonText }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });
  });
});

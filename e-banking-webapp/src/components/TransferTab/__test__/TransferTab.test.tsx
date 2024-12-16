// Libs
import { render, screen } from '@testing-library/react';

// constants
import { TRANSFER_TABS } from '@/constants';

// Components
import { TransferTab } from '@/components';

describe('TransferTab Component', () => {
  test('renders correctly and matches snapshot', () => {
    const { container } = render(<TransferTab TransferTabs={TRANSFER_TABS} />);

    expect(container).toMatchSnapshot();
  });

  test('renders all tabs with correct titles and descriptions', () => {
    render(<TransferTab TransferTabs={TRANSFER_TABS} />);

    TRANSFER_TABS.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});

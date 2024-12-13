// Libs
import { render, screen } from '@testing-library/react';

// constants
import { TRANSFER_TABS } from '@/constants';

// Components
import { TransferTag } from '@/components';

describe('TransferTag Component', () => {
  test('renders correctly and matches snapshot', () => {
    const { container } = render(<TransferTag TransferTabs={TRANSFER_TABS} />);

    expect(container).toMatchSnapshot();
  });

  test('renders all tabs with correct titles and descriptions', () => {
    render(<TransferTag TransferTabs={TRANSFER_TABS} />);

    TRANSFER_TABS.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});

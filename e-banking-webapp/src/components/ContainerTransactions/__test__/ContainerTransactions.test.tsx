// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import { ContainerTransactions } from '../index';

describe('ContainerTransactions Component', () => {
  test('renders with correct data', () => {
    const { container } = render(
      <ContainerTransactions session={MOCK_SESSION_DATA} currentPage={1} />,
    );
    expect(container).toMatchSnapshot();
  });
});

// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_COLUMNS } from '@/mocks';

// Components
import { TableSkeleton } from '@/components';

describe('TableSkeleton component', () => {
  it('should match snapshot', () => {
    const container = render(<TableSkeleton columns={MOCK_COLUMNS} />);

    expect(container).toMatchSnapshot();
  });
});

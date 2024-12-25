// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_COLUMNS } from '@/mocks';

// Components
import { SkeletonTable } from '@/components';

describe('SkeletonTable component', () => {
  it('should match snapshot', () => {
    const container = render(<SkeletonTable columns={MOCK_COLUMNS} />);

    expect(container).toMatchSnapshot();
  });
});

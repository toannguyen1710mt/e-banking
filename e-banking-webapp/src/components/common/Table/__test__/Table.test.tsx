// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_COLUMNS, MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { Table } from '@/components';

describe('Table component', () => {
  it('should match snapshot for Table', () => {
    const { container } = render(
      <Table columns={MOCK_COLUMNS} data={MOCK_TRANSACTIONS} />,
    );

    expect(container).toMatchSnapshot();
  });
});

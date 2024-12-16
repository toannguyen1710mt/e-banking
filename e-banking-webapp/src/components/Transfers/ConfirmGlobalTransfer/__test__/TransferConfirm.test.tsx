// Libs
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocks
import { TRANSFER_CONFIRM_DATA } from '@/mocks';

// Components
import { ConfirmGlobalTransfer } from '@/components';

describe('TransferConfirm component', () => {
  test('renders correctly and matches snapshot', () => {
    const { container } = render(
      <ConfirmGlobalTransfer {...TRANSFER_CONFIRM_DATA} />,
    );
    expect(container).toMatchSnapshot();
  });
});

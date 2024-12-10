// Libs
import { render, screen } from '@testing-library/react';

// Mocks
import { MOCK_ACTIONS } from '@/mocks';

// Components
import { QuickAction } from '@/components';

describe('QuickAction component', () => {
  test('should match snapshot for QuickAction', () => {
    const { container } = render(<QuickAction actions={MOCK_ACTIONS} />);

    expect(container).toMatchSnapshot();
  });

  test('should disable buttons when `isDisabled` is true', () => {
    render(<QuickAction actions={MOCK_ACTIONS} />);

    MOCK_ACTIONS.forEach((action) => {
      const button = screen.getByText(action.label).closest('button');

      if (action.isDisabled) {
        expect(button).toBeDisabled();
      } else {
        expect(button).not.toBeDisabled();
      }
    });
  });
});

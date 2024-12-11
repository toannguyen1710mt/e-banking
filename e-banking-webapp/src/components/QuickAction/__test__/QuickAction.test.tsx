// Libs
import { render, screen } from '@testing-library/react';

// Constants
import { QUICK_ACTIONS } from '@/constants';

// Components
import { QuickAction } from '@/components';

describe('QuickAction component', () => {
  test('should match snapshot for QuickAction', () => {
    const { container } = render(<QuickAction actions={QUICK_ACTIONS} />);

    expect(container).toMatchSnapshot();
  });

  test('should disable buttons when `isDisabled` is true', () => {
    render(<QuickAction actions={QUICK_ACTIONS} />);

    QUICK_ACTIONS.forEach((action) => {
      const button = screen.getByText(action.label).closest('button');

      if (action.isDisabled) {
        expect(button).toBeDisabled();
      } else {
        expect(button).not.toBeDisabled();
      }
    });
  });
});

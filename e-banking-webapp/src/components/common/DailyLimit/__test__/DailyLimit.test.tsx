// Libs
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { DailyLimit } from '@/components';

describe('DailyLimit component', () => {
  test('should match snapshot for DailyLimit', () => {
    const { container } = render(<DailyLimit />);

    expect(container).toMatchSnapshot();
  });
});

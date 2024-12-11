// Libs
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { DailyLimit } from '@/components';

describe('DailyLimit component', () => {
  test('should match snapshot for DailyLimit', () => {
    const { container } = render(
      <DailyLimit expenses='50,000' limit='183,450' />,
    );

    expect(container).toMatchSnapshot();
  });
});

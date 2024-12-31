import { render } from '@testing-library/react';

// Component
import { DatePicker } from '@/components';

describe('DatePicker component', () => {
  test('Should render snapshot correctly', () => {
    expect(render(<DatePicker />)).toMatchSnapshot();
  });
});

// Libs
import { render } from '@testing-library/react';

// Components
import { Calendar } from '@/components';

// Mock ResizeObserver to fix the ReferenceError during testing
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Calendar component', () => {
  const mockDate = new Date('2024-01-01T00:00:00Z');

  beforeEach(() => {
    window.ResizeObserver = MockResizeObserver;

    jest.spyOn(global.Date, 'now').mockImplementation(() => mockDate.getTime());
  });

  it('should match snapshot', () => {
    const { container } = render(<Calendar />);
    expect(container).toMatchSnapshot();
  });

  it('should apply custom classNames correctly', () => {
    const { container } = render(
      <Calendar
        classNames={{
          base: 'custom-base',
          headerWrapper: 'custom-header-wrapper',
        }}
      />,
    );

    expect(container.querySelector('.custom-base')).toBeInTheDocument();
    expect(
      container.querySelector('.custom-header-wrapper'),
    ).toBeInTheDocument();
  });
});

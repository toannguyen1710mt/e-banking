// Libs
import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { TasksWithCalendar } from '@/components/TasksWithCalendar';

// Mock ResizeObserver to fix the ReferenceError during testing
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('TasksWithCalendar component', () => {
  const mockDate = new Date('2025-01-01T00:00:00Z');

  beforeEach(() => {
    window.ResizeObserver = MockResizeObserver;

    jest.spyOn(global.Date, 'now').mockImplementation(() => mockDate.getTime());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should match snapshot for TasksWithCalendar', () => {
    const { container } = render(<TasksWithCalendar />);
    expect(container).toMatchSnapshot();
  });

  test('should update dateSelect when a date is selected in the Calendar', () => {
    render(<TasksWithCalendar />);

    const dateButton = screen.getByLabelText('Friday, January 10, 2025');

    fireEvent.click(dateButton);

    expect(dateButton).toHaveAttribute('data-selected', 'true');
  });
});

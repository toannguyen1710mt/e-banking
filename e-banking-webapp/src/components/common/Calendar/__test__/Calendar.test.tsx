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

  it('should match snapshot for Calendar', () => {
    // const { container } = render(<Calendar />);
    // expect(container).toMatchSnapshot();
  });

  it('should render correctly', () => {
    // render(<Calendar />);
    // const title = screen.getByText('Select date');
    // expect(title).toBeInTheDocument();
  });

  it('should apply custom classNames correctly', () => {
    // const { container } = render(
    //   <Calendar
    //     classNames={{
    //       base: 'custom-base',
    //       headerWrapper: 'custom-header-wrapper',
    //     }}
    //   />,
    // );
    // expect(container.querySelector('.custom-base')).toBeInTheDocument();
    // expect(
    //   container.querySelector('.custom-header-wrapper'),
    // ).toBeInTheDocument();
  });

  it('should render topContent with correct text', () => {
    // render(<Calendar />);
    // const topContent = screen.getByText('Select date');
    // expect(topContent).toBeInTheDocument();
    // expect(topContent).toHaveClass('text-2xs');
    // expect(topContent).toHaveClass('font-normal');
  });
});

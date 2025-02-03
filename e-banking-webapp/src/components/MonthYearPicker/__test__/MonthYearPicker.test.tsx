// Libs
import { render, fireEvent, screen } from '@testing-library/react';

// Constants
import { MONTHS } from '@/constants';

// Components
import { MonthYearPicker } from '@/components';

jest.mock('@/utils', () => ({
  formatMonthYear: jest.fn(
    ({ year, month }) =>
      `${String(month).padStart(2, '0')}/${String(year).slice(-2)}`,
  ),
  formatYearMonthToShortDate: jest.fn((date) => {
    const parsedDate = new Date(date);
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = String(parsedDate.getFullYear()).slice(-2);
    return `${month}/${year}`;
  }),
  formatDate: jest.fn(),
}));

describe('MonthYearPicker component', () => {
  const onChangeMock = jest.fn();
  const fixedDate = new Date(2025, 0, 1);

  beforeAll(() => {
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => fixedDate as unknown as Date);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should match snapshot', () => {
    const container = render(<MonthYearPicker onChange={onChangeMock} />);

    expect(container).toMatchSnapshot();
  });

  test('renders with correct initial state', () => {
    render(
      <MonthYearPicker label='Select Month/Year' onChange={onChangeMock} />,
    );
    expect(screen.getByText('Select Month/Year')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('MM/YY');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('MM/YY');
  });

  test('opens and closes the dropdown when clicked', () => {
    render(
      <MonthYearPicker label='Select Month/Year' onChange={onChangeMock} />,
    );

    expect(screen.queryByText(MONTHS[0])).toBeNull();

    const input = screen.getByPlaceholderText('MM/YY');

    fireEvent.click(input);
    expect(screen.getByText(MONTHS[0])).toBeInTheDocument();

    fireEvent.click(input);
    expect(screen.queryByText(MONTHS[0])).toBeNull();
  });

  test('handles month selection correctly', () => {
    render(<MonthYearPicker onChange={onChangeMock} />);
    fireEvent.click(screen.getByPlaceholderText('MM/YY'));

    const monthButton = screen.getByText(MONTHS[0]);

    fireEvent.click(monthButton);
    expect(onChangeMock).toHaveBeenCalledWith('01/25');
    expect(screen.getByPlaceholderText('MM/YY')).toHaveValue('01/25');
  });

  test('handles year change correctly', () => {
    render(<MonthYearPicker onChange={onChangeMock} />);
    fireEvent.click(screen.getByPlaceholderText('MM/YY'));

    const yearSelect = screen.getByLabelText('Year:');

    fireEvent.change(yearSelect, { target: { value: '2025' } });
    expect(onChangeMock).toHaveBeenCalledWith('01/25');
    expect(screen.getByPlaceholderText('MM/YY')).toHaveValue('01/25');
  });

  test('closes the dropdown when clicking outside', () => {
    render(<MonthYearPicker onChange={onChangeMock} />);

    fireEvent.click(screen.getByPlaceholderText('MM/YY'));
    expect(screen.getByText(MONTHS[0])).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText(MONTHS[0])).toBeNull();
  });
});

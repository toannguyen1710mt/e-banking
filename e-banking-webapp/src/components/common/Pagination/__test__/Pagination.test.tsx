// Libs
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Components
import { Pagination } from '@/components';

// Utils
import { updateSearchParams } from '@/utils';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/utils/search-params', () => ({
  updateSearchParams: jest.fn(),
}));

const mockProps = {
  currentPage: 1,
  totalPage: 100,
};
const mockReplace = jest.fn();
const mockUseRouter = useRouter as jest.Mock;
const mockUsePathname = usePathname as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUpdateSearchParams = updateSearchParams as jest.Mock;

describe('Pagination component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUsePathname.mockReturnValue('/test-path');
    mockUseSearchParams.mockReturnValue(new URLSearchParams('page=1'));
  });

  it('should match snapshot', () => {
    const { container } = render(<Pagination {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call handlePageChange with correct page number when clicking page button', () => {
    render(<Pagination {...mockProps} />);

    mockUpdateSearchParams.mockReturnValue(new URLSearchParams('page=2'));

    const pageButton = screen.getByLabelText('pagination item 2');

    fireEvent.click(pageButton);

    expect(mockReplace).toHaveBeenCalledWith('/test-path?page=2');
  });
});

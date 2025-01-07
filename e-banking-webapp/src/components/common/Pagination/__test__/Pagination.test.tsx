// Libs
import { render } from '@testing-library/react';

// Components
import { Pagination } from '@/components';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/mock-path'),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

const mockProps = {
  currentPage: 1,
  totalPage: 100,
};
describe('Pagination component', () => {
  it('should match snapshot', () => {
    const { container } = render(<Pagination {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});

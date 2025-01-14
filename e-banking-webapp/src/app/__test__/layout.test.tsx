import { render } from '@testing-library/react';
import RootLayout from '../layout';

jest.mock('@/providers', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('RootLayout', () => {
  it.skip('renders children', () => {
    const children = <div>Hello World!</div>;
    const { getByText } = render(<RootLayout>{children}</RootLayout>);
    expect(getByText('Hello World!')).toBeInTheDocument();
  });
});

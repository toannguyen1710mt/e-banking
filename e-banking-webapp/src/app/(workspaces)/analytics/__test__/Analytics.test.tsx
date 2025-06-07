import { auth } from '@/config/auth';
import { render, screen } from '@testing-library/react';
import AnalyticsPage from '../page';

jest.mock('@/config/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('@/components', () => ({
  ContainerAnalytics: jest.fn(() => (
    <div data-testid='container-analytics'>Mock Container Analytics</div>
  )),
}));

describe('AnalyticsPage', () => {
  const mockSession = { user: { id: '123', email: 'test@example.com' } };

  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue(mockSession);
  });

  it('Should render correctly snapshot', async () => {
    render(await AnalyticsPage());

    const containerAnalytics = screen.getByTestId('container-analytics');
    expect(containerAnalytics).toBeInTheDocument();
  });

  it('should not render ContainerAnalytics when session is not available', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    render(<AnalyticsPage />);

    expect(screen.queryByTestId('container-analytics')).toBeNull();
  });
});

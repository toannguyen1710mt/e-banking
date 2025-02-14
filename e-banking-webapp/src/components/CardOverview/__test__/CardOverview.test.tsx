// Libs
import { render } from '@testing-library/react';
import { act } from 'react';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import { CardOverview } from '@/components';

jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: () => <div>Mock ApexCharts</div>,
  };
});

describe('CardOverview component', () => {
  test('should match snapshot for CardOverview', async () => {
    let container;

    await act(async () => {
      container = render(
        <CardOverview session={MOCK_SESSION_DATA} />,
      ).container;
    });

    expect(container).toMatchSnapshot();
  });
});

// Libs
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { AnalyticsCard } from '.';

describe('AnalyticsCard component', () => {
  test('renders with correct data', () => {
    const { container } = render(
      <AnalyticsCard
        title='Total Income'
        subtitle='Last 30 days income'
        isPositive={true}
        amount='5000'
        percentageChange={5}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});

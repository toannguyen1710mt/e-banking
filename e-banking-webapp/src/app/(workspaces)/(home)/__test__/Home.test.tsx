import { render, screen } from '@testing-library/react';
import HomePage from '../page';
import { ContainerHomepage } from '@/components/ContainerHome';

jest.mock('@/components/ContainerHome', () => ({
  ContainerHomepage: jest.fn(() => (
    <div data-testid='container-homepage'>Container Homepage</div>
  )),
}));

describe('HomePage component', () => {
  it('should render ContainerHomepage component', () => {
    render(<HomePage />);

    expect(screen.getByTestId('container-homepage')).toBeInTheDocument();
    expect(ContainerHomepage).toHaveBeenCalledTimes(1);
  });
});

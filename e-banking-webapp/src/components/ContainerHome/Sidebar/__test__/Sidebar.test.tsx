import { render, screen } from '@testing-library/react';

// Components
import { Sidebar } from '..';

describe('Sidebar Component', () => {
  it('renders the MyTarget component', () => {
    render(<Sidebar />);
    expect(screen).toMatchSnapshot();
  });
});

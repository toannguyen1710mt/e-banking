import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

// Layouts
import { WrapperWorkspaces } from '..';

describe('WrapperWorkspaces component', () => {
  it('applies the correct styles for settings URL', () => {
    // Mock the pathname to match the settings regex
    (usePathname as jest.Mock).mockReturnValue('/settings/general');

    render(
      <WrapperWorkspaces>
        <div>Child Content</div>
      </WrapperWorkspaces>,
    );

    // Assert the correct classes are applied
    const wrapper = screen.getByText('Child Content').parentElement;
    expect(wrapper).toHaveClass('bg-background-500 p-0 flex grow');
  });

  it('applies the correct styles for non-settings URL', () => {
    // Mock the pathname to not match the settings regex
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    render(
      <WrapperWorkspaces>
        <div>Child Content</div>
      </WrapperWorkspaces>,
    );

    // Assert the correct classes are applied
    const wrapper = screen.getByText('Child Content').parentElement;
    expect(wrapper).toHaveClass('bg-background-900 p-3 flex grow');
  });

  it('renders the children correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    render(
      <WrapperWorkspaces>
        <div>Child Content</div>
      </WrapperWorkspaces>,
    );

    // Assert that children are rendered
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});

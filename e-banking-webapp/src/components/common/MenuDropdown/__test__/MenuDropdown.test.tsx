// Libs
import { render, screen } from '@testing-library/react';
import { Button } from '@nextui-org/react';

// Components
import { MenuDropdown, MenuOption } from '../';

const options: MenuOption[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2', isDisabled: true },
  { key: '3', label: 'Option 3' },
];

describe('MenuDropdown component test case', () => {
  it('should render MenuDropdown with label and icon', () => {
    render(
      <MenuDropdown
        label='Test Dropdown'
        options={options}
        icon={<span>🔽</span>}
      />,
    );

    expect(screen.getByText('Test Dropdown')).toBeInTheDocument();
    expect(screen.getByText('🔽')).toBeInTheDocument();
  });

  it('should render default Button trigger when customTriggerElement is not provided', () => {
    render(<MenuDropdown label='Test Dropdown' options={options} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Dropdown');
  });

  it('should render custom trigger element when provided', () => {
    const customTrigger = <Button>Custom Trigger</Button>;
    render(
      <MenuDropdown
        label='Test Dropdown'
        options={options}
        customTriggerElement={customTrigger}
      />,
    );

    const customButton = screen.getByText('Custom Trigger');
    expect(customButton).toBeInTheDocument();
  });
});

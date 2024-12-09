import { render } from '@testing-library/react';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text } from '..';

describe('Text component', () => {
  it('renders with default size and variant', () => {
    const { getByText } = render(<Text>Hello World!</Text>);

    expect(getByText('Hello World!')).toHaveClass(
      'text-base font-medium text-primary-200',
    );
  });

  it('renders with custom size', () => {
    const { getByText } = render(<Text size={TEXT_SIZE.LG}>Hello World!</Text>);

    expect(getByText('Hello World!')).toHaveClass(
      'text-lg font-medium text-primary-200',
    );
  });

  it('renders with custom variant', () => {
    const { getByText } = render(
      <Text variant={TEXT_VARIANT.SECONDARY}>Hello World!</Text>,
    );

    expect(getByText('Hello World!')).toHaveClass(
      'text-base font-medium text-secondary-100',
    );
  });

  it('renders with custom className', () => {
    const { getByText } = render(
      <Text className='custom-class'>Hello World!</Text>,
    );

    expect(getByText('Hello World!')).toHaveClass(
      'text-base font-medium text-primary-200 custom-class',
    );
  });

  it('renders as custom HTML element', () => {
    const { getByText } = render(<Text as='h1'>Hello World!</Text>);

    expect(getByText('Hello World!')).toBeInTheDocument();
    expect(getByText('Hello World!')).toBeInstanceOf(HTMLHeadingElement);
  });
});

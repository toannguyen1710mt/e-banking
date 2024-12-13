// Libs
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { Modal } from '@/components';

describe('Modal component', () => {
  it('should match snapshot for Modal', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render the modal content when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });
});

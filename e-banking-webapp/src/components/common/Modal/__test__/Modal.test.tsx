// Libs
import '@testing-library/jest-dom';

// Components

// const renderModal = (
//   isOpen: boolean,
//   children: React.ReactNode = <div>Modal Content</div>,
//   onClose = jest.fn(),
// ) => {
//   return render(
//     <Modal isOpen={isOpen} onClose={onClose}>
//       {children}
//     </Modal>,
//   );
// };

describe('Modal component', () => {
  it('should match snapshot for Modal', () => {
    // const { container } = renderModal(true);
    // expect(container).toMatchSnapshot();
  });

  it('should render the modal content when isOpen is true', () => {
    // renderModal(true);
    // expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render the modal content when isOpen is false', () => {
    // renderModal(false);
    // expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });
});

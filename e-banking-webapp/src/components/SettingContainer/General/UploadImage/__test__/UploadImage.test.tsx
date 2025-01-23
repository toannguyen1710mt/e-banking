import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UploadImage, IUploadImageProps } from '..';
import { useToastContext } from '@/context';
import { useUploadImage } from '@/hooks';
import { ERROR_MESSAGES } from '@/constants';

jest.mock('@/context', () => ({
  useToastContext: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useUploadImage: jest.fn(),
}));

describe('UploadImage Component', () => {
  const mockShowToast = jest.fn();
  const mockHandleUploadImage = jest.fn();

  let container: ReturnType<typeof render>;

  beforeEach(() => {
    (useToastContext as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
    (useUploadImage as jest.Mock).mockReturnValue({
      uploading: false,
      handleUploadImage: mockHandleUploadImage,
    });

    container = render(<UploadImage {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps: IUploadImageProps = {
    alt: 'Test Image',
    src: '',
    onChange: jest.fn(),
    onRemove: jest.fn(),
  };

  it('renders upload button when no image is present', () => {
    expect(container).toMatchSnapshot();
  });

  it('shows an error toast if the uploaded file type is invalid', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = container.getByTestId('upload');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.UPLOAD_IMAGE_ONLY_JPG_PNG,
        'error',
        'top-center',
      );
    });
  });

  it('shows an error toast if the uploaded file size exceeds 2MB', async () => {
    const largeFile = new File(
      ['a'.repeat(3 * 1024 * 1024)],
      'large-image.jpg',
      {
        type: 'image/jpeg',
      },
    );
    const input = screen.getByTestId('upload');

    fireEvent.change(input, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.UPLOAD_IMAGE_SIZE,
        'error',
        'top-center',
      );
    });
  });

  it('calls onChange and displays the uploaded image on valid upload', async () => {
    const mockUrl = 'http://example.com/test-image.jpg';
    mockHandleUploadImage.mockResolvedValue({ url: mockUrl });

    const validFile = new File(['image'], 'valid-image.jpg', {
      type: 'image/jpeg',
    });
    const input = screen.getByTestId('upload');

    fireEvent.change(input, { target: { files: [validFile] } });

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith(mockUrl);
      expect(screen.getByAltText('Test Image')).toBeInTheDocument();
    });
  });

  it('calls onRemove and clears the preview image when remove button is clicked', () => {
    render(<UploadImage {...defaultProps} src='test-image.jpg' />);

    const removeButton = screen.getByLabelText('delete-icon');

    fireEvent.click(removeButton);

    expect(defaultProps.onRemove).toHaveBeenCalled();
    expect(screen.queryByAltText('Test Image')).not.toBeInTheDocument();
  });

  it('calls handleButtonClick and triggers input file click', () => {
    render(<UploadImage {...defaultProps} />);

    const uploadButton = screen.getAllByLabelText('upload-image');
    const input = screen.getAllByTestId('upload');

    jest.spyOn(input[0], 'click');

    fireEvent.click(uploadButton[0]);

    expect(input[0].click).toHaveBeenCalled();
  });

  it('renders ImageIcon when uploading is true', () => {
    (useUploadImage as jest.Mock).mockReturnValue({
      uploading: true,
      handleUploadImage: mockHandleUploadImage,
    });

    render(<UploadImage {...defaultProps} />);

    expect(screen.getByLabelText('image-icon')).toBeInTheDocument();
  });
});

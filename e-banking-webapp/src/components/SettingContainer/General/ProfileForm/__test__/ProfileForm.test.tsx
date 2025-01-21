import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Actions
import { updateUser } from '@/actions';

// Context
import { useUserContext } from '@/context';

// Components
import { ProfileForm } from '..';

// Mock dependencies
jest.mock('@/actions');
jest.mock('@/context');

interface UploadImageProps {
  src: string;
  onChange: (newSrc: string) => void;
  onRemove: () => void;
}

jest.mock('@/components/SettingContainer/General/UploadImage', () => ({
  UploadImage: ({ src, onChange, onRemove }: UploadImageProps) => (
    <div>
      <input
        type='file'
        aria-label='upload-image'
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onChange('https://example.com/new-avatar.jpg');
          }
        }}
      />
      {src && (
        <button aria-label='remove-avatar-btn' onClick={onRemove}>
          Remove
        </button>
      )}
    </div>
  ),
}));

const mockUpdateSession = jest.fn();

(useUserContext as jest.Mock).mockReturnValue({
  updateSession: mockUpdateSession,
});

const mockUserProfile = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  phone: '1234567890',
  country: 'Test Country',
  avatar: 'https://example.com/avatar.jpg',
  documentId: '1234',
  provider: 'local',
  confirmed: true,
  blocked: false,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  role: 'user',
  publishedAt: '2023-01-01T00:00:00.000Z',
  postal: '12345',
  token: 'sample-token',
};

describe('ProfileForm component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    container = render(<ProfileForm userProfile={mockUserProfile} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders matching snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('handles avatar update correctly', async () => {
    const newAvatarUrl = 'https://example.com/new-avatar.jpg';
    (updateUser as jest.Mock).mockResolvedValue({ avatar: newAvatarUrl });

    const uploadImage = screen.getByLabelText('upload-image');

    fireEvent.change(uploadImage, {
      target: {
        files: [new File(['test'], 'test.png', { type: 'image/png' })],
      },
    });

    expect(updateUser).toHaveBeenCalledWith(1, { avatar: newAvatarUrl });

    waitFor(() => {
      expect(mockUpdateSession).toHaveBeenCalledWith(newAvatarUrl);
    });
  });

  it('handles avatar removal correctly', async () => {
    (updateUser as jest.Mock).mockResolvedValue({ avatar: '' });

    const removeButton = screen.getByLabelText('remove-avatar-btn');
    fireEvent.click(removeButton);

    expect(updateUser).toHaveBeenCalledWith(1, { avatar: '' });

    waitFor(() => {
      expect(mockUpdateSession).toHaveBeenCalledWith('');
    });
  });
});

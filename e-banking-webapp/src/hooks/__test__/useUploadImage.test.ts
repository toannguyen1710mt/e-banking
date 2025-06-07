// Libs
import { renderHook, act } from '@testing-library/react';

// Hooks
import { useUploadImage } from '@/hooks/useUploadImage';

global.fetch = jest.fn();

describe('useUploadImage', () => {
  it('should initially set uploading to false', () => {
    const { result } = renderHook(() => useUploadImage());

    expect(result.current.uploading).toBe(false);
  });

  it('should set uploading to true when uploading an image', async () => {
    const { result } = renderHook(() => useUploadImage());

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ success: true }),
    });

    const file = new File(['image content'], 'image.jpg', {
      type: 'image/jpeg',
    });

    await act(async () => {
      await result.current.handleUploadImage(file);
    });

    expect(result.current.uploading).toBe(false);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return an error when upload fails', async () => {
    const { result } = renderHook(() => useUploadImage());

    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network Error'),
    );

    const file = new File(['image content'], 'image.jpg', {
      type: 'image/jpeg',
    });

    await act(async () => {
      const resultError = await result.current.handleUploadImage(file);
      expect(resultError.error).toBeDefined();
      expect(resultError.error.message).toBe(
        'Error uploading image: Network Error',
      );
    });

    expect(result.current.uploading).toBe(false);
  });
});

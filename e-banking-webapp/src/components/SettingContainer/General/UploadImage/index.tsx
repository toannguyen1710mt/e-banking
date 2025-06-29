'use client';

import { Avatar } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';
import { Session } from 'next-auth';

// Hooks
import { useUploadImage } from '@/hooks';

// Utils
import { toastManager } from '@/utils';

// Components
import { Button, CameraIcon, ImageIcon, TrashIcon } from '@/components';
import { ERROR_MESSAGES, IMAGE_TYPES } from '@/constants';

export interface IUploadImageProps {
  height?: string;
  width?: string;
  alt: string;
  src?: string;
  name?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  session: Session;
}

export const UploadImage = ({
  alt,
  src,
  onChange,
  onRemove,
  session,
}: IUploadImageProps) => {
  const [previewImage, setPreviewImage] = useState(src);

  const { uploading, handleUploadImage } = useUploadImage(session.user.token);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = () => {
    onRemove?.();
    setPreviewImage('');
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      const isValidImage =
        file?.type === IMAGE_TYPES.JPEG || file?.type === IMAGE_TYPES.PNG;

      if (!isValidImage) {
        toastManager.showToast(
          ERROR_MESSAGES.UPLOAD_IMAGE_ONLY_JPG_PNG,
          'error',
          'top-center',
        );
      }

      const isLessThan2MB = file!.size / 1024 / 1024 < 1;

      if (!isLessThan2MB) {
        toastManager.showToast(
          ERROR_MESSAGES.UPLOAD_IMAGE_SIZE,
          'error',
          'top-center',
        );
      }

      if (file && isValidImage && isLessThan2MB) {
        const { url } = await handleUploadImage(file);

        return url;
      }
      return null;
    } catch (error) {
      toastManager.showToast(
        `${ERROR_MESSAGES.ERROR_UPLOAD_IMAGE} ${error}`,
        'error',
        'top-center',
      );
      return null;
    }
  };

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleChange(e);

      if (url) {
        onChange(url);
        setPreviewImage(url);
      }
    } catch (error) {
      toastManager.showToast(
        `${ERROR_MESSAGES.ERROR_UPLOAD_FILE} ${error}`,
        'error',
        'top-center',
      );
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className='flex items-center'>
      {!previewImage || uploading ? (
        <button
          aria-label='upload-image'
          type='button'
          onClick={handleButtonClick}
          className='mr-[27px] flex h-[112px] w-[112px] items-center justify-center rounded-full border-2 border-dashed border-primary-200 hover:border-primary-100 focus:outline-none'
        >
          {uploading ? <ImageIcon /> : <CameraIcon />}
        </button>
      ) : (
        <Avatar
          alt={alt}
          className='mr-[27px] h-[112px] w-[112px]'
          src={previewImage}
        />
      )}

      <label>
        <input
          name='upload'
          type='file'
          data-testid='upload'
          hidden
          style={{ display: 'none' }}
          accept='image/png, image/webp, image/jpeg'
          onChange={handleUploadFile}
          ref={inputRef}
        />
        <Button
          className='mr-[33px] border-primary-200 border-opacity-50'
          variant='outline'
          color='info'
          radius='xs'
          size='sm'
          onClick={handleButtonClick}
        >
          Upload
        </Button>
      </label>

      {previewImage && (
        <button
          aria-label='delete-icon'
          className='text-primary-200'
          onClick={handleRemoveImage}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

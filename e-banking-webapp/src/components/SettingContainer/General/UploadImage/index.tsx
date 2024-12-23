'use client';

import { Avatar } from '@nextui-org/react';
import { useRef, useState } from 'react';

// Components
import { Button, CameraIcon, TrashIcon } from '@/components';

export interface IUploadImageProps {
  height?: string;
  width?: string;
  alt: string;
  src?: string;
  name: string;
  onChange?: (name: string, url: string) => void;
  onRemove?: (name: string) => void;
}

export const UploadImage = ({
  alt,
  src,
  name,
  onRemove,
}: IUploadImageProps) => {
  const [previewImage, setPreviewImage] = useState(src);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = () => {
    onRemove?.(name);
    setPreviewImage('');
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Handle upload image
    console.log('handleUploadFile', e);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className='flex items-center'>
      {!previewImage ? (
        <button
          type='button'
          onClick={handleButtonClick}
          className='mr-[27px] flex h-[112px] w-[112px] items-center justify-center rounded-full border-2 border-dashed border-primary-200 hover:border-primary-100 focus:outline-none'
        >
          <CameraIcon />
        </button>
      ) : (
        <Avatar alt={alt} className='mr-[27px] h-[112px] w-[112px]' src={src} />
      )}

      <label>
        <input
          name='upload'
          type='file'
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

      <button className='text-primary-200' onClick={handleRemoveImage}>
        <TrashIcon />
      </button>
    </div>
  );
};

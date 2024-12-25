'use client';

import { useState } from 'react';

// Services
import { API_END_POINT } from '@/services';

export const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);

  const handleUploadImage = async (selectedFile: File | null) => {
    try {
      setUploading(true);
      let uploadResponse: Response;
      let result;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        uploadResponse = await fetch(`${API_END_POINT}/upload}`, {
          method: 'POST',
          body: formData,
        });

        result = await uploadResponse.json();

        setUploading(false);
        return result;
      }
    } catch (error) {
      setUploading(false);

      return {
        error: new Error(`Error uploading image: ${(error as Error).message}`),
      };
    }
  };

  return { uploading, handleUploadImage };
};

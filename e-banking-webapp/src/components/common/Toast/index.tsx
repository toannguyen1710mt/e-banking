'use client';

// Libs
import { Card } from '@nextui-org/react';

// Components
import { Text } from '@/components';
import { useEffect, useState } from 'react';
import { toastStore } from '@/utils';

interface IToast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  position: keyof typeof TOAST_POSITIONS;
}

const TOAST_BACKGROUNDS = {
  success: 'bg-success',
  error: 'bg-danger',
  info: 'bg-blue-500',
};

const TOAST_POSITIONS = {
  'top-right': 'top-5 right-5',
  'top-left': 'top-5 left-5',
  'top-center': 'top-5 left-1/2 transform -translate-x-1/2',
  'bottom-right': 'bottom-5 right-5',
  'bottom-left': 'bottom-5 left-5',
  'bottom-center': 'bottom-5 left-1/2 transform -translate-x-1/2',
};

export const Toast = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  useEffect(() => {
    const handleShowToast = (toast: IToast) => {
      setToasts((prev) => [...prev, toast]);
    };

    const handleRemoveToast = (id: number) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    toastStore.on('show', handleShowToast);
    toastStore.on('remove', handleRemoveToast);

    return () => {
      toastStore.off('show', handleShowToast);
      toastStore.off('remove', handleRemoveToast);
    };
  }, []);

  return (
    <>
      {Object.keys(TOAST_POSITIONS).map((position) => (
        <div
          key={position}
          className={`fixed ${TOAST_POSITIONS[position as keyof typeof TOAST_POSITIONS]} z-50 space-y-2`}
        >
          {toasts
            .filter((toast) => toast.position === position)
            .map((toast) => {
              return (
                <Card
                  isPressable={true}
                  role='alert'
                  key={toast.id}
                  className={`w-64 cursor-pointer flex-row items-center gap-4 rounded-md px-4 py-3 shadow-md ${TOAST_BACKGROUNDS[toast.type ?? 'success']}`}
                  onPress={() => toastStore.emit('remove', toast.id)}
                >
                  <Text className='text-sm !text-foreground-200'>
                    {toast.message}
                  </Text>
                </Card>
              );
            })}
        </div>
      ))}
    </>
  );
};

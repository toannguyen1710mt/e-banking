// Libs
import { useContext } from 'react';

// Context
import { ToastContext } from '@/context';

export const useToastContext = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return toastContext;
};

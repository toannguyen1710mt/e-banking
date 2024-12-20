'use client';

// Libs
import { createContext, useState, ReactNode, useContext } from 'react';

// Interfaces
import { ToastType, Toast, ToastPosition } from '@/interfaces';

type ToastContextType = {
  toasts: Toast[];
  showToast: (
    message: string,
    type?: ToastType,
    position?: ToastPosition,
    timeOut?: number,
  ) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const showToast = (
    message: string,
    type: ToastType = 'success',
    position: ToastPosition = 'top-right',
    timeOut = 5000,
  ) => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type, position }]);
    setTimeout(() => removeToast(id), timeOut);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return toastContext;
};

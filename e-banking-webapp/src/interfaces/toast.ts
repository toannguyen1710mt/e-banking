export interface Toast {
  id: number;
  message: string;
  type?: ToastType;
  position?: ToastPosition;
}

export type ToastType = 'success' | 'error' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

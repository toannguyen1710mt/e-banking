import { ToastPosition, ToastType } from '@/interfaces';
import EventEmitter from 'events';

class ToastManager extends EventEmitter {
  showToast(
    message: string,
    type: ToastType = 'success',
    position: ToastPosition = 'top-right',
    timeOut = 3000,
  ) {
    const id = Date.now();
    this.emit('show', { id, message, type, position });

    setTimeout(() => {
      this.emit('remove', id);
    }, timeOut);
  }
}

export const toastManager = new ToastManager();

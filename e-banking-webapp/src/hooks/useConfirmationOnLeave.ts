import { useCallback, useEffect } from 'react';

// Constants
import { MESSAGE } from '@/constants';

export const useConfirmationOnLeave = (
  hasChanges?: boolean,
  isDirty?: boolean,
) => {
  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (hasChanges || isDirty) {
        const confirmationMessage = MESSAGE.CONFIRM_LEAVING;
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    },
    [hasChanges, isDirty],
  );

  const handleLinkClick = useCallback(
    (event: MouseEvent) => {
      if (hasChanges || isDirty) {
        const confirmationMessage = MESSAGE.CONFIRM_LEAVING;
        if (!window.confirm(confirmationMessage)) {
          event.preventDefault();
        }
      }
    },
    [hasChanges, isDirty],
  );

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.querySelectorAll('a').forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, [handleBeforeUnload, handleLinkClick]);
};

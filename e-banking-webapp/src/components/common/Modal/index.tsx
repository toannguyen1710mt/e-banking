'use client';

// Libs
import { ReactNode } from 'react';
import {
  Modal as ModalNextUI,
  ModalContent,
  ModalProps as ModalPropsNextUI,
  cn,
} from '@nextui-org/react';

// Components
import { CloseIcon, Button } from '@/components';

interface ModalProps extends ModalPropsNextUI {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  placement?:
    | 'center'
    | 'top-center'
    | 'bottom-center'
    | 'auto'
    | 'top'
    | 'bottom';
}

export const Modal = ({
  isOpen,
  children,
  onClose,
  placement,
  classNames,
  ...modalProps
}: ModalProps) => (
  <ModalNextUI
    isOpen={isOpen}
    onClose={onClose}
    placement={placement}
    scrollBehavior='outside'
    closeButton={
      <Button>
        <CloseIcon />
      </Button>
    }
    classNames={{
      base: cn('p-4 !my-auto', 'rounded-lg', classNames?.base),
      closeButton: cn(
        'bg-transparent',
        'max-h-none min-w-[20px] w-[20x]',
        'text-foreground-200 ',
        'justify-end',
        'hover:bg-transparent data-[focus=true]:bg-transparent',
        classNames?.closeButton,
      ),
    }}
    {...modalProps}
  >
    <ModalContent>{children}</ModalContent>
  </ModalNextUI>
);

import { CustomClassType } from '@/interfaces';

export const ChevronRightIcon = ({ customClass }: CustomClassType) => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 18 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={customClass}
  >
    <path
      d='M9.75 12.75L13.5 9L9.75 5.25'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M4.5 12.75L8.25 9L4.5 5.25'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

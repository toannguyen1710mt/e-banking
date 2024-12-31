import { CustomClassType } from '@/interfaces';

export const StatusIndicator = ({ customClass }: CustomClassType) => (
  <svg
    width='6'
    height='6'
    viewBox='0 0 6 6'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={customClass}
  >
    <circle cx='3' cy='3' r='3' fill='currentColor' />
  </svg>
);

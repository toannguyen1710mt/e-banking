import { ImageIcon } from '@/components/icons';

export const ImageSkeleton = () => (
  <div
    role='status'
    className='animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0 rtl:space-x-reverse'
  >
    <div className='flex h-64 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-96'>
      <ImageIcon customClass='w-16 h-16' />
    </div>
  </div>
);

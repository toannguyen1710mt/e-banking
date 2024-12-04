import Image from 'next/image';
import Link from 'next/link';

// Constants
import { ROUTES } from '@/constants';

export const NotFound = () => (
  <div className='flex w-[612px] flex-col items-center justify-center'>
    <Image
      src={'/images/404.webp'}
      width={612}
      height={354}
      alt='404 Error Image'
    />

    <Link
      href={ROUTES.HOME}
      className='h-10 w-[168px] rounded-3xl border-transparent bg-primary-100 py-3 text-center text-xs font-semibold text-foreground-200'
    >
      Back to Home
    </Link>
  </div>
);

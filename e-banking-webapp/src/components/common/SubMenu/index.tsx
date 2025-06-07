'use client';

// Libs
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants
import { SIDEBAR_LIST } from '@/constants';

export const SubMenu = () => {
  const pathName = usePathname();

  return (
    <nav className='hidden border-b border-primary-200 border-opacity-50 pb-4 pl-8 max-[800px]:block'>
      <ul className='flex gap-8'>
        {SIDEBAR_LIST?.map(({ href, label, Icon }) => {
          const liStyles = pathName === href ? 'font-semibold' : '';

          return (
            <li key={label} className={`${liStyles}`}>
              <Link
                href={href}
                className={`flex w-full items-center justify-start gap-3 border-none text-sm`}
              >
                <Icon />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

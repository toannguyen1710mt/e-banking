'use client';

// Libs
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants
import { SIDEBAR_LIST } from '@/constants';

export const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className='h-screen w-[195px] border-r-1 border-primary-200 border-opacity-50 px-[14px] pt-3 max-[800px]:hidden'>
      <ul className='cursor-pointer'>
        {SIDEBAR_LIST?.map(({ href, label, Icon }) => {
          const liStyles =
            pathName === href ? 'bg-foreground-300 bg-opacity-10' : '';

          return (
            <li
              key={label}
              className={`mt-3 w-[167px] rounded-[6px] border-none py-2 pl-3 ${liStyles}`}
            >
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
    </aside>
  );
};

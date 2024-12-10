'use client';

// Libs
import { NavbarItem as NavbarItemNextUI } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface INavbar {
  navbarItem: { text: string; path: string }[];
}

export const Navbar = ({ navbarItem }: INavbar) => {
  const pathname = usePathname();

  return (
    <>
      {navbarItem.map(({ text, path }) => {
        const activeClass =
          pathname === path ? 'font-bold text-black' : 'text-gray-500';

        return (
          <NavbarItemNextUI key={text}>
            <Link href={path} className={activeClass}>
              {text}
            </Link>
          </NavbarItemNextUI>
        );
      })}
    </>
  );
};

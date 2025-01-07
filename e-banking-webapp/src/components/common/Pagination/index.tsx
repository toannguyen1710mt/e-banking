'use client';

// Libs
import {
  extendVariants,
  Pagination as PaginationNextUI,
} from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Utils
import { updateSearchParams } from '@/utils';

export const CustomPagination = extendVariants(PaginationNextUI, {
  variants: {
    styles: {
      primary: {
        wrapper: 'gap-2',
        prev: 'bg-background-500 text-foreground-100 shadow-md',
        next: 'bg-background-500 text-foreground-100 shadow-md',
        item: 'text-foreground-100 bg-background-500 shadow-md hover:bg-opacity-25',
      },
    },
  },
  defaultVariants: {
    styles: 'primary',
    radius: 'sm',
  },
});

interface IPaginationProps {
  currentPage: number;
  totalPage: number;
}

export const Pagination = ({ currentPage, totalPage }: IPaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    const params = updateSearchParams(searchParams, { page: String(page) });

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <CustomPagination
      total={totalPage}
      page={currentPage}
      onChange={handlePageChange}
      color='primary'
      showControls
      className='flex justify-center'
    />
  );
};

// Components
import { ServiceCardSkeleton } from '@/components';

export const ServiceCardListSkeleton = () => (
  <div className='grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-5'>
    {Array.from({ length: 5 }, (_, index) => (
      <ServiceCardSkeleton key={index} />
    ))}
  </div>
);

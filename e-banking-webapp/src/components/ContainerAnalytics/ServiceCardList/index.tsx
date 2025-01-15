// Mocks
import { SERVICE_CARD } from '@/mocks';

// Components
import { ServiceCard } from '@/components';

export const ServiceCardList = () => (
  <div className='grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-5'>
    {SERVICE_CARD.map(({ icon, title, amount }, index) => (
      <ServiceCard key={index} icon={icon} title={title} amount={amount} />
    ))}
  </div>
);

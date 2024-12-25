import { ServiceCard } from '@/components/ServiceCard';
import { SERVICE_CARD } from '@/mocks';

export const ServiceCardList = () => (
  <div className='flex justify-between gap-[26px]'>
    {SERVICE_CARD.map(({ icon, title, amount }, index) => (
      <ServiceCard key={index} icon={icon} title={title} amount={amount} />
    ))}
  </div>
);

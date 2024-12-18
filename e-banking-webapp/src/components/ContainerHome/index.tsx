import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

export const ContainerHomepage = () => (
  <div className='flex h-screen w-full gap-8 px-6 pt-6'>
    <div className='w-1/4'>
      <Sidebar />
    </div>

    <div className='w-3/4'>
      <MainContent />
    </div>
  </div>
);

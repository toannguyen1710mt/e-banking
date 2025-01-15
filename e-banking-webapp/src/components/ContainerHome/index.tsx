import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

export const ContainerHomepage = () => (
  <div className='flex w-full flex-col gap-8 xl:flex-row'>
    <div className='xl:w-[290px]'>
      <div className='xl:top-5.5 xl:fixed xl:h-screen xl:w-[290px]'>
        <Sidebar />
      </div>
    </div>

    <div className='grow'>
      <MainContent />
    </div>
  </div>
);

import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

export const ContainerHomepage = () => (
  <div className='mt-3 flex w-full gap-8'>
    <div className='w-[290px]'>
      <div className='top-5.5 fixed h-screen w-[290px]'>
        <Sidebar />
      </div>
    </div>

    <div className='grow'>
      <MainContent />
    </div>
  </div>
);

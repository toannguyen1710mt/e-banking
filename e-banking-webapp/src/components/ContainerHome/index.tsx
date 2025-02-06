import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

export const ContainerHomepage = () => (
  <div className='hide-scrollbar flex h-screen w-full flex-col gap-8 xl:flex-row'>
    <div className='h-full xl:w-[290px]'>
      <div className='hide-scrollbar flex h-full flex-col xl:w-[290px] xl:overflow-y-auto'>
        <Sidebar />
      </div>
    </div>

    <div className='hide-scrollbar h-full grow xl:overflow-y-auto'>
      <MainContent />
    </div>
  </div>
);

import { Sidebar, SubMenu } from '@/components';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex w-full'>
      <Sidebar />
      <div className='w-full pt-6'>
        <SubMenu />
        {children}
      </div>
    </div>
  );
}

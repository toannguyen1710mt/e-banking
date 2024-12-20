import { Sidebar } from '@/components';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex w-full'>
      <Sidebar />
      <div className='w-full pl-8 pt-6'>{children}</div>
    </div>
  );
}

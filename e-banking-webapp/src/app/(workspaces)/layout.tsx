import { HeaderAuth } from '@/layouts';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex w-full flex-col'>
      <HeaderAuth />
      <div className='w-full'>{children}</div>
    </div>
  );
}

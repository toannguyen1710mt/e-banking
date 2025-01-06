import { HeaderAuth, WrapperWorkspaces } from '@/layouts';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-full w-full flex-col'>
      <HeaderAuth />
      <WrapperWorkspaces>{children}</WrapperWorkspaces>
    </div>
  );
}

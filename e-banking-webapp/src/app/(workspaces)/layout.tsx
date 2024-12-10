import { Header } from '@/layouts/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workspaces',
  description: 'Showcase of meta Workspaces',
};

export default function WorkspacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

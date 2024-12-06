const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <div className='flex h-screen flex-row'>
    <div className='flex flex-1 flex-col px-[83px] pb-10 pt-[87px]'>
      {children}
    </div>
    <div className='flex-1 px-[37px] py-9'>slider</div>
  </div>
);

export default AuthLayout;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-full flex-col items-center justify-center">
        {children}
      </div>
      {/* <div className="h-20 bg-amber-200 flex justify-center items-center">
        Footer Test
      </div> */}
    </>
  );
}

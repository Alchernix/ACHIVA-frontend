import Footer from "@/components/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-dvh flex items-center justify-center">
        {children}
      </div>
      <Footer />
    </>
  );
}

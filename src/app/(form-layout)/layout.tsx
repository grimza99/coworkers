import '@/app/globals.css';

export default function FormPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className="mx-4 mt-6 w-full max-w-115 md:mx-6 md:mt-25 lg:mt-35">{children}</div>
    </div>
  );
}

import '@/app/globals.css';

export default function FormPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="-mt-6 flex justify-center">
      <div className="mt-6 w-full max-w-115 min-w-[343px] md:mx-6 md:mt-25 lg:mt-35">
        {children}
      </div>
    </div>
  );
}

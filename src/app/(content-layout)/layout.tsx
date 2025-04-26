import '@/app/globals.css';

export default function ContentPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className="relative mx-4 mt-6 w-full max-w-300 min-w-[343px] md:mx-6">{children}</div>
    </div>
  );
}

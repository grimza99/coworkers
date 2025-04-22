import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Coworkers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex justify-center">
          <div className="mx-4 mt-6 flex h-dvh w-full max-w-115 min-w-[343px] justify-center md:mx-6 md:mt-25 lg:mt-35">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

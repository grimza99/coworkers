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
          <div className="mx-4 mt-6 h-dvh w-full max-w-300 min-w-[343px] sm:mx-4 md:mx-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

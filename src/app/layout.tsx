import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/gnb/Header';

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
        <Header />
        {children}
      </body>
    </html>
  );
}

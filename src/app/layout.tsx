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
      <body className="flex min-h-screen flex-col">
        <Header />
        <div>{children}</div>
        <div id="modal-container"></div>
      </body>
    </html>
  );
}

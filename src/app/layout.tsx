import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/gnb/Header';
import { ModalProvider } from '@/components/common/modal';

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
        <ModalProvider>
          <Header />
          <div className="h-full flex-1 overflow-y-auto">{children}</div>
          <div id="modal-container"></div>
        </ModalProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/gnb/Header';
import { ModalProvider } from '@/components/common/modal';
import ToastProvider from '@/components/common/Toastify/ToasProvider';

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
          <ToastProvider>{children}</ToastProvider>
          <div id="modal-container"></div>
        </ModalProvider>
      </body>
    </html>
  );
}

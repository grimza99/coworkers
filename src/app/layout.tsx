import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/gnb/Header';
import ToastProvider from '@/components/common/Toastify/ToasProvider';
import { UserProvider } from '@/contexts/UserContext';
import { ModalProvider } from '@/contexts/ModalContext';

export const metadata: Metadata = {
  title: 'Coworkers',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex h-screen flex-col overflow-hidden">
        <ModalProvider>
          <UserProvider>
            <ToastProvider>
              <Header />
              <div id="scroll-container" className="flex-1 overflow-y-auto">
                {children}
              </div>
              <div>{modal}</div>
              <div id="modal-container"></div>
            </ToastProvider>
          </UserProvider>
        </ModalProvider>
      </body>
    </html>
  );
}

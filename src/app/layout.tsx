import type { Metadata } from 'next';
import './globals.css';

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
        {children}
        <div id="modal"></div>
      </body>
    </html>
  );
}

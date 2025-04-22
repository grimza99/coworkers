'use client';
import { useEffect } from 'react';
import clsx from 'clsx';

export default function ModalOverlay({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<'div'>) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-md transition',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}

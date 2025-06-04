'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface OverlayProps extends React.ComponentProps<'div'> {
  disableOverlayClose?: boolean;
}

export default function Overlay({
  disableOverlayClose = false,
  onClick,
  className,
  children,
  ...props
}: OverlayProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !disableOverlayClose) {
      onClick?.(e);
      router.back();
    }
  };

  useEffect(function lockBodyScroll() {
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

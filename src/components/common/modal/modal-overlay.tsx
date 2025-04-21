'use client';
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

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}

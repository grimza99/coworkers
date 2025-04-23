'use client';
import useModalContext from '@/components/common/modal/useModalContext';

export default function ModalTrigger({
  onClick,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  const { openModal } = useModalContext();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    openModal();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

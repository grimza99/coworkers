'use client';
import useModalContext from '@/components/common/modal/core/useModalContext';

interface ModalTriggerProps extends React.ComponentProps<'button'> {
  modalId: string;
}

export default function ModalTrigger({ modalId, onClick, children, ...props }: ModalTriggerProps) {
  const { openModal } = useModalContext();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    openModal(modalId);
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

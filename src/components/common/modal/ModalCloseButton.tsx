'use client';
import Image from 'next/image';
import clsx from 'clsx';
import xIcon from '@/../public/icons/x-icon.svg';
import useModalContext from '@/components/common/modal/useModalContext';

export default function ModalCloseButton({
  className,
  onClick,
  ...props
}: React.ComponentProps<'button'>) {
  const { closeModal } = useModalContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    closeModal();
  };

  return (
    <button className={clsx('absolute top-4 right-4', className)} onClick={handleClick} {...props}>
      {/* @TODO: 상태 변경(:hover, :active, ...) 시 색상 변경 추가 */}
      <Image width={24} height={24} alt="x" src={xIcon} />
    </button>
  );
}

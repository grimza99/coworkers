'use client';
import Image from 'next/image';
import clsx from 'clsx';
import xIcon from '@/../public/icons/x-icon.svg';

export default function ModalCloseButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button className={clsx('absolute top-4 right-4', className)} {...props}>
      {/* @TODO: 상태 변경(:hover, :active, ...) 시 색상 변경 추가 */}
      <Image width={24} height={24} alt="x" src={xIcon} />
    </button>
  );
}

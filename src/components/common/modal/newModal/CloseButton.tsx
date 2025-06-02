'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function ModalCloseButton({
  className,
  onClick,
  ...props
}: React.ComponentProps<'button'>) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    router.back();
  };

  return (
    <button className={clsx('absolute top-4 right-4', className)} onClick={handleClick} {...props}>
      <Image width={24} height={24} alt="x" src={'/icons/x-icon.svg'} />
    </button>
  );
}

import clsx from 'clsx';

export default function ModalContent({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={clsx('w-70', className)} {...props}>
      {children}
    </div>
  );
}

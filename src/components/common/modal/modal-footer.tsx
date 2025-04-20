import clsx from 'clsx';

export default function ModalFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={clsx('flex justify-center gap-2', className)} {...props}>
      {children}
    </div>
  );
}

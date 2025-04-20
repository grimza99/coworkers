import clsx from 'clsx';

export default function ModalContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'bg-bg200 h-fit w-full rounded-t-xl pb-8 md:w-fit md:rounded-b-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

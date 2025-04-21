import clsx from 'clsx';

export default function ModalContainer({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'bg-bg200 relative h-fit w-full rounded-t-xl py-8 md:w-fit md:rounded-b-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

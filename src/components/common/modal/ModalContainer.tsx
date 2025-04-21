import clsx from 'clsx';

export default function ModalContainer({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'bg-bg200 relative h-fit w-full rounded-t-xl px-5 py-8 md:w-fit md:rounded-b-xl md:px-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

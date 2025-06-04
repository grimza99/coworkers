import clsx from 'clsx';

export default function Footer({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={clsx('flex justify-center gap-2', className)} {...props}>
      {children}
    </div>
  );
}

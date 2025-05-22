'use client';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/spinner';
import PATHS from '@/constants/paths';

export default function StartButton({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  const { memberships, isLoading } = useUser();

  if (isLoading) {
    return (
      <Button variant="gradient" fontSize="16" size="xl" className={className} {...props} disabled>
        <Spinner className="flex size-6 items-center justify-center" />
      </Button>
    );
  }

  let determinedHref: string;

  if (!memberships) {
    determinedHref = PATHS.LOGIN;
  } else if (memberships.length === 0) {
    determinedHref = PATHS.NOGROUP;
  } else if (memberships[0].group.id) {
    determinedHref = PATHS.getGroupPath(memberships[0].group.id);
  } else {
    determinedHref = PATHS.LOGIN;
  }

  return (
    <Link href={determinedHref}>
      <Button variant="gradient" fontSize="16" size="xl" className={className} {...props}>
        {children}
      </Button>
    </Link>
  );
}

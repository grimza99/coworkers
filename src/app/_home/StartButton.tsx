'use client';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import Button from '@/components/common/Button';
import BouncingDots from '@/components/common/loading/BouncingDots';
import PATHS from '@/constants/paths';

export default function StartButton({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  const { memberships, isLoading } = useUser();

  if (isLoading) {
    return (
      <Button variant="gradient" fontSize="16" size="xl" className={className} disabled>
        <BouncingDots size={10} />
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
    <Link href={determinedHref} className={className}>
      <Button variant="gradient" fontSize="16" size="xl" {...props}>
        {children}
      </Button>
    </Link>
  );
}

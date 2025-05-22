'use client';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/loading/Spiner';
import PATHS from '@/constants/paths';

export default function StartButton({ className, children }: React.ComponentProps<'button'>) {
  const { memberships, isLoading } = useUser();

  if (isLoading) {
    return (
      <Button variant="gradient" fontSize="16" size="xl" className={className} disabled>
        <Spinner className="flex size-6 items-center justify-center" />
      </Button>
    );
  }

  const determinedHref =
    memberships && memberships.length > 0 && memberships[0]?.group?.id
      ? PATHS.getGroupPath(memberships[0].group.id)
      : PATHS.LOGIN;

  return (
    <Link href={determinedHref} className={className}>
      <Button variant="gradient" fontSize="16" size="xl">
        {children}
      </Button>
    </Link>
  );
}

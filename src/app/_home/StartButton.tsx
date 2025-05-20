'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import Button from '@/components/common/Button';
import PATHS from '@/constants/paths';

export default function StartButton({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  const { memberships } = useUser();
  const [href, setHref] = useState('');

  useEffect(() => {
    if (memberships !== null && memberships[0] !== null) {
      setHref(`${PATHS.getGroupPath(memberships[0].group.id)}`);
    } else {
      setHref(`${PATHS.LOGIN}`);
    }
  }, [setHref, memberships]);

  return (
    <Link href={href}>
      <Button variant="gradient" fontSize="16" size="xl" className={className} {...props}>
        {children}
      </Button>
    </Link>
  );
}

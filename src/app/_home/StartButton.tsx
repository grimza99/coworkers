'use client';
import Link from 'next/link';
import PATHS from '@/constants/paths';

export default function StartButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  // @TODO: 사용자의 로그인 상태 데이터를 가져오는 로직 필요
  const isLoggedIn = false;
  // @TODO: 사용자의 그룹(팀) 데이터를 가져오는 로직 필요
  const userTeam = [{ id: 123 }, { id: 456 }];

  const href = isLoggedIn ? `${PATHS.getTeamPath(userTeam[0].id)}` : `${PATHS.LOGIN}`;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

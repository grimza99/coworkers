'use client';
import PATHS from '@/constants/paths';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const handleClick = () => {
    const href = isLoggedIn ? `${PATHS.getTeamPath(userTeam[0].id)}` : `${PATHS.LOGIN}`;
    router.push(href);
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

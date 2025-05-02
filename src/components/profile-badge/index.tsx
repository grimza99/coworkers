import Image from 'next/image';
import clsx from 'clsx';
import profileIcon from '@/../public/icons/profile-icon.svg';
import { User } from '@/types/user';

export interface ProfileBadgeProps {
  user: User;
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
}

export default function ProfileBadge({
  user,
  width = 32,
  height = 32,
  className = '',
}: ProfileBadgeProps) {
  return (
    <div className={clsx(`flex shrink-0 items-center gap-3`, className)}>
      {/* @TODO: user.image값에 따라 기본 프로필 이미지 렌더링 결정 */}
      <Image width={width} height={height} src={profileIcon} alt="기본 사용자 이미지" />
      <div className="text-md-md">{user.nickname}</div>
    </div>
  );
}

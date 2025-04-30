import Image from 'next/image';
import clsx from 'clsx';
import profileIcon from '@/../public/icons/profile-icon.svg';

// @FIXME: User 타입은 여기저기 쓰이는 타입인데, 어디에 정리해놓으면 좋을까요?
export interface User {
  id: number;
  nickname: string;
  image: string;
}

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

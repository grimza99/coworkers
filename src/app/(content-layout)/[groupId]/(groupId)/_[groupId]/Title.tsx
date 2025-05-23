'use client';
import PATHS from '@/constants/paths';
import { useUser } from '@/contexts/UserContext';
import { Group } from '@/types/group';
import { Member } from '@/types/user';
import Image from 'next/image';
import Link from 'next/link';

type TitleProps = {
  groupId: Group['id'];
  name: Group['name'];
  admin: Member;
};

export default function Title({ admin, groupId, name }: TitleProps) {
  const { user } = useUser();
  const isUserAdmin = admin.userId === user?.id;

  return (
    <div className="border-gray100/10 bg-gray100/10 relative flex h-16 w-full items-center justify-between rounded-xl border-1 px-6 py-5">
      <h1 className="text-xl-bold text-white">{name}</h1>
      <Image
        src={'/images/group-thumbnail.png'}
        width={543}
        height={192}
        alt="그룹 기본 이미지"
        className="absolute right-1/4 h-16 w-auto object-contain select-none md:right-20"
      />
      {isUserAdmin && (
        <Link href={`${groupId}${PATHS.EDITGROUP}`}>
          <Image
            src="/icons/gear-icon.svg"
            width={24}
            height={24}
            alt="톱니바퀴 아이콘"
            className="size-6"
          />
        </Link>
      )}
    </div>
  );
}

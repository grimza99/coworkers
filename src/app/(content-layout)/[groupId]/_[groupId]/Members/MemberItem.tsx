import profileIcon from '@/../public/icons/profile-icon.svg';
import xIcon from '@/../public/icons/x-icon.svg';
import { Member } from '@/types/user';
import Image from 'next/image';

type MemberItemProps = {
  member: Member;
};

export default function MemberItem({ member }: MemberItemProps) {
  const { userName, userImage, userEmail } = member;
  return (
    <li className="bg-bg200 flex items-center justify-between gap-1.5 rounded-2xl px-4 py-3 md:px-6 md:py-5">
      <div className="flex items-center gap-3">
        <div className="hidden md:block md:size-8">
          {userImage ?? (
            <Image
              width={24}
              height={24}
              src={profileIcon}
              alt="기본 프로필 이미지"
              className="size-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="block size-6 md:hidden">
              {userImage ?? (
                <Image
                  width={24}
                  height={24}
                  src={profileIcon}
                  alt="기본 프로필 이미지"
                  className="size-full"
                />
              )}
            </div>
            <div className="text-sm-md overflow-ellipsis">{userName}</div>
          </div>
          <div className="text-xs-rg text-gray300 overflow-ellipsis">{userEmail}</div>
        </div>
      </div>
      {/* @TODO: 멤버 삭제 기능 추가 */}
      <Image width={24} height={24} src={xIcon} alt="멤버 삭제" className="size-4" />
    </li>
  );
}

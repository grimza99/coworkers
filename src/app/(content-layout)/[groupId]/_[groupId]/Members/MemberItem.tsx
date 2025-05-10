import Image from 'next/image';
import xIcon from '@/../public/icons/x-icon.svg';
import profileIcon from '@/../public/icons/profile-icon.svg';
import MemberDetailModal from '@/app/(content-layout)/[groupId]/_[groupId]/Members/MemberDetailModal';
import MemberRemovalModal from '@/app/(content-layout)/[groupId]/_[groupId]/Members/MemberRemovalModal';
import { ModalTrigger } from '@/components/common/modal';
import { Member } from '@/types/user';

type MemberItemProps = {
  member: Member;
  setOptimisticMembers: (action: number) => void;
};

export default function MemberItem({ member, setOptimisticMembers }: MemberItemProps) {
  const { userId, userName, userImage, userEmail, role } = member;
  const memberDetailModalId = `${userId}-detail`;
  const memberRemovalModalId = `${userId}-removal`;

  return (
    <>
      <li className="bg-bg200 flex items-center justify-between gap-1.5 rounded-2xl px-4 py-3 md:px-6 md:py-5">
        <ModalTrigger modalId={memberDetailModalId}>
          <div className="flex min-w-0 items-center gap-3">
            <MemberProfileImage
              userImage={userImage}
              className="hidden shrink-0 md:block md:size-8"
            />
            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <MemberProfileImage
                  userImage={userImage}
                  className="block size-6 shrink-0 md:hidden"
                />
                <div className="text-sm-md truncate">{userName}</div>
              </div>
              <div className="text-xs-rg text-gray300 truncate">{userEmail}</div>
            </div>
          </div>
        </ModalTrigger>
        {role === 'MEMBER' && (
          <ModalTrigger modalId={memberRemovalModalId}>
            <Image width={24} height={24} src={xIcon} alt="멤버 삭제" className="size-4" />
          </ModalTrigger>
        )}
      </li>

      <MemberDetailModal modalId={memberDetailModalId} member={member} />
      <MemberRemovalModal
        modalId={memberRemovalModalId}
        member={member}
        setOptimisticMembers={setOptimisticMembers}
      />
    </>
  );
}

type MemberProfileImageProps = {
  userImage: Member['userImage'];
  className: string;
};

function MemberProfileImage({ userImage, className }: MemberProfileImageProps) {
  return (
    <div className={className}>
      {userImage ? (
        <img src={userImage} className="rounded-full" />
      ) : (
        <Image
          width={24}
          height={24}
          src={profileIcon}
          alt="기본 프로필 이미지"
          className="size-full"
        />
      )}
    </div>
  );
}

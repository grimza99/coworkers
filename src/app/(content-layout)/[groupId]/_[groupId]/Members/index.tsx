'use client';
import MemberItem from '@/app/(content-layout)/[groupId]/_[groupId]/Members/MemberItem';
import MemberInvitationModal from '@/app/(content-layout)/[groupId]/_[groupId]/Members/MemberInvitationModal';
import { ModalTrigger } from '@/components/common/modal';
import { Member } from '@/types/user';
import { Group } from '@/types/group';
import { useOptimistic, useState } from 'react';
import MemberRemovalModal from './MemberRemovalModal';
import MemberDetailModal from './MemberDetailModal';

type MembersProps = {
  groupId: Group['id'];
  members: Member[];
};

export default function Members({ groupId, members }: MembersProps) {
  const [optimisticMembers, setOptimisticMembers] = useOptimistic(
    members,
    (currentMembers: Member[], userId: number) =>
      currentMembers.filter((member) => member.userId !== userId)
  );
  const memberCount = optimisticMembers.length;
  const memberInvitationModalId = `memberInvitation-${groupId}`;
  const [memberForDetail, setMemberForDetail] = useState<Member | null>(null);
  const [memberForRemoval, setMemberForRemoval] = useState<Member | null>(null);
  const memberDetailModalId = `memberDetail-${memberForDetail}`;
  const memberRemovalModalId = `memberRemoval-${memberForRemoval}`;

  return (
    <>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg-md">
            멤버 <span className="text-lg-rg text-gray500">({memberCount}명)</span>
          </h2>
          <ModalTrigger className="text-primary" modalId={memberInvitationModalId}>
            + 새로운 멤버 초대하기
          </ModalTrigger>
        </div>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {optimisticMembers.map((member) => (
            <MemberItem
              key={member.userId}
              member={member}
              memberDetailModalId={memberDetailModalId}
              memberRemovalModalId={memberRemovalModalId}
              setMemberForDetail={setMemberForDetail}
              setMemberForRemoval={setMemberForRemoval}
            />
          ))}
        </ul>
      </section>

      <MemberInvitationModal modalId={memberInvitationModalId} groupId={groupId} />

      {memberForDetail && (
        <MemberDetailModal modalId={memberDetailModalId} member={memberForDetail} />
      )}

      {memberForRemoval && (
        <MemberRemovalModal
          setOptimisticMembers={setOptimisticMembers}
          member={memberForRemoval}
          modalId={memberRemovalModalId}
        />
      )}
    </>
  );
}

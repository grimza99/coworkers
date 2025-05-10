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
  const memberInvitationModalId = `${groupId}-memberInvitation`;
  const [selectedMemberToSeeDetail, setSelectedMemberToSeeDetail] = useState<Member | null>(null);
  const [selectedMemberToBeDeleted, setSelectedMemberToBeDeleted] = useState<Member | null>(null);

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
              setSelectedMemberToSeeDetail={setSelectedMemberToSeeDetail}
              setSelectedMemberToBeDeleted={setSelectedMemberToBeDeleted}
            />
          ))}
        </ul>
      </section>

      <MemberInvitationModal modalId={memberInvitationModalId} groupId={groupId} />

      {selectedMemberToSeeDetail && (
        <MemberDetailModal
          modalId={`memberDetail-${selectedMemberToSeeDetail.userId}`}
          member={selectedMemberToSeeDetail}
        />
      )}

      {selectedMemberToBeDeleted && (
        <MemberRemovalModal
          setOptimisticMembers={setOptimisticMembers}
          member={selectedMemberToBeDeleted}
          modalId={`memberRemoval-${selectedMemberToBeDeleted.userId}`}
        />
      )}
    </>
  );
}

'use client';
import { useOptimistic, useState, useTransition } from 'react';
import MemberItem from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberItem';
import MemberInvitationModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberInvitationModal';
import MemberDeleteModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberDeleteModal';
import MemberDetailModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberDetailModal';
import { deleteMemberAction } from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/actions';
import { ModalTrigger } from '@/components/common/modal';
import { Member } from '@/types/user';
import { Group } from '@/types/group';

type MembersProps = {
  groupId: Group['id'];
  members: Member[];
};

export default function Members({ groupId, members }: MembersProps) {
  const [memberForDetail, setMemberForDetail] = useState<Member | null>(null);
  const [memberForDelete, setMemberForDelete] = useState<Member | null>(null);
  const [optimisticMembers, setOptimisticMembers] = useOptimistic(
    members,
    (currentMembers: Member[], action: Member['userId'] | Member[]) => {
      if (typeof action === 'number') {
        return currentMembers.filter((member) => member.userId !== action);
      }
      return action;
    }
  );
  const [isDeleteLoading, startDeleteTransition] = useTransition();
  const [transitionError, setTransitionError] = useState<{ message: string; id: string } | null>(
    null
  );

  const deleteMember = async (memberForDelete: Member) => {
    startDeleteTransition(async () => {
      setTransitionError(null);
      setOptimisticMembers(memberForDelete.userId);

      const result = await deleteMemberAction(groupId, memberForDelete.userId);

      if (result.success) {
        setMemberForDelete(null);
      } else {
        setOptimisticMembers(members);
        setTransitionError({
          message: result.message,
          id: Date.now().toString(),
        });
      }
    });
  };

  const memberCount = optimisticMembers.length;
  const memberInvitationModalId = `memberInvitation-${groupId}`;
  const memberDetailModalId = memberForDetail ? `memberDetail-${memberForDetail.userId}` : '';
  const MemberDeleteModalId = memberForDelete ? `memberDelete-${memberForDelete.userId}` : '';

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
              memberDeleteModalId={MemberDeleteModalId}
              setMemberForDetail={setMemberForDetail}
              setMemberForDelete={setMemberForDelete}
            />
          ))}
        </ul>
      </section>

      <MemberInvitationModal modalId={memberInvitationModalId} groupId={groupId} />

      {memberForDetail && (
        <MemberDetailModal modalId={memberDetailModalId} member={memberForDetail} />
      )}

      {memberForDelete && (
        <MemberDeleteModal
          member={memberForDelete}
          modalId={MemberDeleteModalId}
          isLoading={isDeleteLoading}
          error={transitionError}
          deleteMember={() => deleteMember(memberForDelete)}
        />
      )}
    </>
  );
}

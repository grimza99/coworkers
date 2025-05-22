'use client';
import { useOptimistic, useState, useTransition } from 'react';
import MemberItem from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberItem';
import MemberInvitationModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberInvitationModal';
import MemberDeleteModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberDeleteModal';
import MemberDetailModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberDetailModal';
import {
  deleteMemberAction,
  postMemberAction,
} from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/actions';
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
    (
      currentMembers: Member[],
      action:
        | { type: 'add'; newMember: Member }
        | { type: 'delete'; memberForDelete: Member }
        | { type: 'rollback' }
    ) => {
      switch (action.type) {
        case 'add':
          return [...currentMembers, action.newMember];

        case 'delete':
          return currentMembers.filter((member) => member.userId !== action.memberForDelete.userId);

        case 'rollback':
          return currentMembers;

        default:
          return currentMembers;
      }
    }
  );
  const [isAddLoading, startAddTransition] = useTransition();

  const [isDeleteLoading, startDeleteTransition] = useTransition();
  const [transitionError, setTransitionError] = useState<{ message: string; id: string } | null>(
    null
  );

  const addMember = async (newMemberEmail: string) => {
    startAddTransition(async () => {
      setTransitionError(null);
      const newMember: Member = {
        userId: -1,
        userName: '',
        userImage: null,
        role: 'MEMBER',
        userEmail: newMemberEmail,
        groupId: groupId,
      };
      setOptimisticMembers({ type: 'add', newMember });

      const result = await postMemberAction(groupId, newMemberEmail);

      if (!result.success) {
        setOptimisticMembers({ type: 'rollback' });
        setTransitionError({
          message: result.message,
          id: Date.now().toString(),
        });
      }
    });
  };

  const deleteMember = async (memberForDelete: Member) => {
    startDeleteTransition(async () => {
      setTransitionError(null);
      setOptimisticMembers({ type: 'delete', memberForDelete });

      const result = await deleteMemberAction(groupId, memberForDelete.userId);

      if (result.success) {
        setMemberForDelete(null);
      } else {
        setOptimisticMembers({ type: 'rollback' });
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

      <MemberInvitationModal
        modalId={memberInvitationModalId}
        groupId={groupId}
        isLoading={isAddLoading}
        error={transitionError}
        addMember={addMember}
      />

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

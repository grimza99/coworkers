import { useState, useEffect, useOptimistic, useTransition } from 'react';
import {
  deleteMemberAction,
  postMemberAction,
} from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/actions';
import { Toast } from '@/components/common/Toastify';
import { Group } from '@/types/group';
import { Member } from '@/types/user';

export default function useMembers(groupId: Group['id'], members: Member[]) {
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

  useEffect(() => {
    if (!transitionError) return;
    Toast.error(transitionError.message);
  }, [transitionError]);

  return {
    memberForDetail,
    setMemberForDetail,
    memberForDelete,
    setMemberForDelete,
    optimisticMembers,
    isAddLoading,
    isDeleteLoading,
    addMember,
    deleteMember,
  };
}

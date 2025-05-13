'use client';

import TrashCan from '@/assets/TrashCan';
import { deleteGroup } from '../action';
import DangerModal from '@/components/DangerModal';
import useModalContext from '@/components/common/modal/core/useModalContext';

const DELETE_MODAL_ID = 'delete-group';

export default function DeleteGroupButton({ groupId }: { groupId: number }) {
  const { openModal } = useModalContext();

  const handleDeleteGroup = async () => {
    await deleteGroup(groupId);
  };

  return (
    <>
      <button
        onClick={() => openModal(DELETE_MODAL_ID)}
        className="text-danger text-lg-md flex w-fit cursor-pointer items-center justify-start gap-2"
      >
        <TrashCan />
        <span>팀 삭제하기</span>
      </button>
      <DangerModal
        modalId={DELETE_MODAL_ID}
        heading="팀 삭제를 진행하시겠아요?"
        description=""
        confirmButton="삭제하기"
        onConfirm={handleDeleteGroup}
      />
    </>
  );
}

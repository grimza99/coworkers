'use client';

import TrashCan from '@/assets/TrashCan';
import { deleteGroup } from '../action';
import DangerModal from '@/components/danger-modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/common/Toastify';

const DELETE_MODAL_ID = 'delete-group';

export default function DeleteGroupButton({ groupId }: { groupId: number }) {
  const { openModal } = useModalContext();
  const router = useRouter();

  const handleDeleteGroup = async () => {
    await deleteGroup(groupId)
      .then(() => router.push('/'))
      .catch(() => Toast.error('팀 삭제에 실패했습니다. 다시 시도해 주세요.'));
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
        heading="팀 삭제를 진행하시겠어요?"
        description=""
        confirmButton="삭제하기"
        onConfirm={handleDeleteGroup}
      />
    </>
  );
}

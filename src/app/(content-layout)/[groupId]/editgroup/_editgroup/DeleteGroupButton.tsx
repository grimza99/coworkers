'use client';

import TrashCan from '@/assets/TrashCan';
import { deleteGroup } from '../action';

export default function DeleteGroupButton({ groupId }: { groupId: number }) {
  const handleDeleteGroup = async () => {
    await deleteGroup(groupId);
  };

  return (
    <button
      onClick={handleDeleteGroup}
      className="text-danger text-lg-md flex w-fit cursor-pointer items-center justify-start gap-2"
    >
      <TrashCan />
      <span>팀 삭제하기</span>
    </button>
  );
}

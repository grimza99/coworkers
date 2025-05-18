import { ModalContainer, ModalOverlay, ModalPortal, ModalTrigger } from '@/components/common/modal';
import ManageTaskItem from '@/components/manage-task-item/components/ManageTaskItem';
import Plus from '@/assets/Plus';
import { TaskItemProps } from '@/components/manage-task-item/type';

export default function ManageTaskItemModal({
  detailTask,
  groupId,
  taskListId,
  isDone,
  createOrEditModalId,
}: TaskItemProps) {
  const modalId = createOrEditModalId ?? '';

  return (
    <>
      {!detailTask && (
        <ModalTrigger
          modalId={modalId}
          className="text-lg-semi bg-primary absolute right-7 bottom-35 flex h-12 w-[125px] items-center justify-center rounded-[40px] text-white"
        >
          <Plus width="16" height="16" /> 할 일 추가
        </ModalTrigger>
      )}
      <ModalPortal modalId={modalId}>
        <ModalOverlay modalId={modalId}>
          <ModalContainer>
            <ManageTaskItem
              detailTask={detailTask}
              groupId={groupId}
              taskListId={taskListId}
              isDone={isDone}
              createOrEditModalId={createOrEditModalId}
            />
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}

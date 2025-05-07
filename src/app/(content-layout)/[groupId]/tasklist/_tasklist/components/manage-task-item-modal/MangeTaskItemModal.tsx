import Button from '@/components/common/Button';
import {
  ModalContainer,
  ModalFooter,
  ModalOverlay,
  ModalPortal,
  ModalTrigger,
} from '@/components/common/modal';
import ManageTaskItem from '@/components/manage-task-item/components/ManageTaskItem';
import useModalContext from '@/components/common/modal/core/useModalContext';
import Plus from '@/assets/Plus';
import { InterceptedTaskItem, TaskItem, TaskItemProps } from '@/components/manage-task-item/type';
import { useCallback, useState } from 'react';
import axiosClient from '@/lib/axiosClient';

export default function ManageTaskItemModal({ task, groupId, taskListId }: TaskItemProps) {
  const [taskItem, setTaskItem] = useState<TaskItem>();
  const { closeModal } = useModalContext();

  const interceptTaskItem = useCallback(({ taskItem, monthDay, weekDays }: InterceptedTaskItem) => {
    setTaskItem({ ...taskItem, monthDay, weekDays });
  }, []);

  const handleTaskItemSubmit = async () => {
    await axiosClient
      .post(`/groups/${groupId}/task-lists/${taskListId}/tasks`, { ...taskItem })
      .then(() => closeModal('task-item'))
      .catch((err) => console.error(err));
  };

  const buttonText = task ? '수정하기' : '만들기';

  const isTask = () => {
    return task ? (
      <ModalTrigger modalId="task-item" className="text-md-rg">
        수정하기
      </ModalTrigger>
    ) : (
      <ModalTrigger
        modalId="task-item"
        className="text-lg-semi bg-primary absolute right-6 bottom-40 flex h-12 w-[125px] items-center justify-center rounded-[40px] text-white"
      >
        <Plus width="16" height="16" /> 할 일 추가
      </ModalTrigger>
    );
  };

  return (
    <>
      {isTask()}
      <ModalPortal modalId="task-item">
        <ModalOverlay modalId="task-item">
          <ModalContainer>
            <ManageTaskItem task={task} interceptTaskItem={interceptTaskItem} />
            <ModalFooter className="w-full">
              <Button
                variant="outline-primary"
                size="fullWidth"
                onClick={() => closeModal('task-item')}
              >
                취소
              </Button>
              <Button onClick={handleTaskItemSubmit} variant="solid" size="fullWidth">
                {buttonText}
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}

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
import { Task } from '../../types/task-list-page-type';
import Plus from '@/assets/Plus';

export default function ManageTaskItemModal({ task }: { task?: Task }) {
  const { closeModal } = useModalContext();

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
            <ManageTaskItem task={task} />
            <ModalFooter className="w-full">
              <Button
                variant="outline-primary"
                size="fullWidth"
                onClick={() => closeModal('task-item')}
              >
                취소
              </Button>
              <Button variant="solid" size="fullWidth">
                {buttonText}
              </Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}

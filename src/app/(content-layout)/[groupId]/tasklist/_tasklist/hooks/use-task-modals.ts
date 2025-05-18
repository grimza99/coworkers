type TaskModals = {
  popUpDeleteTaskModal: (modalId: string) => void;
  popUpEditTaskModal: (modalId: string) => void;
};

import useModalContext from '@/components/common/modal/core/useModalContext';

export function useTaskModals(): TaskModals {
  const { openModal } = useModalContext();

  const popUpEditTaskModal = (modalId: string) => {
    openModal(modalId);
  };

  const popUpDeleteTaskModal = (modalId: string) => {
    openModal(modalId);
  };

  return {
    popUpEditTaskModal,
    popUpDeleteTaskModal,
  };
}

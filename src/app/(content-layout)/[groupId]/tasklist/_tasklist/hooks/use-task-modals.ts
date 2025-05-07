import useModalContext from '@/components/common/modal/core/useModalContext';

export function useTaskModals() {
  const { openModal } = useModalContext();

  const popUpDetailTask = (setIsOpen: () => void) => {
    setIsOpen();
  };

  const popUpEditTaskModal = (modalId: string) => {
    openModal(modalId);
  };

  const popUpDeleteTaskModal = (modalId: string) => {
    openModal(modalId);
  };

  return {
    popUpDetailTask,
    popUpEditTaskModal,
    popUpDeleteTaskModal,
  };
}

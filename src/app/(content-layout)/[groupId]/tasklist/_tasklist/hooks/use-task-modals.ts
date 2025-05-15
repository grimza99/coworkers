import useModalContext from '@/components/common/modal/core/useModalContext';

export function useTaskModals() {
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

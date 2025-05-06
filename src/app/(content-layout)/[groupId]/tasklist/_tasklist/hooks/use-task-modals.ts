import useModalContext from '@/components/common/modal/core/useModalContext';

export function useTaskModals() {
  const { openModal } = useModalContext();

  const popUpDetailTask = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsOpen((prev) => !prev);
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

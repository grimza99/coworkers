'use client';
import {
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import Image from 'next/image';
import Button from '@/components/common/Button';
import useModalContext from '@/components/common/modal/core/useModalContext';

interface Props {
  description: string;
  onClick?: () => void;
  modalId: string;
  ButtonText: string;
}

export default function ErrorModal({ description, onClick, modalId, ButtonText }: Props) {
  const { closeModal } = useModalContext();

  return (
    <>
      <ModalPortal modalId={modalId}>
        <ModalOverlay modalId={modalId} onClick={() => closeModal(modalId)}>
          <ModalContainer className="md:max-w-96 lg:max-w-96">
            <Image src="/icons/danger.icon.svg" alt="!" width={20} height={20} />
            <ModalDescription className="text-md-md text-gray500 mb-6 w-full">
              {description}
            </ModalDescription>
            <ModalFooter className="w-full">
              <div className="flex w-full gap-2">
                <Button
                  variant="outline-gray"
                  onClick={() => {
                    onClick?.();
                    closeModal(modalId);
                  }}
                  fontSize="16"
                  size="fullWidth"
                >
                  {ButtonText}
                </Button>
              </div>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}

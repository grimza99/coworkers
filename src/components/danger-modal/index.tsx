'use client';
import {
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeading,
  ModalOverlay,
  ModalPortal,
} from '@/components/common/modal';
import Image from 'next/image';
import Button from '@/components/common/Button';
import useModalContext from '@/components/common/modal/core/useModalContext';

interface DangerModalProps {
  modalId: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  closeButtonText?: string;
  confirmButton: string;
  onConfirm: () => void;
}
export default function DangerModal({
  modalId,
  heading,
  description,
  closeButtonText,
  confirmButton,
  onConfirm,
}: DangerModalProps) {
  const { closeModal } = useModalContext();

  const closeButton = closeButtonText ? closeButtonText : '닫기';

  return (
    <>
      <ModalPortal modalId={modalId}>
        <ModalOverlay modalId={modalId} onClick={() => closeModal(modalId)}>
          <ModalContainer className="flex gap-4 md:w-full md:max-w-96">
            <Image src="/icons/danger.icon.svg" alt="!" width={24} height={24} />
            <ModalHeading className="text-lg-md text-gray100">{heading}</ModalHeading>
            <ModalDescription className="text-md-md text-gray300 -mt-1.5">
              {description}
            </ModalDescription>
            <ModalFooter className="mt-2 w-full">
              <div className="flex w-full gap-2">
                <Button
                  onClick={() => {
                    closeModal(modalId);
                  }}
                  variant="outline-gray"
                  size="fullWidth"
                >
                  {closeButton}
                </Button>
                <Button onClick={onConfirm} variant="danger" size="fullWidth">
                  {confirmButton}
                </Button>
              </div>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </>
  );
}

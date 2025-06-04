'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import Modal from '@/components/common/modal/newModal';
import BouncingDots from '@/components/common/loading/BouncingDots';
import { validateEmptyValue } from '@/utils/validators';
import { createTasklistAction } from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/actions';

export default function Page() {
  const { groupId } = useParams<{ groupId: string }>();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClickAddButton = async () => {
    setIsLoading(true);
    if (validateEmptyValue(name)) {
      setIsLoading(false);
      return;
    }
    createTasklistAction(Number(groupId), name).then(() => {
      setIsLoading(false);
      router.back();
    });
  };

  return (
    <Modal.Overlay>
      <Modal.Container className="px-13 pt-12 pb-8 md:px-13 md:pt-12 md:pb-8">
        <Modal.CloseButton />
        <div className="mb-6 w-70">
          <Modal.Heading className="mb-2">할 일 목록 추가</Modal.Heading>
          <FormField
            field="input"
            placeholder="목록 이름을 입력해주세요."
            isSuccess={!validateEmptyValue(name)}
            isFailure={validateEmptyValue(name)}
            errorMessage="이름을 입력해 주세요."
            value={name}
            onChange={handleChangeName}
            disabled={isLoading}
          />
        </div>
        <Modal.Footer className="w-70">
          <Button onClick={handleClickAddButton} fontSize="16" size="fullWidth">
            {isLoading ? <BouncingDots /> : '만들기'}
          </Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  );
}

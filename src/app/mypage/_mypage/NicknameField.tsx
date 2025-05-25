'use client';

import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import { validateLengthLimit } from '@/utils/validators';
import { AUTH_ERROR_MESSAGES } from '@/constants/messages/signup';

interface NicknameFieldProps {
  nickname: string;
  nicknameError: string;
  setNickname: (value: string) => void;
  setNicknameError: (value: string) => void;
  onClick: () => void;
}

export default function NicknameField({
  nickname,
  nicknameError,
  setNickname,
  setNicknameError,
  onClick,
}: NicknameFieldProps) {
  return (
    <FormField
      field="input"
      label="이름"
      value={nickname}
      isFailure={!!nicknameError}
      errorMessage={nicknameError}
      onChange={(e) => {
        const value = e.target.value;
        setNickname(value);

        if (!validateLengthLimit(value)) {
          setNicknameError(AUTH_ERROR_MESSAGES.nickname.tooLong);
          return;
        }

        setNicknameError('');
      }}
      rightSlot={
        <div className="flex items-center">
          <Button size="xs" fontSize="14" disabled={!!nicknameError} onClick={onClick}>
            변경하기
          </Button>
        </div>
      }
    />
  );
}

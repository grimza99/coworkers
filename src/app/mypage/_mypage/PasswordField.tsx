'use client';

import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';

interface PasswordFieldProps {
  password: string;
  setPassword: (value: string) => void;
  onClick: () => void;
}

export default function PasswordField({ password, setPassword, onClick }: PasswordFieldProps) {
  return (
    <FormField
      field="input"
      type="password"
      label="비밀번호"
      placeholder="비밀번호를 입력해 주세요."
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
      rightSlot={
        <div className="flex items-center">
          <Button size="xs" fontSize="14" className="shrink-0" onClick={onClick}>
            변경하기
          </Button>
        </div>
      }
    />
  );
}

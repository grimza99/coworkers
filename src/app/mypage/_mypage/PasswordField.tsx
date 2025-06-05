'use client';

import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import BouncingDots from '@/components/common/loading/BouncingDots';

interface PasswordFieldProps {
  password: string;
  setPassword: (value: string) => void;
  onClick: () => void;
  isLoading?: boolean; // 로딩 상태 추가
}

export default function PasswordField({
  password,
  setPassword,
  onClick,
  isLoading = false,
}: PasswordFieldProps) {
  return (
    <FormField
      field="input"
      type="password"
      label="비밀번호"
      placeholder="기존 비밀번호 입력"
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
          <Button
            size="xs"
            fontSize="14"
            className="shrink-0"
            onClick={onClick}
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? <BouncingDots /> : '변경하기'}
          </Button>
        </div>
      }
    />
  );
}

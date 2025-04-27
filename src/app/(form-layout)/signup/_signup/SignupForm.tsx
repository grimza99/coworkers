'use client';

import { useState } from 'react';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <>
      <form className="flex w-full flex-col gap-y-10 md:max-w-115">
        <div className="flex flex-col gap-4">
          <FormField
            field="input"
            label="이름"
            isFailure={name === ''}
            isSuccess={name !== ''}
            errorMessage="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            placeholder="이름을 입력해주세요."
          />
          <FormField
            field="input"
            label="이메일"
            isFailure={!isValidEmail}
            isSuccess={isValidEmail}
            errorMessage="유효한 이메일이 아닙니다."
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="이메일을 입력해주세요."
          />
          <FormField
            field="input"
            label="비밀번호"
            type="password"
            isFailure={password === ''}
            isSuccess={password !== ''}
            errorMessage="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            placeholder="비밀번호를 입력해주세요."
          />
          <FormField
            field="input"
            label="비밀번호 확인"
            type="password"
            isFailure={confirmPassword === '' || confirmPassword !== password}
            isSuccess={confirmPassword !== '' && confirmPassword === password}
            errorMessage={
              confirmPassword === '' ? '비밀번호를 입력해주세요.' : '비밀번호가 일치하지 않습니다.'
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value.trim())}
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </div>
        <Button type="submit" variant="solid" size="fullWidth" fontSize="16">
          회원가입
        </Button>
      </form>
    </>
  );
}

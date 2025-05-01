'use client';
import { useState } from 'react';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import PasswordToggleButton from '@/app/(form-layout)/signup/_signup/PasswordToggleButton';
import axiosClient from '@/lib/axiosClient';
import { setClientCookie } from '@/lib/cookie/client';
import { validateEmail, validatePassword } from '@/utils/validators';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axiosClient.post(`/auth/signIn`, {
      email: email,
      password: password,
    });

    const data = await res.data;

    const accessToken = data?.accessToken;
    const refreshToken = data?.refreshToken;

    setClientCookie('accessToken', accessToken);
    setClientCookie('refreshToken', refreshToken);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-6">
        <FormField
          name="email"
          label="이메일"
          type="email"
          field="input"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          isFailure={!validateEmail(email)}
          errorMessage="유효한 이메일이 아닙니다."
          // disabled={isPending}
        />
        <FormField
          name="password"
          label="비밀번호"
          type={isPasswordVisible ? 'text' : 'password'}
          field="input"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          isFailure={!validatePassword(password)}
          errorMessage="비밀번호를 입력해주세요."
          rightSlot={
            <PasswordToggleButton
              isVisible={isPasswordVisible}
              onToggle={() => setIsPasswordVisible((prev) => !prev)}
            />
          }
          // disabled={isPending}
        />
      </div>
      <button type="button" className="text-md-md text-primary mt-3 w-fit self-end underline">
        비밀번호를 잊으셨나요?
      </button>
      <Button
        type="submit"
        variant="solid"
        size="fullWidth"
        fontSize="16"
        className="mt-10"
        disabled={!(validateEmail(email) && validatePassword(password))}
      >
        로그인
      </Button>
    </form>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import PasswordToggleButton from '@/app/(form-layout)/signup/_signup/PasswordToggleButton';
import axiosClient from '@/lib/axiosClient';
import { setClientCookie } from '@/lib/cookie/client';
import { validateEmail, validatePassword } from '@/utils/validators';
import { User } from '@/types/user';
import PATHS from '@/constants/paths';

interface loginApiResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setIsLoginFailed(false);

    try {
      const res = await axiosClient.post<loginApiResponse>(`/auth/signIn`, {
        email,
        password,
      });

      const data = res.data;
      setClientCookie('accessToken', data.accessToken);
      setClientCookie('refreshToken', data.refreshToken);

      router.push(PATHS.HOME);
    } catch (error) {
      if (isAxiosError(error)) {
        setIsLoginFailed(true);
      } else {
        console.error('로그인 중 에러가 발생했습니다:', error);
      }
      setPassword('');
    } finally {
      setIsLoggingIn(false);
    }
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
          disabled={isLoggingIn}
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
          disabled={isLoggingIn}
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
        disabled={!(validateEmail(email) && validatePassword(password)) || isLoggingIn}
      >
        {isLoggingIn ? '...' : '로그인'}
      </Button>
      {isLoginFailed ? (
        <p className="text-md-md text-danger mt-4 self-center text-center">
          이메일 또는 비밀번호가 잘못 되었습니다.
          <br />
          이메일과 비밀번호를 정확히 입력해주세요.
        </p>
      ) : null}
    </form>
  );
}

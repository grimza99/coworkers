'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import BouncingDots from '@/components/common/loading/BouncingDots';
import SendResetPassword from '@/app/(form-layout)/login/_login/SendResetPassword';
import PasswordToggleButton from '@/app/(form-layout)/signup/_signup/PasswordToggleButton';
import { validateEmail } from '@/utils/validators';
import { User } from '@/types/user';
import PATHS from '@/constants/paths';

export interface loginApiResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export default function LoginForm() {
  const router = useRouter();

  const { fetchUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length > 0;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoggingIn(true);
    setIsLoginFailed(false);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return router.push(PATHS.HOME);
      fetchUser();
      router.push(PATHS.ARTICLES.BASE);
    } catch (error) {
      console.error('로그인 중 에러 발생:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col md:max-w-115">
      <div className="flex w-full flex-col gap-6">
        <FormField
          name="email"
          label="이메일"
          type="email"
          field="input"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          isFailure={!isEmailValid}
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          isFailure={!isPasswordValid}
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
      <SendResetPassword />
      <Button
        type="submit"
        variant="solid"
        size="fullWidth"
        fontSize="16"
        className="mt-10"
        disabled={!isFormValid || isLoggingIn}
      >
        {isLoggingIn ? <BouncingDots /> : '로그인'}
      </Button>
      {isLoginFailed && (
        <p className="text-md-md text-danger mt-4 self-center text-center">
          이메일 또는 비밀번호가 잘못 되었습니다.
          <br />
          이메일과 비밀번호를 정확히 입력해주세요.
        </p>
      )}
    </form>
  );
}

'use client';
import { useState } from 'react';
import FormField from '@/components/common/formField';
import axiosClient from '@/lib/axiosClient';
import { setCookieInClient } from '@/lib/cookie/client';

export default function LoginForm() {
  // @TODO: 입력 변화에 따른 UI 변화, 입력값 검증
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axiosClient.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
      email: email,
      password: password,
    });

    const data = await res.data;

    const accessToken = data?.accessToken;
    const refreshToken = data?.refreshToken;

    setCookieInClient('accessToken', accessToken);
    setCookieInClient('refreshToken', refreshToken);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
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
        // disabled={isPending}
      />
      <FormField
        name="password"
        label="비밀번호"
        type="password"
        field="input"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        // disabled={isPending}
      />
      <button
        type="submit"
        className="text-lg-semi bg-primary disabled:bg-gray400 flex h-12 justify-center rounded-xl px-4 py-3"
        // disabled={isPending}
      >
        로그인
      </button>
    </form>
  );
}

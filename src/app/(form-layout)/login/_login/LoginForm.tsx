'use client';
import { useActionState, useState } from 'react';
import login from './login';
import FormField from '@/components/common/formField';

export default function LoginForm() {
  // @TODO: 입력 변화에 따른 UI 변화, 입력값 검증
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, loginAction, isPending] = useActionState(login, { success: false });

  // @TODO: 요청 결과 처리
  if (state.success) {
    // console.log("success!")
  }

  return (
    <form action={loginAction} className="flex w-full flex-col gap-4">
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
        disabled={isPending}
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
        disabled={isPending}
      />
      <button
        type="submit"
        className="text-lg-semi bg-primary disabled:bg-gray400 flex h-12 justify-center rounded-xl px-4 py-3"
        disabled={isPending}
      >
        {isPending ? '로그인 중입니다~' : '로그인'}
      </button>
    </form>
  );
}

'use client';
import { useActionState, useState } from 'react';
import Input from '@/components/common/formField/compound/Input';
import login from './login';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, loginAction, isPending] = useActionState(login, { success: false });

  // @TODO: 요청 결과 처리
  if (state.success) {
    // console.log("success!")
  }

  return (
    <form action={loginAction} className="flex w-full flex-col gap-4">
      <div>
        <label htmlFor="email" className="mb-2">
          이메일
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요."
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
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

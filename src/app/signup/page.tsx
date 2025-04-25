'use client';

import FormField from '@/components/common/formField';
import Header from '@/components/layout/gnb/Header';
import OAuth from '@/components/oauth';
import { useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

  return (
    <div>
      <Header />
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-[343px] md:w-115">
          <h1 className="text-2xl-md text-center md:pb-20 md:text-4xl">회원가입</h1>
          <div className="flex flex-col gap-6">
            <FormField
              textField="input"
              label="이름"
              gapSize="16"
              isFailure={name === ''}
              isSuccess={name !== ''}
              errorMessage="이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={'이름을 입력해주세요.'}
            />
            <FormField
              textField="input"
              label="이메일"
              gapSize="16"
              isFailure={!isValidEmail}
              isSuccess={isValidEmail}
              errorMessage="유효한 이메일이 아닙니다."
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="이메일을 입력해주세요."
            />
            <FormField
              textField="input"
              label="비밀번호"
              gapSize="16"
              isFailure
              isSuccess
              errorMessage="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
            />
            <FormField
              textField="textarea"
              label="비밀번호 확인"
              gapSize="16"
              isFailure={confirmPassword !== password}
              isSuccess={confirmPassword !== '' && confirmPassword === password}
              errorMessage="비밀번호가 일치하지않습니다."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div className="mt-10 mb-10">
            <button
              type="submit"
              className="bg-primary h-[47px] w-[343px] items-center justify-center md:w-115"
            >
              회원가입
            </button>
          </div>
          <OAuth authType="signup" />
        </div>
      </main>
    </div>
  );
}

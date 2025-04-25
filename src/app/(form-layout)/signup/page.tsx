'use client';

import SignupForm from './_signup/SignupForm';
import OAuth from '@/components/oauth';

export default function SignupPage() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex w-[343px] flex-col gap-y-10 md:w-115">
          <h1 className="text-2xl-md text-center md:mb-20 md:text-4xl">회원가입</h1>
          <SignupForm />
          <OAuth authType="signup" />
        </div>
      </main>
    </div>
  );
}

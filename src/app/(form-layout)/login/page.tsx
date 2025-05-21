import Link from 'next/link';
import LoginForm from '@/app/(form-layout)/login/_login/LoginForm';
import OAuth from '@/components/oauth';
import PATHS from '@/constants/paths';

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-2xl-md mb-20 lg:text-4xl">로그인</h1>
      <LoginForm />
      <div className="text-md-md my-6 self-center md:mb-12">
        아직 계정이 없으신가요?
        <Link href={`${PATHS.SIGNUP}`} className="text-primary ml-3 inline underline">
          가입하기
        </Link>
      </div>
      <OAuth authType="login" />
    </div>
  );
}

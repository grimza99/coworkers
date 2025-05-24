import { Metadata } from 'next';
import SignupForm from './_signup/SignupForm';
import OAuth from '@/components/oauth';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '회원가입 | Coworkers',
    openGraph: {
      title: '회원가입 | Coworkers',
      description: '자유롭게 게시글을 작성하고 소통할 수 있는 공간입니다.',
      siteName: 'Coworkers',
    },
  };
}

export default function SignupPage() {
  return (
    <div className="flex w-full flex-col gap-y-10 md:w-115">
      <h1 className="text-2xl-md text-center md:mb-20 md:text-4xl">회원가입</h1>
      <SignupForm />
      <OAuth authType="signup" />
    </div>
  );
}

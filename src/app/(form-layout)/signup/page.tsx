import SignupForm from './_signup/SignupForm';
import OAuth from '@/components/oauth';

export default function SignupPage() {
  return (
    <div className="flex w-full flex-col gap-y-10 md:w-115">
      <h1 className="text-2xl-md text-center md:mb-20 md:text-4xl">회원가입</h1>
      <SignupForm />
      <OAuth authType="signup" />
    </div>
  );
}

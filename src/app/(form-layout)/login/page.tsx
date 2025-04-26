import OAuth from '@/components/oauth';
import LoginForm from './_login/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col">
      <div className="mb-10 flex w-[460px] flex-col items-center">
        <h1 className="mb-20 text-4xl">로그인</h1>
        <LoginForm />
      </div>
      <OAuth authType="login" />
    </div>
  );
}

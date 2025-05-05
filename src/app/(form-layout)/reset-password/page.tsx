import ResetPasswordForm from './_reset-password/components/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-6 text-center md:gap-20">
      <p className="text-2xl-md lg:text-4xl">비밀번호 재설정</p>
      <ResetPasswordForm />
    </div>
  );
}

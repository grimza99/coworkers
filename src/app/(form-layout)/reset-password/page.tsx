import { Suspense, use } from 'react';
import ResetPasswordForm from './_reset-password/components/ResetPasswordForm';
import Spinner from '@/components/common/loading/Spinner';

interface Props {
  searchParams: Promise<{ [token: string]: string | undefined }>;
}
export default function ResetPasswordPage({ searchParams }: Props) {
  const { token } = use(searchParams);

  return (
    <div className="flex flex-col gap-6 text-center md:gap-20">
      <p className="text-2xl-md lg:text-4xl">비밀번호 재설정</p>
      <Suspense fallback={<Spinner />}>
        <ResetPasswordForm token={token} />
      </Suspense>
    </div>
  );
}

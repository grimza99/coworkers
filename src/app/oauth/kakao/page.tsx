import { Suspense } from 'react';
import OAuthClient from './_kakao/OAuthClient';
import Spinner from '@/components/common/loading/Spinner';

export default async function OAuthPage() {
  return (
    <Suspense fallback={<Spinner className="text-4xl" />}>
      <OAuthClient />
    </Suspense>
  );
}

import { Suspense } from 'react';
import OAuthClient from './_kakao/OAuthClient';

export default async function OAuthPage() {
  return (
    <Suspense fallback={<div>처리 중...</div>}>
      <OAuthClient />
    </Suspense>
  );
}

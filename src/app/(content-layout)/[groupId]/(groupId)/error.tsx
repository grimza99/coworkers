'use client';

import Button from '@/components/common/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1>사용자의 그룹을 불러오는데 실패했습니다.</h1>
      <Button onClick={() => reset()} size="lg">
        재시도
      </Button>
    </div>
  );
}

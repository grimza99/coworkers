'use client';

import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  error: Error;
}

export default function TaskListPageFallBack({ error }: Props) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className="flex w-full justify-center px-10">
      <div className="bg-200 flex flex-col items-center gap-8">
        <h2>오류가 발생했습니다.</h2>
        <Button onClick={() => router.back}>뒤로가기</Button>
      </div>
    </div>
  );
}

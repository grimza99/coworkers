'use client';

import { useEffect } from 'react';

interface Props {
  error: Error;
  reset?: () => void;
}
export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <div className="w-full">
      <h2>오류가 발생했습니다.</h2>
      {reset && <button onClick={() => reset()}>다시시도하기</button>}
    </div>
  );
}

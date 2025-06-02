'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
    >
      <Image src="/icons/close.svg" alt="x" width={24} height={24} />
    </button>
  );
}

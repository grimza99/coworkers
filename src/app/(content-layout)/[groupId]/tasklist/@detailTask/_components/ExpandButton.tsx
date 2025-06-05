'use client';

import Image from 'next/image';

export default function ExpandButton() {
  return (
    <button onClick={() => window.location.reload()}>
      <Image src="/icons/expand-icon.svg" alt="확장아이콘" width={16} height={16} />
    </button>
  );
}

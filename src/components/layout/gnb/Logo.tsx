'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/icons/logo.svg"
        alt="Coworkers 로고"
        width={99}
        height={18}
        priority
      />
    </Link>
  );
}
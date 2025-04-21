<<<<<<< HEAD
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
=======
import Image from 'next/image';
import Link from 'next/link';
import logoLg from '@/assets/logo-lg.svg';
import logoSm from '@/assets/logo-sm.svg';

export default function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center">
        <Image
          src={logoLg}
          alt="Coworkers logo"
          width={158}
          height={32}
          className="hidden lg:block"
        />
        <Image
          src={logoSm}
          alt="Coworkers logo"
          width={102}
          height={20}
          className="block lg:hidden"
        />
      </Link>
    </div>
  );
}
>>>>>>> b4435e7 (Refector : Logo 컴포넌트 분리)

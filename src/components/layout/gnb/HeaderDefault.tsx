'use client ';

import Image from 'next/image';
import logoLg from '@/assets/logo-lg.png';
import logoSm from '@/assets/logo-sm.png';

export default function DefaultHeader() {
  return (
    <header className="bg-bg200 sticky top-0 h-[60px] w-full">
      <div className="flex h-full w-full items-center pl-[16px] md:pl-[24px] lg:pl-[360px]">
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
      </div>
    </header>
  );
}

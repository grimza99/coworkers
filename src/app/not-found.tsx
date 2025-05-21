import Image from 'next/image';
import Link from 'next/link';
import { MainBackgroundImage } from './_home/BackgroundImage';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="relative flex h-200 flex-col items-center justify-between sm:h-230 lg:h-250">
      <div className="mt-13.5 flex flex-col items-center gap-1 sm:mt-21">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/repair-icon.svg"
            width={28}
            height={29}
            priority
            alt=""
            className="size-7 sm:size-12 lg:size-14"
          />
          <h2 className="text-2xl-semi font-semibold sm:text-[40px] lg:text-[48px]">Not Found</h2>
          <Image
            src="/icons/repair-icon.svg"
            width={28}
            height={29}
            priority
            alt=""
            className="size-7 sm:size-12 lg:size-14"
          />
        </div>
        <h1 className="bg-[image:var(--color-gradient)] bg-clip-text text-[32px] font-semibold text-transparent sm:text-[48px] lg:text-[64px]">
          Coworkers
        </h1>
      </div>
      <MainBackgroundImage />
      <Link href="/">
        <Button size="xl" variant="gradient" className="sm:w-[373px]">
          Coworkers 홈으로
        </Button>
      </Link>
    </div>
  );
}

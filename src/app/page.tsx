import Image from 'next/image';
import StartButton from '@/app/_home/StartButton';
import repairIcon from '@/../public/icons/repair-icon.svg';
import BackgroundImage from './_home/BackgroundImage';

export default function Home() {
  return (
    <main className="">
      <div className="relative flex h-[640px] flex-col justify-between sm:h-[940px] lg:h-[1080px]">
        <div className="mt-13.5 flex flex-col items-center gap-1 sm:mt-21">
          <div className="flex items-center gap-1">
            <h2 className="text-2xl-semi font-semibold sm:text-[40px] lg:text-[48px]">
              함께 만들어가는 투두 리스트
            </h2>
            <Image
              src={repairIcon}
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
        <BackgroundImage variant="main" />
        <StartButton className="mx-auto mb-12 sm:mb-30">지금 시작하기</StartButton>
      </div>
    </main>
  );
}

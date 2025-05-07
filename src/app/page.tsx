import Image from 'next/image';
import StartButton from '@/app/_home/StartButton';
import repairIcon from '@/../public/icons/repair-icon.svg';
import ResponsiveImage from './_home/ResponsiveImage';

export default function Home() {
  return (
    <div className="">
      <div className="relative h-[470px] pt-[55px]">
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            <h2 className="text-2xl-semi">함께 만들어가는 투두 리스트</h2>
            <Image src={repairIcon} width={28} height={29} priority alt="" />
          </div>
          <h1 className="bg-[image:var(--color-gradient)] bg-clip-text text-[32px] font-semibold text-transparent">
            Coworkers
          </h1>
        </div>
        <ResponsiveImage />
      </div>
      <StartButton>지금 시작하기</StartButton>
    </div>
  );
}

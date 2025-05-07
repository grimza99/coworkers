import Image from 'next/image';
import clsx from 'clsx';
import repairIcon from '@/../public/icons/repair-icon.svg';
import folderIcon from '@/../public/icons/folder-icon.svg';
import messageIcon from '@/../public/icons/message-icon.svg';
import doneIcon from '@/../public/icons/done-icon.svg';
import mockupImage1 from '@/../public/images/landing-mockup1.png';
import mockupImage2 from '@/../public/images/landing-mockup2.png';
import mockupImage3 from '@/../public/images/landing-mockup3.png';
import StartButton from '@/app/_home/StartButton';
import { MainBackgroundImage, BottomBackgroundImage } from '@/app/_home/BackgroundImage';

export default function Home() {
  return (
    <main>
      <section className="relative flex h-[640px] flex-col justify-between sm:h-[940px] lg:h-[1080px]">
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
        <MainBackgroundImage />
        <StartButton className="mx-auto mb-12 sm:mb-30">지금 시작하기</StartButton>
      </section>
      <section className="flex flex-col items-center gap-6 lg:gap-10">
        <article
          className={clsx(
            'rounded-[40px] bg-[image:var(--color-gradient)] p-[1px] shadow-white drop-shadow-sm drop-shadow-white backdrop-blur-sm',
            'h-[467px] w-[343px] rounded-[40px]',
            'md:h-[354px] md:w-[696px]',
            'lg:h-[419px] lg:w-[996px]'
          )}
        >
          <div
            className={clsx(
              'bg-bg300 size-full, flex flex-col items-start gap-10 rounded-[40px] px-13.5 pt-12',
              'md:flex-row-reverse md:items-center md:justify-between md:px-[121.5px] md:pt-0',
              'lg:px-[181px]'
            )}
          >
            <div className="text-lg-md lg:text-2xl-md flex flex-col items-start text-white">
              <div className="bg-bg200 border-border mb-4 size-12 rounded-xl border-1 p-3 shadow-lg shadow-slate-800">
                <Image src={folderIcon} width={24} height={24} alt="폴더" className="size-6" />
              </div>
              그룹으로
              <br />할 일을 관리해요
            </div>
            <Image
              src={mockupImage1}
              width={873}
              height={1011}
              alt="그룹 관리 예시 화면"
              className="h-[273px] w-[235px] md:self-end lg:h-[338px] lg:w-[291px]"
            />
          </div>
        </article>
        <article
          className={clsx(
            'bg-bg200 border-border flex h-[467px] w-[343px] flex-col items-start gap-10 rounded-[40px] border-1 px-13.5 pb-12 backdrop-blur-md',
            'md:h-[354px] md:w-[696px] md:flex-row-reverse md:items-center md:justify-between md:px-[121.5px] md:pt-0',
            'lg:h-[419px] lg:w-[996px] lg:px-[181px]'
          )}
        >
          <Image
            src={mockupImage2}
            width={849}
            height={1014}
            alt="멤버 초대 예시 화면"
            className="h-[273px] w-[235px] md:self-start lg:h-[338px] lg:w-[291px]"
          />
          <div className="text-lg-md lg:text-2xl-md flex flex-col items-start text-white md:items-end md:text-end">
            <div className="bg-bg200 border-border mb-4 size-12 rounded-xl border-1 p-3 shadow-lg shadow-slate-900">
              <Image src={messageIcon} width={24} height={24} alt="메시지" className="size-6" />
            </div>
            간단하게 멤버들을
            <br />
            초대해요
          </div>
        </article>
        <article
          className={clsx(
            'flex h-[467px] w-[343px] flex-col items-start gap-10 rounded-[40px] bg-slate-950 px-13.5 pb-12 backdrop-blur-md',
            'md:h-[354px] md:w-[696px] md:flex-row md:items-center md:justify-between md:px-[121.5px] md:pt-0',
            'lg:h-[419px] lg:w-[996px] lg:px-[181px]'
          )}
        >
          <Image
            src={mockupImage3}
            width={849}
            height={1014}
            alt="멤버 초대 예시 화면"
            className="h-[273px] w-[235px] md:self-start lg:h-[338px] lg:w-[291px]"
          />
          <div className="text-lg-md lg:text-2xl-md flex flex-col items-start text-white">
            <div className="bg-bg200 border-border mb-4 size-12 rounded-xl border-1 p-3 shadow-lg shadow-slate-800">
              <Image src={doneIcon} width={24} height={24} alt="체크" className="size-6" />
            </div>
            할 일도 간편하게
            <br />
            체크해요
          </div>
        </article>
      </section>
      <section className="relative h-[640px] pt-[123px] sm:h-[940px] sm:pt-[176px] lg:h-[1080px] lg:pt-[230px]">
        <div className="mx-auto flex flex-col items-center">
          <h2 className="text-2xl-semi font-semibold sm:text-[40px]">지금 바로 시작해보세요</h2>
          <p className="text-lg-md sm:text-2xl-md mt-4 text-center sm:mt-6">
            팀원 모두와 같은 방향,
            <span className="sm:hidden">
              <br />
            </span>
            <span className="hidden sm:inline"> </span>
            같은 속도로 나아가는 가장 쉬운 방법
          </p>
        </div>
        <BottomBackgroundImage />
      </section>
    </main>
  );
}

import StartButton from '@/components/pages/home/StartButton';

export default function Home() {
  return (
    <div className="m-auto flex h-screen w-full items-center justify-center">
      <StartButton className="text-lg-semi flex h-12 justify-center rounded-4xl bg-(image:--color-gradient) px-[143px] py-[14.5px]">
        지금 시작하기
      </StartButton>
    </div>
  );
}

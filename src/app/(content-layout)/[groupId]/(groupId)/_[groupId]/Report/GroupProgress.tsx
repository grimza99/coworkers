import CircularProgress from '@/assets/CircularProgress';

interface Props {
  percent: number;
}
export default function GroupProgress({ percent }: Props) {
  return (
    <div className="flex w-full items-center gap-10 lg:gap-15">
      <div>
        <CircularProgress percent={percent} size={'lg'} className="hidden md:block" />
        <CircularProgress percent={percent} size={'md'} className="block md:hidden" />
      </div>
      <div className="hidden md:block">
        <p className="text-md-md">
          오늘의
          <br />
          진행 상황
        </p>
        <span className="text-gradient text-4xl-bold">{percent}%</span>
      </div>
    </div>
  );
}

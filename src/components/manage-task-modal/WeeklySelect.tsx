import clsx from 'clsx';

interface WeeklySelectProps {
  selectedDays: number[];
  toggleDay: (idx: number) => void;
}

const DAY_OF_THE_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export default function WeeklySelect({ selectedDays, toggleDay }: WeeklySelectProps) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-lg-md">반복 요일</label>
      <div className="flex justify-between">
        {DAY_OF_THE_WEEK.map((w, idx) => (
          <div
            key={w}
            onClick={() => toggleDay(idx + 1)}
            className={clsx(
              'text-md-md flex h-12 w-11 cursor-pointer items-center justify-center rounded-xl',
              selectedDays.includes(idx + 1) ? 'bg-primary text-gray100' : 'bg-bg400 text-gray500'
            )}
          >
            {w}
          </div>
        ))}
      </div>
    </div>
  );
}

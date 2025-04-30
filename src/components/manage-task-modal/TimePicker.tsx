import clsx from 'clsx';
import generateTime from './time-table';
import { Time } from './ManageTaskModal';

interface TimePickerProps {
  selectedTime: Time;
  onTimeChange: (key: 'period' | 'time', value: string) => void;
}

const AM_PM = ['오전', '오후'] as const;

export default function TimePicker({ selectedTime, onTimeChange }: TimePickerProps) {
  const { am, pm } = generateTime();
  const { period, time } = selectedTime;

  const timePeriod = period === '오전' ? am : pm;

  return (
    <div className="border-primary flex gap-[14px] rounded-xl border p-3">
      <div className="flex flex-col gap-2">
        {AM_PM.map((t) => {
          const selectedPeriod = period === t;

          return (
            <button
              key={t}
              onClick={() => onTimeChange('period', t)}
              className={clsx(
                'text-md-md h-10 w-[78px] rounded-xl',
                selectedPeriod ? 'bg-primary text-gray100' : 'bg-bg400 text-gray500'
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
      <div className="bg-bg400 flex h-[152px] w-full flex-col overflow-y-scroll rounded-xl p-4">
        {timePeriod.map((t) => {
          const selectedTime = time === t;

          return (
            <button
              key={t}
              onClick={() => onTimeChange('time', t)}
              className={clsx(
                'text-lg-rg flex cursor-pointer items-start pb-3 last:pb-0',
                selectedTime ? 'text-primary' : 'text-gray500'
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

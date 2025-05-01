'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import FormField from '../common/formField';
import { OptionSelector } from '../common/dropdown/OptionSelector';
import CalendarSelect from '../calendar/CalendarSelect';
import WeeklySelect from './WeeklySelect';
import TimePicker from './TimePicker';
import generateTime from './time-table';
import {
  Frequency,
  Task,
} from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-list-page-type';

interface TaskItem extends Pick<Task, 'id' | 'name' | 'frequency' | 'weekDays' | 'description'> {
  date: Date | string;
}

export interface Time {
  period: '오전' | '오후';
  time: string;
}

const FREQUENCY_LIST = ['한 번', '매일', '주 반복', '월 반복'];

const INITIAL_TASK_ITEM: TaskItem = {
  id: 0,
  name: '',
  description: '',
  date: new Date(),
  frequency: 'ONCE',
  weekDays: [],
};

const FREQUENCY_MAP: Record<Frequency, string> = {
  ONCE: '한 번',
  DAILY: '매일',
  WEEKLY: '주 반복',
  MONTHLY: '월 반복',
};

const REVERSE_FREQUENCY_MAP: Record<string, Frequency> = {
  '한 번': 'ONCE',
  매일: 'DAILY',
  '주 반복': 'WEEKLY',
  '월 반복': 'MONTHLY',
};

export default function ManageTaskItem({ task }: { task?: TaskItem }) {
  const { am, pm } = generateTime();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [taskItem, setTaskItem] = useState<TaskItem>(() => ({
    ...INITIAL_TASK_ITEM,
    ...task,
  }));
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState(() => {
    return task?.frequency ? FREQUENCY_MAP[task.frequency] : '';
  });
  const [selectedTime, setSelectedTime] = useState<Time>({
    period: '오전',
    time: am[0],
  });

  const select = [
    {
      id: 'date',
      value: format(taskItem.date, 'yyyy년 MM월 dd일'),
      onClick: () => {
        setIsCalendarOpen((prev) => !prev);
        setIsTimeOpen(false);
      },
      isOpen: isCalendarOpen,
      flex: 'flex-[1.65]',
    },
    {
      id: 'time',
      value: `${selectedTime.period} ${selectedTime.time}`,
      onClick: () => {
        setIsTimeOpen((prev) => !prev);
        setIsCalendarOpen(false);
      },
      isOpen: isTimeOpen,
      flex: 'flex-[1]',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalendarDateChange = (selectedDate: Date) => {
    setTaskItem((prev) => ({
      ...prev,
      date: selectedDate,
    }));
    setIsCalendarOpen(false);
  };

  const handleFrequencyChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const frequency = e.currentTarget.textContent ?? '';
    setSelectedFrequency(frequency);
    setTaskItem((prev) => ({
      ...prev,
      frequency: REVERSE_FREQUENCY_MAP[frequency] || 'ONCE',
    }));
  };

  const toggleDay = (idx: number) => {
    setTaskItem((prev) => ({
      ...prev,
      weekly: prev.weekDays.includes(idx)
        ? prev.weekDays.filter((i) => i !== idx)
        : [...prev.weekDays, idx],
    }));
  };

  const updateTime = (key: 'period' | 'time', value: string) => {
    setSelectedTime((prev) => {
      if (key === 'period') {
        const newTime = value === '오전' ? am[0] : pm[0];
        return { period: value as '오전' | '오후', time: newTime };
      }

      setIsTimeOpen(false);

      return { ...prev, [key]: value };
    });
  };

  const headingText = task ? '수정하기' : '만들기';

  return (
    <div className="bg-bg200 w-[384px] pb-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg-md">할 일 {headingText}</h1>
          <p className="text-md-md text-gray500 text-center">
            할 일은 실제로 행동 가능한 작업 중심으로
            <br />
            작성해 주시면 좋습니다.
          </p>
        </div>

        <FormField
          field="input"
          name="name"
          value={taskItem.name}
          onChange={handleInputChange}
          label="할 일 제목"
          placeholder="할 일 제목을 입력해 주세요."
        />

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <label className="text-lg-md">시간 날짜 및 시간</label>
            <div className="flex gap-2">
              {select.map((item) => (
                <div
                  key={item.id}
                  onClick={item.onClick}
                  className={clsx(
                    'text-gray500 text-md-rg sm:text-lg-rg bg-bg200 flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 sm:h-12',
                    item.isOpen ? 'border-primary' : 'border-border',
                    item.flex
                  )}
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
          {isCalendarOpen && (
            <CalendarSelect onDateChange={handleCalendarDateChange} date={taskItem.date as Date} />
          )}
          {isTimeOpen && <TimePicker selectedTime={selectedTime} onTimeChange={updateTime} />}
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-lg-md">반복 설정</label>
          <OptionSelector
            options={FREQUENCY_LIST}
            defaultValue={FREQUENCY_MAP[taskItem.frequency]}
            size="sm"
            placement="top-12"
            onSelect={handleFrequencyChange}
          />
        </div>

        {selectedFrequency === '주 반복' && (
          <WeeklySelect
            selectedDays={taskItem.weekDays}
            toggleDay={(idx: number) => toggleDay(idx)}
          />
        )}

        <FormField
          field="textarea"
          name="descripton"
          value={taskItem.description}
          onChange={handleInputChange}
          label="할 일 메모"
          placeholder="메모를 입력해 주세요."
          height={75}
        />
      </div>
    </div>
  );
}

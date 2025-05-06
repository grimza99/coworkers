import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Frequency } from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-list-page-type';
import generateTime from './time-table';
import { CreateTaskItemProps, TaskItem, Time } from './type';

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

export default function useManageTaskItem({ task, interceptTaskItem }: CreateTaskItemProps) {
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

  useEffect(() => {
    interceptTaskItem(taskItem);
  }, [taskItem, interceptTaskItem]);

  const select = [
    {
      id: 'date',
      value: format(taskItem.date, 'yyyy년 MM월 dd일'),
      onClick: task
        ? undefined
        : () => {
            setIsCalendarOpen((prev) => !prev);
            setIsTimeOpen(false);
          },
      isOpen: isCalendarOpen,
      flex: 'flex-[1.65]',
    },
    {
      id: 'time',
      value: `${selectedTime.period} ${selectedTime.time}`,
      onClick: task
        ? undefined
        : () => {
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
    setTaskItem((prev) => {
      const weekDays = prev.weekDays ?? [];

      return {
        ...prev,
        weekly: weekDays.includes(idx) ? weekDays.filter((i) => i !== idx) : [...weekDays, idx],
      };
    });
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

  const isWeekly = selectedFrequency === '주 반복';

  return {
    taskItem,
    selectedTime,
    isWeekly,
    isCalendarOpen,
    isTimeOpen,
    select,
    FREQUENCY_MAP,
    handleInputChange,
    handleCalendarDateChange,
    handleFrequencyChange,
    toggleDay,
    updateTime,
  };
}

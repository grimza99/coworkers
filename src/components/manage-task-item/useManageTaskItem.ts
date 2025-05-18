import { useState } from 'react';
import { format, getDate } from 'date-fns';
import { Frequency } from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-type';
import generateTime from './time-table';
import { TaskItemProps, TaskItem, Time } from './type';
import axiosClient from '@/lib/axiosClient';
import useModalContext from '../common/modal/core/useModalContext';

const INITIAL_TASK_ITEM: TaskItem = {
  name: '',
  description: '',
  startDate: new Date(),
  frequencyType: 'ONCE',
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

export default function useManageTaskItem({
  task,
  groupId,
  taskListId,
  isDone,
  createOrEditModalId,
}: TaskItemProps) {
  const { am, pm } = generateTime();
  const { closeModal } = useModalContext();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [taskItem, setTaskItem] = useState<TaskItem>(() => ({
    ...INITIAL_TASK_ITEM,
    name: task?.name ?? '',
    description: task?.description ?? '',
  }));
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [selectedTime, setSelectedTime] = useState<Time>({
    period: '오전',
    time: am[0],
  });
  const [isFrequencyDelete, setIsFrequencyDelete] = useState(false);

  const { period, time } = selectedTime;

  const createStartDate = (date: Date, time: string) => {
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0);
  };

  const updateStartDate = (date: Date) => {
    setTaskItem((prev) => ({ ...prev, startDate: date }));
  };

  const select = [
    {
      id: 'date',
      value: format(taskItem.startDate, 'yyyy년 MM월 dd일'),
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
      value: `${period} ${time}`,
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
    updateStartDate(createStartDate(selectedDate, time));
    setIsCalendarOpen(false);
  };

  const handleFrequencyChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const frequency = e.currentTarget.textContent ?? '';
    setSelectedFrequency(frequency);
    setTaskItem((prev) => ({
      ...prev,
      frequencyType: REVERSE_FREQUENCY_MAP[frequency] || 'ONCE',
    }));
  };

  const toggleDay = (idx: number) => {
    setWeekDays((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  const updateTime = (key: 'period' | 'time', value: string) => {
    setSelectedTime((prev) => {
      let period = prev.period;
      let time = prev.time;

      if (key === 'period') {
        period = value as '오전' | '오후';
        const list = period === '오전' ? am : pm;
        if (!list.includes(time)) {
          time = list[0];
        }
      } else if (key === 'time') {
        time = value;
      }

      updateStartDate(createStartDate(taskItem.startDate, time));

      return { period, time };
    });

    if (key === 'time') setIsTimeOpen(false);
  };

  const closeTaskItemModal = () => closeModal(createOrEditModalId ?? '');

  const markFrequencyForDelete = () => {
    setIsFrequencyDelete(true);
  };

  const handleCreateTaskItemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedStartDate = createStartDate(taskItem.startDate, time);

      let finalTaskItem: TaskItem = {
        ...taskItem,
        startDate: updatedStartDate,
      };

      if (finalTaskItem.frequencyType === 'WEEKLY') {
        finalTaskItem = {
          ...finalTaskItem,
          weekDays,
        };
      }

      if (finalTaskItem.frequencyType === 'MONTHLY') {
        finalTaskItem = {
          ...finalTaskItem,
          monthDay: getDate(finalTaskItem.startDate),
        };
      }

      await axiosClient.post(`/groups/${groupId}/task-lists/${taskListId}/tasks`, finalTaskItem);

      closeTaskItemModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTaskItemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axiosClient.patch(`/groups/${groupId}/task-lists/${taskListId}/tasks/${task?.id}`, {
        done: isDone,
        name: taskItem.name,
        description: taskItem.description,
      });

      // const promises = [updateTaskPromise];

      // if (isFrequencyDelete) {
      //   const deleteRecurringPromise = axiosClient.delete(
      //     `/groups/${groupId}/task-lists/${taskListId}/tasks/${task?.id}/recurring/${task?.recurringId}`
      //   );

      //   promises.push(deleteRecurringPromise);
      // }

      // await Promise.all(promises);

      closeTaskItemModal();
    } catch (err) {
      console.error(err);
    }
  };

  const isWeekly = selectedFrequency === '주 반복';
  const isMonthly = selectedFrequency === '월 반복';

  const frequencyDefaultValue = FREQUENCY_MAP[taskItem.frequencyType];

  const createOrEditSubmit = task ? handleEditTaskItemSubmit : handleCreateTaskItemSubmit;

  return {
    taskItem,
    selectedTime,
    weekDays,
    isWeekly,
    isMonthly,
    isCalendarOpen,
    isTimeOpen,
    select,
    frequencyDefaultValue,
    handleInputChange,
    handleCalendarDateChange,
    handleFrequencyChange,
    markFrequencyForDelete,
    createOrEditSubmit,
    toggleDay,
    updateTime,
    closeModal: closeTaskItemModal,
  };
}

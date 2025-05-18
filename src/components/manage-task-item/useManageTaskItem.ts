import { useState } from 'react';
import { format, getDate, startOfDay } from 'date-fns';
import { Frequency } from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/types/task-type';
import generateTime from './time-table';
import { TaskItemProps, TaskItem, Time } from './type';
import axiosClient from '@/lib/axiosClient';
import useModalContext from '../common/modal/core/useModalContext';

const REVERSE_FREQUENCY_MAP: Record<string, Frequency> = {
  '한 번': 'ONCE',
  매일: 'DAILY',
  '주 반복': 'WEEKLY',
  '월 반복': 'MONTHLY',
};

export default function useManageTaskItem({
  detailTask,
  groupId,
  taskListId,
  isDone,
  createOrEditModalId,
}: TaskItemProps) {
  const { am, pm } = generateTime();
  const { closeModal } = useModalContext();
  const task = detailTask?.recurring;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [taskItem, setTaskItem] = useState<TaskItem>(() => ({
    name: detailTask?.name ?? '',
    description: detailTask?.description ?? '',
    startDate: task?.startDate ?? startOfDay(new Date()),
    frequencyType: task?.frequencyType ?? 'ONCE',
  }));
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const initialSelectedTime = (): Time => {
    if (!task?.startDate) return { period: '오전', time: am[0] };

    const date = new Date(task?.startDate);
    const hours = date.getHours();
    const period = hours < 12 ? '오전' : '오후';
    const time = format(date, 'hh:mm');
    return { period, time };
  };

  const [selectedTime, setSelectedTime] = useState<Time>(initialSelectedTime);

  const [_, setIsFrequencyDelete] = useState(false);

  const { period, time } = selectedTime;

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

  const createStartDate = (date: Date | string, time: string) => {
    const dateObj = new Date(date);

    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), hour, minute, 0);
  };

  const updateStartDate = (date: Date) => {
    setTaskItem((prev) => ({ ...prev, startDate: date }));
  };

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
    let newPeriod = selectedTime.period;
    let newTime = selectedTime.time;

    if (key === 'period') {
      newPeriod = value as '오전' | '오후';
      const list = newPeriod === '오전' ? am : pm;
      if (!list.includes(newTime)) {
        newTime = list[0];
      }
    } else {
      newTime = value;
    }

    updateStartDate(createStartDate(taskItem.startDate, newTime));
    setSelectedTime({ period: newPeriod, time: newTime });

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
      await axiosClient.patch(
        `/groups/${groupId}/task-lists/${taskListId}/tasks/${detailTask?.id}`,
        {
          done: isDone,
          name: taskItem.name,
          description: taskItem.description,
        }
      );

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
  const isOnce = task?.frequencyType === 'ONCE';

  const createOrEditSubmit = task ? handleEditTaskItemSubmit : handleCreateTaskItemSubmit;

  return {
    taskItem,
    selectedTime,
    weekDays,
    isWeekly,
    isOnce,
    isCalendarOpen,
    isTimeOpen,
    select,
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

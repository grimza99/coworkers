'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import TaskWiseTodoListItem from './TaskWiseTodoListItem';
import axiosClient from '@/lib/axiosClient';
import { Task, TaskList } from '../types/task-list-page-type';

interface Props {
  date: Date;
  groupId: string;
}

export default function DateWiseTaskList({ date, groupId }: Props) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [currentTaskList, setCurrentTaskList] = useState<TaskList>(taskLists[0]);
  const [currentTasks, setCurrentTasks] = useState<Task[]>(currentTaskList.tasks);

  const handleClickChangeCurrentTask = (taskList: TaskList) => {
    setCurrentTaskList(taskList);
    // setCurrentTasks(task.tasks);
  };

  const handleLoad = async () => {
    const { data: taskListsData } = await axiosClient(`/groups/${groupId}`);
    const { data: tasksData } = await axiosClient(`groups/task-lists/${currentTaskList.id}/tasks`, {
      params: { date },
    });
    setTaskLists(taskListsData.taskLists);
    setCurrentTasks(tasksData);
  };

  useEffect(() => {
    handleLoad();
    setCurrentTaskList(taskLists[0]); // date가 바뀔때마다 일단 태스크 리스트의 첫번째로 돌아가게 구현
    // setCurrentTaskItem(바뀐 날짜에 의한 새로운 투두리스트...)
    //date가 바뀔 때마다 태스크안의 투두 아이템이 바뀌어야함
  }, [date]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {taskLists.map((taskList) => {
          return (
            <p
              key={taskList.id}
              onClick={() => handleClickChangeCurrentTask(taskList)}
              className={clsx(
                'text-md-md cursor-pointer',
                taskList === currentTaskList
                  ? 'text-gray-200 underline underline-offset-6'
                  : 'text-gray-500'
              )}
            >
              {taskList.name}
            </p>
          );
        })}
      </div>
      <div>
        {currentTasks.length > 0 || !currentTasks ? (
          <>
            {currentTasks.map((task) => {
              return <TaskWiseTodoListItem item={task} key={task.id} />;
            })}
          </>
        ) : (
          <p className="text-md-md text-gray-500">
            아직 할 일 목록이 없습니다.
            <br />
            새로운 목록을 추가해주세요.
          </p>
        )}
      </div>
    </div>
  );
}

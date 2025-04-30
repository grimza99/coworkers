'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import TaskWiseTodoListItem from './TaskListWiseTasks';
import axiosClient from '@/lib/axiosClient';
import { Task, TaskList } from '../types/task-list-page-type';

interface Props {
  date: Date;
  groupId: string;
}

export default function DateWiseTaskLists({ date, groupId }: Props) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [currentTaskList, setCurrentTaskList] = useState<TaskList>(taskLists[0]);
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);

  const handleClickChangeCurrentTask = (taskList: TaskList) => {
    setCurrentTaskList(taskList);
    setCurrentTasks(taskList.tasks);
  };

  const handleLoad = async () => {
    const { data: taskListsData } = await axiosClient(`/groups/${groupId}`);

    setTaskLists(taskListsData.taskLists);
    setCurrentTaskList(taskListsData.taskLists[0]);
    const { data: tasksData } = await axiosClient(
      `groups/${groupId}/task-lists/${taskListsData.taskLists[0].id}/tasks`,
      {
        params: { date },
      }
    );
    setCurrentTasks(tasksData);
  };

  useEffect(() => {
    handleLoad();
    //태스크가 바뀔때, 날짜가 바뀔때, 서로 유기적으로 동작해서 아래 아이템이 바뀌어야함함ㅎ맣ㅁ함함함ㅎ함ㅎ마하마하마함ㅎ
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
          <div className="flex flex-col gap-4">
            {currentTasks.map((task) => {
              return <TaskWiseTodoListItem task={task} key={task.id} />;
            })}
          </div>
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

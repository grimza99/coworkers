'use client';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import axiosClient from '@/lib/axiosClient';
import { Task, TaskList } from '../types/task-type';
import TasksWiseTask from './TasksWiseTask';

interface Props {
  date: Date;
  groupId: string;
}

export default function DateWiseTaskLists({ date, groupId }: Props) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [currentTaskList, setCurrentTaskList] = useState<TaskList>();
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [unexpectedError, setUnexpectedError] = useState<Error | null>(null);

  const handleClickChangeCurrentTaskList = (taskList: TaskList) => {
    setCurrentTaskList(taskList);
    fetchTaskListWiseTasks(taskList);
  };

  const fetchTaskListWiseTasks = useCallback(
    async (currentTaskList: TaskList) => {
      if (!currentTaskList) return;

      try {
        const { data: tasksData } = await axiosClient(
          `groups/${groupId}/task-lists/${currentTaskList.id}/tasks`,
          {
            params: { date },
          }
        );

        setCurrentTasks(tasksData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setUnexpectedError(error);
        } else {
          setUnexpectedError(new Error('Unknown error occurred'));
        }
      }
    },

    [groupId, date]
  );

  const fetchTaskLists = useCallback(async () => {
    if (!date || !groupId) return;
    try {
      const { data: taskListsData } = await axiosClient(`/groups/${groupId}`);
      const fetchedTaskLists: TaskList[] = taskListsData.taskLists;

      if (taskListsData && fetchedTaskLists.length < 1) {
        return (
          <div className="flex h-200 items-center justify-center">
            <p className="text-md-md text-gray500">
              아직 할 일 목록이 없습니다.
              <br />
              새로운 목록을 추가해주세요.
            </p>
          </div>
        );
      }

      setTaskLists(fetchedTaskLists);
      setCurrentTaskList(fetchedTaskLists[0]);
      fetchTaskListWiseTasks(fetchedTaskLists[0]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setUnexpectedError(error);
      } else {
        setUnexpectedError(new Error('Unknown error occurred'));
      }
    }
  }, [groupId, fetchTaskListWiseTasks, date]);

  useEffect(() => {
    if (unexpectedError) {
      throw unexpectedError;
    }
    fetchTaskLists();
  }, [date, groupId, fetchTaskLists, unexpectedError]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {taskLists.map((taskList) => {
          return (
            <p
              key={taskList.id}
              onClick={() => handleClickChangeCurrentTaskList(taskList)}
              className={clsx(
                'text-md-md cursor-pointer',
                taskList === currentTaskList
                  ? 'text-gray200 underline underline-offset-6'
                  : 'text-gray500'
              )}
            >
              {taskList.name}
            </p>
          );
        })}
      </div>
      <div className="flex w-full items-center justify-center">
        {currentTasks.length > 0 && currentTaskList ? (
          <div className="flex w-full flex-col gap-4">
            {currentTasks.map((task) => {
              return (
                <TasksWiseTask
                  taskListId={currentTaskList.id}
                  task={task}
                  key={task.id}
                  groupId={groupId}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-md-md text-gray500">
            아직 할 일이 없습니다.
            <br />할 일을 추가해보세요.
          </p>
        )}
      </div>
    </div>
  );
}

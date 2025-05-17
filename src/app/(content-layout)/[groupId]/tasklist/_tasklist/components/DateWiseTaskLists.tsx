'use client';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import axiosClient from '@/lib/axiosClient';
import { Task, TaskList } from '../types/task-type';
import TasksWiseTask from './TasksWiseTask';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useTaskActions } from '../hooks/use-task-actions';

interface Props {
  date: Date;
  groupId: string;
  updateTaskListId: (id: number) => void;
}

export default function DateWiseTaskLists({ date, groupId, updateTaskListId }: Props) {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [currentTaskList, setCurrentTaskList] = useState<TaskList>();
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { saveNewTaskOrder } = useTaskActions();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  useEffect(() => {
    if (!currentTaskList) return;

    updateTaskListId(currentTaskList.id);
  }, [updateTaskListId, currentTaskList]);

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
          setError(error);
        } else {
          setError(new Error('Unknown error occurred'));
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
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('Unknown error occurred'));
      }
    }
  }, [groupId, fetchTaskListWiseTasks, date]);

  useEffect(() => {
    if (error) {
      throw error;
    }
    fetchTaskLists();
  }, [date, groupId, fetchTaskLists, error]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = currentTasks.findIndex((task) => task.id === active.id);
      const newIndex = currentTasks.findIndex((task) => task.id === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setCurrentTasks(arrayMove(currentTasks, oldIndex, newIndex));
        await saveNewTaskOrder(currentTaskList!.id, Number(active.id), newIndex);
      }
    }
  };

  return (
    <div className="relative flex h-full flex-col gap-4">
      <div className="flex h-fit max-w-full gap-3 overflow-x-auto overflow-y-hidden">
        {taskLists.map((taskList) => {
          return (
            <p
              key={taskList.id}
              onClick={() => handleClickChangeCurrentTaskList(taskList)}
              className={clsx(
                'text-md-md mb-1 w-fit cursor-pointer whitespace-nowrap',
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
      <div className="mb-20 flex h-full flex-col items-center justify-start overflow-auto lg:mb-30 xl:mb-50">
        {currentTasks.length > 0 && currentTaskList ? (
          <DndContext
            sensors={sensors}
            onDragEnd={(e: DragEndEvent) => handleDragEnd(e)}
            collisionDetection={closestCenter}
          >
            <SortableContext strategy={verticalListSortingStrategy} items={currentTasks}>
              <div className="flex h-full w-full flex-col gap-4">
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
            </SortableContext>
          </DndContext>
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

'use client';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { Task, TaskList } from '../../types/task-type';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import useDndKit from '../../hooks/use-dnd-kit';
import { useEffect, useState } from 'react';
import TasksWiseTask from '../TasksWiseTask';

interface Props {
  groupId: string;
  tasks: Task[];
  currentTaskList: TaskList;
}
export default function Tasks({ groupId, tasks, currentTaskList }: Props) {
  const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);
  const [isClient, setIsClient] = useState(false);

  const orderCurrentTasks = (orderedCurrentTasks: Task[]) => {
    setCurrentTasks(orderedCurrentTasks);
  };
  const { sensors, handleDragEnd } = useDndKit(currentTasks, currentTaskList!, orderCurrentTasks);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null; // or a loading skeleton

  return (
    <div>
      {currentTasks.length > 0 ? (
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
          <br />할 일을 추가 해보세요.
        </p>
      )}
    </div>
  );
}

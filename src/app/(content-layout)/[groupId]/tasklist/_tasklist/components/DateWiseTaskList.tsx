'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
// import { TaskTest1, TaskTest2, TaskTest3 } from '../mock-data-task-list-page';
import TaskWiseTodoListItem from './TaskWiseTodoListItem';
import axiosClient from '@/lib/axiosClient';
import { Task, TaskList, TasksApiResponse } from '../types/task-list-page-type';

// const MOCK_DATA = [TaskTest1, TaskTest2, TaskTest3];

interface Props {
  date: Date;
  groupId: string;
}

export default function DateWiseTaskList({ date, groupId }: Props) {
  const [taskList, setTaskList] = useState<TaskList[]>([]);
  const [currentTask, setCurrentTask] = useState<TaskList>(taskList[0]);
  const [currentTasks, setCurrentTasks] = useState<Task[]>(currentTask.tasks);

  const handleClickChangeCurrentTask = (task: TaskList) => {
    setCurrentTask(task);
    // setCurrentTasks(task.tasks);
  };

  const handleLoad = async () => {
    const { data: taskListData } = await axiosClient(`/groups/${groupId}`);
    const { data: tasksData } = await axiosClient(`groups/${currentTask.id}/tasks`);
    setTaskList(taskListData.taskLists);
    setCurrentTasks(tasksData);
  };

  useEffect(() => {
    handleLoad();
    setCurrentTask(taskList[0]); // date가 바뀔때마다 일단 태스크 리스트의 첫번째로 돌아가게 구현
    // setCurrentTaskItem(바뀐 날짜에 의한 새로운 투두리스트...)
    //date가 바뀔 때마다 태스크안의 투두 아이템이 바뀌어야함
  }, [date]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {taskList.map((task) => {
          return (
            <p
              key={task.id}
              onClick={() => handleClickChangeCurrentTask(task)}
              className={clsx(
                'text-md-md cursor-pointer',
                task === currentTask
                  ? 'text-gray-200 underline underline-offset-6'
                  : 'text-gray-500'
              )}
            >
              {task.name}
            </p>
          );
        })}
      </div>
      <div>
        {currentTasks.length > 0 || !currentTasks ? (
          <>
            {currentTasks.map((item) => {
              return <TaskWiseTodoListItem item={item} key={item.id} />;
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

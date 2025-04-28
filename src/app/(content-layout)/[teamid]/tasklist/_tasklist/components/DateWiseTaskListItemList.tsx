'use client';

import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { useState } from 'react';
import { TaskListItemApiResponse } from '../types/task-list-page-type';

interface Props {
  ListItem: TaskListItemApiResponse[];
}

export default function DateWiseTaskListItemList({ ListItem }: Props) {
  if (ListItem.length < 1) return null;

  return (
    <>
      {ListItem.map((item) => {
        const [isDone, setIsDone] = useState(Boolean(item.doneAt));

        const safeFormatDate = (dateString: string | undefined | null) => {
          if (!dateString) return '';

          const date = new Date(dateString);
          if (!isValid(date)) return '';

          return format(date, 'yyyy년 MM월 dd일');
        };

        const handleClickPopUpDetail = () => {
          console.log('디테일');
          //디테일 할일 팝업
        };

        const handleClickItemEdit = () => {
          console.log('수정하기');
          //수정
        };

        const handleClickItemDelete = () => {
          console.log('삭제하기');
          //삭제
        };
        const handleClickItemStatusChange = () => {
          console.log('던');
          setIsDone((prev) => !prev);
          //done 상태로 바꾸는 api 작성
        };

        return (
          <TaskListItem
            key={item.id}
            type="taskList"
            onCheckStatusChange={handleClickItemStatusChange}
            onEdit={handleClickItemEdit}
            onDelete={handleClickItemDelete}
            onClick={handleClickPopUpDetail}
            isDone={isDone}
            description={item.description}
            commentCount={item.commentCount}
            date={safeFormatDate(item.date)}
            frequency={item.frequency}
          />
        );
      })}
    </>
  );
}

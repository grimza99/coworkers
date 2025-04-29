import { TaskListItemApiResponse } from '../types/task-list-page-type';
import TodoListItem from './TodoListItem';

interface Props {
  listItem: TaskListItemApiResponse[];
}

export default function TaskWiseTodoList({ listItem }: Props) {
  if (listItem.length < 1) return null;

  return (
    <>
      {listItem.map((item) => {
        <TodoListItem item={item} key={item.id} />;
      })}
    </>
  );
}

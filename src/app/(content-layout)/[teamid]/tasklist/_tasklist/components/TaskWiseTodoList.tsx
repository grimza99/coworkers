import { TaskListItemApiResponse } from '../types/task-list-page-type';
import TodoListItem from './TodoListItem';

interface Props {
  ListItem: TaskListItemApiResponse[];
}

export default function TaskWiseTodoList({ ListItem }: Props) {
  if (ListItem.length < 1) return null;

  return (
    <>
      {ListItem.map((item) => {
        <TodoListItem item={item} />;
      })}
    </>
  );
}

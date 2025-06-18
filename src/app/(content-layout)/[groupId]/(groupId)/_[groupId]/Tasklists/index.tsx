'use client';
import useTasklists from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/useTasklists';
import TasklistItem from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistItem';
import TasklistUpdateModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistUpdateModal';
import TasklistDeleteModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistDeleteModal';
import { Group } from '@/types/group';
import { Tasklist } from '@/types/tasklist';
import CreateTaskListModal from '../../../tasklist/_tasklist/components/ModalContents/CreateTaskListModal';

type TasklistsProps = {
  groupId: Group['id'];
  tasklists: Tasklist[];
};

export default function Tasklists({ groupId, tasklists }: TasklistsProps) {
  const {
    optimisticTasklists,
    selectedTasklist,
    setSelectedTasklist,
    isUpdateLoading,
    isDeleteLoading,
    updateTasklist,
    deleteTasklist,
  } = useTasklists(groupId, tasklists);

  const tasklistUpdateModalId = selectedTasklist ? `tasklistUpdate-${selectedTasklist.id}` : '';
  const tasklistDeleteModalId = selectedTasklist ? `tasklistDelete-${selectedTasklist.id}` : '';
  const totalTasklistCount = optimisticTasklists.length;

  return (
    <>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg-md">
            할 일 목록 <span className="text-lg-rg text-gray500">({totalTasklistCount}개)</span>
          </h2>
          <CreateTaskListModal groupId={String(groupId)} />
        </div>
        <ol className="flex flex-col gap-4">
          {tasklists.map((tasklist, index) => (
            <TasklistItem
              key={tasklist.id}
              tasklist={tasklist}
              onDropdownTriggerClick={() => setSelectedTasklist(tasklist)}
              index={index}
            />
          ))}
        </ol>
      </section>

      {selectedTasklist && (
        <TasklistUpdateModal
          tasklist={selectedTasklist}
          modalId={tasklistUpdateModalId}
          updateTasklist={updateTasklist}
          isLoading={isUpdateLoading}
        />
      )}

      {selectedTasklist && (
        <TasklistDeleteModal
          tasklist={selectedTasklist}
          modalId={tasklistDeleteModalId}
          deleteTasklist={deleteTasklist}
          isLoading={isDeleteLoading}
        />
      )}
    </>
  );
}

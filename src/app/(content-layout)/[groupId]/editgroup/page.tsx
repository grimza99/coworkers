import getUserGroup from '@/components/manage-group/action';
import ManageGroup from '@/components/manage-group/ManageGroup';
import axiosServer from '@/lib/axiosServer';

export default async function EditGroup({ params }: { params: Promise<{ groupId: string }> }) {
  const groupId = (await params).groupId;
  const groupResponse = await axiosServer(`/groups/${groupId}`);
  const { id, name, image } = groupResponse.data;
  const groupData = { id, name, image };

  const groupNames = await getUserGroup();

  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 수정하기</h1>
      <ManageGroup groupData={groupData} groupNames={groupNames} />
    </div>
  );
}

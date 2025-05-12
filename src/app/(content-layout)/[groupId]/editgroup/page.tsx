import TrashCan from '@/assets/TrashCan';
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
    <div className="flex flex-col gap-6 lg:gap-10">
      <div className="flex w-full flex-col items-center gap-20">
        <h1 className="text-4xl">팀 수정하기</h1>
        <ManageGroup groupData={groupData} groupNames={groupNames} />
      </div>
      <div className="text-danger text-lg-md flex w-fit cursor-pointer items-center justify-start gap-2">
        <TrashCan />
        <span>팀 삭제하기</span>
      </div>
    </div>
  );
}

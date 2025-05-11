import ManageGroup from '@/components/manage-group/ManageGroup';
import axiosServer from '@/lib/axiosServer';
const DEFAULT_IMAGE = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;
export default async function EditGroup() {
  const response = await axiosServer('/user/groups');
  const groupNames = response.data.map((group: { name: string }) => group.name);

  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 수정하기</h1>
      <ManageGroup
        isEdit
        groupData={{
          image: DEFAULT_IMAGE!,
          name: 'hee',
        }}
        groupNames={groupNames}
      />
    </div>
  );
}

import getUserGroup from '@/components/manage-group/action';
import ManageGroup from '@/components/manage-group/ManageGroup';

export const dynamic = 'force-dynamic';

export default async function AddGroup() {
  const groupNames = await getUserGroup();

  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 생성하기</h1>
      <ManageGroup groupNames={groupNames} />
    </div>
  );
}

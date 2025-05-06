import ManageGroup from '@/components/manage-group/ManageGroup';

export default function AddGroup() {
  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 생성하기</h1>
      <ManageGroup />
    </div>
  );
}

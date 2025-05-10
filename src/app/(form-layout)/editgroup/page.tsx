import ManageGroup from '@/components/manage-group/ManageGroup';
const DEFAULT_IMAGE = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;
export default function EditGroup() {
  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 수정하기</h1>
      <ManageGroup
        isEdit
        groupData={{
          image: DEFAULT_IMAGE!,
          name: 'hee',
        }}
      />
    </div>
  );
}

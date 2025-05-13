import TrashCan from '@/assets/TrashCan';
import getUserGroup from '@/components/manage-group/action';
import ManageGroup from '@/components/manage-group/ManageGroup';
import { deletGroup, getGroupInfo } from './action';

export default async function EditGroup({ params }: { params: Promise<{ groupId: string }> }) {
  const groupId = Number((await params).groupId);

  const groupData = await getGroupInfo(groupId);
  const groupNames = await getUserGroup();

  return (
    <div className="-mt-6 flex justify-center">
      <div className="mt-6 w-full max-w-115 min-w-[343px] md:mx-6 md:mt-25 lg:mt-35">
        <div className="flex flex-col gap-6 lg:gap-10">
          <div className="flex w-full flex-col items-center gap-20">
            <h1 className="text-4xl">팀 수정하기</h1>
            <ManageGroup groupData={groupData} groupNames={groupNames} />
          </div>
          <form
            action={deletGroup}
            className="text-danger text-lg-md flex w-fit cursor-pointer items-center justify-start gap-2"
          >
            <input type="hidden" name="groupId" value={groupId} />
            <button
              type="submit"
              className="text-danger text-lg-md flex w-fit cursor-pointer items-center justify-start gap-2"
            >
              <TrashCan />
              <span>팀 삭제하기</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

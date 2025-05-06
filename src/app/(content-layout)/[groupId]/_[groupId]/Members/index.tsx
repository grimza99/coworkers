import { Member } from '@/types/user';
import MemberItem from './MemberItem';
import { Group } from '@/types/group';

type MembersProps = {
  groupId: Group['id'];
  members: Member[];
};

export default function Members({ groupId, members }: MembersProps) {
  const memberCount = members.length;
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg-md">
          멤버 <span className="text-lg-rg text-gray500">({memberCount}명)</span>
        </h2>
        {/* @TODO: 멤버 추가 기능  */}
      </div>
      <ul className="flex flex-col gap-4">
        {members.map((member) => (
          <MemberItem key={member.userId} member={member} />
        ))}
      </ul>
    </section>
  );
}

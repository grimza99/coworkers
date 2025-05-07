import { Member } from '@/types/user';
import MemberItem from './MemberItem';
import { Group } from '@/types/group';
import { ModalTrigger } from '@/components/common/modal';
import MemberInvitationModal from './MemberInvitationModal';

type MembersProps = {
  groupId: Group['id'];
  members: Member[];
};

export default function Members({ groupId, members }: MembersProps) {
  const memberCount = members.length;
  return (
    <>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg-md">
            멤버 <span className="text-lg-rg text-gray500">({memberCount}명)</span>
          </h2>
          <ModalTrigger className="text-primary text-md-rg" modalId="memberInvitation">
            + 새로운 멤버 초대하기
          </ModalTrigger>
        </div>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {members.map((member) => (
            <MemberItem key={member.userId} member={member} />
          ))}
        </ul>
      </section>

      <MemberInvitationModal modalId="memberInvitation" groupId={groupId} />
    </>
  );
}

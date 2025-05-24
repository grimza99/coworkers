'use client';
import { useUser } from '@/contexts/UserContext';
import useMembers from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/useMembers';
import MemberItem from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberItem';
import MemberInvitationModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberInvitationModal';
import MemberDeleteModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberDeleteModal';
import MemberDetailModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members/MemberDetailModal';
import { ModalTrigger } from '@/components/common/modal';
import { Member } from '@/types/user';
import { Group } from '@/types/group';

type MembersProps = {
  groupId: Group['id'];
  members: Member[];
  admin: Member;
};

export default function Members({ groupId, members, admin }: MembersProps) {
  const { user } = useUser();
  const {
    memberForDetail,
    setMemberForDetail,
    memberForDelete,
    setMemberForDelete,
    optimisticMembers,
    isAddLoading,
    isDeleteLoading,
    addMember,
    deleteMember,
  } = useMembers(groupId, members);

  const isUserAdmin = admin.userId === user?.id;
  const memberCount = optimisticMembers.length;
  const memberInvitationModalId = `memberInvitation-${groupId}`;
  const memberDetailModalId = memberForDetail ? `memberDetail-${memberForDetail.userId}` : '';
  const MemberDeleteModalId = memberForDelete ? `memberDelete-${memberForDelete.userId}` : '';

  return (
    <>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg-md">
            멤버 <span className="text-lg-rg text-gray500">({memberCount}명)</span>
          </h2>
          <ModalTrigger className="text-primary" modalId={memberInvitationModalId}>
            + 새로운 멤버 초대하기
          </ModalTrigger>
        </div>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {optimisticMembers.map((member) => (
            <MemberItem
              key={member.userId}
              isUserAdmin={isUserAdmin}
              member={member}
              memberDetailModalId={memberDetailModalId}
              memberDeleteModalId={MemberDeleteModalId}
              setMemberForDetail={setMemberForDetail}
              setMemberForDelete={setMemberForDelete}
            />
          ))}
        </ul>
      </section>

      <MemberInvitationModal
        modalId={memberInvitationModalId}
        groupId={groupId}
        isLoading={isAddLoading}
        addMember={addMember}
      />

      {memberForDetail && (
        <MemberDetailModal modalId={memberDetailModalId} member={memberForDetail} />
      )}

      {isUserAdmin && memberForDelete && (
        <MemberDeleteModal
          member={memberForDelete}
          modalId={MemberDeleteModalId}
          isLoading={isDeleteLoading}
          deleteMember={() => deleteMember(memberForDelete)}
        />
      )}
    </>
  );
}

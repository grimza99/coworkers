import ManageGroup from '@/components/manage-group/ManageGroup';

export default function EditGroup() {
  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 수정하기</h1>
      <ManageGroup
        isEdit
        groupData={{
          image:
            'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjNfMzcg%2FMDAxNjk4MDI0MzkzMzUx.RwHtbPS1FBz90oRrZC4zwzxZ4kiBHvUJgRCAnvavfxgg.owrSXiA-gC7wxGdHz08JrurubmKEJanm4N1upq6yE1wg.JPEG.whenusmile%2Foutput_302590174.jpg&type=a340',
          name: 'hee',
        }}
      />
    </div>
  );
}

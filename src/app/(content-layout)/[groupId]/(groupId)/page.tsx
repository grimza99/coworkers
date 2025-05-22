import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Title from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Title';
import Tasklists from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists';
import Report from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Report';
import Members from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Members';
import {
  getGroup,
  getUserMemberships,
} from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/actions';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ groupId: string }>;
}): Promise<Metadata> {
  const groupId = Number((await params).groupId);
  const data = await getGroup(groupId);
  const image = data.image || '/images/group-thumbnail.png';
  const title = `${data.name} | Coworkers`;
  const description = `${data.name} 그룹의 할 일 목록과 활동을 확인하세요.`;

  return {
    title: title,
    description: description,

    openGraph: {
      title: title,
      description: description,
      // url: '',
      siteName: 'Coworkers',
      images: [
        {
          url: image,
          width: 400,
          height: 400,
          alt: `${data.name} 썸네일 이미지`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ groupId: string }> }) {
  const groupId = Number((await params).groupId);
  const userMembersips = await getUserMemberships();
  const canAccess = userMembersips.some((membership) => membership.groupId === groupId);

  if (!canAccess) {
    notFound();
  }

  const data = await getGroup(groupId);
  const admin = data.members.find((member) => member.role === 'ADMIN')!;

  return (
    <main className="pb-16 md:pb-24">
      <Title groupId={groupId} name={data.name} admin={admin} />
      <div className="my-6 flex flex-col gap-12 lg:gap-16">
        <Tasklists groupId={groupId} tasklists={data.taskLists} />
        <Report tasklists={data.taskLists} />
        <Members groupId={groupId} members={data.members} admin={admin} />
      </div>
    </main>
  );
}

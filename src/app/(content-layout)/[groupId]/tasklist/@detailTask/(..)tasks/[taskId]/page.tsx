import Background from '../../_components/Background';
import DetailTaskPage from '@/app/(content-layout)/[groupId]/tasks/[taskId]/page';
import CloseButton from '../../_components/CloseButton';
import ExpandButton from '../../_components/ExpandButton';

interface Props {
  params: Promise<{ taskId: string }>;
}

export default async function DetailTaskContainer({ params }: Props) {
  const taskId = (await params).taskId;

  return (
    <>
      {!!taskId && (
        <Background isOpen={!!taskId}>
          <div className="bg-bg200 animate-detail-task fixed top-15 right-0 z-500 flex h-[calc(100%-60px)] w-full flex-col gap-25 px-4 py-4 md:max-w-[700px] md:gap-45.5 md:px-6 md:py-6 lg:max-w-[779px] lg:px-10 lg:py-10">
            <div className="relative flex h-full flex-col gap-4">
              <div className="flex gap-2">
                <CloseButton />
                <ExpandButton />
              </div>
              <DetailTaskPage params={params} />
            </div>
          </div>
        </Background>
      )}
    </>
  );
}

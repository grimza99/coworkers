import StartButton from '@/app/_home/StartButton';
import Comment from '@/components/comment';

const hello = {
  id: 3025,
  content: `오늘 저녁은 뭐에요?오늘 저녁은 뭐에요?오늘 저녁은 뭐에요?오늘 저녁은 뭐에요?오늘 저녁은 뭐에요?오늘 저녁은 뭐에요?오늘 저녁은 뭐에요?
오늘 저녁은 뭐에요? 오늘 저녁은 뭐에요?s`,
  createdAt: '2025-04-29T15:51:11+09:00',
  updatedAt: '2025-03-28T15:53:09+09:00',
  user: {
    id: 1845,
    nickname: 'new nickname!!!',
    image: 'string',
  },
};

export default function Home() {
  return (
    <div className="m-auto flex h-screen w-full items-center justify-center">
      <StartButton className="text-lg-semi flex h-12 justify-center rounded-4xl bg-(image:--color-gradient) px-[143px] py-[14.5px]">
        지금 시작하기
      </StartButton>
      <div className="flex w-[700px] flex-col">
        <Comment comment={hello} />
      </div>
    </div>
  );
}

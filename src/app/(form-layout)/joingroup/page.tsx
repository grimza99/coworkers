'use client';

import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function JoinGroup() {
  const [inviteLink, setInviteLink] = useState('');
  const router = useRouter();

  function parseInviteLink(link: string) {
    try {
      const url = new URL(link);
      const groupId = url.pathname.split('/')[3];
      const token = url.searchParams.get('token');
      return { groupId, token };
    } catch (e) {
      console.error('링크 분석 중 오류:', e); // 나중에 에러 확인 후 지우면 됨
      return { groupId: null, token: null };
    }
  }

  const handleJoin = async (e: React.FormEvent) => {
    // 폼 제출 시 실행되는 비동기 함수
    e.preventDefault(); // 기본 form 제출 동작(페이지 새로고침)을 막음
    const { groupId, token } = parseInviteLink(inviteLink);
    const userEmail = 'test@example.com'; // @TODO: 대체필요

    if (!groupId || !token) {
      alert('올바른 링크를 입력해주세요.'); // @TODO: 모달로 대체
      return;
    }

    try {
      await axios.post(`/groups/accept-invitation`, {
        userEmail,
        token,
      });
      alert('참여가 완료되었습니다!'); // @TODO: 모달로 대체
      router.push(`/${groupId}`);
    } catch (err) {
      alert('참여에 실패했습니다. 링크를 다시 확인해주세요.'); // @TODO: 모달로 대체
      console.error(err);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 참여하기</h1>
      <form className="flex w-full flex-col gap-10" onSubmit={handleJoin}>
        <div className="flex w-full flex-col">
          <FormField
            field="input"
            label="팀 링크"
            placeholder="팀 링크를 입력해주세요."
            value={inviteLink}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInviteLink(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Button type="submit" variant="solid" size="fullWidth">
            참여하기
          </Button>
          <p className="text-lg-rg text-gray500 text-center">
            공유받은 팀 링크를 입력해 참여할 수 있어요.
          </p>
        </div>
      </form>
    </div>
  );
}

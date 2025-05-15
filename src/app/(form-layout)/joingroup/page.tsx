'use client';

import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';

export default function JoinGroup() {
  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 참여하기</h1>
      <form className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-col">
          <FormField field="input" label="팀 링크" placeholder="팀 링크를 입력해주세요." />
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

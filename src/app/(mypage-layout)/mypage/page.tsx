'use client';

import Image from 'next/image';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';

export default function MyTeam() {
  return (
    <div className="flex w-full flex-col items-center md:-translate-y-15 lg:-translate-y-25">
      <h1 className="text-xl-bold flex w-full flex-col pb-3 text-start">계정설정</h1>
      <form className="flex w-full flex-col gap-6">
        <FormField
          field="file-input"
          label=""
          imageUploaderType="user"
          image=""
          onImageChange={() => {}}
        />
        <div className="flex w-full flex-col gap-6">
          <FormField
            field="input"
            label="이름"
            rightSlot={
              <div className="flex items-center">
                <Button size="xs" fontSize="14" className="shrink-0">
                  변경하기
                </Button>
              </div>
            }
          />
          <FormField field="input" label="이메일" />
          <FormField
            field="input"
            type="password"
            label="비밀번호"
            rightSlot={
              <div className="flex items-center">
                <Button size="xs" fontSize="14" className="shrink-0">
                  변경하기
                </Button>
              </div>
            }
          />
        </div>
        <button type="submit" className="text-danger text-lg-md flex items-center gap-1 text-start">
          <Image src="/icons/secession.svg" width={24} height={24} alt="회원탈퇴 아이콘" />
          회원 탈퇴하기
        </button>
      </form>
    </div>
  );
}

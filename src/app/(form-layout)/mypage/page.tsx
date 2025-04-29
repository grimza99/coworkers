'use client';

import FormField from '@/components/common/formField';

export default function MyTeam() {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-xl-bold flex w-full flex-col text-start">계정설정</h1>
      <form className="flex w-full flex-col gap-6">
        <FormField
          field="file-input"
          label=""
          imageUploaderType="user"
          image=""
          onImageChange={() => {}}
        />
        <div className="flex w-full flex-col gap-6">
          <FormField field="input" label="이름" />
          <FormField field="input" label="이메일" />
          <FormField field="input" type="password" label="비밀번호" />
        </div>
        <button type="submit" className="text-danger text-lg-md text-start">
          회원 탈퇴하기
        </button>
      </form>
    </div>
  );
}

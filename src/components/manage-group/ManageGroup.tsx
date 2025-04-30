'use client';

import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';

export interface Group {
  image: string;
  name: string;
}

interface MangeGroupProps {
  isEdit?: boolean;
  groupData?: Group;
}

export default function ManageGroup({ isEdit, groupData }: MangeGroupProps) {
  return (
    <form className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-6">
        <FormField
          field="file-input"
          label="팀 프로필"
          imageUploaderType="team"
          image=""
          onImageChange={() => {}}
        />
        <FormField field="input" label="팀 이름" placeholder="팀 이름을 입력해 주세요." value="" />
      </div>
      <div className="flex flex-col gap-6">
        <Button type="submit" variant="solid" size="fullWidth">
          생성하기
        </Button>
        <p className="text-lg-rg text-gray500 text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </form>
  );
}

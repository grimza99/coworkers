'use client';

import { format } from 'date-fns';

import Button from '../common/Button';
import FormField from '../common/formField';
import { OptionSelector } from '../common/dropdown/OptionSelector';

// 수정 작업 진행할 때 h1과 button children 분기 처리 예정

const FREQUENCY_LIST = ['한 번', '매일', '주 반복', '월 반복'];

export default function ManageTaskModal() {
  return (
    <div className="bg-bg200 w-[336px] px-4 py-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-lg-md">할 일 만들기</h1>
            <p className="text-md-md text-gray500 text-center">
              할 일은 실제로 행동 가능한 작업 중심으로
              <br />
              작성해 주시면 좋습니다.
            </p>
          </div>
          <FormField field="input" label="할 일 제목" placeholder="할 일 제목을 입력해 주세요." />
          <FormField
            field="input"
            label="시작 날짜 및 시간"
            placeholder={format(Date(), 'yyyy년 MM월 dd일')}
            disabled={true}
            className="cursor-pointer"
          />
          <div className="flex flex-col gap-4">
            <label>반복 설정</label>
            <OptionSelector options={FREQUENCY_LIST} size="sm" placement="top-12" />
          </div>
          <FormField
            field="textarea"
            label="할 일 메모"
            placeholder="메모를 입력해 주세요."
            height={75}
          />
        </div>
        <Button size="fullWidth" variant="solid">
          만들기
        </Button>
      </div>
    </div>
  );
}

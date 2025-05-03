'use client';

import clsx from 'clsx';
import FormField from '../../common/formField';
import { OptionSelector } from '../../common/dropdown/OptionSelector';
import CalendarSelect from '../../calendar/CalendarSelect';
import WeeklySelect from './WeeklySelect';
import TimePicker from './TimePicker';
import useManageTaskItem from '../useManageTaskItem';
import { TaskItem } from '../type';

const FREQUENCY_LIST = ['한 번', '매일', '주 반복', '월 반복'];

export default function ManageTaskItem({ task }: { task?: TaskItem }) {
  const {
    taskItem,
    selectedTime,
    isWeekly,
    isCalendarOpen,
    isTimeOpen,
    select,
    FREQUENCY_MAP,
    handleInputChange,
    handleCalendarDateChange,
    handleFrequencyChange,
    toggleDay,
    updateTime,
  } = useManageTaskItem({ task });

  const headingText = task ? '수정하기' : '만들기';

  return (
    <div className="bg-bg200 w-[384px] pb-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg-md">할 일 {headingText}</h1>
          <p className="text-md-md text-gray500 text-center">
            할 일은 실제로 행동 가능한 작업 중심으로
            <br />
            작성해 주시면 좋습니다.
          </p>
        </div>

        <FormField
          field="input"
          name="name"
          value={taskItem.name}
          onChange={handleInputChange}
          label="할 일 제목"
          placeholder="할 일 제목을 입력해 주세요."
        />

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <label className="text-lg-md">시간 날짜 및 시간</label>
            <div className="flex gap-2">
              {select.map((item) => (
                <div
                  key={item.id}
                  onClick={item.onClick}
                  className={clsx(
                    'text-gray500 text-md-rg sm:text-lg-rg bg-bg200 flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 sm:h-12',
                    item.isOpen ? 'border-primary' : 'border-border',
                    item.flex
                  )}
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
          {isCalendarOpen && (
            <CalendarSelect onDateChange={handleCalendarDateChange} date={taskItem.date as Date} />
          )}
          {isTimeOpen && <TimePicker selectedTime={selectedTime} onTimeChange={updateTime} />}
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-lg-md">반복 설정</label>
          <OptionSelector
            options={FREQUENCY_LIST}
            defaultValue={FREQUENCY_MAP[taskItem.frequency]}
            size="sm"
            placement="top-12"
            onSelect={handleFrequencyChange}
          />
        </div>

        {isWeekly && (
          <WeeklySelect
            selectedDays={taskItem.weekDays}
            toggleDay={(idx: number) => toggleDay(idx)}
          />
        )}

        <FormField
          field="textarea"
          name="descripton"
          value={taskItem.description}
          onChange={handleInputChange}
          label="할 일 메모"
          placeholder="메모를 입력해 주세요."
          height={75}
        />
      </div>
    </div>
  );
}

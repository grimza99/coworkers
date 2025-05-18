'use client';

import clsx from 'clsx';
import FormField from '../../common/formField';
import CalendarSelect from '../../calendar/CalendarSelect';
import WeeklySelect from './WeeklySelect';
import TimePicker from './TimePicker';
import useManageTaskItem from '../useManageTaskItem';
import { TaskItemProps } from '../type';
import Button from '@/components/common/Button';
import { ModalFooter } from '@/components/common/modal';
import Frequency from './Frequency';

export default function ManageTaskItem({
  task,
  groupId,
  taskListId,
  isDone,
  createOrEditModalId,
}: TaskItemProps) {
  const {
    taskItem,
    selectedTime,
    weekDays,
    isWeekly,
    isOnce,
    isCalendarOpen,
    isTimeOpen,
    select,
    handleInputChange,
    handleCalendarDateChange,
    handleFrequencyChange,
    createOrEditSubmit,
    toggleDay,
    updateTime,
    closeModal,
  } = useManageTaskItem({ task, groupId, taskListId, isDone, createOrEditModalId });

  const createOrEdit = task ? '수정하기' : '만들기';

  const isEdit = !!task;

  return (
    <div className="bg-bg200 w-[384px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg-md">할 일 {createOrEdit}</h1>
          <p className="text-md-md text-gray500 text-center">
            할 일은 실제로 행동 가능한 작업 중심으로
            <br />
            작성해 주시면 좋습니다.
          </p>
        </div>
        <form onSubmit={createOrEditSubmit} className="flex flex-col gap-6">
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
              <label className="text-lg-md">시작 날짜 및 시간</label>
              <div className="flex gap-2">
                {select.map((item) => (
                  <div
                    key={item.id}
                    onClick={item.onClick}
                    className={clsx(
                      !isEdit && 'cursor-pointer',
                      'text-gray500 text-md-rg sm:text-lg-rg bg-bg200 flex h-11 w-full items-center gap-3 rounded-xl border px-4 py-2.5 sm:h-12',
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
              <CalendarSelect
                onDateChange={handleCalendarDateChange}
                date={taskItem.startDate}
                disablePast
              />
            )}
            {isTimeOpen && <TimePicker selectedTime={selectedTime} onTimeChange={updateTime} />}
          </div>

          {!isOnce && (
            <div className="flex flex-col gap-4">
              <label className="text-lg-md">반복 설정</label>
              <Frequency
                isEdit={isEdit}
                isOnce={isOnce}
                handleFrequencyChange={handleFrequencyChange}
              />
            </div>
          )}

          {isWeekly && (
            <WeeklySelect selectedDays={weekDays} toggleDay={(idx: number) => toggleDay(idx)} />
          )}

          <FormField
            field="textarea"
            name="description"
            value={taskItem.description}
            onChange={handleInputChange}
            label="할 일 메모"
            placeholder="메모를 입력해 주세요."
            height={75}
          />
          <ModalFooter className="w-full">
            <Button onClick={closeModal} variant="outline-primary" size="fullWidth">
              취소
            </Button>
            <Button type="submit" variant="solid" size="fullWidth">
              {createOrEdit}
            </Button>
          </ModalFooter>
        </form>
      </div>
    </div>
  );
}

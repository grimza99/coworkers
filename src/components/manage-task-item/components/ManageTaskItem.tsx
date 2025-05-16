'use client';

import clsx from 'clsx';
import FormField from '../../common/formField';
import { OptionSelector } from '../../common/dropdown/OptionSelector';
import CalendarSelect from '../../calendar/CalendarSelect';
import WeeklySelect from './WeeklySelect';
import TimePicker from './TimePicker';
import useManageTaskItem from '../useManageTaskItem';
import { TaskItemProps } from '../type';
import Button from '@/components/common/Button';
import { ModalFooter } from '@/components/common/modal';
import useModalContext from '@/components/common/modal/core/useModalContext';
import DangerModal from '@/components/danger-modal';

const FREQUENCY_LIST = ['한 번', '매일', '주 반복', '월 반복'];

const DELETE_FREQUENCY_MODAL_ID = 'delete-frequency';

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
    isCalendarOpen,
    isTimeOpen,
    select,
    FREQUENCY_MAP,
    handleInputChange,
    handleCalendarDateChange,
    handleFrequencyChange,
    markFrequencyForDelete,
    createOrEditSubmit,
    toggleDay,
    updateTime,
    closeModal,
  } = useManageTaskItem({ task, groupId, taskListId, isDone, createOrEditModalId });

  const { openModal } = useModalContext();

  const createOrEdit = task ? '수정하기' : '만들기';

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
              <CalendarSelect
                onDateChange={handleCalendarDateChange}
                date={taskItem.startDate as Date}
                disablePast
              />
            )}
            {isTimeOpen && <TimePicker selectedTime={selectedTime} onTimeChange={updateTime} />}
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-lg-md">반복 설정</label>
            {task ? (
              <Button
                onClick={() => openModal(DELETE_FREQUENCY_MODAL_ID)}
                type="button"
                variant="danger"
                size="custom"
                className="h-10 w-40 rounded-xl"
              >
                반복 설정 삭제하기
              </Button>
            ) : (
              <OptionSelector
                options={FREQUENCY_LIST}
                defaultValue={FREQUENCY_MAP[taskItem.frequencyType]}
                size="sm"
                placement="top-12"
                onSelect={handleFrequencyChange}
              />
            )}
          </div>

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
      <DangerModal
        modalId={DELETE_FREQUENCY_MODAL_ID}
        heading="반복 일정을 삭제하시겠어요?"
        description={
          <span>
            삭제된 반복 일정은 복구할 수 없고,
            <br />
            반복 일정은 다시 설정할 수 없습니다.
          </span>
        }
        confirmButton="삭제하기"
        onConfirm={markFrequencyForDelete}
      />
    </div>
  );
}

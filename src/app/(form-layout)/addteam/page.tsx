import FormField from '@/components/common/formField';

export default function AddTeam() {
  return (
    <div className="flex w-full flex-col items-center gap-20">
      <h1 className="text-4xl">팀 수정하기</h1>
      <form className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-col gap-6">
          <FormField textField="input" label="팀 프로필" gapSize="24" labelSize="16/16" />
          <FormField
            textField="input"
            label="팀 이름"
            gapSize="24"
            placeholder="팀 이름을 입력해 주세요."
          />
        </div>
        <button className="bg-primary text-white">asdf</button>
      </form>
    </div>
  );
}

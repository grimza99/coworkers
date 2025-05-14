'use client';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';

export default function Page() {
  return (
    <main className="mt-4 mb-8 md:mt-8 md:mb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg-md md:text-xl-bold">게시글 쓰기</h1>
        <div className="hidden w-46 md:block">
          <Button size="fullWidth">등록</Button>
        </div>
      </div>
      <div className="bg-border my-6 h-[1px] w-full"></div>
      <form action="" className="flex flex-col gap-8">
        <FormField
          label="제목"
          field="input"
          placeholder="제목을 입력해주세요."
          required
          isSuccess={false}
          isFailure={false}
          errorMessage="제목을 입력해주세요."
          gapSize="16"
          labelSize="16/16"
          value={''}
          onChange={() => 1}
        />
        <FormField
          label="내용"
          field="textarea"
          placeholder="내용을 입력해주세요."
          height={240}
          required
          isSuccess={false}
          isFailure={false}
          errorMessage="내용을 입력해주세요."
          gapSize="16"
          labelSize="16/16"
          value={''}
          onChange={() => 1}
        />
        <FormField
          label="이미지"
          field="file-input"
          imageUploaderType="board"
          image=""
          onImageChange={(e) => 1}
        />
      </form>
      <Button className="mt-10 block md:hidden" size="fullWidth">
        등록
      </Button>
    </main>
  );
}

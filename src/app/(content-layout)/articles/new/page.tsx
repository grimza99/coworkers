'use client';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';

const isEmptyString = (str: string) => str.trim() === '';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const canSubmit = !isEmptyString(title) && !isEmptyString(content);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      setPreviewImage(URL.createObjectURL(file));
    } else {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage('');
      setImage(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <main className="mt-4 mb-8 md:mt-8 md:mb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg-md md:text-xl-bold">게시글 쓰기</h1>
        <div className="hidden w-46 md:block">
          <Button type="submit" form="articleForm" size="fullWidth" disabled={!canSubmit}>
            등록
          </Button>
        </div>
      </div>
      <div className="bg-border my-6 h-[1px] w-full"></div>
      <form id="articleForm" className="flex flex-col gap-8">
        <FormField
          label="제목"
          field="input"
          placeholder="제목을 입력해주세요."
          required
          isFailure={isEmptyString(title)}
          errorMessage="제목을 입력해주세요."
          gapSize="16"
          labelSize="16/16"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormField
          label="내용"
          field="textarea"
          placeholder="내용을 입력해주세요."
          height={240}
          required
          isFailure={isEmptyString(content)}
          errorMessage="내용을 입력해주세요."
          gapSize="16"
          labelSize="16/16"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <FormField
          label="이미지"
          field="file-input"
          imageUploaderType="board"
          image={previewImage}
          onImageChange={handleImageChange}
        />
      </form>
      <Button
        type="submit"
        form="articleForm"
        className="mt-10 block md:hidden"
        size="fullWidth"
        disabled={!canSubmit}
      >
        등록
      </Button>
    </main>
  );
}

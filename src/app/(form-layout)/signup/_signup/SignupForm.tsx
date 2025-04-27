import { useState, ChangeEvent } from 'react';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value.trim(),
    }));
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const formFields = [
    {
      field: 'input' as const,
      label: '이름',
      name: 'name',
      value: formData.name,
      isFailure: formData.name === '',
      isSuccess: formData.name !== '',
      errorMessage: '이름을 입력해주세요.',
      placeholder: '이름을 입력해주세요.',
    },
    {
      field: 'input' as const,
      label: '이메일',
      name: 'email',
      value: formData.email,
      isFailure: !isValidEmail,
      isSuccess: isValidEmail,
      errorMessage: '유효한 이메일이 아닙니다.',
      placeholder: '이메일을 입력해주세요.',
    },
    {
      field: 'input' as const,
      label: '비밀번호',
      name: 'password',
      type: 'password',
      value: formData.password,
      isFailure: formData.password === '',
      isSuccess: formData.password !== '',
      errorMessage: '비밀번호를 입력해주세요.',
      placeholder: '비밀번호를 입력해주세요.',
    },
    {
      field: 'input' as const,
      label: '비밀번호 확인',
      name: 'confirmPassword',
      type: 'password',
      value: formData.confirmPassword,
      isFailure: formData.confirmPassword === '' || formData.confirmPassword !== formData.password,
      isSuccess: formData.confirmPassword !== '' && formData.confirmPassword === formData.password,
      errorMessage:
        formData.confirmPassword === ''
          ? '비밀번호를 입력해주세요.'
          : '비밀번호가 일치하지 않습니다.',
      placeholder: '비밀번호를 다시 입력해주세요.',
    },
  ];

  return (
    <>
      <form className="flex w-full flex-col gap-y-10 md:max-w-115">
        <div className="flex flex-col gap-4">
          {formFields.map((field) => (
            <FormField
              key={field.name}
              field={field.field}
              label={field.label}
              type={field.type}
              isFailure={field.isFailure}
              isSuccess={field.isSuccess}
              errorMessage={field.errorMessage}
              value={field.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(field.name as keyof typeof formData, e.target.value)
              }
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <Button type="submit" variant="solid" size="fullWidth" fontSize="16">
          회원가입
        </Button>
      </form>
    </>
  );
}

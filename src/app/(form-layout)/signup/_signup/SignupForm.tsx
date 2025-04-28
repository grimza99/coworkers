'use client';

import { useState, ChangeEvent } from 'react';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
} from '@/utils/validators';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const setFieldValue = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value.trim(),
    }));
  };

  const formFields = [
    {
      field: 'input' as const,
      label: '이름',
      name: 'name',
      isFailure: !validateName(formData.name),
      isSuccess: validateName(formData.name),
      errorMessage: '이름은 2자 이상 20자까지 입력할 수 있습니다.',
      placeholder: '이름을 입력해주세요.',
    },
    {
      field: 'input' as const,
      label: '이메일',
      name: 'email',
      isFailure: !validateEmail(formData.email),
      isSuccess: validateEmail(formData.email),
      errorMessage: '올바른 이메일 형식이 아닙니다.',
      placeholder: '이메일을 입력해주세요.',
    },
    {
      field: 'input' as const,
      label: '비밀번호',
      name: 'password',
      type: 'password',
      isFailure: !validatePassword(formData.password),
      isSuccess: validatePassword(formData.password),
      errorMessage: '8~20자의 영문 대소문자 및 특수문자를 포함해주세요.',
      placeholder: '비밀번호를 입력해주세요.',
    },
    {
      field: 'input' as const,
      label: '비밀번호 확인',
      name: 'confirmPassword',
      type: 'password',
      isFailure: !validateConfirmPassword(formData.password, formData.confirmPassword),
      isSuccess: validateConfirmPassword(formData.password, formData.confirmPassword),
      errorMessage:
        formData.confirmPassword === ''
          ? '비밀번호를 입력해주세요.'
          : '비밀번호가 일치하지 않습니다.',
      placeholder: '비밀번호를 다시 한 번 입력해주세요.',
    },
  ];

  return (
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
            value={formData[field.name as keyof typeof formData]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFieldValue(field.name as keyof typeof formData, e.target.value)
            }
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <Button type="submit" variant="solid" size="fullWidth" fontSize="16">
        회원가입
      </Button>
    </form>
  );
}

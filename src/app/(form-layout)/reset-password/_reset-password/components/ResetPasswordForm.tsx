'use client';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import { validateConfirmPassword, validatePassword } from '@/utils/validators';
import { useState } from 'react';

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const FormFieldArray = [
    {
      field: 'input',
      label: '비밀번호',
      required: true,
      name: 'password',
      type: 'password',
      value: formData.password,
      isFailure: validatePassword(formData.password),
      isSuccess: validatePassword(formData.password),
      errorMessage: '비밀번호를 입력해주세요.',
      placeholder: '비밀번호를 입력해주세요.',
    },
    {
      field: 'input',
      label: '비밀번호 확인',
      required: true,
      name: 'confirmPassword',
      type: 'password',
      value: formData.confirmPassword,
      isFailure: validateConfirmPassword(formData.password, formData.confirmPassword),
      isSuccess: validateConfirmPassword(formData.password, formData.confirmPassword),
      errorMessage:
        formData.confirmPassword === ''
          ? '비밀번호를 입력해주세요.'
          : '비밀번호가 일치하지 않습니다.',
      placeholder: '비밀번호를 다시 입력해주세요.',
    },
  ] as const;

  const handleChangeFormData = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value.trim() }));
    console.log(formData);
  };

  return (
    <div className="flex flex-col gap-6">
      {FormFieldArray.map((field) => {
        return (
          <FormField
            key={field.name}
            field={field.field}
            label={field.label}
            required={field.required}
            name={field.name}
            type={field.type}
            value={field.value}
            isFailure={field.isFailure}
            isSuccess={field.isSuccess}
            errorMessage={field.errorMessage}
            placeholder={field.placeholder}
            onChange={(e) => handleChangeFormData(field.name, e)}
            gapSize="12"
            labelSize="16/16"
            borderClassName=""
          />
        );
      })}
      <Button>재설정</Button>
    </div>
  );
}

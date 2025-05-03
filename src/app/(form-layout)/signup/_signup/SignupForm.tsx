'use client';

import { useState, ChangeEvent } from 'react';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLengthLimit,
} from '@/utils/validators';
import PasswordToggleButton from './PasswordToggleButton';
import togglePasswordVisibilityLogic from '@/utils/use-password-visibility';

export default function SignupForm() {
  const { isPasswordVisible, togglePasswordVisibility } = togglePasswordVisibilityLogic();

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
      label: '이름',
      name: 'name',
      isFailure: !validateLengthLimit(formData.name),
      errorMessage:
        formData.name.trim() === ''
          ? '이름을 입력해주세요.'
          : '닉네임은 10글자 이하로 작성해주세요.',
      placeholder: '이름을 입력해주세요.',
    },
    {
      label: '이메일',
      name: 'email',
      isFailure: !validateEmail(formData.email),
      errorMessage:
        formData.email.trim() === '' ? '이메일을 입력해주세요.' : '올바른 이메일 형식이 아닙니다.',
      placeholder: '이메일을 입력해주세요.',
    },
    {
      label: '비밀번호',
      name: 'password',
      type: isPasswordVisible.password ? 'text' : 'password',
      isFailure: !validatePassword(formData.password),
      errorMessage:
        formData.password.trim() === ''
          ? '비밀번호를 입력해주세요.'
          : '비밀번호는 8자 이상 20자 이하이며 영문자, 숫자, 특수문자(!@#$%^&*)만 사용할 수 있습니다.',
      placeholder: '비밀번호를 입력해주세요.',
      rightSlot: (
        <PasswordToggleButton
          isVisible={isPasswordVisible.password}
          onToggle={() => togglePasswordVisibility('password')}
        />
      ),
    },
    {
      label: '비밀번호 확인',
      name: 'confirmPassword',
      type: isPasswordVisible.confirmPassword ? 'text' : 'password',
      isFailure: !validateConfirmPassword(formData.password, formData.confirmPassword),
      errorMessage:
        formData.confirmPassword.trim() === ''
          ? '비밀번호를 입력해주세요.'
          : '비밀번호가 일치하지 않습니다.',
      placeholder: '비밀번호를 다시 한 번 입력해주세요.',
      rightSlot: (
        <PasswordToggleButton
          isVisible={isPasswordVisible.confirmPassword}
          onToggle={() => togglePasswordVisibility('confirmPassword')}
        />
      ),
    },
  ];

  return (
    <form className="flex w-full flex-col gap-y-10 md:max-w-115">
      <div className="flex flex-col gap-4">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            field="input"
            label={field.label}
            type={field.type}
            isFailure={field.isFailure}
            errorMessage={field.errorMessage}
            value={formData[field.name as keyof typeof formData]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFieldValue(field.name as keyof typeof formData, e.target.value)
            }
            placeholder={field.placeholder}
            rightSlot={field.rightSlot}
          />
        ))}
      </div>

      <Button type="submit" variant="solid" size="fullWidth" fontSize="16">
        회원가입
      </Button>
    </form>
  );
}

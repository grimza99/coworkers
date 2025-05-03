'use client';
import PasswordToggleButton from '@/app/(form-layout)/signup/_signup/PasswordToggleButton';
import Button from '@/components/common/Button';
import FormField from '@/components/common/formField';
import axiosClient from '@/lib/axiosClient';
import { validateConfirmPassword, validatePassword } from '@/utils/validators';
import { useState } from 'react';

/**
 * @todo
 * 처음 렌더링 되었을때 버튼 에러 표시 되어있는 오류 해결
 */
export default function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (key: 'password' | 'confirmPassword') => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const FormFieldArray = [
    {
      field: 'input',
      label: '비밀번호',
      name: 'password',
      type: isPasswordVisible.password ? 'text' : 'password',
      value: formData.password,
      isFailure: !validatePassword(formData.password),
      isSuccess: validatePassword(formData.password),
      errorMessage: '비밀번호를 입력해주세요.',
      placeholder: '비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요.',
      rightSlot: (
        <PasswordToggleButton
          isVisible={isPasswordVisible.password}
          onToggle={() => togglePasswordVisibility('password')}
        />
      ),
    },
    {
      field: 'input',
      label: '비밀번호 확인',
      name: 'passwordConfirmation',
      type: isPasswordVisible.confirmPassword ? 'text' : 'password',
      value: formData.passwordConfirmation,
      isFailure: !validateConfirmPassword(formData.password, formData.passwordConfirmation),
      isSuccess: validateConfirmPassword(formData.password, formData.passwordConfirmation),
      errorMessage:
        formData.passwordConfirmation === ''
          ? '비밀번호를 입력해주세요.'
          : '비밀번호가 일치하지 않습니다.',
      placeholder: '새 비밀번호를 다시 한번 입력해주세요.',
      rightSlot: (
        <PasswordToggleButton
          isVisible={isPasswordVisible.confirmPassword}
          onToggle={() => togglePasswordVisibility('confirmPassword')}
        />
      ),
    },
  ] as const;

  const handleChangeFormData = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value.trim() }));
  };

  const handleSubmitResetPassword = async () => {
    //토큰값이 어떻게 담기는지 봐야함
    await axiosClient.patch(`/user/reset-password`, { token: 'string', ...formData });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        {FormFieldArray.map((field) => {
          return (
            <FormField
              key={field.name}
              required
              gapSize="12"
              labelSize="16/16"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeFormData(field.name, e)
              }
              {...field}
            />
          );
        })}
      </div>
      <Button
        disabled={
          !(
            validatePassword(formData.password) &&
            validateConfirmPassword(formData.password, formData.passwordConfirmation)
          )
        }
        onClick={handleSubmitResetPassword}
        size="fullWidth"
      >
        재설정
      </Button>
    </div>
  );
}

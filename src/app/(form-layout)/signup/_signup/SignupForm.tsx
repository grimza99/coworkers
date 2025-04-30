'use client';

import { useState, ChangeEvent } from 'react';
import axiosClient from '@/lib/axiosClient';
import { setClientCookie } from '@/lib/cookie/client';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLengthLimit,
} from '@/utils/validators';
import PasswordToggleButton from './PasswordToggleButton';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [duplicateError, setDuplicateError] = useState({ email: false, nickname: false });

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const setFieldValue = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value.trim(),
    }));
  };

  const togglePasswordVisibility = (key: 'password' | 'confirmPassword') => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formFields = [
    {
      label: '이름',
      name: 'nickname',
      isFailure: !validateLengthLimit(formData.nickname) || duplicateError.nickname,
      errorMessage:
        formData.nickname.trim() === ''
          ? '이름을 입력해주세요.'
          : !validateLengthLimit(formData.nickname)
            ? '이름은 10글자 이하로 작성해주세요.'
            : duplicateError.nickname
              ? '이미 사용 중인 이름입니다.'
              : '',
      placeholder: '이름을 입력해주세요.',
    },
    {
      label: '이메일',
      name: 'email',
      isFailure: !validateEmail(formData.email) || duplicateError.email,
      errorMessage:
        formData.email.trim() === ''
          ? '이메일을 입력해주세요.'
          : !validateEmail(formData.email)
            ? '올바른 이메일 형식이 아닙니다.'
            : duplicateError.email
              ? '이미 사용 중인 이메일입니다.'
              : '',
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
      name: 'passwordConfirmation',
      type: isPasswordVisible.confirmPassword ? 'text' : 'password',
      isFailure: !validateConfirmPassword(formData.password, formData.passwordConfirmation),
      errorMessage:
        formData.passwordConfirmation.trim() === ''
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('📤 요청 보냄:', formData);
      const response = await axiosClient.post('/auth/signUp', {
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
        nickname: formData.nickname,
      });

      const { accessToken, refreshToken } = response.data;
      setClientCookie('accessToken', accessToken);
      setClientCookie('refreshToken', refreshToken);
    } catch (error: any) {
      console.error('❌ 회원가입 실패:', error);

      if (error.response?.data?.message) {
        const message = error.response.data.message;
        setDuplicateError({
          email: message.includes('이메일'),
          nickname: message.includes('닉네임'),
        });
      } else {
        alert('회원가입에 실패했습니다.'); // 모달을 띄워서 다시 회원가입페이지로 돌아가서 시도할 수 있도록
      }
    }
  };

  return (
    <form className="flex w-full flex-col gap-y-10 md:max-w-115" onSubmit={handleSubmit}>
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

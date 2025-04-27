'use client';

import { useState } from 'react';
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

  return (
    <>
      <form className="flex w-full flex-col gap-y-10 md:max-w-115">
        <div className="flex flex-col gap-4">
          <FormField
            field="input"
            label="이름"
            isFailure={formData.name === ''}
            isSuccess={formData.name !== ''}
            errorMessage="이름을 입력해주세요."
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="이름을 입력해주세요."
          />
          <FormField
            field="input"
            label="이메일"
            isFailure={!isValidEmail}
            isSuccess={isValidEmail}
            errorMessage="유효한 이메일이 아닙니다."
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="이메일을 입력해주세요."
          />
          <FormField
            field="input"
            label="비밀번호"
            type="password"
            isFailure={formData.password === ''}
            isSuccess={formData.password !== ''}
            errorMessage="비밀번호를 입력해주세요."
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="비밀번호를 입력해주세요."
          />
          <FormField
            field="input"
            label="비밀번호 확인"
            type="password"
            isFailure={
              formData.confirmPassword === '' || formData.confirmPassword !== formData.password
            }
            isSuccess={
              formData.confirmPassword !== '' && formData.confirmPassword === formData.password
            }
            errorMessage={
              formData.confirmPassword === ''
                ? '비밀번호를 입력해주세요.'
                : '비밀번호가 일치하지 않습니다.'
            }
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </div>
        <Button type="submit" variant="solid" size="fullWidth" fontSize="16">
          회원가입
        </Button>
      </form>
    </>
  );
}

'use client';

import { useState, ChangeEvent } from 'react';
import axiosClient from '@/lib/axiosClient';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import PasswordToggleButton from './PasswordToggleButton';
import usePasswordVisibility from '@/utils/use-password-visibility';
import useModalContext from '@/components/common/modal/core/useModalContext';
import SignupSuccessModal from '@/components/signup-alert-modal/SignupSuccessModal';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLengthLimit,
} from '@/utils/validators';
import { AUTH_ERROR_MESSAGES } from '@/constants/messages/signup';
import { Toast } from '@/components/common/Toastify';

interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
}

export default function SignupForm() {
  const { openModal } = useModalContext();
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const setFieldValue = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value.trim(),
    }));
  };
  const [isSuccess, setIsSuccess] = useState(false);
  const [duplicateError, setDuplicateError] = useState({
    nickname: false,
    email: false,
  });

  function getNicknameErrorMessage() {
    if (formData.nickname.trim() === '') {
      return AUTH_ERROR_MESSAGES.nickname.required;
    }
    if (!validateLengthLimit(formData.nickname)) {
      return AUTH_ERROR_MESSAGES.nickname.tooLong;
    }
    if (duplicateError.nickname) {
      return AUTH_ERROR_MESSAGES.nickname.duplicated;
    }
    return '';
  }

  function getEmailErrorMessage() {
    if (formData.email.trim() === '') {
      return AUTH_ERROR_MESSAGES.email.required;
    }
    if (!validateEmail(formData.email)) {
      return AUTH_ERROR_MESSAGES.email.invalid;
    }
    if (duplicateError.email) {
      return AUTH_ERROR_MESSAGES.email.duplicated;
    }
    return '';
  }

  function getPasswordErrorMessage() {
    if (formData.password.trim() === '') {
      return AUTH_ERROR_MESSAGES.password.required;
    }
    if (!validatePassword(formData.password)) {
      return AUTH_ERROR_MESSAGES.password.invalid;
    }
    return '';
  }

  function getPasswordConfirmationErrorMessage() {
    if (formData.passwordConfirmation.trim() === '') {
      return AUTH_ERROR_MESSAGES.passwordConfirmation.required;
    }
    if (!validateConfirmPassword(formData.password, formData.passwordConfirmation)) {
      return AUTH_ERROR_MESSAGES.passwordConfirmation.notMatch;
    }
    return '';
  }

  const formFields = [
    {
      label: '이름',
      name: 'nickname',
      isFailure: !validateLengthLimit(formData.nickname) || duplicateError.nickname,
      errorMessage: getNicknameErrorMessage(),
      placeholder: '이름을 입력해주세요.',
    },
    {
      label: '이메일',
      name: 'email',
      isFailure: !validateEmail(formData.email) || duplicateError.email,
      errorMessage: getEmailErrorMessage(),
      placeholder: '이메일을 입력해주세요.',
    },
    {
      label: '비밀번호',
      name: 'password',
      type: isPasswordVisible.password ? 'text' : 'password',
      isFailure: !validatePassword(formData.password),
      errorMessage: getPasswordErrorMessage(),
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
      errorMessage: getPasswordConfirmationErrorMessage(),
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
      await axiosClient.post('/auth/signUp', {
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
        nickname: formData.nickname,
      });

      openModal('signup-success');
      setIsSuccess(true);
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      const message = err.response?.data?.message || '';

      setDuplicateError({
        email: message.includes('이메일'),
        nickname: message.includes('닉네임'),
      });

      Toast.error('회원가입에 실패했습니다. 입력 정보를 다시 확인해주세요.');
    }
  };

  const isFormInvalid =
    !validateLengthLimit(formData.nickname) ||
    !validateEmail(formData.email) ||
    !validatePassword(formData.password) ||
    !validateConfirmPassword(formData.password, formData.passwordConfirmation);

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
      <Button type="submit" variant="solid" size="fullWidth" fontSize="16" disabled={isFormInvalid}>
        회원가입
      </Button>
      {isSuccess && (
        <SignupSuccessModal
          nickname={formData.nickname}
          email={formData.email}
          password={formData.password}
        />
      )}
    </form>
  );
}

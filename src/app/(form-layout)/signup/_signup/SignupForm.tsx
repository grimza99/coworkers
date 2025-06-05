'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import PasswordToggleButton from './PasswordToggleButton';
import usePasswordVisibility from '@/utils/use-password-visibility';
import { useModal } from '@/contexts/ModalContext';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLengthLimit,
} from '@/utils/validators';
import { AUTH_ERROR_MESSAGES } from '@/constants/messages/signup';
import { Toast } from '@/components/common/Toastify';
import { setClientCookie } from '@/lib/cookie/client';
import { useUser } from '@/contexts/UserContext';
import SignupSuccessModal from './SignupSuccessModal';

interface SignupRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
}

// 회원가입 API 함수
const signupUser = async (data: SignupRequest): Promise<void> => {
  await axiosClient.post('/auth/signUp', data);
};

// 로그인 API 함수
const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosClient.post('/auth/signIn', data);
  return response.data;
};

export default function SignupForm() {
  const { openModal } = useModal();
  const router = useRouter();
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
  const { fetchUser } = useUser();

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [duplicateError, setDuplicateError] = useState({
    nickname: false,
    email: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [loginTimeoutId, setLoginTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // 회원가입 mutation
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      // 회원가입 성공 후 자동 로그인 시도
      const timeoutId = setTimeout(() => {
        loginMutation.mutate({
          email: formData.email,
          password: formData.password,
        });
      }, 5000);

      setLoginTimeoutId(timeoutId);
      openModal('signup-success');
      setIsSuccess(true);
    },
    onError: (error: unknown) => {
      const err = error as ErrorResponse;
      const message = err.response?.data?.message || '';

      setDuplicateError({
        email: message.includes('이메일'),
        nickname: message.includes('닉네임'),
      });

      Toast.error('회원가입 실패');
    },
  });

  // 자동 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data: LoginResponse) => {
      const { accessToken, refreshToken } = data;

      setClientCookie('accessToken', accessToken);
      setClientCookie('refreshToken', refreshToken);

      await fetchUser();
      router.push('/nogroup');
    },
    onError: () => {
      Toast.error('자동 로그인 실패.');
      router.push('/login');
    },
  });

  const setFieldValue = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value.trim(),
    }));
  };

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

    signupMutation.mutate({
      email: formData.email,
      password: formData.password,
      passwordConfirmation: formData.passwordConfirmation,
      nickname: formData.nickname,
    });
  };

  const isFormInvalid =
    !validateLengthLimit(formData.nickname) ||
    !validateEmail(formData.email) ||
    !validatePassword(formData.password) ||
    !validateConfirmPassword(formData.password, formData.passwordConfirmation);

  // 로딩 상태: 회원가입 중이거나 자동 로그인 중일 때
  const isLoading = signupMutation.isPending || loginMutation.isPending;

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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const key = field.name as keyof typeof formData;
              setFieldValue(key, e.target.value);

              if (key === 'email' || key === 'nickname') {
                setDuplicateError((prev) => ({ ...prev, [key]: false }));
              }
            }}
            placeholder={field.placeholder}
            rightSlot={field.rightSlot}
          />
        ))}
      </div>
      <Button
        type="submit"
        variant="solid"
        size="fullWidth"
        fontSize="16"
        disabled={isFormInvalid || isLoading}
      >
        {isLoading ? '처리 중...' : '회원가입'}
      </Button>
      {isSuccess && (
        <SignupSuccessModal
          nickname={formData.nickname}
          onGoToLoginPage={() => {
            if (loginTimeoutId) clearTimeout(loginTimeoutId);
            router.push('/login');
          }}
        />
      )}
    </form>
  );
}

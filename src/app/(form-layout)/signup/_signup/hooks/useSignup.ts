// hooks/useSignup.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useModal } from '@/contexts/ModalContext';
import { Toast } from '@/components/common/Toastify';
import { setClientCookie } from '@/lib/cookie/client';
import { useUser } from '@/contexts/UserContext';

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

const signupUser = async (data: SignupRequest): Promise<void> => {
  await axiosClient.post('/auth/signUp', data);
};

const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosClient.post('/auth/signIn', data);
  return response.data;
};

export const useSignup = () => {
  const { openModal } = useModal();
  const router = useRouter();
  const { fetchUser } = useUser();

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

  const handleSignup = (formData: SignupRequest) => {
    signupMutation.mutate(formData);
  };

  const handleAutoLogin = (email: string, password: string, delay: number = 5000) => {
    const timeoutId = setTimeout(() => {
      loginMutation.mutate({ email, password });
    }, delay);

    setLoginTimeoutId(timeoutId);
  };

  const cancelAutoLogin = () => {
    if (loginTimeoutId) {
      clearTimeout(loginTimeoutId);
      setLoginTimeoutId(null);
    }
  };

  const clearDuplicateError = (field: 'email' | 'nickname') => {
    setDuplicateError((prev) => ({ ...prev, [field]: false }));
  };

  const isLoading = signupMutation.isPending || loginMutation.isPending;

  return {
    // States
    duplicateError,
    isSuccess,
    isLoading,

    // Mutations
    signupMutation,
    loginMutation,

    // Actions
    handleSignup,
    handleAutoLogin,
    cancelAutoLogin,
    clearDuplicateError,
  };
};

// 사용 예시 - SignupForm 컴포넌트에서:
/*
'use client';

import { useState, ChangeEvent } from 'react';
import FormField from '@/components/common/formField';
import Button from '@/components/common/Button';
import PasswordToggleButton from './PasswordToggleButton';
import usePasswordVisibility from '@/utils/use-password-visibility';
import SignupSuccessModal from '@/components/signup-alert-modal/SignupSuccessModal';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLengthLimit,
} from '@/utils/validators';
import { AUTH_ERROR_MESSAGES } from '@/constants/messages/signup';
import { useSignup } from '@/hooks/useSignup';

export default function SignupForm() {
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
  const {
    duplicateError,
    isSuccess,
    isLoading,
    handleSignup,
    handleAutoLogin,
    cancelAutoLogin,
    clearDuplicateError,
  } = useSignup();
  
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 회원가입 실행
    handleSignup(formData);
    
    // 회원가입 성공 시 자동 로그인 스케줄링
    handleAutoLogin(formData.email, formData.password);
  };

  // ... 나머지 validation 로직과 formFields 배열은 동일

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
                clearDuplicateError(key);
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
            cancelAutoLogin();
            router.push('/login');
          }}
        />
      )}
    </form>
  );
}
*/

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useModal } from '@/contexts/ModalContext';
import { Toast } from '@/components/common/Toastify';
import { setClientCookie } from '@/lib/cookie/client';
import { useUser } from '@/contexts/UserContext';

export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ErrorResponse {
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
  const [pendingLogin, setPendingLogin] = useState<LoginRequest | null>(null);

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      openModal('signup-success');
      setIsSuccess(true);

      if (pendingLogin) {
        const timeoutId = setTimeout(() => {
          loginMutation.mutate(pendingLogin);
        }, 5000);
        setLoginTimeoutId(timeoutId);
      }
    },
    onError: (error: unknown) => {
      const err = error as ErrorResponse;
      const message = err.response?.data?.message || '';

      setDuplicateError({
        email: message.includes('이메일'),
        nickname: message.includes('닉네임'),
      });

      Toast.error('회원가입 실패');
      setPendingLogin(null);
    },
  });

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

  const handleAutoLogin = (email: string, password: string) => {
    setPendingLogin({ email, password });
  };

  const cancelAutoLogin = () => {
    if (loginTimeoutId) {
      clearTimeout(loginTimeoutId);
      setLoginTimeoutId(null);
    }
    setPendingLogin(null);
  };

  const clearDuplicateError = (field: 'email' | 'nickname') => {
    setDuplicateError((prev) => ({ ...prev, [field]: false }));
  };

  const isLoading = signupMutation.isPending || loginMutation.isPending;

  return {
    duplicateError,
    isSuccess,
    isLoading,

    signupMutation,
    loginMutation,

    handleSignup,
    handleAutoLogin,
    cancelAutoLogin,
    clearDuplicateError,
  };
};

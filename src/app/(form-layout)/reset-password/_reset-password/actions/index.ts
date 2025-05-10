import axiosClient from '@/lib/axiosClient';
import { PasswordForm } from '../types/form-type';
import { Ref, RefObject } from 'react';

export const submitResetPassword = async (
  token: string | string[] | undefined,
  formData: PasswordForm,
  formRef: RefObject<HTMLFormElement | null>
) => {
  const res = await axiosClient.patch(`/user/reset-password`, {
    token: token,
    ...formData,
    formRef,
  });
  if (res.status === 200) {
    formRef.current?.reset();
  }
};

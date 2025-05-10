import axiosClient from '@/lib/axiosClient';
import { PasswordForm } from '../types/form-type';

export const submitResetPassword = async (
  token: string | string[] | undefined,
  formData: PasswordForm
) => {
  const res = await axiosClient.patch(`/user/reset-password`, {
    token: token,
    ...formData,
  });
  if (res.status === 200) {
    //성공, 에러 등 핸들링 예정
  }
};

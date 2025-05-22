'use server';

import axiosServer from '@/lib/axiosServer';

export async function updateUserNickname(nickname: string) {
  try {
    await axiosServer.patch('/user', { nickname });
  } catch (e) {
    console.error('닉네임 변경 중 에러 발생:', e);
    throw new Error('닉네임 변경 실패');
  }
}

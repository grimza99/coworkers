'use server';
import axiosClient from '@/lib/axiosClient';

export const editComment = async (taskId: number, commentId: number, currentContent: string) => {
  await axiosClient.patch(`/tasks/${taskId}/comments/${commentId}`, { content: currentContent });
};

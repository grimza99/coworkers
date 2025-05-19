import axiosClient from '@/lib/axiosClient';

export async function postArticleLike(articleId: number) {
  await axiosClient.post(`/articles/${articleId}/like`);
}

export async function deleteArticleLike(articleId: number) {
  await axiosClient.delete(`/articles/${articleId}/like`);
}

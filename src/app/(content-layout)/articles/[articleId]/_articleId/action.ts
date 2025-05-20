'use server';

import { revalidateTag } from 'next/cache';
import axiosServer from '@/lib/axiosServer';

export async function getDetailArticle(articleId: number) {
  const response = await axiosServer.get(`/articles/${articleId}`);

  return response.data;
}

export async function getArticleComments(articleId: number) {
  const response = await axiosServer.get(`/articles/${articleId}/comments?limit=10`, {
    fetchOptions: { next: { tags: [`article-comments-${articleId}`] } },
  });

  return response.data.list;
}

export async function postArticleCommentsAction(articleId: number, comment: string) {
  await axiosServer.post(`/articles/${articleId}/comments`, { content: comment });
  revalidateTag(`article-comments-${articleId}`);
}

export async function deleteArticleComment(articleId: number, commentId: number) {
  await axiosServer.delete(`/comments/${commentId}`);
  revalidateTag(`article-comments-${articleId}`);
}

export async function patchArticleComment(articleId: number, commentId: number, comment: string) {
  await axiosServer.patch(`/comments/${commentId}`, { content: comment });
  revalidateTag(`article-comments-${articleId}`);
}

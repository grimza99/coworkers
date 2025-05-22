'use server';

import { revalidateTag } from 'next/cache';
import axiosServer from '@/lib/axiosServer';
import { ArticleComments } from '@/components/comment/types';
import { GetArticleDetailResponse } from '@/types/article';

export async function getDetailArticle(articleId: number) {
  const response = await axiosServer.get<GetArticleDetailResponse>(`/articles/${articleId}`);

  return response.data;
}

export async function getArticleComments(articleId: number) {
  const response = await axiosServer.get<ArticleComments>(
    `/articles/${articleId}/comments?limit=10`,
    {
      fetchOptions: { next: { tags: [`article-comments-${articleId}`] } },
    }
  );

  return response.data;
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

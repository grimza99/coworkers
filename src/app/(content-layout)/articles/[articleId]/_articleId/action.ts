'use server';

import { revalidateTag, updateTag } from 'next/cache';
import axiosServer from '@/lib/axiosServer';
import { ArticleComments } from '@/components/comment/types';
import { GetArticleDetailResponse } from '@/types/article';
import { BFF_API } from '@/constants/api';

export async function getDetailArticle(id: number) {
  const response = await axiosServer.get<GetArticleDetailResponse>(
    BFF_API.article.detail(String(id))
  );

  return response.data;
}

const COMMENT_LIMIT = 10;
export async function getArticleComments(
  articleId: number,
  limit: number = COMMENT_LIMIT,
  cursor?: number
) {
  const params = new URLSearchParams();
  params.append('limit', String(limit));

  if (cursor !== undefined) {
    params.append('cursor', String(cursor));
  }
  const response = await axiosServer.get<ArticleComments>(
    `${BFF_API.article.comment.list(String(articleId))}?${params}`,
    {
      fetchOptions: { next: { tags: [`article-comments-${articleId}`] } },
    }
  );

  return response.data;
}

export async function postArticleCommentsAction(articleId: number, comment: string) {
  await axiosServer.post(`${BFF_API.article.comment.create(String(articleId))}`, {
    content: comment,
  });
  updateTag(`article-comments-${articleId}`);
}

export async function deleteArticleComment(articleId: number, commentId: number) {
  await axiosServer.delete(BFF_API.article.comment.delete(String(commentId)));
  updateTag(`article-comments-${articleId}`);
}

export async function patchArticleComment(articleId: number, commentId: number, comment: string) {
  await axiosServer.patch(BFF_API.article.comment.edit(String(commentId)), { content: comment });
  updateTag(`article-comments-${articleId}`);
}

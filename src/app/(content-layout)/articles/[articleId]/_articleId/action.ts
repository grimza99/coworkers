'use server';

import axiosServer from '@/lib/axiosServer';

export async function getDetailArticle(articleId: number) {
  const response = await axiosServer(`/articles/${articleId}`);

  return response.data;
}

export async function getArticleComments(articleId: number) {
  const response = await axiosServer(`/articles/${articleId}/comments?limit=3`);

  return response.data.list;
}

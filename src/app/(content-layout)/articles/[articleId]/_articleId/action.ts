import axiosServer from '@/lib/axiosServer';

export async function getDetailArticle(articleId: number) {
  const response = await axiosServer(`/articles/${articleId}`);

  return response.data;
}

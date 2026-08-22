const BFF_BASEURL = '/api';
const BACKEND_BASEURL = process.env.NEXT_PUBLIC_API_URL;

export const BFF_API = {
  entry: BFF_BASEURL,
  user: '/user',
  article: {
    list: '/articles',
    create: '/articles',
    detail: (id: string) => `/articles/${id}`,
    comment: {
      list: (articleId: string) => `/articles/${articleId}/comments`,
      create: (articleId: string) => `/articles/${articleId}/comments`,
    },
  },
};
export const BACKEND_API = {
  user: `${BACKEND_BASEURL}${BFF_API.user}`,
  article: {
    list: `${BACKEND_BASEURL}${BFF_API.article.list}`,
    create: `${BACKEND_BASEURL}${BFF_API.article.create}`,
    detail: (id: string) => `${BACKEND_BASEURL}${BFF_API.article.detail(id)}`,
    comment: {
      list: (articleId: string) => `${BACKEND_BASEURL}${BFF_API.article.comment.list(articleId)}`,
      create: (articleId: string) =>
        `${BACKEND_BASEURL}${BFF_API.article.comment.create(articleId)}`,
    },
  },
};

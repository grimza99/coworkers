const BFF_BASEURL = '/api';
const BACKEND_BASEURL = process.env.NEXT_PUBLIC_API_URL;

export const BFF_API = {
  entry: BFF_BASEURL,
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    kakao_oauth: '/auth/kakao',
  },
  user: '/user',
  article: {
    list: '/articles',
    create: '/articles',
    detail: (id: string) => `/articles/${id}`,
    comment: {
      list: (articleId: string) => `/articles/${articleId}/comments`,
      create: (articleId: string) => `/articles/${articleId}/comments`,
      edit: (commentId: string) => `/comments/${commentId}`,
      delete: (commentId: string) => `/comments/${commentId}`,
    },
  },
};
export const BACKEND_API = {
  user: `${BACKEND_BASEURL}${BFF_API.user}`,
  auth: {
    login: `${BACKEND_BASEURL}/auth/signIn`,
    signup: `${BACKEND_BASEURL}/auth/signUp`,
    kakao_oauth: `${BACKEND_BASEURL}/auth/signIn/KAKAO`,
  },
  article: {
    list: `${BACKEND_BASEURL}${BFF_API.article.list}`,
    create: `${BACKEND_BASEURL}${BFF_API.article.create}`,
    detail: (id: string) => `${BACKEND_BASEURL}${BFF_API.article.detail(id)}`,
    comment: {
      list: (articleId: string) => `${BACKEND_BASEURL}${BFF_API.article.comment.list(articleId)}`,
      create: (articleId: string) =>
        `${BACKEND_BASEURL}${BFF_API.article.comment.create(articleId)}`,
      edit: (commentId: string) => `${BACKEND_BASEURL}${BFF_API.article.comment.edit(commentId)}`,
      delete: (commentId: string) =>
        `${BACKEND_BASEURL}${BFF_API.article.comment.delete(commentId)}`,
    },
  },
};

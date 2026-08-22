const BFF_BASEURL = '/api';
const BACKEND_BASEURL = process.env.NEXT_PUBLIC_API_URL;

export const BFF_API = {
  entry: BFF_BASEURL,
  user: '/user',
  article: { list: '/articles', create: '/articles' },
};
export const BACKEND_API = {
  user: `${BACKEND_BASEURL}${BFF_API.user}`,
  article: {
    list: `${BACKEND_BASEURL}${BFF_API.article.list}`,
    create: `${BACKEND_BASEURL}${BFF_API.article.create}`,
  },
};
